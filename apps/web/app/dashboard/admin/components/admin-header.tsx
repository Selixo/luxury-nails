"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui/logo"
import { SignOutButton } from "@/components/ui/sign-out-button"
import { cn } from "@workspace/ui/lib/utils"

const NAV = [
  { href: "/dashboard/admin", label: "Przegląd", exact: true },
  { href: "/dashboard/admin/bookings", label: "Wizyty", exact: false },
  { href: "/dashboard/admin/clients", label: "Klientki", exact: false },
  { href: "/dashboard/admin/kalendarz", label: "Kalendarz", exact: false },
  { href: "/dashboard/admin/summary", label: "Podsumowanie", exact: false },
  { href: "/dashboard/admin/ustawienia", label: "Ustawienia", exact: false },
]

type Props = {
  pendingCount: number
}

export function AdminHeader({ pendingCount }: Props) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#09090b]/95 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="hidden rounded-sm border border-gold/25 px-2 py-0.5 text-xxs tracking-[0.2em] text-gold/80 uppercase sm:block">
            Admin
          </span>
        </div>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Panel admina"
        >
          {NAV.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href)
            const showBadge =
              link.href === "/dashboard/admin/bookings" && pendingCount > 0

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-1 text-xs tracking-[0.2em] uppercase transition-colors duration-300 outline-none focus-visible:text-gold",
                  isActive ? "text-gold" : "text-white/50 hover:text-white/70"
                )}
              >
                {link.label}
                {showBadge && (
                  <div className="flex h-5 w-8 items-center justify-center rounded-full bg-amber-400/20">
                    <span className="text-xs leading-none font-light text-amber-400/90">
                      {pendingCount > 9 ? "9+" : pendingCount}
                    </span>
                  </div>
                )}
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

        <SignOutButton className="text-xs font-light tracking-[0.15em] text-white/50 uppercase transition-colors outline-none hover:text-white/60 focus-visible:text-gold" />
      </div>

      <nav
        className="flex items-center gap-5 overflow-x-auto px-6 pb-3 md:hidden"
        aria-label="Nawigacja mobilna"
      >
        {NAV.map((link) => {
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href)
          const showBadge =
            link.href === "/dashboard/admin/bookings" && pendingCount > 0

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 text-xs tracking-[0.15em] uppercase transition-colors duration-300",
                isActive ? "text-gold" : "text-white/35 hover:text-white/60"
              )}
            >
              {link.label}
              {showBadge && (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-[9px] font-light text-amber-400/90">
                  {pendingCount > 9 ? "9+" : pendingCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
