import type { Metadata } from "next"
import { getCalendarData } from "@/features/dashboard/calendar/queries"
import { CalendarView } from "@/features/dashboard/calendar/components/calendar-view"

export const metadata: Metadata = { title: "Kalendarz" }

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>
}) {
  const { week } = await searchParams
  const weekOffset = parseInt(week ?? "0") || 0

  const { bookings, workingHours, mondayDate } =
    await getCalendarData(weekOffset)

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Zarządzanie
        </p>
        <h1 className="mb-8 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Kalendarz
        </h1>
        <CalendarView
          bookings={bookings}
          workingHours={workingHours}
          weekOffset={weekOffset}
          mondayDate={mondayDate}
        />
      </div>
    </div>
  )
}
