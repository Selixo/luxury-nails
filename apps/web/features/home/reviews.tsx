import { REVIEWS } from "./config/home.constants"
import { ReviewsHeader } from "./components/reviews/reviews-header"
import { ReviewsCarousel } from "./components/reviews/reviews-carousel"

export function Reviews() {
  return (
    <section
      id="opinie"
      aria-labelledby="reviews-heading"
      className="scroll-mt-20 bg-[#09090b] px-6 py-12 md:px-12 md:py-20 lg:px-20 lg:py-28"
    >
      <ReviewsHeader />

      <div className="mx-auto max-w-3xl">
        <ReviewsCarousel reviews={REVIEWS} />
      </div>
    </section>
  )
}
