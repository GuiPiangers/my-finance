import { createLaunch } from '@/server/launch/launch'
import { LaunchData } from '@/server/launch/launchSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateLaunch() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: LaunchData) => {
      await createLaunch(data)
    },
    onMutate: async (newLaunch) => {
      await queryClient.cancelQueries({ queryKey: ['listLaunches'] })
      const previousLaunches = queryClient.getQueryData<LaunchData[]>([
        'listLaunches',
      ])

      queryClient.setQueryData<LaunchData[]>(['listLaunches'], (oldQuery) => {
        if (oldQuery) return [...oldQuery!, newLaunch]
        return [newLaunch]
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
