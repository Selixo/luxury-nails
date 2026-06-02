"use client"

import Image from "next/image"
import { Button } from "@workspace/ui/components/button"
import type { Service } from "../actions"

type Props = {
  selectedService: Service | undefined
  date: string
  time: string
  notes: string
  inspirationUrl: string
  isPending: boolean
  onSubmit: () => void
  formatDate: (iso: string) => string
}

export function BookingSummary({
  selectedService,
  date,
  time,
  notes,
  inspirationUrl,
  isPending,
  onSubmit,
  formatDate,
}: Props) {
  return (
    <aside aria-label="Podsumowanie wizyty" className="hidden lg:block">
      <div className="sticky top-24">
        <div className="border border-white/8 bg-white/2 p-6">
          <p className="mb-6 text-xs font-light tracking-[0.3em] text-white/45 uppercase">
            Podsumowanie
          </p>

          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-1 text-xxs font-light tracking-[0.2em] text-white/55 uppercase">
                Usługa
              </p>
              {selectedService ? (
                <>
                  <p className="font-display text-lg font-light text-white">
                    {selectedService.name}
                  </p>
                  <p className="mt-0.5 text-sm font-light text-gold">
                    {selectedService.price} zł
                  </p>
                  <p className="text-xs font-light text-white/45">
                    {selectedService.duration_min} min
                  </p>
                </>
              ) : (
                <p className="text-sm font-light text-white/45 italic">
                  Nie wybrano
                </p>
              )}
            </div>

            <div aria-hidden="true" className="h-px bg-white/5" />

            <div>
              <p className="mb-1 text-xxs font-light tracking-[0.2em] text-white/55 uppercase">
                Termin
              </p>
              {date ? (
                <p className="font-display text-lg font-light text-white capitalize">
                  {formatDate(date)}
                </p>
              ) : (
                <p className="text-sm font-light text-white/45 italic">
                  Nie wybrano
                </p>
              )}
              {time && (
                <p className="mt-0.5 text-xl font-light text-gold">{time}</p>
              )}
            </div>

            {notes && (
              <>
                <div aria-hidden="true" className="h-px bg-white/5" />
                <div>
                  <p className="mb-1 text-xxs font-light tracking-[0.2em] text-white/55 uppercase">
                    Uwagi
                  </p>
                  <p className="wrap-break-words line-clamp-4 text-xs leading-relaxed font-light text-white/45">
                    {notes}
                  </p>
                </div>
              </>
            )}

            {inspirationUrl && (
              <>
                <div aria-hidden="true" className="h-px bg-white/5" />
                <div>
                  <p className="mb-2 text-xxs font-light tracking-[0.2em] text-white/55 uppercase">
                    Inspiracja
                  </p>
                  <Image
                    src={inspirationUrl}
                    alt="Inspiracja"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto max-h-36 w-full border border-white/8 object-cover"
                  />
                </div>
              </>
            )}
          </div>

          <div aria-hidden="true" className="my-6 h-px bg-white/5" />

          <Button
            type="button"
            disabled={isPending}
            variant="gold-fill"
            onClick={onSubmit}
            className="w-full border-gold/50 px-6 py-3.5 tracking-widest uppercase disabled:opacity-60"
          >
            <span className="relative z-10">
              {isPending ? "Wysyłanie..." : "Wyślij prośbę"}
            </span>
          </Button>

          <p className="mt-4 text-center text-xs font-light text-white/50">
            Potwierdzenie telefoniczne w ciągu 24h
          </p>
        </div>
      </div>
    </aside>
  )
}
