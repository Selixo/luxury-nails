"use client"

import { useState } from "react"
import { Check, CheckCircle } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

type Service = {
  id: string
  name: string
  price: string
  duration: string
  category: string
}

const SERVICES: Service[] = [
  {
    id: "manicure-hybryda",
    name: "Manicure z hybrydą",
    price: "od 110 zł",
    duration: "75 min",
    category: "Manicure",
  },
  {
    id: "manicure-klasyczny",
    name: "Manicure klasyczny",
    price: "od 60 zł",
    duration: "45 min",
    category: "Manicure",
  },
  {
    id: "manicure-lakier",
    name: "Manicure z lakierem",
    price: "od 70 zł",
    duration: "55 min",
    category: "Manicure",
  },
  {
    id: "sciaganie-hybrydy",
    name: "Ściąganie hybrydy",
    price: "od 40 zł",
    duration: "30 min",
    category: "Manicure",
  },
  {
    id: "zel-naturalny",
    name: "Żel na naturalną płytkę",
    price: "od 140 zł",
    duration: "90 min",
    category: "Żel & Hybryda",
  },
  {
    id: "hybryda-zdobienie",
    name: "Hybryda z zdobieniem",
    price: "od 120 zł",
    duration: "90 min",
    category: "Żel & Hybryda",
  },
  {
    id: "hybryda-klasyczna",
    name: "Hybryda klasyczna",
    price: "od 100 zł",
    duration: "75 min",
    category: "Żel & Hybryda",
  },
  {
    id: "przedluzanie-zel",
    name: "Przedłużanie żelem",
    price: "od 180 zł",
    duration: "120 min",
    category: "Przedłużanie",
  },
  {
    id: "przedluzanie-tipsy",
    name: "Przedłużanie tipsami",
    price: "od 160 zł",
    duration: "90 min",
    category: "Przedłużanie",
  },
  {
    id: "rekonstrukcja",
    name: "Rekonstrukcja / korekta",
    price: "od 130 zł",
    duration: "90 min",
    category: "Przedłużanie",
  },
  {
    id: "nail-art",
    name: "Nail Art & Zdobienia",
    price: "od 20 zł",
    duration: "30 min",
    category: "Zdobienia",
  },
]

const CATEGORIES = [...new Set(SERVICES.map((s) => s.category))]

// Exact hostname whitelist — no endsWith() to prevent subdomain takeover
const ALLOWED_IMAGE_HOSTS = new Set([
  "pinterest.com",
  "www.pinterest.com",
  "i.pinimg.com",
  "instagram.com",
  "www.instagram.com",
  "cdninstagram.com",
])

function isAllowedImageUrl(url: string): boolean {
  if (!url.trim()) return false
  try {
    const { protocol, hostname } = new URL(url)
    return protocol === "https:" && ALLOWED_IMAGE_HOSTS.has(hostname)
  } catch {
    return false
  }
}

function formatDate(iso: string): string {
  if (!iso) return ""
  return new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso + "T00:00:00"))
}

type BookingState = "form" | "success"

export function BookingForm() {
  const name = "Anna" // W przyszłości: odczyt z sesji
  const [state, setState] = useState<BookingState>("form")
  const [serviceId, setServiceId] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")
  const [inspirationUrl, setInspirationUrl] = useState("")
  const [imgError, setImgError] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isUrlAllowed = isAllowedImageUrl(inspirationUrl)
  const hasValidImg = isUrlAllowed && !imgError

  const today = new Date().toISOString().split("T")[0]
  const selectedService = SERVICES.find((s) => s.id === serviceId)

  function validate() {
    const e: Record<string, string> = {}
    if (!serviceId) e.service = "Wybierz usługę."
    if (!date) e.date = "Wybierz preferowaną datę."
    if (!time) e.time = "Wybierz preferowaną godzinę."
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    // W przyszłości: POST /api/bookings
    setState("success")
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center border border-gold/25">
          <CheckCircle size={24} className="text-gold" aria-hidden="true" />
        </div>
        <p className="mb-1 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Wysłano
        </p>
        <h2 className="mb-3 font-display text-2xl font-light tracking-wide text-white sm:text-3xl">
          Prośba przyjęta
        </h2>
        <p className="mb-2 text-sm font-light text-white/50">
          {selectedService?.name}
        </p>
        <p className="mb-8 text-sm font-light text-white/35">
          {formatDate(date)} · {time}
        </p>
        <p className="mb-8 max-w-xs text-sm leading-relaxed font-light text-white/40">
          Skontaktuję się z Tobą telefonicznie w celu potwierdzenia terminu. Do
          zobaczenia wkrótce, {name}!
        </p>
        <button
          onClick={() => {
            setState("form")
            setServiceId("")
            setDate("")
            setTime("")
            setNotes("")
            setInspirationUrl("")
            setImgError(false)
          }}
          className="text-xs font-light text-white/25 transition-colors outline-none hover:text-white/50 focus-visible:text-gold"
        >
          Umów kolejną wizytę
        </button>
      </div>
    )
  }

  return (
    <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-10 xl:gap-14">
      {/* ── FORM ── */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
        {/* Service selector */}
        <div>
          <p
            id="service-label"
            className="mb-4 text-xs font-light tracking-[0.2em] text-white/40 uppercase"
          >
            Usługa
          </p>
          <div
            role="group"
            aria-labelledby="service-label"
            className="flex flex-col gap-0.5"
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            {CATEGORIES.map((cat) => (
              <div key={cat}>
                <p className="mt-4 mb-1 text-[10px] font-light tracking-[0.25em] text-white/20 uppercase first:mt-0">
                  {cat}
                </p>
                {SERVICES.filter((s) => s.category === cat).map((svc) => {
                  const isSelected = serviceId === svc.id
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => {
                        setServiceId(svc.id)
                        setErrors((p) => ({ ...p, service: "" }))
                      }}
                      aria-pressed={isSelected}
                      className={cn(
                        "flex w-full items-center justify-between gap-4 border-b px-1 py-3 text-left transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-gold/40",
                        isSelected
                          ? "border-gold/25 text-white"
                          : "border-white/6 text-white/50 hover:border-white/15 hover:text-white/75"
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                            isSelected
                              ? "border-gold/60 bg-gold/10"
                              : "border-white/15"
                          )}
                        >
                          {isSelected && (
                            <Check
                              size={9}
                              className="text-gold"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                        <span className="text-sm font-light">{svc.name}</span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span
                          className={cn(
                            "block text-xs font-light",
                            isSelected ? "text-gold" : "text-white/35"
                          )}
                        >
                          {svc.price}
                        </span>
                        <span className="block text-[10px] font-light text-white/25">
                          {svc.duration}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
          {errors.service && (
            <p
              id="service-error"
              role="alert"
              className="mt-2 text-xs font-light text-red-400/80"
            >
              {errors.service}
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="mb-3 block text-xs font-light tracking-[0.2em] text-white/40 uppercase"
          >
            Preferowana data
          </label>
          <input
            id="date"
            type="date"
            min={today}
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
              setErrors((p) => ({ ...p, date: "" }))
            }}
            aria-describedby={errors.date ? "date-error" : undefined}
            aria-invalid={!!errors.date}
            className="w-full border-b border-white/15 bg-transparent pb-3 text-sm font-light text-white [color-scheme:dark] transition-colors outline-none focus:border-gold/40"
          />
          {errors.date && (
            <p
              id="date-error"
              role="alert"
              className="mt-2 text-xs font-light text-red-400/80"
            >
              {errors.date}
            </p>
          )}
        </div>

        {/* Time slots */}
        <div>
          <p
            id="time-label"
            className="mb-3 text-xs font-light tracking-[0.2em] text-white/40 uppercase"
          >
            Preferowana godzina
          </p>
          <div
            role="group"
            aria-labelledby="time-label"
            className="grid grid-cols-4 gap-2 sm:grid-cols-6"
          >
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => {
                  setTime(slot)
                  setErrors((p) => ({ ...p, time: "" }))
                }}
                aria-pressed={time === slot}
                className={cn(
                  "border py-2 text-xs font-light tracking-wide transition-colors outline-none focus-visible:ring-1 focus-visible:ring-gold/50",
                  time === slot
                    ? "border-gold/50 bg-gold/10 text-gold"
                    : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/60"
                )}
              >
                {slot}
              </button>
            ))}
          </div>
          {errors.time && (
            <p role="alert" className="mt-2 text-xs font-light text-red-400/80">
              {errors.time}
            </p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="mb-3 block text-xs font-light tracking-[0.2em] text-white/40 uppercase"
          >
            Uwagi{" "}
            <span className="font-light tracking-normal text-white/20 normal-case">
              (opcjonalnie)
            </span>
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="np. preferowany wzór, alergie, inne uwagi..."
            rows={3}
            className="w-full resize-none border-b border-white/15 bg-transparent pb-3 text-sm font-light text-white transition-colors outline-none placeholder:text-white/20 focus:border-gold/40"
          />
        </div>

        {/* Inspiracje */}
        <div>
          <label
            htmlFor="inspiration"
            className="mb-3 block text-xs font-light tracking-[0.2em] text-white/40 uppercase"
          >
            Inspiracja{" "}
            <span className="font-light tracking-normal text-white/20 normal-case">
              (opcjonalnie — wklej link z Pinterest, Instagram...)
            </span>
          </label>
          <input
            id="inspiration"
            type="url"
            value={inspirationUrl}
            onChange={(e) => {
              setInspirationUrl(e.target.value)
              setImgError(false)
            }}
            placeholder="https://..."
            className="w-full border-b border-white/15 bg-transparent pb-3 text-sm font-light text-white/70 transition-colors outline-none placeholder:text-white/20 focus:border-gold/40"
          />
          {inspirationUrl.trim() && (
            <div className="mt-4">
              {!isUrlAllowed ? (
                <p className="text-xs font-light text-white/30">
                  Wklej link z Pinterest lub Instagrama, aby zobaczyć podgląd.
                </p>
              ) : imgError ? (
                <p className="text-xs font-light text-red-400/50">
                  Nie można załadować podglądu — sprawdź czy link prowadzi
                  bezpośrednio do zdjęcia.
                </p>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={inspirationUrl}
                  alt="Podgląd inspiracji"
                  onError={() => setImgError(true)}
                  className="max-h-52 w-auto border border-white/10 object-cover"
                />
              )}
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="gold-fill"
          className="w-full border-gold/50 px-6 py-4 tracking-widest uppercase lg:hidden"
        >
          <span className="relative z-10">Wyślij prośbę o wizytę</span>
        </Button>
      </form>

      {/* ── SUMMARY PREVIEW ── */}
      <aside aria-label="Podsumowanie wizyty" className="hidden lg:block">
        <div className="sticky top-24">
          <div className="border border-white/8 bg-white/[0.02] p-6">
            <p className="mb-6 text-xs font-light tracking-[0.3em] text-white/30 uppercase">
              Podsumowanie
            </p>

            <div className="flex flex-col gap-5">
              {/* Service */}
              <div>
                <p className="mb-1 text-[10px] font-light tracking-[0.2em] text-white/25 uppercase">
                  Usługa
                </p>
                {selectedService ? (
                  <>
                    <p className="font-display text-lg font-light text-white">
                      {selectedService.name}
                    </p>
                    <p className="mt-0.5 text-sm font-light text-gold/70">
                      {selectedService.price}
                    </p>
                    <p className="text-xs font-light text-white/30">
                      {selectedService.duration}
                    </p>
                  </>
                ) : (
                  <p className="text-sm font-light text-white/20 italic">
                    Nie wybrano
                  </p>
                )}
              </div>

              <div aria-hidden="true" className="h-px bg-white/5" />

              {/* Date + time */}
              <div>
                <p className="mb-1 text-[10px] font-light tracking-[0.2em] text-white/25 uppercase">
                  Termin
                </p>
                {date ? (
                  <p className="text-sm font-light text-white/70 capitalize">
                    {formatDate(date)}
                  </p>
                ) : (
                  <p className="text-sm font-light text-white/20 italic">
                    Nie wybrano
                  </p>
                )}
                {time && (
                  <p className="mt-0.5 font-display text-2xl font-light text-gold">
                    {time}
                  </p>
                )}
              </div>

              {/* Notes */}
              {notes && (
                <>
                  <div aria-hidden="true" className="h-px bg-white/5" />
                  <div>
                    <p className="mb-1 text-[10px] font-light tracking-[0.2em] text-white/25 uppercase">
                      Uwagi
                    </p>
                    <p className="text-xs leading-relaxed font-light text-white/45">
                      {notes}
                    </p>
                  </div>
                </>
              )}

              {/* Inspiracja */}
              {isUrlAllowed && !imgError && (
                <>
                  <div aria-hidden="true" className="h-px bg-white/5" />
                  <div>
                    <p className="mb-2 text-[10px] font-light tracking-[0.2em] text-white/25 uppercase">
                      Inspiracja
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={inspirationUrl}
                      alt="Inspiracja"
                      className="w-full border border-white/8 object-cover"
                      style={{ maxHeight: 140 }}
                    />
                  </div>
                </>
              )}
            </div>

            <div aria-hidden="true" className="my-6 h-px bg-white/5" />

            <Button
              type="submit"
              form="booking-form-lg"
              variant="gold-fill"
              className="w-full border-gold/50 px-6 py-3.5 tracking-widest uppercase"
              onClick={(e) => {
                e.preventDefault()
                const form = document.querySelector("form")
                form?.requestSubmit()
              }}
            >
              <span className="relative z-10">Wyślij prośbę</span>
            </Button>

            <p className="mt-4 text-center text-xs font-light text-white/20">
              Potwierdzenie telefoniczne w ciągu 24h
            </p>
          </div>

          {/* Decorative corner */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div
              className="absolute -right-8 -bottom-12 h-40 w-40 rounded-full opacity-15 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.72 0.1 85 / 0.3), transparent 70%)",
              }}
            />
          </div>
        </div>
      </aside>
    </div>
  )
}
