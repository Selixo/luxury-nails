"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"

async function verifyAdmin(): Promise<boolean> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const admin = createAdminClient()
  const { data } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  return data?.role === "admin"
}

function buildOAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    access_type: "offline",
    prompt: "consent",
  })
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`
}

export async function connectGoogleCalendar(): Promise<void> {
  if (!(await verifyAdmin())) return
  redirect(buildOAuthUrl())
}

export async function disconnectGoogleCalendar(): Promise<{
  error: string | null
}> {
  if (!(await verifyAdmin())) return { error: "Brak uprawnień." }

  const admin = createAdminClient()
  const { data: settings } = await admin
    .from("settings")
    .select("id, google_access_token")
    .single()

  if (settings?.google_access_token) {
    fetch(
      `https://oauth2.googleapis.com/revoke?token=${settings.google_access_token}`,
      { method: "POST" }
    ).catch(() => {})
  }

  if (settings?.id) {
    await admin
      .from("settings")
      .update({
        google_access_token: null,
        google_refresh_token: null,
        google_token_expiry: null,
        google_connected_email: null,
      } as never)
      .eq("id", settings.id)
  }

  revalidatePath("/dashboard/admin/settings")
  return { error: null }
}
