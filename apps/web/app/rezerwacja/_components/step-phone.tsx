"use client"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { ArrowRight } from "lucide-react"

type Props = {
  onExistingUser: (phone: string) => void
  onNewUser: (phone: string) => void
}

export function StepPhone({ onExistingUser, onNewUser }: Props) {
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")

  const normalized = phone.replace(/\s/g, "")
  const isValid = /^\d{9}$/.test(normalized)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) {
      setError("Podaj poprawny 9-cyfrowy numer telefonu.")
      return
    }
    // UI-only: symulacja sprawdzenia numeru
    // W przyszłości: POST /api/auth/check-phone
    const exists = false // placeholder — backend zadecyduje
    if (exists) {
      onExistingUser(normalized)
    } else {
      onNewUser(normalized)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
        Krok 01
      </p>
      <h1 className="mb-1 font-display text-2xl font-light tracking-wide text-white sm:text-3xl">
        Zaloguj się
      </h1>
      <p className="mb-10 text-sm font-light text-white/40">
        Podaj numer telefonu, aby kontynuować.
      </p>

      <div className="mb-8">
        <label
          htmlFor="phone"
          className="mb-3 block text-xs font-light tracking-[0.2em] text-white/40 uppercase"
        >
          Numer telefonu
        </label>
        <div className="flex items-center gap-3 border-b border-white/15 pb-3 transition-colors focus-within:border-gold/40">
          <span className="shrink-0 text-sm font-light text-white/30">+48</span>
          <div aria-hidden="true" className="h-4 w-px bg-white/10" />
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            autoFocus
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              setError("")
            }}
            placeholder="XXX XXX XXX"
            aria-describedby={error ? "phone-error" : undefined}
            aria-invalid={!!error}
            className="w-full bg-transparent text-sm font-light text-white outline-none placeholder:text-white/20"
          />
        </div>
        {error && (
          <p
            id="phone-error"
            role="alert"
            className="mt-2 text-xs font-light text-red-400/80"
          >
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="gold-fill"
        className="w-full justify-between border-gold/50 px-6 py-4 tracking-widest uppercase"
      >
        <span className="relative z-10">Dalej</span>
        <ArrowRight size={14} aria-hidden="true" className="relative z-10" />
      </Button>
    </form>
  )
}
