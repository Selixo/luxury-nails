import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

type Props = {
  currentLabel: string
  prevLabel: string
  current: { revenue: number; completedCount: number }
  prev: { revenue: number; completedCount: number }
}

type Row = {
  label: string
  current: string
  prev: string
  delta: number | null
}

export function MonthComparison({
  currentLabel,
  prevLabel,
  current,
  prev,
}: Props) {
  const rows: Row[] = [
    {
      label: "Przychód",
      current: `${current.revenue} zł`,
      prev: `${prev.revenue} zł`,
      delta:
        prev.revenue > 0 && current.revenue > 0
          ? Math.round(((current.revenue - prev.revenue) / prev.revenue) * 100)
          : null,
    },
    {
      label: "Wizyty",
      current: String(current.completedCount),
      prev: String(prev.completedCount),
      delta:
        prev.completedCount > 0 && current.completedCount > 0
          ? Math.round(
              ((current.completedCount - prev.completedCount) /
                prev.completedCount) *
                100
            )
          : null,
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs font-light">
        <thead>
          <tr className="border-b border-white/8">
            <th className="pb-3 text-left font-light tracking-[0.15em] text-white/25 uppercase" />
            <th className="pb-3 text-right font-light tracking-[0.15em] text-white/70 uppercase">
              {currentLabel}
            </th>
            <th className="pb-3 text-right font-light tracking-[0.15em] text-white/50 uppercase">
              {prevLabel}
            </th>
            <th className="pb-3 text-right font-light tracking-[0.15em] text-white/50 uppercase">
              Zmiana
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-white/5 last:border-0"
            >
              <td className="py-3 text-white/45">{row.label}</td>
              <td className="py-3 text-right text-white/75">{row.current}</td>
              <td className="py-3 text-right text-white/45">{row.prev}</td>
              <td className="py-3 text-right">
                <Delta value={row.delta} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Delta({ value }: { value: number | null }) {
  if (value === null) return <span className="text-white/20">—</span>
  if (value === 0)
    return (
      <span className="flex items-center justify-end gap-0.5 text-white/30">
        <Minus size={10} />
        0%
      </span>
    )
  const positive = value > 0
  return (
    <span
      className={cn(
        "flex items-center justify-end gap-0.5 tabular-nums",
        positive ? "text-emerald-400/70" : "text-red-400/80"
      )}
    >
      {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {positive ? "+" : ""}
      {value}%
    </span>
  )
}
