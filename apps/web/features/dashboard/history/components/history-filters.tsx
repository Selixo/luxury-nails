import { FiltersNav, type FilterOption } from "@/components/ui/filters-nav"
import type { HistoryStatus } from "../types"

const FILTERS: FilterOption<HistoryStatus>[] = [
  { id: "all", label: "Wszystkie" },
  { id: "completed", label: "Zakończone" },
  { id: "cancelled", label: "Anulowane" },
]

type Props = {
  current: HistoryStatus
  counts: Record<HistoryStatus, number>
}

export function HistoryFilters({ current, counts }: Props) {
  return (
    <FiltersNav
      filters={FILTERS}
      current={current}
      counts={counts}
      ariaLabel="Filtruj wizyty"
      className="mb-6"
    />
  )
}
