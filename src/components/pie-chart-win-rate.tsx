"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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
  win: {
    label: "Win",
    color: "hsl(var(--chart-2))",
  },
  loss: {
    label: "Loss",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

// Componente genérico
export function GaugeChart<T extends { win_rate: number }>({
  filteredData,
}: {
  filteredData: T[];
}) {
  const total = 100
  const win = filteredData[0]?.win_rate || 0
  const loss = total - win
  const chartData = [{ win: win, loss: loss }]

  return (
    <Card className="flex max-h-[300px] flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Win Rate</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={100}
            outerRadius={150}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {win.toLocaleString() + "%"}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Win Rate
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="loss"
              stackId="a"
              cornerRadius={5}
              fill="var(--chart-1)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="win"
              fill="var(--chart-2)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}