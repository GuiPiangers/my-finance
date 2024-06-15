'use client'

import { deleteLaunch } from '@/server/launch/launch'
import { LaunchData } from '@/server/launch/launchSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export function useDeleteLaunch() {
  const queryClient = useQueryClient()

  const searchParams = useSearchParams()

  const month = searchParams.get('month')
    ? +searchParams.get('month')!
    : new Date().getMonth()
  const year = searchParams.get('year')
    ? +searchParams.get('year')!
    : new Date().getFullYear()

  const mutation = useMutation({
    mutationFn: async ({ launchId }: { launchId: string }) => {
      await deleteLaunch({ launchId })
    },
    onMutate: async ({ launchId }) => {
      await queryClient.cancelQueries({
        queryKey: ['listLaunches', { month, year }],
      })
      const previousLaunches = queryClient.getQueryData<LaunchData[]>([
        'listLaunches',
        { month, year },
      ])

      queryClient.setQueryData<LaunchData[]>(
        ['listLaunches', { month, year }],
        (oldQuery) => {
          return oldQuery?.filter((launch) => launch.id !== launchId)
        },
      )
      return { previousLaunches }
    },

    onError: (_err, newTodo, context) => {
      queryClient.setQueryData(
        ['listLaunches', { month, year }],
        context?.previousLaunches,
      )
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['listLaunches', { month, year }],
      })
    },
  })

  return mutation
}
