import type { Metadata } from "next"
import { getAdminOverviewData } from "@/features/dashboard/overview/admin-actions"
import { OverviewStats } from "@/features/dashboard/overview/components/overview-stats"
import { UpcomingBookings } from "@/features/dashboard/overview/components/upcoming-bookings"
import { TodaySchedule } from "@/features/dashboard/overview/components/today-schedule"

export const metadata: Metadata = { title: "Przegląd" }

export default async function AdminPage() {
  const { stats, upcomingBookings, todaySchedule } =
    await getAdminOverviewData()

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Panel admina
        </p>
        <h1 className="mb-10 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Przegląd
        </h1>

        <OverviewStats stats={stats} />
        <UpcomingBookings bookings={upcomingBookings} />
        <TodaySchedule bookings={todaySchedule} />
      </div>
    </div>
  )
}
