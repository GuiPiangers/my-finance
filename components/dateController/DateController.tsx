import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

export default function DateController() {
  const months = [
    'jan',
    'fev',
    'mar',
    'abr',
    'mai',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ]

  const generateYears = () => {
    
  }

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
          <div className="flex items-center gap-1 w-full">
            <IoIosArrowBack
              size={16}
              className="p-1 box-content hover:bg-slate-100 rounded cursor-pointer"
            />
            <Button size={'sm'} variant={'ghost'} className="flex-1">
              2024
            </Button>
            <IoIosArrowForward
              size={16}
              className=" box-content hover:bg-slate-100 cursor-pointer rounded p-1"
            />
          </div>
          <div className="grid grid-cols-4 w-fit">
            {months.map((month) => (
              <Button key={month} size={'icon'} variant={'ghost'}>
                {month}
              </Button>
            ))}
          </div>
          <Button variant={'link'}>Mês atual</Button>
        </PopoverContent>
      </Popover>
      <IoIosArrowForward
        size={20}
        className=" box-content hover:bg-slate-100 cursor-pointer rounded p-1"
      />
    </div>
  )
}
