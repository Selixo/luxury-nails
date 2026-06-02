export const dynamic = "force-dynamic"

import { getSettings, getServices } from "@/features/dashboard/settings/actions"
import { WorkingHoursSection } from "@/features/dashboard/settings/components/working-hours-section"
import { ServicesSection } from "@/features/dashboard/settings/components/services-section"
import { GoogleCalendarSection } from "@/features/dashboard/settings/components/google-calendar-section"

export default async function UstawieniaPage() {
  const [settings, services] = await Promise.all([getSettings(), getServices()])

  if (!settings) {
    return (
      <div className="px-6 py-12 md:px-12 md:py-16">
        <p className="text-sm font-light text-white/45">
          Nie znaleziono ustawień salonu.
        </p>
      </div>
    )
  }

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl space-y-14">
        <div>
          <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
            Konfiguracja
          </p>
          <h1 className="font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
            Ustawienia
          </h1>
        </div>

        <WorkingHoursSection settings={settings} />
        <ServicesSection services={services} />
        <GoogleCalendarSection />
      </div>
    </div>
  )
}
