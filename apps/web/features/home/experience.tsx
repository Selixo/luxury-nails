"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, Calendar, Sparkles, Star } from "lucide-react"

const ITEMS = [
  {
    number: "01",
    tag: "Bez czekania",
    icon: Calendar,
    badge: { value: "24/7", label: "Dostępność" },
    title: "Rezerwacja Online",
    description:
      "Wybierz idealny termin w kilka sekund. Bez telefonów, bez kolejek — wszystko pod kontrolą w Twojej dłoni.",
    features: ["Wybór terminu", "Potwierdzenie SMS", "Bez kolejek"],
    image: "/nails-2.jpg",
    imageAlt: "Rezerwacja online",
  },
  {
    number: "02",
    tag: "Twój styl",
    icon: Sparkles,
    badge: { value: "100%", label: "Personalizacja" },
    title: "Indywidualne podejście",
    description:
      "Każda klientka jest wyjątkowa. Słuchamy, doradzamy i tworzymy look dopasowany idealnie do Ciebie i Twojej osobowości.",
    features: ["Konsultacja stylu", "Dobór kolorów", "Twój look"],
    image: "/nails-2.jpg",
    imageAlt: "Indywidualne podejście",
  },
  {
    number: "03",
    tag: "Ekskluzywnie",
    icon: Star,
    badge: { value: "VIP", label: "Program" },
    title: "Nagrody za lojalność",
    description:
      "Zbieraj punkty za każdą wizytę. Odkrywaj nagrody i przywileje zarezerwowane wyłącznie dla naszych stałych klientek.",
    features: ["Punkty za wizytę", "Ekskluzywne nagrody", "Darmowe usługi"],
    image: "/nails-2.jpg",
    imageAlt: "Program VIP",
  },
]

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setVisible(true)
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

function ItemBadge({
  value,
  label,
  size = "md",
}: {
  value: string
  label: string
  size?: "sm" | "md"
}) {
  return (
    <>
      <p
        className={`font-display font-light text-gold ${size === "sm" ? "text-xl" : "text-2xl"}`}
      >
        {value}
      </p>
      <p
        className={`mt-0.5 tracking-widest text-white/40 uppercase ${size === "sm" ? "text-[8px]" : "text-[9px]"}`}
      >
        {label}
      </p>
    </>
  )
}

function ExperienceItem({
  item,
  isReversed,
}: {
  item: (typeof ITEMS)[number]
  isReversed: boolean
}) {
  const Icon = item.icon
  const { ref, visible } = useReveal()

  const desktopBadgeTranslate = isReversed ? "-33%" : "33%"
  const desktopBadgePosition = isReversed
    ? "left-0 -translate-x-1/3"
    : "right-0 translate-x-1/3"

  const revealFade = {
    opacity: visible ? 1 : 0,
    transition: "opacity 0.9s ease, transform 0.9s ease",
  }

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-20"
      style={{
        ...revealFade,
        transform: visible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {/* Image side */}
      <div className={isReversed ? "relative lg:order-last" : "relative"}>
        {/* Ambient glow — desktop only */}
        <div
          className="pointer-events-none absolute -inset-8 hidden rounded-full opacity-40 blur-3xl lg:block"
          style={{
            background: `radial-gradient(ellipse at ${isReversed ? "70%" : "30%"} 50%, oklch(0.72 0.1 85 / 0.1), transparent 70%)`,
          }}
        />

        {/* Image container */}
        <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[4/5]">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/25" />

          {/* Gold corner frame */}
          <div className="pointer-events-none absolute inset-4">
            <div className="absolute top-0 left-0 h-5 w-5 border-t border-l border-gold/40 sm:h-6 sm:w-6" />
            <div className="absolute top-0 right-0 h-5 w-5 border-t border-r border-gold/40 sm:h-6 sm:w-6" />
            <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-gold/40 sm:h-6 sm:w-6" />
            <div className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-gold/40 sm:h-6 sm:w-6" />
          </div>

          {/* Gradient bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Badge — mobile only (inside image) */}
          <div
            className="absolute right-5 bottom-5 z-10 border border-gold/30 bg-zinc-900/95 px-4 py-3 text-center backdrop-blur-sm lg:hidden"
            style={{ ...revealFade, transitionDelay: "0.3s" }}
          >
            <ItemBadge {...item.badge} size="sm" />
          </div>
        </div>

        {/* Badge — desktop only (outside image) */}
        <div
          className={`absolute top-10 z-10 hidden border border-gold/25 bg-zinc-900/95 px-5 py-4 text-center backdrop-blur-sm lg:block ${desktopBadgePosition}`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? `translateX(${desktopBadgeTranslate})`
              : `translateX(${desktopBadgeTranslate}) translateY(12px)`,
            transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
          }}
        >
          <ItemBadge {...item.badge} />
        </div>
      </div>

      {/* Text side */}
      <div
        className={
          isReversed
            ? "relative overflow-hidden lg:order-first"
            : "relative overflow-hidden"
        }
        style={{
          ...revealFade,
          transform: visible
            ? "translateX(0)"
            : `translateX(${isReversed ? "24px" : "-24px"})`,
          transitionDelay: "0.2s",
        }}
      >
        {/* Ghost number behind text */}
        <span
          className="pointer-events-none absolute top-0 right-0 font-display leading-none font-light text-white/[0.06] select-none"
          style={{
            fontSize: "clamp(120px, 22vw, 220px)",
            transform: "translate(10%, -15%)",
          }}
        >
          {item.number}
        </span>

        {/* Content */}
        <div className="relative z-10">
          {/* Tag */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center bg-gold/10">
              <Icon size={13} className="text-gold" strokeWidth={1.5} />
            </div>
            <span className="text-[10px] tracking-[0.3em] text-gold/70 uppercase">
              {item.tag}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-4 font-display text-3xl font-light tracking-wide text-white sm:text-4xl lg:text-5xl">
            {item.title}
          </h3>

          {/* Animated divider */}
          <div
            className="mb-6 h-px bg-gold/30"
            style={{
              width: visible ? "2.5rem" : "0",
              transition: "width 0.8s ease 0.5s",
            }}
          />

          {/* Description */}
          <p className="text-sm leading-loose font-light text-white/45 lg:max-w-sm">
            {item.description}
          </p>

          {/* Feature pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {item.features.map((f, fi) => (
              <span
                key={f}
                className="border border-white/8 px-3 py-1.5 text-[10px] tracking-wider text-white/30 uppercase"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.6 + fi * 0.1}s`,
                }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* CTA + counter row */}
          <div className="mt-8 flex items-center justify-between">
            <a
              href="#rezerwacja"
              className="group flex items-center gap-3 text-[11px] tracking-[0.25em] text-gold/50 uppercase transition-colors duration-300 hover:text-gold"
            >
              <span>Zarezerwuj wizytę</span>
              <ArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <p className="text-[10px] tracking-[0.35em] text-white/10 uppercase">
              {item.number} / 03
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Experience() {
  const { ref: headerRef, visible: headerVisible } = useReveal(0.2)

  return (
    <section
      id="doswiadczenie"
      className="relative bg-[#09090b] px-6 py-16 md:px-12 md:py-28 lg:px-20 lg:py-32"
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="mx-auto mb-14 max-w-6xl md:mb-24"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <p className="mb-3 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Dlaczego my
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
          <h2 className="max-w-xl font-display text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Doświadczenie na najwyższym poziomie
          </h2>
          <p className="text-sm leading-relaxed font-light text-white/30 md:max-w-xs">
            Trzy powody, dla których klientki wracają do nas raz za razem.
          </p>
        </div>
        <div className="mt-6 h-px w-full bg-white/5" />
      </div>

      {/* Z-pattern items */}
      <div className="mx-auto flex max-w-6xl flex-col gap-16 md:gap-28 lg:gap-36">
        {ITEMS.map((item, i) => (
          <ExperienceItem
            key={item.title}
            item={item}
            isReversed={i % 2 !== 0}
          />
        ))}
      </div>
    </section>
  )
}
