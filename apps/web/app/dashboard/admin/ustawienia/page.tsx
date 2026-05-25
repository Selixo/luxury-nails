"use client"

import { useState } from "react"
import { cn } from "@workspace/ui/lib/utils"

type DayKey = "pon" | "wt" | "sr" | "czw" | "pt" | "sob"

type DayConfig = {
  enabled: boolean
  start: string
  end: string
}

type ServicePrice = {
  id: string
  name: string
  price: string
  duration: string
}

const DAY_LABELS: { key: DayKey; label: string }[] = [
  { key: "pon", label: "Poniedziałek" },
  { key: "wt", label: "Wtorek" },
  { key: "sr", label: "Środa" },
  { key: "czw", label: "Czwartek" },
  { key: "pt", label: "Piątek" },
  { key: "sob", label: "Sobota" },
]

const INITIAL_HOURS: Record<DayKey, DayConfig> = {
  pon: { enabled: true, start: "09:00", end: "17:00" },
  wt: { enabled: true, start: "09:00", end: "17:00" },
  sr: { enabled: true, start: "09:00", end: "17:00" },
  czw: { enabled: true, start: "09:00", end: "17:00" },
  pt: { enabled: true, start: "09:00", end: "18:00" },
  sob: { enabled: true, start: "10:00", end: "15:00" },
}

const INITIAL_SERVICES: ServicePrice[] = [
  { id: "s1", name: "Manicure klasyczny", price: "60", duration: "45" },
  { id: "s2", name: "Manicure hybrydowy", price: "110", duration: "60" },
  { id: "s3", name: "Hybryda z zdobieniem", price: "120", duration: "75" },
  { id: "s4", name: "Żel na naturalną płytkę", price: "140", duration: "90" },
  { id: "s5", name: "Przedłużanie żelem", price: "180", duration: "120" },
  { id: "s6", name: "Hybryda chrome", price: "130", duration: "75" },
  { id: "s7", name: "Nail Art 3D", price: "160", duration: "120" },
  { id: "s8", name: "Usunięcie hybrydy", price: "40", duration: "30" },
]

const BREAK_OPTIONS = [
  { value: "0", label: "Brak przerwy" },
  { value: "15", label: "15 minut" },
  { value: "30", label: "30 minut" },
  { value: "45", label: "45 minut" },
  { value: "60", label: "60 minut" },
]

export default function UstawieniaPage() {
  const [hours, setHours] = useState<Record<DayKey, DayConfig>>(INITIAL_HOURS)
  const [breakMin, setBreakMin] = useState("15")
  const [services, setServices] = useState<ServicePrice[]>(INITIAL_SERVICES)
  const [editingService, setEditingService] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

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

  function updateService(
    id: string,
    field: "price" | "duration",
    value: string
  ) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    )
  }

  function handleSave(section: string) {
    setSaved(section)
    setTimeout(() => setSaved(null), 2000)
  }

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl space-y-12">
        <div>
          <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
            Konfiguracja
          </p>
          <h1 className="font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
            Ustawienia
          </h1>
        </div>

        {/* Working hours */}
        <section>
          <h2 className="mb-1 text-sm font-light tracking-[0.2em] text-white/60 uppercase">
            Godziny pracy
          </h2>
          <p className="mb-5 text-xs font-light text-white/25">
            Ustaw dostępność salonu w poszczególne dni tygodnia.
          </p>

          <div className="flex flex-col divide-y divide-white/5 border border-white/8">
            {DAY_LABELS.map(({ key, label }) => {
              const cfg = hours[key]
              return (
                <div
                  key={key}
                  className={cn(
                    "flex flex-col gap-3 px-5 py-4 transition-opacity sm:flex-row sm:items-center sm:gap-6",
                    !cfg.enabled && "opacity-40"
                  )}
                >
                  <div className="flex items-center gap-3 sm:w-36">
                    <button
                      role="switch"
                      aria-checked={cfg.enabled}
                      onClick={() => toggleDay(key)}
                      className={cn(
                        "relative h-4 w-7 rounded-full border transition-colors outline-none focus-visible:ring-1 focus-visible:ring-gold/50",
                        cfg.enabled
                          ? "border-gold/40 bg-gold/20"
                          : "border-white/15 bg-white/5"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-3 w-3 rounded-full transition-transform",
                          cfg.enabled
                            ? "translate-x-3.5 bg-gold/80"
                            : "translate-x-0.5 bg-white/25"
                        )}
                      />
                    </button>
                    <span className="text-xs font-light text-white/60">
                      {label}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="time"
                      value={cfg.start}
                      disabled={!cfg.enabled}
                      onChange={(e) => updateHour(key, "start", e.target.value)}
                      className="border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-light text-white/60 [color-scheme:dark] transition-colors outline-none focus:border-white/20 disabled:cursor-not-allowed"
                    />
                    <span className="text-xs font-light text-white/20">—</span>
                    <input
                      type="time"
                      value={cfg.end}
                      disabled={!cfg.enabled}
                      onChange={(e) => updateHour(key, "end", e.target.value)}
                      className="border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-light text-white/60 [color-scheme:dark] transition-colors outline-none focus:border-white/20 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex items-center gap-5">
            <div className="flex items-center gap-3">
              <label className="text-xs font-light text-white/35">
                Przerwa między wizytami:
              </label>
              <select
                value={breakMin}
                onChange={(e) => setBreakMin(e.target.value)}
                className="border border-white/10 bg-[#09090b] px-3 py-1.5 text-xs font-light text-white/60 transition-colors outline-none focus:border-white/20"
              >
                {BREAK_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => handleSave("hours")}
            className="mt-5 border border-white/10 px-5 py-2.5 text-xs font-light tracking-[0.15em] text-white/50 uppercase transition-colors outline-none hover:border-gold/25 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold/40"
          >
            {saved === "hours" ? "Zapisano" : "Zapisz godziny"}
          </button>
        </section>

        {/* Service prices */}
        <section>
          <h2 className="mb-1 text-sm font-light tracking-[0.2em] text-white/60 uppercase">
            Cennik usług
          </h2>
          <p className="mb-5 text-xs font-light text-white/25">
            Ceny i czas trwania wyświetlane klientkom przy rezerwacji.
          </p>

          <div className="flex flex-col divide-y divide-white/5 border border-white/8">
            {services.map((svc) => {
              const isEditing = editingService === svc.id
              return (
                <div
                  key={svc.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <p className="flex-1 text-sm font-light text-white/70">
                    {svc.name}
                  </p>

                  {isEditing ? (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={svc.price}
                          onChange={(e) =>
                            updateService(svc.id, "price", e.target.value)
                          }
                          className="w-16 border border-white/15 bg-white/[0.03] px-2 py-1 text-right text-xs font-light text-white/70 transition-colors outline-none focus:border-gold/25"
                          min={0}
                        />
                        <span className="text-xs font-light text-white/30">
                          zł
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={svc.duration}
                          onChange={(e) =>
                            updateService(svc.id, "duration", e.target.value)
                          }
                          className="w-14 border border-white/15 bg-white/[0.03] px-2 py-1 text-right text-xs font-light text-white/70 transition-colors outline-none focus:border-gold/25"
                          min={0}
                        />
                        <span className="text-xs font-light text-white/30">
                          min
                        </span>
                      </div>
                      <button
                        onClick={() => setEditingService(null)}
                        className="text-xs font-light text-gold/60 transition-colors outline-none hover:text-gold"
                      >
                        Gotowe
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-light text-white/40">
                        {svc.duration} min
                      </span>
                      <span className="text-sm font-light text-gold/70">
                        {svc.price} zł
                      </span>
                      <button
                        onClick={() => setEditingService(svc.id)}
                        className="text-xs font-light text-white/20 transition-colors outline-none hover:text-white/50"
                      >
                        Edytuj
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <button
            onClick={() => handleSave("services")}
            className="mt-5 border border-white/10 px-5 py-2.5 text-xs font-light tracking-[0.15em] text-white/50 uppercase transition-colors outline-none hover:border-gold/25 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold/40"
          >
            {saved === "services" ? "Zapisano" : "Zapisz cennik"}
          </button>
        </section>

        {/* Google Calendar */}
        <section>
          <h2 className="mb-1 text-sm font-light tracking-[0.2em] text-white/60 uppercase">
            Google Calendar
          </h2>
          <p className="mb-5 text-xs font-light text-white/25">
            Po połączeniu każda potwierdzona wizyta automatycznie trafia do
            Twojego kalendarza Google z przypomnieniem na telefonie.
          </p>

          <div className="border border-white/8 bg-white/[0.02] p-6">
            <div className="mb-5 flex items-start gap-4">
              <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-white/15" />
              <div>
                <p className="text-xs font-light text-white/50">
                  Status: <span className="text-white/25">Niepołączono</span>
                </p>
                <p className="mt-1 text-xs font-light text-white/25">
                  Połącz konto Google, aby automatycznie synchronizować wizyty.
                </p>
              </div>
            </div>

            <div className="mb-6 space-y-2.5">
              {[
                "Automatyczne dodawanie wizyt do kalendarza",
                "Przypomnienia push na telefonie",
                "Widoczność godzin wolnych i zajętych",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2.5">
                  <div className="h-px w-3 bg-white/15" />
                  <p className="text-xs font-light text-white/30">{feature}</p>
                </div>
              ))}
            </div>

            <button className="border border-white/10 px-5 py-2.5 text-xs font-light tracking-[0.15em] text-white/40 uppercase transition-colors outline-none hover:border-gold/25 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold/40">
              Połącz z Google Calendar
            </button>
          </div>

          <p className="mt-3 text-[10px] font-light text-white/15">
            Integracja wymaga konta Google. Dane wizyt nie są udostępniane
            osobom trzecim.
          </p>
        </section>
      </div>
    </div>
  )
}
