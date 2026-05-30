import { AdminBookingStatus } from "./types"

export const BOOKINGS_LIMIT = 15

export const STATUS_LABEL: Record<AdminBookingStatus, string> = {
  pending: "Oczekuje",
  confirmed: "Potwierdzona",
  completed: "Zakończona",
  cancelled: "Anulowana",
}

export const STATUS_STYLE: Record<AdminBookingStatus, string> = {
  pending: "border-amber-400/30 text-amber-400/80",
  confirmed: "border-emerald-400/25 text-emerald-400/65",
  completed: "border-gold/25 text-gold/80",
  cancelled: "border-red-400/25 text-red-400/80",
}
