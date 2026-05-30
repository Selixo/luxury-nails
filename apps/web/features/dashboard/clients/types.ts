export type ClientFilter = "all" | "active" | "banned"

export type ClientBan = {
  id: string
  reason: string
  note: string | null
  bannedAt: string
}

export type AdminClient = {
  id: string
  name: string
  lastName: string
  phone: string
  joinedAt: string
  completedVisits: number
  lastVisitDate: string | null
  ban: ClientBan | null
}

export type ClientCounts = Record<ClientFilter, number>
