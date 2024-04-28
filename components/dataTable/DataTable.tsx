'use client'

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
  getFilteredRowModel,
  ColumnFiltersState,
  Table as TanTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@/hooks/UseMediaQuery'
import { deepCompare } from '@/utils/deepCompare'

export type Filter<TData> = {
  field: keyof TData
  value: string | string[]
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filters?: Filter<TData>[]
  onChange?: (table: TanTable<TData>) => void
}

export type handleTable<TData> = {
  table: TanTable<TData>
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  filters,
  onChange,
}: DataTableProps<TData, TValue>) {
  const isLargeScreen = useMediaQuery('(min-width: 768px)')
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const prevValue = useRef<ColumnFiltersState>()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      columnFilters,
    },
  })

  useEffect(() => {
    if (!deepCompare(columnFilters, prevValue.current)) {
      onChange && onChange(table)
    }
    console.log(deepCompare(columnFilters, prevValue.current))
    prevValue.current = columnFilters
  }, [columnFilters])

  useEffect(() => {
    onChange && onChange(table)
  }, [rowSelection, table])

  useEffect(() => {
    if (filters) {
      filters.forEach((filter) => {
        table.getColumn(filter.field as string)?.setFilterValue(filter.value)
      })
    }
  }, [filters, table])

  useEffect(() => {
    if (!isLargeScreen) {
      table.getColumn('category')?.toggleVisibility(false)
      table.getColumn('description')?.toggleVisibility(false)
    } else {
      table.getColumn('category')?.toggleVisibility(true)
      table.getColumn('description')?.toggleVisibility(true)
    }
  }, [isLargeScreen, table])

  return (
    <div className="">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="px-2"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="relative"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-2">
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
  )
}
