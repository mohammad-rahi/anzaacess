import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components'
import { AuthProvider } from '@/contexts/AuthContext'
import { EventProvider } from '@/contexts/EventContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AnzaAccess',
  description: 'AnzaAccess',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <EventProvider>
            <Header />
            {children}
          </EventProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
