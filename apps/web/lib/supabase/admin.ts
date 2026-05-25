import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url) throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_URL")
  if (!key) throw new Error("Missing env: SUPABASE_SERVICE_ROLE_KEY")

  return createClient<Database>(url, key)
}
