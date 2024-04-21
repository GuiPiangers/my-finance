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

export default function NewLaunchDialog() {
  const [value, setValue] = useState('R$ 00,00')
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'create'} size={'sm'}>
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova movimentação</DialogTitle>
        </DialogHeader>
        <div className="flex items-center w-full gap-4">
          <div className="w-full space-y-1">
            <Label htmlFor="slc-type">Tipo</Label>
            <Select>
              <SelectTrigger id="slc-type">
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

          <div className="space-y-1 w-full">
            <Label htmlFor="ipt-date">Data</Label>
            <Input id="ipt-date" type="date" />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="ipt-description">Descrição</Label>
          <Input id="ipt-description" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="ipt-description">Valor</Label>
          <Input
            value={value}
            id="ipt-description"
            onChange={(e) => {
              setValue(`R$ ${Currency.format(e.target.value)}`)
            }}
          />
        </div>

        <div className="flex gap-4 items-center">
          <div className="w-full space-y-1">
            <Label>Categoria</Label>
            <Select>
              <SelectTrigger id="slc-">
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
          <div className="w-full space-y-1">
            <Label>Status</Label>
            <Select>
              <SelectTrigger id="slc-">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payed">
                  <div className="px-4 py-1 text-xs bg-blue-200 rounded w-36 text-center">
                    <span>Pago / Recebido</span>
                  </div>
                </SelectItem>
                <SelectItem value="payable">
                  <div className="px-4 py-1 text-xs bg-yellow-200 rounded w-36 text-center">
                    <span>A pagar / A receber</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant={'create'} className="w-40">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
