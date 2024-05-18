'use server'

import { cookies as nextCookies } from 'next/headers'
import { api } from '../api/api'

export type typeEnum = 'revenue' | 'expenditure'
export type statusEnum = 'payed' | 'payable'

export type LaunchDTO = {
  id: string
  date: string
  description: string
  type: typeEnum
  status: statusEnum
  category?: string
  value: number
}

export type CreateLaunch = Omit<LaunchDTO, 'id'>

type UpdateLaunch = LaunchDTO

const cookies = nextCookies()

export const createLaunch = async (data: CreateLaunch) => {
  const resp = await api(cookies, '/launch', {
    method: 'POST',
    body: JSON.stringify({ ...data }),
  })
  return resp
}

export const listLaunches = async () => {
  const launches = await api<LaunchDTO[]>(cookies, '/launch', {
    method: 'GET',
  })

  return launches
}
export const getLaunch = async ({ launchId }: { launchId: string }) => {
  const launch = await api<LaunchDTO>(cookies, `/launch/${launchId}`, {
    method: 'GET',
  })
  return launch
}
export const deleteLaunch = async ({ launchId }: { launchId: string }) => {
  await api(cookies, `/launch`, {
    method: 'DELETE',
    body: JSON.stringify({ id: launchId }),
  })
}

export const updateLaunch = async ({ id, ...data }: UpdateLaunch) => {
  await api(cookies, `/launch/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ ...data }),
  })
}
