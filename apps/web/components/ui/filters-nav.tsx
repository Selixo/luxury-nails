import Link from "next/link"
import { cn } from "@workspace/ui/lib/utils"

export type FilterOption<T extends string = string> = {
  id: T
  label: string
}

type Props<T extends string> = {
  filters: FilterOption<T>[]
  current: T
  counts: Record<T, number>
  ariaLabel: string
  className?: string
  extraQuery?: string
  paramName?: string
}

export function FiltersNav<T extends string>({
  filters,
  current,
  counts,
  ariaLabel,
  className,
  extraQuery,
  paramName = "status",
}: Props<T>) {
  return (
    <nav aria-label={ariaLabel} className={cn("mb-6", className)}>
      <ul className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <li key={f.id}>
            <Link
              href={`?${paramName}=${f.id}&page=1${extraQuery ?? ""}`}
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
                    "text-xs tabular-nums",
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
