"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export type ProfileData = {
  name: string
  lastName: string
  phone: string
  email: string
  joinedAt: string
}

export async function getProfileData(): Promise<ProfileData | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const admin = createAdminClient()
  const { data: profile } = await admin
    .from("profiles")
    .select("name, last_name, phone, created_at")
    .eq("id", user.id)
    .single()

  if (!profile) return null

  return {
    name: profile.name,
    lastName: profile.last_name,
    phone: profile.phone,
    email: user.email ?? "",
    joinedAt: profile.created_at,
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ error: string | null }> {
  if (newPassword.length < 8)
    return { error: "Nowe hasło musi mieć co najmniej 8 znaków." }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Sesja wygasła." }

  const phone = user.phone
  const email = user.email
  const credential = phone
    ? { phone, password: currentPassword }
    : { email: email!, password: currentPassword }

  const { error: signInError } =
    await supabase.auth.signInWithPassword(credential)
  if (signInError) return { error: "Aktualne hasło jest nieprawidłowe." }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  })
  if (updateError) return { error: "Nie udało się zmienić hasła." }

  return { error: null }
}

export async function deleteAccount(): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Sesja wygasła." }

  const admin = createAdminClient()

  const { data: bookings } = await admin
    .from("bookings")
    .select("id")
    .eq("client_id", user.id)

  const bookingIds = (bookings ?? []).map((b) => b.id)

  if (bookingIds.length > 0) {
    await admin.from("ratings").delete().in("booking_id", bookingIds)
    await admin.from("bookings").delete().in("id", bookingIds)
  }

  await admin.from("bans").delete().eq("client_id", user.id)
  await admin.from("profiles").delete().eq("id", user.id)

  const { error } = await admin.auth.admin.deleteUser(user.id)
  if (error) return { error: "Nie udało się usunąć konta." }

  await supabase.auth.signOut()
  redirect("/")
}
