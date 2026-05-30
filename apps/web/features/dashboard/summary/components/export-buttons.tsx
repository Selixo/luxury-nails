"use client"

import { Download, FileText } from "lucide-react"
import { useExport } from "../hooks/use-export"
import type { BookingLine, ServiceStat } from "../types"

type Props = {
  monthLabel: string
  monthParam: string
  revenue: number
  completedCount: number
  avgValue: number
  cancelledCount: number
  bookingsList: BookingLine[]
  perService: ServiceStat[]
}

export function ExportButtons({
  monthLabel,
  monthParam,
  bookingsList,
  perService,
}: Props) {
  const { pdfLoading, pdfError, downloadPdf, downloadCsv } = useExport({
    monthLabel,
    monthParam,
    bookingsList,
    perService,
  })

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-3">
        <button
          onClick={downloadPdf}
          disabled={pdfLoading}
          className="flex items-center gap-2 border border-white/10 px-4 py-2 text-xs font-light tracking-[0.1em] text-white/50 uppercase transition-colors hover:border-white/20 hover:text-white/70 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FileText size={12} aria-hidden="true" />
          {pdfLoading ? "Generowanie..." : "PDF"}
        </button>
        <button
          onClick={downloadCsv}
          className="flex items-center gap-2 border border-white/10 px-4 py-2 text-xs font-light tracking-[0.1em] text-white/50 uppercase transition-colors hover:border-white/20 hover:text-white/70"
        >
          <Download size={12} aria-hidden="true" />
          CSV
        </button>
      </div>
      {pdfError && <p className="text-xs text-red-400/80">{pdfError}</p>}
    </div>
  )
}
