"use client"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { ArrowRight, Eye, EyeOff } from "lucide-react"

type Props = {
  onSuccess: (name: string) => void
}

export function StepRegister({ onSuccess }: Props) {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [visible, setVisible] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = "Wpisz swoje imię."
    if (password.length < 8)
      e.password = "Hasło musi mieć co najmniej 8 znaków."
    if (password !== confirm) e.confirm = "Hasła nie są identyczne."
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    // UI-only placeholder
    // W przyszłości: POST /api/auth/register
    onSuccess(name.trim())
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
        Krok 03
      </p>
      <h1 className="mb-1 font-display text-2xl font-light tracking-wide text-white sm:text-3xl">
        Utwórz konto
      </h1>
      <p className="mb-10 text-sm font-light text-white/40">
        Numer zweryfikowany. Uzupełnij dane, aby dokończyć rejestrację.
      </p>

      <div className="mb-6 flex flex-col gap-7">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-3 block text-xs font-light tracking-[0.2em] text-white/40 uppercase"
          >
            Imię
          </label>
          <input
            id="name"
            type="text"
            autoComplete="given-name"
            autoFocus
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setErrors((prev) => ({ ...prev, name: "" }))
            }}
            placeholder="np. Anna"
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
            className="w-full border-b border-white/15 bg-transparent pb-3 text-sm font-light text-white transition-colors outline-none placeholder:text-white/20 focus:border-gold/40"
          />
          {errors.name && (
            <p
              id="name-error"
              role="alert"
              className="mt-2 text-xs font-light text-red-400/80"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="reg-password"
            className="mb-3 block text-xs font-light tracking-[0.2em] text-white/40 uppercase"
          >
            Hasło
          </label>
          <div className="flex items-center gap-3 border-b border-white/15 pb-3 transition-colors focus-within:border-gold/40">
            <input
              id="reg-password"
              type={visible ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setErrors((prev) => ({ ...prev, password: "" }))
              }}
              placeholder="Min. 8 znaków"
              aria-describedby={
                errors.password ? "reg-password-error" : undefined
              }
              aria-invalid={!!errors.password}
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
          {errors.password && (
            <p
              id="reg-password-error"
              role="alert"
              className="mt-2 text-xs font-light text-red-400/80"
            >
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm */}
        <div>
          <label
            htmlFor="confirm"
            className="mb-3 block text-xs font-light tracking-[0.2em] text-white/40 uppercase"
          >
            Powtórz hasło
          </label>
          <input
            id="confirm"
            type={visible ? "text" : "password"}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value)
              setErrors((prev) => ({ ...prev, confirm: "" }))
            }}
            placeholder="••••••••"
            aria-describedby={errors.confirm ? "confirm-error" : undefined}
            aria-invalid={!!errors.confirm}
            className="w-full border-b border-white/15 bg-transparent pb-3 text-sm font-light text-white transition-colors outline-none placeholder:text-white/20 focus:border-gold/40"
          />
          {errors.confirm && (
            <p
              id="confirm-error"
              role="alert"
              className="mt-2 text-xs font-light text-red-400/80"
            >
              {errors.confirm}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant="gold-fill"
        className="mt-2 w-full justify-between border-gold/50 px-6 py-4 tracking-widest uppercase"
      >
        <span className="relative z-10">Utwórz konto</span>
        <ArrowRight size={14} aria-hidden="true" className="relative z-10" />
      </Button>
    </form>
  )
}
