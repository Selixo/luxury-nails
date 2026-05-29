"use client"

import { useState, useTransition } from "react"
import { upsertRating } from "../actions"
import type { HistoriaVisit, RatingDraft } from "../types"

export function useVisitRatings(visits: HistoriaVisit[]) {
  const [ratings, setRatings] = useState<Map<string, RatingDraft>>(() => {
    const map = new Map<string, RatingDraft>()
    for (const v of visits) {
      if (v.ratings) {
        map.set(v.id, {
          stars: v.ratings.stars,
          comment: v.ratings.comment ?? "",
        })
      }
    }
    return map
  })
  const [isPending, startTransition] = useTransition()
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Map<string, string>>(new Map())

  function submit(visitId: string, stars: number, comment: string) {
    setPendingId(visitId)
    startTransition(async () => {
      const { error } = await upsertRating(visitId, stars, comment)
      if (error) {
        setErrors((prev) => new Map(prev).set(visitId, error))
      } else {
        setRatings((prev) => new Map(prev).set(visitId, { stars, comment }))
        setErrors((prev) => {
          const next = new Map(prev)
          next.delete(visitId)
          return next
        })
      }
      setPendingId(null)
    })
  }

  function clearError(visitId: string) {
    setErrors((prev) => {
      const next = new Map(prev)
      next.delete(visitId)
      return next
    })
  }

  return { ratings, submit, pendingId, isPending, errors, clearError }
}
