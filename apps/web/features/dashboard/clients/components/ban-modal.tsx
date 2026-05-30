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

type Props = {
  clientName: string
  onBan: (reason: string, note: string) => void
  isPending: boolean
  error: string | null
  onClearError: () => void
}

export function BanModal({
  clientName,
  onBan,
  isPending,
  error,
  onClearError,
}: Props) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [note, setNote] = useState("")

  const wasSubmitting = useRef(false)
  useEffect(() => {
    if (wasSubmitting.current && !isPending && !error) {
      setOpen(false)
      setReason("")
      setNote("")
    }
    wasSubmitting.current = isPending
  }, [isPending, error])

  function handleOpenChange(val: boolean) {
    if (isPending) return
    if (!val) onClearError()
    setOpen(val)
  }

  function handleConfirm() {
    if (isPending || !reason.trim()) return
    onBan(reason, note)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="text-xs font-light text-red-400/80 transition-colors hover:text-red-400/90">
          Zablokuj
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="rounded-none border border-white/10 bg-[#0d0d0d] p-6 ring-0 sm:max-w-sm"
      >
        <DialogTitle className="sr-only">Blokowanie klientki</DialogTitle>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-light tracking-[0.2em] text-red-400/80 uppercase">
              Blokowanie klientki
            </p>
            <p className="mt-1 text-sm font-light text-white/70">
              {clientName}
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

        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-[10px] font-light tracking-[0.2em] text-white/60 uppercase">
              Powód blokady <span className="text-red-400/70">*</span>
            </label>
            <CountedTextarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Np. wielokrotne nieodwoływanie wizyt..."
              rows={3}
              maxLength={200}
              error={error ?? undefined}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-light tracking-[0.2em] text-white/60 uppercase">
              Notatka <span className="text-white/50">(opcjonalnie)</span>
            </label>
            <CountedTextarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Dodatkowe informacje..."
              rows={2}
              maxLength={300}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleConfirm}
            disabled={isPending || !reason.trim()}
            className="border border-red-400/25 bg-red-400/5 px-5 py-2 text-xs font-light tracking-[0.15em] text-red-400/80 uppercase transition-colors hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? "Blokowanie..." : "Zablokuj"}
          </button>
          <DialogClose asChild>
            <button
              disabled={isPending}
              className="text-xs font-light text-white/45 transition-colors hover:text-white/60 disabled:opacity-50"
            >
              Anuluj
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
