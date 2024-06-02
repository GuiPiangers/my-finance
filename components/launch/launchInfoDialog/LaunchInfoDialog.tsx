'use client'

import { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from '../../ui/dialog'
import { LaunchData } from '@/server/launch/launchSchema'
import MoneyNumber from '../../moneyNumber/MoneyNumber'
import { Switch } from '../../ui/switch'
import { Label } from '../../ui/label'
import { DialogProps } from '@radix-ui/react-dialog'
import { dateFormatter } from '@/utils/Date'
import { useUpdateLaunch } from '@/hooks/useUpdateLaunch'
import { Button } from '@/components/ui/button'

type LaunchInfoDialogProps = {
  children: ReactNode
  data: LaunchData
  onButtonClick?(): void
} & DialogProps

export default function LaunchInfoDialog({
  children,
  data: launchData,
  onButtonClick,
  ...dialogProps
}: LaunchInfoDialogProps) {
  const updateLaunch = useUpdateLaunch()
  return (
    <>
      <Dialog {...dialogProps}>
        {children}
        <DialogContent className=" max-w-80 rounded-lg ">
          <DialogHeader className="">
            <DialogTitle className="text-xl">
              {launchData?.description}
            </DialogTitle>
            <strong
              data-type={launchData?.type}
              className="text-lg data-[type='revenue']:text-green-600 data-[type='expenditure']:text-red-600"
            >
              {launchData && <MoneyNumber number={launchData.value} />}
            </strong>
          </DialogHeader>
          <div className="flex flex-row-reverse justify-between">
            <Switch
              id="swt-status"
              defaultChecked={launchData?.status === 'payed'}
              onCheckedChange={async (value) => {
                updateLaunch.mutate({
                  id: launchData.id!,
                  status: value ? 'payed' : 'payable',
                })
              }}
            />
            <Label
              htmlFor="swt-status"
              className="flex-1 w-full text-yellow-200 peer-aria-checked:text-blue-200"
            >
              <span className="flex items-center gap-2 group">
                <span className="w-5 h-5 bg-current inline-block rounded " />{' '}
                <span className="text-black">
                  {launchData?.type === 'revenue' ? 'Pago' : 'Recebido'}
                </span>
              </span>
            </Label>
          </div>

          <div className="flex gap-2 justify-between text-sm">
            <span>Categoria</span>
            <span>{launchData?.category}</span>
          </div>

          <div className="flex gap-2 justify-between text-sm">
            <span>Data</span>
            {launchData && (
              <span>{dateFormatter.toLocaleDate(launchData.date)}</span>
            )}
          </div>
          <div className="flex flex-col mt-4">
            <DialogClose asChild>
              <Button onClick={onButtonClick} variant={'create'}>
                Editar
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
