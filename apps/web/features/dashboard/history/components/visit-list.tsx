"use client"

import Link from "next/link"
import { useVisitRatings } from "../hooks/use-visit-ratings"
import type { HistoryVisit } from "../types"
import { VisitCard } from "./visit-card"

type Props = {
  visits: HistoryVisit[]
}

export function VisitList({ visits }: Props) {
  const { ratings, submit, pendingId, isPending, errors, clearError } =
    useVisitRatings(visits)

  if (visits.length === 0) {
    return (
      <div className="border border-white/5 px-6 py-12 text-center">
        <p className="text-sm font-light text-white/30">
          Brak zrealizowanych wizyt.
        </p>
        <Link
          href="/dashboard/client/booking"
          className="mt-4 inline-block text-xs font-light text-white/20 transition-colors hover:text-gold"
        >
          Zarezerwuj pierwszą wizytę →
        </Link>
      </div>
    )
  }

  return (
    <ul className="flex flex-col divide-y divide-white/5 border border-white/8">
      {visits.map((visit) => (
        <li key={visit.id}>
          <VisitCard
            visit={visit}
            rating={ratings.get(visit.id)}
            onSubmitRating={(stars, comment) =>
              submit(visit.id, stars, comment)
            }
            isSubmitting={pendingId === visit.id && isPending}
            ratingError={errors.get(visit.id) ?? null}
            onClearError={() => clearError(visit.id)}
          />
        </li>
      ))}
    </ul>
  )
}
