'use server'

import { api } from '../api/api'
import {
  ChangeLaunchStatusData,
  CreateLaunchData,
  LaunchData,
  UpdateLaunchData,
} from './launchSchema'

export const createLaunch = async (data: CreateLaunchData) => {
  const resp = await api('/launch', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return resp
}

export const listLaunchesByMonthAndYear = async ({
  month,
  year,
}: {
  month: number
  year: number
}) => {
  const launches = await api<LaunchData[]>(
    `/launch?month=${month}&year=${year}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  )
  console.log(month, year)

  return launches
}
export const getLaunch = async ({ launchId }: { launchId: string }) => {
  const launch = await api<LaunchData>(`/launch/${launchId}`, {
    method: 'GET',
  })
  return launch
}
export const deleteLaunch = async ({ launchId }: { launchId: string }) => {
  await api(`/launch/${launchId}`, {
    method: 'DELETE',
  })
}

export const updateLaunch = async ({ id, ...data }: UpdateLaunchData) => {
  await api(`/launch/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}
export const changeLaunchStatus = async ({
  id,
  status,
}: ChangeLaunchStatusData) => {
  await api(`/launch/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      status: status ? 'payed' : 'payable',
    }),
  })
}
