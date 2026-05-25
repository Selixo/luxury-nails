import Link from "next/link"
import { ShieldOff } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { SALON } from "@/config/salon"

type Props = {
  reason: string
  note?: string
  bannedAt: string
}

export function BannedScreen({ reason, note, bannedAt }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-[#09090b]">
      <header className="flex items-center justify-between border-b border-white/5 px-6 py-5 md:px-12">
        <Logo />
        <Link
          href="/"
          className="text-xs font-light tracking-[0.2em] text-white/25 uppercase transition-colors outline-none hover:text-white/50 focus-visible:text-gold"
        >
          <span aria-hidden="true">←</span> Strona główna
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center border border-red-400/20">
              <ShieldOff
                size={28}
                className="text-red-400/60"
                aria-hidden="true"
              />
            </div>
          </div>

          <p className="mb-2 text-xs font-light tracking-[0.3em] text-red-400/60 uppercase">
            Dostęp zablokowany
          </p>
          <h1 className="mb-6 font-display text-2xl font-light tracking-wide text-white sm:text-3xl">
            Konto zostało zablokowane
          </h1>

          <div className="mb-8 border border-white/8 bg-white/[0.02] px-6 py-6 text-left">
            <div className="mb-4">
              <p className="mb-1 text-[10px] font-light tracking-[0.2em] text-white/25 uppercase">
                Powód
              </p>
              <p className="text-sm font-light text-white/70">{reason}</p>
            </div>
            {note && (
              <div className="mb-4">
                <p className="mb-1 text-[10px] font-light tracking-[0.2em] text-white/25 uppercase">
                  Notatka
                </p>
                <p className="text-sm font-light text-white/50 italic">
                  {note}
                </p>
              </div>
            )}
            <div>
              <p className="mb-1 text-[10px] font-light tracking-[0.2em] text-white/25 uppercase">
                Data zablokowania
              </p>
              <p className="text-sm font-light text-white/50">{bannedAt}</p>
            </div>
          </div>

          <p className="mb-6 text-sm leading-relaxed font-light text-white/35">
            Jeśli uważasz, że to pomyłka, skontaktuj się bezpośrednio z salonem.
          </p>

          <a
            href={`tel:${SALON.phone}`}
            className="inline-flex items-center gap-2 border border-white/10 px-6 py-3 text-xs font-light tracking-[0.2em] text-white/50 uppercase transition-colors outline-none hover:border-gold/25 hover:text-gold focus-visible:text-gold"
          >
            {SALON.phone}
          </a>
        </div>
      </main>
    </div>
  )
}
