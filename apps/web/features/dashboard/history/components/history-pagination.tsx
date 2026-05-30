import { ListPagination } from "@/components/ui/list-pagination"
import type { HistoryStatus } from "../types"

type Props = {
  page: number
  pages: number
  total: number
  status: HistoryStatus
}

export function HistoryPagination({ page, pages, total, status }: Props) {
  const extraQuery = status !== "all" ? `&status=${status}` : ""
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
