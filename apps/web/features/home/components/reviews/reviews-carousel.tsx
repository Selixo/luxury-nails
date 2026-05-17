"use client"

import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel"
import type { Review } from "../../config/home.constants"
import { ReviewCard } from "./review-card"
import { ReviewsNavigation } from "./reviews-navigation"

const AUTOPLAY_DELAY = 5000
const STOP_ON_INTERACTION = true
const RESUME_DELAY = 8000

type Props = {
  reviews: Review[]
}

export function ReviewsCarousel({ reviews }: Props) {
  const plugin = useRef(
    Autoplay({
      delay: AUTOPLAY_DELAY,
      stopOnInteraction: STOP_ON_INTERACTION,
      stopOnMouseEnter: false,
    })
  )

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[plugin.current]}
      onMouseLeave={() => plugin.current.play()}
      className="w-full"
    >
      <CarouselContent>
        {reviews.map((review) => (
          <CarouselItem key={review.author} className="py-2">
            <ReviewCard review={review} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <ReviewsNavigation resumeDelay={RESUME_DELAY} plugin={plugin.current} />
    </Carousel>
  )
}
