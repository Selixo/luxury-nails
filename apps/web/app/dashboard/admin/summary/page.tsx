import type { Metadata } from "next"
import { getSummaryData } from "@/features/dashboard/summary/actions"
import {
  parseMonthParam,
  getAvailableMonths,
} from "@/features/dashboard/summary/utils"
import { StatCard } from "@/features/dashboard/summary/components/stat-card"
import { MonthSelector } from "@/features/dashboard/summary/components/month-selector"
import { CategoryBars } from "@/features/dashboard/summary/components/category-bars"
import { TopClients } from "@/features/dashboard/summary/components/top-clients"
import { RevenueChart } from "@/features/dashboard/summary/components/revenue-chart"
import { MonthComparison } from "@/features/dashboard/summary/components/month-comparison"
import { ServiceBreakdown } from "@/features/dashboard/summary/components/service-breakdown"
import { PeakStats } from "@/features/dashboard/summary/components/peak-stats"
import { ExportButtons } from "@/features/dashboard/summary/components/export-buttons"

export const dynamic = "force-dynamic"

export const metadata: Metadata = { title: "Summary" }

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border border-white/8 bg-white/[0.02] p-6">
      <p className="mb-6 text-xs font-light tracking-[0.25em] text-white/50 uppercase">
        {title}
      </p>
      {children}
    </div>
  )
}

export default async function SummaryPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>
}) {
  const { month: monthParam } = await searchParams
  const { year, month } = parseMonthParam(monthParam)
  const availableMonths = getAvailableMonths()
  const currentMonthValue = `${year}-${String(month).padStart(2, "0")}`

  const currentMonthLabel =
    availableMonths.find((m) => m.value === currentMonthValue)?.label ??
    new Date(year, month - 1).toLocaleDateString("pl-PL", {
      month: "long",
      year: "numeric",
    })

  const prevMonthLabel =
    availableMonths.find((_, i) => {
      const val = availableMonths[i]?.value
      const [y, m] = (val ?? "").split("-").map(Number)
      const prev = new Date(year, month - 2, 1)
      return y === prev.getFullYear() && m === prev.getMonth() + 1
    })?.label ??
    new Date(year, month - 2).toLocaleDateString("pl-PL", {
      month: "long",
      year: "numeric",
    })

  const data = await getSummaryData(year, month)

  const retentionPct =
    data.completedCount > 0
      ? Math.round((data.returningCount / data.completedCount) * 100)
      : 0

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
              Raport
            </p>
            <h1 className="font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
              Podsumowanie
            </h1>
          </div>
          <ExportButtons
            monthLabel={currentMonthLabel}
            monthParam={currentMonthValue}
            revenue={data.revenue}
            completedCount={data.completedCount}
            avgValue={data.avgValue}
            cancelledCount={data.cancelledCount}
            bookingsList={data.bookingsList}
            perService={data.perService}
          />
        </div>

        <MonthSelector months={availableMonths} current={currentMonthValue} />

        <div className="mb-6 grid grid-cols-2 gap-px border border-white/5 bg-white/5 lg:grid-cols-4">
          <StatCard
            label="Przychód"
            value={`${data.revenue} zł`}
            accent="gold"
            trend={
              data.revenueChange != null ? { value: data.revenueChange } : null
            }
          />
          <StatCard
            label="Ukończone wizyty"
            value={String(data.completedCount)}
            sub={
              data.avgValue > 0 ? `śr. ${data.avgValue} zł / wizyta` : undefined
            }
          />
          <StatCard
            label="Powracające"
            value={String(data.returningCount)}
            sub={retentionPct > 0 ? `${retentionPct}% wizyt` : undefined}
          />
          <StatCard
            label="Anulowane"
            value={String(data.cancelledCount)}
            accent={data.cancelledCount >= 3 ? "red" : undefined}
          />
        </div>

        <div className="mb-6">
          <Section title="Przychód — ostatnie 6 miesięcy">
            <RevenueChart data={data.chart} />
          </Section>
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <Section title={`Porównanie z ${prevMonthLabel}`}>
            <MonthComparison
              currentLabel={currentMonthLabel}
              prevLabel={prevMonthLabel}
              current={{
                revenue: data.revenue,
                completedCount: data.completedCount,
              }}
              prev={data.prevMonth}
            />
          </Section>
          <Section title="Przychód wg kategorii">
            <CategoryBars categories={data.categories} />
          </Section>
        </div>

        <div className="mb-6">
          <Section title="Szczytowe dni i godziny">
            <PeakStats days={data.peakDays} hours={data.peakHours} />
          </Section>
        </div>

        <div className="mb-6">
          <Section title="Zestawienie per usługa">
            <ServiceBreakdown services={data.perService} />
          </Section>
        </div>

        <Section title={`Top klientki · ${currentMonthLabel}`}>
          <TopClients
            clients={data.topClients}
            monthLabel={currentMonthLabel}
          />
        </Section>
      </div>
    </div>
  )
}
