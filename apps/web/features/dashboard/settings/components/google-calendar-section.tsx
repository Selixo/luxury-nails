const FEATURES = [
  "Automatyczne dodawanie wizyt do kalendarza",
  "Przypomnienia push na telefonie",
  "Widoczność godzin wolnych i zajętych",
]

export function GoogleCalendarSection() {
  return (
    <section>
      <h2 className="mb-1 text-sm font-light tracking-[0.2em] text-white/60 uppercase">
        Google Calendar
      </h2>
      <p className="mb-5 text-xs font-light text-white/25">
        Po połączeniu każda potwierdzona wizyta automatycznie trafia do Twojego
        kalendarza Google z przypomnieniem na telefonie.
      </p>

      <div className="border border-white/8 bg-white/[0.02] p-6">
        <div className="mb-5 flex items-start gap-4">
          <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-white/15" />
          <div>
            <p className="text-xs font-light text-white/50">
              Status: <span className="text-white/25">Niepołączono</span>
            </p>
            <p className="mt-1 text-xs font-light text-white/25">
              Połącz konto Google, aby automatycznie synchronizować wizyty.
            </p>
          </div>
        </div>

        <div className="mb-6 space-y-2.5">
          {FEATURES.map((feature) => (
            <div key={feature} className="flex items-center gap-2.5">
              <div className="h-px w-3 bg-white/15" />
              <p className="text-xs font-light text-white/30">{feature}</p>
            </div>
          ))}
        </div>

        <button
          disabled
          className="border border-white/10 px-5 py-2.5 text-xs font-light tracking-[0.15em] text-white/30 uppercase transition-colors outline-none disabled:cursor-not-allowed"
          title="Wkrótce dostępne"
        >
          Połącz z Google Calendar
        </button>
      </div>

      <p className="mt-3 text-[10px] font-light text-white/15">
        Integracja wymaga konta Google. Dane wizyt nie są udostępniane osobom
        trzecim. Funkcja wkrótce dostępna.
      </p>
    </section>
  )
}
