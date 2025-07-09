"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ProspectsGroup } from '@/types/prospects'
import { useRouter } from 'next/navigation'

// Componente para ação
const ActionDropdown = ({ group }: { group: ProspectsGroup }) => {
  const router = useRouter()

  const handleViewDetails = () => {
    localStorage.setItem("groupDetails", JSON.stringify(group))
    router.push(`/dashboard/prospects/${group.codigo_vaga}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleViewDetails}>
          Ver detalhes dos prospects
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`/dashboard/vagas/${group.codigo_vaga}`)}>
          Ver detalhes da vaga
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<ProspectsGroup>[] = [
  {
    accessorKey: "codigo_vaga",
    header: "Código Vaga",
    cell: ({ row }) => <div className="truncate">{row.getValue("codigo_vaga")}</div>,
  },
  {
    accessorKey: "titulo_vaga",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Título Vaga
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue("titulo_vaga")}</div>
    ),
  },
  {
    accessorKey: "modalidade",
    header: "Modalidade",
    cell: ({ row }) => <div className="truncate">{row.getValue("modalidade")}</div>,
  },
  {
    id: "prospects",
    header: "Prospects",
    cell: ({ row }) => (
      <div className="truncate">{row.original.prospects ? row.original.prospects.length : 0}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const group = row.original
      return <ActionDropdown group={group} />
    },
  },
]

interface DataTableDemoProps {
  data: ProspectsGroup[]
}

export function DataTableDemo({ data }: DataTableDemoProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // caso use paginação interna
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-2">
        <Input
          placeholder="Filtrar por título..."
          value={(table.getColumn("titulo_vaga")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("titulo_vaga")?.setFilterValue(event.target.value)
          }
          className="max-w-sm py-1"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto py-1">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter(column => column.getCanHide()).map(column => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="h-8">
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="py-1 px-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className="h-8">
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="py-1 px-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="h-8">
                <TableCell colSpan={columns.length} className="h-8 text-center">
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Mantenha a paginação interna do data-table, se desejado */}
      <div className="flex items-center justify-end space-x-2 py-2">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}