import Header from '@/components/header/Header'
import { getUser } from '@/server/authentication/authentication'
import { ReactNode } from 'react'

type LayoutApplication = {
  children: ReactNode
}

export default async function LayoutApplication({
  children,
}: LayoutApplication) {
  const user = await getUser()

  return (
    <div className="grid md:grid-cols-[auto_1fr] grid-cols-1">
      <Header name={user.name} />
      {children}
    </div>
  )
}
