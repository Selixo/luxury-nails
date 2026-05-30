"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"

type Props = {
  url: string
}

export function InspirationPreview({ url }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="mt-1.5 block h-14 w-14 shrink-0 overflow-hidden border border-white/10 transition-colors hover:border-white/25"
          aria-label="Podgląd inspiracji"
        >
          <Image
            src={url}
            alt="Inspiracja"
            width={56}
            height={56}
            className="h-full w-full object-cover"
            unoptimized
          />
        </button>
      </DialogTrigger>

      <DialogContent className="rounded-none border border-white/10 bg-[#0d0d0d] p-4 ring-0 sm:max-w-lg">
        <DialogTitle className="sr-only">Podgląd inspiracji</DialogTitle>
        <p className="text-[10px] font-light tracking-[0.2em] text-white/30 uppercase">
          Inspiracja
        </p>
        <Image
          src={url}
          alt="Inspiracja"
          width={640}
          height={480}
          className="max-h-[70vh] w-full object-contain"
          unoptimized
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[10px] font-light tracking-[0.1em] text-white/30 transition-colors hover:text-white/60"
        >
          <ExternalLink size={10} aria-hidden="true" />
          Otwórz oryginał
        </a>
      </DialogContent>
    </Dialog>
  )
}
