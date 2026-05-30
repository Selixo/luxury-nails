export type AdminBookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
export type AdminStatusFilter = AdminBookingStatus | "all"

export type AdminBooking = {
  id: string
  date: string
  time: string
  status: AdminBookingStatus
  notes: string | null
  stylist_note: string | null
  cancellation_reason: string | null
  inspiration_url: string | null
  client: {
    id: string
    name: string
    last_name: string
    phone: string
  }
  service: {
    id: string
    name: string
    price: number
    duration_min: number
  }
}

export function formatBookingDate(isoDate: string): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate + "T12:00:00Z"))
}
