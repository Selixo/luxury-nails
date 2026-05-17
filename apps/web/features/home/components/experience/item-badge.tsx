import { cn } from "@workspace/ui/lib/utils"

type ItemBadgeProps = {
  value: string
  label: string
  size?: "sm" | "md"
}

export function ItemBadge({ value, label, size = "md" }: ItemBadgeProps) {
  return (
    <>
      <p
        className={cn(
          "font-display font-light text-gold",
          size === "sm" ? "text-xl" : "text-2xl"
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-0.5 tracking-widest text-white/50 uppercase",
          size === "sm" ? "text-[8px]" : "text-[9px]"
        )}
      >
        {label}
      </p>
    </>
  )
}
