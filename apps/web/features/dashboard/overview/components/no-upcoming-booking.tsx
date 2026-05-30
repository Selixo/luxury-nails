import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function NoUpcomingBooking() {
  return (
    <div className="mb-8 border border-white/8 p-6">
      <p className="mb-1 text-xs font-light tracking-[0.2em] text-white/50 uppercase">
        Brak nadchodzącej wizyty
      </p>
      <Link
        href="/dashboard/client/booking"
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-light text-gold transition-colors"
      >
        Zarezerwuj termin
        <ArrowRight size={10} aria-hidden="true" />
      </Link>
    </div>
  )
}
