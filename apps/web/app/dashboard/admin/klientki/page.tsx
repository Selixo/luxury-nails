"use client"

import { useState } from "react"
import { cn } from "@workspace/ui/lib/utils"

type ClientFilter = "all" | "active" | "banned" | "watch"

type Client = {
  id: string
  name: string
  phone: string
  since: string
  lastVisit: string
  totalVisits: number
  noShows: number
  note?: string
}

type BanRecord = {
  reason: string
  note: string
  bannedAt: string
}

const CLIENTS: Client[] = [
  {
    id: "c01",
    name: "Aleksandra Wróbel",
    phone: "+48 *** *** 789",
    since: "Kwiecień 2024",
    lastVisit: "14 maja 2025",
    totalVisits: 22,
    noShows: 0,
  },
  {
    id: "c02",
    name: "Zuzanna Karpik",
    phone: "+48 *** *** 456",
    since: "Maj 2024",
    lastVisit: "22 maja 2025",
    totalVisits: 15,
    noShows: 1,
    note: "Preferuje krótkie paznokcie",
  },
  {
    id: "c03",
    name: "Karolina Wiśniewska",
    phone: "+48 *** *** 234",
    since: "Czerwiec 2024",
    lastVisit: "19 maja 2025",
    totalVisits: 12,
    noShows: 0,
  },
  {
    id: "c04",
    name: "Anna Kowalska",
    phone: "+48 *** *** 567",
    since: "Styczeń 2025",
    lastVisit: "21 maja 2025",
    totalVisits: 8,
    noShows: 0,
  },
  {
    id: "c05",
    name: "Natalia Brzezińska",
    phone: "+48 *** *** 123",
    since: "Luty 2025",
    lastVisit: "16 maja 2025",
    totalVisits: 6,
    noShows: 2,
    note: "Dwa razy nie pojawiła się bez info",
  },
  {
    id: "c06",
    name: "Monika Nowak",
    phone: "+48 *** *** 890",
    since: "Marzec 2025",
    lastVisit: "21 maja 2025",
    totalVisits: 3,
    noShows: 0,
  },
  {
    id: "c07",
    name: "Joanna Mazur",
    phone: "+48 *** *** 112",
    since: "Kwiecień 2025",
    lastVisit: "22 maja 2025",
    totalVisits: 2,
    noShows: 3,
  },
  {
    id: "c08",
    name: "Paulina Szymańska",
    phone: "+48 *** *** 335",
    since: "Maj 2025",
    lastVisit: "8 maja 2025",
    totalVisits: 1,
    noShows: 0,
  },
]

const BAN_REASONS = [
  "Nieobecność bez zgłoszenia (3+)",
  "Nieodpowiednie zachowanie",
  "Brak płatności",
  "Inny powód",
]

const FILTERS: { id: ClientFilter; label: string }[] = [
  { id: "all", label: "Wszystkie" },
  { id: "active", label: "Aktywne" },
  { id: "banned", label: "Zablokowane" },
  { id: "watch", label: "Do sprawdzenia" },
]

function VisitsBadge({ count }: { count: number }) {
  const tiers = [
    { min: 20, label: "Stała klientka", style: "border-gold/35 text-gold/70" },
    {
      min: 10,
      label: "Lojalna",
      style: "border-emerald-400/25 text-emerald-400/60",
    },
    { min: 5, label: "Regularna", style: "border-white/15 text-white/45" },
  ]
  const tier = tiers.find((t) => count >= t.min)
  if (!tier) return null
  return (
    <span
      className={`rounded-sm border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase ${tier.style}`}
    >
      {tier.label}
    </span>
  )
}

export default function KlientkiPage() {
  const [activeFilter, setActiveFilter] = useState<ClientFilter>("all")
  const [search, setSearch] = useState("")
  const [bannedMap, setBannedMap] = useState<Map<string, BanRecord>>(new Map())
  const [banForm, setBanForm] = useState<{
    id: string
    reason: string
    note: string
  } | null>(null)
  const [unbanConfirm, setUnbanConfirm] = useState<string | null>(null)

  function isBanned(id: string) {
    return bannedMap.has(id)
  }

  function submitBan(id: string, reason: string, note: string) {
    setBannedMap((prev) => {
      const next = new Map(prev)
      next.set(id, {
        reason,
        note,
        bannedAt: new Intl.DateTimeFormat("pl-PL", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date()),
      })
      return next
    })
    setBanForm(null)
  }

  function unban(id: string) {
    setBannedMap((prev) => {
      const next = new Map(prev)
      next.delete(id)
      return next
    })
    setUnbanConfirm(null)
  }

  const matchesSearch = (c: Client) =>
    search === "" ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)

  const filtered = CLIENTS.filter((c) => {
    if (!matchesSearch(c)) return false
    if (activeFilter === "banned") return isBanned(c.id)
    if (activeFilter === "active") return !isBanned(c.id)
    if (activeFilter === "watch") return c.noShows >= 2
    return true
  })

  const watchCount = CLIENTS.filter((c) => c.noShows >= 2).length
  const bannedCount = bannedMap.size

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Zarządzanie
        </p>
        <h1 className="mb-2 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Klientki
        </h1>
        <p className="mb-8 text-sm font-light text-white/30">
          {CLIENTS.length} zarejestrowanych
        </p>

        {/* Search */}
        <div className="mb-5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj po imieniu lub numerze telefonu..."
            className="w-full border border-white/8 bg-white/[0.02] px-4 py-3 text-sm font-light text-white/70 transition-colors outline-none placeholder:text-white/20 focus:border-white/15"
          />
        </div>

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filtruj klientki"
          className="mb-8 flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => {
            const count =
              f.id === "banned"
                ? bannedCount
                : f.id === "watch"
                  ? watchCount
                  : f.id === "active"
                    ? CLIENTS.length - bannedCount
                    : null
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
                className={cn(
                  "rounded-sm border px-3 py-1.5 text-xs font-light tracking-[0.15em] uppercase transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-gold/50",
                  activeFilter === f.id
                    ? "border-gold/40 bg-gold/10 text-gold"
                    : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                )}
              >
                {f.label}
                {count !== null && (
                  <span className="ml-1.5 text-white/25">{count}</span>
                )}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col divide-y divide-white/5 border border-white/8">
          {filtered.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-light text-white/25">Brak klientek</p>
            </div>
          ) : (
            filtered.map((client) => {
              const banned = isBanned(client.id)
              const banRecord = bannedMap.get(client.id)
              const isBanFormOpen = banForm?.id === client.id
              const isUnbanConfirming = unbanConfirm === client.id

              return (
                <div
                  key={client.id}
                  className={cn(
                    "flex flex-col gap-3 px-6 py-5 transition-opacity sm:flex-row sm:items-start sm:justify-between",
                    banned && "opacity-60"
                  )}
                >
                  {/* Left */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex flex-wrap items-center gap-2">
                      <p className="text-sm font-light text-white/80">
                        {client.name}
                      </p>
                      <VisitsBadge count={client.totalVisits} />
                      {banned && (
                        <span className="rounded-sm border border-red-400/30 px-2 py-0.5 text-[10px] tracking-[0.15em] text-red-400/70 uppercase">
                          Zablokowana
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-light text-white/30">
                      {client.phone}
                    </p>

                    {/* No-show warning */}
                    {client.noShows >= 2 && !banned && (
                      <p
                        className={cn(
                          "mt-1.5 text-xs font-light",
                          client.noShows >= 3
                            ? "text-red-400/70"
                            : "text-amber-400/65"
                        )}
                      >
                        ⚠ {client.noShows} nieobecności bez zgłoszenia
                      </p>
                    )}

                    {/* Ban record details */}
                    {banned && banRecord && (
                      <div className="mt-2 space-y-0.5">
                        <p className="text-xs font-light text-red-400/50">
                          Powód: {banRecord.reason}
                        </p>
                        {banRecord.note && (
                          <p className="text-xs font-light text-white/25 italic">
                            {banRecord.note}
                          </p>
                        )}
                        <p className="text-[10px] font-light text-white/20">
                          Zablokowana {banRecord.bannedAt}
                        </p>
                      </div>
                    )}

                    {/* Admin note */}
                    {client.note && !banned && (
                      <p className="mt-1 text-xs font-light text-white/30 italic">
                        {client.note}
                      </p>
                    )}

                    {/* Ban form */}
                    {isBanFormOpen && banForm && (
                      <div className="mt-3 border border-red-400/15 bg-red-400/[0.02] p-4">
                        <p className="mb-3 text-[10px] font-light tracking-[0.2em] text-white/30 uppercase">
                          Powód blokady
                        </p>
                        <div className="mb-3 flex flex-wrap gap-2">
                          {BAN_REASONS.map((r) => (
                            <button
                              key={r}
                              onClick={() =>
                                setBanForm({ ...banForm, reason: r })
                              }
                              className={cn(
                                "rounded-sm border px-3 py-1.5 text-xs font-light transition-colors outline-none",
                                banForm.reason === r
                                  ? "border-red-400/40 bg-red-400/10 text-red-400/80"
                                  : "border-white/10 text-white/35 hover:border-white/20 hover:text-white/55"
                              )}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={banForm.note}
                          onChange={(e) =>
                            setBanForm({ ...banForm, note: e.target.value })
                          }
                          placeholder="Dodatkowa notatka (opcjonalnie)..."
                          rows={2}
                          className="w-full resize-none border border-white/8 bg-white/[0.02] px-3 py-2 text-xs font-light text-white/60 transition-colors outline-none placeholder:text-white/20 focus:border-white/15"
                        />
                        <div className="mt-3 flex items-center gap-4">
                          <button
                            onClick={() =>
                              submitBan(client.id, banForm.reason, banForm.note)
                            }
                            disabled={!banForm.reason}
                            className="border border-red-400/25 bg-red-400/5 px-3 py-1.5 text-xs font-light tracking-[0.1em] text-red-400/80 uppercase transition-colors outline-none hover:border-red-400/45 hover:bg-red-400/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Zablokuj
                          </button>
                          <button
                            onClick={() => setBanForm(null)}
                            className="text-xs font-light text-white/25 transition-colors outline-none hover:text-white/50"
                          >
                            Anuluj
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Unban confirmation */}
                    {isUnbanConfirming && (
                      <div className="mt-2.5 flex items-center gap-3">
                        <span className="text-xs font-light text-white/40">
                          Odblokować klientkę?
                        </span>
                        <button
                          onClick={() => unban(client.id)}
                          className="text-xs font-light text-emerald-400/70 transition-colors outline-none hover:text-emerald-400"
                        >
                          Odblokuj
                        </button>
                        <button
                          onClick={() => setUnbanConfirm(null)}
                          className="text-xs font-light text-white/25 transition-colors outline-none hover:text-white/50"
                        >
                          Anuluj
                        </button>
                      </div>
                    )}

                    {/* Action trigger */}
                    {!isBanFormOpen && !isUnbanConfirming && (
                      <div className="mt-2.5">
                        {banned ? (
                          <button
                            onClick={() => setUnbanConfirm(client.id)}
                            className="text-xs font-light text-white/20 transition-colors outline-none hover:text-emerald-400/60"
                          >
                            Odblokuj
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              setBanForm({
                                id: client.id,
                                reason: "",
                                note: "",
                              })
                            }
                            className="text-xs font-light text-white/20 transition-colors outline-none hover:text-red-400/60"
                          >
                            Zablokuj
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right: stats */}
                  <div className="flex shrink-0 flex-row gap-6 sm:flex-col sm:items-end sm:gap-1.5">
                    <div className="text-right">
                      <p className="font-display text-lg font-light text-gold/80">
                        {client.totalVisits}
                      </p>
                      <p className="text-[10px] font-light tracking-[0.15em] text-white/25 uppercase">
                        wizyt
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-light text-white/50">
                        {client.lastVisit}
                      </p>
                      <p className="text-[10px] font-light text-white/20">
                        ostatnia wizyta
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-light text-white/35">
                        {client.since}
                      </p>
                      <p className="text-[10px] font-light text-white/20">
                        klientka od
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <p className="mt-4 text-xs font-light text-white/20">
          {filtered.length} {filtered.length === 1 ? "klientka" : "klientek"}
        </p>
      </div>
    </div>
  )
}
