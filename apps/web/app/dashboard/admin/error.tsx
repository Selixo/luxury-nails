"use client"

import { useEffect } from "react"
import { RotateCcw } from "lucide-react"

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AdminError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-red-400/80 uppercase">
          Błąd
        </p>
        <h1 className="mb-3 font-display text-4xl font-light text-white/80 sm:text-5xl">
          Coś poszło nie tak
        </h1>
        <p className="mb-8 text-sm font-light text-white/50">
          Nie udało się załadować strony. Spróbuj ponownie.
        </p>

        {error.digest && (
          <p className="mb-6 font-mono text-[10px] text-white/50">
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
