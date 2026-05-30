import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import {
  STATUS_LABEL,
  STATUS_STYLE,
} from "@/features/dashboard/bookings/constants"
import type { UpcomingBooking } from "../admin-actions"

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pl-PL", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(iso + "T00:00:00"))
}

type Props = {
  bookings: UpcomingBooking[]
}

export function UpcomingBookings({ bookings }: Props) {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <p className="text-xs font-light tracking-[0.2em] text-white/70 uppercase">
            Nadchodzące
          </p>
          {bookings.length > 0 && (
            <span className="text-xs font-light text-gold tabular-nums">
              {bookings.length}
            </span>
          )}
        </div>
        <Link
          href="/dashboard/admin/bookings"
          className="flex items-center gap-1.5 text-xs font-light text-gold transition-colors focus-visible:text-gold"
        >
          Zarządzaj
          <ArrowRight size={10} aria-hidden="true" />
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="border border-white/5 px-6 py-8 text-center">
          <p className="text-sm font-light text-white/50">
            Brak nadchodzących wizyt
          </p>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-white/5 border border-white/8">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-sm font-light text-white/80">
                    {booking.client.name} {booking.client.last_name}
                  </p>
                  <span
                    className={cn(
                      "border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase",
                      STATUS_STYLE[booking.status]
                    )}
                  >
                    {STATUS_LABEL[booking.status]}
                  </span>
                </div>
                <p className="mt-0.5 text-xs font-light text-white/50">
                  {booking.service.name}
                </p>
              </div>
              <p className="shrink-0 text-xs font-light text-white/50">
                {formatDate(booking.date)} · {booking.time}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
