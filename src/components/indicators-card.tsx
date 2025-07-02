'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Componente genérico
export function IndicatorsCard<T extends {
  avg_trade_duration: string | number;
  avg_profit_pct: number;
  avg_loss_pct: number;
  max_gain: number;
  max_loss: number;
  max_drawdown: number;
  max_consecutive_gains: number;
  max_consecutive_losses: number;
}>({
  filteredData,
}: {
  filteredData: T[];
}) {
  if (filteredData.length === 0) {
    return <div>No data available</div>
  }

  const {
    avg_trade_duration,
    avg_profit_pct,
    avg_loss_pct,
    max_gain,
    max_loss,
    max_drawdown,
    max_consecutive_gains,
    max_consecutive_losses,
  } = filteredData[0]

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Indicadores</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-lg flex gap-2">
          <span>Duração Média de Trade:</span>
          <span className='font-bold'>{avg_trade_duration}</span>
        </div>
        <div className="flex text-lg gap-2">
          <span>Lucro Médio (%):</span>
          <span className='font-bold'>{avg_profit_pct}%</span>
        </div>
        <div className="flex text-lg gap-2">
          <span>Perda Média (%):</span>
          <span className='font-bold'>{avg_loss_pct}%</span>
        </div>
        <div className="flex text-lg gap-2">
          <span>Maior Ganho:</span>
          <span className='font-bold'>{max_gain}%</span>
        </div>
        <div className="flex text-lg gap-2">
          <span>Maior Perda:</span>
          <span className='font-bold'>{max_loss}%</span>
        </div>
        <div className="flex text-lg gap-2">
          <span>Máximo Drawdown:</span>
          <span className='font-bold'>{max_drawdown}%</span>
        </div>
        <div className="flex ftext-lg gap-2">
          <span>Máximos Ganhos Consecutivos:</span>
          <span className='font-bold'>{max_consecutive_gains}</span>
        </div>
        <div className="flex text-lg gap-2">
          <span>Máximas Perdas Consecutivas:</span>
          <span className='font-bold'>{max_consecutive_losses}</span>
        </div>
      </CardContent>
    </Card>
  )
}