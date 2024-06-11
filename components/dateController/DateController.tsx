'use client'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MonthPicker } from '@mantine/dates'
import 'dayjs/locale/pt-br'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from '../ui/button'
import { monthsInPortuguese } from '@/utils/Date'

type DateControllerProps = {
  selectedDate: Date
  setSelectedDate: Dispatch<SetStateAction<Date>>
}

export default function DateController({
  selectedDate,
  setSelectedDate,
}: DateControllerProps) {
  const [isOpenMonthPickerModal, setIsOpenMonthPickerModal] = useState(false)

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      <IoIosArrowBack
        size={20}
        className="p-1 box-content hover:bg-slate-100 rounded cursor-pointer"
      />
      <Popover
        open={isOpenMonthPickerModal}
        onOpenChange={setIsOpenMonthPickerModal}
      >
        <PopoverTrigger>
          <h2 className="text-lg w-44">
            {monthsInPortuguese[selectedDate.getMonth()]} de{' '}
            {selectedDate.getFullYear()}
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
              setSelectedDate(value || new Date())
              setIsOpenMonthPickerModal(false)
            }}
          />
          <Button
            variant={'link'}
            onClick={() => {
              setSelectedDate(new Date())
              setIsOpenMonthPickerModal(false)
            }}
          >
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
