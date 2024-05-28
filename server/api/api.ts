import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
const baseURL = 'http://localhost:3333'

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

export const revalidateToken = async ({
  refreshToken,
}: {
  refreshToken: string
}) => {
  const { refreshTokenId, userId } = jwt.decode(refreshToken, {
    complete: false,
  }) as { refreshTokenId: string; userId: string }
  const { token } = await request(`${baseURL}/refreshToken`, {
    method: 'POST',
    body: JSON.stringify({ refreshTokenId, userId }),
  }).then((res) => res.json())

  return token
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
  const token = cookies().get('myFinance-token')?.value
  const refreshToken = cookies().get('myFinance-refresh-token')?.value

  const data = await request(`${baseURL}${input}`, { ...init }, token)

  if (data.status === 401 && refreshToken) {
    const newToken = await revalidateToken({ refreshToken })

    if (!newToken) throw new Error('Falha de autenticação')
    const newData = await request(`${baseURL}${input}`, { ...init }, newToken)

    return await newData.json()
  }

  return data.json()
}
