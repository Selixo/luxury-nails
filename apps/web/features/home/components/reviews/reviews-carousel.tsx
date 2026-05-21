"use client"

import Autoplay from "embla-carousel-autoplay"
import { useRef, useState } from "react"
import type { EmblaCarouselType } from "embla-carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel"
import type { Review } from "../../config/home.constants"
import { ReviewCard } from "./review-card"
import { ReviewsNavigation } from "./reviews-navigation"
import { useCarouselState } from "./use-carousel-state"

const AUTOPLAY_DELAY = 5000
const RESUME_DELAY = 8000

type Props = {
  reviews: Review[]
}

export function ReviewsCarousel({ reviews }: Props) {
  const plugin = useRef(
    Autoplay({
      delay: AUTOPLAY_DELAY,
      stopOnInteraction: true,
      stopOnMouseEnter: false,
    })
  )
  const [api, setApi] = useState<EmblaCarouselType>()
  const { current } = useCarouselState(api)

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      plugins={[plugin.current]}
      onMouseLeave={() => plugin.current.play()}
      className="w-full"
    >
      <CarouselContent>
        {reviews.map((review, i) => (
          <CarouselItem
            key={review.author}
            className="py-2"
            aria-hidden={i !== current}
          >
            <ReviewCard review={review} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <ReviewsNavigation resumeDelay={RESUME_DELAY} plugin={plugin.current} />
    </Carousel>
  )
}
