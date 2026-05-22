"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@workspace/ui/lib/utils"

type VisitStatus = "completed" | "cancelled"

type Visit = {
  id: string
  date: string
  service: string
  price: string
  status: VisitStatus
  notes?: string
}

const VISITS: Visit[] = [
  {
    id: "v08",
    date: "9 maja 2025",
    service: "Manicure hybrydowy",
    price: "110 zł",
    status: "completed",
  },
  {
    id: "v07",
    date: "17 kwietnia 2025",
    service: "Hybryda z zdobieniem",
    price: "120 zł",
    status: "completed",
    notes: "Wzór kwiatowy, kolor nude + złoto",
  },
  {
    id: "v06",
    date: "26 marca 2025",
    service: "Żel na naturalną płytkę",
    price: "140 zł",
    status: "completed",
  },
  {
    id: "v05",
    date: "5 marca 2025",
    service: "Manicure hybrydowy",
    price: "110 zł",
    status: "completed",
  },
  {
    id: "v04",
    date: "12 lutego 2025",
    service: "Przedłużanie żelem",
    price: "180 zł",
    status: "completed",
    notes: "Długość migdałek, kolor mleczny",
  },
  {
    id: "v03",
    date: "22 stycznia 2025",
    service: "Hybryda z zdobieniem",
    price: "120 zł",
    status: "completed",
  },
  {
    id: "v02",
    date: "10 stycznia 2025",
    service: "Manicure hybrydowy",
    price: "110 zł",
    status: "cancelled",
  },
  {
    id: "v01",
    date: "3 stycznia 2025",
    service: "Manicure klasyczny",
    price: "60 zł",
    status: "completed",
    notes: "Pierwsza wizyta",
  },
]

const STATUS_LABELS: Record<VisitStatus, string> = {
  completed: "Zakończona",
  cancelled: "Anulowana",
}

const STATUS_STYLES: Record<VisitStatus, string> = {
  completed: "border-gold/25 text-gold/60",
  cancelled: "border-red-400/25 text-red-400/55",
}

type RatingRecord = { stars: number; comment: string }
type RatingFormState = { id: string; stars: number; comment: string } | null

export default function HistoriaPage() {
  const [ratings, setRatings] = useState<Map<string, RatingRecord>>(new Map())
  const [ratingForm, setRatingForm] = useState<RatingFormState>(null)

  const totalSpent = VISITS.filter((v) => v.status === "completed")
    .map((v) => parseInt(v.price))
    .reduce((a, b) => a + b, 0)

  const completedCount = VISITS.filter((v) => v.status === "completed").length

  function submitRating(id: string, stars: number, comment: string) {
    setRatings((prev) => {
      const next = new Map(prev)
      next.set(id, { stars, comment })
      return next
    })
    setRatingForm(null)
  }

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Historia
        </p>
        <h1 className="mb-10 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Twoje wizyty
        </h1>

        {/* Summary */}
        <div className="mb-8 grid grid-cols-2 divide-x divide-white/5 border border-white/5">
          <div className="px-6 py-4">
            <p className="font-display text-2xl font-light text-gold">
              {completedCount}
            </p>
            <p className="mt-0.5 text-xs font-light text-white/35">
              Zrealizowanych wizyt
            </p>
          </div>
          <div className="px-6 py-4">
            <p className="font-display text-2xl font-light text-gold">
              {totalSpent} zł
            </p>
            <p className="mt-0.5 text-xs font-light text-white/35">
              Łącznie wydane
            </p>
          </div>
        </div>

        {/* Visit list */}
        <div className="flex flex-col divide-y divide-white/5 border border-white/8">
          {VISITS.map((visit) => {
            const rating = ratings.get(visit.id)
            const isRatingOpen = ratingForm?.id === visit.id

            return (
              <div key={visit.id} className="flex flex-col gap-2 px-6 py-5">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="text-sm font-light text-white/80">
                        {visit.service}
                      </p>
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
                      <p className="mt-1 text-xs font-light text-white/30 italic">
                        {visit.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:justify-start sm:gap-1">
                    <p className="text-xs font-light text-white/40">
                      {visit.date}
                    </p>
                    <p className="text-sm font-light text-white/60">
                      {visit.price}
                    </p>
                    {visit.status === "completed" && (
                      <Link
                        href="/panel/klient/rezerwacja"
                        className="text-xs font-light text-white/25 transition-colors hover:text-gold"
                      >
                        Umów ponownie
                      </Link>
                    )}
                  </div>
                </div>

                {/* Ocena wizyty */}
                {visit.status === "completed" && (
                  <div className="mt-1">
                    {rating ? (
                      <div className="flex items-center gap-3">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span
                              key={s}
                              className={cn(
                                "text-sm",
                                s <= rating.stars
                                  ? "text-gold/70"
                                  : "text-white/15"
                              )}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        {rating.comment && (
                          <p className="text-xs font-light text-white/30 italic">
                            {rating.comment}
                          </p>
                        )}
                        <button
                          onClick={() =>
                            setRatingForm({
                              id: visit.id,
                              stars: rating.stars,
                              comment: rating.comment,
                            })
                          }
                          className="text-[10px] font-light text-white/15 transition-colors outline-none hover:text-white/40"
                        >
                          Edytuj
                        </button>
                      </div>
                    ) : isRatingOpen ? (
                      <div className="border border-white/8 bg-white/[0.02] p-4">
                        <p className="mb-3 text-[10px] font-light tracking-[0.2em] text-white/30 uppercase">
                          Oceń wizytę
                        </p>
                        <div className="mb-3 flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() =>
                                setRatingForm({ ...ratingForm!, stars: s })
                              }
                              className={cn(
                                "text-xl transition-colors outline-none",
                                s <= (ratingForm?.stars ?? 0)
                                  ? "text-gold"
                                  : "text-white/15 hover:text-gold/40"
                              )}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={ratingForm?.comment ?? ""}
                          onChange={(e) =>
                            setRatingForm({
                              ...ratingForm!,
                              comment: e.target.value,
                            })
                          }
                          placeholder="Co Ci się podobało? (opcjonalnie)"
                          rows={2}
                          className="w-full resize-none border border-white/8 bg-transparent px-3 py-2 text-xs font-light text-white/60 transition-colors outline-none placeholder:text-white/20 focus:border-white/15"
                        />
                        <div className="mt-3 flex gap-4">
                          <button
                            onClick={() =>
                              submitRating(
                                visit.id,
                                ratingForm!.stars,
                                ratingForm!.comment
                              )
                            }
                            disabled={!ratingForm?.stars}
                            className="text-xs font-light text-gold/60 transition-colors outline-none hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            Zapisz ocenę
                          </button>
                          <button
                            onClick={() => setRatingForm(null)}
                            className="text-xs font-light text-white/20 transition-colors outline-none hover:text-white/50"
                          >
                            Anuluj
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          setRatingForm({ id: visit.id, stars: 0, comment: "" })
                        }
                        className="text-[10px] font-light tracking-[0.15em] text-white/20 uppercase transition-colors outline-none hover:text-gold/50"
                      >
                        + Oceń wizytę
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
