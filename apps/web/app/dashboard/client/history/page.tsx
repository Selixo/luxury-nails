import type { Metadata } from "next"
import {
  getHistoryPageData,
  getHistoryCounts,
} from "@/features/dashboard/history/actions"
import { StatsBar } from "@/features/dashboard/history/components/stats-bar"
import { VisitList } from "@/features/dashboard/history/components/visit-list"
import { HistoryFilters } from "@/features/dashboard/history/components/history-filters"
import { HistoryPagination } from "@/features/dashboard/history/components/history-pagination"
import type { HistoryStatus } from "@/features/dashboard/history/types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = { title: "Historia wizyt" }

function parseStatus(raw: string | undefined): HistoryStatus {
  if (raw === "completed" || raw === "cancelled") return raw
  return "all"
}

function parsePage(raw: string | undefined): number {
  const n = parseInt(raw ?? "1")
  return Number.isFinite(n) && n > 0 ? n : 1
}

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>
}) {
  const { page: pageParam, status: statusParam } = await searchParams
  const page = parsePage(pageParam)
  const status = parseStatus(statusParam)

  const [data, counts] = await Promise.all([
    getHistoryPageData({ page, status }),
    getHistoryCounts(),
  ])

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Historia
        </p>
        <h1 className="mb-10 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Twoje wizyty
        </h1>
        <StatsBar
          completedCount={data.allTimeCompletedCount}
          totalSpent={data.allTimeTotalSpent}
        />
        <HistoryFilters current={status} counts={counts} />
        <VisitList visits={data.visits} />
        <HistoryPagination
          page={page}
          pages={data.pages}
          total={data.total}
          status={status}
        />
      </div>
    </div>
  )
}
