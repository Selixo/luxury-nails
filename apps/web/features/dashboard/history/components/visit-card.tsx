import Link from "next/link"
import { cn } from "@workspace/ui/lib/utils"
import { formatVisitDate, type HistoryVisit, type RatingDraft } from "../types"
import { VisitRating } from "./visit-rating"

const STATUS_LABELS = {
  completed: "Zakończona",
  cancelled: "Anulowana",
} as const

const STATUS_STYLES = {
  completed: "border-gold/25 text-gold",
  cancelled: "border-red-400/25 text-red-400",
} as const

type Props = {
  visit: HistoryVisit
  rating: RatingDraft | undefined
  onSubmitRating: (stars: number, comment: string) => void
  isSubmitting: boolean
  ratingError: string | null
  onClearError: () => void
}

export function VisitCard({
  visit,
  rating,
  onSubmitRating,
  isSubmitting,
  ratingError,
  onClearError,
}: Props) {
  return (
    <article className="flex flex-col gap-3 px-6 py-5">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-sm font-light text-white/80">
              {visit.services?.name ?? "Usługa niedostępna"}
            </h3>
            <span
              className={cn(
                "rounded-sm border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase",
                STATUS_STYLES[visit.status]
              )}
            >
              {STATUS_LABELS[visit.status]}
            </span>
          </div>
          {visit.notes && (
            <p className="mt-1 text-xs font-light text-white/50 italic">
              {visit.notes}
            </p>
          )}
          {visit.cancellation_reason && (
            <p className="mt-1.5 text-xs font-light text-red-400/80 italic">
              Powód anulowania: {visit.cancellation_reason}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-1">
          <time
            dateTime={visit.date}
            className="text-xs font-light text-white/50"
          >
            {formatVisitDate(visit.date)}
          </time>
          <p className="text-sm font-light text-white/60">
            {visit.services ? `${visit.services.price} zł` : "—"}
          </p>
          {visit.status === "completed" && visit.services && (
            <Link
              href={`/dashboard/client/booking?serviceId=${visit.services.id}`}
              className="text-xs font-light text-gold/80 transition-colors hover:text-gold"
            >
              Umów ponownie
            </Link>
          )}
        </div>
      </div>

      {visit.status === "completed" && (
        <VisitRating
          visitId={visit.id}
          serviceName={visit.services?.name ?? ""}
          rating={rating}
          onSubmit={onSubmitRating}
          isSubmitting={isSubmitting}
          error={ratingError}
          onClearError={onClearError}
        />
      )}
    </article>
  )
}
