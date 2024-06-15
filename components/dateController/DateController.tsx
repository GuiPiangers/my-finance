'use client'

import 'dayjs/locale/pt-br'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MonthPicker } from '@mantine/dates'
import { useState } from 'react'
import { Button } from '../ui/button'
import { monthsInPortuguese } from '@/utils/Date'
import { useRouter, useSearchParams } from 'next/navigation'

export default function DateController() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [isOpenMonthPickerModal, setIsOpenMonthPickerModal] = useState(false)

  const selectedMonth = searchParams.get('month')
    ? +searchParams.get('month')!
    : new Date().getMonth()
  const selectedYear = searchParams.get('year')
    ? +searchParams.get('year')!
    : new Date().getFullYear()
  const selectedDate = new Date(selectedYear, selectedMonth)

  const setNextMonth = () => {
    const nextMonthDate = new Date(selectedYear, selectedMonth + 1)
    router.replace(
      `?month=${nextMonthDate.getMonth()}&year=${nextMonthDate.getFullYear()}`,
    )
  }
  const setPreviousMonth = () => {
    const nextMonthDate = new Date(selectedYear, selectedMonth - 1)
    router.replace(
      `?month=${nextMonthDate.getMonth()}&year=${nextMonthDate.getFullYear()}`,
    )
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      <button onClick={setPreviousMonth}>
        <IoIosArrowBack
          size={20}
          className="p-1 box-content hover:bg-slate-100 rounded cursor-pointer"
        />
      </button>
      <Popover
        open={isOpenMonthPickerModal}
        onOpenChange={setIsOpenMonthPickerModal}
      >
        <PopoverTrigger>
          <h2 className="text-lg w-44">
            {monthsInPortuguese[selectedMonth]} de {selectedDate.getFullYear()}
          </h2>
        </PopoverTrigger>
        <PopoverContent
          className="w-fit items-center flex flex-col gap-2"
          sideOffset={20}
        >
          <MonthPicker
            locale="pt-br"
            value={selectedDate}
            onChange={(value) => {
              router.replace(
                `?month=${value?.getMonth()}&year=${value?.getFullYear()}`,
              )
              setIsOpenMonthPickerModal(false)
            }}
          />
          <Button
            variant={'link'}
            onClick={() => {
              const now = new Date()
              router.replace(
                `?month=${now?.getMonth()}&year=${now?.getFullYear()}`,
              )
              setIsOpenMonthPickerModal(false)
            }}
          >
            Mês Atual
          </Button>
        </PopoverContent>
      </Popover>
      <button onClick={setNextMonth}>
        <IoIosArrowForward
          size={20}
          className=" box-content hover:bg-slate-100 cursor-pointer rounded p-1"
        />
      </button>
    </div>
  )
}
