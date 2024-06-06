'use server'

import { cookies as nextCookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { api } from '../api/api'

type AuthData = {
  token: string
  refreshToken: string
  user: {
    id: string
    email: string
    name: string
  }
}

type User = {
  email: string
  name: string
  emailVerified: boolean
  phone?: string
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
  redirect('/')
}

export const getUser = async () => {
  const user = await api<User>('/user', {
    method: 'GET',
  })

  return user
}
export const logout = async () => {
  await api('/logout', {
    method: 'post',
  })
}
