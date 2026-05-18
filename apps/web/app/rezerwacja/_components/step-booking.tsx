"use client"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { CheckCircle } from "lucide-react"
import { SALON } from "@/config/salon"

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

type Props = {
  name: string
}

type BookingState = "form" | "success"

export function StepBooking({ name }: Props) {
  const [state, setState] = useState<BookingState>("form")
  const [service, setService] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const today = new Date().toISOString().split("T")[0]

  function validate() {
    const e: Record<string, string> = {}
    if (!service) e.service = "Wybierz usługę."
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
    // UI-only placeholder
    // W przyszłości: POST /api/bookings
    setState("success")
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center py-4 text-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center border border-gold/25">
          <CheckCircle size={24} className="text-gold" aria-hidden="true" />
        </div>
        <p className="mb-1 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Wysłano
        </p>
        <h2 className="mb-3 font-display text-2xl font-light tracking-wide text-white sm:text-3xl">
          Prośba przyjęta
        </h2>
        <p className="mb-8 max-w-xs text-sm leading-relaxed font-light text-white/40">
          Skontaktuję się z Tobą telefonicznie w celu potwierdzenia terminu. Do
          zobaczenia wkrótce, {name}!
        </p>
        <button
          onClick={() => {
            setState("form")
            setService("")
            setDate("")
            setTime("")
            setNotes("")
          }}
          className="text-xs font-light text-white/25 transition-colors outline-none hover:text-white/50 focus-visible:text-gold"
        >
          Umów kolejną wizytę
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
        Rezerwacja
      </p>
      <h1 className="mb-1 font-display text-2xl font-light tracking-wide text-white sm:text-3xl">
        Witaj, {name}
      </h1>
      <p className="mb-8 text-sm font-light text-white/40">
        Wypełnij formularz, a oddzwonię w celu potwierdzenia terminu.
      </p>

      <div className="mb-6 flex flex-col gap-7">
        {/* Service */}
        <div>
          <label
            htmlFor="service"
            className="mb-3 block text-xs font-light tracking-[0.2em] text-white/40 uppercase"
          >
            Usługa
          </label>
          <div className="relative border-b border-white/15 transition-colors focus-within:border-gold/40">
            <select
              id="service"
              value={service}
              onChange={(e) => {
                setService(e.target.value)
                setErrors((prev) => ({ ...prev, service: "" }))
              }}
              aria-describedby={errors.service ? "service-error" : undefined}
              aria-invalid={!!errors.service}
              className="w-full appearance-none bg-transparent pb-3 text-sm font-light text-white outline-none"
              style={{ color: service ? undefined : "rgb(255 255 255 / 0.2)" }}
            >
              <option value="" disabled hidden>
                Wybierz usługę
              </option>
              {SALON.services.map((s) => (
                <option key={s} value={s} className="bg-zinc-900 text-white">
                  {s}
                </option>
              ))}
            </select>
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
              setErrors((prev) => ({ ...prev, date: "" }))
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
                  setErrors((prev) => ({ ...prev, time: "" }))
                }}
                aria-pressed={time === slot}
                className={[
                  "border py-2 text-xs font-light tracking-wide transition-colors outline-none focus-visible:ring-1 focus-visible:ring-gold/50",
                  time === slot
                    ? "border-gold/50 bg-gold/10 text-gold"
                    : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/60",
                ].join(" ")}
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
            <span className="tracking-normal text-white/20 normal-case">
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
      </div>

      <Button
        type="submit"
        variant="gold-fill"
        className="w-full justify-between border-gold/50 px-6 py-4 tracking-widest uppercase"
      >
        <span className="relative z-10">Wyślij prośbę o wizytę</span>
      </Button>
    </form>
  )
}
