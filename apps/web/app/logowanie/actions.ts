"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

// Sprawdź czy numer istnieje w bazie (admin client — pomija RLS)
export async function checkPhoneExists(phone: string): Promise<boolean> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("phone", "+48" + phone)
    .maybeSingle()
  return !!data
}

// Wyślij OTP przez Twilio (nowy użytkownik lub ponowne wysłanie)
export async function sendOtp(
  phone: string
): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithOtp({
    phone: "+48" + phone,
  })
  return { error: error?.message ?? null }
}

// Zweryfikuj kod OTP
export async function verifyOtp(
  phone: string,
  token: string
): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({
    phone: "+48" + phone,
    token,
    type: "sms",
  })
  return { error: error?.message ?? null }
}

// Zaloguj istniejącego użytkownika (telefon + hasło)
export async function signInWithPassword(
  phone: string,
  password: string
): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    phone: "+48" + phone,
    password,
  })
  if (error) {
    // Przyjazny komunikat zamiast technicznego
    return { error: "Nieprawidłowe hasło. Spróbuj ponownie." }
  }
  return { error: null }
}

// Dokończ rejestrację — ustaw imię i hasło po weryfikacji OTP
export async function completeRegistration(
  name: string,
  password: string
): Promise<{ error: string | null }> {
  try {
    const supabase = await createClient()
    const admin = createAdminClient()

    // Pobierz zalogowanego użytkownika z sesji (ustawionej przez browser-side verifyOtp)
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (!user || userError) {
      return { error: "Sesja wygasła. Zacznij od nowa." }
    }

    // Ustaw hasło przez admin client — nie wymaga aktywnej sesji po stronie serwera
    const { error: passError } = await admin.auth.admin.updateUserById(
      user.id,
      {
        password,
      }
    )
    if (passError) return { error: passError.message }

    // Upsert profilu przez admin client — pomija RLS
    const { error: profileError } = await admin.from("profiles").upsert({
      id: user.id,
      phone: user.phone ?? "",
      name,
      role: "client",
    })

    return { error: profileError?.message ?? null }
  } catch (e) {
    console.error("completeRegistration error:", e)
    return { error: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie." }
  }
}

// Wyloguj
export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
}
