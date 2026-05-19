import type { AboutStat } from "../../config/home.constants"

type Props = {
  stats: AboutStat[]
  inView: boolean
  onCertificatesOpen: () => void
}

export function AboutStats({ stats, inView, onCertificatesOpen }: Props) {
  return (
    <div className="mt-10 grid grid-cols-3 border-t border-white/8 pt-8">
      {stats.map((stat, i) => {
        const content = (
          <>
            <p className="font-display text-xl font-light text-gold sm:text-2xl">
              {stat.value}
            </p>
            <p
              className={[
                "mt-1 text-xs leading-snug font-light tracking-wide text-white/45",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {stat.label}
            </p>
          </>
        )

        const animStyle = {
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(16px)",
          transitionDelay: inView ? `${0.5 + i * 0.12}s` : "0s",
        }

        if (stat.clickable) {
          return (
            <button
              key={stat.label}
              onClick={onCertificatesOpen}
              aria-label="Zobacz certyfikaty szkoleń"
              className="group text-left transition-[opacity,transform] duration-700 ease-out outline-none focus-visible:ring-1 focus-visible:ring-gold/50 motion-reduce:transition-none"
              style={animStyle}
            >
              {content}
            </button>
          )
        }

        return (
          <div
            key={stat.label}
            className="transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none"
            style={animStyle}
          >
            {content}
          </div>
        )
      })}
    </div>
  )
}
