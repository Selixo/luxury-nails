import { cn } from "@workspace/ui/lib/utils"
import { DayColumn } from "./day-column"
import { DAY_LABEL, HOUR_HEIGHT } from "../constants"
import type { EnabledDay } from "../utils"
import type { CalendarBooking } from "../types"

type Props = {
  enabledDays: EnabledDay[]
  hours: number[]
  hourStart: number
  today: string
  bookings: CalendarBooking[]
  onSelect: (booking: CalendarBooking) => void
}

export function CalendarGrid({
  enabledDays,
  hours,
  hourStart,
  today,
  bookings,
  onSelect,
}: Props) {
  const cols = `48px repeat(${enabledDays.length}, 1fr)`
  const totalHeight = hours.length * HOUR_HEIGHT

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: `${enabledDays.length * 120 + 48}px` }}>
        <div
          className="border-b border-white/8 pb-2"
          style={{ display: "grid", gridTemplateColumns: cols }}
        >
          <div />
          {enabledDays.map(({ key, date, dateStr }) => {
            const isToday = dateStr === today
            return (
              <div key={key} className="px-2 text-center">
                <p
                  className={cn(
                    "text-[10px] font-light tracking-[0.15em] uppercase",
                    isToday ? "text-gold/80" : "text-white/50"
                  )}
                >
                  {DAY_LABEL[key]}
                </p>
                <p
                  className={cn(
                    "font-display text-lg font-light",
                    isToday ? "text-gold" : "text-white/50"
                  )}
                >
                  {date.getDate()}
                </p>
              </div>
            )
          })}
        </div>

        <div
          className="relative"
          style={{ display: "grid", gridTemplateColumns: cols }}
        >
          <div className="relative" style={{ height: totalHeight }}>
            {hours.map((h) => (
              <div
                key={h}
                className="absolute right-0 flex w-full items-start justify-end pr-2"
                style={{ top: (h - hourStart) * HOUR_HEIGHT }}
              >
                <span className="-translate-y-2 text-[10px] font-light text-white/50">
                  {h}:00
                </span>
              </div>
            ))}
          </div>

          {enabledDays.map((day) => (
            <DayColumn
              key={day.key}
              dateStr={day.dateStr}
              hours={hours}
              hourStart={hourStart}
              bookings={bookings.filter((b) => b.date === day.dateStr)}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
