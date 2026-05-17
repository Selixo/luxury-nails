"use client"

import { useCallback, useEffect, useState } from "react"
import type { AutoplayType } from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { useCarousel } from "@workspace/ui/components/carousel"

type Props = {
  plugin: AutoplayType
  resumeDelay: number
}

export function ReviewsNavigation({ plugin, resumeDelay }: Props) {
  const { api } = useCarousel()
  const [current, setCurrent] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!api) return
    setTotal(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const handleNav = useCallback(
    (action: () => void) => {
      action()
      plugin.stop()
      setTimeout(() => plugin.play(), resumeDelay)
    },
    [plugin, resumeDelay]
  )

  const goPrev = useCallback(
    () => handleNav(() => api?.scrollPrev()),
    [api, handleNav]
  )
  const goNext = useCallback(
    () => handleNav(() => api?.scrollNext()),
    [api, handleNav]
  )
  const goTo = useCallback(
    (i: number) => handleNav(() => api?.scrollTo(i)),
    [api, handleNav]
  )

  return (
    <div className="mt-10 flex items-center justify-center gap-8">
      <button
        onClick={goPrev}
        aria-label="Poprzednia opinia"
        className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-colors duration-300 hover:border-gold/30 hover:text-gold/70"
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>

      <div
        role="tablist"
        aria-label="Nawigacja opinii"
        className="flex items-center gap-2"
      >
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Opinia ${i + 1} z ${total}`}
            onClick={() => goTo(i)}
            className="flex h-6 items-center"
          >
            <span
              className={cn(
                "block h-px rounded-full transition-all duration-500",
                i === current
                  ? "w-8 bg-gold/60"
                  : "w-2 bg-white/20 hover:bg-white/40"
              )}
            />
          </button>
        ))}
      </div>

      <button
        onClick={goNext}
        aria-label="Następna opinia"
        className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-colors duration-300 hover:border-gold/30 hover:text-gold/70"
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
