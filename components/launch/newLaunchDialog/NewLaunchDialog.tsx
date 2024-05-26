'use client'

import { useState } from 'react'
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { GenerateLaunchForm } from '../generateLaunchForm/generateLaunchForm'
import { createLaunch } from '@/server/launch/launch'
import { LaunchData } from '@/server/launch/launchSchema'
import { useRouter } from 'next/navigation'

export default function NewLaunchDialog() {
  const router = useRouter()
  const [tab, setTab] = useState<'expenditure' | 'revenue' | 'transfer'>(
    'expenditure',
  )
  const HeaderText = {
    expenditure: (
      <DialogTitle className="text-red-600">Nova despesa</DialogTitle>
    ),
    revenue: <DialogTitle className="text-green-600">Nova receita</DialogTitle>,
    transfer: (
      <DialogTitle className="text-purple-600">Nova transferência</DialogTitle>
    ),
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'create'} size={'sm'}>
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 ">
        <Tabs
          defaultValue="expenditure"
          className=" space-y-4 pt-8 pb-4"
          onValueChange={(newTab) =>
            setTab(newTab as 'expenditure' | 'revenue' | 'transfer')
          }
        >
          <DialogHeader className="px-8 pb-4">{HeaderText[tab]}</DialogHeader>
          <TabsList className="mx-8 ">
            <TabsTrigger className="w-full flex-1" value="expenditure">
              Despesa
            </TabsTrigger>
            <TabsTrigger value="revenue">Receita</TabsTrigger>
            <TabsTrigger className="w-full" value="transfer">
              Transferência
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenditure">
            <GenerateLaunchForm
              initialLaunchData={{
                type: 'expenditure',
                status: 'payable',
                date: new Date().toISOString().substring(0, 10),
              }}
              onSubmit={async (data: LaunchData) => {
                await createLaunch(data)
                router.refresh()
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
          </TabsContent>
          <TabsContent value="revenue">
            <GenerateLaunchForm
              initialLaunchData={{ type: 'revenue', status: 'payable' }}
              onSubmit={async (data: LaunchData) => {
                await createLaunch(data)
                router.refresh()
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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
