"use client"

import { Check } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import type { Service } from "../actions"

type Props = {
  services: Service[]
  selected: string
  onSelect: (id: string) => void
  error?: string
}

export function ServicePicker({ services, selected, onSelect, error }: Props) {
  const categories = [...new Set(services.map((s) => s.category))]

  return (
    <div>
      <p
        id="service-label"
        className="mb-4 text-xs font-light tracking-[0.2em] text-white/70 uppercase"
      >
        Usługa
      </p>
      <div
        role="group"
        aria-labelledby="service-label"
        className="flex flex-col gap-4"
        aria-describedby={error ? "service-error" : undefined}
      >
        {categories.map((cat) => (
          <div key={cat}>
            <p className="mt-4 mb-1 text-xxs font-light tracking-[0.25em] text-white/50 uppercase first:mt-0">
              {cat}
            </p>
            {services
              .filter((s) => s.category === cat)
              .map((svc) => {
                const isSelected = selected === svc.id
                return (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => onSelect(svc.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 border-b px-1 py-3 text-left transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-gold/40",
                      isSelected
                        ? "border-gold/25 text-white"
                        : "border-white/6 text-white/50 hover:border-white/15 hover:text-white/75"
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                          isSelected
                            ? "border-gold/60 bg-gold/10"
                            : "border-white/15"
                        )}
                      >
                        {isSelected && (
                          <Check
                            size={9}
                            className="text-gold"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      <span className="text-sm font-light">{svc.name}</span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span
                        className={cn(
                          "block text-xs font-light",
                          isSelected ? "text-gold" : "text-white/80"
                        )}
                      >
                        {svc.price} zł
                      </span>
                      <span className="block text-xxs font-light text-white/50">
                        {svc.duration_min} min
                      </span>
                    </span>
                  </button>
                )
              })}
          </div>
        ))}
      </div>
      {error && (
        <p
          id="service-error"
          role="alert"
          className="mt-2 text-xs font-light text-red-400/80"
        >
          {error}
        </p>
      )}
    </div>
  )
}
