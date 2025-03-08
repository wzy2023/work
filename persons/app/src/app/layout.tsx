import { type ReactNode } from 'react'
import { type Metadata } from 'next'

import { ConfigProvider } from 'antd'
import { AntdRegistry } from '@ant-design/nextjs-registry'

import { TRPCReactProvider } from '@/api/react'

import '@/styles/globals.css'
import { GeistSans } from 'geist/font/sans'

import locale from 'antd/locale/zh_CN'

export const metadata: Metadata = {
  title: 'App',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='zh-CN' className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <AntdRegistry>
            <ConfigProvider locale={locale}>
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
