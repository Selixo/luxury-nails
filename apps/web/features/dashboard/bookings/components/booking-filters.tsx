import { FiltersNav, type FilterOption } from "@/components/ui/filters-nav"
import type { AdminStatusFilter } from "../types"

const FILTERS: FilterOption<AdminStatusFilter>[] = [
  { id: "all", label: "Wszystkie" },
  { id: "pending", label: "Oczekujące" },
  { id: "confirmed", label: "Potwierdzone" },
  { id: "completed", label: "Zakończone" },
  { id: "cancelled", label: "Anulowane" },
]

type Props = {
  current: AdminStatusFilter
  counts: Record<AdminStatusFilter, number>
  searchQuery?: string
}

export function BookingFilters({ current, counts, searchQuery }: Props) {
  const extraQuery = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""
  return (
    <FiltersNav
      filters={FILTERS}
      current={current}
      counts={counts}
      ariaLabel="Filtruj wizyty"
      className="mb-8"
      extraQuery={extraQuery}
    />
  )
}
