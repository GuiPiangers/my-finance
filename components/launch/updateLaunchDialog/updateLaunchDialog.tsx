'use client'

import { Button } from '../../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../../ui/dialog'

import { GenerateLaunchForm } from '../generateLaunchForm/generateLaunchForm'
import { updateLaunch } from '@/server/launch/launch'
import { LaunchData } from '@/server/launch/launchSchema'

// import { useRouter } from 'next/navigation'

type UpdateLaunchDialogProps = {
  initialData: Partial<LaunchData>
}

export default function UpdateLaunchDialog({
  initialData,
}: UpdateLaunchDialogProps) {
  // const router = useRouter()
  const { type, category, date, description, id, status, value } = initialData

  const HeaderText = {
    expenditure: (
      <DialogTitle className="text-red-600">Editar despesa</DialogTitle>
    ),
    revenue: (
      <DialogTitle className="text-green-600">Editar receita</DialogTitle>
    ),
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'create'} size={'sm'}>
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0 pt-8 ">
        <DialogHeader className="px-8 pb-4">
          {type && HeaderText[type]}
        </DialogHeader>

        <GenerateLaunchForm
          initialLaunchData={{
            type,
            category,
            date,
            description,
            id,
            status,
            value,
          }}
          onSubmit={async (data: LaunchData) => {
            await updateLaunch(data)
          }}
          footerButtons={
            <DialogFooter className="border-t pt-4 px-0 mt-6">
              <DialogClose asChild>
                <div>
                  <Button variant={'create'} className="w-40">
                    Salvar
                  </Button>
                </div>
              </DialogClose>
            </DialogFooter>
          }
        />
      </DialogContent>
    </Dialog>
  )
}
