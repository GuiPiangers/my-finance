import { moneyFormatter } from '@/utils/moneyFormatter'
import { tv } from 'tailwind-variants'

type MoneyNumberProps = {
  number: number
  className?: string
}

const MoneyNumberStyle = tv({
  variants: {
    isPositive: {
      true: 'text-green-600',
      false: 'text-red-600',
    },
  },
})

export default function MoneyNumber({ number, className }: MoneyNumberProps) {
  return (
    <span
      className={MoneyNumberStyle({
        isPositive: number >= 0,
        className,
      })}
    >
      {moneyFormatter(number)}
    </span>
  )
}
