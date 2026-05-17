"use client"

import { useInView } from "@/hooks/useInView"

export function ReviewsHeader() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className="mx-auto mb-14 max-w-6xl transition-[opacity,transform] duration-[800ms] ease-out motion-reduce:transition-none md:mb-20"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
      }}
    >
      <p className="mb-3 text-xs font-light tracking-[0.3em] text-gold uppercase">
        Opinie
      </p>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
        <h2
          id="reviews-heading"
          className="max-w-xl font-display text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Co mówią klientki
        </h2>
        <p className="text-sm leading-relaxed font-light text-white/50 md:max-w-xs">
          Zaufały nam i wracają. Ich słowa znaczą dla nas więcej niż cokolwiek
          innego.
        </p>
      </div>
      <div aria-hidden="true" className="mt-6 h-px w-full bg-white/5" />
    </div>
  )
}
