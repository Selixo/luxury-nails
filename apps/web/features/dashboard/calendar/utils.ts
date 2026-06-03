import type { DayKey, WorkingHours } from "@/features/dashboard/settings/types"
import { DAY_KEY_ORDER, DAY_KEY_TO_OFFSET } from "./constants"

export type EnabledDay = {
  key: DayKey
  date: Date
  dateStr: string
  config: WorkingHours[DayKey]
}

export function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export function parseHourFloor(time: string): number {
  return parseInt(time.split(":")[0] ?? "0")
}

export function parseHourCeil(time: string): number {
  const [h, m] = time.split(":").map(Number)
  return (m ?? 0) > 0 ? (h ?? 0) + 1 : (h ?? 0)
}

export function formatWeekRange(days: EnabledDay[]): string {
  const first = days[0]
  const last = days[days.length - 1]
  if (!first || !last) return ""
  const fmt = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
  })
  return `${fmt.format(first.date)} – ${fmt.format(last.date)} ${first.date.getFullYear()}`
}

export function getEnabledDays(
  workingHours: WorkingHours,
  mondayDate: string
): EnabledDay[] {
  return DAY_KEY_ORDER.filter((key) => workingHours[key]?.enabled).map(
    (key) => {
      const monday = new Date(`${mondayDate}T12:00:00`)
      const d = new Date(monday)
      d.setDate(monday.getDate() + DAY_KEY_TO_OFFSET[key])
      return { key, date: d, dateStr: toDateStr(d), config: workingHours[key] }
    }
  )
}

export function getHourRange(days: EnabledDay[]): {
  hourStart: number
  hourEnd: number
} {
  if (days.length === 0) return { hourStart: 9, hourEnd: 18 }
  const configs = days.map((d) => d.config)
  return {
    hourStart: Math.min(...configs.map((c) => parseHourFloor(c.start))),
    hourEnd: Math.max(...configs.map((c) => parseHourCeil(c.end))),
  }
}
