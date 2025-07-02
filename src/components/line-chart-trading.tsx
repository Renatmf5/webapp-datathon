/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { fetchCarteirasFactor } from '@/../services/api'

const chartConfig = {
  current_value: {
    label: 'Valor Atualizado',
    color: 'var(--chart-1)',
  },
}

export default function LineChartCarteira() {
  const [chartData, setChartData] = React.useState<any[]>([])
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)

    const fetchChartData = async () => {
      try {
        console.log('Verificando dados no localStorage...')
        const cacheKey = 'chartDataCache'
        const cacheTimestampKey = 'chartDataCacheTimestamp'

        // Verificar se os dados estão no localStorage e se ainda são válidos
        const cachedData = localStorage.getItem(cacheKey)
        const cachedTimestamp = localStorage.getItem(cacheTimestampKey)

        if (cachedData && cachedTimestamp) {
          const now = Date.now()
          const cacheAge = now - parseInt(cachedTimestamp, 10)

          // Verificar se o cache tem menos de 1 hora (3600000 ms)
          if (cacheAge < 3600000) {
            console.log('Usando dados do cache')
            setChartData(JSON.parse(cachedData))
            return // Não faz a chamada à API
          } else {
            console.log('Cache expirado, removendo dados antigos')
            localStorage.removeItem(cacheKey)
            localStorage.removeItem(cacheTimestampKey)
          }
        }

        console.log('Buscando dados da API...')
        const response = await fetchCarteirasFactor()
        console.log('API Response:', response)

        if (!response || typeof response !== 'object') {
          console.error('Formato inválido da resposta da API:', response)
          return
        }

        const formattedData: any[] = []

        const carteiras = response[0]

        const sortedCarteiras = Object.entries(carteiras).sort(
          ([, a]: any, [, b]: any) =>
            new Date(a.data_posicao).getTime() - new Date(b.data_posicao).getTime()
        )

        console.log('Sorted Carteiras:', sortedCarteiras)

        const firstValue = (sortedCarteiras[0][1] as any).valor_atualizado
        console.log('First Value (Base):', firstValue)

        sortedCarteiras.forEach(([carteira, valores]: any) => {
          console.log(`Processing carteira: ${carteira}`, valores)

          if (!valores || typeof valores !== 'object' || !valores.valor_atualizado) {
            console.error(`valor_atualizado não encontrado para ${carteira}`)
            return
          }

          const currentValue = valores.valor_atualizado
          const variation = ((currentValue - firstValue) / firstValue) * 100

          formattedData.push({
            date: valores.data_posicao,
            current_value: parseFloat(currentValue.toFixed(2)),
            variation: parseFloat(variation.toFixed(2)), // Incluímos a variação no conjunto de dados
          })
        })

        console.log('Formatted data for chart:', formattedData)

        // Salvar os dados no localStorage com o timestamp atual
        localStorage.setItem(cacheKey, JSON.stringify(formattedData))
        localStorage.setItem(cacheTimestampKey, Date.now().toString())

        setChartData(formattedData)
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error)
      }
    }

    fetchChartData()
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Gráfico de Valor Atualizado</CardTitle>
          <CardDescription>
            Mostrando os valores de Valor Atualizado e a variação percentual ao longo do tempo
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 30,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => value}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={['auto', 'auto']}
                label={{ value: 'Valor Atualizado', angle: -90, position: 'insideLeft', dx: -18 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={['auto', 'auto']}
                label={{ value: 'Variação (%)', angle: -90, position: 'insideRight' }}
              />
              <Tooltip />
              <Line
                yAxisId="left"
                dataKey="current_value"
                type="monotone"
                stroke={chartConfig.current_value.color}
                strokeWidth={2}
                dot={true}
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                dataKey="variation"
                type="monotone"
                stroke="transparent" // Torna a linha invisível
                dot={false} // Remove os pontos
                activeDot={false} // Remove o ponto ativo ao passar o mouse
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}