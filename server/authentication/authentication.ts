'use server'

import { cookies as nextCookies } from 'next/headers'

type AuthData = {
  token: string
  refreshToken: string
  user: {
    id: string
    email: string
    name: string
  }
}

export const loginWithGoogle = async ({ token }: { token: string }) => {
  const cookies = nextCookies()
  const response = await fetch('http://localhost:3333/login/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })

  const authData = (await response.json()) as AuthData
  cookies.set('myFinance-token', authData.token)
  cookies.set('myFinance-refresh-token', authData.refreshToken)
  return authData
}
