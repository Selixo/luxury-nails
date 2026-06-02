import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getUserEmail } from "@/lib/google-calendar"

const SETTINGS_URL = "/dashboard/admin/settings"
const ERROR_URL = `${SETTINGS_URL}?google_error=1`

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error || !code) {
    return NextResponse.redirect(new URL(ERROR_URL, request.url))
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
    return NextResponse.redirect(new URL(ERROR_URL, request.url))
  }

  const { access_token, refresh_token, expires_in } = await tokenRes.json()

  if (!access_token || !refresh_token) {
    return NextResponse.redirect(new URL(ERROR_URL, request.url))
  }

  const [email, admin] = await Promise.all([
    getUserEmail(access_token),
    Promise.resolve(createAdminClient()),
  ])

  const expiry = new Date(Date.now() + expires_in * 1000).toISOString()

  const { data: settings } = await admin.from("settings").select("id").single()

  if (!settings?.id) {
    return NextResponse.redirect(new URL(ERROR_URL, request.url))
  }

  await admin
    .from("settings")
    .update({
      google_access_token: access_token,
      google_refresh_token: refresh_token,
      google_token_expiry: expiry,
      google_connected_email: email,
    } as never)
    .eq("id", settings.id)

  return NextResponse.redirect(new URL(SETTINGS_URL, request.url))
}
