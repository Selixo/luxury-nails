import { cn } from "@workspace/ui/lib/utils"

type Props = {
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
  label: string
}

export function Toggle({ checked, disabled, onChange, label }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507] disabled:cursor-not-allowed",
        checked ? "bg-gold/80" : "bg-white/35"
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 bg-white transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0.5",
          disabled && "opacity-50"
        )}
      />
    </button>
  )
}
