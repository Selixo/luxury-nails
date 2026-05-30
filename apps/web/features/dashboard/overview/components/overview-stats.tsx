import type { OverviewStats } from "../admin-actions"

type Props = {
  stats: OverviewStats
}

export function OverviewStats({ stats }: Props) {
  const items = [
    { label: "Dziś", value: stats.todayCount, sub: "wizyt" },
    { label: "Oczekuje", value: stats.pendingCount, sub: "potwierdzeń" },
    { label: "Ten tydzień", value: stats.weekCount, sub: "rezerwacji" },
    { label: "Klientki", value: stats.clientsCount, sub: "zarejestrowane" },
  ]

  return (
    <ul className="mb-10 grid grid-cols-2 divide-x divide-y divide-white/5 border border-white/5 sm:grid-cols-4 sm:divide-y-0">
      {items.map((item) => (
        <li key={item.label} className="px-5 py-5">
          <p className="font-display text-2xl font-light text-gold sm:text-3xl">
            {item.value}
          </p>
          <p className="mt-0.5 text-xs font-light text-white/50">
            {item.label} · {item.sub}
          </p>
        </li>
      ))}
    </ul>
  )
}
