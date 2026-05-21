import Image from "next/image"
import { ABOUT } from "../../config/home.constants"

type Props = {
  inView: boolean
}

function CornerFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-4">
      <div className="absolute top-0 left-0 h-5 w-5 border-t border-l border-gold/40 sm:h-6 sm:w-6" />
      <div className="absolute top-0 right-0 h-5 w-5 border-t border-r border-gold/40 sm:h-6 sm:w-6" />
      <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-gold/40 sm:h-6 sm:w-6" />
      <div className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-gold/40 sm:h-6 sm:w-6" />
    </div>
  )
}

export function AboutImage({ inView }: Props) {
  return (
    <div
      className="relative transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:transition-none"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-30px)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 hidden opacity-30 blur-2xl lg:block"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, oklch(0.72 0.1 85 / 0.1), transparent 70%)",
        }}
      />

      <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-[3/4]">
        <Image
          src={ABOUT.image}
          alt={ABOUT.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 42vw, 500px"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        <CornerFrame />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent"
        />
      </div>
    </div>
  )
}
