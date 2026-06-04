"use client"

import { useState, useEffect, useTransition } from "react"
import { sendOtp, verifyOtp } from "../actions"

export const PIN_LENGTH = 6
const RESEND_COOLDOWN = 30

type Props = {
  phone: string
  onNewUser: () => void
}

export function useStepVerify({ phone, onNewUser }: Props) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN)
  const [resendUsed, setResendUsed] = useState(false)
  const [isPending, startTransition] = useTransition()

  const filled = pin.length === PIN_LENGTH

  useEffect(() => {
    startTransition(async () => {
      await sendOtp(phone)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  function handlePinChange(val: string) {
    setPin(val)
    setError("")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!filled) {
      setError("Wpisz pełny 6-cyfrowy kod.")
      return
    }
    startTransition(async () => {
      const { error: err } = await verifyOtp(phone, pin)
      if (err) {
        setError(err)
        setPin("")
        return
      }
      onNewUser()
    })
  }

  function handleResend() {
    if (cooldown > 0 || resendUsed) return
    startTransition(async () => {
      await sendOtp(phone)
      setPin("")
      setCooldown(RESEND_COOLDOWN)
      setResendUsed(true)
    })
  }

  return {
    pin,
    error,
    cooldown,
    filled,
    isPending,
    resendUsed,
    handlePinChange,
    handleSubmit,
    handleResend,
  }
}
