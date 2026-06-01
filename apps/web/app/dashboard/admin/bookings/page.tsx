import type { Metadata } from "next"
import { Suspense } from "react"
import {
  getAdminBookingsPage,
  getAdminBookingCounts,
} from "@/features/dashboard/bookings/actions"
import { BookingFilters } from "@/features/dashboard/bookings/components/booking-filters"
import { BookingList } from "@/features/dashboard/bookings/components/booking-list"
import { BookingPagination } from "@/features/dashboard/bookings/components/booking-pagination"
import { BookingSearch } from "@/features/dashboard/bookings/components/booking-search"
import type { AdminStatusFilter } from "@/features/dashboard/bookings/types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = { title: "Wizyty" }

function parseStatus(raw: string | undefined): AdminStatusFilter {
  if (
    raw === "pending" ||
    raw === "confirmed" ||
    raw === "completed" ||
    raw === "cancelled"
  )
    return raw
  return "all"
}

function parsePage(raw: string | undefined): number {
  const n = parseInt(raw ?? "1")
  return Number.isFinite(n) && n > 0 ? n : 1
}

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; q?: string }>
}) {
  const { page: pageParam, status: statusParam, q } = await searchParams
  const page = parsePage(pageParam)
  const status = parseStatus(statusParam)
  const query = q?.trim() || undefined

  const [data, counts] = await Promise.all([
    getAdminBookingsPage({ page, status, query }),
    getAdminBookingCounts(),
  ])

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Zarządzanie
        </p>
        <h1 className="mb-8 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Wizyty
        </h1>
        <BookingFilters current={status} counts={counts} searchQuery={query} />
        <Suspense>
          <BookingSearch />
        </Suspense>
        <BookingList
          bookings={data.bookings}
          hasActiveFilters={status !== "all" || !!query}
        />
        <BookingPagination
          page={page}
          pages={data.pages}
          total={data.total}
          status={status}
          searchQuery={query}
        />
      </div>
    </div>
  )
}
