import { SALON } from "@/config/salon"
import { LocationHeader } from "./components/location/location-header"
import { LocationMap } from "./components/location/location-map"
import { LocationInfo } from "./components/location/location-info"

const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${SALON.geo.latitude},${SALON.geo.longitude}`

export function Location() {
  return (
    <section
      id="lokalizacja"
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
          <LocationInfo salon={SALON} mapsUrl={MAPS_URL} />
        </div>
      </div>
    </section>
  )
}
