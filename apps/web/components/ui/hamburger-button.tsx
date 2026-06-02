"use client"

import { cn } from "@workspace/ui/lib/utils"

type HamburgerProps = {
  open: boolean
  onClick: () => void
  className?: string
}

export function Hamburger({ open, onClick, className }: HamburgerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Zamknij menu" : "Otwórz menu"}
      aria-expanded={open}
      className={cn(
        "relative flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 transition-colors",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "block h-px w-6 origin-center bg-white/60 transition-all duration-300",
          open && "translate-y-1.75 rotate-45 bg-white"
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "block h-px origin-center bg-gold/60 transition-all duration-300",
          open ? "w-0 opacity-0" : "w-5 opacity-100"
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "block h-px w-6 origin-center bg-white/60 transition-all duration-300",
          open && "-translate-y-1.75 -rotate-45 bg-white"
        )}
      />
    </button>
  )
}
