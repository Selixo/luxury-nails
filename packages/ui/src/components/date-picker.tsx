"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { pl } from "react-day-picker/locale"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { cn } from "@workspace/ui/lib/utils"

type Props = {
  value: string
  onChange: (value: string) => void
  min?: string
  placeholder?: string
  error?: boolean
  className?: string
}

function formatDisplay(iso: string): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso + "T00:00:00"))
}

export function DatePicker({
  value,
  onChange,
  min,
  placeholder = "Wybierz datę",
  error,
  className,
}: Props) {
  const [open, setOpen] = useState(false)

  const selected = value ? new Date(value + "T00:00:00") : undefined
  const minDate = min ? new Date(min + "T00:00:00") : undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-invalid={error}
          className={cn(
            "flex w-full items-center justify-between border-b bg-transparent pb-3 text-left text-sm font-light transition-colors outline-none",
            open ? "border-gold/40" : "border-white/15 hover:border-white/30",
            error && "border-red-400/50",
            className
          )}
        >
          <span className={value ? "text-white" : "text-white/50"}>
            {value ? formatDisplay(value) : placeholder}
          </span>
          <CalendarIcon
            size={14}
            className="shrink-0 text-white/25"
            aria-hidden
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={8}>
        <Calendar
          mode="single"
          locale={pl}
          selected={selected}
          onSelect={(date) => {
            if (date) {
              const y = date.getFullYear()
              const m = String(date.getMonth() + 1).padStart(2, "0")
              const d = String(date.getDate()).padStart(2, "0")
              onChange(`${y}-${m}-${d}`)
            } else {
              onChange("")
            }
            setOpen(false)
          }}
          disabled={minDate ? { before: minDate } : undefined}
          defaultMonth={selected ?? minDate}
        />
      </PopoverContent>
    </Popover>
  )
}
