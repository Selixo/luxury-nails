export type WorkingDay = { start: string; end: string; enabled: boolean }
export type BookedSlot = { time: string; duration_min: number }

const DAYS = ["niedz", "pon", "wt", "sr", "czw", "pt", "sob"] as const

function toMin(time: string): number {
  const [hours = 0, minutes = 0] = time.split(":").map(Number)
  return hours * 60 + minutes
}

function fromMin(minutes: number): string {
  const h = String(Math.floor(minutes / 60)).padStart(2, "0")
  const m = String(minutes % 60).padStart(2, "0")
  return `${h}:${m}`
}

export function getDayKey(dateStr: string): string {
  return DAYS[new Date(dateStr + "T12:00:00Z").getUTCDay()]!
}

export function generateAvailableSlots(
  workingDay: WorkingDay,
  booked: BookedSlot[],
  serviceDurationMin: number,
  breakMin: number,
  intervalMin = 30
): string[] {
  if (!workingDay.enabled) return []

  const openMin = toMin(workingDay.start)
  const closeMin = toMin(workingDay.end)
  const slots: string[] = []

  for (
    let start = openMin;
    start + serviceDurationMin <= closeMin;
    start += intervalMin
  ) {
    const end = start + serviceDurationMin

    const isFree = booked.every((b) => {
      const bStart = toMin(b.time)
      const bEnd = bStart + b.duration_min + breakMin
      return end <= bStart || start >= bEnd
    })

    if (isFree) slots.push(fromMin(start))
  }

  return slots
}
