import type { ServiceStat } from "../types"

type Props = {
  services: ServiceStat[]
}

export function ServiceBreakdown({ services }: Props) {
  if (services.length === 0) {
    return (
      <p className="text-xs font-light text-white/45">
        Brak ukończonych wizyt w tym miesiącu.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs font-light">
        <thead>
          <tr className="border-b border-white/8">
            <th className="pb-3 text-left font-light tracking-[0.15em] text-white/70 uppercase">
              Usługa
            </th>
            <th className="pb-3 text-right font-light tracking-[0.15em] text-white/70 uppercase">
              Wizyty
            </th>
            <th className="pb-3 text-right font-light tracking-[0.15em] text-white/70 uppercase">
              Przychód
            </th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.name} className="border-b border-white/5 last:border-0">
              <td className="py-3 text-white/60">{s.name}</td>
              <td className="py-3 text-right text-white/45 tabular-nums">
                {s.count}
              </td>
              <td className="py-3 text-right text-gold/80 tabular-nums">
                {s.revenue} zł
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
