"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { CLIENTS_LIMIT } from "./constants"
import type { AdminClient, ClientFilter, ClientCounts } from "./types"

type ClientsPageData = {
  clients: AdminClient[]
  total: number
  pages: number
  counts: ClientCounts
}

type BanRow = {
  id: string
  reason: string
  note: string | null
  banned_at: string
  unbanned_at: string | null
}

type ProfileRow = {
  id: string
  name: string
  last_name: string
  phone: string
  created_at: string
  bans: BanRow[]
}

export async function getAdminClientsPage({
  filter = "all",
  query,
  page = 1,
}: {
  filter?: ClientFilter
  query?: string
  page?: number
} = {}): Promise<ClientsPageData> {
  const admin = createAdminClient()

  const [{ data: profileRows }, { data: bookingRows }] = await Promise.all([
    admin
      .from("profiles")
      .select(
        "id, name, last_name, phone, created_at, bans!bans_client_id_fkey(id, reason, note, banned_at, unbanned_at)"
      )
      .eq("role", "client"),

    admin
      .from("bookings")
      .select("client_id, date")
      .eq("status", "completed")
      .order("date", { ascending: false }),
  ])

  const visitMap = new Map<string, { count: number; lastDate: string | null }>()
  for (const b of (bookingRows ?? []) as {
    client_id: string
    date: string
  }[]) {
    const prev = visitMap.get(b.client_id) ?? { count: 0, lastDate: null }
    visitMap.set(b.client_id, {
      count: prev.count + 1,
      lastDate: prev.lastDate ?? b.date,
    })
  }

  let clients: AdminClient[] = ((profileRows ?? []) as ProfileRow[]).map(
    (p) => {
      const activeBan = p.bans.find((b) => !b.unbanned_at) ?? null
      const visits = visitMap.get(p.id) ?? { count: 0, lastDate: null }
      return {
        id: p.id,
        name: p.name,
        lastName: p.last_name,
        phone: p.phone,
        joinedAt: p.created_at,
        completedVisits: visits.count,
        lastVisitDate: visits.lastDate,
        ban: activeBan
          ? {
              id: activeBan.id,
              reason: activeBan.reason,
              note: activeBan.note,
              bannedAt: activeBan.banned_at,
            }
          : null,
      }
    }
  )

  const counts: ClientCounts = {
    all: clients.length,
    active: clients.filter((c) => !c.ban).length,
    banned: clients.filter((c) => !!c.ban).length,
  }

  if (query?.trim()) {
    const q = query.trim().toLowerCase()
    clients = clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.lastName.toLowerCase().includes(q) ||
        c.phone.includes(q)
    )
  }

  if (filter === "active") clients = clients.filter((c) => !c.ban)
  if (filter === "banned") clients = clients.filter((c) => !!c.ban)

  clients.sort((a, b) => {
    if (!!a.ban !== !!b.ban) return a.ban ? -1 : 1
    return a.lastName.localeCompare(b.lastName, "pl")
  })

  const total = clients.length
  const pages = Math.max(1, Math.ceil(total / CLIENTS_LIMIT))
  const offset = (page - 1) * CLIENTS_LIMIT

  return {
    clients: clients.slice(offset, offset + CLIENTS_LIMIT),
    total,
    pages,
    counts,
  }
}

export async function banClient(
  clientId: string,
  reason: string,
  note: string
): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Brak autoryzacji" }

  const admin = createAdminClient()
  const { error } = await admin.from("bans").insert({
    client_id: clientId,
    reason,
    note: note.trim() || null,
    banned_by: user.id,
  })

  if (error) return { error: error.message }
  revalidatePath("/dashboard/admin/clients")
  return { error: null }
}

export async function unbanClient(
  banId: string
): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Brak autoryzacji" }

  const admin = createAdminClient()
  const { error } = await admin
    .from("bans")
    .update({ unbanned_at: new Date().toISOString(), unbanned_by: user.id })
    .eq("id", banId)

  if (error) return { error: error.message }
  revalidatePath("/dashboard/admin/clients")
  return { error: null }
}
