"use client"

import { useEffect, useState } from "react"

export function useScrollThreshold(threshold: number): boolean {
  const [exceeded, setExceeded] = useState(false)

  useEffect(() => {
    const handleScroll = () => setExceeded(window.scrollY > threshold)

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return exceeded
}
