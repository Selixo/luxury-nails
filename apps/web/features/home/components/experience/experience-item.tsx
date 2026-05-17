"use client"

import { useInView } from "@/hooks/useInView"
import { ExperienceImage } from "./experience-image"
import { ExperienceContent } from "./experience-content"
import type { ExperienceItem as ExperienceItemType } from "../../config/home.constants"

type Props = {
  item: ExperienceItemType
  isReversed: boolean
  total: number
}

export function ExperienceItem({ item, isReversed, total }: Props) {
  const { ref, inView } = useInView()

  return (
    <article
      ref={ref}
      aria-labelledby={`experience-title-${item.number}`}
      className="grid grid-cols-1 items-center gap-10 transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:transition-none md:grid-cols-2 md:gap-4 lg:gap-20"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
      }}
    >
      <ExperienceImage item={item} isReversed={isReversed} inView={inView} />
      <ExperienceContent
        item={item}
        isReversed={isReversed}
        inView={inView}
        total={total}
      />
    </article>
  )
}
