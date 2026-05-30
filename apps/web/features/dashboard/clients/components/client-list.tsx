"use client"

import type { AdminClient } from "../types"
import { useClientActions } from "../hooks/use-client-actions"
import { ClientCard } from "./client-card"

type Props = {
  clients: AdminClient[]
  hasActiveFilters: boolean
}

export function ClientList({ clients, hasActiveFilters }: Props) {
  const { getActions } = useClientActions()

  if (clients.length === 0) {
    return (
      <div className="border border-white/8 px-6 py-12 text-center">
        <p className="text-sm font-light text-white/50">
          {hasActiveFilters
            ? "Brak klientek spełniających kryteria"
            : "Brak klientek"}
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col divide-y divide-white/5 border border-white/8">
      {clients.map((client) => {
        const { ban, unban } = getActions(client.id, client.ban?.id ?? null)
        return (
          <li key={client.id}>
            <ClientCard client={client} banActions={ban} unbanActions={unban} />
          </li>
        )
      })}
    </ul>
  )
}
