"use client"

import { useState } from "react"
import { StepPhone } from "./step-phone"
import { StepPassword } from "./step-password"
import { StepPin } from "./step-pin"
import { StepRegister } from "./step-register"
import { StepBooking } from "./step-booking"

type Step =
  | { id: "phone" }
  | { id: "password"; phone: string }
  | { id: "pin"; phone: string }
  | { id: "register" }
  | { id: "booking"; name: string }

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

export function ReservationFlow() {
  const [step, setStep] = useState<Step>({ id: "phone" })

  function renderStep() {
    switch (step.id) {
      case "phone":
        return (
          <StepPhone
            onExistingUser={(phone) => setStep({ id: "password", phone })}
            onNewUser={(phone) => setStep({ id: "pin", phone })}
          />
        )
      case "password":
        return (
          <StepPassword
            phone={step.phone}
            onSuccess={(name) => setStep({ id: "booking", name })}
            onBack={() => setStep({ id: "phone" })}
          />
        )
      case "pin":
        return (
          <StepPin
            phone={step.phone}
            onVerified={() => setStep({ id: "register" })}
            onBack={() => setStep({ id: "phone" })}
          />
        )
      case "register":
        return (
          <StepRegister
            onSuccess={(name) => setStep({ id: "booking", name })}
          />
        )
      case "booking":
        return <StepBooking name={step.name} />
    }
  }

  return (
    <div className="relative border border-white/8 bg-white/[0.02] px-8 py-10 sm:px-12 sm:py-12">
      {/* Ambient glow */}
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
