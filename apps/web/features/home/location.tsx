import { SALON } from "@/config/salon"
import { createAdminClient } from "@/lib/supabase/admin"
import { LocationHeader } from "./components/location/location-header"
import { LocationMap } from "./components/location/location-map"
import { LocationInfo } from "./components/location/location-info"

const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${SALON.geo.latitude},${SALON.geo.longitude}`

type WorkingDay = { start: string; end: string; enabled: boolean }

export type OpeningHourSlot = {
  days: string[]
  open: string
  close: string
}

const DAY_ORDER = ["pon", "wt", "sr", "czw", "pt", "sob"] as const
const DB_KEY_TO_ENGLISH: Record<string, string> = {
  pon: "Monday",
  wt: "Tuesday",
  sr: "Wednesday",
  czw: "Thursday",
  pt: "Friday",
  sob: "Saturday",
}

function computeOpeningHours(
  workingHours: Record<string, WorkingDay | undefined>
): OpeningHourSlot[] {
  const slots: OpeningHourSlot[] = []
  let current: OpeningHourSlot | null = null

  for (const key of DAY_ORDER) {
    const day = workingHours[key]
    const englishDay = DB_KEY_TO_ENGLISH[key]!

    if (!day?.enabled) {
      if (current) {
        slots.push(current)
        current = null
      }
      continue
    }

    if (current && current.open === day.start && current.close === day.end) {
      current.days.push(englishDay)
    } else {
      if (current) slots.push(current)
      current = { days: [englishDay], open: day.start, close: day.end }
    }
  }

  if (current) slots.push(current)
  return slots
}

export async function Location() {
  const admin = createAdminClient()
  const { data: settings } = await admin
    .from("settings")
    .select("working_hours")
    .limit(1)
    .single()

  const workingHours = (settings?.working_hours ?? {}) as Record<
    string,
    WorkingDay | undefined
  >
  const openingHours = computeOpeningHours(workingHours)

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="scroll-mt-20 bg-background-alt px-6 py-12 md:px-12 md:py-20 lg:px-20 lg:py-28"
    >
      <LocationHeader />

      <div className="mx-auto max-w-6xl overflow-hidden border border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
          <LocationMap
            lat={SALON.geo.latitude}
            lng={SALON.geo.longitude}
            name={SALON.name}
            address={`${SALON.address.street}, ${SALON.address.postalCode} ${SALON.address.city}`}
          />
          <LocationInfo
            salon={SALON}
            mapsUrl={MAPS_URL}
            openingHours={openingHours}
          />
        </div>
      </div>
    </section>
  )
}
