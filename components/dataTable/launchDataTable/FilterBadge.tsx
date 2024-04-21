import { ReactNode } from 'react'
import { tv } from 'tailwind-variants'

const FilterBadgeStyle = tv({
  base: 'flex gap-2 items-center text-xs text-muted-foreground pl-4 pr-2 py-1 rounded-full bg-slate-200 text-slate-800',

  variants: {
    type: {
      payed: 'bg-blue-200 text-blue-950',
      payable: 'bg-yellow-200 text-yellow-950',
      expenditure: 'bg-red-200 text-red-950',
      revenue: 'bg-green-200 text-green-950',
    },
  },
})

const filterBadgeText = {
  payed: 'Pago / Recebido',
  payable: 'A pagar / A Receber',
  expenditure: 'Despesa',
  revenue: 'Receita',
}

export type FilterBadgeKeys = keyof typeof filterBadgeText

type FilterBadgeProps = {
  filter: FilterBadgeKeys | string[]
  children?: ReactNode
  className?: string
}

export default function FilterBadge({
  filter,
  children,
  className,
}: FilterBadgeProps) {
  return (
    <div
      className={FilterBadgeStyle({
        type: filter as FilterBadgeKeys,
        className,
      })}
    >
      {typeof filter === 'string'
        ? filterBadgeText[filter as FilterBadgeKeys]
        : filter.map((value, index) => {
            if (index < filter.length - 1) return value + ' | '
            return value
          })}
      {children}
    </div>
  )
}
