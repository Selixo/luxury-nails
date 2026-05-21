import { cn } from "@workspace/ui/lib/utils"
import { GALLERY_FILTERS } from "../../config/home.constants"

type FilterId = (typeof GALLERY_FILTERS)[number]["id"]

type Props = {
  active: FilterId
  gridId: string
  onChange: (id: FilterId) => void
}

export function GalleryFilters({ active, gridId, onChange }: Props) {
  return (
    <div className="mx-auto mb-10 max-w-6xl overflow-x-auto md:mb-14">
      <ul
        role="tablist"
        aria-label="Filtruj według kategorii"
        className="flex flex-wrap items-center gap-6 py-1.5 pb-2.5 md:gap-x-8"
      >
        {GALLERY_FILTERS.map((filter) => {
          const isActive = active === filter.id
          return (
            <li key={filter.id} role="presentation">
              <button
                role="tab"
                aria-selected={isActive}
                aria-controls={gridId}
                onClick={() => onChange(filter.id)}
                className={cn(
                  "relative text-xs font-light tracking-[0.2em] uppercase transition-colors duration-300",
                  isActive ? "text-gold" : "text-white/55 hover:text-white/80"
                )}
              >
                {filter.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-2 left-0 h-px bg-gold transition-[width,opacity] duration-300 ease-out",
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  )}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
