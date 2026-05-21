"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { Dialog } from "radix-ui"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { useLightboxKeyboard } from "@/hooks/useLightboxKeyboard"

const NAV_BUTTON_CLASS =
  "flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-colors outline-none hover:border-gold/30 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold/50"

function CornerFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10"
    >
      <div className="absolute top-0 left-0 h-5 w-5 border-t border-l border-gold/30" />
      <div className="absolute top-0 right-0 h-5 w-5 border-t border-r border-gold/30" />
      <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-gold/30" />
      <div className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-gold/30" />
    </div>
  )
}

function ImagePlaceholder() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center border border-white/5"
      style={{
        background: `radial-gradient(ellipse at 30% 40%, oklch(0.72 0.1 85 / 0.06), transparent 65%),
          linear-gradient(135deg, oklch(0.15 0.005 285) 0%, oklch(0.10 0.003 285) 100%)`,
      }}
    >
      <span className="font-display text-8xl font-light text-white/[0.04] select-none">
        ✦
      </span>
    </div>
  )
}

type Props = {
  open: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  title: string
  counter: { current: number; total: number }
  imageSrc?: string
  imageAlt?: string
  imageSizes: string
  maxWidth?: "max-w-3xl" | "max-w-4xl"
  closeLabel?: string
  prevLabel?: string
  nextLabel?: string
  caption: ReactNode
}

export function Lightbox({
  open,
  onClose,
  onPrev,
  onNext,
  title,
  counter,
  imageSrc,
  imageAlt = "",
  imageSizes,
  maxWidth = "max-w-4xl",
  closeLabel = "Zamknij",
  prevLabel = "Poprzedni",
  nextLabel = "Następny",
  caption,
}: Props) {
  useLightboxKeyboard({ isOpen: open, onPrev, onNext })

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />

        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 md:p-8"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>

          <div
            className={cn(
              "relative flex h-full max-h-[85vh] w-full flex-col items-center justify-center",
              maxWidth
            )}
          >
            <div
              aria-live="polite"
              aria-atomic="true"
              className="absolute top-0 left-0 text-[10px] font-light tracking-[0.25em] text-white/30 uppercase"
            >
              {counter.current} / {counter.total}
            </div>

            <Dialog.Close
              className="absolute top-0 right-0 flex h-8 w-8 items-center justify-center border border-white/10 text-white/40 transition-colors outline-none hover:border-gold/30 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold/50"
              aria-label={closeLabel}
            >
              <X size={14} />
            </Dialog.Close>

            <div className="relative mt-10 w-full flex-1">
              <CornerFrame />
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes={imageSizes}
                  className="object-contain"
                  priority
                />
              ) : (
                <ImagePlaceholder />
              )}
            </div>

            <div className="mt-5 flex w-full items-center justify-between gap-4">
              <div>{caption}</div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={onPrev}
                  aria-label={prevLabel}
                  className={NAV_BUTTON_CLASS}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={onNext}
                  aria-label={nextLabel}
                  className={NAV_BUTTON_CLASS}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
