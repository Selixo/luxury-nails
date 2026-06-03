"use client"

import { useState, useTransition } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { updateService } from "../actions"
import type { ServiceRow as ServiceRowType } from "../types"

type Props = {
  service: ServiceRowType
}

export function ServiceRow({ service }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [price, setPrice] = useState(String(service.price))
  const [duration, setDuration] = useState(String(service.duration_min))
  const [active, setActive] = useState(service.active)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleToggleActive() {
    const next = !active
    setActive(next)
    startTransition(async () => {
      const result = await updateService(service.id, { active: next })
      if (result.error) {
        setActive(!next)
        setError(result.error)
      }
    })
  }

  function handleSave() {
    setError(null)
    const parsedPrice = parseFloat(price)
    const parsedDuration = parseInt(duration, 10)

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setError("Niepoprawna cena.")
      return
    }
    if (isNaN(parsedDuration) || parsedDuration < 5) {
      setError("Czas musi wynosić co najmniej 5 min.")
      return
    }

    startTransition(async () => {
      const result = await updateService(service.id, {
        price: parsedPrice,
        duration_min: parsedDuration,
      })
      if (result.error) {
        setError(result.error)
      } else {
        setIsEditing(false)
      }
    })
  }

  function handleCancel() {
    setPrice(String(service.price))
    setDuration(String(service.duration_min))
    setError(null)
    setIsEditing(false)
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 px-5 py-4 transition-opacity sm:flex-row sm:items-center sm:gap-4",
        !active && "opacity-50"
      )}
    >
      <button
        role="switch"
        aria-checked={active}
        onClick={handleToggleActive}
        disabled={isPending}
        title={active ? "Dezaktywuj usługę" : "Aktywuj usługę"}
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full border transition-colors outline-none focus-visible:ring-1 focus-visible:ring-gold/50 disabled:cursor-not-allowed",
          active ? "border-gold/40 bg-gold/20" : "border-white/15 bg-white/5"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0 h-[14px] w-[14px] rounded-full transition-transform",
            active
              ? "translate-x-[18px] bg-gold/80"
              : "translate-x-[3px] bg-white/25"
          )}
        />
      </button>

      <p className="flex-1 text-sm font-light text-white/70">{service.name}</p>

      {isEditing ? (
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={isPending}
              className="w-16 border border-white/15 bg-white/[0.03] px-2 py-1 text-right text-xs font-light text-white/70 transition-colors outline-none focus:border-gold/25 disabled:opacity-50"
            />
            <span className="text-xs font-light text-white/50">zł</span>
          </div>

          <div className="flex items-center gap-1.5">
            <input
              type="text"
              inputMode="numeric"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              disabled={isPending}
              className="w-14 border border-white/15 bg-white/[0.03] px-2 py-1 text-right text-xs font-light text-white/70 transition-colors outline-none focus:border-gold/25 disabled:opacity-50"
            />
            <span className="text-xs font-light text-white/50">min</span>
          </div>

          {error && (
            <span className="text-xs font-light text-red-400/80">{error}</span>
          )}

          <button
            onClick={handleSave}
            disabled={isPending}
            className="text-xs font-light text-gold/80 transition-colors hover:text-gold disabled:opacity-40"
          >
            {isPending ? "…" : "Gotowe"}
          </button>
          <button
            onClick={handleCancel}
            disabled={isPending}
            className="text-xs font-light text-white/50 transition-colors hover:text-white/60 disabled:opacity-40"
          >
            Anuluj
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4 sm:ml-auto">
          <span className="text-xs font-light text-white/50">
            {service.duration_min} min
          </span>
          <span className="min-w-[3.5rem] text-right text-sm font-light text-gold/80">
            {service.price} zł
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs font-light text-white/50 transition-colors hover:text-white/60"
            disabled={!active}
          >
            Edytuj
          </button>
        </div>
      )}
    </div>
  )
}
