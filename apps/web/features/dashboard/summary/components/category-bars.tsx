import type { CategoryStat } from "../types"

type Props = {
  categories: CategoryStat[]
}

export function CategoryBars({ categories }: Props) {
  if (categories.length === 0) {
    return (
      <p className="text-xs font-light text-white/45">
        Brak danych za ten miesiąc.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {categories.map((cat) => (
        <div key={cat.name}>
          <div className="mb-1.5 flex items-center justify-between gap-4">
            <p className="text-xs font-light text-white/75">
              {cat.name}
              <span className="ml-2 text-white/45">
                {cat.count} {cat.count === 1 ? "wizyta" : "wizyty"}
              </span>
            </p>
            <p className="shrink-0 text-xs font-light text-white/45">
              {cat.revenue} zł
            </p>
          </div>
          <div className="h-1 w-full bg-white/10">
            <div
              className="h-full bg-gold/70 transition-all duration-500"
              style={{ width: `${cat.pct}%` }}
              role="progressbar"
              aria-valuenow={cat.pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${cat.name}: ${cat.pct}%`}
            />
          </div>
          <p className="mt-1 text-[10px] font-light text-white/50">
            {cat.pct}%
          </p>
        </div>
      ))}
    </div>
  )
}
