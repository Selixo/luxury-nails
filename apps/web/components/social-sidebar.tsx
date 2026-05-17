import { SOCIAL_LINKS } from "@/features/home/config/home.constants"
import Link from "next/link"

export function SocialSidebar() {
  return (
    <nav
      aria-label="Media społecznościowe"
      className="fixed top-1/2 right-6 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      <div
        aria-hidden="true"
        className="h-12 w-px bg-linear-to-b from-transparent to-gold/30"
      />

      <ul role="list" className="flex flex-col items-center gap-2">
        {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <Link
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-9 w-9 items-center justify-center rounded-full text-white/30 transition-colors duration-300 outline-none hover:text-gold focus-visible:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gold/0 blur-sm transition-all duration-500 group-hover:bg-gold/10 group-focus-visible:bg-gold/10"
              />

              <span className="relative transition-transform duration-300 ease-out group-hover:scale-[1.2] group-focus-visible:scale-[1.2]">
                <Icon width={20} height={20} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="h-12 w-px bg-linear-to-t from-transparent to-gold/30"
      />
    </nav>
  )
}
