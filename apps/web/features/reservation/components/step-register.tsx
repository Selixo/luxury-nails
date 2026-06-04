"use client"

import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { useStepRegister } from "../hooks/use-step-register"

type Props = {
  onSuccess: () => void
  onCreated: () => void
}

const inputClass =
  "w-full border-b border-white/15 bg-transparent pb-3 text-sm font-light text-white transition-colors outline-none placeholder:text-white/20 focus:border-gold/40"
const labelClass =
  "mb-3 block text-xs font-light tracking-[0.2em] text-white/40 uppercase"
const errorClass = "mt-2 text-xs font-light text-red-400/80"

export function StepRegister({ onSuccess, onCreated }: Props) {
  const {
    fields,
    errors,
    visible,
    isPending,
    setField,
    setRodo,
    toggleVisible,
    handleSubmit,
  } = useStepRegister({ onSuccess, onCreated })

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
        <div>
          <label htmlFor="name" className={labelClass}>
            Imię
          </label>
          <input
            id="name"
            type="text"
            autoComplete="given-name"
            autoFocus
            value={fields.name}
            onChange={(e) => setField("name")(e.target.value)}
            placeholder="np. Anna"
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
            className={inputClass}
          />
          {errors.name && (
            <p id="name-error" role="alert" className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Nazwisko
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            value={fields.lastName}
            onChange={(e) => setField("lastName")(e.target.value)}
            placeholder="np. Kowalska"
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            aria-invalid={!!errors.lastName}
            className={inputClass}
          />
          {errors.lastName && (
            <p id="lastName-error" role="alert" className={errorClass}>
              {errors.lastName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="reg-password" className={labelClass}>
            Hasło
          </label>
          <div className="flex items-center gap-3 border-b border-white/15 pb-3 transition-colors focus-within:border-gold/40">
            <input
              id="reg-password"
              type={visible ? "text" : "password"}
              autoComplete="new-password"
              value={fields.password}
              onChange={(e) => setField("password")(e.target.value)}
              placeholder="Min. 8 znaków"
              aria-describedby={
                errors.password ? "reg-password-error" : undefined
              }
              aria-invalid={!!errors.password}
              className="w-full bg-transparent text-sm font-light text-white outline-none placeholder:text-white/20"
            />
            <button
              type="button"
              onClick={toggleVisible}
              aria-label={visible ? "Ukryj hasło" : "Pokaż hasło"}
              className="shrink-0 text-white/25 transition-colors outline-none hover:text-white/50 focus-visible:text-gold"
            >
              {visible ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          {errors.password && (
            <p id="reg-password-error" role="alert" className={errorClass}>
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirm" className={labelClass}>
            Powtórz hasło
          </label>
          <input
            id="confirm"
            type={visible ? "text" : "password"}
            autoComplete="new-password"
            value={fields.confirm}
            onChange={(e) => setField("confirm")(e.target.value)}
            placeholder="••••••••"
            aria-describedby={errors.confirm ? "confirm-error" : undefined}
            aria-invalid={!!errors.confirm}
            className={inputClass}
          />
          {errors.confirm && (
            <p id="confirm-error" role="alert" className={errorClass}>
              {errors.confirm}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            id="rodo"
            type="checkbox"
            checked={fields.rodo}
            onChange={(e) => setRodo(e.target.checked)}
            aria-describedby={errors.rodo ? "rodo-error" : undefined}
            aria-invalid={!!errors.rodo}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-gold"
          />
          <span className="text-xs leading-relaxed font-light text-white/40">
            Akceptuję{" "}
            <Link
              href="/privacy-policy"
              target="_blank"
              className="text-white/60 underline underline-offset-2 transition-colors hover:text-gold"
            >
              politykę prywatności
            </Link>{" "}
            i wyrażam zgodę na przetwarzanie moich danych osobowych w celu
            realizacji rezerwacji.
          </span>
        </label>
        {errors.rodo && (
          <p id="rodo-error" role="alert" className={errorClass}>
            {errors.rodo}
          </p>
        )}
      </div>

      {errors.submit && (
        <p role="alert" className="mb-4 text-xs font-light text-red-400/80">
          {errors.submit}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        variant="gold-fill"
        className="mt-2 w-full justify-between border-gold/50 px-6 py-4 tracking-widest uppercase disabled:opacity-60"
      >
        <span className="relative z-10">
          {isPending ? "Tworzę konto..." : "Utwórz konto"}
        </span>
        <ArrowRight size={14} aria-hidden="true" className="relative z-10" />
      </Button>
    </form>
  )
}
