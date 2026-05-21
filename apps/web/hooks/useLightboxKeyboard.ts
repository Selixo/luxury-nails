"use client"

import { useEffect, useCallback } from "react"

type Options = {
  isOpen: boolean
  onPrev: () => void
  onNext: () => void
}

export function useLightboxKeyboard({ isOpen, onPrev, onNext }: Options) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    },
    [isOpen, onPrev, onNext]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])
}
