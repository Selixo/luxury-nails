"use client"

import { useState, useTransition, useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@workspace/ui/components/button"
import { bookingFormSchema, type BookingFormValues } from "./schemas"
import { createBooking, type Service } from "./actions"
import { useAvailableSlots } from "./hooks/use-available-slots"
import { ServicePicker } from "./components/service-picker"
import { TimeSlotPicker } from "./components/time-slot-picker"
import { InspirationUpload } from "./components/inspiration-upload"
import { BookingSummary } from "./components/booking-summary"
import { BookingSuccess } from "./components/booking-success"
import { DatePicker } from "@workspace/ui/components/date-picker"

type Props = {
  services: Service[]
  userName: string
}

const TEXT_AREA_MAX_LENGTH = 500

function formatDate(iso: string): string {
  if (!iso) return ""
  return new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso + "T00:00:00"))
}

export function BookingForm({ services, userName }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      serviceId: "",
      date: "",
      time: "",
      notes: "",
      inspirationUrl: "",
    },
  })

  const serviceId = useWatch({ control, name: "serviceId" }) ?? ""
  const date = useWatch({ control, name: "date" }) ?? ""
  const time = useWatch({ control, name: "time" }) ?? ""
  const notes = useWatch({ control, name: "notes" }) ?? ""
  const inspirationUrl = useWatch({ control, name: "inspirationUrl" }) ?? ""

  const selectedService = services.find((s) => s.id === serviceId)

  const {
    slots,
    isLoading: isLoadingSlots,
    refetch: refetchSlots,
  } = useAvailableSlots(serviceId, date, selectedService?.duration_min)

  useEffect(() => {
    setValue("time", "")
  }, [serviceId, date, selectedService?.duration_min, setValue])

  function onSubmit(values: BookingFormValues) {
    startTransition(async () => {
      const { error, code } = await createBooking(values)
      if (error) {
        setError("root", { message: error })
        if (code === "slot_taken") {
          setValue("time", "")
          refetchSlots()
        }
        return
      }
      setSubmitted(true)
    })
  }

  if (submitted) {
    return (
      <BookingSuccess
        serviceName={selectedService?.name}
        date={date}
        time={time}
        userName={userName}
        formatDate={formatDate}
        onReset={() => {
          setSubmitted(false)
          reset()
        }}
      />
    )
  }

  return (
    <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-10 xl:gap-14">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-8"
      >
        <ServicePicker
          services={services}
          selected={serviceId}
          onSelect={(id) => setValue("serviceId", id, { shouldValidate: true })}
          error={errors.serviceId?.message}
        />

        <div>
          <p className="mb-3 text-xs font-light tracking-[0.2em] text-white/80 uppercase">
            Preferowana data
          </p>
          <DatePicker
            value={date}
            onChange={(val) => setValue("date", val, { shouldValidate: true })}
            min={new Date().toISOString().split("T")[0]}
            error={!!errors.date}
          />
          {errors.date && (
            <p role="alert" className="mt-2 text-xs font-light text-red-400/80">
              {errors.date.message}
            </p>
          )}
        </div>

        <TimeSlotPicker
          slots={slots}
          isLoading={isLoadingSlots}
          selected={time}
          onSelect={(slot) => setValue("time", slot, { shouldValidate: true })}
          hasServiceAndDate={!!serviceId && !!date}
          error={errors.time?.message}
        />

        <div>
          <label
            htmlFor="notes"
            className="mb-3 block text-xs font-light tracking-[0.2em] text-white/80 uppercase"
          >
            Uwagi{" "}
            <span className="font-light tracking-normal text-white/50 normal-case">
              (opcjonalnie)
            </span>
          </label>
          <textarea
            id="notes"
            {...register("notes")}
            placeholder="np. preferowany wzór, alergie, inne uwagi..."
            rows={3}
            maxLength={TEXT_AREA_MAX_LENGTH}
            className="w-full resize-none border-b border-white/15 bg-transparent pb-3 text-sm font-light text-white transition-colors outline-none placeholder:text-white/50 focus:border-gold/40"
          />
          <div className="mt-1.5 flex items-center justify-between">
            {errors.notes ? (
              <p role="alert" className="text-xs font-light text-red-400/80">
                {errors.notes.message}
              </p>
            ) : (
              <span />
            )}
            <span
              className={`text-xxs font-light tabular-nums ${notes.length >= 450 ? "text-red-400" : "text-white/50"}`}
            >
              {notes.length}/{TEXT_AREA_MAX_LENGTH}
            </span>
          </div>
        </div>

        <InspirationUpload
          value={inspirationUrl}
          onChange={(url) => setValue("inspirationUrl", url)}
          error={errors.inspirationUrl?.message}
        />

        {errors.root && (
          <p role="alert" className="text-xs font-light text-red-400/80">
            {errors.root.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          variant="gold-fill"
          className="w-full border-gold/50 px-6 py-4 tracking-widest uppercase disabled:opacity-60 lg:hidden"
        >
          <span className="relative z-10">
            {isPending ? "Wysyłanie..." : "Wyślij prośbę o wizytę"}
          </span>
        </Button>
      </form>

      <BookingSummary
        selectedService={selectedService}
        date={date}
        time={time}
        notes={notes}
        inspirationUrl={inspirationUrl}
        isPending={isPending}
        formatDate={formatDate}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  )
}
