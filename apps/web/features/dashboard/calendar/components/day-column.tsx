import { cn } from "@workspace/ui/lib/utils"
import { STATUS_STYLE, HOUR_HEIGHT } from "../constants"
import type { CalendarBooking } from "../types"

type Props = {
  dateStr: string
  hours: number[]
  hourStart: number
  bookings: CalendarBooking[]
  onSelect: (booking: CalendarBooking) => void
}

export function DayColumn({ hours, hourStart, bookings, onSelect }: Props) {
  const totalHeight = hours.length * HOUR_HEIGHT

  return (
    <div
      className="relative border-l border-white/5"
      style={{ height: totalHeight }}
    >
      {hours.map((h) => (
        <div
          key={h}
          className="absolute right-0 left-0 border-t border-white/5"
          style={{ top: (h - hourStart) * HOUR_HEIGHT }}
        />
      ))}

      {bookings.map((b) => {
        const top = (b.startHour - hourStart) * HOUR_HEIGHT
        const height = Math.max((b.durationMin / 60) * HOUR_HEIGHT, 24)
        return (
          <button
            key={b.id}
            onClick={() => onSelect(b)}
            className={cn(
              "absolute right-1 left-1 cursor-pointer overflow-hidden px-2 py-1 text-left transition-opacity outline-none hover:opacity-75 focus-visible:ring-1 focus-visible:ring-gold/50",
              STATUS_STYLE[b.status]
            )}
            style={{ top, height }}
          >
            <p className="mb-1 truncate text-sm leading-tight font-light">
              {b.client}
            </p>
            {height >= 40 && (
              <p className="truncate text-[9px] leading-tight">{b.service}</p>
            )}
            {height >= 56 && (
              <p className="text-[9px] leading-tight">{b.time}</p>
            )}
          </button>
        )
      })}
    </div>
  )
}
