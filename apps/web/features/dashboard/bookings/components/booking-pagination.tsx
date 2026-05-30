import { ListPagination } from "@/components/ui/list-pagination"
import type { AdminStatusFilter } from "../types"

type Props = {
  page: number
  pages: number
  total: number
  status: AdminStatusFilter
  searchQuery?: string
}

export function BookingPagination({
  page,
  pages,
  total,
  status,
  searchQuery,
}: Props) {
  const parts: string[] = []
  if (status !== "all") parts.push(`status=${status}`)
  if (searchQuery) parts.push(`q=${encodeURIComponent(searchQuery)}`)
  const extraQuery = parts.length ? `&${parts.join("&")}` : ""
  return (
    <ListPagination
      page={page}
      pages={pages}
      total={total}
      extraQuery={extraQuery}
      ariaLabel="Paginacja wizyt"
    />
  )
}
