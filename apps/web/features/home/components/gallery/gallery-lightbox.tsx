"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { Dialog } from "radix-ui"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { GalleryItem } from "../../config/home.constants"

type Props = {
  items: GalleryItem[]
  index: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

const CATEGORY_LABELS: Record<GalleryItem["category"], string> = {
  hybryda: "Hybryda",
  zel: "Żel",
  "nail-art": "Nail Art",
  przedluzanie: "Przedłużanie",
  manicure: "Manicure",
}

export function GalleryLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const item = index !== null ? items[index] : null
  const isOpen = index !== null

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    },
    [isOpen, onPrev, onNext]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />

        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 md:p-8"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">
            {item ? `${item.service} — ${item.alt}` : "Galeria"}
          </Dialog.Title>

          {item && (
            <div className="relative flex h-full max-h-[85vh] w-full max-w-4xl flex-col items-center justify-center">
              {/* Counter */}
              <div
                aria-live="polite"
                aria-atomic="true"
                className="absolute top-0 left-0 mb-4 text-[10px] font-light tracking-[0.25em] text-white/30 uppercase"
              >
                {(index ?? 0) + 1} / {items.length}
              </div>

              {/* Close */}
              <Dialog.Close
                className="absolute top-0 right-0 flex h-8 w-8 items-center justify-center border border-white/10 text-white/40 transition-colors outline-none hover:border-gold/30 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold/50"
                aria-label="Zamknij galerię"
              >
                <X size={14} />
              </Dialog.Close>

              {/* Image */}
              <div className="relative mt-10 w-full flex-1">
                {/* Corner frame */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10"
                >
                  <div className="absolute top-0 left-0 h-5 w-5 border-t border-l border-gold/30" />
                  <div className="absolute top-0 right-0 h-5 w-5 border-t border-r border-gold/30" />
                  <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-gold/30" />
                  <div className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-gold/30" />
                </div>

                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-contain"
                    priority
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center border border-white/5"
                    style={{
                      background: `radial-gradient(ellipse at 30% 40%, oklch(0.72 0.1 85 / 0.06), transparent 65%),
                        linear-gradient(135deg, oklch(0.15 0.005 285) 0%, oklch(0.10 0.003 285) 100%)`,
                    }}
                  >
                    <span className="font-display text-8xl text-white/[0.04] select-none">
                      ✦
                    </span>
                  </div>
                )}
              </div>

              {/* Caption + navigation */}
              <div className="mt-5 flex w-full items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-light tracking-[0.25em] text-gold uppercase">
                    {CATEGORY_LABELS[item.category]}
                  </p>
                  <p className="mt-1 text-sm font-light text-white/70">
                    {item.service}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onPrev}
                    aria-label="Poprzednie zdjęcie"
                    className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-colors outline-none hover:border-gold/30 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold/50"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={onNext}
                    aria-label="Następne zdjęcie"
                    className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-colors outline-none hover:border-gold/30 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold/50"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
