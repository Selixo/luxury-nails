export type CalendarBooking = {
  id: string
  client: string
  phone: string
  service: string
  durationMin: number
  date: string // "YYYY-MM-DD"
  startHour: number // e.g. 11.5 = 11:30
  time: string // "HH:MM"
  status: "pending" | "confirmed" | "completed" | "cancelled"
}
