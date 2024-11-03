'use cli'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        side
      </div>
      <Link href={'./list'}>list</Link>
      <Link href={'./detail'}>detail</Link>
      <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>{children}</div>
    </div>
  )
}
