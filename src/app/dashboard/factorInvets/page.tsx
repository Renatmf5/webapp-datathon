'use client'

import TradingTable from '@/components/data-table';
import LineChartCarteira from '@/components/line-chart-trading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CarteriraMetrics() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      {/* Botão de Download */}
      <div className="w-full flex justify-start mb-5">
        <a
          href="/attachments/Carteira_Factor_Lâmina.pdf" // Caminho para o arquivo na pasta public
          download="Carteira_Factor_Lâmina.pdf" // Nome do arquivo ao fazer o download
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Baixar Lâmina de investimento
        </a>
      </div>

      <h1 className="p-5 text-2xl font-bold">Carteira Factor Investing</h1>
      <div className="p-5 grid grid-cols-1 gap-5">
        {/* Gráfico de linhas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
              Gráfico de retorno da carteira
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChartCarteira />
          </CardContent>
        </Card>

        {/* Tabela de dados */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
              Historico de carteiras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TradingTable />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}