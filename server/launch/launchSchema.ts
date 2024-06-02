import { z } from 'zod'

export const LaunchDataSchema = z.object({
  id: z.string().optional(),
  date: z.string(),
  description: z.string(),
  category: z.string().optional(),
  value: z.number(),
  type: z.enum(['revenue', 'expenditure']),
  status: z.enum(['payed', 'payable']),
})

export type typeEnum = 'revenue' | 'expenditure'
export type statusEnum = 'payed' | 'payable'

export type LaunchData = z.infer<typeof LaunchDataSchema> & { id: string }

export type CreateLaunchData = Omit<LaunchData, 'id'>
export type UpdateLaunchData = Partial<LaunchData> & { id: string }
export type ChangeLaunchStatusData = { id: string; status: boolean }
