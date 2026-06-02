"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import {
  ensureValidToken,
  createCalendarEvent,
  deleteCalendarEvent,
} from "@/lib/google-calendar"
import { BOOKINGS_LIMIT } from "./constants"
import {
  type AdminBooking,
  type AdminBookingStatus,
  type AdminStatusFilter,
} from "./types"

type BookingsPageData = {
  bookings: AdminBooking[]
  total: number
  pages: number
}

export async function getAdminBookingsPage({
  page = 1,
  status = "all",
  query,
}: {
  page?: number
  status?: AdminStatusFilter
  query?: string
} = {}): Promise<BookingsPageData> {
  const admin = createAdminClient()
  const offset = (page - 1) * BOOKINGS_LIMIT

  const statusFilter: AdminBookingStatus[] =
    status === "all"
      ? ["pending", "confirmed", "completed", "cancelled"]
      : [status]

  let clientIds: string[] | null = null
  if (query?.trim()) {
    const q = `%${query.trim()}%`
    const { data: profiles } = await admin
      .from("profiles")
      .select("id")
      .or(`name.ilike.${q},last_name.ilike.${q},phone.ilike.${q}`)
    clientIds = profiles?.map((p) => p.id) ?? []
    if (clientIds.length === 0) return { bookings: [], total: 0, pages: 0 }
  }

  let bookingsQuery = admin
    .from("bookings")
    .select(
      "id, date, time, status, notes, stylist_note, cancellation_reason, inspiration_url, client:profiles!bookings_client_id_fkey(id, name, last_name, phone), service:services(id, name, price, duration_min)",
      { count: "exact" }
    )
    .in("status", statusFilter)
    .order("date", { ascending: false })
    .order("time", { ascending: false })
    .range(offset, offset + BOOKINGS_LIMIT - 1)

  if (clientIds !== null) {
    bookingsQuery = bookingsQuery.in("client_id", clientIds)
  }

  const { data, count } = await bookingsQuery

  return {
    bookings: (data ?? []) as unknown as AdminBooking[],
    total: count ?? 0,
    pages: Math.ceil((count ?? 0) / BOOKINGS_LIMIT),
  }
}

export async function getAdminBookingCounts(): Promise<
  Record<AdminStatusFilter, number>
> {
  const admin = createAdminClient()
  const statuses: AdminBookingStatus[] = [
    "pending",
    "confirmed",
    "completed",
    "cancelled",
  ]

  const results = await Promise.all(
    statuses.map((s) =>
      admin
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", s)
        .then(({ count }) => [s, count ?? 0] as const)
    )
  )

  const counts = Object.fromEntries(results) as Record<
    AdminBookingStatus,
    number
  >

  return {
    all: results.reduce((sum, [, n]) => sum + n, 0),
    ...counts,
  }
}

async function verifyAdmin(): Promise<boolean> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const admin = createAdminClient()
  const { data } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  return data?.role === "admin"
}

export async function updateBookingStatus(
  id: string,
  status: "confirmed" | "completed" | "cancelled",
  cancellationReason?: string
): Promise<{ error: string | null }> {
  if (!(await verifyAdmin())) return { error: "Brak uprawnień." }

  const admin = createAdminClient()
  const { error } = await admin
    .from("bookings")
    .update({
      status,
      ...(status === "cancelled" && cancellationReason?.trim()
        ? { cancellation_reason: cancellationReason.trim() }
        : {}),
    })
    .eq("id", id)

  if (error) {
    console.error("updateBookingStatus error:", error)
    return { error: "Nie udało się zaktualizować statusu." }
  }

  syncCalendar(admin, id, status).catch((err) =>
    console.error("Calendar sync error:", err)
  )

  revalidatePath("/dashboard/admin/bookings")
  return { error: null }
}

async function syncCalendar(
  admin: ReturnType<typeof createAdminClient>,
  bookingId: string,
  status: "confirmed" | "completed" | "cancelled"
): Promise<void> {
  const { data: settings } = await admin
    .from("settings")
    .select(
      "id, google_access_token, google_refresh_token, google_token_expiry"
    )
    .single()

  if (!settings?.google_access_token || !settings?.google_refresh_token) return

  const accessToken = await ensureValidToken(
    {
      id: settings.id,
      google_access_token: settings.google_access_token,
      google_refresh_token: settings.google_refresh_token,
      google_token_expiry: settings.google_token_expiry,
    },
    async (newToken, newExpiry) => {
      await admin
        .from("settings")
        .update({
          google_access_token: newToken,
          google_token_expiry: newExpiry,
        } as never)
        .eq("id", settings.id)
    }
  )

  if (status === "confirmed") {
    const { data: booking } = await admin
      .from("bookings")
      .select(
        "id, date, time, client:profiles!bookings_client_id_fkey(name, last_name, phone), service:services(name, duration_min)"
      )
      .eq("id", bookingId)
      .single()

    if (!booking) return

    const client = booking.client as {
      name: string
      last_name: string
      phone: string
    }
    const service = booking.service as { name: string; duration_min: number }

    const eventId = await createCalendarEvent(accessToken, {
      summary: `${service.name} – ${client.name} ${client.last_name}`,
      description: `Tel: ${client.phone}`,
      date: booking.date,
      time: booking.time,
      durationMin: service.duration_min,
    })

    if (eventId) {
      await admin
        .from("bookings")
        .update({ google_calendar_event_id: eventId } as never)
        .eq("id", bookingId)
    }
  }

  if (status === "cancelled") {
    const { data: booking } = await admin
      .from("bookings")
      .select("google_calendar_event_id")
      .eq("id", bookingId)
      .single()

    if (booking?.google_calendar_event_id) {
      await deleteCalendarEvent(accessToken, booking.google_calendar_event_id)
    }
  }
}

export async function upsertStylistNote(
  id: string,
  note: string
): Promise<{ error: string | null }> {
  if (note.length > 500)
    return { error: "Notatka może mieć maksymalnie 500 znaków." }
  if (!(await verifyAdmin())) return { error: "Brak uprawnień." }

  const admin = createAdminClient()
  const { error } = await admin
    .from("bookings")
    .update({ stylist_note: note.trim() || null })
    .eq("id", id)

  if (error) {
    console.error("upsertStylistNote error:", error)
    return { error: "Nie udało się zapisać notatki." }
  }

  revalidatePath("/dashboard/admin/bookings")
  return { error: null }
}
