"use client"

import { useState, useTransition } from "react"
import { X } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { deleteAccount } from "../actions"

export function DeleteAccountModal() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    setError(null)
    startTransition(async () => {
      const result = await deleteAccount()
      if (result?.error) setError(result.error)
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!isPending) setOpen(val)
      }}
    >
      <DialogTrigger asChild>
        <button className="text-xs font-light text-red-400/80 transition-colors hover:text-red-400/90">
          Usuń konto
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="rounded-none border border-white/10 bg-[#0d0d0d] p-6 ring-0 sm:max-w-sm"
      >
        <DialogTitle className="sr-only">Usunięcie konta</DialogTitle>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-light tracking-[0.2em] text-red-400/80 uppercase">
              Usunięcie konta
            </p>
            <p className="mt-1 text-sm font-light text-white/70">
              Tej operacji nie można cofnąć
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

        <p className="text-xs leading-relaxed font-light text-white/40">
          Usunięcie konta spowoduje trwałe usunięcie wszystkich Twoich danych
          osobowych, historii wizyt oraz ocen. Zgodnie z RODO masz prawo do
          usunięcia swoich danych (art. 17).
        </p>

        {error && (
          <p role="alert" className="text-xs font-light text-red-400/70">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="border border-red-400/25 bg-red-400/5 px-5 py-2 text-xs font-light tracking-[0.15em] text-red-400/80 uppercase transition-colors hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? "Usuwanie..." : "Usuń konto"}
          </button>
          <DialogClose asChild>
            <button
              disabled={isPending}
              className="text-xs font-light text-white/40 transition-colors hover:text-white/60 disabled:opacity-50"
            >
              Anuluj
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
