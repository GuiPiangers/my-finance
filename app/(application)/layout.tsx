import Header from '@/components/header/Header'
import { ReactNode } from 'react'

type LayoutApplication = {
  children: ReactNode
}

export default function LayoutApplication({ children }: LayoutApplication) {
  return (
    <div className="grid md:grid-cols-[auto_1fr] grid-cols-1">
      <Header name="Guilherme Eduardo" />
      {children}
    </div>
  )
}
