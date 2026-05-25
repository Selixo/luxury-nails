import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export const metadata: Metadata = { title: "Panel admina" }

const STATS = [
  { label: "Dziś", value: "3", sub: "wizyty" },
  { label: "Oczekuje", value: "4", sub: "potwierdzeń" },
  { label: "Ten tydzień", value: "11", sub: "rezerwacji" },
  { label: "Klientki", value: "24", sub: "zarejestrowane" },
]

type BookingStatus = "pending" | "confirmed"

type PendingBooking = {
  id: string
  client: string
  service: string
  date: string
  time: string
  status: BookingStatus
}

const PENDING: PendingBooking[] = [
  {
    id: "b01",
    client: "Anna Kowalska",
    service: "Manicure hybrydowy",
    date: "21 maja 2025",
    time: "11:00",
    status: "confirmed",
  },
  {
    id: "b02",
    client: "Monika Nowak",
    service: "Hybryda z zdobieniem",
    date: "21 maja 2025",
    time: "13:30",
    status: "pending",
  },
  {
    id: "b03",
    client: "Joanna Mazur",
    service: "Nail Art 3D",
    date: "22 maja 2025",
    time: "10:30",
    status: "pending",
  },
  {
    id: "b04",
    client: "Zuzanna Karpik",
    service: "Przedłużanie żelem",
    date: "22 maja 2025",
    time: "14:00",
    status: "confirmed",
  },
]

const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: "Oczekuje",
  confirmed: "Potwierdzona",
}

const STATUS_STYLE: Record<BookingStatus, string> = {
  pending: "border-amber-400/30 text-amber-400/70",
  confirmed: "border-emerald-400/25 text-emerald-400/65",
}

export default function AdminPage() {
  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Panel admina
        </p>
        <h1 className="mb-10 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Przegląd
        </h1>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-2 divide-x divide-y divide-white/5 border border-white/5 sm:grid-cols-4 sm:divide-y-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-5 py-5">
              <p className="font-display text-2xl font-light text-gold sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs font-light text-white/35">
                {stat.label} · {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Upcoming bookings */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-light tracking-[0.2em] text-white/40 uppercase">
            Najbliższe wizyty
          </p>
          <Link
            href="/panel/admin/wizyty"
            className="flex items-center gap-1.5 text-xs font-light text-white/30 transition-colors hover:text-gold focus-visible:text-gold"
          >
            Wszystkie
            <ArrowRight size={10} aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-col divide-y divide-white/5 border border-white/8">
          {PENDING.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-sm font-light text-white/80">
                    {booking.client}
                  </p>
                  <span
                    className={cn(
                      "rounded-sm border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase",
                      STATUS_STYLE[booking.status]
                    )}
                  >
                    {STATUS_LABEL[booking.status]}
                  </span>
                </div>
                <p className="mt-0.5 text-xs font-light text-white/35">
                  {booking.service}
                </p>
              </div>
              <p className="text-xs font-light text-white/40">
                {booking.date} · {booking.time}
              </p>
            </div>
          ))}
        </div>

        {/* Wolne okna dziś */}
        <div className="mt-10">
          <p className="mb-4 text-xs font-light tracking-[0.2em] text-white/40 uppercase">
            Wolne okna dziś — śr, 21 maja
          </p>
          <div className="flex flex-col divide-y divide-white/5 border border-white/8">
            {(
              [
                {
                  time: "09:00 – 10:45",
                  free: true,
                  label: "Wolne · 1h 45min",
                },
                {
                  time: "11:00 – 12:00",
                  free: false,
                  label: "Anna Kowalska",
                  sub: "Manicure hybrydowy",
                },
                { time: "12:15 – 13:15", free: true, label: "Wolne · 1h" },
                {
                  time: "13:30 – 15:00",
                  free: false,
                  label: "Monika Nowak",
                  sub: "Hybryda z zdobieniem",
                },
                {
                  time: "15:15 – 17:00",
                  free: true,
                  label: "Wolne · 1h 45min",
                },
              ] as const
            ).map((slot, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3">
                <span className="w-28 shrink-0 text-xs font-light text-white/35">
                  {slot.time}
                </span>
                {slot.free ? (
                  <span className="text-xs font-light text-emerald-400/45">
                    {slot.label}
                  </span>
                ) : (
                  <span className="text-xs font-light text-white/55">
                    {slot.label}
                    {"sub" in slot && (
                      <span className="ml-2 text-white/25">{slot.sub}</span>
                    )}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
