import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "./types"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore errors, as this is a best effort to set cookies for the client. In some cases, such as when the request is already being processed, setting cookies may not be possible.
          }
        },
      },
    }
  )
}
