"use client"

import { useInView } from "@/hooks/useInView"
import type { PricingCategory } from "../../config/home.constants"

type Props = {
  category: PricingCategory
  index: number
}

function CornerFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-5">
      <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-gold/25" />
      <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-gold/25" />
      <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-gold/25" />
      <div className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-gold/25" />
    </div>
  )
}

export function PricingCategoryCard({ category, index }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <div
      ref={ref}
      className="relative border border-white/5 bg-white/[0.03] px-8 py-8 transition-[opacity,transform] duration-[800ms] ease-out motion-reduce:transition-none md:px-10 md:py-10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transitionDelay: inView ? `${index * 0.12}s` : "0s",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 -left-6 h-32 w-32 rounded-full opacity-25 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.1 85 / 0.15), transparent 70%)",
        }}
      />

      <CornerFrame />

      <p className="mb-6 text-xs font-light tracking-[0.3em] text-gold uppercase">
        {category.label}
      </p>

      <ul className="space-y-0">
        {category.items.map((item, i) => (
          <li key={item.name}>
            <div className="flex items-baseline justify-between gap-4 py-3.5">
              <span className="text-sm leading-snug font-light text-white/65">
                {item.name}
              </span>
              <span className="shrink-0 text-xs font-light tracking-wide text-gold">
                {item.price}
              </span>
            </div>
            {i < category.items.length - 1 && (
              <div aria-hidden="true" className="h-px w-full bg-white/[0.06]" />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
