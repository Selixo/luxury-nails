"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useScrollThreshold } from "@/hooks/useScrollThreshold"
import { Hamburger } from "@/components/ui/hamburger-button"
import { useOnMediaQueryMatch } from "@/hooks/useOnMediaQueryMatch"
import { NAV_LINKS } from "../../config/home.constants"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"

const HeroMobileMenu = dynamic(
  () => import("./hero-mobile-menu").then((m) => m.HeroMobileMenu),
  { ssr: false }
)

export const HeroNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const stickyVisible = useScrollThreshold(80)

  useOnMediaQueryMatch({
    query: "(min-width: 1024px)",
    onMatch: () => setMenuOpen(false),
  })

  return (
    <>
      <nav
        aria-hidden={stickyVisible}
        inert={stickyVisible}
        className="relative z-20 flex animate-fade-down items-center justify-between px-6 py-6 md:px-10 md:py-7"
      >
        <Logo />

        <ul className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative py-1 text-sm font-light tracking-wide text-white/75 transition-colors duration-300 outline-none hover:text-gold focus-visible:text-gold"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <Button asChild variant="gold-fill" className="hidden lg:inline-flex">
          <Link href="/reservation">Umów wizytę</Link>
        </Button>

        <Hamburger open={menuOpen} onClick={() => setMenuOpen(true)} />
      </nav>

      <HeroMobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  )
}
