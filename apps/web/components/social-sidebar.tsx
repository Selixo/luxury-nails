const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        width="15"
        height="15"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        width="15"
        height="15"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        width="15"
        height="15"
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
]

export function SocialSidebar() {
  return (
    <div className="fixed top-1/2 right-6 z-50 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
      <div className="h-12 w-px bg-gradient-to-b from-transparent to-gold/30" />

      {SOCIALS.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="flex h-8 w-8 items-center justify-center text-white/30 transition-colors duration-300 hover:text-gold"
        >
          {icon}
        </a>
      ))}

      <div className="h-12 w-px bg-gradient-to-t from-transparent to-gold/30" />
    </div>
  )
}
