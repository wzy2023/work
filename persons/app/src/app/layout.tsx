import '@/styles/globals.css'

import { type ReactNode } from 'react'
import { type Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'

import { TRPCReactProvider } from '@/trpc/react'
import { GeistSans } from 'geist/font/sans'

import '@ant-design/v5-patch-for-react-19'

export const metadata: Metadata = {
  title: 'App',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='zh-cn' className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
