import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { getPageNumbers } from "@/lib/pagination"
import type { HistoryStatus } from "../types"

type Props = {
  page: number
  pages: number
  total: number
  status: HistoryStatus
}

type PaginationLinks = {
  statusParam: string
  prevHref: string | null
  nextHref: string | null
  pageNumbers: (number | null)[]
}

function buildPaginationLinks(
  page: number,
  pages: number,
  status: HistoryStatus
): PaginationLinks {
  const statusParam = status !== "all" ? `&status=${status}` : ""
  return {
    statusParam,
    prevHref: page > 1 ? `?page=${page - 1}${statusParam}` : null,
    nextHref: page < pages ? `?page=${page + 1}${statusParam}` : null,
    pageNumbers: getPageNumbers(page, pages),
  }
}

export function HistoryPagination({ page, pages, total, status }: Props) {
  if (pages <= 1) return null

  const { statusParam, prevHref, nextHref, pageNumbers } = buildPaginationLinks(
    page,
    pages,
    status
  )

  return (
    <nav
      aria-label="Paginacja wizyt"
      className="mt-6 flex items-center justify-between gap-4"
    >
      <p className="text-xs font-light text-white/50 tabular-nums">
        Strona {page} z {pages} · {total} {total === 1 ? "wizyta" : "wizyt"}
      </p>

      <ul className="flex items-center gap-1">
        <li>
          {prevHref ? (
            <Link
              href={prevHref}
              aria-label="Poprzednia strona"
              className="flex h-7 w-7 items-center justify-center border border-white/10 text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
            >
              <ChevronLeft size={13} aria-hidden="true" />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="flex h-7 w-7 items-center justify-center border border-white/5 text-white/15"
            >
              <ChevronLeft size={13} aria-hidden="true" />
            </span>
          )}
        </li>

        {pageNumbers.map((p, i) => (
          <li key={p ?? `ellipsis-${i}`}>
            {p === null ? (
              <span className="flex h-7 w-7 items-center justify-center text-xs text-white/20">
                …
              </span>
            ) : (
              <Link
                href={`?page=${p}${statusParam}`}
                aria-label={`Strona ${p}`}
                aria-current={p === page ? "page" : undefined}
                className={cn(
                  "flex h-7 w-7 items-center justify-center border text-xs font-light transition-colors",
                  p === page
                    ? "border-gold/40 bg-gold/10 text-gold"
                    : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                )}
              >
                {p}
              </Link>
            )}
          </li>
        ))}

        <li>
          {nextHref ? (
            <Link
              href={nextHref}
              aria-label="Następna strona"
              className="flex h-7 w-7 items-center justify-center border border-white/10 text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
            >
              <ChevronRight size={13} aria-hidden="true" />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="flex h-7 w-7 items-center justify-center border border-white/5 text-white/15"
            >
              <ChevronRight size={13} aria-hidden="true" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}
