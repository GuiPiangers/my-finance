'use client'

import { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { LaunchForm } from '../launchForm/launchForm'
import { useCreateLaunch } from '@/hooks/useCreateLaunch'
import { typeEnum } from '@/server/launch/launchSchema'

type NewLaunchFormProps = { type: typeEnum; onSuccess?(): void }

const NewLaunchForm = ({ type, onSuccess }: NewLaunchFormProps) => {
  const createLaunch = useCreateLaunch()

  useEffect(() => {
    if (onSuccess && createLaunch.isSuccess) onSuccess()
  }, [onSuccess, createLaunch.isSuccess])

  return (
    <LaunchForm
      initialLaunchData={{
        type,
        status: 'payable',
        date: new Date().toISOString().substring(0, 10),
      }}
      onSubmit={async (values) => {
        createLaunch.mutate(values)
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
  )
}

export default function NewLaunchDialog() {
  const [tab, setTab] = useState<'expenditure' | 'revenue' | 'transfer'>(
    'expenditure',
  )
  const [dialogOpen, setDialogOpen] = useState(false)
  const HeaderText = {
    expenditure: (
      <DialogTitle className="text-red-600">Nova despesa</DialogTitle>
    ),
    revenue: <DialogTitle className="text-green-600">Nova receita</DialogTitle>,
    transfer: (
      <DialogTitle className="text-purple-600">Nova transferência</DialogTitle>
    ),
  }
  console.log(tab)

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(isOpen) => {
        setDialogOpen(isOpen)
        if (isOpen) setTab('expenditure')
      }}
    >
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
            <NewLaunchForm
              type="expenditure"
              onSuccess={() => {
                setDialogOpen(false)
              }}
            />
          </TabsContent>
          <TabsContent value="revenue">
            <NewLaunchForm
              type="revenue"
              onSuccess={() => {
                setDialogOpen(false)
              }}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
