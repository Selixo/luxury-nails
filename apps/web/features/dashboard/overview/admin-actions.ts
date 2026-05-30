"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import type { AdminBookingStatus } from "@/features/dashboard/bookings/types"

export type OverviewStats = {
  todayCount: number
  pendingCount: number
  weekCount: number
  clientsCount: number
}

export type UpcomingBooking = {
  id: string
  date: string
  time: string
  status: "pending" | "confirmed"
  client: { name: string; last_name: string }
  service: { name: string }
}

export type TodayBooking = {
  id: string
  time: string
  status: AdminBookingStatus
  client: { name: string; last_name: string }
  service: { name: string }
}

export type AdminOverviewData = {
  stats: OverviewStats
  upcomingBookings: UpcomingBooking[]
  todaySchedule: TodayBooking[]
}

function getWeekBounds(now: Date): { weekStart: string; weekEnd: string } {
  const dow = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((dow + 6) % 7))
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  return {
    weekStart: monday.toISOString().slice(0, 10),
    weekEnd: sunday.toISOString().slice(0, 10),
  }
}

export async function getAdminOverviewData(): Promise<AdminOverviewData> {
  const admin = createAdminClient()
  const today = new Date().toISOString().slice(0, 10)
  const { weekStart, weekEnd } = getWeekBounds(new Date())

  const [
    todayRes,
    weekRes,
    clientsRes,
    pendingCountRes,
    upcomingRes,
    scheduleRes,
  ] = await Promise.all([
    admin
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("date", today)
      .in("status", ["pending", "confirmed"]),

    admin
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .gte("date", weekStart)
      .lte("date", weekEnd)
      .in("status", ["pending", "confirmed", "completed"]),

    admin
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "client"),

    admin
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),

    admin
      .from("bookings")
      .select(
        "id, date, time, status, client:profiles!bookings_client_id_fkey(name, last_name), service:services(name)"
      )
      .gte("date", today)
      .in("status", ["pending", "confirmed"])
      .order("date")
      .order("time"),

    admin
      .from("bookings")
      .select(
        "id, time, status, client:profiles!bookings_client_id_fkey(name, last_name), service:services(name)"
      )
      .eq("date", today)
      .order("time"),
  ])

  return {
    stats: {
      todayCount: todayRes.count ?? 0,
      pendingCount: pendingCountRes.count ?? 0,
      weekCount: weekRes.count ?? 0,
      clientsCount: clientsRes.count ?? 0,
    },
    upcomingBookings: (upcomingRes.data ?? []) as unknown as UpcomingBooking[],
    todaySchedule: (scheduleRes.data ?? []) as unknown as TodayBooking[],
  }
}
