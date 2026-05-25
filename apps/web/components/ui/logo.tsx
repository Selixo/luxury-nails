import Image from "next/image"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        width={263}
        height={36}
        src="/logo.svg"
        alt="Martyna Rydlicka Nails"
        className="h-7 w-auto sm:h-9"
      />
    </Link>
  )
}
