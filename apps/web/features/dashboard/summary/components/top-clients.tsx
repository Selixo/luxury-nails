import type { ClientStat } from "../types"

type Props = {
  clients: ClientStat[]
  monthLabel: string
}

export function TopClients({ clients, monthLabel }: Props) {
  if (clients.length === 0) {
    return (
      <p className="text-xs font-light text-white/45">
        Brak ukończonych wizyt w tym miesiącu.
      </p>
    )
  }

  return (
    <ul className="flex list-none flex-col divide-y divide-white/5 p-0">
      {clients.map((client, i) => (
        <li
          key={client.id}
          className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
        >
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-light text-white/45 tabular-nums">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-light text-white/75">{client.name}</p>
              <p className="text-xs font-light text-white/45">
                {client.visits} {client.visits === 1 ? "wizyta" : "wizyty"} ·{" "}
                {monthLabel}
              </p>
            </div>
          </div>
          <p className="shrink-0 text-sm font-light text-gold/80">
            {client.revenue} zł
          </p>
        </li>
      ))}
    </ul>
  )
}
