"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@workspace/ui/components/sheet"
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

interface AdminMobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pendingCount: number
}

export function AdminMobileMenu({
  open,
  onOpenChange,
  pendingCount,
}: AdminMobileMenuProps) {
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-[80%]! border-none bg-black/95 px-6 py-10 backdrop-blur-md"
      >
        <SheetTitle className="sr-only">Menu admina</SheetTitle>
        <div className="flex h-full flex-col">
          <div className="mb-12 flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <Logo />
              <span className="w-fit rounded-sm border border-gold/25 px-2 py-0.5 text-xxs tracking-[0.2em] text-gold/80 uppercase">
                Admin
              </span>
            </div>
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
            {NAV.map((link, i) => {
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href)
              const showBadge =
                link.href === "/dashboard/admin/bookings" && pendingCount > 0

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      "group relative flex animate-fade-right items-center justify-between py-4 text-lg font-light tracking-wide transition-colors duration-300 outline-none focus-visible:text-gold",
                      isActive ? "text-gold" : "text-white/60 hover:text-white"
                    )}
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xxs text-gold/50">0{i + 1}</span>
                      {link.label}
                    </div>
                    {showBadge && (
                      <span className="flex h-5 w-8 items-center justify-center rounded-full bg-amber-400/20 text-xs font-light text-amber-400/90">
                        {pendingCount > 9 ? "9+" : pendingCount}
                      </span>
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-0 bg-gold/20 transition-all duration-300 group-hover:w-full group-focus-visible:w-full"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mt-auto">
            <SignOutButton className="text-xs font-light tracking-[0.15em] text-white/40 uppercase transition-colors outline-none hover:text-white/60 focus-visible:text-gold" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
