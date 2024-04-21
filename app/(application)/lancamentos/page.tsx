/* eslint-disable eqeqeq */
'use client'

import { IoIosArrowForward, IoIosClose } from 'react-icons/io'
import { IoFilter } from 'react-icons/io5'
import {
  columns,
  LaunchData,
} from '@/components/dataTable/launchDataTable/columns'
import DataTable, { Filter } from '@/components/dataTable/DataTable'
import ResultCard from '@/components/ResultCard/ResultCard'
import { Button } from '@/components/ui/button'
import { MouseEvent, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { moneyFormatter } from '@/utils/moneyFormatter'
import MoneyNumber from '@/components/moneyNumber/MoneyNumber'
import { cn } from '@/lib/utils'
import DateController from '@/components/dateController/DateController'
import { Row } from '@tanstack/react-table'

import FilterBadge, {
  FilterBadgeKeys,
} from '@/components/dataTable/launchDataTable/FilterBadge'
import NewLaunchDialog from '@/components/newLaunchDialog/NewLaunchDialog'

const data = [
  {
    category: 'Salário',
    date: '04/04/2024',
    value: 2149,
    description: 'Salário',
    type: 'revenue',
    status: 'payable',
  },
  {
    category: 'Contas',
    date: '05/04/2024',
    value: -200,
    description: 'Conta de luz',
    type: 'expenditure',
    status: 'payed',
  },
  {
    category: 'Salário',
    date: '04/04/2024',
    value: 2149,
    description: 'Salário',
    type: 'revenue',
    status: 'payed',
  },
  {
    category: 'Mercado',
    date: '05/04/2024',
    value: -200,
    description: 'Mercado',
    type: 'expenditure',
    status: 'payed',
  },
] as LaunchData[]

export default function Launch() {
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState<string[]>([])

  const [selectedRows, setSelectedRows] = useState<Row<LaunchData>[]>([])

  const selectedSum = selectedRows.reduce((acc, row) => {
    return acc + (row.getValue('value') as number)
  }, 0)
  const selectedRowsCount = selectedRows.length

  const filters: Filter<LaunchData>[] = [
    { field: 'type', value: type },
    { field: 'category', value: category },
    { field: 'status', value: status },
  ]

  const totalRevenue = data.reduce((acc, field) => {
    if (field.type === 'revenue' && field.status === 'payed')
      return acc + field.value
    return acc
  }, 0)
  const totalExpenditure = data.reduce((acc, field) => {
    if (field.type === 'expenditure' && field.status === 'payed')
      return acc + field.value
    return acc
  }, 0)
  const revenueToGet = data.reduce((acc, field) => {
    if (field.type === 'revenue' && field.status === 'payable')
      return acc + field.value
    return acc
  }, 0)
  const expenditureToPay = data.reduce((acc, field) => {
    if (field.type === 'expenditure' && field.status === 'payable')
      return acc + field.value
    return acc
  }, 0)
  const total = totalRevenue + totalExpenditure

  const unSelectType = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    if (e.currentTarget.value === type) setType('')
  }
  const unSelectStatus = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    if (e.currentTarget.value === status) setStatus('')
  }

  return (
    <main className="py-10 px-6 space-y-4 w-full max-w-screen-xl mx-auto">
      <div className="flex gap-6 items-center mb-10">
        <h1 className="text-2xl">Lançamentos</h1>

        <NewLaunchDialog />
      </div>

      <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 max-w-xl">
        <ResultCard
          title="Total"
          subText={
            <>
              total previsto <br />{' '}
              <strong>
                {moneyFormatter(total + revenueToGet + expenditureToPay)}
              </strong>
            </>
          }
          value={total}
          className="bg-blue-600 col-span-2 sm:col-span-1"
        />
        <ResultCard
          subText={
            <>
              A receber <br /> <strong>{moneyFormatter(revenueToGet)}</strong>
            </>
          }
          title="Receitas"
          value={totalRevenue}
          className="bg-green-600"
        />
        <ResultCard
          subText={
            <>
              A pagar <br /> <strong>{moneyFormatter(expenditureToPay)}</strong>
            </>
          }
          title="Despesas"
          value={totalExpenditure}
          className="bg-red-600"
        />
      </div>

      <div className="flex gap-4 items-center">
        <DateController />

        <Popover>
          <PopoverTrigger asChild>
            <button className="bg-white shadow p-4 rounded-lg h-full cursor-pointer hover:bg-slate-100">
              <IoFilter size={20} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0">
            <Collapsible className="group">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
                <Label>Tipo</Label>
                <IoIosArrowForward className="rotate-90 group-data-[state=open]:-rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Separator />
                <RadioGroup
                  value={type}
                  onValueChange={setType}
                  className="p-2 space-y-1"
                >
                  <div className="flex gap-2 items-center">
                    <RadioGroupItem
                      value="revenue"
                      id="rg_revenue"
                      onClick={unSelectType}
                    />
                    <Label
                      htmlFor="rg_revenue"
                      className="bg-green-100 px-2 py-1 rounded"
                    >
                      Receita
                    </Label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <RadioGroupItem
                      value="expenditure"
                      id="rg_expenditure"
                      onClick={unSelectType}
                    />
                    <Label
                      htmlFor="rg_expenditure"
                      className="bg-red-100 px-2 py-1 rounded"
                    >
                      Despesa
                    </Label>
                  </div>
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            <Collapsible className="group">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
                <Label>Status</Label>
                <IoIosArrowForward className="rotate-90 group-data-[state=open]:-rotate-90" />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <Separator />
                <RadioGroup
                  value={status}
                  onValueChange={setStatus}
                  className="p-2 space-y-1"
                >
                  <div className="flex gap-2 items-center ">
                    <RadioGroupItem
                      value="payed"
                      id="rg_payed"
                      onClick={unSelectStatus}
                    />
                    <Label
                      htmlFor="rg_payed"
                      className="bg-blue-100 px-2 py-1 rounded"
                    >
                      Pago / Recebido
                    </Label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <RadioGroupItem
                      value="payable"
                      id="rg_payable"
                      onClick={unSelectStatus}
                    />
                    <Label
                      htmlFor="rg_payable"
                      className="bg-yellow-100 px-2 py-1 rounded"
                    >
                      A pagar / A receber
                    </Label>
                  </div>
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            <Collapsible className="group">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
                <Label>Categoria</Label>
                <IoIosArrowForward className="rotate-90 group-data-[state=open]:-rotate-90" />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <Separator />
                {data
                  .reduce((acc, launch) => {
                    if (!acc.includes(launch.category)) {
                      acc.push(launch.category)
                    }
                    return acc
                  }, [] as string[])
                  .map((launch) => (
                    <div key={launch} className="flex gap-2 items-center p-2">
                      <Checkbox
                        id={`cb_${launch}`}
                        value={launch}
                        checked={category.includes(launch)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? setCategory((prev) => [...prev, launch])
                            : setCategory((prev) =>
                                prev.filter((value) => value !== launch),
                              )
                        }}
                      />
                      <Label htmlFor={`cb_${launch}`}>{launch}</Label>
                    </div>
                  ))}
              </CollapsibleContent>
            </Collapsible>
          </PopoverContent>
        </Popover>
      </div>
      <div className="rounded-lg bg-white shadow space-y-3">
        <div className="flex gap-2 text-sm text-muted-foreground px-4 pt-4">
          {filters
            .filter((filter) => filter.value != '')
            .map((filter, i) => {
              return (
                <FilterBadge key={i} filter={filter.value as FilterBadgeKeys}>
                  <button
                    onClick={() => {
                      if (filter.field === 'type') setType('')
                      if (filter.field === 'status') setStatus('')
                      if (filter.field === 'category') setCategory([])
                    }}
                  >
                    <IoIosClose
                      size={16}
                      className="p-0.5 box-content hover:bg-black hover:bg-opacity-10 rounded-md cursor-pointer"
                    />
                  </button>
                </FilterBadge>
              )
            })}
          <Button
            size={'sm'}
            variant={'ghost'}
            onClick={() => {
              setType('')
              setStatus('')
              setCategory([])
            }}
          >
            Limpar filtros
          </Button>
        </div>
        <div
          className={cn(
            'grid overflow-hidden transition-all ease-in-out',
            selectedRowsCount > 0
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div
            className={cn(
              'px-6 text-sm flex items-center gap-2 overflow-hidden',
            )}
          >
            <Button
              size={'sm'}
              variant={'outline'}
              className="border-red-300 text-red-500 hover:bg-red-50"
            >
              Excluir
            </Button>
            <Button size={'sm'} variant={'outline'}>
              Marcar como pago
            </Button>
            <div className="flex-1 text-sm text-muted-foreground text-right">
              {selectedRowsCount}{' '}
              {selectedRowsCount === 1
                ? 'item selecionado'
                : 'items selecionados'}
            </div>
            <span className="border rounded px-3 py-1">
              Soma: <MoneyNumber number={selectedSum} />{' '}
            </span>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
          filters={filters}
          onChange={(table) => {
            setSelectedRows(table.getFilteredSelectedRowModel().rows)
          }}
        />
      </div>
    </main>
  )
}
