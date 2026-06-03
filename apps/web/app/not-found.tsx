import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] px-6">
      <div className="flex max-w-sm flex-col items-center text-center">
        <div className="mb-6 h-px w-12 bg-white/10" />

        <p className="mb-1 font-display text-6xl font-light text-red-400/80">
          404
        </p>
        <h1 className="mb-3 font-display text-2xl font-light text-white/80">
          Nie znaleziono strony
        </h1>
        <p className="mb-8 text-xs leading-relaxed font-light text-white/50">
          Strona której szukasz nie istnieje lub została przeniesiona.
        </p>

        <Link
          href="/"
          className="border border-white/10 px-5 py-2.5 text-xs font-light tracking-[0.15em] text-white/50 uppercase transition-colors outline-none hover:border-gold/25 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold/40"
        >
          Wróć do strony głównej
        </Link>
      </div>
    </div>
  )
}
