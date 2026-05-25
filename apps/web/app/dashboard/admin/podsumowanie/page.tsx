"use client"

import { useState } from "react"
import { cn } from "@workspace/ui/lib/utils"

type Month = "may" | "april"

type MonthData = {
  label: string
  revenue: number
  visits: number
  newClients: number
  cancellations: number
  noShows: number
  avgValue: number
  categories: { name: string; value: number; pct: number }[]
  topClients: { name: string; visits: number; revenue: number }[]
}

const DATA: Record<Month, MonthData> = {
  may: {
    label: "Maj 2025",
    revenue: 1580,
    visits: 11,
    newClients: 2,
    cancellations: 1,
    noShows: 3,
    avgValue: 144,
    categories: [
      { name: "Manicure", value: 450, pct: 28 },
      { name: "Żel & Hybryda", value: 510, pct: 32 },
      { name: "Przedłużanie", value: 440, pct: 28 },
      { name: "Zdobienia", value: 180, pct: 11 },
    ],
    topClients: [
      { name: "Aleksandra Wróbel", visits: 3, revenue: 480 },
      { name: "Zuzanna Karpik", visits: 2, revenue: 320 },
      { name: "Anna Kowalska", visits: 2, revenue: 220 },
    ],
  },
  april: {
    label: "Kwiecień 2025",
    revenue: 1240,
    visits: 9,
    newClients: 1,
    cancellations: 2,
    noShows: 1,
    avgValue: 138,
    categories: [
      { name: "Manicure", value: 380, pct: 31 },
      { name: "Żel & Hybryda", value: 420, pct: 34 },
      { name: "Przedłużanie", value: 310, pct: 25 },
      { name: "Zdobienia", value: 130, pct: 10 },
    ],
    topClients: [
      { name: "Aleksandra Wróbel", visits: 2, revenue: 350 },
      { name: "Karolina Wiśniewska", visits: 2, revenue: 280 },
      { name: "Zuzanna Karpik", visits: 2, revenue: 240 },
    ],
  },
}

const MONTHS: { id: Month; label: string }[] = [
  { id: "may", label: "Maj 2025" },
  { id: "april", label: "Kwiecień 2025" },
]

type MetricCard = {
  label: string
  value: string
  sub?: string
  accent?: boolean
  warn?: boolean
}

export default function PodsumowaniePage() {
  const [month, setMonth] = useState<Month>("may")
  const data = DATA[month]

  const metrics: MetricCard[] = [
    { label: "Przychód", value: `${data.revenue} zł`, accent: true },
    {
      label: "Wizyty",
      value: String(data.visits),
      sub: `śr. ${data.avgValue} zł / wizyta`,
    },
    { label: "Nowe klientki", value: String(data.newClients) },
    {
      label: "Nieobecności",
      value: String(data.noShows),
      sub: `${data.cancellations} anulowane`,
      warn: data.noShows >= 3,
    },
  ]

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Raport
        </p>
        <h1 className="mb-8 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Podsumowanie
        </h1>

        {/* Month selector */}
        <div
          className="mb-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Wybierz miesiąc"
        >
          {MONTHS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMonth(m.id)}
              aria-pressed={month === m.id}
              className={cn(
                "rounded-sm border px-4 py-2 text-xs font-light tracking-[0.15em] uppercase transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-gold/50",
                month === m.id
                  ? "border-gold/50 bg-gold/10 text-gold"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Metric cards */}
        <div className="mb-10 grid grid-cols-2 gap-px border border-white/5 bg-white/5 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-[#09090b] px-6 py-5">
              <p className="mb-1.5 text-[10px] font-light tracking-[0.2em] text-white/25 uppercase">
                {m.label}
              </p>
              <p
                className={cn(
                  "font-display text-2xl font-light",
                  m.accent
                    ? "text-gold"
                    : m.warn
                      ? "text-red-400/80"
                      : "text-white/80"
                )}
              >
                {m.value}
              </p>
              {m.sub && (
                <p className="mt-0.5 text-[10px] font-light text-white/25">
                  {m.sub}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Revenue by category */}
        <div className="mb-10 border border-white/8 bg-white/[0.02] p-6">
          <p className="mb-6 text-xs font-light tracking-[0.25em] text-white/30 uppercase">
            Przychód wg kategorii
          </p>
          <div className="flex flex-col gap-4">
            {data.categories.map((cat) => (
              <div key={cat.name}>
                <div className="mb-1.5 flex items-center justify-between gap-4">
                  <p className="text-xs font-light text-white/55">{cat.name}</p>
                  <p className="shrink-0 text-xs font-light text-white/40">
                    {cat.value} zł
                  </p>
                </div>
                <div className="h-px w-full bg-white/5">
                  <div
                    className="h-full bg-gold/40 transition-all duration-500"
                    style={{ width: `${cat.pct}%` }}
                    role="progressbar"
                    aria-valuenow={cat.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${cat.name}: ${cat.pct}%`}
                  />
                </div>
                <p className="mt-1 text-[10px] font-light text-white/20">
                  {cat.pct}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top clients */}
        <div className="border border-white/8 bg-white/[0.02] p-6">
          <p className="mb-6 text-xs font-light tracking-[0.25em] text-white/30 uppercase">
            Top klientki w {data.label.toLowerCase()}
          </p>
          <div className="flex flex-col divide-y divide-white/5">
            {data.topClients.map((client, i) => (
              <div
                key={client.name}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg font-light text-white/15">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-light text-white/75">
                      {client.name}
                    </p>
                    <p className="text-xs font-light text-white/30">
                      {client.visits}{" "}
                      {client.visits === 1 ? "wizyta" : "wizyty"}
                    </p>
                  </div>
                </div>
                <p className="shrink-0 text-sm font-light text-gold/70">
                  {client.revenue} zł
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
