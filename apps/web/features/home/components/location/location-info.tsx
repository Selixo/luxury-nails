"use client"

import Link from "next/link"
import { Clock, MapPin, Navigation, Phone } from "lucide-react"
import { useInView } from "@/hooks/useInView"
import { formatDays } from "@/lib/days"
import type { SALON } from "@/config/salon"

type Props = {
  salon: typeof SALON
  mapsUrl: string
}

export function LocationInfo({ salon, mapsUrl }: Props) {
  const { ref, inView } = useInView()
  const { address, phone, openingHours } = salon

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center gap-8 border-t border-white/5 bg-white/[0.02] px-8 py-10 transition-[opacity,transform] delay-200 duration-[900ms] ease-out motion-reduce:transition-none lg:border-t-0 lg:border-l lg:px-10 lg:py-12"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(20px)",
      }}
    >
      <div>
        <p className="mb-3 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Znajdź nas
        </p>
        <h2
          id="location-heading"
          className="font-display text-3xl font-light tracking-wide text-white lg:text-4xl"
        >
          Jesteśmy tutaj
        </h2>
        <div aria-hidden="true" className="mt-4 h-px w-10 bg-gold/30" />
      </div>

      <address className="not-italic">
        <ul
          className="flex flex-col gap-5"
          aria-label="Dane kontaktowe i godziny"
        >
          <li className="flex items-start gap-4">
            <MapPin
              size={14}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-gold/50"
            />
            <div className="text-sm leading-relaxed font-light text-white/65">
              <p>{address.street}</p>
              <p>
                {address.postalCode} {address.city}
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <Clock
              size={14}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-gold/50"
            />
            <ul className="flex flex-col gap-1.5" aria-label="Godziny otwarcia">
              {openingHours.map((slot) => (
                <li
                  key={slot.days[0]}
                  className="flex gap-4 text-sm font-light text-white/65"
                >
                  <span className="w-16 shrink-0 text-white/55">
                    {formatDays(slot.days)}
                  </span>
                  <span>
                    {slot.open} – {slot.close}
                  </span>
                </li>
              ))}
              <li className="flex gap-4 text-sm font-light">
                <span className="w-16 shrink-0 text-white/55">Niedz</span>
                <span className="text-white/50">Zamknięte</span>
              </li>
            </ul>
          </li>

          <li className="flex items-center gap-4">
            <Phone
              size={14}
              aria-hidden="true"
              className="shrink-0 text-gold/50"
            />
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              aria-label={`Zadzwoń pod numer ${phone}`}
              className="text-sm font-light text-white/65 transition-colors duration-300 hover:text-gold"
            >
              {phone}
            </a>
          </li>
        </ul>
      </address>

      <Link
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Otwórz nawigację w Google Maps"
        className="group flex w-fit items-center gap-3 border border-gold/35 px-6 py-3 text-[11px] tracking-[0.25em] text-gold/80 uppercase transition-colors duration-300 hover:border-gold/60 hover:text-gold"
      >
        <Navigation
          size={12}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
        <span>Nawiguj</span>
      </Link>
    </div>
  )
}
