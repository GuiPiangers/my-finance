/* eslint-disable eqeqeq */
'use client'

import { IoIosArrowForward, IoIosClose } from 'react-icons/io'
import { IoFilter } from 'react-icons/io5'
import { columns } from '@/components/dataTable/launchDataTable/columns'
import DataTable, { Filter } from '@/components/dataTable/DataTable'
import ResultCard from '@/components/ResultCard/ResultCard'
import { Button } from '@/components/ui/button'
import { MouseEvent, useCallback, useState } from 'react'
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
import { Row, Table } from '@tanstack/react-table'
import LaunchInfoDialog from '@/components/launch/launchInfoDialog/LaunchInfoDialog'
import { LaunchData } from '@/server/launch/launchSchema'

import FilterBadge, {
  FilterBadgeKeys,
} from '@/components/dataTable/launchDataTable/FilterBadge'
import { listLaunchesByMonthAndYear } from '@/server/launch/launch'
import { useMediaQuery } from '@/hooks/UseMediaQuery'
import { useQuery } from '@tanstack/react-query'
import { useDeleteLaunch } from '@/hooks/useDeleteLaunch'
import UpdateLaunchDialog from '@/components/launch/updateLaunchDialog/updateLaunchDialog'
import { useSearchParams } from 'next/navigation'

export function LaunchDataTable({ data }: { data: LaunchData[] }) {
  const deleteLaunch = useDeleteLaunch()

  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  const searchParams = useSearchParams()

  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState<string[]>([])

  const [selectedRows, setSelectedRows] = useState<Row<LaunchData>[]>([])
  const [clickedLaunch, setClickedLaunch] = useState<LaunchData>()

  const [infoLaunchDialogOpen, setInfoLaunchDialogOpen] = useState(false)
  const [updateLaunchDialogOpen, setUpdateLaunchDialogOpen] = useState(false)

  const selectedMonth = searchParams.get('month')
    ? +searchParams.get('month')!
    : new Date().getMonth()
  const selectedYear = searchParams.get('year')
    ? +searchParams.get('year')!
    : new Date().getFullYear()

  const { data: launches } = useQuery({
    queryKey: ['listLaunches', { month: selectedMonth, year: selectedYear }],
    queryFn: async () =>
      await listLaunchesByMonthAndYear({
        month: selectedMonth,
        year: selectedYear,
      }),
    initialData: data,
    staleTime: 1000 * 60 * 3, // 3 minutes
  })

  const selectedSum = selectedRows.reduce((acc, row) => {
    return acc + (row.getValue('value') as number)
  }, 0)
  const selectedRowsCount = selectedRows.length

  const filters: Filter<LaunchData>[] = [
    { field: 'type', value: type },
    { field: 'category', value: category },
    { field: 'status', value: status },
  ]
  const handleOnDataTableChange = useCallback(
    (table: Table<LaunchData>) => {
      setSelectedRows(table.getFilteredSelectedRowModel().rows)
      if (!isLargeScreen) {
        table.getColumn('category')?.toggleVisibility(false)
        table.getColumn('description')?.toggleVisibility(false)
      } else {
        table.getColumn('category')?.toggleVisibility(true)
        table.getColumn('description')?.toggleVisibility(true)
      }
    },
    [isLargeScreen],
  )

  const totalRevenue = launches.reduce((acc, field) => {
    if (field.type === 'revenue' && field.status === 'payed')
      return acc + field.value
    return acc
  }, 0)
  const totalExpenditure = launches.reduce((acc, field) => {
    if (field.type === 'expenditure' && field.status === 'payed')
      return acc + field.value
    return acc
  }, 0)
  const revenueToGet = launches.reduce((acc, field) => {
    if (field.type === 'revenue' && field.status === 'payable')
      return acc + field.value
    return acc
  }, 0)
  const expenditureToPay = launches.reduce((acc, field) => {
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
    <>
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
                {launches.length > 0 &&
                  launches
                    .reduce((acc, launch) => {
                      if (launch.category && !acc.includes(launch.category)) {
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
              onClick={async () => {
                const deleteRows = selectedRows.map((row) => {
                  return deleteLaunch.mutateAsync({ launchId: row.original.id })
                })
                await Promise.all(deleteRows)
              }}
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
        <LaunchInfoDialog
          data={clickedLaunch!}
          open={infoLaunchDialogOpen}
          onOpenChange={(openValue) => setInfoLaunchDialogOpen(openValue)}
          onButtonClick={() => setUpdateLaunchDialogOpen(true)}
        >
          <DataTable
            columns={columns}
            data={launches}
            filters={filters}
            onChange={handleOnDataTableChange}
            onRowClick={(row, event) => {
              if (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (event.target as unknown as any).hasAttribute('aria-checked')
              )
                return
              setClickedLaunch(row.original)
              setInfoLaunchDialogOpen(true)
            }}
          />
        </LaunchInfoDialog>
        {clickedLaunch && (
          <UpdateLaunchDialog
            initialData={clickedLaunch}
            open={updateLaunchDialogOpen}
            onOpenChange={setUpdateLaunchDialogOpen}
            onSuccess={() => {
              setUpdateLaunchDialogOpen(false)
            }}
          />
        )}
      </div>
    </>
  )
}
