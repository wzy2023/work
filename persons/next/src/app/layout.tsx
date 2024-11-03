import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next App',
  description: 'next app',
}

export default function RootLayout({ children }: any) {
  return (
    <html lang='en'>
      <body className='antialiased'>
        {children}
      </body>
    </html>
  )
}
