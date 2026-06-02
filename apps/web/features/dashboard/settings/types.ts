export type DayKey = "pon" | "wt" | "sr" | "czw" | "pt" | "sob"

export type DayConfig = {
  enabled: boolean
  start: string
  end: string
}

export type WorkingHours = Record<DayKey, DayConfig>

export type ServiceRow = {
  id: string
  name: string
  category: string
  price: number
  duration_min: number
  active: boolean
}

export type SettingsRow = {
  id: string
  working_hours: WorkingHours
  break_min: number
  google_access_token: string | null
  google_refresh_token: string | null
  google_token_expiry: string | null
  google_connected_email: string | null
}
