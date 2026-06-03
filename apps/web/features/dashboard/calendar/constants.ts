import type { CalendarBooking } from "./types"
import type { DayKey } from "@/features/dashboard/settings/types"

export const HOUR_HEIGHT = 64

export const DAY_KEY_ORDER: DayKey[] = ["pon", "wt", "sr", "czw", "pt", "sob"]

export const DAY_KEY_TO_OFFSET: Record<DayKey, number> = {
  pon: 0,
  wt: 1,
  sr: 2,
  czw: 3,
  pt: 4,
  sob: 5,
}

export const DAY_LABEL: Record<DayKey, string> = {
  pon: "Pon",
  wt: "Wt",
  sr: "Śr",
  czw: "Czw",
  pt: "Pt",
  sob: "Sob",
}

export const STATUS_STYLE: Record<CalendarBooking["status"], string> = {
  pending: "bg-amber-400/10 border-l-2 border-amber-400/60 text-amber-400/80",
  confirmed:
    "bg-emerald-400/10 border-l-2 border-emerald-400/50 text-emerald-400/80",
  completed: "bg-gold/10 border-l-2 border-gold/40 text-gold/80",
  cancelled: "bg-red-400/10 border-l-2 border-red-400/40 text-red-400/90",
}

export const STATUS_LABEL: Record<CalendarBooking["status"], string> = {
  pending: "Oczekuje",
  confirmed: "Potwierdzona",
  completed: "Zakończona",
  cancelled: "Anulowana",
}

export const STATUS_COLOR: Record<CalendarBooking["status"], string> = {
  pending: "text-amber-400/80",
  confirmed: "text-emerald-400/70",
  completed: "text-gold/70",
  cancelled: "text-red-400/60",
}
