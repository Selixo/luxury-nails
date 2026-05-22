"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CalendarDays, Clock, Sparkles } from "lucide-react"

const UPCOMING = {
  date: "Środa, 21 maja 2025",
  time: "11:00",
  service: "Manicure hybrydowy",
  status: "confirmed" as const,
}

const STATS = [
  { label: "Wizyty łącznie", value: "8" },
  { label: "Klientka od", value: "Sty 2025" },
  { label: "Ostatnia wizyta", value: "9 maja" },
]

const QUICK_ACTIONS = [
  {
    href: "/panel/klient/rezerwacja",
    icon: CalendarDays,
    label: "Zarezerwuj wizytę",
    description: "Wybierz usługę i termin",
  },
  {
    href: "/panel/klient/historia",
    icon: Clock,
    label: "Historia wizyt",
    description: "Przeglądaj poprzednie stylizacje",
  },
  {
    href: "/panel/klient/profil",
    icon: Sparkles,
    label: "Twój profil",
    description: "Dane i ustawienia konta",
  },
]

type CancelState = "idle" | "form" | "done"

export default function KlientPage() {
  const [cancelState, setCancelState] = useState<CancelState>("idle")
  const [cancelReason, setCancelReason] = useState("")

  function handleCancelConfirm() {
    if (!cancelReason.trim()) return
    setCancelState("done")
  }

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Panel klienta
        </p>
        <h1 className="mb-10 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Witaj, Anno
        </h1>

        {/* Upcoming visit */}
        {cancelState !== "done" ? (
          <div className="mb-8 border border-gold/15 bg-gold/[0.03] p-6">
            {cancelState === "idle" && (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 text-xs font-light tracking-[0.2em] text-gold/60 uppercase">
                      Nadchodząca wizyta
                    </p>
                    <p className="mb-1 font-display text-xl font-light text-white">
                      {UPCOMING.service}
                    </p>
                    <p className="text-sm font-light text-white/50">
                      {UPCOMING.date} · {UPCOMING.time}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-sm border border-emerald-400/25 px-2.5 py-1 text-[10px] tracking-[0.15em] text-emerald-400/70 uppercase">
                    Potwierdzona
                  </span>
                </div>
                <button
                  onClick={() => setCancelState("form")}
                  className="mt-5 text-xs font-light text-white/20 transition-colors outline-none hover:text-red-400/60 focus-visible:text-red-400/60"
                >
                  Anuluj wizytę
                </button>
              </>
            )}

            {cancelState === "form" && (
              <>
                <p className="mb-1 text-xs font-light tracking-[0.2em] text-gold/60 uppercase">
                  Anulowanie wizyty
                </p>
                <p className="mb-4 text-sm font-light text-white/60">
                  {UPCOMING.service} · {UPCOMING.date}, {UPCOMING.time}
                </p>
                <label className="mb-1.5 block text-[10px] font-light tracking-[0.2em] text-white/30 uppercase">
                  Powód anulowania
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Opisz krótko dlaczego anulujesz wizytę..."
                  rows={3}
                  className="w-full resize-none border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-light text-white/70 transition-colors outline-none placeholder:text-white/20 focus:border-white/20"
                />
                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={handleCancelConfirm}
                    disabled={!cancelReason.trim()}
                    className="border border-red-400/25 bg-red-400/5 px-4 py-2 text-xs font-light tracking-[0.1em] text-red-400/80 uppercase transition-colors outline-none hover:border-red-400/45 hover:bg-red-400/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Potwierdź anulowanie
                  </button>
                  <button
                    onClick={() => {
                      setCancelState("idle")
                      setCancelReason("")
                    }}
                    className="text-xs font-light text-white/25 transition-colors outline-none hover:text-white/50"
                  >
                    Wróć
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="mb-8 border border-red-400/15 bg-red-400/[0.02] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-light tracking-[0.2em] text-red-400/50 uppercase">
                  Wizyta anulowana
                </p>
                <p className="mb-1 font-display text-xl font-light text-white/50">
                  {UPCOMING.service}
                </p>
                <p className="text-sm font-light text-white/30">
                  {UPCOMING.date} · {UPCOMING.time}
                </p>
                {cancelReason && (
                  <p className="mt-2 text-xs font-light text-white/25 italic">
                    Powód: {cancelReason}
                  </p>
                )}
              </div>
              <span className="shrink-0 rounded-sm border border-red-400/25 px-2.5 py-1 text-[10px] tracking-[0.15em] text-red-400/60 uppercase">
                Anulowana
              </span>
            </div>
            <Link
              href="/panel/klient/rezerwacja"
              className="mt-5 inline-block text-xs font-light text-white/25 transition-colors hover:text-gold"
            >
              Zarezerwuj nowy termin →
            </Link>
          </div>
        )}

        {/* Stats */}
        <div className="mb-10 grid grid-cols-3 divide-x divide-white/5 border border-white/5">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-5 py-4">
              <p className="font-display text-xl font-light text-gold sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs font-light text-white/35">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid gap-3 sm:grid-cols-3">
          {QUICK_ACTIONS.map(({ href, icon: Icon, label, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-4 border border-white/8 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-gold/20 hover:bg-white/[0.04]"
            >
              <Icon
                size={18}
                aria-hidden="true"
                className="text-gold/60 transition-colors duration-300 group-hover:text-gold"
              />
              <div>
                <p className="mb-1 text-sm font-light text-white/80 transition-colors duration-300 group-hover:text-white">
                  {label}
                </p>
                <p className="text-xs font-light text-white/35">
                  {description}
                </p>
              </div>
              <ArrowRight
                size={12}
                aria-hidden="true"
                className="mt-auto self-end text-white/20 transition-colors duration-300 group-hover:text-gold/50"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
