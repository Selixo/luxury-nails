import Link from "next/link"

export function SkipToContent() {
  return (
    <Link
      href="#main-content"
      className="fixed -top-24 left-4 z-[200] bg-black/90 px-4 py-2 text-xs tracking-widest text-gold uppercase outline-2 outline-gold transition-[top] duration-150 focus:top-4"
    >
      Przejdź do treści
    </Link>
  )
}
