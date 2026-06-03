"use client"

import { useTransition } from "react"
import {
  connectGoogleCalendar,
  disconnectGoogleCalendar,
} from "../google-calendar-actions"
import type { SettingsRow } from "../types"

const FEATURES = [
  "Automatyczne dodawanie wizyt do kalendarza",
  "Przypomnienia push na telefonie",
  "Widoczność godzin wolnych i zajętych",
]

type Props = {
  settings: SettingsRow
  googleError?: boolean
}

export function GoogleCalendarSection({ settings, googleError }: Props) {
  const connected = !!settings.google_access_token
  const [isPending, startTransition] = useTransition()

  function handleConnect() {
    startTransition(async () => {
      await connectGoogleCalendar()
    })
  }

  function handleDisconnect() {
    startTransition(async () => {
      await disconnectGoogleCalendar()
    })
  }

  return (
    <section>
      <h2 className="mb-1 text-sm font-light tracking-[0.2em] text-white/60 uppercase">
        Google Calendar
      </h2>
      <p className="mb-5 text-xs font-light text-white/50">
        Po połączeniu każda potwierdzona wizyta automatycznie trafia do Twojego
        kalendarza Google z przypomnieniem na telefonie.
      </p>

      <div className="border border-white/8 bg-white/[0.02] p-6">
        <div className="mb-5 flex items-start gap-4">
          <div
            className={`mt-0.5 h-2 w-2 shrink-0 rounded-full transition-colors ${
              connected ? "bg-emerald-400/70" : "bg-white/15"
            }`}
          />
          <div>
            <p className="text-xs font-light text-white/80">
              Status:{" "}
              <span
                className={connected ? "text-emerald-400/70" : "text-white/50"}
              >
                {connected ? "Połączono" : "Niepołączono"}
              </span>
            </p>
            {connected && settings.google_connected_email && (
              <p className="mt-0.5 text-xs font-light text-white/50">
                {settings.google_connected_email}
              </p>
            )}
            {!connected && (
              <p className="mt-1 text-xs font-light text-white/50">
                Połącz konto Google, aby automatycznie synchronizować wizyty.
              </p>
            )}
          </div>
        </div>

        {!connected && (
          <div className="mb-6 space-y-2.5">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <div className="h-px w-3 bg-white/15" />
                <p className="text-xs font-light text-white/50">{feature}</p>
              </div>
            ))}
          </div>
        )}

        {googleError && (
          <p className="mb-4 text-xs font-light text-red-400/80">
            Nie udało się połączyć z Google. Spróbuj ponownie.
          </p>
        )}

        {connected ? (
          <button
            onClick={handleDisconnect}
            disabled={isPending}
            className="border border-red-400/20 px-5 py-2.5 text-xs font-light tracking-[0.15em] text-red-400/80 uppercase transition-colors outline-none hover:border-red-400/35 hover:text-red-400/80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? "Rozłączanie…" : "Rozłącz konto Google"}
          </button>
        ) : (
          <button
            onClick={handleConnect}
            disabled={isPending}
            className="border border-white/10 px-5 py-2.5 text-xs font-light tracking-[0.15em] text-white/50 uppercase transition-colors outline-none hover:border-gold/25 hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? "Przekierowywanie…" : "Połącz z Google Calendar"}
          </button>
        )}
      </div>

      <p
        className="mt-3 text-[10px] font-light text-white/15"
        aria-hidden="true"
      >
        Integracja wymaga konta Google. Dane wizyt nie są udostępniane osobom
        trzecim.
      </p>
    </section>
  )
}
