"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import type { Tables } from "@/lib/supabase/types"
import { generateAvailableSlots, getDayKey, type WorkingDay } from "./slots"
import { bookingFormSchema, type BookingFormValues } from "./schemas"

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"]
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
}

export type Service = Pick<
  Tables<"services">,
  "id" | "name" | "category" | "price" | "duration_min"
>

export async function getBookingPageData(): Promise<{
  services: Service[]
  userName: string
}> {
  const supabase = await createClient()
  const admin = createAdminClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { services: [], userName: "" }

  const [{ data: services }, { data: profile }] = await Promise.all([
    admin
      .from("services")
      .select("id, name, category, price, duration_min")
      .eq("active", true)
      .order("category"),
    admin.from("profiles").select("name").eq("id", user.id).single(),
  ])

  return {
    services: services ?? [],
    userName: profile?.name ?? "",
  }
}

export async function getAvailableSlots(
  date: string,
  serviceDurationMin: number
): Promise<string[]> {
  if (!date || serviceDurationMin <= 0) return []

  const admin = createAdminClient()

  const [{ data: settings }, { data: bookings }] = await Promise.all([
    admin.from("settings").select("working_hours, break_min").limit(1).single(),
    admin
      .from("bookings")
      .select("time, services(duration_min)")
      .eq("date", date)
      .neq("status", "cancelled"),
  ])

  if (!settings) return []

  const workingHours = settings.working_hours as Record<
    string,
    WorkingDay | undefined
  >
  const workingDay = workingHours[getDayKey(date)]

  if (!workingDay || !workingDay.enabled) return []

  const booked = (bookings ?? []).map((b) => ({
    time: b.time,
    duration_min: b.services?.duration_min ?? 0,
  }))

  const slots = generateAvailableSlots(
    workingDay,
    booked,
    serviceDurationMin,
    settings.break_min ?? 0
  )

  const todayStr = new Date().toLocaleDateString("sv-SE", {
    timeZone: "Europe/Warsaw",
  })

  if (date === todayStr) {
    const nowStr = new Date().toLocaleTimeString("sv-SE", {
      timeZone: "Europe/Warsaw",
      hour: "2-digit",
      minute: "2-digit",
    })
    return slots.filter((slot) => slot > nowStr)
  }

  return slots
}

export async function deleteInspirationImage(url: string): Promise<void> {
  if (!url) return

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  const path = url.split("/inspirations/")[1]
  if (!path || !path.startsWith(user.id + "/")) return

  await supabase.storage.from("inspirations").remove([path])
}

export async function uploadInspirationImage(
  formData: FormData
): Promise<{ url: string | null; error: string | null }> {
  const file = formData.get("file")
  if (!(file instanceof File)) return { url: null, error: "Brak pliku." }

  if (file.size > MAX_FILE_SIZE)
    return { url: null, error: "Plik może mieć maksymalnie 2MB." }
  if (!ALLOWED_TYPES.includes(file.type))
    return { url: null, error: "Dozwolony format: JPG, PNG, WebP, HEIC." }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { url: null, error: "Sesja wygasła." }

  const ext = MIME_TO_EXT[file.type] ?? "jpg"
  const path = `${user.id}/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage
    .from("inspirations")
    .upload(path, file)
  if (error) {
    console.error("uploadInspirationImage error:", error)
    return {
      url: null,
      error: "Nie udało się wgrać zdjęcia. Spróbuj ponownie.",
    }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("inspirations").getPublicUrl(path)
  return { url: publicUrl, error: null }
}

export type BookingError =
  | "slot_taken"
  | "service_unavailable"
  | "invalid_data"
  | "session_expired"
  | "unknown"

export async function createBooking(
  values: BookingFormValues
): Promise<{ error: string | null; code?: BookingError }> {
  const parsed = bookingFormSchema.safeParse(values)
  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message ?? "Nieprawidłowe dane.",
      code: "invalid_data",
    }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user)
    return {
      error: "Sesja wygasła. Zaloguj się ponownie.",
      code: "session_expired",
    }

  const admin = createAdminClient()

  const { data: service } = await admin
    .from("services")
    .select("duration_min")
    .eq("id", parsed.data.serviceId)
    .eq("active", true)
    .single()

  if (!service)
    return {
      error: "Wybrana usługa jest niedostępna.",
      code: "service_unavailable",
    }

  const availableSlots = await getAvailableSlots(
    parsed.data.date,
    service.duration_min
  )
  if (!availableSlots.includes(parsed.data.time)) {
    return {
      error: "Wybrany termin jest już zajęty. Wybierz inny termin.",
      code: "slot_taken",
    }
  }

  const { error } = await admin.from("bookings").insert({
    client_id: user.id,
    service_id: parsed.data.serviceId,
    date: parsed.data.date,
    time: parsed.data.time,
    notes: parsed.data.notes || null,
    inspiration_url: parsed.data.inspirationUrl || null,
    status: "pending",
  })

  if (error) {
    console.error("createBooking error:", error)
    if (error.code === "23505" || error.code === "P0001") {
      return {
        error:
          "Ten termin został właśnie zajęty. Odśwież dostępne godziny i wybierz inny.",
        code: "slot_taken",
      }
    }
    return {
      error: "Nie udało się złożyć rezerwacji. Spróbuj ponownie.",
      code: "unknown",
    }
  }

  return { error: null }
}
