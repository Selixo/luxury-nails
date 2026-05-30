import type { Metadata } from "next"
import { getClientOverviewData } from "@/features/dashboard/overview/client-actions"
import { UpcomingBookingCard } from "@/features/dashboard/overview/components/upcoming-booking-card"
import { NoUpcomingBooking } from "@/features/dashboard/overview/components/no-upcoming-booking"
import { ClientStats } from "@/features/dashboard/overview/components/client-stats"
import { QuickActions } from "@/features/dashboard/overview/components/quick-actions"

export const metadata: Metadata = { title: "Przegląd" }

export default async function ClientPage() {
  const data = await getClientOverviewData()

  if (!data) return null

  const { name, upcoming, completedCount, lastVisitDate, joinedAt } = data

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Panel klienta
        </p>
        <h1 className="mb-10 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Witaj, {name}
        </h1>

        {upcoming ? (
          <UpcomingBookingCard booking={upcoming} />
        ) : (
          <NoUpcomingBooking />
        )}

        <ClientStats
          completedCount={completedCount}
          lastVisitDate={lastVisitDate}
          joinedAt={joinedAt}
        />

        <QuickActions />
      </div>
    </div>
  )
}
