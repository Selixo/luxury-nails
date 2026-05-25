import type { Metadata } from "next"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { AuthFlow } from "@/features/reservation/auth-flow"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Rezerwacja",
  description: "Zarezerwuj wizytę w Luxury Nails lub utwórz nowe konto.",
}

export default function ReservationPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#09090b]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.72 0.1 85 / 0.04), transparent)",
        }}
      />

      <header className="relative z-10 flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-5 md:px-12 lg:px-20">
        <div className="max-w-[180px] sm:max-w-none">
          <Logo />
        </div>
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 text-xs font-light tracking-[0.2em] text-white/45 uppercase transition-colors outline-none hover:text-white/50 focus-visible:text-gold"
        >
          <ArrowLeft size={14} /> <span>Wróć</span>
        </Link>
      </header>

      <main
        id="main-content"
        className="relative z-10 flex flex-1 items-center justify-center px-6 py-14 md:px-12"
      >
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="text-xs font-light tracking-[0.3em] text-white/45 uppercase">
              Luxury Nails · Klenica
            </p>
          </div>

          <AuthFlow />

          <p className="mt-6 text-center text-xs leading-relaxed font-light text-white/50">
            Masz pytania?{" "}
            <a
              href="tel:+48570033312"
              className="text-gold transition-colors outline-none focus-visible:text-gold"
            >
              Zadzwoń do nas
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
