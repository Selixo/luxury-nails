"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
  label: string
  onPrev: () => void
  onNext: () => void
}

export function WeekNav({ label, onPrev, onNext }: Props) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <button
        onClick={onPrev}
        aria-label="Poprzedni tydzień"
        className="flex h-8 w-8 items-center justify-center border border-white/10 text-white/40 transition-colors outline-none hover:border-white/20 hover:text-white/70 focus-visible:ring-1 focus-visible:ring-gold/50"
      >
        <ChevronLeft size={14} />
      </button>
      <span className="min-w-[220px] text-center text-xs font-light text-white/50">
        {label}
      </span>
      <button
        onClick={onNext}
        aria-label="Następny tydzień"
        className="flex h-8 w-8 items-center justify-center border border-white/10 text-white/40 transition-colors outline-none hover:border-white/20 hover:text-white/70 focus-visible:ring-1 focus-visible:ring-gold/50"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  )
}
