import { FiltersNav } from "@/components/ui/filters-nav"
import { CLIENT_FILTERS } from "../constants"
import type { ClientCounts, ClientFilter } from "../types"

type Props = {
  current: ClientFilter
  counts: ClientCounts
  searchQuery?: string
}

export function ClientFilters({ current, counts, searchQuery }: Props) {
  const extraQuery = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""
  return (
    <FiltersNav
      filters={CLIENT_FILTERS}
      current={current}
      counts={counts}
      ariaLabel="Filtruj klientki"
      paramName="filter"
      className="mb-8"
      extraQuery={extraQuery}
    />
  )
}
