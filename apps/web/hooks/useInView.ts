"use client"

import { useEffect, useRef, useState } from "react"

type Options = {
  threshold?: number
  rootMargin?: string
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "0px",
}: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, inView }
}
