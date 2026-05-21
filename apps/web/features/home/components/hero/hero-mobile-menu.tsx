"use client"

import { X } from "lucide-react"
import Link from "next/link"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"
import { Logo } from "@/components/ui/logo"
import { NAV_LINKS, SOCIAL_LINKS } from "../../config/home.constants"

interface HeroMobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HeroMobileMenu({ open, onOpenChange }: HeroMobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="!w-[90%] border-none bg-black/95 px-8 py-10 backdrop-blur-md"
      >
        <SheetTitle className="sr-only">Menu nawigacji</SheetTitle>

        <div className="flex h-full flex-col">
          <div className="mb-12 flex items-center justify-between">
            <Logo />
            <SheetClose asChild>
              <button
                aria-label="Zamknij menu"
                className="text-white/40 transition-colors duration-200 hover:text-gold"
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
                  onClick={() => onOpenChange(false)}
                  className="group relative flex animate-fade-right items-center py-4 text-lg font-light tracking-wide text-white/70 transition-colors duration-300 outline-none hover:text-gold focus-visible:text-gold"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <span className="mr-3 text-xxs text-gold">0{i + 1}</span>
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-gold/30 transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
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
            <Link href="/rezerwacja">Zarezerwuj wizytę</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
