export type CategoryStat = {
  name: string
  revenue: number
  count: number
  pct: number
}

export type ServiceStat = {
  name: string
  revenue: number
  count: number
}

export type ClientStat = {
  id: string
  name: string
  visits: number
  revenue: number
}

export type ChartPoint = {
  month: string
  revenue: number
}

export type BookingLine = {
  date: string
  clientName: string
  service: string
  price: number
}

export type PeakStat = {
  label: string
  count: number
}

export type SummaryData = {
  revenue: number
  completedCount: number
  cancelledCount: number
  avgValue: number
  revenueChange: number | null
  newClientsCount: number
  returningCount: number
  categories: CategoryStat[]
  perService: ServiceStat[]
  topClients: ClientStat[]
  chart: ChartPoint[]
  bookingsList: BookingLine[]
  prevMonth: { revenue: number; completedCount: number }
  peakDays: PeakStat[]
  peakHours: PeakStat[]
}

export type MonthParam = {
  year: number
  month: number
}
