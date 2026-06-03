"use client"

import { useEffect } from "react"
import { RotateCcw } from "lucide-react"

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DashboardError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] px-6">
      <div className="flex max-w-sm flex-col items-center text-center">
        <div className="mb-6 h-px w-12 bg-red-400/30" />

        <p className="mb-1 text-xs font-light tracking-[0.3em] text-red-400/60 uppercase">
          Błąd aplikacji
        </p>
        <h1 className="mb-3 font-display text-2xl font-light text-white/80">
          Coś poszło nie tak
        </h1>
        <p className="mb-8 text-xs leading-relaxed font-light text-white/30">
          Wystąpił nieoczekiwany błąd. Spróbuj ponownie lub wróć później.
        </p>

        {error.digest && (
          <p className="mb-6 font-mono text-[10px] text-white/15">
            {error.digest}
          </p>
        )}

        <button
          onClick={reset}
          className="flex items-center gap-2 border border-white/10 px-5 py-2.5 text-xs font-light tracking-[0.15em] text-white/50 uppercase transition-colors outline-none hover:border-gold/25 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold/40"
        >
          <RotateCcw size={12} />
          Spróbuj ponownie
        </button>
      </div>
    </div>
  )
}
