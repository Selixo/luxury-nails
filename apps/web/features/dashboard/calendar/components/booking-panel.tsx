"use client"

import { X } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { STATUS_LABEL, STATUS_COLOR } from "../constants"
import type { CalendarBooking } from "../types"

function endTime(start: string, durationMin: number): string {
  const [h, m] = start.split(":").map(Number)
  const total = (h ?? 0) * 60 + (m ?? 0) + durationMin
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`
}

type Props = {
  booking: CalendarBooking | null
  onClose: () => void
}

export function BookingPanel({ booking, onClose }: Props) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-200",
          booking ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed top-0 right-0 z-50 flex h-full w-80 flex-col border-l border-white/8 bg-[#09090b] transition-transform duration-200 ease-out",
          booking ? "translate-x-0" : "translate-x-full"
        )}
      >
        {booking && (
          <>
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
              <p className="text-xs font-light tracking-[0.2em] text-white/60 uppercase">
                Szczegóły wizyty
              </p>
              <button
                onClick={onClose}
                aria-label="Zamknij panel"
                className="flex h-7 w-7 items-center justify-center text-white/30 transition-colors outline-none hover:text-white/60 focus-visible:ring-1 focus-visible:ring-gold/50"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex flex-col gap-6 px-6 py-6">
              <div>
                <p className="mb-1 text-[10px] font-light tracking-[0.15em] text-white/50 uppercase">
                  Klientka
                </p>
                <p className="text-sm font-light text-white/80">
                  {booking.client}
                </p>
                <a
                  href={`tel:${booking.phone}`}
                  className="mt-0.5 text-xs font-light text-white/50 transition-colors hover:text-gold/70"
                >
                  {booking.phone}
                </a>
              </div>

              <div>
                <p className="mb-1 text-[10px] font-light tracking-[0.15em] text-white/50 uppercase">
                  Usługa
                </p>
                <p className="text-sm font-light text-white/80">
                  {booking.service}
                </p>
                <p className="mt-0.5 text-xs font-light text-white/50">
                  {booking.durationMin} min
                </p>
              </div>

              <div>
                <p className="mb-1 text-[10px] font-light tracking-[0.15em] text-white/50 uppercase">
                  Termin
                </p>
                <p className="text-sm font-light text-white/80">
                  {new Intl.DateTimeFormat("pl-PL", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }).format(new Date(`${booking.date}T12:00:00`))}
                </p>
                <p className="mt-0.5 text-xs font-light text-white/50">
                  {booking.time} — {endTime(booking.time, booking.durationMin)}
                </p>
              </div>

              <div>
                <p className="mb-1 text-[10px] font-light tracking-[0.15em] text-white/50 uppercase">
                  Status
                </p>
                <p
                  className={cn(
                    "text-sm font-light",
                    STATUS_COLOR[booking.status]
                  )}
                >
                  {STATUS_LABEL[booking.status]}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
