"use client"

import { Lightbox } from "@/components/ui/lightbox"
import type { CertificateItem } from "../../config/home.constants"

type Props = {
  items: CertificateItem[]
  index: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function CertificatesLightbox({
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
      title={item ? `${item.name} — ${item.issuer}` : "Certyfikaty"}
      counter={{ current: (index ?? 0) + 1, total: items.length }}
      imageSrc={item?.src}
      imageAlt={item?.alt}
      imageSizes="(max-width: 1024px) 100vw, 768px"
      maxWidth="max-w-3xl"
      closeLabel="Zamknij galerię certyfikatów"
      prevLabel="Poprzedni certyfikat"
      nextLabel="Następny certyfikat"
      caption={
        item && (
          <>
            <p className="text-xxs font-light tracking-[0.25em] text-gold uppercase">
              {item.issuer} · {item.year}
            </p>
            <p className="mt-1 text-sm font-light text-white/70">{item.name}</p>
          </>
        )
      }
    />
  )
}
