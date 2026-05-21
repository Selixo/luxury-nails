import { ABOUT } from "../../config/home.constants"

type Props = {
  inView: boolean
}

export function AboutContent({ inView }: Props) {
  return (
    <div
      className="relative transition-[opacity,transform] delay-200 duration-[900ms] ease-out motion-reduce:transition-none"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(24px)",
      }}
    >
      <p className="mb-4 text-xs font-light tracking-[0.3em] text-gold uppercase">
        O mnie
      </p>

      <h2 className="mb-6 font-display text-3xl font-light tracking-wide text-white sm:text-4xl lg:text-5xl">
        {ABOUT.headline}
      </h2>

      <div
        aria-hidden="true"
        className="mb-6 h-px w-10 origin-left bg-gold/30 transition-transform delay-500 duration-[800ms] ease-out motion-reduce:transition-none"
        style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }}
      />

      <p className="mb-4 text-sm leading-loose font-light text-white/60">
        {ABOUT.lead}
      </p>
      <p className="text-sm leading-loose font-light text-white/50">
        {ABOUT.body}
      </p>

      <p className="mt-8 font-display text-2xl font-light text-white/40 italic sm:text-3xl">
        {ABOUT.ownerName}
      </p>
    </div>
  )
}
