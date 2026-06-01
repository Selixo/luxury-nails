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
}
