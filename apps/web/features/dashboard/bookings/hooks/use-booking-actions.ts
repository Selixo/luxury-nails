"use client"

import { useState, useTransition } from "react"
import { updateBookingStatus, upsertStylistNote } from "../actions"

export type ConfirmActions = {
  onConfirm: () => void
  isPending: boolean
  error: string | null
}

export type CompleteActions = {
  onComplete: () => void
  isPending: boolean
  error: string | null
}

export type CancelActions = {
  onCancel: (reason: string) => void
  isPending: boolean
  error: string | null
  onClearError: () => void
}

export type NoteActions = {
  onSave: (note: string) => void
  isPending: boolean
  error: string | null
  onClearError: () => void
}

export function useBookingActions() {
  const [confirmPendingId, setConfirmPendingId] = useState<string | null>(null)
  const [confirmErrors, setConfirmErrors] = useState<Map<string, string>>(
    new Map()
  )
  const [, startConfirmTransition] = useTransition()

  const [completePendingId, setCompletePendingId] = useState<string | null>(
    null
  )
  const [completeErrors, setCompleteErrors] = useState<Map<string, string>>(
    new Map()
  )
  const [, startCompleteTransition] = useTransition()

  const [cancelPendingId, setCancelPendingId] = useState<string | null>(null)
  const [cancelErrors, setCancelErrors] = useState<Map<string, string>>(
    new Map()
  )
  const [, startCancelTransition] = useTransition()

  const [notePendingId, setNotePendingId] = useState<string | null>(null)
  const [noteErrors, setNoteErrors] = useState<Map<string, string>>(new Map())
  const [, startNoteTransition] = useTransition()

  function getActions(id: string): {
    confirm: ConfirmActions
    complete: CompleteActions
    cancel: CancelActions
    note: NoteActions
  } {
    return {
      confirm: {
        isPending: confirmPendingId === id,
        error: confirmErrors.get(id) ?? null,
        onConfirm() {
          setConfirmPendingId(id)
          startConfirmTransition(async () => {
            const { error } = await updateBookingStatus(id, "confirmed")
            setConfirmPendingId(null)
            if (error) setConfirmErrors((prev) => new Map(prev).set(id, error))
          })
        },
      },

      complete: {
        isPending: completePendingId === id,
        error: completeErrors.get(id) ?? null,
        onComplete() {
          setCompletePendingId(id)
          startCompleteTransition(async () => {
            const { error } = await updateBookingStatus(id, "completed")
            setCompletePendingId(null)
            if (error) setCompleteErrors((prev) => new Map(prev).set(id, error))
          })
        },
      },

      cancel: {
        isPending: cancelPendingId === id,
        error: cancelErrors.get(id) ?? null,
        onCancel(reason: string) {
          setCancelPendingId(id)
          startCancelTransition(async () => {
            const { error } = await updateBookingStatus(id, "cancelled", reason)
            setCancelPendingId(null)
            if (error) setCancelErrors((prev) => new Map(prev).set(id, error))
          })
        },
        onClearError() {
          setCancelErrors((prev) => {
            const next = new Map(prev)
            next.delete(id)
            return next
          })
        },
      },

      note: {
        isPending: notePendingId === id,
        error: noteErrors.get(id) ?? null,
        onSave(note: string) {
          setNotePendingId(id)
          startNoteTransition(async () => {
            const { error } = await upsertStylistNote(id, note)
            setNotePendingId(null)
            if (error) {
              setNoteErrors((prev) => new Map(prev).set(id, error))
            } else {
              setNoteErrors((prev) => {
                const next = new Map(prev)
                next.delete(id)
                return next
              })
            }
          })
        },
        onClearError() {
          setNoteErrors((prev) => {
            const next = new Map(prev)
            next.delete(id)
            return next
          })
        },
      },
    }
  }

  return { getActions }
}
