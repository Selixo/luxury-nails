"use client"

import { useRef, useTransition, useState } from "react"
import { Upload, X } from "lucide-react"
import { deleteInspirationImage, uploadInspirationImage } from "../actions"
import Image from "next/image"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"]
const MAX_SIZE = 2 * 1024 * 1024 // 2MB

type Props = {
  value: string
  onChange: (url: string) => void
  error?: string
}

export function InspirationUpload({ value, onChange, error }: Props) {
  const [isPending, startTransition] = useTransition()
  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function validate(file: File): string | null {
    if (!ALLOWED_TYPES.includes(file.type))
      return "Dozwolony format: JPG, PNG, WebP, HEIC."
    if (file.size > MAX_SIZE) return "Plik może mieć maksymalnie 2MB."
    return null
  }

  function handleFile(file: File, previousUrl?: string) {
    setUploadError(null)

    const validationError = validate(file)
    if (validationError) {
      setUploadError(validationError)
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    startTransition(async () => {
      if (previousUrl) await deleteInspirationImage(previousUrl)
      const { url, error } = await uploadInspirationImage(formData)
      if (url) onChange(url)
      if (error) setUploadError(error)
    })
  }

  function handleClear() {
    if (value) startTransition(() => deleteInspirationImage(value))
    onChange("")
    if (inputRef.current) inputRef.current.value = ""
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/"))
      handleFile(file, value || undefined)
  }

  return (
    <div>
      <p className="mb-3 text-xs font-light tracking-[0.2em] text-white/80 uppercase">
        Inspiracja{" "}
        <span className="font-light tracking-normal text-white/50 normal-case">
          (opcjonalnie)
        </span>
      </p>

      {value ? (
        <div className="relative inline-block">
          <Image
            src={value}
            alt="Podgląd inspiracji"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-52 w-auto border border-white/10 object-cover"
          />
          <button
            type="button"
            onClick={handleClear}
            aria-label="Usuń zdjęcie"
            className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center bg-black/60 text-white/50 transition-colors hover:text-white"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          disabled={isPending}
          className={[
            "flex w-full items-center gap-3 border border-dashed px-4 py-5 text-left transition-colors disabled:opacity-50",
            isDragging
              ? "border-gold/40 bg-gold/5"
              : "border-white/15 hover:border-white/30",
          ].join(" ")}
        >
          <Upload
            size={16}
            className={[
              "shrink-0 transition-colors",
              isDragging ? "text-gold/60" : "text-white/25",
            ].join(" ")}
            aria-hidden="true"
          />
          <span
            className={[
              "text-sm font-light transition-colors",
              isDragging ? "text-white/60" : "text-white/50",
            ].join(" ")}
          >
            {isPending
              ? "Wgrywanie..."
              : isDragging
                ? "Upuść zdjęcie"
                : "Dodaj zdjęcie inspiracji"}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file, value || undefined)
        }}
      />

      {(error ?? uploadError) && (
        <p role="alert" className="mt-2 text-xs font-light text-red-400/80">
          {error ?? uploadError}
        </p>
      )}
    </div>
  )
}
