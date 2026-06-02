"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CalendarPlus, Clock, User } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

const NAV = [
  {
    href: "/dashboard/client",
    label: "Przegląd",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/client/booking",
    label: "Nowa wizyta",
    icon: CalendarPlus,
    exact: false,
  },
  {
    href: "/dashboard/client/history",
    label: "Historia",
    icon: Clock,
    exact: false,
  },
  {
    href: "/dashboard/client/profil",
    label: "Profil",
    icon: User,
    exact: false,
  },
]

export function ClientBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-40 border-t border-white/5 bg-[#09090b]/95 backdrop-blur-xl md:hidden"
      aria-label="Nawigacja"
    >
      <ul className="flex items-center">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 py-3 transition-colors duration-300 outline-none focus-visible:text-gold",
                  isActive ? "text-gold" : "text-white/50 hover:text-white/60"
                )}
              >
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                <span className="text-[10px] tracking-[0.12em] uppercase">
                  {label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
