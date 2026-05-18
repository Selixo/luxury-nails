import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export function HeroContent() {
  return (
    <div className="relative z-10 flex flex-1 animate-fade-up flex-col items-center justify-center px-6 py-12 text-center animation-duration-[0.8s] [animation-delay:0.1s] md:px-4">
      <p className="mb-6 flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 backdrop-blur-sm md:mb-8">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]"
        />
        <span className="text-xxs tracking-[0.2em] text-white/65 uppercase">
          Przyjmujemy rezerwacje
        </span>
      </p>

      <p className="mb-4 animate-fade-up text-xs font-light tracking-[0.3em] text-gold uppercase animation-duration-[0.8s] [animation-delay:0.3s] md:mb-5">
        Ekskluzywny salon · Klenica
      </p>

      <div
        aria-hidden="true"
        className="mb-5 h-px animate-[expandLine_1s_ease_0.6s_both] bg-gold-muted md:mb-6"
      />

      <h1
        id="hero-heading"
        className="mb-5 animate-fade-up font-display text-4xl font-light tracking-wide text-white animation-duration-[0.9s] [animation-delay:0.7s] sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl"
      >
        Sztuka, którą nosisz
      </h1>

      <p className="mb-3 max-w-xs animate-fade-up text-sm leading-relaxed font-light text-white/55 animation-duration-[0.9s] [animation-delay:0.85s] md:max-w-md">
        Manicure hybrydowy, żelowy i nail art wykonane z precyzją i dbałością o
        każdy detal — od pierwszego pędzla po wykończenie.
      </p>

      <p className="mb-6 max-w-xs animate-fade-up text-sm leading-relaxed font-light text-white/47 animation-duration-[0.9s] [animation-delay:0.95s] md:mb-12 md:max-w-md">
        Umów wizytę online i ciesz się efektem, który mówi sam za siebie.
      </p>

      <div className="relative animate-fade-up animation-duration-[0.9s] [animation-delay:1.1s]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 animate-[ctaHalo_2.8s_ease-in-out_2s_infinite] blur-sm"
          style={{
            background:
              "radial-gradient(ellipse 120% 200% at 50% 50%, color-mix(in oklch, var(--color-gold) 22%, transparent) 0%, transparent 70%)",
          }}
        />
        <Button
          asChild
          variant="gold-fill"
          className="border-gold/70 px-8 py-3.5 tracking-widest uppercase md:px-10 md:py-4"
        >
          <Link href="/rezerwacja">
            <span className="relative z-10">Zarezerwuj wizytę</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
