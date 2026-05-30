"use client"

import { useRouter, usePathname } from "next/navigation"
import { cn } from "@workspace/ui/lib/utils"

type Props = {
  months: Array<{ value: string; label: string }>
  current: string
}

export function MonthSelector({ months, current }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <ul
      className="mb-10 flex list-none flex-wrap gap-2 p-0"
      role="group"
      aria-label="Wybierz miesiąc"
    >
      {months.map((m) => (
        <li key={m.value}>
          <button
            onClick={() => router.push(`${pathname}?month=${m.value}`)}
            aria-pressed={current === m.value}
            className={cn(
              "border px-4 py-2 text-xs font-light tracking-[0.15em] uppercase transition-colors focus-visible:ring-1 focus-visible:ring-gold/50",
              current === m.value
                ? "border-gold/50 bg-gold/10 text-gold"
                : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/60"
            )}
          >
            {m.label}
          </button>
        </li>
      ))}
    </ul>
  )
}
