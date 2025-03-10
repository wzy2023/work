import { type ReactNode } from 'react'
import { type Metadata } from 'next'

import { ConfigProvider } from 'antd'
import { AntdRegistry, zh_CN } from '@wzyjs/antd'

import { TRPCReactProvider } from '@/api/react'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'App',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='zh-CN'>
      <body>
        <TRPCReactProvider>
          <AntdRegistry>
            <ConfigProvider locale={zh_CN}>
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
