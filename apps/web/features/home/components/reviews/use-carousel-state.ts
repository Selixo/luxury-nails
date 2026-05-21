import { useEffect, useState } from "react"
import type { EmblaCarouselType } from "embla-carousel"

export function useCarouselState(api: EmblaCarouselType | undefined) {
  const [current, setCurrent] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setCurrent(api.selectedScrollSnap())
    setTotal(api.scrollSnapList().length)
    onSelect()
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return { current, total }
}
