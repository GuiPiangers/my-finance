'use client'

import { useUpdateLaunch } from '@/hooks/useUpdateLaunch'
import { Button } from '../../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog'

import { LaunchForm } from '../launchForm/launchForm'
import { LaunchData } from '@/server/launch/launchSchema'
import { DialogProps } from '@radix-ui/react-dialog'
import { useEffect } from 'react'

type UpdateLaunchDialogProps = {
  initialData: Partial<LaunchData>
  onSuccess?(): void
} & DialogProps

export default function UpdateLaunchDialog({
  initialData,
  onSuccess,
  ...dialogProps
}: UpdateLaunchDialogProps) {
  const { type, category, date, description, id, status, value } = initialData

  const updateLaunch = useUpdateLaunch()
  const HeaderText = {
    expenditure: (
      <DialogTitle className="text-red-600">Editar despesa</DialogTitle>
    ),
    revenue: (
      <DialogTitle className="text-green-600">Editar receita</DialogTitle>
    ),
  }

  useEffect(() => {
    if (updateLaunch.isSuccess && onSuccess) {
      onSuccess()
      updateLaunch.reset()
    }
  }, [onSuccess, updateLaunch, updateLaunch.isSuccess])

  return (
    <Dialog {...dialogProps}>
      <DialogContent className="px-0 pt-8 ">
        <DialogHeader className="px-8 pb-4">
          {type && HeaderText[type]}
        </DialogHeader>

        <LaunchForm
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
            updateLaunch.mutate(data)
          }}
          footerButtons={
            <DialogFooter className="border-t pt-4 px-0 mt-6">
              <div>
                <Button variant={'create'} className="w-40">
                  Salvar
                </Button>
              </div>
            </DialogFooter>
          }
        />
      </DialogContent>
    </Dialog>
  )
}
