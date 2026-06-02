"use client"

import { useState, useTransition } from "react"
import { cn } from "@workspace/ui/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { updateWorkingHours } from "../actions"
import type { DayKey, DayConfig, WorkingHours, SettingsRow } from "../types"

const DAY_LABELS: { key: DayKey; label: string }[] = [
  { key: "pon", label: "Poniedziałek" },
  { key: "wt", label: "Wtorek" },
  { key: "sr", label: "Środa" },
  { key: "czw", label: "Czwartek" },
  { key: "pt", label: "Piątek" },
  { key: "sob", label: "Sobota" },
]

const BREAK_OPTIONS = [
  { value: 0, label: "Brak przerwy" },
  { value: 15, label: "15 minut" },
  { value: 30, label: "30 minut" },
  { value: 45, label: "45 minut" },
  { value: 60, label: "60 minut" },
]

type Props = {
  settings: SettingsRow
}

export function WorkingHoursSection({ settings }: Props) {
  const [hours, setHours] = useState<WorkingHours>(settings.working_hours)
  const [breakMin, setBreakMin] = useState(settings.break_min)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [isPending, startTransition] = useTransition()

  function toggleDay(key: DayKey) {
    setHours((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled },
    }))
  }

  function updateHour(key: DayKey, field: "start" | "end", value: string) {
    setHours((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }))
  }

  function handleSave() {
    setError(null)
    startTransition(async () => {
      const result = await updateWorkingHours(hours, breakMin)
      if (result.error) {
        setError(result.error)
      } else {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    })
  }

  return (
    <section>
      <h2 className="mb-1 text-sm font-light tracking-[0.2em] text-white/60 uppercase">
        Godziny pracy
      </h2>
      <p className="mb-5 text-xs font-light text-white/25">
        Ustaw dostępność salonu w poszczególne dni tygodnia.
      </p>

      <div className="flex flex-col divide-y divide-white/5 border border-white/8">
        {DAY_LABELS.map(({ key, label }) => (
          <DayRow
            key={key}
            dayKey={key}
            label={label}
            config={hours[key]}
            onToggle={() => toggleDay(key)}
            onTimeChange={(field, value) => updateHour(key, field, value)}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <label className="text-xs font-light text-white/50">
          Przerwa między wizytami:
        </label>
        <Select
          value={String(breakMin)}
          onValueChange={(v) => setBreakMin(Number(v))}
        >
          <SelectTrigger className="h-auto w-36 border-white/10 bg-[#09090b] px-3 py-1.5 text-xs font-light text-white/60 transition-colors focus:border-white/20 focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-[#09090b] text-xs font-light text-white/60">
            {BREAK_OPTIONS.map((o) => (
              <SelectItem
                key={o.value}
                value={String(o.value)}
                className="text-xs font-light"
              >
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <p className="mt-3 text-xs font-light text-red-400/80">{error}</p>
      )}

      <button
        onClick={handleSave}
        disabled={isPending}
        className="mt-5 border border-white/10 px-5 py-2.5 text-xs font-light tracking-[0.15em] text-white/50 uppercase transition-colors outline-none hover:border-gold/25 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold/40 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isPending ? "Zapisywanie…" : saved ? "Zapisano ✓" : "Zapisz godziny"}
      </button>
    </section>
  )
}

type DayRowProps = {
  dayKey: DayKey
  label: string
  config: DayConfig
  onToggle: () => void
  onTimeChange: (field: "start" | "end", value: string) => void
}

function DayRow({ label, config, onToggle, onTimeChange }: DayRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 px-5 py-4 transition-opacity sm:flex-row sm:items-center sm:gap-6",
        !config.enabled && "opacity-40"
      )}
    >
      <div className="flex items-center gap-3 sm:w-36">
        <button
          role="switch"
          aria-checked={config.enabled}
          aria-label={`${label} – włącz dzień`}
          onClick={onToggle}
          className={cn(
            "relative h-5 w-9 rounded-full border transition-colors outline-none focus-visible:ring-1 focus-visible:ring-gold/50",
            config.enabled
              ? "border-gold/40 bg-gold/20"
              : "border-white/15 bg-white/5"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0 h-[14px] w-[14px] rounded-full transition-transform",
              config.enabled
                ? "translate-x-[18px] bg-gold/80"
                : "translate-x-[3px] bg-white/25"
            )}
          />
        </button>
        <span className="text-xs font-light text-white/60">{label}</span>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="time"
          value={config.start}
          disabled={!config.enabled}
          aria-label={`${label} - godzina otwarcia`}
          onChange={(e) => onTimeChange("start", e.target.value)}
          className="border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-light text-white/60 [color-scheme:dark] transition-colors outline-none focus:border-white/20 disabled:cursor-not-allowed"
        />
        <span className="text-xs font-light text-white/50" aria-hidden="true">
          —
        </span>
        <input
          type="time"
          value={config.end}
          disabled={!config.enabled}
          aria-label={`${label} – godzina zamknięcia`}
          onChange={(e) => onTimeChange("end", e.target.value)}
          className="border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-light text-white/60 [color-scheme:dark] transition-colors outline-none focus:border-white/20 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  )
}
