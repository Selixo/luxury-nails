export const DAYS_PL: Record<string, string> = {
  Monday: "Pon",
  Tuesday: "Wt",
  Wednesday: "Śr",
  Thursday: "Czw",
  Friday: "Pt",
  Saturday: "Sob",
  Sunday: "Niedz",
}

export function toDayPL(day: string): string {
  return DAYS_PL[day] ?? day
}

export function formatDays(days: readonly string[]): string {
  const first = days[0]
  const last = days[days.length - 1]
  if (!first || !last) return ""
  if (days.length === 1) return toDayPL(first)
  return `${toDayPL(first)} – ${toDayPL(last)}`
}
