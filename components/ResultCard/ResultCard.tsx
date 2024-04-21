import { cn } from '@/lib/utils'
import { moneyFormatter } from '@/utils/moneyFormatter'
import { ReactNode } from 'react'

type ResultCardProps = {
  className?: string
  title: string
  value: number
  subText?: string | number | ReactNode
}

export default function ResultCard({
  className,
  title,
  value,
  subText,
}: ResultCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col p-4 bg-blue-500 rounded-md text-white',
        className,
      )}
    >
      <span className="text-xs">{title}</span>
      <strong className="text-xl">{moneyFormatter(value)}</strong>
      <span className="text-xs mt-2">{subText}</span>
    </div>
  )
}
