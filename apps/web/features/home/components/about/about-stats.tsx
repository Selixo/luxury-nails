import { ArrowUpRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import type { AboutStat } from "../../config/home.constants"

const STAT_TRANSITION =
  "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none"

type Props = {
  stats: AboutStat[]
  inView: boolean
  onCertificatesOpen: () => void
}

export function AboutStats({ stats, inView, onCertificatesOpen }: Props) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/8 pt-8 sm:grid-cols-3 sm:gap-y-0">
      {stats.map((stat, i) => {
        const isLast = i === stats.length - 1
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
              style={animStyle}
              className={cn(
                "group -m-2 rounded-xl p-2 text-left outline-none",
                "ring-1 ring-gold/20 ring-inset",
                "hover:bg-gold/[0.04] hover:ring-gold/40",
                "focus-visible:ring-gold/60",
                "transition-[box-shadow,background-color] duration-300",
                STAT_TRANSITION
              )}
            >
              <p className="font-display text-xl font-light text-gold transition-colors duration-300 group-hover:text-gold/80 sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs leading-snug font-light tracking-wide text-white/55 transition-colors duration-300 group-hover:text-white/75">
                {stat.label}
                <ArrowUpRight
                  size={10}
                  aria-hidden="true"
                  className="shrink-0 text-gold/50 transition-colors duration-300 group-hover:text-gold"
                />
              </p>
            </button>
          )
        }

        return (
          <div
            key={stat.label}
            style={animStyle}
            className={cn(
              isLast && "col-span-2 sm:col-span-1",
              STAT_TRANSITION
            )}
          >
            <p className="font-display text-xl font-light text-gold sm:text-2xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs leading-snug font-light tracking-wide text-white/55">
              {stat.label}
            </p>
          </div>
        )
      })}
    </div>
  )
}
