"use client"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { CountedTextarea } from "@/components/ui/counted-textarea"
import { ActionButton } from "./action-button"

type Props = {
  variant: "pending" | "confirmed"
  clientName: string
  serviceName: string
  date: string
  onCancel: (reason: string) => void
  isPending: boolean
  error: string | null
  onClearError: () => void
}

export function CancelModal({
  variant,
  clientName,
  serviceName,
  date,
  onCancel,
  isPending,
  error,
  onClearError,
}: Props) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")

  const wasSubmitting = useRef(false)
  useEffect(() => {
    if (wasSubmitting.current && !isPending && !error) {
      setOpen(false)
      setReason("")
    }
    wasSubmitting.current = isPending
  }, [isPending, error])

  function handleOpenChange(val: boolean) {
    if (isPending) return
    if (!val) onClearError()
    setOpen(val)
  }

  function handleConfirm() {
    if (isPending) return
    onCancel(reason)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {variant === "pending" ? (
          <ActionButton colorScheme="red">Anuluj</ActionButton>
        ) : (
          <button className="text-xs font-light text-white/50 transition-colors hover:text-red-400/80">
            Anuluj wizytę
          </button>
        )}
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="rounded-none border border-white/10 bg-[#0d0d0d] p-6 ring-0 sm:max-w-sm"
      >
        <DialogTitle className="sr-only">Anulowanie wizyty</DialogTitle>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-light tracking-[0.2em] text-red-400/80 uppercase">
              Anulowanie wizyty
            </p>
            <p className="mt-1 text-sm font-light text-white/70">
              {clientName}
            </p>
            <p className="text-xs font-light text-white/55">
              {serviceName} · {date}
            </p>
          </div>
          <DialogClose asChild>
            <button
              disabled={isPending}
              aria-label="Zamknij"
              className="text-white/20 transition-colors hover:text-white/60 disabled:opacity-30"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </DialogClose>
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] font-light tracking-[0.2em] text-white/50 uppercase">
            Powód anulowania
            <span className="ml-1 text-white/45">(opcjonalnie)</span>
          </label>
          <CountedTextarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Np. brak dostępności, zmiana terminu..."
            rows={3}
            maxLength={300}
            error={error ?? undefined}
          />
        </div>

        <div className="flex items-center justify-between">
          <ActionButton
            colorScheme="red"
            size="md"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? "Anulowanie…" : "Anuluj wizytę"}
          </ActionButton>
          <DialogClose asChild>
            <button
              disabled={isPending}
              className="text-xs font-light text-white/50 transition-colors hover:text-white/70 disabled:opacity-50"
            >
              Wróć
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
