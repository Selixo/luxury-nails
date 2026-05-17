"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { useScrollThreshold } from "@/hooks/useScrollThreshold"
import { useOnMediaQueryMatch } from "@/hooks/useOnMediaQueryMatch"
import { NAV_LINKS, SOCIAL_LINKS } from "@/features/home/config/home.constants"
import { Logo } from "@/components/ui/logo"
import { Hamburger } from "@/components/ui/hamburger-button"

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
                  className="group relative py-1 text-xxs tracking-[0.2em] text-white/70 uppercase transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-0 bg-gold/50 transition-all duration-300 group-hover:w-full"
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
              <Link href="#rezerwacja">Umów wizytę</Link>
            </Button>

            <Hamburger open={menuOpen} onClick={() => setMenuOpen(true)} />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="h-px bg-linear-to-r from-transparent via-gold/35 to-transparent"
        />
      </nav>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-[90%]! border-none bg-black/95 px-6 py-10 backdrop-blur-md sm:px-8"
        >
          <SheetTitle className="sr-only">Menu nawigacji</SheetTitle>
          <div className="flex h-full flex-col">
            <div className="mb-12 flex items-center justify-between">
              <Logo />
              <SheetClose asChild>
                <button
                  aria-label="Zamknij menu"
                  className="cursor-pointer text-white/40 transition-colors duration-200 hover:text-gold"
                >
                  <X size={18} strokeWidth={1} />
                </button>
              </SheetClose>
            </div>

            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group relative flex animate-fade-right items-center py-4 text-lg font-light tracking-wide text-white/70 transition-colors duration-300 hover:text-gold"
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    <span className="mr-3 text-xxs text-gold">0{i + 1}</span>
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-0 bg-gold/30 transition-all duration-300 group-hover:w-full"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-auto mb-6 flex animate-fade-up items-center gap-5 [animation-delay:0.35s]">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    aria-label={label}
                    className="text-white/50 transition-colors duration-200 hover:text-gold"
                  >
                    <Icon width={20} height={20} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <Button
              asChild
              variant="gold-fill"
              className="w-full animate-fade-up py-4 tracking-widest uppercase [animation-delay:0.4s]"
            >
              <Link href="#rezerwacja" onClick={() => setMenuOpen(false)}>
                Zarezerwuj wizytę
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
