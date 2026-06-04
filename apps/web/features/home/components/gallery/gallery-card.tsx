import Image from "next/image"
import type { GalleryItem } from "../../config/home.constants"
import { CornerFrame } from "@/components/ui/corner-frames"

type Props = {
  item: GalleryItem
  index: number
  priority: boolean
  onClick: () => void
}

const CATEGORY_LABELS: Record<GalleryItem["category"], string> = {
  hybryda: "Hybryda",
  zel: "Żel",
  "nail-art": "Nail Art",
  przedluzanie: "Przedłużanie",
  manicure: "Manicure",
}

export function GalleryCard({ item, priority, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={`Otwórz zdjęcie: ${item.service}`}
      className={[
        "group relative w-full overflow-hidden border border-white/5 bg-white/[0.02] outline-none",
        "focus-visible:ring-1 focus-visible:ring-gold/60 focus-visible:ring-offset-1 focus-visible:ring-offset-black",
        item.size === "tall" ? "row-span-2" : "row-span-1",
      ].join(" ")}
    >
      <CornerFrame />

      {item.src ? (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `radial-gradient(ellipse at 30% 40%, oklch(0.72 0.1 85 / 0.06), transparent 65%),
              linear-gradient(135deg, oklch(0.15 0.005 285) 0%, oklch(0.10 0.003 285) 100%)`,
          }}
        >
          <span className="font-display text-5xl font-light text-white/[0.05] select-none">
            ✦
          </span>
        </div>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-start justify-end bg-black/0 p-5 transition-[background-color] duration-300 group-hover:bg-black/60"
      >
        <div className="translate-y-3 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="mb-1 text-xxs font-light tracking-[0.25em] text-gold uppercase">
            {CATEGORY_LABELS[item.category]}
          </p>
          <p className="text-sm font-light text-white/90">{item.service}</p>
        </div>
      </div>

      <span className="sr-only">
        {item.alt} — {CATEGORY_LABELS[item.category]}
      </span>
    </button>
  )
}
