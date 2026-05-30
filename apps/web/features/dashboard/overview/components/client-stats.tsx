import type { ClientOverviewData } from "../client-actions"

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso + "T00:00:00"))
}

function formatJoinedDate(iso: string): string {
  return new Intl.DateTimeFormat("pl-PL", {
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

type Props = Pick<
  ClientOverviewData,
  "completedCount" | "lastVisitDate" | "joinedAt"
>

export function ClientStats({
  completedCount,
  lastVisitDate,
  joinedAt,
}: Props) {
  const items = [
    { label: "Wizyty łącznie", value: String(completedCount) },
    { label: "Klientka od", value: formatJoinedDate(joinedAt) },
    {
      label: "Ostatnia wizyta",
      value: lastVisitDate ? formatDate(lastVisitDate) : "—",
    },
  ]

  return (
    <ul className="mb-10 grid grid-cols-3 divide-x divide-white/5 border border-white/5">
      {items.map((item) => (
        <li key={item.label} className="px-5 py-4">
          <p className="font-display text-xl font-light text-gold sm:text-2xl">
            {item.value}
          </p>
          <p className="mt-0.5 text-xs font-light text-white/50">
            {item.label}
          </p>
        </li>
      ))}
    </ul>
  )
}
