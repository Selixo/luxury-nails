"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled"

type CalBooking = {
  id: string
  client: string
  service: string
  date: string // "YYYY-MM-DD"
  startHour: number // e.g. 11.0 = 11:00, 11.5 = 11:30
  durationMin: number
  status: BookingStatus
}

const BOOKINGS: CalBooking[] = [
  {
    id: "b01",
    client: "Anna Kowalska",
    service: "Manicure hybrydowy",
    date: "2025-05-21",
    startHour: 11,
    durationMin: 60,
    status: "confirmed",
  },
  {
    id: "b02",
    client: "Monika Nowak",
    service: "Hybryda z zdobieniem",
    date: "2025-05-21",
    startHour: 13.5,
    durationMin: 90,
    status: "pending",
  },
  {
    id: "b03",
    client: "Joanna Mazur",
    service: "Nail Art 3D",
    date: "2025-05-22",
    startHour: 10.5,
    durationMin: 120,
    status: "pending",
  },
  {
    id: "b04",
    client: "Zuzanna Karpik",
    service: "Przedłużanie żelem",
    date: "2025-05-22",
    startHour: 14,
    durationMin: 90,
    status: "confirmed",
  },
  {
    id: "b05",
    client: "Karolina Wiśniewska",
    service: "Żel na naturalną płytkę",
    date: "2025-05-19",
    startHour: 12,
    durationMin: 60,
    status: "completed",
  },
  {
    id: "b06",
    client: "Natalia Brzezińska",
    service: "Manicure klasyczny",
    date: "2025-05-20",
    startHour: 9,
    durationMin: 45,
    status: "completed",
  },
  {
    id: "b07",
    client: "Aleksandra Wróbel",
    service: "Hybryda chrome",
    date: "2025-05-23",
    startHour: 10,
    durationMin: 75,
    status: "confirmed",
  },
  {
    id: "b08",
    client: "Paulina Szymańska",
    service: "Manicure hybrydowy",
    date: "2025-05-24",
    startHour: 15,
    durationMin: 60,
    status: "confirmed",
  },
]

const STATUS_STYLE: Record<BookingStatus, string> = {
  pending: "bg-amber-400/15 border-l-2 border-amber-400/60 text-amber-400/80",
  confirmed:
    "bg-emerald-400/10 border-l-2 border-emerald-400/50 text-emerald-400/80",
  completed: "bg-gold/10 border-l-2 border-gold/40 text-gold/70",
  cancelled: "bg-red-400/10 border-l-2 border-red-400/40 text-red-400/60",
}

const DAY_LABELS = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob"]

const HOUR_START = 9
const HOUR_END = 18
const HOUR_HEIGHT = 64 // px per hour
const TOTAL_HEIGHT = (HOUR_END - HOUR_START) * HOUR_HEIGHT

// Week offset 0 = week of May 19-24 2025
function getWeekDates(offsetWeeks: number) {
  // Base: Monday May 19 2025
  const base = new Date(2025, 4, 19) // month is 0-indexed
  base.setDate(base.getDate() + offsetWeeks * 7)
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    return d
  })
}

function toDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function formatWeekRange(dates: Date[]) {
  const fmt = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
  })
  return `${fmt.format(dates[0])} – ${fmt.format(dates[5])} ${dates[0].getFullYear()}`
}

export default function KalendarzPage() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [tooltip, setTooltip] = useState<string | null>(null)

  const weekDates = getWeekDates(weekOffset)
  const dateStrings = weekDates.map(toDateStr)

  const hours = Array.from(
    { length: HOUR_END - HOUR_START },
    (_, i) => HOUR_START + i
  )

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Zarządzanie
        </p>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
            Kalendarz
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setWeekOffset((o) => o - 1)}
              aria-label="Poprzedni tydzień"
              className="flex h-8 w-8 items-center justify-center border border-white/10 text-white/40 transition-colors outline-none hover:border-white/20 hover:text-white/70 focus-visible:ring-1 focus-visible:ring-gold/50"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="min-w-[200px] text-center text-xs font-light text-white/50">
              {formatWeekRange(weekDates)}
            </span>
            <button
              onClick={() => setWeekOffset((o) => o + 1)}
              aria-label="Następny tydzień"
              className="flex h-8 w-8 items-center justify-center border border-white/10 text-white/40 transition-colors outline-none hover:border-white/20 hover:text-white/70 focus-visible:ring-1 focus-visible:ring-gold/50"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mb-4 flex flex-wrap gap-4">
          {(
            [
              "pending",
              "confirmed",
              "completed",
              "cancelled",
            ] as BookingStatus[]
          ).map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <div
                className={cn(
                  "h-2.5 w-2.5 rounded-sm border-l-2",
                  STATUS_STYLE[s]
                )}
              />
              <span className="text-[10px] font-light tracking-[0.15em] text-white/30 uppercase">
                {
                  {
                    pending: "Oczekuje",
                    confirmed: "Potwierdzona",
                    completed: "Zakończona",
                    cancelled: "Anulowana",
                  }[s]
                }
              </span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Day headers */}
            <div className="mb-0 grid grid-cols-[48px_repeat(6,1fr)] border-b border-white/8 pb-2">
              <div /> {/* hour gutter */}
              {weekDates.map((d, i) => {
                const isToday = toDateStr(d) === "2025-05-21"
                return (
                  <div key={i} className="px-2 text-center">
                    <p
                      className={cn(
                        "text-[10px] font-light tracking-[0.15em] uppercase",
                        isToday ? "text-gold/70" : "text-white/30"
                      )}
                    >
                      {DAY_LABELS[i]}
                    </p>
                    <p
                      className={cn(
                        "font-display text-lg font-light",
                        isToday ? "text-gold" : "text-white/50"
                      )}
                    >
                      {d.getDate()}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Time grid */}
            <div className="relative grid grid-cols-[48px_repeat(6,1fr)]">
              {/* Hour labels + horizontal lines */}
              <div className="relative" style={{ height: TOTAL_HEIGHT }}>
                {hours.map((h) => (
                  <div
                    key={h}
                    className="absolute right-0 flex w-full items-start justify-end pr-2"
                    style={{ top: (h - HOUR_START) * HOUR_HEIGHT }}
                  >
                    <span className="-translate-y-2 text-[10px] font-light text-white/20">
                      {h}:00
                    </span>
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {dateStrings.map((dateStr, colIdx) => {
                const dayBookings = BOOKINGS.filter((b) => b.date === dateStr)
                return (
                  <div
                    key={dateStr}
                    className="relative border-l border-white/5"
                    style={{ height: TOTAL_HEIGHT }}
                  >
                    {/* Hour gridlines */}
                    {hours.map((h) => (
                      <div
                        key={h}
                        className="absolute right-0 left-0 border-t border-white/5"
                        style={{ top: (h - HOUR_START) * HOUR_HEIGHT }}
                      />
                    ))}

                    {/* Bookings */}
                    {dayBookings.map((b) => {
                      const top = (b.startHour - HOUR_START) * HOUR_HEIGHT
                      const height = Math.max(
                        (b.durationMin / 60) * HOUR_HEIGHT,
                        24
                      )
                      return (
                        <div
                          key={b.id}
                          title={`${b.client} — ${b.service}`}
                          className={cn(
                            "absolute right-1 left-1 cursor-default overflow-hidden px-2 py-1 select-none",
                            STATUS_STYLE[b.status]
                          )}
                          style={{ top, height }}
                        >
                          <p className="truncate text-[10px] leading-tight font-light">
                            {b.client}
                          </p>
                          {height >= 40 && (
                            <p className="truncate text-[9px] leading-tight opacity-60">
                              {b.service}
                            </p>
                          )}
                          {height >= 56 && (
                            <p className="text-[9px] leading-tight opacity-50">
                              {String(Math.floor(b.startHour)).padStart(2, "0")}
                              :{String((b.startHour % 1) * 60).padStart(2, "0")}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
