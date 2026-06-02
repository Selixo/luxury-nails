"use server"

import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import type { WorkingHours, ServiceRow, SettingsRow } from "./types"

async function verifyAdmin(): Promise<boolean> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const admin = createAdminClient()
  const { data } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  return data?.role === "admin"
}

export async function getSettings(): Promise<SettingsRow | null> {
  const admin = createAdminClient()
  const { data } = await admin.from("settings").select("*").single()
  if (!data) return null
  return data as unknown as SettingsRow
}

export async function getServices(): Promise<ServiceRow[]> {
  const admin = createAdminClient()
  const { data } = await admin
    .from("services")
    .select("*")
    .order("category")
    .order("name")
  return (data ?? []) as ServiceRow[]
}

export async function updateWorkingHours(
  workingHours: WorkingHours,
  breakMin: number
): Promise<{ error: string | null }> {
  if (!(await verifyAdmin())) return { error: "Brak uprawnień." }

  const admin = createAdminClient()

  const { data: existing } = await admin.from("settings").select("id").single()

  if (!existing) return { error: "Nie znaleziono ustawień." }

  const { error } = await admin
    .from("settings")
    .update({
      working_hours: workingHours as never,
      break_min: breakMin,
    })
    .eq("id", existing.id)

  if (error) {
    console.error("updateWorkingHours error:", error)
    return { error: "Nie udało się zapisać godzin pracy." }
  }

  revalidatePath("/dashboard/admin/settings")
  return { error: null }
}

export async function updateService(
  id: string,
  fields: { price?: number; duration_min?: number; active?: boolean }
): Promise<{ error: string | null }> {
  if (!(await verifyAdmin())) return { error: "Brak uprawnień." }

  const admin = createAdminClient()
  const { error } = await admin.from("services").update(fields).eq("id", id)

  if (error) {
    console.error("updateService error:", error)
    return { error: "Nie udało się zapisać usługi." }
  }

  revalidatePath("/dashboard/admin/settings")
  return { error: null }
}

export async function createService(fields: {
  name: string
  category: string
  price: number
  duration_min: number
}): Promise<{ error: string | null }> {
  if (!(await verifyAdmin())) return { error: "Brak uprawnień." }

  const name = fields.name.trim()
  const category = fields.category.trim()

  if (!name) return { error: "Nazwa usługi jest wymagana." }
  if (!category) return { error: "Kategoria jest wymagana." }
  if (fields.price < 0) return { error: "Cena nie może być ujemna." }
  if (fields.duration_min < 5)
    return { error: "Czas musi wynosić co najmniej 5 minut." }

  const admin = createAdminClient()
  const { error } = await admin.from("services").insert({
    name,
    category,
    price: fields.price,
    duration_min: fields.duration_min,
    active: true,
  })

  if (error) {
    console.error("createService error:", error)
    return { error: "Nie udało się dodać usługi." }
  }

  revalidatePath("/dashboard/admin/settings")
  return { error: null }
}
