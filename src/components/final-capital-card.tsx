"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  gross_profit: {
    label: "gross_profit",
    color: "var(--chart-1)",
  },
  net_profit: {
    label: "net_profit",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

// Componente genérico
export function FinalCapitalBarChart<T extends { start_time: string; final_capital: number; final_gross_capital: number }>({
  data,
}: {
  data: T[];
}) {
  const chartData = data.map(item => ({
    periodo: item.start_time,
    final_capital: item.final_capital,
    final_gross_capital: item.final_gross_capital,
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            className="w-full h-full"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="periodo"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="final_capital" fill={chartConfig.gross_profit.color} radius={4} />
            <Bar dataKey="final_gross_capital" fill={chartConfig.net_profit.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}