import { renderToBuffer } from "@react-pdf/renderer"
import { createElement } from "react"
import type { DocumentProps } from "@react-pdf/renderer"
import type { ReactElement } from "react"
import { NextResponse, type NextRequest } from "next/server"
import { getSummaryData } from "@/features/dashboard/summary/actions"
import { parseMonthParam } from "@/features/dashboard/summary/utils"
import { SummaryPdfDocument } from "@/features/dashboard/summary/pdf-document"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const { year, month } = parseMonthParam(
      searchParams.get("month") ?? undefined
    )

    const data = await getSummaryData(year, month)

    const monthLabel = new Date(year, month - 1).toLocaleDateString("pl-PL", {
      month: "long",
      year: "numeric",
    })

    const element = createElement(SummaryPdfDocument, {
      monthLabel,
      year,
      month,
      revenue: data.revenue,
      completedCount: data.completedCount,
      avgValue: data.avgValue,
      cancelledCount: data.cancelledCount,
      bookingsList: data.bookingsList,
      perService: data.perService,
    }) as ReactElement<DocumentProps>

    const buffer = await renderToBuffer(element)

    const filename = `podsumowanie-${monthLabel.toLowerCase().replace(/\s/g, "-")}.pdf`

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[PDF export]", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
