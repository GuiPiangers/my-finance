import { HeaderContext } from '@tanstack/react-table'
import { LaunchData } from './launchDataTable/columns'
import { ArrowUpDown } from 'lucide-react'

export default function Sort({
  column,
  text,
}: HeaderContext<LaunchData, unknown> & { text: string }) {
  return (
    <button
      className="flex"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {text}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </button>
  )
}
