const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
const GOOGLE_CALENDAR_BASE = "https://www.googleapis.com/calendar/v3"
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"

type TokenResponse = {
  access_token: string
  expires_in: number
  refresh_token?: string
}

type GoogleSettings = {
  id: string
  google_access_token: string
  google_refresh_token: string
  google_token_expiry: string | null
}

export type CalendarEventData = {
  summary: string
  description: string
  date: string
  time: string
  durationMin: number
}

async function refreshAccessToken(
  refreshToken: string
): Promise<TokenResponse> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: refreshToken,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    console.error(`refreshAccessToken failed (${res.status}):`, text)
    throw new Error(`Token refresh failed: ${res.status}`)
  }
  return res.json()
}

export async function ensureValidToken(
  settings: GoogleSettings,
  updateToken: (accessToken: string, expiry: string) => Promise<void>
): Promise<string> {
  if (settings.google_token_expiry) {
    const expiry = new Date(settings.google_token_expiry).getTime()
    if (Date.now() < expiry - 5 * 60 * 1000) {
      return settings.google_access_token
    }
  }

  const tokens = await refreshAccessToken(settings.google_refresh_token)
  const expiresIn =
    typeof tokens.expires_in === "number" && tokens.expires_in > 0
      ? tokens.expires_in
      : 3600
  const newExpiry = new Date(Date.now() + expiresIn * 1000).toISOString()
  await updateToken(tokens.access_token, newExpiry)
  return tokens.access_token
}

export async function createCalendarEvent(
  accessToken: string,
  data: CalendarEventData
): Promise<string | null> {
  const time = data.time.slice(0, 5)
  const [hStr, mStr] = time.split(":")
  const h = Number(hStr)
  const m = Number(mStr)

  const endMinutes = h * 60 + m + data.durationMin
  const overflowDays = Math.floor(endMinutes / (24 * 60))
  const endH = Math.floor((endMinutes % (24 * 60)) / 60)
    .toString()
    .padStart(2, "0")
  const endM = (endMinutes % 60).toString().padStart(2, "0")

  // Compute end date purely from UTC noon to avoid server-timezone drift
  const startUtcNoon = new Date(`${data.date}T12:00:00Z`)
  startUtcNoon.setUTCDate(startUtcNoon.getUTCDate() + overflowDays)
  const endDateStr = startUtcNoon.toISOString().slice(0, 10)

  const body = {
    summary: data.summary,
    description: data.description,
    start: {
      dateTime: `${data.date}T${time}:00`,
      timeZone: "Europe/Warsaw",
    },
    end: {
      dateTime: `${endDateStr}T${endH}:${endM}:00`,
      timeZone: "Europe/Warsaw",
    },
    reminders: {
      useDefault: true,
    },
  }

  const res = await fetch(`${GOOGLE_CALENDAR_BASE}/calendars/primary/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    console.error("createCalendarEvent error:", await res.text())
    return null
  }

  const event = await res.json()
  return event.id ?? null
}

export async function deleteCalendarEvent(
  accessToken: string,
  eventId: string
): Promise<void> {
  const res = await fetch(
    `${GOOGLE_CALENDAR_BASE}/calendars/primary/events/${eventId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  ).catch((err) => {
    console.error("deleteCalendarEvent network error:", err)
    return null
  })

  if (res && !res.ok && res.status !== 404) {
    console.error(`deleteCalendarEvent failed (${res.status}):`, eventId)
  }
}

export async function getUserEmail(
  accessToken: string
): Promise<string | null> {
  const res = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.email ?? null
}

export async function setupCalendarNotifications(
  accessToken: string,
  calendarId: string
): Promise<void> {
  const res = await fetch(
    `${GOOGLE_CALENDAR_BASE}/users/me/calendarList/${encodeURIComponent(calendarId)}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notificationSettings: {
          notifications: [
            { type: "eventCreation", method: "email" },
            { type: "eventChange", method: "email" },
            { type: "eventCancellation", method: "email" },
          ],
        },
      }),
    }
  )
  if (!res.ok) {
    console.error("setupCalendarNotifications failed:", await res.text())
  }
}
