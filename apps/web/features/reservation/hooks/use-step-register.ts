"use client"

import { useState, useTransition } from "react"
import { registerSchema } from "../schemas"
import { completeRegistration } from "../actions"

type Props = {
  onSuccess: () => void
  onCreated: () => void
}

export function useStepRegister({ onSuccess, onCreated }: Props) {
  const [fields, setFields] = useState({
    name: "",
    lastName: "",
    password: "",
    confirm: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [visible, setVisible] = useState(false)
  const [isPending, startTransition] = useTransition()

  function setField(key: keyof typeof fields) {
    return (value: string) => {
      setFields((f) => ({ ...f, [key]: value }))
      setErrors((e) => ({ ...e, [key]: "" }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const result = registerSchema.safeParse(fields)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        const key = err.path[0] as string
        if (!fieldErrors[key]) fieldErrors[key] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    startTransition(async () => {
      const { error, accountCreated, signedIn } = await completeRegistration(
        result.data.name,
        result.data.lastName,
        result.data.password
      )
      if (error) {
        setErrors({ submit: error })
        return
      }
      if (accountCreated && signedIn) {
        onSuccess()
        return
      }
      if (accountCreated && !signedIn) {
        onCreated()
        return
      }
    })
  }

  return {
    fields,
    errors,
    visible,
    isPending,
    setField,
    toggleVisible: () => setVisible((v) => !v),
    handleSubmit,
  }
}
