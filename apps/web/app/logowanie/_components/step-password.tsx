"use client"

import { useState, useTransition } from "react"
import { Button } from "@workspace/ui/components/button"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { signInWithPassword } from "../actions"

type Props = {
  phone: string
  onSuccess: () => void
  onBack: () => void
}

export function StepPassword({ phone, onSuccess, onBack }: Props) {
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  const masked = `+48 ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!password) {
      setError("Wpisz hasło.")
      return
    }
    startTransition(async () => {
      const { error: err } = await signInWithPassword(phone, password)
      if (err) {
        setError(err)
        return
      }
      onSuccess()
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
        Krok 02
      </p>
      <h1 className="mb-1 font-display text-2xl font-light tracking-wide text-white sm:text-3xl">
        Witaj ponownie
      </h1>
      <p className="mb-10 text-sm font-light text-white/40">
        Logujesz się jako <span className="text-white/65">{masked}</span>
      </p>

      <div className="mb-8">
        <label
          htmlFor="password"
          className="mb-3 block text-xs font-light tracking-[0.2em] text-white/40 uppercase"
        >
          Hasło
        </label>
        <div className="flex items-center gap-3 border-b border-white/15 pb-3 transition-colors focus-within:border-gold/40">
          <input
            id="password"
            type={visible ? "text" : "password"}
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError("")
            }}
            placeholder="••••••••"
            aria-describedby={error ? "password-error" : undefined}
            aria-invalid={!!error}
            className="w-full bg-transparent text-sm font-light text-white outline-none placeholder:text-white/20"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Ukryj hasło" : "Pokaż hasło"}
            className="shrink-0 text-white/25 transition-colors outline-none hover:text-white/50 focus-visible:text-gold"
          >
            {visible ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        {error && (
          <p
            id="password-error"
            role="alert"
            className="mt-2 text-xs font-light text-red-400/80"
          >
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        variant="gold-fill"
        className="mb-5 w-full justify-between border-gold/50 px-6 py-4 tracking-widest uppercase disabled:opacity-60"
      >
        <span className="relative z-10">
          {isPending ? "Loguję..." : "Zaloguj się"}
        </span>
        <ArrowRight size={14} aria-hidden="true" className="relative z-10" />
      </Button>

      <button
        type="button"
        onClick={onBack}
        className="text-xs font-light text-white/25 transition-colors outline-none hover:text-white/50 focus-visible:text-gold"
      >
        ← Zmień numer telefonu
      </button>
    </form>
  )
}
