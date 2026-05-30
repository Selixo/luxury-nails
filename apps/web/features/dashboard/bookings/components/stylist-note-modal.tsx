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
import { Button } from "@workspace/ui/components/button"
import { CountedTextarea } from "@/components/ui/counted-textarea"

type Props = {
  existingNote: string | null
  clientName: string
  serviceName: string
  onSave: (note: string) => void
  isPending: boolean
  error: string | null
  onClearError: () => void
}

export function StylistNoteModal({
  existingNote,
  clientName,
  serviceName,
  onSave,
  isPending,
  error,
  onClearError,
}: Props) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState("")

  const wasSubmitting = useRef(false)
  useEffect(() => {
    if (wasSubmitting.current && !isPending && !error) {
      setOpen(false)
    }
    wasSubmitting.current = isPending
  }, [isPending, error])

  function handleOpenChange(val: boolean) {
    if (isPending) return
    if (val) setDraft(existingNote ?? "")
    if (!val) onClearError()
    setOpen(val)
  }

  function handleSave() {
    if (isPending) return
    onSave(draft)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div className="mt-3 flex flex-col items-start gap-3">
        {existingNote ? (
          <p className="line-clamp-2 text-xs font-light text-white/50 italic">
            Notatka stylisty:{existingNote}
          </p>
        ) : (
          <p className="text-xs font-light text-white/50 italic">
            Brak notatki
          </p>
        )}
        <DialogTrigger asChild>
          <button className="shrink-0 text-[10px] font-light tracking-[0.1em] text-gold/75 uppercase transition-colors hover:text-white/60">
            {existingNote ? "Edytuj notatkę" : "+ Notatka"}
          </button>
        </DialogTrigger>
      </div>

      <DialogContent
        showCloseButton={false}
        className="rounded-none border border-white/10 bg-[#0d0d0d] p-6 ring-0 sm:max-w-sm"
      >
        <DialogTitle className="sr-only">Notatka stylisty</DialogTitle>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-light tracking-[0.2em] text-gold/80 uppercase">
              Notatka stylisty
            </p>
            <p className="mt-1 text-sm font-light text-white/70">
              {clientName}
            </p>
            <p className="text-xs font-light text-white/55">{serviceName}</p>
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

        <CountedTextarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Kształt, kolor, długość, reakcje na produkty..."
          rows={4}
          maxLength={500}
          error={error ?? undefined}
        />

        <div className="flex items-center justify-between">
          <Button
            variant="gold-outline"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Zapisywanie…" : "Zapisz notatkę"}
          </Button>
          <DialogClose asChild>
            <button
              disabled={isPending}
              className="text-xs font-light text-white/50 transition-colors hover:text-white/70 disabled:opacity-50"
            >
              Anuluj
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
