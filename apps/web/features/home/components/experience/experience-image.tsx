import Image from "next/image"
import { cn } from "@workspace/ui/lib/utils"
import { ItemBadge } from "./item-badge"
import type { ExperienceItem } from "../../config/home.constants"

type Props = {
  item: ExperienceItem
  isReversed: boolean
  inView: boolean
}

function CornerFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-4">
      <div className="absolute top-0 left-0 h-5 w-5 border-t border-l border-gold/40 sm:h-6 sm:w-6" />
      <div className="absolute top-0 right-0 h-5 w-5 border-t border-r border-gold/40 sm:h-6 sm:w-6" />
      <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-gold/40 sm:h-6 sm:w-6" />
      <div className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-gold/40 sm:h-6 sm:w-6" />
    </div>
  )
}

export function ExperienceImage({ item, isReversed, inView }: Props) {
  const badgePosition = isReversed
    ? "left-0 -translate-x-1/3"
    : "right-0 translate-x-1/3"
  const badgeTranslateX = isReversed ? "-33%" : "33%"

  return (
    <div className={cn("relative", isReversed && "lg:order-last")}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 hidden rounded-full opacity-30 blur-2xl lg:block"
        style={{
          background: `radial-gradient(ellipse at ${isReversed ? "70%" : "30%"} 50%, oklch(0.72 0.1 85 / 0.1), transparent 70%)`,
        }}
      />

      <div className="group relative aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-[3/1] md:aspect-[4/3] lg:aspect-[4/5]">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/25" />
        <CornerFrame />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent"
        />

        <div
          aria-hidden="true"
          className="absolute right-5 bottom-5 z-10 border border-gold/30 bg-zinc-900/95 px-4 py-3 text-center transition-[opacity] delay-300 duration-[900ms] ease-out motion-reduce:transition-none lg:hidden"
          style={{ opacity: inView ? 1 : 0 }}
        >
          <ItemBadge {...item.badge} size="sm" />
        </div>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "absolute top-10 z-10 hidden border border-gold/25 bg-zinc-900/95 px-5 py-4 text-center transition-[opacity,transform] delay-300 duration-[900ms] ease-out motion-reduce:transition-none lg:block",
          badgePosition
        )}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView
            ? `translateX(${badgeTranslateX})`
            : `translateX(${badgeTranslateX}) translateY(12px)`,
        }}
      >
        <ItemBadge {...item.badge} />
      </div>
    </div>
  )
}
