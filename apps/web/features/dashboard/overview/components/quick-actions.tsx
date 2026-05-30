import Link from "next/link"
import { ArrowRight, CalendarDays, Clock, Sparkles } from "lucide-react"

const ACTIONS = [
  {
    href: "/dashboard/client/booking",
    icon: CalendarDays,
    label: "Zarezerwuj wizytę",
    description: "Wybierz usługę i termin",
  },
  {
    href: "/dashboard/client/history",
    icon: Clock,
    label: "Historia wizyt",
    description: "Przeglądaj poprzednie stylizacje",
  },
  {
    href: "/dashboard/client/profil",
    icon: Sparkles,
    label: "Twój profil",
    description: "Dane i ustawienia konta",
  },
]

export function QuickActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {ACTIONS.map(({ href, icon: Icon, label, description }) => (
        <Link
          key={href}
          href={href}
          className="group flex flex-col gap-4 border border-white/8 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-gold/20 hover:bg-white/[0.04]"
        >
          <Icon
            size={18}
            aria-hidden="true"
            className="text-gold/60 transition-colors duration-300 group-hover:text-gold"
          />
          <div>
            <p className="mb-1 text-sm font-light text-white/80 transition-colors duration-300 group-hover:text-white">
              {label}
            </p>
            <p className="text-xs font-light text-white/50">{description}</p>
          </div>
          <ArrowRight
            size={12}
            aria-hidden="true"
            className="mt-auto self-end text-white/20 transition-colors duration-300 group-hover:text-gold/50"
          />
        </Link>
      ))}
    </div>
  )
}
