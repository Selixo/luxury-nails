"use client"

import { useState } from "react"
import type { BookingLine, ServiceStat } from "../types"

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function buildCsvContent(
  bookingsList: BookingLine[],
  perService: ServiceStat[]
): string {
  const row = (cells: string[]) => cells.map((c) => `"${c}"`).join(",")

  const bookingsHeader = row(["Data", "Klientka", "Usluga", "Kwota (zl)"])
  const bookingsRows = bookingsList
    .map((b) => row([b.date, b.clientName, b.service, String(b.price)]))
    .join("\n")

  const serviceHeader = row(["Usluga", "Wizyty", "Przychod (zl)"])
  const serviceRows = perService
    .map((s) => row([s.name, String(s.count), String(s.revenue)]))
    .join("\n")

  return `Zestawienie wizyt\n${bookingsHeader}\n${bookingsRows}\n\nPodsumowanie per usluga\n${serviceHeader}\n${serviceRows}`
}

type UseExportParams = {
  monthLabel: string
  monthParam: string
  bookingsList: BookingLine[]
  perService: ServiceStat[]
}

export function useExport({
  monthLabel,
  monthParam,
  bookingsList,
  perService,
}: UseExportParams) {
  const [pdfLoading, setPdfLoading] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)

  const filename = `podsumowanie-${monthLabel.toLowerCase().replace(/\s/g, "-")}`

  async function downloadPdf() {
    setPdfLoading(true)
    setPdfError(null)
    try {
      const res = await fetch(`/api/export/summary?month=${monthParam}`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(
          (body as { error?: string }).error ?? `HTTP ${res.status}`
        )
      }
      const blob = await res.blob()
      triggerDownload(blob, `${filename}.pdf`)
    } catch (err) {
      setPdfError(err instanceof Error ? err.message : "Nieznany blad")
    } finally {
      setPdfLoading(false)
    }
  }

  function downloadCsv() {
    const content = buildCsvContent(bookingsList, perService)
    const blob = new Blob([`\uFEFF${content}`], {
      type: "text/csv;charset=utf-8;",
    })
    triggerDownload(blob, `${filename}.csv`)
  }

  return { pdfLoading, pdfError, downloadPdf, downloadCsv }
}
