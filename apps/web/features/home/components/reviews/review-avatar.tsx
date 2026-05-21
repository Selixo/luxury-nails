import Image from "next/image"

type Props = {
  author: string
  avatar?: string
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0] ?? "")
    .join("")
    .toUpperCase()
}

export function ReviewAvatar({ author, avatar }: Props) {
  return (
    <div className="relative h-11 w-11 shrink-0 rounded-full border border-gold/40 bg-gold/10">
      {avatar ? (
        <Image
          src={avatar}
          alt={author}
          fill
          className="rounded-full object-cover"
          sizes="44px"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-display text-sm font-light text-gold"
        >
          {getInitials(author)}
        </span>
      )}
    </div>
  )
}
