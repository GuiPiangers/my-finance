import { updateLaunch } from '@/server/launch/launch'
import { LaunchData, UpdateLaunchData } from '@/server/launch/launchSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export function useUpdateLaunch() {
  const queryClient = useQueryClient()

  const searchParams = useSearchParams()

  const month = searchParams.get('month')
    ? +searchParams.get('month')!
    : new Date().getMonth()
  const year = searchParams.get('year')
    ? +searchParams.get('year')!
    : new Date().getFullYear()

  const mutation = useMutation({
    mutationFn: async (data: UpdateLaunchData) => {
      await updateLaunch(data)
    },
    onMutate: async (updateLaunchData) => {
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
          const updatedLaunches = oldQuery?.map((launch) => {
            if (launch.id === updateLaunchData.id)
              return { ...launch, ...updateLaunchData }

            return launch
          })
          return updatedLaunches
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
