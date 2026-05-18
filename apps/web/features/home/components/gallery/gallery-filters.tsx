import { GALLERY_FILTERS } from "../../config/home.constants"

type FilterId = (typeof GALLERY_FILTERS)[number]["id"]

type Props = {
  active: FilterId
  onChange: (id: FilterId) => void
}

export function GalleryFilters({ active, onChange }: Props) {
  return (
    <div className="mx-auto mb-10 max-w-6xl md:mb-14">
      <div
        role="tablist"
        aria-label="Filtruj według kategorii"
        className="flex flex-wrap gap-x-6 gap-y-2 md:gap-x-8"
      >
        {GALLERY_FILTERS.map((filter) => {
          const isActive = active === filter.id
          return (
            <button
              key={filter.id}
              role="tab"
              aria-selected={isActive}
              aria-controls="gallery-grid"
              onClick={() => onChange(filter.id)}
              className="relative pb-2 text-xs font-light tracking-[0.2em] uppercase transition-colors duration-300 outline-none focus-visible:ring-1 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              style={{
                color: isActive
                  ? "oklch(0.72 0.1 85)"
                  : "rgb(255 255 255 / 0.4)",
              }}
            >
              {filter.label}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px transition-[width,opacity] duration-300 ease-out"
                style={{
                  width: isActive ? "100%" : "0%",
                  opacity: isActive ? 1 : 0,
                  background: "oklch(0.72 0.1 85)",
                }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
