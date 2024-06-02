import { deleteLaunch } from '@/server/launch/launch'
import { LaunchData } from '@/server/launch/launchSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteLaunch() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({ launchId }: { launchId: string }) => {
      await deleteLaunch({ launchId })
    },
    onMutate: async ({ launchId }) => {
      await queryClient.cancelQueries({ queryKey: ['listLaunches'] })
      const previousLaunches = queryClient.getQueryData<LaunchData[]>([
        'listLaunches',
      ])

      queryClient.setQueryData<LaunchData[]>(['listLaunches'], (oldQuery) => {
        return oldQuery?.filter((launch) => launch.id !== launchId)
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
