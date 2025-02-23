import '@/styles/globals.css'

import { type ReactNode } from 'react'
import { type Metadata } from 'next'

import { TRPCReactProvider } from '@/trpc/react'
import { GeistSans } from 'geist/font/sans'

export const metadata: Metadata = {
  title: 'App',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  )
}
