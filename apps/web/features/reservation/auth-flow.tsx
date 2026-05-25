"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StepPhone } from "./components/step-phone"
import { StepPassword } from "./components/step-password"
import { StepVerify } from "./components/step-verify"
import { StepRegister } from "./components/step-register"
import { CornerFrame } from "@/components/ui/corner-frames"
import { StepIndicator } from "./components/step-indicator"

type StepId = "phone" | "verify" | "password" | "register"

type Step =
  | { id: "phone" }
  | { id: "verify"; phone: string }
  | { id: "password"; phone: string }
  | { id: "register"; phone: string }

const FLOWS = {
  existing: ["phone", "password"] as const,
  new: ["phone", "verify", "register"] as const,
}

export function AuthFlow() {
  const [step, setStep] = useState<Step>({ id: "phone" })
  const [flow, setFlow] = useState<keyof typeof FLOWS>("new")
  const router = useRouter()

  const phone = "phone" in step ? step.phone : ""
  const currentFlow = FLOWS[flow]
  const totalSteps = currentFlow.length
  const currentIndex = (currentFlow as readonly string[]).indexOf(step.id)

  const stepMap: Record<StepId, React.ReactNode> = {
    phone: (
      <StepPhone
        onSent={({ phone: p, isExisting }) => {
          setFlow(isExisting ? "existing" : "new")
          setStep(
            isExisting
              ? { id: "password", phone: p }
              : { id: "verify", phone: p }
          )
        }}
      />
    ),
    verify: (
      <StepVerify
        phone={phone}
        onNewUser={() => setStep({ id: "register", phone })}
        onBack={() => setStep({ id: "phone" })}
      />
    ),
    password: (
      <StepPassword
        phone={phone}
        onSuccess={() => router.push("/dashboard/client")}
        onBack={() => setStep({ id: "phone" })}
      />
    ),
    register: (
      <StepRegister
        onSuccess={() => {
          router.push("/dashboard/client")
        }}
        onCreated={() => {
          setFlow("existing")
          setStep({ id: "password", phone })
        }}
      />
    ),
  }

  return (
    <div className="relative border border-white/8 bg-white/2 px-8 py-10 sm:px-12 sm:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.1 85 / 0.2), transparent 70%)",
        }}
      />

      <CornerFrame />

      <StepIndicator current={currentIndex} total={totalSteps} />

      <div key={step.id} className="animate-fade-up animation-duration-[0.4s]">
        {stepMap[step.id]}
      </div>
    </div>
  )
}
