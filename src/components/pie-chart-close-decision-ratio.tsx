"use client"

import * as React from "react";
import { Pie, PieChart, Label } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  Stop: {
    label: "Stop Loss",
    color: "var(--chart-1)",
  },
  Win: {
    label: "Win",
    color: "var(--chart-2)",
  },
  Loss: {
    label: "Loss",
    color: "var(--chart-3)",
  },
  Profit: {
    label: "Profit",
    color: "var(--chart-4)",
  },
};

// Componente genérico
export function PieChartDecisionRatio<T extends { stop_loss_count: number; win_count: number; loss_count: number; take_profit_count: number }>({
  filteredData,
}: {
  filteredData: T[];
}) {
  const chartData = React.useMemo(() => {
    if (!filteredData || filteredData.length === 0) return [];

    return [
      {
        name: "Stop Loss",
        value: filteredData[0].stop_loss_count || 0,
        fill: chartConfig.Stop.color,
      },
      {
        name: "Win Trade",
        value: filteredData[0].win_count || 0,
        fill: chartConfig.Win.color,
      },
      {
        name: "Loss Trade",
        value: filteredData[0].loss_count || 0,
        fill: chartConfig.Loss.color,
      },
      {
        name: "Take Profit",
        value: filteredData[0].take_profit_count || 0,
        fill: chartConfig.Profit.color,
      },
    ];
  }, [filteredData]);

  const totalTrades = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="justify-start px-6 pb-0">
        <CardTitle>Close decision ratio</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <PieChart className=''>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalTrades}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className=" fill-muted-foreground"
                        >
                          Total Trades
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              payload={chartData.map((entry) => ({
                value: `${entry.name} ${((entry.value / totalTrades) * 100).toFixed(2)}%`,
                type: "square",
                color: entry.fill,
              }))}
              formatter={(value, entry) => (
                <span style={{ color: "black" }}>
                  {value}: {entry.payload ? entry.payload.value : ''}
                </span>
              )}
              className="flex flex-wrap justify-center gap-4 mt-4"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}