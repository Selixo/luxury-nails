import { Star } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

type BaseProps = {
  value: number
  size?: number
  className?: string
}

type ReadOnlyProps = BaseProps & { onChange?: never }
type InteractiveProps = BaseProps & { onChange: (stars: number) => void }

type Props = ReadOnlyProps | InteractiveProps

export function StarRating({ value, onChange, size = 16, className }: Props) {
  const interactive = !!onChange

  return (
    <div
      className={cn("flex gap-1", className)}
      role={interactive ? "radiogroup" : "img"}
      aria-label={interactive ? "Wybierz ocenę" : `Ocena: ${value} z 5`}
    >
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = s <= value

        if (!interactive) {
          return (
            <Star
              key={s}
              size={size}
              aria-hidden="true"
              className={cn(
                "transition-colors",
                filled
                  ? "fill-gold/80 text-gold"
                  : "fill-transparent text-white/20"
              )}
            />
          )
        }

        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            aria-label={`${s} ${s === 1 ? "gwiazdka" : s < 5 ? "gwiazdki" : "gwiazdek"}`}
            role="radio"
            aria-checked={filled}
            className="outline-none"
          >
            <Star
              size={size}
              className={cn(
                "transition-colors",
                filled
                  ? "fill-gold/80 text-gold"
                  : "fill-transparent text-white/20 hover:text-gold/50"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
