'use client'

import { loginWithGoogle } from '@/server/authentication/authentication'
import { GoogleLogin } from '@react-oauth/google'

export default function GoogleAuth() {
  return (
    <>
      <GoogleLogin
        text="signin"
        theme="outline"
        width={'334px'}
        onSuccess={async (credentialResponse) => {
          const { credential } = credentialResponse
          console.log(credentialResponse)
          if (!credential) return
          await loginWithGoogle({ token: credential })
        }}
        onError={() => {}}
      />
    </>
  )
}
