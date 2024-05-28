/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { revalidateToken } from './server/api/api'

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('myFinance-token')?.value
  const refreshToken = request.cookies.get('myFinance-refresh-token')?.value
  const signURL = new URL('/login', request.url)
  const response = NextResponse.next()
  if (!refreshToken) {
    return NextResponse.redirect(signURL)
  }
  if (!token) {
    const newToken = await revalidateToken({ refreshToken })

    if (!newToken) {
      return NextResponse.redirect(signURL)
    }
    response.cookies.set('myFinance-token', newToken, { maxAge: 60 * 15 })
  }
  console.log(
    'mensagem middleware ' + response.cookies.get('myFinance-token')?.value,
  )
  return response
}

export const config = {
  matcher: ['/lancamentos'],
}
