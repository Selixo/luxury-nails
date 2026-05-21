import { Quote, Star } from "lucide-react"
import { ReviewAvatar } from "./review-avatar"
import type { Review } from "../../config/home.constants"

type Props = {
  review: Review
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      role="img"
      className="flex items-center gap-1"
      aria-label={`Ocena: ${rating} na 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          aria-hidden="true"
          className={
            i < rating
              ? "fill-gold text-gold"
              : "fill-transparent text-white/20"
          }
        />
      ))}
    </div>
  )
}

function CornerFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-5">
      <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-gold/25" />
      <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-gold/25" />
      <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-gold/25" />
      <div className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-gold/25" />
    </div>
  )
}

export function ReviewCard({ review }: Props) {
  return (
    <article
      aria-label={`Opinia klientki ${review.author}`}
      className="relative mx-auto max-w-2xl border border-white/5 bg-white/[0.03] px-10 py-10"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -left-8 h-40 w-40 rounded-full opacity-30 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.1 85 / 0.15), transparent 70%)",
        }}
      />

      <CornerFrame />

      {/* Quote icon + stars row */}
      <div className="mb-6 flex items-center justify-between">
        <Quote size={28} aria-hidden="true" className="text-gold/25" />
        <StarRating rating={review.rating} />
      </div>

      <blockquote className="mb-8 text-base leading-loose font-light text-white/60 sm:text-lg">
        {review.text}
      </blockquote>

      <div aria-hidden="true" className="mb-8 h-px w-full bg-white/5" />

      <footer className="flex items-center gap-4">
        <ReviewAvatar author={review.author} avatar={review.avatar} />
        <div>
          <p className="text-sm font-light text-white/80">{review.author}</p>
          <p className="mt-0.5 text-[11px] font-light tracking-wide text-white/55">
            {review.service} · {review.date}
          </p>
        </div>
      </footer>
    </article>
  )
}
