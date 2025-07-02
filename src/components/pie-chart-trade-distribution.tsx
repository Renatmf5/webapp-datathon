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
  long: {
    label: "Long Trades",
    color: "var(--chart-2)",
  },
  short: {
    label: "Short Trades",
    color: "var(--chart-1)",
  },
};

// Componente genérico
export function PieChartTradeDistributionComponent<
  T extends { long_trades_count: number; short_trades_count: number }
>({
  filteredData,
}: {
  filteredData: T[];
}) {
  const chartData = React.useMemo(() => {
    if (!filteredData || filteredData.length === 0) return [];

    return [
      {
        name: "Long Trades",
        value: filteredData[0].long_trades_count || 0,
        fill: chartConfig.long.color,
      },
      {
        name: "Short Trades",
        value: filteredData[0].short_trades_count || 0,
        fill: chartConfig.short.color,
      },
    ];
  }, [filteredData]);

  const totalTrades = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Trade Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
          style={{ width: '100%', height: '100%', minWidth: '250px', minHeight: '250px' }} // Adicionando estilos para garantir dimensões adequadas
        >
          <PieChart>
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTrades}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
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
                value: `${entry.name} ${entry.value}`,
                type: "square",
                color: entry.fill,
              }))}
              formatter={(value, entry) => (
                <span style={{ color: "black" }}>
                  {value}: {entry.payload ? entry.payload.value : ''}
                </span>
              )}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}