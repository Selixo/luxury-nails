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
import type { UnbanActions } from "../hooks/use-client-actions"

type Props = {
  clientName: string
  unbanActions: UnbanActions
}

export function UnbanModal({
  clientName,
  unbanActions: { onUnban, isPending, error },
}: Props) {
  const [open, setOpen] = useState(false)

  const wasSubmitting = useRef(false)
  useEffect(() => {
    if (wasSubmitting.current && !isPending && !error) {
      setOpen(false)
    }
    wasSubmitting.current = isPending
  }, [isPending, error])

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!isPending) setOpen(val)
      }}
    >
      <DialogTrigger asChild>
        <button className="text-xs font-light text-gold transition-colors hover:text-gold/90">
          Odblokuj
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="rounded-none border border-white/10 bg-[#0d0d0d] p-6 ring-0 sm:max-w-xs"
      >
        <DialogTitle className="sr-only">Odblokowanie klientki</DialogTitle>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-light tracking-[0.2em] text-emerald-400/80 uppercase">
              Odblokowanie klientki
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

        {error && <p className="text-xs font-light text-red-400/70">{error}</p>}

        <div className="flex items-center justify-between">
          <button
            onClick={onUnban}
            disabled={isPending}
            className="border border-emerald-400/25 bg-emerald-400/5 px-5 py-2 text-xs font-light tracking-[0.15em] text-emerald-400/80 uppercase transition-colors hover:bg-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? "Odblokowywanie..." : "Odblokuj"}
          </button>
          <DialogClose asChild>
            <button
              disabled={isPending}
              className="text-xs font-light text-white/50 transition-colors hover:text-white/60 disabled:opacity-50"
            >
              Anuluj
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
