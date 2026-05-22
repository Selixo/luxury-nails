import type { Metadata } from "next"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { AuthFlow } from "./_components/auth-flow"

export const metadata: Metadata = {
  title: "Logowanie",
  description: "Zaloguj się do swojego konta w Luxury Nails lub utwórz nowe.",
}

export default function LogowaniePage() {
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

      <header className="relative z-10 flex items-center justify-between border-b border-white/5 px-6 py-5 md:px-12 lg:px-20">
        <Logo />
        <Link
          href="/"
          className="text-xs font-light tracking-[0.2em] text-white/25 uppercase transition-colors outline-none hover:text-white/50 focus-visible:text-gold"
        >
          ← Wróć
        </Link>
      </header>

      <main
        id="main-content"
        className="relative z-10 flex flex-1 items-center justify-center px-6 py-14 md:px-12"
      >
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="text-xs font-light tracking-[0.3em] text-white/20 uppercase">
              Luxury Nails · Klenica
            </p>
          </div>

          <AuthFlow />

          <p className="mt-6 text-center text-xs leading-relaxed font-light text-white/20">
            Masz pytania?{" "}
            <a
              href="tel:+48570033312"
              className="text-white/35 transition-colors outline-none hover:text-gold focus-visible:text-gold"
            >
              Zadzwoń do nas
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
