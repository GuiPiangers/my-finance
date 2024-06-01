'use client'

import { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '../../ui/dialog'
import { LaunchData } from '@/server/launch/launchSchema'
import MoneyNumber from '../../moneyNumber/MoneyNumber'
import { Switch } from '../../ui/switch'
import { Label } from '../../ui/label'
import UpdateLaunchDialog from '../updateLaunchDialog/updateLaunchDialog'
import { DialogProps } from '@radix-ui/react-dialog'
import { updateLaunch } from '@/server/launch/launch'
import { useRouter } from 'next/navigation'

type LaunchInfoDialogProps = {
  children: ReactNode
  data: LaunchData
} & DialogProps

export default function LaunchInfoDialog({
  children,
  data: launchData,
  ...dialogProps
}: LaunchInfoDialogProps) {
  const router = useRouter()
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
                await updateLaunch({
                  id: launchData.id!,
                  status: value ? 'payed' : 'payable',
                })
                router.refresh()
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
              <span>{new Date(launchData.date).toLocaleDateString()}</span>
            )}
          </div>
          <div className="flex flex-col">
            {launchData && <UpdateLaunchDialog initialData={launchData} />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
