import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components'
import { AuthProvider } from '@/contexts/AuthContext'
import { EventProvider } from '@/contexts/EventContext'
import MainWrapper from './MainWrapper'
import Footer from '@/components/Footer'
import NextTopLoader from 'nextjs-toploader';

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
        <NextTopLoader color='#2564eb' />
        <AuthProvider>
          <EventProvider>
            <Header />
            <MainWrapper>
              {children}
            </MainWrapper>
            <Footer />
          </EventProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
