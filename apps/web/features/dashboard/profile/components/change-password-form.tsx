"use client"

import { useState, useTransition } from "react"
import { Eye, EyeOff } from "lucide-react"
import { changePassword } from "../actions"

type Fields = { current: string; next: string; confirm: string }
type FieldErrors = Partial<Fields>

const FIELDS = [
  { id: "current", label: "Aktualne hasło", autocomplete: "current-password" },
  { id: "next", label: "Nowe hasło", autocomplete: "new-password" },
  { id: "confirm", label: "Powtórz nowe hasło", autocomplete: "new-password" },
] as const

export function ChangePasswordForm() {
  const [form, setForm] = useState<Fields>({
    current: "",
    next: "",
    confirm: "",
  })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isPending, startTransition] = useTransition()

  function validate(): FieldErrors {
    const e: FieldErrors = {}
    if (!form.current) e.current = "Wpisz aktualne hasło."
    if (form.next.length < 8)
      e.next = "Nowe hasło musi mieć co najmniej 8 znaków."
    if (form.next !== form.confirm) e.confirm = "Hasła nie są identyczne."
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError(null)
    setSuccess(false)

    const errors = validate()
    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      return
    }

    startTransition(async () => {
      const { error } = await changePassword(form.current, form.next)
      if (error) {
        setServerError(error)
      } else {
        setSuccess(true)
        setForm({ current: "", next: "", confirm: "" })
      }
    })
  }

  function handleChange(id: keyof Fields, value: string) {
    setForm((prev) => ({ ...prev, [id]: value }))
    setFieldErrors((prev) => ({ ...prev, [id]: undefined }))
    setServerError(null)
    setSuccess(false)
  }

  return (
    <div className="border border-white/8 px-6 py-8">
      <p className="mb-6 text-xs font-light tracking-[0.2em] text-white/50 uppercase">
        Zmień hasło
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {FIELDS.map(({ id, label, autocomplete }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="mb-3 block text-xs font-light tracking-[0.2em] text-white/50 uppercase"
            >
              {label}
            </label>
            <div className="flex items-center gap-3 border-b border-white/15 pb-3 transition-colors focus-within:border-gold/40">
              <input
                id={id}
                type={visible ? "text" : "password"}
                autoComplete={autocomplete}
                value={form[id]}
                onChange={(e) => handleChange(id, e.target.value)}
                placeholder="••••••••"
                aria-describedby={fieldErrors[id] ? `${id}-error` : undefined}
                aria-invalid={!!fieldErrors[id]}
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
            {fieldErrors[id] && (
              <p
                id={`${id}-error`}
                role="alert"
                className="mt-2 text-xs font-light text-red-400/80"
              >
                {fieldErrors[id]}
              </p>
            )}
          </div>
        ))}

        {serverError && (
          <p role="alert" className="text-xs font-light text-red-400/80">
            {serverError}
          </p>
        )}

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="border border-gold/30 bg-gold/5 px-6 py-2.5 text-xs font-light tracking-[0.2em] text-gold uppercase transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? "Zapisywanie..." : "Zapisz"}
          </button>
          {success && (
            <p role="status" className="text-xs font-light text-emerald-400/70">
              Hasło zmienione.
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
