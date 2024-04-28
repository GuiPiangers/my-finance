import Header from '@/components/header/Header'
import { ReactNode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'

type LayoutApplication = {
  children: ReactNode
}

export default function LayoutApplication({ children }: LayoutApplication) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.CLIENT_ID!}
      key={process.env.KEY}
    >
      <div className="grid md:grid-cols-[auto_1fr] grid-cols-1">
        <Header name="Guilherme Eduardo" />
        {children}
      </div>
    </GoogleOAuthProvider>
  )
}
