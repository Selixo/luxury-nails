import { useEffect, useState } from "react"
import type { EmblaCarouselType } from "embla-carousel"

export function useCarouselState(api: EmblaCarouselType | undefined) {
  const [current, setCurrent] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setTotal(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap())
    }
    onSelect()
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return { current, total }
}
