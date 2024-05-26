/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('myFinance-token')?.value
  const refreshToken = request.cookies.get('myFinance-refresh-token')?.value
  const signURL = new URL('/login', request.url)
  const response = NextResponse.next()
  if (!refreshToken) {
    return NextResponse.redirect(signURL)
  }
  if (!token) {
    const { refreshTokenId, userId } = jwt.decode(refreshToken, {
      complete: false,
    }) as { refreshTokenId: string; userId: string }
    const newToken = await fetch('http://localhost:3333/refreshToken', {
      method: 'POST',
      body: JSON.stringify({ refreshTokenId, userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (newToken.status !== 200) {
      return NextResponse.redirect(signURL)
    }
    const { token: newTokenData } = (await newToken.json()) as { token: string }
    response.cookies.set('myFinance-token', newTokenData, { maxAge: 60 * 15 })
  }

  return response
}

export const config = {
  matcher: ['/lancamentos'],
}
