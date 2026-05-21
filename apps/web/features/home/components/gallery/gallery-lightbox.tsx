"use client"

import { Lightbox } from "@/components/ui/lightbox"
import type { GalleryItem } from "../../config/home.constants"

const CATEGORY_LABELS: Record<GalleryItem["category"], string> = {
  hybryda: "Hybryda",
  zel: "Żel",
  "nail-art": "Nail Art",
  przedluzanie: "Przedłużanie",
  manicure: "Manicure",
}

type Props = {
  items: GalleryItem[]
  index: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function GalleryLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const item = index !== null ? items[index] : null

  return (
    <Lightbox
      open={index !== null}
      onClose={onClose}
      onPrev={onPrev}
      onNext={onNext}
      title={item ? `${item.service} — ${item.alt}` : "Galeria"}
      counter={{ current: (index ?? 0) + 1, total: items.length }}
      imageSrc={item?.src}
      imageAlt={item?.alt}
      imageSizes="(max-width: 1024px) 100vw, 896px"
      maxWidth="max-w-4xl"
      closeLabel="Zamknij galerię"
      prevLabel="Poprzednie zdjęcie"
      nextLabel="Następne zdjęcie"
      caption={
        item && (
          <>
            <p className="text-xxs font-light tracking-[0.25em] text-gold uppercase">
              {CATEGORY_LABELS[item.category]}
            </p>
            <p className="mt-1 text-sm font-light text-white/70">
              {item.service}
            </p>
          </>
        )
      }
    />
  )
}
