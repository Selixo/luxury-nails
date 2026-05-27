"use client"

import { cn } from "@workspace/ui/lib/utils"

type Props = {
  slots: string[]
  isLoading: boolean
  selected: string
  onSelect: (slot: string) => void
  hasServiceAndDate: boolean
  error?: string
}

function SlotHint({
  hasServiceAndDate,
  isLoading,
  slotsCount,
}: {
  hasServiceAndDate: boolean
  isLoading: boolean
  slotsCount: number
}) {
  if (!hasServiceAndDate)
    return (
      <p className="text-xs font-light text-white/50 italic">
        Wybierz usługę i datę, aby zobaczyć dostępne godziny.
      </p>
    )

  if (isLoading)
    return (
      <p className="text-xs font-light text-white/50">Ładowanie terminów...</p>
    )

  if (slotsCount === 0)
    return (
      <p className="text-xs font-light text-white/50">
        Brak wolnych terminów w tym dniu.
      </p>
    )
  return null
}

export function TimeSlotPicker({
  slots,
  isLoading,
  selected,
  onSelect,
  hasServiceAndDate,
  error,
}: Props) {
  const hint = SlotHint({
    hasServiceAndDate,
    isLoading,
    slotsCount: slots.length,
  })

  return (
    <div>
      <p
        id="time-label"
        className="mb-3 text-xs font-light tracking-[0.2em] text-white/80 uppercase"
      >
        Preferowana godzina
      </p>

      {hint ?? (
        <div
          role="group"
          aria-labelledby="time-label"
          className="grid grid-cols-4 gap-2 sm:grid-cols-6"
        >
          {slots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => onSelect(slot)}
              aria-pressed={selected === slot}
              className={cn(
                "border py-2 text-xs font-light tracking-wide transition-colors outline-none focus-visible:ring-1 focus-visible:ring-gold/50",
                selected === slot
                  ? "border-gold/50 bg-gold/10 text-gold"
                  : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/60"
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p role="alert" className="mt-2 text-xs font-light text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
