"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui/logo"
import { SignOutButton } from "@/components/ui/sign-out-button"
import { cn } from "@workspace/ui/lib/utils"

const NAV = [
  { href: "/panel/admin", label: "Przegląd", exact: true, badge: 0 },
  { href: "/panel/admin/wizyty", label: "Wizyty", exact: false, badge: 2 },
  { href: "/panel/admin/klientki", label: "Klientki", exact: false, badge: 0 },
  {
    href: "/panel/admin/kalendarz",
    label: "Kalendarz",
    exact: false,
    badge: 0,
  },
  {
    href: "/panel/admin/podsumowanie",
    label: "Podsumowanie",
    exact: false,
    badge: 0,
  },
  {
    href: "/panel/admin/ustawienia",
    label: "Ustawienia",
    exact: false,
    badge: 0,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#09090b]">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#09090b]/95 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 md:px-12">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden rounded-sm border border-gold/25 px-2 py-0.5 text-[10px] tracking-[0.2em] text-gold/70 uppercase sm:block">
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
                  {link.badge > 0 && (
                    <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400/20 px-1 text-[9px] font-light text-amber-400/90">
                      {link.badge}
                    </span>
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
