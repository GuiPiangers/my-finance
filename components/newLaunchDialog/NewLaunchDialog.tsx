'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Currency } from '@/utils/Currency'
import { typeEnum } from '@/server/launch/launch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Switch } from '../ui/switch'
import { Form, FormField } from '../ui/form'
import {
  LaunchData,
  LaunchDataSchema,
} from '../dataTable/launchDataTable/columns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

function GenerateLaunchForm(type: typeEnum) {
  const [value, setValue] = useState('R$ 00,00')

  const form = useForm<LaunchData>({
    resolver: zodResolver(LaunchDataSchema),
    defaultValues: {
      id: '',
    },
  })

  return (
    <Form {...form}>
      <form>
        <FormField />
        <div className="space-y-1">
          <Label htmlFor="ipt-value">Valor</Label>
          <Input
            autoFocus
            value={value}
            id="ipt-value"
            onChange={(e) => {
              const newValue = e.target.value
              setValue(`R$ ${Currency.format(newValue)}`)
            }}
            className={type === 'revenue' ? 'text-green-700' : 'text-red-700'}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ipt-description">Descrição</Label>
          <Input id="ipt-description" />
        </div>
        <div className="w-full space-y-1">
          <Label>Categoria</Label>
          <Select>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-green-500 rounded"></div>
                  <span>Receita</span>
                </div>
              </SelectItem>
              <SelectItem value="expenditure">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-red-500 rounded"></div>
                  <span>Despesa</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center w-full gap-4">
          <div className="space-y-1 w-full">
            <Label htmlFor="ipt-date">Data</Label>
            <Input id="ipt-date" type="date" />
          </div>
          <div className="w-full space-y-1">
            <Label>Status</Label>
            <div className="flex flex-row-reverse items-center space-x-2">
              <Switch id="swt-status" />
              <Label
                htmlFor="swt-status"
                className="flex-1 text-yellow-200 peer-aria-checked:text-blue-200"
              >
                <span className="flex items-center gap-2 group ">
                  <span className="w-5 h-5 bg-current inline-block rounded " />{' '}
                  <span className="text-black">
                    {type === 'revenue' ? 'Pago' : 'Recebido'}
                  </span>
                </span>
              </Label>
            </div>
          </div>
        </div>
        <DialogFooter className="border-t pt-4">
          <Button variant={'create'} className="w-40">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default function NewLaunchDialog() {
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

          <TabsContent value="expenditure" className="space-y-4 *:px-8">
            {GenerateLaunchForm('expenditure')}
          </TabsContent>
          <TabsContent value="revenue" className="space-y-4 *:px-8">
            {GenerateLaunchForm('revenue')}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
