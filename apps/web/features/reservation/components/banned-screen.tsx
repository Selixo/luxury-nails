import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft, ShieldOff } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { SALON } from "@/config/salon"
import { signOut } from "@/features/reservation/actions"

async function handleSignOut() {
  "use server"
  await signOut()
  redirect("/")
}

type Props = {
  reason: string
  bannedAt: string
}

export function BannedScreen({ reason, bannedAt }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-[#09090b]">
      <header className="flex items-center justify-between border-b border-white/5 px-6 py-5 md:px-12">
        <Logo />
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-light tracking-[0.2em] text-white/48 uppercase transition-colors outline-none hover:text-white/50 focus-visible:text-gold"
        >
          <ArrowLeft size={14} /> <span>Strona główna</span>
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

          <p className="mb-2 text-xs font-light tracking-[0.3em] text-red-400 uppercase">
            Dostęp zablokowany
          </p>
          <h1 className="mb-6 font-display text-2xl font-light tracking-wide text-white sm:text-3xl">
            Konto zostało zablokowane
          </h1>

          <div className="mb-8 border border-white/8 bg-white/[0.02] px-6 py-6 text-left">
            <div className="mb-4">
              <p className="mb-1 text-xxs font-light tracking-[0.2em] text-white/45 uppercase">
                Powód
              </p>
              <p className="text-sm font-light text-white/70">{reason}</p>
            </div>
            <div>
              <p className="mb-1 text-xxs font-light tracking-[0.2em] text-white/45 uppercase">
                Data zablokowania
              </p>
              <p className="text-sm font-light text-white/70">{bannedAt}</p>
            </div>
          </div>

          <p className="mb-6 text-sm leading-relaxed font-light text-white/48">
            Jeśli uważasz, że to pomyłka, skontaktuj się bezpośrednio z salonem.
          </p>

          <a
            href={`tel:${SALON.phone}`}
            className="inline-flex items-center gap-2 border border-white/10 px-6 py-3 text-xs font-light tracking-[0.2em] text-white/50 uppercase transition-colors outline-none hover:border-gold/25 hover:text-gold focus-visible:text-gold"
          >
            {SALON.phone}
          </a>

          <form action={handleSignOut} className="mt-6">
            <button
              type="submit"
              className="text-xs font-light text-white/20 transition-colors outline-none hover:text-white/40 focus-visible:text-gold"
            >
              Wyloguj się
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
