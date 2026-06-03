import { createAdminClient } from "@/lib/supabase/admin"
import type { WorkingHours } from "@/features/dashboard/settings/types"
import type { CalendarBooking } from "./types"

const DEFAULT_WORKING_HOURS: WorkingHours = {
  pon: { enabled: true, start: "09:00", end: "18:00" },
  wt: { enabled: true, start: "09:00", end: "18:00" },
  sr: { enabled: true, start: "09:00", end: "18:00" },
  czw: { enabled: true, start: "09:00", end: "18:00" },
  pt: { enabled: true, start: "09:00", end: "18:00" },
  sob: { enabled: true, start: "09:00", end: "18:00" },
}

export function getWeekMonday(offsetWeeks: number): Date {
  const today = new Date()
  const day = today.getDay()
  const toMonday = day === 0 ? -6 : 1 - day
  const monday = new Date(today)
  monday.setDate(today.getDate() + toMonday + offsetWeeks * 7)
  monday.setHours(0, 0, 0, 0)
  return monday
}

export function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export async function getCalendarData(weekOffset: number): Promise<{
  bookings: CalendarBooking[]
  workingHours: WorkingHours
  mondayDate: string
}> {
  const monday = getWeekMonday(weekOffset)
  const saturday = new Date(monday)
  saturday.setDate(monday.getDate() + 5)

  const mondayDate = toDateStr(monday)
  const saturdayStr = toDateStr(saturday)

  const admin = createAdminClient()

  const [{ data: bookingsRaw }, { data: settings }] = await Promise.all([
    admin
      .from("bookings")
      .select(
        "id, date, time, status, client:profiles!bookings_client_id_fkey(name, last_name, phone), service:services(name, duration_min)"
      )
      .gte("date", mondayDate)
      .lte("date", saturdayStr)
      .order("time"),
    admin.from("settings").select("working_hours").single(),
  ])

  const workingHours =
    (settings?.working_hours as WorkingHours | null) ?? DEFAULT_WORKING_HOURS

  const bookings = (bookingsRaw ?? []).map((b) => {
    const client = b.client as {
      name: string
      last_name: string
      phone: string
    }
    const service = b.service as { name: string; duration_min: number }
    const parts = b.time.split(":")
    const h = Number(parts[0] ?? 0)
    const m = Number(parts[1] ?? 0)
    return {
      id: b.id,
      client: `${client.name} ${client.last_name}`,
      phone: client.phone,
      service: service.name,
      durationMin: service.duration_min,
      date: b.date,
      startHour: h + m / 60,
      time: b.time.slice(0, 5),
      status: b.status as CalendarBooking["status"],
    }
  })

  return { bookings, workingHours, mondayDate }
}
