"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export type UpcomingBooking = {
  id: string
  date: string
  time: string
  status: "pending" | "confirmed"
  service: { name: string }
}

export type ClientOverviewData = {
  name: string
  upcoming: UpcomingBooking | null
  completedCount: number
  lastVisitDate: string | null
  joinedAt: string
}

export async function getClientOverviewData(): Promise<ClientOverviewData | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const admin = createAdminClient()
  const today = new Date().toISOString().slice(0, 10)

  const [profileRes, upcomingRes, completedRes] = await Promise.all([
    admin
      .from("profiles")
      .select("name, created_at")
      .eq("id", user.id)
      .single(),

    admin
      .from("bookings")
      .select("id, date, time, status, service:services(name)")
      .eq("client_id", user.id)
      .gte("date", today)
      .in("status", ["pending", "confirmed"])
      .order("date")
      .order("time")
      .limit(1)
      .maybeSingle(),

    admin
      .from("bookings")
      .select("date")
      .eq("client_id", user.id)
      .eq("status", "completed")
      .order("date", { ascending: false }),
  ])

  const profile = profileRes.data
  if (!profile) return null

  const completed = completedRes.data ?? []

  return {
    name: profile.name,
    upcoming: (upcomingRes.data ?? null) as UpcomingBooking | null,
    completedCount: completed.length,
    lastVisitDate: completed[0]?.date ?? null,
    joinedAt: profile.created_at,
  }
}

export async function cancelClientBooking(
  bookingId: string,
  reason: string
): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Sesja wygasła." }

  const admin = createAdminClient()

  const { data: booking } = await admin
    .from("bookings")
    .select("id, status")
    .eq("id", bookingId)
    .eq("client_id", user.id)
    .in("status", ["pending", "confirmed"])
    .single()

  if (!booking) return { error: "Nie można anulować tej wizyty." }

  const { error } = await admin
    .from("bookings")
    .update({
      status: "cancelled",
      cancellation_reason: reason.trim() || null,
    })
    .eq("id", bookingId)

  if (error) return { error: "Nie udało się anulować wizyty." }

  revalidatePath("/dashboard/client")
  revalidatePath("/dashboard/admin/bookings")
  return { error: null }
}
