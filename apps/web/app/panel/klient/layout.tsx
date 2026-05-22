"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Logo } from "@/components/ui/logo"
import { SignOutButton } from "@/components/ui/sign-out-button"
import { cn } from "@workspace/ui/lib/utils"
import { BannedScreen } from "./_components/banned-screen"

const NAV = [
  { href: "/panel/klient", label: "Przegląd", exact: true },
  { href: "/panel/klient/rezerwacja", label: "Nowa wizyta", exact: false },
  { href: "/panel/klient/historia", label: "Historia", exact: false },
  { href: "/panel/klient/profil", label: "Profil", exact: false },
]

export default function KlientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (searchParams.get("demo-ban") === "1") {
    return (
      <BannedScreen
        reason="Nieobecność bez zgłoszenia (3+)"
        bannedAt="22 maja 2025"
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#09090b]">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#09090b]/95 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 md:px-12">
          <Logo />

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Panel klienta"
          >
            {NAV.map((link) => {
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-xs tracking-[0.2em] uppercase transition-colors duration-300 outline-none focus-visible:text-gold",
                    isActive ? "text-gold" : "text-white/40 hover:text-white/70"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[17px] left-0 h-px w-full bg-gold/40"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <SignOutButton className="text-xs font-light tracking-[0.15em] text-white/25 uppercase transition-colors outline-none hover:text-white/50 focus-visible:text-gold" />
        </div>

        {/* Mobile nav */}
        <nav
          className="flex items-center gap-5 overflow-x-auto px-6 pb-3 md:hidden"
          aria-label="Nawigacja mobilna"
        >
          {NAV.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "shrink-0 text-xs tracking-[0.15em] uppercase transition-colors duration-300",
                  isActive ? "text-gold" : "text-white/35 hover:text-white/60"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </header>

      <main id="main-content">{children}</main>
    </div>
  )
}
