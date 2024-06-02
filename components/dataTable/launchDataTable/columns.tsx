'use client'

import { ColumnDef } from '@tanstack/react-table'

import Sort from '../Sort'
import { Checkbox } from '../../ui/checkbox'
import { cn } from '@/lib/utils'
import MoneyNumber from '../../moneyNumber/MoneyNumber'
import { statusText } from '@/model/launch/statusText'
import { LaunchData } from '@/server/launch/launchSchema'
import { dateFormatter } from '@/utils/Date'

export const columns: ColumnDef<LaunchData>[] = [
  {
    accessorKey: 'type',
    header: '',
    size: 0,
    maxSize: 0,
    cell: ({ getValue }) => {
      return (
        <div
          className={cn(
            'h-full w-2 absolute left-0 top-0',
            getValue() === 'revenue' ? 'bg-green-500' : 'bg-red-500',
          )}
        ></div>
      )
    },
    enableHiding: false,
  },
  {
    id: 'select',
    size: 0,
    maxSize: 0,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'date',
    header: (props) => Sort({ text: 'Data', ...props }),
    cell: ({ row }) => dateFormatter.toLocaleDate(row.getValue('date')),
  },
  {
    accessorKey: 'description',
    header: (props) => Sort({ text: 'Descrição', ...props }),
  },
  {
    accessorKey: 'category',
    header: (props) => Sort({ text: 'Categoria', ...props }),
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'value',
    header: (props) => Sort({ text: 'Valor', ...props }),
    cell: ({ row }) => {
      return <MoneyNumber number={row.getValue('value')} />
    },
  },
  {
    accessorKey: 'status',
    size: 16,
    header: (props) => Sort({ text: 'status', ...props }),
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'text-center rounded p-1 text-xs',
            row.getValue('status') === 'payed'
              ? 'bg-blue-200'
              : 'bg-yellow-200',
          )}
        >
          {
            statusText[row.getValue('type') as 'expenditure' | 'revenue'][
              row.getValue('status') as 'payed' | 'payable'
            ]
          }
        </div>
      )
    },
  },
]
