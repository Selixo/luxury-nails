import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { getUserEmail, setupCalendarNotifications } from "@/lib/google-calendar"

const SETTINGS_URL = "/dashboard/admin/settings"
const ERROR_URL = `${SETTINGS_URL}?google_error=1`

export async function GET(request: NextRequest) {
  const errorRedirect = () =>
    NextResponse.redirect(new URL(ERROR_URL, request.url))

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return errorRedirect()

  const adminClient = createAdminClient()
  const { data: profile } = await adminClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()
  if (profile?.role !== "admin") return errorRedirect()

  const { searchParams } = new URL(request.url)
  const state = searchParams.get("state")
  const cookieStore = await cookies()
  const cookieState = cookieStore.get("oauth_state")?.value
  cookieStore.delete("oauth_state")

  if (!state || !cookieState || state !== cookieState) {
    return errorRedirect()
  }

  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error || !code) {
    return errorRedirect()
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    }),
  })

  if (!tokenRes.ok) {
    console.error("Google token exchange failed:", await tokenRes.text())
    return errorRedirect()
  }

  const { access_token, refresh_token, expires_in } = await tokenRes.json()

  if (!access_token || !refresh_token) {
    return errorRedirect()
  }

  const [email, { data: settings }] = await Promise.all([
    getUserEmail(access_token),
    adminClient.from("settings").select("id").single(),
  ])

  if (!settings?.id) {
    return errorRedirect()
  }

  const expiry = new Date(Date.now() + expires_in * 1000).toISOString()

  await adminClient
    .from("settings")
    .update({
      google_access_token: access_token,
      google_refresh_token: refresh_token,
      google_token_expiry: expiry,
      google_connected_email: email,
    })
    .eq("id", settings.id)

  if (email) {
    await setupCalendarNotifications(access_token, email)
  }

  return NextResponse.redirect(new URL(SETTINGS_URL, request.url))
}
