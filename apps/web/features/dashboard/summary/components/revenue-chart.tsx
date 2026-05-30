"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"
import type { ChartPoint } from "../types"

const config = {
  revenue: { label: "Przychód", color: "var(--color-gold)" },
} satisfies ChartConfig

type Props = {
  data: ChartPoint[]
}

export function RevenueChart({ data }: Props) {
  return (
    <ChartContainer config={config} className="h-48 w-full">
      <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
          tickFormatter={(v) => `${v} zł`}
        />
        <ChartTooltip
          cursor={{ fill: "rgba(255,255,255,0.03)" }}
          content={<ChartTooltipContent />}
        />
        <Bar
          dataKey="revenue"
          fill="var(--color-gold)"
          radius={0}
          opacity={0.7}
        />
      </BarChart>
    </ChartContainer>
  )
}
