import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import QueryClientContext from '@/contexts/QueryClientProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { MantineProvider } from '@mantine/core'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Finanças',
  description: 'Sistema de gestão financeira',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={cn(inter.className, 'bg-slate-50')}>
        <GoogleOAuthProvider
          clientId={process.env.CLIENT_ID!}
          key={process.env.KEY}
        >
          <MantineProvider>
            <QueryClientContext>{children}</QueryClientContext>
          </MantineProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}
