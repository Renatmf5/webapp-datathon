/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useState, useEffect } from "react"
import { fetchCarteirasFactor } from "@/../services/api"
import { Button } from "@/components/ui/button"

export default function TradingTable() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Definição das colunas
  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "carteira",
      header: "Carteira",
    },
    {
      accessorKey: "data_posicao",
      header: "Data Posição",
    },
    {
      accessorKey: "valor_atualizado",
      header: "Valor Atualizado",
      cell: ({ getValue }) => {
        const value = parseFloat(getValue() as string).toFixed(2);
        return <span className="text-black">{value}</span>;
      },
    },
    {
      accessorKey: "acoes",
      header: "Ações (Peso)",
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return <span className="text-black">{value}</span>;
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheKey = "tradingDataCache";
        const cacheTimestampKey = "tradingDataCacheTimestamp";

        // Verifica se os dados estão no cache e se ainda são válidos
        const cachedData = localStorage.getItem(cacheKey);
        const cachedTimestamp = localStorage.getItem(cacheTimestampKey);

        if (cachedData && cachedTimestamp) {
          const now = Date.now();
          const cacheAge = now - parseInt(cachedTimestamp, 10);

          // Verifica se o cache tem menos de 1 hora (3600000 ms)
          if (cacheAge < 3600000) {
            console.log("Using cached data");
            const parsedData = JSON.parse(cachedData);
            setData(parsedData);
            setIsLoading(false);
            return;
          } else {
            console.log("Cache expired, fetching new data");
            localStorage.removeItem(cacheKey);
            localStorage.removeItem(cacheTimestampKey);
          }
        }

        // Caso não tenha cache ou esteja expirado, faz a requisição
        const tradingData = await fetchCarteirasFactor();
        console.log("Fetched trading data:", tradingData);

        // Verifica se tradingData é um array válido
        if (!Array.isArray(tradingData)) {
          console.error("Invalid trading data format:", tradingData);
          setData([]);
          return;
        }

        // Transformar o JSON em um array de objetos para a tabela
        const transformedData = tradingData.flatMap((item) =>
          Object.entries(item).map(([carteira, valores]: any) => ({
            carteira,
            data_posicao: valores.data_posicao,
            valor_atualizado: valores.valor_atualizado,
            acoes: Object.entries(valores.acoes || {})
              .map(
                ([acao, detalhes]: any) =>
                  `${acao} (${(detalhes.peso * 100).toFixed(2)}%)`
              )
              .join(", "),
          }))
        );

        // Salva os dados no cache (localStorage) com o timestamp atual
        localStorage.setItem(cacheKey, JSON.stringify(transformedData));
        localStorage.setItem(cacheTimestampKey, Date.now().toString());

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching trading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [{ id: "data_posicao", desc: true }], // Ordena da mais recente para a mais antiga
      pagination: { pageSize: 10 }, // Define o tamanho da página como 10
    },
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>
          <select
            className="border rounded p-1 text-sm"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}