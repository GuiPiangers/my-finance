import { Input } from '../../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import { Currency } from '@/utils/Currency'
import { LaunchData, LaunchDataSchema } from '@/server/launch/launchSchema'
import { Switch } from '../../ui/switch'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '../../ui/label'
import { ReactNode, useState } from 'react'
import { moneyFormatter } from '@/utils/moneyFormatter'

type LaunchFormProps = {
  footerButtons: ReactNode
  onSubmit: (values: LaunchData) => Promise<void>
  initialLaunchData?: Partial<LaunchData>
}

export function LaunchForm({
  footerButtons,
  onSubmit,
  initialLaunchData,
}: LaunchFormProps) {
  const [value, setValue] = useState(
    initialLaunchData?.value
      ? moneyFormatter(initialLaunchData.value)
      : 'R$ 0,00',
  )

  const form = useForm<LaunchData>({
    resolver: zodResolver(LaunchDataSchema),
    defaultValues: {
      status: initialLaunchData?.status,
      type: initialLaunchData?.type,
      description: initialLaunchData?.description,
      category: initialLaunchData?.category,
      date: initialLaunchData?.date,
      value: initialLaunchData?.value,
      id: initialLaunchData?.id,
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="*:px-8 flex flex-col gap-2"
      >
        <FormField
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoFocus
                  value={value}
                  onChange={(e) => {
                    const formattedValue = Currency.format(e.target.value)
                    setValue(`R$ ${formattedValue}`)
                    form.setValue('value', +Currency.unFormat(formattedValue))
                  }}
                  className={
                    initialLaunchData?.type === 'revenue'
                      ? 'text-green-700'
                      : 'text-red-700'
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Select
                  defaultValue={initialLaunchData?.category}
                  name={field.name}
                  onValueChange={(value) => form.setValue('category', value)}
                >
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full gap-4">
          <FormField
            name="date"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <Input {...field} type="date" value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="status"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <div className="flex flex-row-reverse items-center gap-2 py-1 w-full justify-between">
                    <Switch
                      {...field}
                      id="swt-status"
                      onCheckedChange={(value) => {
                        form.setValue('status', value ? 'payed' : 'payable')
                      }}
                      defaultChecked={initialLaunchData?.status === 'payed'}
                    />
                    <Label
                      htmlFor="swt-status"
                      className="flex-1 w-full text-yellow-200 peer-aria-checked:text-blue-200"
                    >
                      <span className="flex items-center gap-2 group">
                        <span className="w-5 h-5 bg-current inline-block rounded " />{' '}
                        <span className="text-black">
                          {initialLaunchData?.type === 'revenue'
                            ? 'Recebido'
                            : 'Pago'}
                        </span>
                      </span>
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {footerButtons}
      </form>
    </Form>
  )
}
