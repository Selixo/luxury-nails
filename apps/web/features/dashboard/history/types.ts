export type HistoryVisit = {
  id: string
  date: string
  time: string
  notes: string | null
  status: "completed" | "cancelled"
  cancellation_reason: string | null
  stylist_note: string | null
  services: { id: string; name: string; price: number } | null
  ratings: { stars: number; comment: string | null } | null
}

export type RatingDraft = { stars: number; comment: string }

export type HistoryStatus = "all" | "completed" | "cancelled"

export const HISTORY_LIMIT = 10

export function formatVisitDate(isoDate: string): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate + "T00:00:00"))
}
