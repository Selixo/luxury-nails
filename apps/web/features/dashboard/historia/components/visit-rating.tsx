"use client"

import { useRef, useEffect, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import type { RatingDraft } from "../types"

type Props = {
  visitId: string
  serviceName: string
  rating: RatingDraft | undefined
  onSubmit: (stars: number, comment: string) => void
  isSubmitting: boolean
  error: string | null
  onClearError: () => void
}

export function VisitRating({
  serviceName,
  rating,
  onSubmit,
  isSubmitting,
  error,
  onClearError,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [draft, setDraft] = useState<RatingDraft>({ stars: 0, comment: "" })

  // Zamknij modal gdy submit zakończy się sukcesem
  const wasSubmitting = useRef(false)
  useEffect(() => {
    if (wasSubmitting.current && !isSubmitting && !error) {
      dialogRef.current?.close()
    }
    wasSubmitting.current = isSubmitting
  }, [isSubmitting, error])

  function handleOpen() {
    setDraft({ stars: rating?.stars ?? 0, comment: rating?.comment ?? "" })
    onClearError()
    dialogRef.current?.showModal()
  }

  function handleClose() {
    if (isSubmitting) return
    onClearError()
    dialogRef.current?.close()
  }

  function handleSubmit() {
    if (!draft.stars || isSubmitting) return
    onSubmit(draft.stars, draft.comment)
  }

  return (
    <>
      {rating ? (
        <div className="flex items-center gap-3">
          <div
            className="flex gap-0.5"
            aria-label={`Ocena: ${rating.stars} z 5`}
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                aria-hidden="true"
                className={cn(
                  "text-sm",
                  s <= rating.stars ? "text-gold/70" : "text-white/15"
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
            onClick={handleOpen}
            className="text-[10px] font-light text-white/15 transition-colors outline-none hover:text-white/40"
          >
            Edytuj
          </button>
        </div>
      ) : (
        <button
          onClick={handleOpen}
          className="text-[10px] font-light tracking-[0.15em] text-white/20 uppercase transition-colors outline-none hover:text-gold/50"
        >
          + Oceń wizytę
        </button>
      )}

      <dialog
        ref={dialogRef}
        onCancel={(e) => {
          e.preventDefault()
          handleClose()
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) handleClose()
        }}
        className="m-auto w-full max-w-sm border-0 bg-transparent p-0 backdrop:bg-black/70"
      >
        <div className="border border-white/10 bg-[#0d0d0d] p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-light tracking-[0.2em] text-gold/60 uppercase">
                Oceń wizytę
              </p>
              <p className="mt-1 text-sm font-light text-white/70">
                {serviceName}
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              aria-label="Zamknij"
              className="text-white/20 transition-colors outline-none hover:text-white/60 disabled:opacity-30"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          <div
            className="mb-4 flex gap-2"
            role="group"
            aria-label="Wybierz ocenę"
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setDraft((prev) => ({ ...prev, stars: s }))}
                aria-label={`${s} ${s === 1 ? "gwiazdka" : s < 5 ? "gwiazdki" : "gwiazdek"}`}
                aria-pressed={s <= draft.stars}
                className={cn(
                  "text-2xl transition-colors outline-none",
                  s <= draft.stars
                    ? "text-gold"
                    : "text-white/15 hover:text-gold/40"
                )}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={draft.comment}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, comment: e.target.value }))
            }
            placeholder="Co Ci się podobało? (opcjonalnie)"
            rows={3}
            className="w-full resize-none border border-white/8 bg-transparent px-3 py-2.5 text-sm font-light text-white/60 transition-colors outline-none placeholder:text-white/20 focus:border-white/20"
          />

          {error && (
            <p role="alert" className="mt-2 text-xs font-light text-red-400/80">
              {error}
            </p>
          )}

          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={handleSubmit}
              disabled={!draft.stars || isSubmitting}
              className="border border-gold/30 px-5 py-2 text-xs font-light tracking-[0.15em] text-gold/70 uppercase transition-colors outline-none hover:border-gold/50 hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
            >
              {isSubmitting ? "Zapisywanie..." : "Zapisz ocenę"}
            </button>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-xs font-light text-white/20 transition-colors outline-none hover:text-white/50 disabled:opacity-50"
            >
              Anuluj
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
