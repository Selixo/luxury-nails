import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import type { BookingLine, ServiceStat } from "./types"

const gold = "#b48c50"
const goldLight = "#d4a96a"
const dark = "#111111"
const mid = "#444444"
const soft = "#777777"
const muted = "#aaaaaa"
const hairline = "#e8e8e8"
const rowAlt = "#fafafa"
const statBg = "#f7f4f0"

const s = StyleSheet.create({
  page: {
    fontSize: 9,
    color: dark,
    paddingTop: 0,
    paddingBottom: 48,
    paddingHorizontal: 0,
  },

  topBar: {
    height: 4,
    backgroundColor: gold,
    marginBottom: 32,
  },

  content: {
    paddingHorizontal: 44,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: hairline,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: gold,
    letterSpacing: 1,
    marginBottom: 6,
  },
  companyTagline: {
    fontSize: 7,
    color: muted,
    letterSpacing: 1,
    marginBottom: 6,
  },
  companyDetail: {
    fontSize: 7.5,
    color: soft,
    marginBottom: 2,
  },
  docBlock: {
    alignItems: "flex-end",
  },
  docLabel: {
    fontSize: 7,
    color: muted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  docTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: dark,
    textAlign: "right",
    marginBottom: 3,
  },
  docMonth: {
    fontSize: 10,
    color: gold,
    textAlign: "right",
    fontWeight: "bold",
  },

  statsRow: {
    flexDirection: "row",
    marginBottom: 28,
    backgroundColor: statBg,
  },
  statBox: {
    flex: 1,
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: hairline,
  },
  statBoxLast: {
    flex: 1,
    padding: 12,
  },
  statLabel: {
    fontSize: 6.5,
    color: muted,
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: dark,
  },
  statGold: {
    color: gold,
    fontSize: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionAccent: {
    width: 3,
    height: 10,
    backgroundColor: gold,
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 7,
    color: soft,
    letterSpacing: 1,
    fontWeight: "bold",
  },

  table: {
    marginBottom: 28,
  },
  tableHead: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: dark,
  },
  tableHeadCell: {
    fontSize: 6.5,
    color: goldLight,
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: hairline,
  },
  tableRowAlt: {
    backgroundColor: rowAlt,
  },
  tableCell: {
    fontSize: 8,
    color: mid,
  },
  tableCellRight: {
    fontSize: 8,
    color: mid,
    textAlign: "right",
  },
  tableCellGold: {
    fontSize: 8,
    color: gold,
    textAlign: "right",
    fontWeight: "bold",
  },
  colDate: { width: "14%" },
  colClient: { width: "28%" },
  colService: { width: "42%" },
  colAmount: { width: "16%" },
  colServiceName: { width: "55%" },
  colCount: { width: "20%" },
  colRevenue: { width: "25%" },

  totalsRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: statBg,
    borderTopWidth: 1,
    borderTopColor: gold,
  },
  totalsLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: dark,
  },
  totalsValue: {
    fontSize: 9,
    fontWeight: "bold",
    color: gold,
    textAlign: "right",
  },

  footer: {
    position: "absolute",
    bottom: 16,
    left: 44,
    right: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: hairline,
  },
  footerText: {
    fontSize: 7,
    color: muted,
  },
  footerBrand: {
    fontSize: 7,
    color: gold,
    fontWeight: "bold",
  },
})

type Props = {
  monthLabel: string
  year: number
  month: number
  revenue: number
  completedCount: number
  avgValue: number
  cancelledCount: number
  bookingsList: BookingLine[]
  perService: ServiceStat[]
}

export function SummaryPdfDocument({
  monthLabel,
  year,
  revenue,
  completedCount,
  avgValue,
  cancelledCount,
  bookingsList,
  perService,
}: Props) {
  const generated = new Date().toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.topBar} />

        <View style={s.content}>
          <View style={s.header}>
            <View>
              <Text style={s.companyName}>LUXURY NAILS</Text>
              <Text style={s.companyTagline}>SALON PAZNOKCI</Text>
              <Text style={s.companyDetail}>ul. Kręta 13, 66-133 Klenica</Text>
              <Text style={s.companyDetail}>tel. +48 537 273 082</Text>
              <Text style={s.companyDetail}>kamil.naskret.dev@gmail.com</Text>
            </View>
            <View style={s.docBlock}>
              <Text style={s.docLabel}>RAPORT MIESIECZNY</Text>
              <Text style={s.docTitle}>Podsumowanie przychodow</Text>
              <Text style={s.docMonth}>{monthLabel}</Text>
            </View>
          </View>

          <View style={s.statsRow}>
            <View style={s.statBox}>
              <Text style={s.statLabel}>PRZYCHOD</Text>
              <Text style={[s.statValue, s.statGold]}>{revenue} zl</Text>
            </View>
            <View style={s.statBox}>
              <Text style={s.statLabel}>UKONCZONE WIZYTY</Text>
              <Text style={s.statValue}>{completedCount}</Text>
            </View>
            <View style={s.statBox}>
              <Text style={s.statLabel}>SR. WARTOSC WIZYTY</Text>
              <Text style={s.statValue}>{avgValue} zl</Text>
            </View>
            <View style={s.statBoxLast}>
              <Text style={s.statLabel}>ANULOWANE</Text>
              <Text style={s.statValue}>{cancelledCount}</Text>
            </View>
          </View>

          <View style={s.sectionHeader}>
            <View style={s.sectionAccent} />
            <Text style={s.sectionTitle}>ZESTAWIENIE WIZYT</Text>
          </View>
          <View style={s.table}>
            <View style={s.tableHead}>
              <Text style={[s.tableHeadCell, s.colDate]}>DATA</Text>
              <Text style={[s.tableHeadCell, s.colClient]}>KLIENTKA</Text>
              <Text style={[s.tableHeadCell, s.colService]}>USLUGA</Text>
              <Text
                style={[s.tableHeadCell, s.colAmount, { textAlign: "right" }]}
              >
                KWOTA
              </Text>
            </View>
            {bookingsList.map((b, i) => (
              <View
                key={i}
                style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}
              >
                <Text style={[s.tableCell, s.colDate]}>{b.date}</Text>
                <Text style={[s.tableCell, s.colClient]}>{b.clientName}</Text>
                <Text style={[s.tableCell, s.colService]}>{b.service}</Text>
                <Text style={[s.tableCellGold, s.colAmount]}>{b.price} zl</Text>
              </View>
            ))}
            <View style={s.totalsRow}>
              <Text style={[s.totalsLabel, s.colDate]} />
              <Text style={[s.totalsLabel, s.colClient]} />
              <Text style={[s.totalsLabel, s.colService]}>RAZEM</Text>
              <Text style={[s.totalsValue, s.colAmount]}>{revenue} zl</Text>
            </View>
          </View>

          {perService.length > 0 && (
            <>
              <View style={s.sectionHeader}>
                <View style={s.sectionAccent} />
                <Text style={s.sectionTitle}>PODSUMOWANIE PER USLUGA</Text>
              </View>
              <View style={s.table}>
                <View style={s.tableHead}>
                  <Text style={[s.tableHeadCell, s.colServiceName]}>
                    USLUGA
                  </Text>
                  <Text
                    style={[
                      s.tableHeadCell,
                      s.colCount,
                      { textAlign: "center" },
                    ]}
                  >
                    WIZYTY
                  </Text>
                  <Text
                    style={[
                      s.tableHeadCell,
                      s.colRevenue,
                      { textAlign: "right" },
                    ]}
                  >
                    PRZYCHOD
                  </Text>
                </View>
                {perService.map((sv, i) => (
                  <View
                    key={i}
                    style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}
                  >
                    <Text style={[s.tableCell, s.colServiceName]}>
                      {sv.name}
                    </Text>
                    <Text style={[s.tableCellRight, s.colCount]}>
                      {sv.count}
                    </Text>
                    <Text style={[s.tableCellGold, s.colRevenue]}>
                      {sv.revenue} zl
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        <View style={s.footer} fixed>
          <Text style={s.footerText}>Wygenerowano {generated}</Text>
          <Text style={s.footerBrand}>LUXURY NAILS</Text>
          <Text
            style={s.footerText}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  )
}
