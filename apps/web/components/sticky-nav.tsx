"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@workspace/ui/components/sheet"

const NAV_LINKS = [
  { label: "Doświadczenie", href: "#doswiadczenie" },
  { label: "Galeria", href: "#galeria" },
  { label: "Program VIP", href: "#vip" },
  { label: "Opinie", href: "#opinie" },
  { label: "Lokalizacja", href: "#lokalizacja" },
]

export function StickyNav() {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 80)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)")
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false)
    }
    mql.addEventListener("change", handleChange)
    return () => mql.removeEventListener("change", handleChange)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 right-0 left-0 z-50 transition-transform duration-500 ease-in-out"
        style={{ transform: visible ? "translateY(0)" : "translateY(-110%)" }}
        aria-hidden={!visible}
        inert={!visible}
      >
        {/* Glass bar */}
        <div className="flex items-center justify-between bg-[#09090b]/90 px-6 py-4 backdrop-blur-xl md:px-10">
          {/* Logo */}
          <a href="#">
            <img
              src="/logo.svg"
              alt="Luxury Nails"
              className="block h-9 w-auto"
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative py-1 text-[10px] tracking-[0.2em] text-white/70 uppercase transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-gold/50 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <a
              href="#rezerwacja"
              className="group relative hidden overflow-hidden border border-gold/40 px-5 py-2 lg:block"
            >
              <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative z-10 text-[10px] tracking-[0.2em] text-gold/70 uppercase transition-colors duration-500 group-hover:text-black">
                Umów wizytę
              </span>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Otwórz menu"
              className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span className="block h-px w-5 bg-white/60 transition-all duration-300" />
              <span className="block h-px w-3 self-end bg-gold/60 transition-all duration-300" />
              <span className="block h-px w-5 bg-white/60 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* Gold gradient accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      </nav>

      {/* Mobile sheet — reuses same design as hero sheet */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full border-none bg-black/95 px-8 py-10 backdrop-blur-md sm:w-80"
        >
          <SheetTitle className="sr-only">Menu nawigacji</SheetTitle>
          <div className="flex h-full flex-col">
            <div className="mb-12 flex items-center justify-between">
              <img
                src="/logo.svg"
                alt="Luxury Nails"
                className="block h-5 w-auto"
              />
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
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group relative flex cursor-pointer items-center py-4 text-lg font-light tracking-wide text-white/70 transition-colors duration-300 hover:text-gold"
                    style={{
                      animation: `stickyFadeRight 0.4s ease ${i * 0.07}s both`,
                    }}
                  >
                    <span className="mr-3 text-[10px] text-gold/40">
                      0{i + 1}
                    </span>
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-gold/30 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#rezerwacja"
              onClick={() => setMenuOpen(false)}
              className="group relative mt-auto cursor-pointer overflow-hidden border border-gold/60 py-4 text-center"
            >
              <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative z-10 text-sm font-light tracking-widest text-gold transition-colors duration-500 group-hover:text-black">
                ZAREZERWUJ WIZYTĘ
              </span>
            </a>
          </div>
        </SheetContent>
      </Sheet>

      <style>{`
        @keyframes stickyFadeRight {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  )
}
