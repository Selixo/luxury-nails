"use client"

import { useState, useCallback, useId } from "react"
import { GALLERY_ITEMS, GALLERY_FILTERS } from "../../config/home.constants"
import { GalleryFilters } from "./gallery-filters"
import { GalleryCard } from "./gallery-card"
import { GalleryLightbox } from "./gallery-lightbox"

type FilterId = (typeof GALLERY_FILTERS)[number]["id"]

export function GalleryClient() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const panelId = useId()

  const filteredItems =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter)

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filteredItems.length) % filteredItems.length
    )
  }, [filteredItems.length])

  const handleNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filteredItems.length
    )
  }, [filteredItems.length])

  const handleClose = useCallback(() => setLightboxIndex(null), [])

  return (
    <>
      <GalleryFilters
        active={activeFilter}
        gridId={panelId}
        onChange={setActiveFilter}
      />

      <div
        id={panelId}
        role="tabpanel"
        aria-label={`Zdjęcia: ${GALLERY_FILTERS.find((f) => f.id === activeFilter)?.label ?? "Wszystkie"}`}
        aria-live="polite"
        aria-atomic="false"
        className="mx-auto grid max-w-6xl auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-3 md:gap-4"
      >
        {filteredItems.map((item, i) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={i}
            priority={i < 4}
            onClick={() => setLightboxIndex(i)}
          />
        ))}
      </div>

      <GalleryLightbox
        items={filteredItems}
        index={lightboxIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  )
}
