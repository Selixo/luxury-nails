import { cn } from "@workspace/ui/lib/utils"
import {
  STATUS_LABEL,
  STATUS_STYLE,
} from "@/features/dashboard/bookings/constants"
import type { TodayBooking } from "../admin-actions"

function formatTodayHeading(): string {
  return new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date())
}

type Props = {
  bookings: TodayBooking[]
}

export function TodaySchedule({ bookings }: Props) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <p className="text-xs font-light tracking-[0.2em] text-white/70 uppercase">
            Dziś
          </p>
          {bookings.length > 0 && (
            <span className="text-xs font-light text-gold tabular-nums">
              {bookings.length}
            </span>
          )}
        </div>
        <p className="text-xs font-light text-white/50">
          {formatTodayHeading()}
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="border border-white/5 px-6 py-8 text-center">
          <p className="text-sm font-light text-white/50">Brak wizyt na dziś</p>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-white/5 border border-white/8">
          {bookings.map((booking) => (
            <li key={booking.id} className="flex items-center gap-4 px-6 py-3">
              <span className="w-12 shrink-0 text-xs font-light text-gold tabular-nums">
                {booking.time}
              </span>
              <span className="min-w-0 flex-1 text-xs font-light text-white/70">
                {booking.client.name} {booking.client.last_name}
              </span>
              <span className="hidden text-xs font-light text-white/50 sm:block">
                {booking.service.name}
              </span>
              <span
                className={cn(
                  "shrink-0 border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase",
                  STATUS_STYLE[booking.status]
                )}
              >
                {STATUS_LABEL[booking.status]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
