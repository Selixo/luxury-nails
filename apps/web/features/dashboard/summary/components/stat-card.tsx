import { cn } from "@workspace/ui/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

type Props = {
  label: string
  value: string
  sub?: string
  trend?: { value: number } | null
  accent?: "gold" | "red"
}

export function StatCard({ label, value, sub, trend, accent }: Props) {
  return (
    <div className="bg-[#09090b] px-6 py-5">
      <p className="mb-1.5 text-[10px] font-light tracking-[0.2em] text-white/50 uppercase">
        {label}
      </p>
      <p
        className={cn(
          "font-display text-2xl font-light",
          accent === "gold"
            ? "text-gold"
            : accent === "red"
              ? "text-red-400/80"
              : "text-white/80"
        )}
      >
        {value}
      </p>
      <div className="mt-0.5 flex items-center gap-2">
        {sub && <p className="text-[10px] font-light text-white/55">{sub}</p>}
        {trend != null && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-[10px] font-light tabular-nums",
              trend.value >= 0 ? "text-emerald-400/70" : "text-red-400/80"
            )}
          >
            {trend.value >= 0 ? (
              <TrendingUp size={12} aria-hidden="true" />
            ) : (
              <TrendingDown size={12} aria-hidden="true" />
            )}
            {trend.value > 0 ? "+" : "-"}
            {trend.value}%
          </span>
        )}
      </div>
    </div>
  )
}
