import {
  Calendar,
  History,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import type {
  ExperienceItem,
  ExperienceIconKey,
} from "../../config/home.constants"

const ICON_MAP: Record<ExperienceIconKey, LucideIcon> = {
  calendar: Calendar,
  history: History,
  sparkles: Sparkles,
  star: Star,
}

type Props = {
  item: ExperienceItem
  isReversed: boolean
  inView: boolean
  total: number
}

export function ExperienceContent({ item, isReversed, inView }: Props) {
  const Icon = ICON_MAP[item.icon]
  const slideFrom = isReversed ? "24px" : "-24px"

  return (
    <div
      className={cn(
        "relative transition-[opacity,transform] delay-200 duration-[900ms] ease-out motion-reduce:transition-none",
        isReversed && "lg:order-first"
      )}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : `translateX(${slideFrom})`,
      }}
    >
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 -translate-y-1/2 font-display text-[7rem] leading-none font-light text-white/[0.06] select-none md:text-[11rem] lg:text-[16.25rem]"
      >
        {item.number}
      </span>

      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-3 lg:mb-6">
          <div
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center bg-gold/10"
          >
            <Icon size={18} className="text-gold" strokeWidth={1.5} />
          </div>
          <span className="text-xxs tracking-[0.3em] text-gold/80 uppercase">
            {item.tag}
          </span>
        </div>

        <h3
          id={`experience-title-${item.number}`}
          className="mb-2 font-display text-2xl font-light tracking-wide text-white sm:text-3xl lg:mb-4 lg:text-5xl"
        >
          {item.title}
        </h3>

        <div
          aria-hidden="true"
          className="mb-3 h-px w-10 origin-left bg-gold/30 transition-transform delay-500 duration-[800ms] ease-out motion-reduce:transition-none lg:mb-6"
          style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }}
        />

        <p className="text-sm leading-loose font-light text-white/55 lg:max-w-sm">
          {item.description}
        </p>

        <ul
          aria-label="Cechy"
          className="mt-4 hidden flex-wrap gap-2 md:flex lg:mt-6"
        >
          {item.features.map((feature, i) => (
            <li
              key={feature}
              className="border border-white/8 px-3 py-1.5 text-xxs tracking-wider text-white/50 uppercase transition-opacity duration-500 ease-out motion-reduce:transition-none"
              style={{
                opacity: inView ? 1 : 0,
                transitionDelay: inView ? `${0.6 + i * 0.1}s` : "0s",
              }}
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
