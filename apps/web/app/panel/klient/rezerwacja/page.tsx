import type { Metadata } from "next"
import { BookingForm } from "./_components/booking-form"

export const metadata: Metadata = { title: "Nowa wizyta" }

export default function RezerwacjaPage() {
  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Nowa wizyta
        </p>
        <h1 className="mb-10 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Zarezerwuj termin
        </h1>

        <BookingForm />
      </div>
    </div>
  )
}
