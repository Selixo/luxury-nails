"use client"

import { useBookingActions } from "../hooks/use-booking-actions"
import { BookingCard } from "./booking-card"
import type { AdminBooking } from "../types"

type Props = {
  bookings: AdminBooking[]
  hasActiveFilters?: boolean
}

export function BookingList({ bookings, hasActiveFilters }: Props) {
  const { getActions } = useBookingActions()

  if (bookings.length === 0) {
    return (
      <div className="border border-white/8 px-6 py-12 text-center">
        <p className="text-sm font-light text-white/50">
          {hasActiveFilters
            ? "Brak wyników dla podanych filtrów"
            : "Brak wizyt"}
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col divide-y divide-white/5 border border-white/8">
      {bookings.map((booking) => {
        const { confirm, complete, cancel, note } = getActions(booking.id)
        return (
          <li key={booking.id}>
            <BookingCard
              booking={booking}
              confirmActions={confirm}
              completeActions={complete}
              cancelActions={cancel}
              noteActions={note}
            />
          </li>
        )
      })}
    </ul>
  )
}
