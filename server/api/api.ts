import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import jwt from 'jsonwebtoken'

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
  cookieService: ReadonlyRequestCookies,
  input: RequestInfo,
  init?: RequestInit | undefined,
): Promise<T | responseError> {
  const baseURL = 'http://localhost:3333'

  const token = cookieService.get('myFinance-token')
  const refreshToken = cookieService.get('myFinance-refresh-token')

  const data = await request(`${baseURL}${input}`, { ...init }, token?.value)

  if (data.status === 401 && refreshToken) {
    const { refreshTokenId } = (await jwt.decode(refreshToken.value, {
      complete: false,
    })) as {
      userId: string
      refreshTokenId: string
      iat: number
      exp: number
    }

    const { token: newToken } = await request(`${baseURL}/refreshToken`, {
      method: 'POST',
      body: JSON.stringify({
        refreshTokenId,
        userId: '3e8c584c-2920-4b4a-8bf2-196d9d44c0da',
      }),
    }).then((res) => res.json())

    if (!newToken) throw new Error('Falha de autenticação')
    const newData = await request(`${baseURL}${input}`, { ...init }, newToken)
    cookieService.set('myFinance-token', newToken, { maxAge: 60 * 10 })

    return await newData.json()
  }
  return data.json()
}
