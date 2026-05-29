"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { HISTORY_LIMIT, type HistoryStatus, type HistoryVisit } from "./types"

type HistoryPageData = {
  visits: HistoryVisit[]
  total: number
  pages: number
  allTimeCompletedCount: number
  allTimeTotalSpent: number
}

export async function getHistoryPageData({
  page = 1,
  status = "all",
}: {
  page?: number
  status?: HistoryStatus
} = {}): Promise<HistoryPageData> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      visits: [],
      total: 0,
      pages: 0,
      allTimeCompletedCount: 0,
      allTimeTotalSpent: 0,
    }
  }

  const admin = createAdminClient()
  const offset = (page - 1) * HISTORY_LIMIT

  const statusFilter = status === "all" ? ["completed", "cancelled"] : [status]

  const [listResult, statsResult] = await Promise.all([
    admin
      .from("bookings")
      .select(
        "id, date, time, notes, status, cancellation_reason, stylist_note, services(id, name, price), ratings(stars, comment)",
        { count: "exact" }
      )
      .eq("client_id", user.id)
      .in("status", statusFilter)
      .order("date", { ascending: false })
      .order("time", { ascending: false })
      .range(offset, offset + HISTORY_LIMIT - 1),

    admin
      .from("bookings")
      .select("services(price)")
      .eq("client_id", user.id)
      .eq("status", "completed"),
  ])

  const total = listResult.count ?? 0
  const pages = Math.ceil(total / HISTORY_LIMIT)

  const completedWithPrice = statsResult.data ?? []
  const allTimeCompletedCount = completedWithPrice.length
  const allTimeTotalSpent = completedWithPrice.reduce(
    (sum, b) => sum + ((b.services as { price: number } | null)?.price ?? 0),
    0
  )

  return {
    visits: (listResult.data ?? []) as HistoryVisit[],
    total,
    pages,
    allTimeCompletedCount,
    allTimeTotalSpent,
  }
}

export async function getHistoryCounts(): Promise<{
  all: number
  completed: number
  cancelled: number
}> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { all: 0, completed: 0, cancelled: 0 }

  const admin = createAdminClient()
  const { data } = await admin
    .from("bookings")
    .select("status")
    .eq("client_id", user.id)
    .in("status", ["completed", "cancelled"])

  const rows = data ?? []
  const completed = rows.filter((r) => r.status === "completed").length
  const cancelled = rows.filter((r) => r.status === "cancelled").length

  return { all: completed + cancelled, completed, cancelled }
}

export async function upsertRating(
  bookingId: string,
  stars: number,
  comment: string
): Promise<{ error: string | null }> {
  if (stars < 1 || stars > 5) return { error: "Nieprawidłowa ocena." }
  if (comment.length > 500)
    return { error: "Komentarz może mieć maksymalnie 500 znaków." }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Sesja wygasła." }

  const admin = createAdminClient()

  const { data: booking } = await admin
    .from("bookings")
    .select("id")
    .eq("id", bookingId)
    .eq("client_id", user.id)
    .eq("status", "completed")
    .single()

  if (!booking) return { error: "Nie można ocenić tej wizyty." }

  const { error } = await admin
    .from("ratings")
    .upsert(
      { booking_id: bookingId, stars, comment: comment.trim() || null },
      { onConflict: "booking_id" }
    )

  if (error) {
    console.error("upsertRating error:", error)
    return { error: "Nie udało się zapisać oceny." }
  }

  return { error: null }
}
