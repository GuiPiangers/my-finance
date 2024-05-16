'use client'

import { loginWithGoogle } from '@/server/authentication/authentication'
import { GoogleLogin } from '@react-oauth/google'

export default function GoogleAuth() {
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const { credential } = credentialResponse
        if (!credential) return
        const authData = await loginWithGoogle({ token: credential })
        console.log(authData)
      }}
      onError={() => {
        console.log('Login Failed')
      }}
    />
  )
}
