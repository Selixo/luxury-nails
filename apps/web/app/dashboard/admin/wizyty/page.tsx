"use client"

import { useState } from "react"
import { cn } from "@workspace/ui/lib/utils"

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled"

type Booking = {
  id: string
  client: string
  phone: string
  service: string
  date: string
  time: string
  status: BookingStatus
  notes?: string
}

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "b07",
    client: "Anna Kowalska",
    phone: "+48 *** *** 567",
    service: "Manicure hybrydowy",
    date: "21 maja 2025",
    time: "11:00",
    status: "confirmed",
  },
  {
    id: "b06",
    client: "Monika Nowak",
    phone: "+48 *** *** 890",
    service: "Hybryda z zdobieniem",
    date: "21 maja 2025",
    time: "13:30",
    status: "pending",
    notes: "Prosi o wzór kwiatowy",
  },
  {
    id: "b05",
    client: "Joanna Mazur",
    phone: "+48 *** *** 112",
    service: "Nail Art 3D",
    date: "22 maja 2025",
    time: "10:30",
    status: "pending",
  },
  {
    id: "b04",
    client: "Zuzanna Karpik",
    phone: "+48 *** *** 456",
    service: "Przedłużanie żelem",
    date: "22 maja 2025",
    time: "14:00",
    status: "confirmed",
  },
  {
    id: "b03",
    client: "Karolina Wiśniewska",
    phone: "+48 *** *** 234",
    service: "Żel na naturalną płytkę",
    date: "19 maja 2025",
    time: "12:00",
    status: "completed",
  },
  {
    id: "b02",
    client: "Natalia Brzezińska",
    phone: "+48 *** *** 123",
    service: "Manicure klasyczny",
    date: "16 maja 2025",
    time: "09:00",
    status: "completed",
  },
  {
    id: "b01",
    client: "Aleksandra Wróbel",
    phone: "+48 *** *** 789",
    service: "Hybryda chrome",
    date: "14 maja 2025",
    time: "16:00",
    status: "cancelled",
    notes: "Anulowane z powodu choroby",
  },
]

const FILTERS: { id: BookingStatus | "all"; label: string }[] = [
  { id: "all", label: "Wszystkie" },
  { id: "pending", label: "Oczekujące" },
  { id: "confirmed", label: "Potwierdzone" },
  { id: "completed", label: "Zakończone" },
  { id: "cancelled", label: "Anulowane" },
]

const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: "Oczekuje",
  confirmed: "Potwierdzona",
  completed: "Zakończona",
  cancelled: "Anulowana",
}

const STATUS_STYLE: Record<BookingStatus, string> = {
  pending: "border-amber-400/30 text-amber-400/70",
  confirmed: "border-emerald-400/25 text-emerald-400/65",
  completed: "border-gold/25 text-gold/60",
  cancelled: "border-red-400/25 text-red-400/55",
}

export default function WizytyPage() {
  const [active, setActive] = useState<BookingStatus | "all">("all")
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS)
  const [stylistNotes, setStylistNotes] = useState<Map<string, string>>(
    new Map()
  )
  const [editingNote, setEditingNote] = useState<{
    id: string
    draft: string
  } | null>(null)

  const filtered =
    active === "all" ? bookings : bookings.filter((b) => b.status === active)

  function updateStatus(id: string, status: BookingStatus) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  function saveNote(id: string, text: string) {
    setStylistNotes((prev) => {
      const next = new Map(prev)
      if (text.trim()) next.set(id, text.trim())
      else next.delete(id)
      return next
    })
    setEditingNote(null)
  }

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Zarządzanie
        </p>
        <h1 className="mb-8 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Wizyty
        </h1>

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filtruj wizyty"
          className="mb-8 flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={active === f.id}
              onClick={() => setActive(f.id)}
              className={cn(
                "rounded-sm border px-3 py-1.5 text-xs font-light tracking-[0.15em] uppercase transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-gold/50",
                active === f.id
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              )}
            >
              {f.label}
              {f.id !== "all" && (
                <span className="ml-1.5 text-white/25">
                  {bookings.filter((b) => b.status === f.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="flex flex-col divide-y divide-white/5 border border-white/8">
          {filtered.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-light text-white/25">Brak wizyt</p>
            </div>
          ) : (
            filtered.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="text-sm font-light text-white/85">
                      {booking.client}
                    </p>
                    <span
                      className={cn(
                        "rounded-sm border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase",
                        STATUS_STYLE[booking.status]
                      )}
                    >
                      {STATUS_LABEL[booking.status]}
                    </span>
                  </div>
                  <p className="text-xs font-light text-white/45">
                    {booking.service}
                  </p>
                  <p className="mt-0.5 text-xs font-light text-white/25">
                    {booking.phone}
                  </p>
                  {booking.notes && (
                    <p className="mt-1.5 text-xs font-light text-white/30 italic">
                      {booking.notes}
                    </p>
                  )}

                  {/* Action buttons for pending */}
                  {booking.status === "pending" && (
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => updateStatus(booking.id, "confirmed")}
                        className="rounded-sm border border-emerald-400/25 bg-emerald-400/5 px-3 py-1.5 text-xs font-light tracking-[0.1em] text-emerald-400/80 uppercase transition-colors outline-none hover:border-emerald-400/45 hover:bg-emerald-400/10 hover:text-emerald-400 focus-visible:ring-1 focus-visible:ring-emerald-400/40"
                      >
                        Potwierdź
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "cancelled")}
                        className="rounded-sm border border-red-400/20 bg-red-400/5 px-3 py-1.5 text-xs font-light tracking-[0.1em] text-red-400/70 uppercase transition-colors outline-none hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-400/90 focus-visible:ring-1 focus-visible:ring-red-400/40"
                      >
                        Anuluj
                      </button>
                    </div>
                  )}

                  {/* Notatka stylisty — tylko dla zakończonych */}
                  {booking.status === "completed" && (
                    <div className="mt-3">
                      {editingNote?.id === booking.id ? (
                        <div className="flex flex-col gap-2">
                          <textarea
                            autoFocus
                            value={editingNote.draft}
                            onChange={(e) =>
                              setEditingNote({
                                id: booking.id,
                                draft: e.target.value,
                              })
                            }
                            placeholder="Kształt, kolor, długość, reakcje na produkty..."
                            rows={2}
                            className="w-full resize-none border border-white/10 bg-white/[0.02] px-3 py-2 text-xs font-light text-white/60 transition-colors outline-none placeholder:text-white/20 focus:border-white/20"
                          />
                          <div className="flex gap-3">
                            <button
                              onClick={() =>
                                saveNote(booking.id, editingNote.draft)
                              }
                              className="text-xs font-light text-gold/60 transition-colors outline-none hover:text-gold"
                            >
                              Zapisz
                            </button>
                            <button
                              onClick={() => setEditingNote(null)}
                              className="text-xs font-light text-white/20 transition-colors outline-none hover:text-white/50"
                            >
                              Anuluj
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2">
                          {stylistNotes.get(booking.id) ? (
                            <p className="flex-1 text-xs font-light text-white/35 italic">
                              {stylistNotes.get(booking.id)}
                            </p>
                          ) : (
                            <p className="flex-1 text-xs font-light text-white/15 italic">
                              Brak notatki
                            </p>
                          )}
                          <button
                            onClick={() =>
                              setEditingNote({
                                id: booking.id,
                                draft: stylistNotes.get(booking.id) ?? "",
                              })
                            }
                            className="shrink-0 text-[10px] font-light tracking-[0.1em] text-white/20 uppercase transition-colors outline-none hover:text-white/50"
                          >
                            {stylistNotes.get(booking.id)
                              ? "Edytuj"
                              : "+ Notatka"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="shrink-0 text-xs font-light text-white/40 sm:text-right">
                  {booking.date}
                  <br />
                  <span className="text-white/60">{booking.time}</span>
                </p>
              </div>
            ))
          )}
        </div>

        <p className="mt-4 text-xs font-light text-white/20">
          {filtered.length} {filtered.length === 1 ? "wizyta" : "wizyt"}
        </p>
      </div>
    </div>
  )
}
