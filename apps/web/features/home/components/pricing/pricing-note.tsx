"use client"

import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { useInView } from "@/hooks/useInView"

export function PricingNote() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })

  return (
    <div
      ref={ref}
      className="mx-auto mt-14 max-w-6xl transition-[opacity,transform] duration-[800ms] ease-out motion-reduce:transition-none md:mt-20"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
      }}
    >
      <div aria-hidden="true" className="mb-10 h-px w-full bg-white/5" />

      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-lg text-sm leading-relaxed font-light text-white/35">
          Podane ceny są cenami wyjściowymi. Ostateczna wycena ustalana jest
          indywidualnie i zależy od stanu płytki, długości paznokci oraz
          złożoności wybranego zdobienia.
        </p>

        <Button
          asChild
          variant="gold-fill"
          className="shrink-0 border-gold/70 px-8 py-3.5 tracking-widest uppercase md:px-10 md:py-4"
        >
          <Link href="/rezerwacja">
            <span className="relative z-10">Umów wizytę</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
