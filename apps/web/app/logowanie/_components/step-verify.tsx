"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@workspace/ui/components/button"
import { ArrowRight } from "lucide-react"

const PIN_LENGTH = 6
const RESEND_COOLDOWN = 30
const DEV_PIN = "123456" // tymczasowy PIN do testów UI — usuń gdy backend gotowy

type Props = {
  phone: string
  onVerified: () => void
  onBack: () => void
}

export function StepVerify({ phone, onVerified, onBack }: Props) {
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(""))
  const [error, setError] = useState("")
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const masked = `+48 ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`
  const filled = pin.every((d) => d !== "")

  // Countdown for resend button
  useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1)
    const next = [...pin]
    next[index] = digit
    setPin(next)
    setError("")
    if (digit && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const text = e.clipboardData.getData("text")
    const digits = text.replace(/\D/g, "").slice(0, PIN_LENGTH).split("")
    const next = Array(PIN_LENGTH).fill("")
    digits.forEach((d, i) => {
      next[i] = d
    })
    setPin(next)
    const focusIndex = Math.min(digits.length, PIN_LENGTH - 1)
    inputRefs.current[focusIndex]?.focus()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!filled) {
      setError("Wpisz pełny 6-cyfrowy kod PIN.")
      return
    }
    if (pin.join("") !== DEV_PIN) {
      setError(`Nieprawidłowy kod. (testowy PIN: ${DEV_PIN})`)
      return
    }
    // W przyszłości: POST /api/auth/verify-pin
    onVerified()
  }

  function handleResend() {
    if (cooldown > 0) return
    setPin(Array(PIN_LENGTH).fill(""))
    setCooldown(RESEND_COOLDOWN)
    inputRefs.current[0]?.focus()
    // W przyszłości: POST /api/auth/send-pin
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
        Krok 02
      </p>
      <h1 className="mb-1 font-display text-2xl font-light tracking-wide text-white sm:text-3xl">
        Weryfikacja
      </h1>
      <p className="mb-10 text-sm font-light text-white/40">
        Wysłaliśmy 6-cyfrowy kod na numer{" "}
        <span className="text-white/65">{masked}</span>
      </p>

      <div className="mb-8">
        <label className="mb-4 block text-xs font-light tracking-[0.2em] text-white/40 uppercase">
          Kod PIN
        </label>
        <div
          className="flex gap-2 sm:gap-3"
          role="group"
          aria-label="Wprowadź 6-cyfrowy kod PIN"
          onPaste={handlePaste}
        >
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={pin[i]}
              autoFocus={i === 0}
              autoComplete="one-time-code"
              aria-label={`Cyfra ${i + 1} z ${PIN_LENGTH}`}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={[
                "h-12 w-full min-w-0 border-b-2 bg-transparent text-center text-lg font-light text-white transition-colors outline-none",
                pin[i]
                  ? "border-gold/50 text-gold"
                  : "border-white/15 focus:border-gold/40",
              ].join(" ")}
            />
          ))}
        </div>
        {error && (
          <p role="alert" className="mt-3 text-xs font-light text-red-400/80">
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="gold-fill"
        disabled={!filled}
        className="mb-5 w-full justify-between border-gold/50 px-6 py-4 tracking-widest uppercase disabled:opacity-40"
      >
        <span className="relative z-10">Weryfikuj kod</span>
        <ArrowRight size={14} aria-hidden="true" className="relative z-10" />
      </Button>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-light text-white/25 transition-colors outline-none hover:text-white/50 focus-visible:text-gold"
        >
          ← Zmień numer
        </button>
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0}
          aria-live="polite"
          className="text-xs font-light text-white/25 transition-colors outline-none hover:text-white/50 focus-visible:text-gold disabled:cursor-default disabled:opacity-50"
        >
          {cooldown > 0 ? `Wyślij ponownie (${cooldown}s)` : "Wyślij ponownie"}
        </button>
      </div>
    </form>
  )
}
