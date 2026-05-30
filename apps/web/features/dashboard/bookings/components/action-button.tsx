import { cn } from "@workspace/ui/lib/utils"

const SCHEME_CLASSES = {
  emerald:
    "border-emerald-400/25 bg-emerald-400/5 text-emerald-400/80 hover:border-emerald-400/45 hover:bg-emerald-400/10 hover:text-emerald-400 focus-visible:ring-emerald-400/40",
  gold: "border-gold/25 bg-gold/5 text-gold/80 hover:border-gold/45 hover:bg-gold/10 hover:text-gold focus-visible:ring-gold/40",
  red: "border-red-400/25 bg-red-400/5 text-red-400/80 hover:border-red-400/45 hover:bg-red-400/10 hover:text-red-400 focus-visible:ring-red-400/40",
} as const

const SIZE_CLASSES = {
  sm: "px-3 py-1.5 tracking-[0.1em]",
  md: "px-5 py-2 tracking-[0.15em]",
} as const

type Props = React.ComponentProps<"button"> & {
  colorScheme: keyof typeof SCHEME_CLASSES
  size?: keyof typeof SIZE_CLASSES
}

export function ActionButton({
  colorScheme,
  size = "sm",
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "border text-xs font-light uppercase transition-colors outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-40",
        SCHEME_CLASSES[colorScheme],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    />
  )
}
