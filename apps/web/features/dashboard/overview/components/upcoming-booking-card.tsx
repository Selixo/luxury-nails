"use client"

import { useState, useRef, useEffect, useTransition } from "react"
import { X } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { CountedTextarea } from "@/components/ui/counted-textarea"
import { cancelClientBooking, type UpcomingBooking } from "../client-actions"

const STATUS_LABEL = {
  pending: "Oczekuje",
  confirmed: "Potwierdzona",
}

const STATUS_STYLE = {
  pending: "border-amber-400/30 text-amber-400/80",
  confirmed: "border-emerald-400/25 text-emerald-400/65",
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso + "T00:00:00"))
}

type Props = {
  booking: UpcomingBooking
}

export function UpcomingBookingCard({ booking }: Props) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const wasSubmitting = useRef(false)
  useEffect(() => {
    if (wasSubmitting.current && !isPending && !error) {
      setOpen(false)
      setReason("")
    }
    wasSubmitting.current = isPending
  }, [isPending, error])

  function handleCancel() {
    setError(null)
    startTransition(async () => {
      const result = await cancelClientBooking(booking.id, reason)
      if (result.error) setError(result.error)
    })
  }

  const serviceName = (booking.service as { name: string }).name

  return (
    <div className="mb-8 border border-gold/15 bg-gold/[0.03] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-light tracking-[0.2em] text-gold/80 uppercase">
            Nadchodząca wizyta
          </p>
          <p className="mb-1 font-display text-xl font-light text-white">
            {serviceName}
          </p>
          <p className="text-sm font-light text-white/50">
            {formatDate(booking.date)} · {booking.time}
          </p>
        </div>
        <span
          className={`shrink-0 border px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase ${STATUS_STYLE[booking.status]}`}
        >
          {STATUS_LABEL[booking.status]}
        </span>
      </div>

      <Dialog
        open={open}
        onOpenChange={(val) => {
          if (isPending) return
          if (!val) setError(null)
          setOpen(val)
        }}
      >
        <DialogTrigger asChild>
          <button className="mt-5 text-xs font-light text-red-400/80 transition-colors hover:text-red-400/60 focus-visible:text-red-400/60">
            Anuluj wizytę
          </button>
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
                {serviceName}
              </p>
              <p className="text-xs font-light text-white/50">
                {formatDate(booking.date)} · {booking.time}
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
            <label className="mb-1.5 block text-[10px] font-light tracking-[0.2em] text-white/60 uppercase">
              Powód anulowania{" "}
              <span className="text-white/50">(opcjonalnie)</span>
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
            <button
              onClick={handleCancel}
              disabled={isPending}
              className="border border-red-400/25 bg-red-400/5 px-5 py-2 text-xs font-light tracking-[0.15em] text-red-400/80 uppercase transition-colors hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending ? "Anulowanie..." : "Anuluj wizytę"}
            </button>
            <DialogClose asChild>
              <button
                disabled={isPending}
                className="text-xs font-light text-white/45 transition-colors hover:text-white/60 disabled:opacity-50"
              >
                Wróć
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
