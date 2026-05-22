"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

const USER = {
  name: "Anna Kowalska",
  phone: "+48 *** *** 567",
  since: "Styczeń 2025",
}

type PasswordForm = {
  current: string
  next: string
  confirm: string
}

export default function ProfilPage() {
  const [form, setForm] = useState<PasswordForm>({
    current: "",
    next: "",
    confirm: "",
  })
  const [visible, setVisible] = useState(false)
  const [errors, setErrors] = useState<Partial<PasswordForm>>({})
  const [saved, setSaved] = useState(false)

  function validate() {
    const e: Partial<PasswordForm> = {}
    if (!form.current) e.current = "Wpisz aktualne hasło."
    if (form.next.length < 8)
      e.next = "Nowe hasło musi mieć co najmniej 8 znaków."
    if (form.next !== form.confirm) e.confirm = "Hasła nie są identyczne."
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    // W przyszłości: POST /api/auth/change-password
    setSaved(true)
    setForm({ current: "", next: "", confirm: "" })
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-md">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Konto
        </p>
        <h1 className="mb-10 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Twój profil
        </h1>

        {/* User info */}
        <div className="mb-10 border border-white/8 bg-white/[0.02]">
          <div className="flex flex-col divide-y divide-white/5">
            {[
              { label: "Imię i nazwisko", value: USER.name },
              { label: "Numer telefonu", value: USER.phone },
              { label: "Klientka od", value: USER.since },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between px-6 py-4"
              >
                <p className="text-xs font-light tracking-[0.15em] text-white/35 uppercase">
                  {label}
                </p>
                <p className="text-sm font-light text-white/70">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Change password */}
        <div className="border border-white/8 bg-white/[0.02] px-6 py-8">
          <p className="mb-6 text-xs font-light tracking-[0.2em] text-white/50 uppercase">
            Zmień hasło
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6"
          >
            {(
              [
                {
                  id: "current",
                  label: "Aktualne hasło",
                  autocomplete: "current-password",
                },
                {
                  id: "next",
                  label: "Nowe hasło",
                  autocomplete: "new-password",
                },
                {
                  id: "confirm",
                  label: "Powtórz nowe hasło",
                  autocomplete: "new-password",
                },
              ] as const
            ).map(({ id, label, autocomplete }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="mb-3 block text-xs font-light tracking-[0.2em] text-white/40 uppercase"
                >
                  {label}
                </label>
                <div className="flex items-center gap-3 border-b border-white/15 pb-3 transition-colors focus-within:border-gold/40">
                  <input
                    id={id}
                    type={visible ? "text" : "password"}
                    autoComplete={autocomplete}
                    value={form[id]}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, [id]: e.target.value }))
                      setErrors((prev) => ({ ...prev, [id]: "" }))
                      setSaved(false)
                    }}
                    placeholder="••••••••"
                    aria-describedby={errors[id] ? `${id}-error` : undefined}
                    aria-invalid={!!errors[id]}
                    className="w-full bg-transparent text-sm font-light text-white outline-none placeholder:text-white/20"
                  />
                  {id === "current" && (
                    <button
                      type="button"
                      onClick={() => setVisible((v) => !v)}
                      aria-label={visible ? "Ukryj hasła" : "Pokaż hasła"}
                      className="shrink-0 text-white/25 transition-colors outline-none hover:text-white/50 focus-visible:text-gold"
                    >
                      {visible ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  )}
                </div>
                {errors[id] && (
                  <p
                    id={`${id}-error`}
                    role="alert"
                    className="mt-2 text-xs font-light text-red-400/80"
                  >
                    {errors[id]}
                  </p>
                )}
              </div>
            ))}

            <div className="flex items-center gap-4 pt-2">
              <Button
                type="submit"
                variant="gold-fill"
                className="border-gold/50 px-6 py-3 tracking-widest uppercase"
              >
                <span className="relative z-10">Zapisz</span>
              </Button>
              {saved && (
                <p
                  role="status"
                  className="text-xs font-light text-emerald-400/70"
                >
                  Hasło zmienione.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
