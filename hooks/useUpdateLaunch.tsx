import { updateLaunch } from '@/server/launch/launch'
import { LaunchData, UpdateLaunchData } from '@/server/launch/launchSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateLaunch() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: UpdateLaunchData) => {
      await updateLaunch(data)
    },
    onMutate: async (updateLaunchData) => {
      await queryClient.cancelQueries({ queryKey: ['listLaunches'] })
      const previousLaunches = queryClient.getQueryData<LaunchData[]>([
        'listLaunches',
      ])

      queryClient.setQueryData<LaunchData[]>(['listLaunches'], (oldQuery) => {
        const updatedLaunches = oldQuery?.map((launch) => {
          if (launch.id === updateLaunchData.id)
            return { ...launch, ...updateLaunchData }

          return launch
        })
        return updatedLaunches
      })
      return { previousLaunches }
    },

    onError: (_err, newTodo, context) => {
      queryClient.setQueryData(['listLaunches'], context?.previousLaunches)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['listLaunches'] })
    },
  })

  return mutation
}
