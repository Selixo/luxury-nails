import { Fragment } from "react"
import { STATS } from "../../config/home.constants"

export function HeroStats() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-4xl animate-fade-up px-6 pt-4 pb-16 animation-duration-[1s] [animation-delay:1.3s]">
      <dl>
        <div className="flex items-center justify-center">
          {STATS.map((stat, i) => (
            <Fragment key={stat.value}>
              <dd className="flex-1 text-center font-display text-lg font-light text-gold sm:text-xl md:text-2xl">
                {stat.value}
              </dd>
              {i < STATS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="mx-3 h-5 w-px shrink-0 bg-gold/20 sm:mx-5"
                />
              )}
            </Fragment>
          ))}
        </div>

        <div className="mt-1.5 flex items-start justify-center">
          {STATS.map((stat, i) => (
            <Fragment key={stat.label}>
              <dt className="flex-1 text-center text-[8px] tracking-wider text-white/60 uppercase sm:text-[9px] md:text-xxs md:tracking-widest">
                {stat.label}
              </dt>
              {i < STATS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="mx-3 w-px shrink-0 sm:mx-5"
                />
              )}
            </Fragment>
          ))}
        </div>
      </dl>
    </div>
  )
}
