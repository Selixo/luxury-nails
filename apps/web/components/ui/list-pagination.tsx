import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { getPageNumbers } from "@/lib/pagination"

type Props = {
  page: number
  pages: number
  total: number

  extraQuery?: string
  ariaLabel?: string
  formatTotal?: (total: number) => string
}

export function ListPagination({
  page,
  pages,
  total,
  extraQuery = "",
  ariaLabel = "Paginacja",
  formatTotal,
}: Props) {
  if (pages <= 1) return null

  const prevHref = page > 1 ? `?page=${page - 1}${extraQuery}` : null
  const nextHref = page < pages ? `?page=${page + 1}${extraQuery}` : null
  const pageNumbers = getPageNumbers(page, pages)

  return (
    <nav
      aria-label={ariaLabel}
      className="mt-6 flex items-center justify-between gap-4"
    >
      <p className="text-xs font-light text-white/50 tabular-nums">
        Strona {page} z {pages} ·{" "}
        {formatTotal
          ? formatTotal(total)
          : `${total} ${total === 1 ? "wizyta" : "wizyt"}`}
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
                href={`?page=${p}${extraQuery}`}
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
