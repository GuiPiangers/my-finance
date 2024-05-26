// import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const request = async (
  input: RequestInfo,
  init?: RequestInit | undefined,
  token?: string,
) => {
  const data = await fetch(input, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...init,
  })
  return data
}

export type responseError = {
  message: string
  statusCode: number
  type: string
  error: boolean
}

export async function api<T>(
  input: RequestInfo,
  init?: RequestInit | undefined,
): Promise<T> {
  const baseURL = 'http://localhost:3333'

  const token = cookies().get('myFinance-token')?.value

  const data = await request(`${baseURL}${input}`, { ...init }, token)
  return data.json()
}
