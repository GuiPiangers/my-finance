/* eslint-disable no-useless-constructor */
'use server'

import { cookies } from 'next/headers'
import { api } from './api/api'

export const test = async () => {
  const handleCookie = cookies()
  await api(handleCookie, '/launch', {
    method: 'POST',
    body: JSON.stringify({
      date: '24/04/2024',
      description: 'Salário MQB',
      value: 2000,
      type: 'revenue',
      status: 'payed',
    }),
  })
  const listLaunches = await api(handleCookie, '/launch', {
    method: 'GET',
  })
  // console.log(listLaunches)
}
