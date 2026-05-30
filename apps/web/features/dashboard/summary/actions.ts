"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import type {
  SummaryData,
  CategoryStat,
  ServiceStat,
  ClientStat,
  ChartPoint,
  BookingLine,
  PeakStat,
  MonthParam,
} from "./types"

function toDateString(year: number, month: number) {
  return `${year}-${String(month).padStart(2, "0")}-01`
}

function shiftMonth(year: number, month: number, delta: number): MonthParam {
  const d = new Date(year, month - 1 + delta, 1)
  return { year: d.getFullYear(), month: d.getMonth() + 1 }
}

export async function getSummaryData(
  year: number,
  month: number
): Promise<SummaryData> {
  const admin = createAdminClient()

  const monthStart = toDateString(year, month)
  const monthEnd = toDateString(
    shiftMonth(year, month, 1).year,
    shiftMonth(year, month, 1).month
  )
  const prev = shiftMonth(year, month, -1)
  const prevStart = toDateString(prev.year, prev.month)
  const chartStart = toDateString(
    shiftMonth(year, month, -5).year,
    shiftMonth(year, month, -5).month
  )

  const [
    { data: bookings },
    { data: prevCompleted },
    { data: chartRaw },
    { count: newClientsCount },
    { data: priorClients },
  ] = await Promise.all([
    admin
      .from("bookings")
      .select(
        "status, client_id, date, time, client:profiles!bookings_client_id_fkey(name, last_name), service:services(name, price, category)"
      )
      .gte("date", monthStart)
      .lt("date", monthEnd),

    admin
      .from("bookings")
      .select("service:services(price)")
      .gte("date", prevStart)
      .lt("date", monthStart)
      .eq("status", "completed"),

    admin
      .from("bookings")
      .select("date, service:services(price)")
      .gte("date", chartStart)
      .lt("date", monthEnd)
      .eq("status", "completed"),

    admin
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", monthStart)
      .lt("created_at", monthEnd)
      .eq("role", "client"),

    admin
      .from("bookings")
      .select("client_id")
      .eq("status", "completed")
      .lt("date", monthStart),
  ])

  type BookingRow = {
    status: string
    client_id: string
    date: string
    time: string
    client: { name: string; last_name: string } | null
    service: { name: string; price: number; category: string } | null
  }

  const rows = (bookings ?? []) as BookingRow[]
  const completed = rows.filter((r) => r.status === "completed")
  const cancelled = rows.filter((r) => r.status === "cancelled")

  const priorClientIds = new Set(
    (priorClients ?? []).map((r: { client_id: string }) => r.client_id)
  )

  const revenue = completed.reduce((sum, r) => sum + (r.service?.price ?? 0), 0)
  const prevRevenue = (
    (prevCompleted ?? []) as Array<{ service: { price: number } | null }>
  ).reduce((sum, r) => sum + (r.service?.price ?? 0), 0)

  const revenueChange =
    prevRevenue > 0
      ? Math.round(((revenue - prevRevenue) / prevRevenue) * 100)
      : null

  const returningCount = new Set(
    completed
      .filter((r) => priorClientIds.has(r.client_id))
      .map((r) => r.client_id)
  ).size

  return {
    revenue,
    completedCount: completed.length,
    cancelledCount: cancelled.length,
    avgValue: completed.length > 0 ? Math.round(revenue / completed.length) : 0,
    revenueChange,
    newClientsCount: newClientsCount ?? 0,
    returningCount,
    categories: buildCategories(completed, revenue),
    perService: buildPerService(completed),
    topClients: buildTopClients(completed),
    chart: buildChart(
      (chartRaw ?? []) as Array<{
        date: string
        service: { price: number } | null
      }>,
      year,
      month
    ),
    bookingsList: buildBookingsList(completed),
    prevMonth: {
      revenue: prevRevenue,
      completedCount: (prevCompleted ?? []).length,
    },
    peakDays: buildPeakDays(completed),
    peakHours: buildPeakHours(completed),
  }
}

// ─── helpers ────────────────────────────────────────────────────────────────

function buildCategories(
  completed: Array<{ service: { price: number; category: string } | null }>,
  totalRevenue: number
): CategoryStat[] {
  const map = new Map<string, { revenue: number; count: number }>()
  for (const b of completed) {
    const cat = b.service?.category ?? "Inne"
    const prev = map.get(cat) ?? { revenue: 0, count: 0 }
    map.set(cat, {
      revenue: prev.revenue + (b.service?.price ?? 0),
      count: prev.count + 1,
    })
  }
  const base = totalRevenue || 1
  return [...map.entries()]
    .map(([name, { revenue, count }]) => ({
      name,
      revenue,
      count,
      pct: Math.round((revenue / base) * 100),
    }))
    .sort((a, b) => b.revenue - a.revenue)
}

function buildPerService(
  completed: Array<{ service: { name: string; price: number } | null }>
): ServiceStat[] {
  const map = new Map<string, { revenue: number; count: number }>()
  for (const b of completed) {
    const name = b.service?.name ?? "Nieznana"
    const prev = map.get(name) ?? { revenue: 0, count: 0 }
    map.set(name, {
      revenue: prev.revenue + (b.service?.price ?? 0),
      count: prev.count + 1,
    })
  }
  return [...map.entries()]
    .map(([name, { revenue, count }]) => ({ name, revenue, count }))
    .sort((a, b) => b.revenue - a.revenue)
}

function buildTopClients(
  completed: Array<{
    client_id: string
    client: { name: string; last_name: string } | null
    service: { price: number } | null
  }>
): ClientStat[] {
  const map = new Map<string, ClientStat>()
  for (const b of completed) {
    const id = b.client_id
    const existing = map.get(id) ?? {
      id,
      name: b.client ? `${b.client.name} ${b.client.last_name}` : "—",
      visits: 0,
      revenue: 0,
    }
    map.set(id, {
      ...existing,
      visits: existing.visits + 1,
      revenue: existing.revenue + (b.service?.price ?? 0),
    })
  }
  return [...map.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 5)
}

function buildChart(
  rows: Array<{ date: string; service: { price: number } | null }>,
  currentYear: number,
  currentMonth: number
): ChartPoint[] {
  const points: ChartPoint[] = []
  for (let i = 5; i >= 0; i--) {
    const { year, month } = shiftMonth(currentYear, currentMonth, -i)
    const start = toDateString(year, month)
    const end = toDateString(
      shiftMonth(year, month, 1).year,
      shiftMonth(year, month, 1).month
    )
    const revenue = rows
      .filter((r) => r.date >= start && r.date < end)
      .reduce((sum, r) => sum + (r.service?.price ?? 0), 0)
    points.push({
      month: new Date(year, month - 1).toLocaleDateString("pl-PL", {
        month: "short",
        year: "2-digit",
      }),
      revenue,
    })
  }
  return points
}

function buildBookingsList(
  completed: Array<{
    date: string
    client: { name: string; last_name: string } | null
    service: { name: string; price: number } | null
  }>
): BookingLine[] {
  return completed
    .map((b) => ({
      date: b.date,
      clientName: b.client ? `${b.client.name} ${b.client.last_name}` : "—",
      service: b.service?.name ?? "—",
      price: b.service?.price ?? 0,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

const DAY_LABELS = ["Pon", "Wt", "Sr", "Czw", "Pt", "Sob", "Nd"]

function buildPeakDays(completed: Array<{ date: string }>): PeakStat[] {
  const counts = new Array<number>(7).fill(0)
  for (const b of completed) {
    const dow = new Date(b.date).getDay() // 0=Sun
    const mon1 = (dow + 6) % 7 // shift to Mon=0
    counts[mon1] = (counts[mon1] ?? 0) + 1
  }
  return DAY_LABELS.map((label, i) => ({ label, count: counts[i] ?? 0 }))
}

function buildPeakHours(completed: Array<{ time: string }>): PeakStat[] {
  const counts = new Map<number, number>()
  for (const b of completed) {
    const hour = parseInt(b.time.slice(0, 2), 10)
    if (!isNaN(hour)) counts.set(hour, (counts.get(hour) ?? 0) + 1)
  }
  if (counts.size === 0) return []

  const minHour = Math.min(...counts.keys())
  const maxHour = Math.max(...counts.keys())

  return Array.from({ length: maxHour - minHour + 1 }, (_, i) => {
    const hour = minHour + i
    return {
      label: `${String(hour).padStart(2, "0")}:00`,
      count: counts.get(hour) ?? 0,
    }
  })
}
