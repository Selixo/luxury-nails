import Link from "next/link"
import { cn } from "@workspace/ui/lib/utils"
import type { HistoryStatus } from "../types"

const FILTERS: { id: HistoryStatus; label: string }[] = [
  { id: "all", label: "Wszystkie" },
  { id: "completed", label: "Zakończone" },
  { id: "cancelled", label: "Anulowane" },
]

type Props = {
  current: HistoryStatus
  counts: Record<HistoryStatus, number>
}

export function HistoryFilters({ current, counts }: Props) {
  return (
    <nav aria-label="Filtruj wizyty" className="mb-6">
      <ul className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <li key={f.id}>
            <Link
              href={`?status=${f.id}&page=1`}
              aria-current={current === f.id ? "page" : undefined}
              className={cn(
                "flex items-center gap-2 border px-3 py-1.5 text-xs font-light tracking-[0.15em] uppercase transition-colors",
                current === f.id
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/60"
              )}
            >
              {f.label}
              {counts[f.id] > 0 && (
                <span
                  className={cn(
                    "text-xxs tabular-nums",
                    current === f.id ? "text-gold/80" : "text-white/60"
                  )}
                >
                  {counts[f.id]}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
