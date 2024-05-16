'use server'

import { cookies as nextCookies } from 'next/headers'
import { api } from '../api/api'

type typeEnum = 'revenue' | 'expenditure'
type statusEnum = 'payed' | 'payable'

export type LaunchDTO = {
  id?: string
  userId: string
  date: string
  description: string
  type: typeEnum
  status: statusEnum
  category?: string
  value: number
}

type UpdateLaunch = Partial<Omit<LaunchDTO, 'userId'>> & { id: string }

const cookies = nextCookies()

export const createLaunch = async (data: LaunchDTO) => {
  await api(cookies, 'launch', {
    method: 'POST',
    body: JSON.stringify({ data }),
  })
}

export const listLaunches = async () => {
  await api(cookies, '/launch', {
    method: 'GET',
  })
}
export const getLaunch = async ({ launchId }: { launchId: string }) => {
  await api(cookies, `/launch/${launchId}`, {
    method: 'GET',
  })
}
export const deleteLaunch = async ({ launchId }: { launchId: string }) => {
  await api(cookies, `/launch`, {
    method: 'DELETE',
    body: JSON.stringify({ id: launchId }),
  })
}

export const updateLaunch = async ({ id, ...data }: UpdateLaunch) => {
  await api(cookies, `launch/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ data }),
  })
}
