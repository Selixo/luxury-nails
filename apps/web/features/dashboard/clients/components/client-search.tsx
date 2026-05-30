"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useRef, useTransition } from "react"
import { Search } from "lucide-react"

export function ClientSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const defaultValue = searchParams.get("q") ?? ""

  function handleChange(value: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value.trim()) {
        params.set("q", value.trim())
      } else {
        params.delete("q")
      }
      params.set("page", "1")
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    }, 350)
  }

  return (
    <div className="relative mb-6">
      <Search
        size={13}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-white/25"
        aria-hidden="true"
      />
      <input
        type="search"
        defaultValue={defaultValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Szukaj po imieniu, nazwisku lub telefonie..."
        className="w-full border border-white/8 bg-transparent py-2.5 pr-3 pl-8 text-sm font-light text-white/60 transition-colors outline-none placeholder:text-white/20 focus:border-white/20 sm:max-w-sm"
      />
    </div>
  )
}
