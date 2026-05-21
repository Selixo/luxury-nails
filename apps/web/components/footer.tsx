import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { SALON } from "@/config/salon"
import { NAV_LINKS, SOCIAL_LINKS } from "@/features/home/config/home.constants"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer aria-label="Stopka strony" className="bg-[#050507] text-white">
      {/* Top gold gradient rule */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.72 0.1 85 / 0.3), transparent)",
        }}
      />

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed font-light text-white/60">
              {SALON.description}
            </p>

            {/* Socials */}
            <nav aria-label="Media społecznościowe w stopce">
              <ul role="list" className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center border border-white/8 text-white/55 transition-colors duration-300 outline-none hover:border-gold/30 hover:text-gold focus-visible:border-gold/50 focus-visible:text-gold"
                    >
                      <Icon width={16} height={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="mb-5 text-xs font-light tracking-[0.3em] text-gold uppercase">
              Nawigacja
            </p>
            <nav aria-label="Nawigacja w stopce">
              <ul role="list" className="flex flex-col gap-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={`/${href}`}
                      className="text-sm font-light text-white/60 transition-colors duration-300 outline-none hover:text-white/85 focus-visible:text-gold"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/rezerwacja"
                    className="text-sm font-light text-gold/80 transition-colors duration-300 outline-none hover:text-gold focus-visible:text-gold"
                  >
                    Zarezerwuj wizytę
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        aria-hidden="true"
        className="mx-auto h-px max-w-6xl bg-white/[0.04] px-6 md:px-12 lg:px-20"
      />
      <div className="mx-auto max-w-6xl px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-light text-white/55">
            © {year} {SALON.name}. Wszelkie prawa zastrzeżone.
          </p>
          <nav aria-label="Dokumenty prawne">
            <ul role="list" className="flex items-center gap-4">
              <li>
                <Link
                  href="/polityka-prywatnosci"
                  className="text-xs font-light text-white/55 transition-colors duration-300 outline-none hover:text-white/80 focus-visible:text-gold"
                >
                  Polityka prywatności
                </Link>
              </li>
              <li aria-hidden="true" className="h-3 w-px bg-white/10" />
              <li>
                <Link
                  href="/regulamin"
                  className="text-xs font-light text-white/55 transition-colors duration-300 outline-none hover:text-white/80 focus-visible:text-gold"
                >
                  Regulamin
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
