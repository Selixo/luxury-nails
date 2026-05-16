import Image from "next/image"

export const HeroBackground = () => {
  return (
    <div aria-hidden="true">
      <Image
        src="/nails-2.jpg"
        alt=""
        role="presentation"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/91" />
    </div>
  )
}
