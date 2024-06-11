'use client'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MonthPicker, MonthPickerProps } from '@mantine/dates'
import 'dayjs/locale/pt-br'
import { useState } from 'react'
import { Button } from '../ui/button'

const getYearControlProps: MonthPickerProps['getYearControlProps'] = (date) => {
  if (date.getFullYear() === new Date().getFullYear()) {
    return {
      style: {
        color: 'var(--mantine-color-blue-filled)',
        fontWeight: 700,
      },
    }
  }

  return {}
}

const getMonthControlProps: MonthPickerProps['getMonthControlProps'] = (
  date,
) => {
  if (date.getMonth() === new Date().getMonth()) {
    return {
      style: {
        fontWeight: 700,
        textDecoration: 'underline',
      },
    }
  }

  return {}
}

export default function DateController() {
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(new Date())
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      <IoIosArrowBack
        size={20}
        className="p-1 box-content hover:bg-slate-100 rounded cursor-pointer"
      />
      <Popover>
        <PopoverTrigger>
          <h2 className="text-lg">Março de 2024</h2>
        </PopoverTrigger>
        <PopoverContent
          className="w-fit items-center flex flex-col gap-2"
          sideOffset={20}
        >
          <MonthPicker
            locale="pt-br"
            value={selectedMonth}
            onChange={setSelectedMonth}
            getYearControlProps={getYearControlProps}
            getMonthControlProps={getMonthControlProps}
          />
          <Button variant={'link'} onClick={() => setSelectedMonth(new Date())}>
            Mês Atual
          </Button>
        </PopoverContent>
      </Popover>
      <IoIosArrowForward
        size={20}
        className=" box-content hover:bg-slate-100 cursor-pointer rounded p-1"
      />
    </div>
  )
}
