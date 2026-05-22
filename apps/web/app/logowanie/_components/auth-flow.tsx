"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StepPhone } from "./step-phone"
import { StepPassword } from "./step-password"
import { StepVerify } from "./step-verify"
import { StepRegister } from "./step-register"

type Step =
  | { id: "phone" }
  | { id: "password"; phone: string }
  | { id: "verify"; phone: string }
  | { id: "register"; phone: string }

function CornerFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-5">
      <div className="absolute top-0 left-0 h-5 w-5 border-t border-l border-gold/20" />
      <div className="absolute top-0 right-0 h-5 w-5 border-t border-r border-gold/20" />
      <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-gold/20" />
      <div className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-gold/20" />
    </div>
  )
}

export function AuthFlow() {
  const [step, setStep] = useState<Step>({ id: "phone" })
  const router = useRouter()

  function renderStep() {
    switch (step.id) {
      case "phone":
        return (
          <StepPhone
            onExistingUser={(phone) => setStep({ id: "password", phone })}
            onNewUser={(phone) => setStep({ id: "verify", phone })}
          />
        )
      case "password":
        return (
          <StepPassword
            phone={step.phone}
            onSuccess={() => router.push("/panel/klient")}
            onBack={() => setStep({ id: "phone" })}
          />
        )
      case "verify":
        return (
          <StepVerify
            phone={step.phone}
            onVerified={() => setStep({ id: "register", phone: step.phone })}
            onBack={() => setStep({ id: "phone" })}
          />
        )
      case "register":
        return (
          <StepRegister
            phone={step.phone}
            onSuccess={() => router.push("/panel/klient")}
          />
        )
    }
  }

  return (
    <div className="relative border border-white/8 bg-white/[0.02] px-8 py-10 sm:px-12 sm:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.1 85 / 0.2), transparent 70%)",
        }}
      />

      <CornerFrame />

      <div key={step.id} className="animate-fade-up animation-duration-[0.4s]">
        {renderStep()}
      </div>
    </div>
  )
}
