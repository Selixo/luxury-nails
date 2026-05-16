import { useEffect } from "react"

type Options = {
  query: string
  onMatch: () => void
  enabled?: boolean
}

export function useOnMediaQueryMatch({
  query,
  onMatch,
  enabled = true,
}: Options) {
  useEffect(() => {
    if (!enabled) return
    if (typeof window === "undefined") return

    const media = window.matchMedia(query)

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        onMatch()
      }
    }

    media.addEventListener("change", handleChange)

    if (media.matches) {
      onMatch()
    }

    return () => {
      media.removeEventListener("change", handleChange)
    }
  }, [query, onMatch, enabled])
}
