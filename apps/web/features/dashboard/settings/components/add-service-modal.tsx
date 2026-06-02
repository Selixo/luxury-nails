"use client"

import { useState, useTransition, useRef, useEffect } from "react"
import { Plus, X } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { createService } from "../actions"

type Props = {
  existingCategories: string[]
}

const EMPTY_FORM = {
  name: "",
  category: "",
  price: "",
  duration_min: "",
}

export function AddServiceModal({ existingCategories }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => nameRef.current?.focus(), 50)
    }
  }, [open])

  function handleOpenChange(val: boolean) {
    if (isPending) return
    if (!val) {
      setForm(EMPTY_FORM)
      setError(null)
    }
    setOpen(val)
  }

  function handleSubmit() {
    setError(null)

    const price = parseFloat(form.price)
    const duration_min = parseInt(form.duration_min, 10)

    if (!form.name.trim()) return setError("Podaj nazwę usługi.")
    if (!form.category.trim()) return setError("Podaj kategorię.")
    if (isNaN(price) || price < 0) return setError("Podaj poprawną cenę.")
    if (isNaN(duration_min) || duration_min < 5)
      return setError("Czas musi wynosić co najmniej 5 minut.")

    startTransition(async () => {
      const result = await createService({
        name: form.name.trim(),
        category: form.category.trim(),
        price,
        duration_min,
      })
      if (result.error) {
        setError(result.error)
      } else {
        setOpen(false)
        setForm(EMPTY_FORM)
      }
    })
  }

  function field(key: keyof typeof EMPTY_FORM, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 border border-dashed border-white/10 px-5 py-3 text-xs font-light tracking-[0.15em] text-white/30 uppercase transition-colors hover:border-gold/25 hover:text-gold/70 focus-visible:ring-1 focus-visible:ring-gold/40 focus-visible:outline-none">
          <Plus size={12} aria-hidden="true" />
          Dodaj usługę
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="rounded-none border border-white/10 bg-[#0d0d0d] p-6 ring-0 sm:max-w-sm"
      >
        <DialogTitle className="sr-only">Nowa usługa</DialogTitle>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-light tracking-[0.2em] text-gold/80 uppercase">
              Nowa usługa
            </p>
            <p className="mt-1 text-sm font-light text-white/70">
              Uzupełnij dane usługi
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

        <div className="space-y-4">
          <Field label="Nazwa usługi" required>
            <input
              ref={nameRef}
              type="text"
              value={form.name}
              onChange={(e) => field("name", e.target.value)}
              placeholder="np. Manicure hybrydowy"
              disabled={isPending}
              className="w-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-light text-white/70 transition-colors outline-none placeholder:text-white/20 focus:border-white/20 disabled:opacity-50"
            />
          </Field>

          <Field label="Kategoria" required>
            <input
              type="text"
              list="categories-list"
              value={form.category}
              onChange={(e) => field("category", e.target.value)}
              placeholder="np. Manicure"
              disabled={isPending}
              className="w-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-light text-white/70 transition-colors outline-none placeholder:text-white/20 focus:border-white/20 disabled:opacity-50"
            />
            <datalist id="categories-list">
              {existingCategories.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </Field>

          <div className="flex gap-4">
            <Field label="Cena (zł)" required className="flex-1">
              <input
                type="text"
                inputMode="decimal"
                value={form.price}
                onChange={(e) => field("price", e.target.value)}
                placeholder="110"
                disabled={isPending}
                className="w-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-light text-white/70 transition-colors outline-none placeholder:text-white/20 focus:border-white/20 disabled:opacity-50"
              />
            </Field>

            <Field label="Czas (min)" required className="flex-1">
              <input
                type="text"
                inputMode="numeric"
                value={form.duration_min}
                onChange={(e) => field("duration_min", e.target.value)}
                placeholder="60"
                disabled={isPending}
                className="w-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-light text-white/70 transition-colors outline-none placeholder:text-white/20 focus:border-white/20 disabled:opacity-50"
              />
            </Field>
          </div>
        </div>

        {error && <p className="text-xs font-light text-red-400/80">{error}</p>}

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="border border-white/10 px-5 py-2.5 text-xs font-light tracking-[0.15em] text-white/50 uppercase transition-colors outline-none hover:border-gold/25 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold/40 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? "Dodawanie…" : "Dodaj usługę"}
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

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[10px] font-light tracking-[0.2em] text-white/50 uppercase">
        {label}
        {required && <span className="ml-1 text-gold/80">*</span>}
      </span>
      {children}
    </label>
  )
}
