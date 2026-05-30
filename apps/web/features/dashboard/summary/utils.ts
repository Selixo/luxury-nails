import type { MonthParam } from "./types"

export function parseMonthParam(raw: string | undefined): MonthParam {
  if (raw) {
    const [yearStr, monthStr] = raw.split("-")
    const year = Number(yearStr)
    const month = Number(monthStr)
    if (year > 2000 && month >= 1 && month <= 12) return { year, month }
  }
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth() + 1 }
}

export function getAvailableMonths(
  count = 4
): Array<{ value: string; label: string }> {
  const now = new Date()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    return {
      value: `${year}-${String(month).padStart(2, "0")}`,
      label: d.toLocaleDateString("pl-PL", { month: "long", year: "numeric" }),
    }
  })
}
