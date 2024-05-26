/* eslint-disable eqeqeq */

import { LaunchDataTable } from '@/components/dataTable/launchDataTable/launchDataTable'
import NewLaunchDialog from '@/components/launch/newLaunchDialog/NewLaunchDialog'
// import { Button } from '@/components/ui/button'
import { listLaunches } from '@/server/launch/launch'

export default async function Launch() {
  const launchData = await listLaunches()

  return (
    <main className="py-10 px-6 space-y-4 w-full max-w-screen-xl mx-auto">
      <div className="flex gap-6 items-center mb-10">
        <h1 className="text-2xl">Lançamentos</h1>
        <NewLaunchDialog />
      </div>
      <LaunchDataTable data={launchData} />
    </main>
  )
}
