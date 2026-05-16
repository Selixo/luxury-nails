export function HeroScrollIndicator() {
  return (
    <a
      href="#doswiadczenie"
      aria-label="Przewiń do kolejnej sekcji"
      className="group relative z-10 hidden animate-fade-up flex-col items-center gap-2 self-center pb-8 animation-duration-[1s] [animation-delay:2s] md:flex"
      tabIndex={-1}
    >
      <span className="text-[8px] tracking-[0.25em] text-white/25 uppercase transition-colors duration-300 group-hover:text-gold/60">
        Odkryj
      </span>
      <div className="relative h-14 w-px overflow-hidden bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
        <div
          className="absolute top-0 left-0 h-[60%] w-full animate-[scrollLine_2s_ease-in-out_2.2s_infinite]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-gold), transparent)",
          }}
        />
      </div>
      <svg
        width="6"
        height="4"
        viewBox="0 0 6 4"
        className="text-gold/40 transition-colors duration-300 group-hover:text-gold/70"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 0L3 4L6 0" stroke="currentColor" strokeWidth="1" />
      </svg>
    </a>
  )
}
