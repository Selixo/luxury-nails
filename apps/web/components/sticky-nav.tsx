"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { useScrollThreshold } from "@/hooks/useScrollThreshold"
import { useOnMediaQueryMatch } from "@/hooks/useOnMediaQueryMatch"
import { NAV_LINKS } from "@/features/home/config/home.constants"
import { Logo } from "@/components/ui/logo"
import { Hamburger } from "@/components/ui/hamburger-button"

const StickyNavMobileMenu = dynamic(
  () =>
    import("@/components/sticky-nav-mobile-menu").then(
      (m) => m.StickyNavMobileMenu
    ),
  { ssr: false }
)

export function StickyNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const visible = useScrollThreshold(80)

  useOnMediaQueryMatch({
    query: "(min-width: 1024px)",
    onMatch: () => setMenuOpen(false),
  })

  return (
    <>
      <nav
        aria-hidden={!visible}
        inert={!visible}
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-transform duration-500 ease-in-out",
          visible ? "translate-y-0" : "translate-y-[-110%]"
        )}
      >
        <div className="flex items-center justify-between bg-[#09090b]/90 px-6 py-4 backdrop-blur-xl md:px-10">
          <Logo />

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative py-1 text-xxs tracking-[0.2em] text-white/70 uppercase transition-colors duration-300 outline-none hover:text-gold focus-visible:text-gold"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-0 bg-gold/50 transition-all duration-300 group-hover:w-full group-focus-visible:w-full"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="gold-fill"
              className="hidden lg:inline-flex"
            >
              <Link href="/logowanie">Umów wizytę</Link>
            </Button>

            <Hamburger
              open={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="lg:hidden"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="h-px bg-linear-to-r from-transparent via-gold/35 to-transparent"
        />
      </nav>

      <StickyNavMobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  )
}
