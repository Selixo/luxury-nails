"use server"

import { createAdminClient } from "@/lib/supabase/admin"

export async function getActiveBan(userId: string) {
  const admin = createAdminClient()

  const { data } = await admin
    .from("bans")
    .select("reason, note, banned_at")
    .eq("client_id", userId)
    .is("unbanned_at", null)
    .order("banned_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  return data
}
