import type { Metadata } from "next"
import { Suspense } from "react"
import { getAdminClientsPage } from "@/features/dashboard/clients/actions"
import { ClientFilters } from "@/features/dashboard/clients/components/client-filters"
import { ClientList } from "@/features/dashboard/clients/components/client-list"
import { ClientPagination } from "@/features/dashboard/clients/components/client-pagination"
import { ClientSearch } from "@/features/dashboard/clients/components/client-search"
import type { ClientFilter } from "@/features/dashboard/clients/types"

export const metadata: Metadata = { title: "Klientki" }

function parseFilter(raw: string | undefined): ClientFilter {
  if (raw === "active" || raw === "banned") return raw
  return "all"
}

function parsePage(raw: string | undefined): number {
  const n = parseInt(raw ?? "1")
  return Number.isFinite(n) && n > 0 ? n : 1
}

export default async function KlientkiPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; filter?: string; q?: string }>
}) {
  const { page: pageParam, filter: filterParam, q } = await searchParams
  const page = parsePage(pageParam)
  const filter = parseFilter(filterParam)
  const query = q?.trim() || undefined

  const data = await getAdminClientsPage({ filter, query, page })

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Zarządzanie
        </p>
        <h1 className="mb-8 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Klientki
        </h1>

        <ClientFilters
          current={filter}
          counts={data.counts}
          searchQuery={query}
        />

        <Suspense>
          <ClientSearch />
        </Suspense>

        <ClientList
          clients={data.clients}
          hasActiveFilters={filter !== "all" || !!query}
        />

        <ClientPagination
          page={page}
          pages={data.pages}
          total={data.total}
          filter={filter}
          searchQuery={query}
        />
      </div>
    </div>
  )
}
