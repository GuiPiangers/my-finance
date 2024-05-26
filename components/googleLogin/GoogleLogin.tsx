'use client'

import { loginWithGoogle } from '@/server/authentication/authentication'
import { GoogleLogin } from '@react-oauth/google'

export default function GoogleAuth() {
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const { credential } = credentialResponse
        if (!credential) return
        await loginWithGoogle({ token: credential })
      }}
      onError={() => {}}
    />
  )
}
