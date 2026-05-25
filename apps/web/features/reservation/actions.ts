"use server"

import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import {
  phoneSchema,
  loginPasswordSchema,
  nameSchema,
  lastNameSchema,
  registerPasswordSchema,
} from "./schemas"

const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000

function zodError(result: z.SafeParseError<unknown>): string {
  return result.error.errors[0]?.message ?? "Nieprawidłowe dane."
}

export async function checkPhone(
  phone: string
): Promise<{ error: string | null; isExisting: boolean }> {
  const parsed = phoneSchema.safeParse(phone)
  if (!parsed.success) return { error: zodError(parsed), isExisting: false }

  const admin = createAdminClient()
  const { data: profile } = await admin
    .from("profiles")
    .select("id")
    .eq("phone", parsed.data)
    .maybeSingle()

  return { error: null, isExisting: !!profile }
}

export async function sendOtp(
  phone: unknown
): Promise<{ error: string | null }> {
  const parsed = phoneSchema.safeParse(phone)
  if (!parsed.success) return { error: zodError(parsed) }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithOtp({
    phone: parsed.data,
  })
  return { error: error?.message ?? null }
}

export async function signInWithPassword(
  phone: unknown,
  password: unknown
): Promise<{ error: string | null }> {
  const parsedPhone = phoneSchema.safeParse(phone)
  if (!parsedPhone.success) return { error: zodError(parsedPhone) }

  const parsedPassword = loginPasswordSchema.safeParse(password)
  if (!parsedPassword.success) return { error: zodError(parsedPassword) }

  const key = parsedPhone.data
  const admin = createAdminClient()

  const { data: attempt } = await admin
    .from("login_attempts")
    .select("count, locked_until")
    .eq("phone", key)
    .maybeSingle()

  const now = new Date()
  const lockoutActive =
    !!attempt?.locked_until && new Date(attempt.locked_until) > now

  if (lockoutActive) {
    const minutesLeft = Math.ceil(
      (new Date(attempt!.locked_until!).getTime() - now.getTime()) / 60_000
    )
    return {
      error: `Zbyt wiele nieudanych prób. Spróbuj ponownie za ${minutesLeft} min.`,
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    phone: key,
    password: parsedPassword.data,
  })

  if (error) {
    console.error("signInWithPassword error:", error.code)

    const expiredLockout =
      !!attempt?.locked_until && new Date(attempt.locked_until) <= now
    const baseCount = expiredLockout ? 0 : (attempt?.count ?? 0)
    const newCount = baseCount + 1
    const lockedUntil =
      newCount >= MAX_ATTEMPTS
        ? new Date(Date.now() + LOCKOUT_MS).toISOString()
        : null

    await admin.from("login_attempts").upsert({
      phone: key,
      count: newCount,
      locked_until: lockedUntil,
      updated_at: new Date().toISOString(),
    })

    if (newCount >= MAX_ATTEMPTS) {
      return {
        error: "Zbyt wiele nieudanych prób. Konto zablokowane na 15 minut.",
      }
    }
    const remaining = MAX_ATTEMPTS - newCount
    return { error: `Nieprawidłowe hasło. Pozostało prób: ${remaining}.` }
  }

  await admin.from("login_attempts").delete().eq("phone", key)
  return { error: null }
}

export async function verifyOtp(
  phone: unknown,
  token: unknown
): Promise<{ error: string | null; isNewUser: boolean }> {
  const parsedPhone = phoneSchema.safeParse(phone)
  if (!parsedPhone.success)
    return { error: zodError(parsedPhone), isNewUser: false }

  const parsedToken = z.string().length(6).regex(/^\d+$/).safeParse(token)
  if (!parsedToken.success)
    return { error: "Nieprawidłowy kod.", isNewUser: false }

  const supabase = await createClient()

  const { error: otpError } = await supabase.auth.verifyOtp({
    phone: parsedPhone.data,
    token: parsedToken.data,
    type: "sms",
  })
  if (otpError)
    return {
      error: "Nieprawidłowy lub wygasły kod. Spróbuj ponownie.",
      isNewUser: false,
    }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Błąd sesji. Spróbuj ponownie.", isNewUser: false }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle()

  if (profileError)
    return { error: "Błąd połączenia. Spróbuj ponownie.", isNewUser: false }

  return { error: null, isNewUser: !profile }
}

export async function completeRegistration(
  name: unknown,
  lastName: unknown,
  password: unknown
): Promise<{
  error: string | null
  accountCreated: boolean
  signedIn: boolean
}> {
  const fail = (error: string) => ({
    error,
    accountCreated: false,
    signedIn: false,
  })

  const parsedName = nameSchema.safeParse(name)
  if (!parsedName.success) return fail(zodError(parsedName))

  const parsedLastName = lastNameSchema.safeParse(lastName)
  if (!parsedLastName.success) return fail(zodError(parsedLastName))

  const parsedPassword = registerPasswordSchema.safeParse(password)
  if (!parsedPassword.success) return fail(zodError(parsedPassword))

  try {
    const supabase = await createClient()
    const admin = createAdminClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (!user || userError) return fail("Sesja wygasła. Zacznij od nowa.")
    if (!user.phone)
      return fail("Nie udało się potwierdzić numeru telefonu. Zacznij od nowa.")

    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle()

    if (existingProfile) return fail("Konto już istnieje. Zaloguj się.")

    const { error: passError } = await admin.auth.admin.updateUserById(
      user.id,
      {
        password: parsedPassword.data,
      }
    )
    if (passError) {
      console.error("completeRegistration: updateUserById error:", passError)
      return fail("Nie udało się ustawić hasła. Spróbuj ponownie.")
    }

    const phone = user.phone.startsWith("+") ? user.phone : "+" + user.phone

    const { error: profileError } = await admin.from("profiles").insert({
      id: user.id,
      phone,
      name: parsedName.data,
      last_name: parsedLastName.data,
      role: "client",
    } as any)
    if (profileError) {
      console.error("completeRegistration: insert profile error:", profileError)
      return fail("Nie udało się utworzyć profilu. Spróbuj ponownie.")
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      phone,
      password: parsedPassword.data,
    })
    if (signInError) {
      console.error(
        "completeRegistration: signIn after registration error:",
        signInError
      )
    }

    return { error: null, accountCreated: true, signedIn: !signInError }
  } catch (e) {
    console.error("completeRegistration error:", e)
    return fail("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.")
  }
}

export async function signOut(): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  return { error: error?.message ?? null }
}
