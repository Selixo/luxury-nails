"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { WeekNav } from "./week-nav"
import { CalendarLegend } from "./calendar-legend"
import { CalendarGrid } from "./calendar-grid"
import { BookingPanel } from "./booking-panel"
import {
  getEnabledDays,
  getHourRange,
  formatWeekRange,
  toDateStr,
} from "../utils"
import type { CalendarBooking } from "../types"
import type { WorkingHours } from "@/features/dashboard/settings/types"

type Props = {
  bookings: CalendarBooking[]
  workingHours: WorkingHours
  weekOffset: number
  mondayDate: string
}

export function CalendarView({
  bookings,
  workingHours,
  weekOffset,
  mondayDate,
}: Props) {
  const router = useRouter()
  const [selectedBooking, setSelectedBooking] =
    useState<CalendarBooking | null>(null)

  const today = toDateStr(new Date())
  const enabledDays = getEnabledDays(workingHours, mondayDate)
  const { hourStart, hourEnd } = getHourRange(enabledDays)
  const hours = Array.from(
    { length: hourEnd - hourStart },
    (_, i) => hourStart + i
  )

  return (
    <>
      <WeekNav
        label={formatWeekRange(enabledDays)}
        onPrev={() => router.push(`?week=${weekOffset - 1}`)}
        onNext={() => router.push(`?week=${weekOffset + 1}`)}
      />
      <CalendarLegend />
      <CalendarGrid
        enabledDays={enabledDays}
        hours={hours}
        hourStart={hourStart}
        today={today}
        bookings={bookings}
        onSelect={setSelectedBooking}
      />
      <BookingPanel
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </>
  )
}
