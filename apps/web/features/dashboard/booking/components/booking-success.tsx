"use client"

import { CheckCircle } from "lucide-react"

type Props = {
  serviceName: string | undefined
  date: string
  time: string
  userName: string
  onReset: () => void
  formatDate: (iso: string) => string
}

export function BookingSuccess({
  serviceName,
  date,
  time,
  userName,
  onReset,
  formatDate,
}: Props) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="mb-6 flex h-14 w-14 items-center justify-center border border-gold/25">
        <CheckCircle size={24} className="text-gold" aria-hidden="true" />
      </div>
      <p className="mb-1 text-xs font-light tracking-[0.3em] text-gold uppercase">
        Wysłano
      </p>
      <h2 className="mb-3 font-display text-2xl font-light tracking-wide text-white sm:text-3xl">
        Prośba przyjęta
      </h2>
      <p className="mb-2 text-sm font-light text-white/55">{serviceName}</p>
      <p className="mb-8 text-sm font-light text-white/55">
        {formatDate(date)} · {time}
      </p>
      <p className="mb-8 max-w-xs text-sm leading-relaxed font-light text-white/50">
        Skontaktuję się z Tobą telefonicznie w celu potwierdzenia terminu. Do
        zobaczenia wkrótce, {userName}!
      </p>
      <button
        onClick={onReset}
        className="border border-transparent p-1 text-xs font-light text-gold transition-colors outline-none focus-visible:border focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50"
      >
        Umów kolejną wizytę
      </button>
    </div>
  )
}
