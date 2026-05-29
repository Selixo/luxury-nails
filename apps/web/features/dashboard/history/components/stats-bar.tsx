type Props = {
  completedCount: number
  totalSpent: number
}

export function StatsBar({ completedCount, totalSpent }: Props) {
  return (
    <div className="mb-8 grid grid-cols-2 divide-x divide-white/5 border border-white/5">
      <div className="px-6 py-4">
        <p className="font-display text-2xl font-light text-gold">
          {completedCount}
        </p>
        <p className="mt-0.5 text-xs font-light text-white/55">
          Zrealizowanych wizyt
        </p>
      </div>
      <div className="px-6 py-4">
        <p className="font-display text-2xl font-light text-gold">
          {totalSpent} zł
        </p>
        <p className="mt-0.5 text-xs font-light text-white/55">
          Łącznie wydane
        </p>
      </div>
    </div>
  )
}
