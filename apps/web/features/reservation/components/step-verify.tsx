"use client"

import { Button } from "@workspace/ui/components/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { maskPhone } from "../lib/phone"
import { PIN_LENGTH, useStepVerify } from "../hooks/use-step-verify"

type Props = {
  phone: string
  onNewUser: () => void
  onBack: () => void
}

export function StepVerify({ phone, onNewUser, onBack }: Props) {
  const {
    pin,
    error,
    cooldown,
    filled,
    isPending,
    handlePinChange,
    handleSubmit,
    handleResend,
    resendUsed,
  } = useStepVerify({ phone, onNewUser })

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
        Krok 02
      </p>
      <h1 className="mb-1 font-display text-2xl font-light tracking-wide text-white sm:text-3xl">
        Weryfikacja
      </h1>
      <p className="mb-10 text-sm font-light text-white/45">
        Wysłaliśmy 6-cyfrowy kod na numer{" "}
        <span className="text-white/65">{maskPhone(phone)}</span>
      </p>

      <div className="mb-8">
        <p
          id="otp-label"
          className="mb-4 text-xs font-light tracking-[0.2em] text-white/45 uppercase"
        >
          Kod SMS
        </p>
        <InputOTP
          maxLength={PIN_LENGTH}
          value={pin}
          onChange={handlePinChange}
          aria-labelledby="otp-label"
          autoFocus
        >
          <InputOTPGroup className="gap-2 sm:gap-3">
            {Array.from({ length: PIN_LENGTH }).map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        {error && (
          <p role="alert" className="mt-3 text-xs font-light text-red-400/80">
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="gold-fill"
        disabled={!filled || isPending}
        className="mb-5 w-full justify-between border-gold/50 px-6 py-4 tracking-widest uppercase disabled:opacity-40"
      >
        <span className="relative z-10">
          {isPending ? "Weryfikuję..." : "Weryfikuj kod"}
        </span>
        <ArrowRight size={14} aria-hidden="true" className="relative z-10" />
      </Button>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-light text-white/45 transition-colors outline-none hover:text-white/50 focus-visible:text-gold"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          <span>Zmień numer</span>
        </button>
        {!resendUsed ? (
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || isPending}
            className="text-xs font-light text-white/55 transition-colors outline-none hover:text-white/50 focus-visible:text-gold disabled:cursor-default disabled:opacity-50"
          >
            <span aria-live="polite">
              {cooldown > 0
                ? `Wyślij ponownie (${cooldown}s)`
                : "Wyślij ponownie"}
            </span>
          </button>
        ) : (
          <span className="text-xs font-light text-white/25">
            Kod wysłany ponownie
          </span>
        )}
      </div>
    </form>
  )
}
