import { ListPagination } from "@/components/ui/list-pagination"
import type { ClientFilter } from "../types"

type Props = {
  page: number
  pages: number
  total: number
  filter: ClientFilter
  searchQuery?: string
}

function formatTotal(total: number): string {
  if (total === 1) return "1 klientka"
  if (total >= 2 && total <= 4) return `${total} klientki`
  return `${total} klientek`
}

export function ClientPagination({
  page,
  pages,
  total,
  filter,
  searchQuery,
}: Props) {
  const parts: string[] = []
  if (filter !== "all") parts.push(`filter=${filter}`)
  if (searchQuery) parts.push(`q=${encodeURIComponent(searchQuery)}`)
  const extraQuery = parts.length ? `&${parts.join("&")}` : ""
  return (
    <ListPagination
      page={page}
      pages={pages}
      total={total}
      extraQuery={extraQuery}
      ariaLabel="Paginacja klientek"
      formatTotal={formatTotal}
    />
  )
}
