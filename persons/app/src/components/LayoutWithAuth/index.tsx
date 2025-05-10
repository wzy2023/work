'use client'

import { type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { Spin } from 'antd'
import { SideMenu, menuItems } from '../SideMenu'

import { useSession } from 'next-auth/react'

interface LayoutWithAuthProps {
  children: ReactNode
}

export const LayoutWithAuth = ({ children }: LayoutWithAuthProps) => {
  const { status, data: session } = useSession()

  const router = useRouter()
  const pathname = usePathname()

  // 登录相关的路径列表
  const isAuthExemptPaths = [
    '/auth/signin', // 登录页
    '/auth/unauthorized', // 未授权
    '/auth/error',
    '/auth/new-user', // 欢迎新用户
  ]

  // 如果符合上面的路径列表，直接显示内容
  if (isAuthExemptPaths.some(path => pathname.startsWith(path))) {
    return (
      <div className='min-h-screen'>
        {children}
      </div>
    )
  }

  // 当前页面的配置
  const currentPage = menuItems.find(item => pathname.startsWith(item.path))

  // 判断当前页面是否需要校验权限
  if (currentPage?.allowedRoles?.length) {

    // 如果正在加载状态，显示加载中
    if (status === 'loading') {
      return (
        <div className='flex justify-center items-center min-h-screen'>
          <Spin size='large' tip='正在加载...' />
        </div>
      )
    }

    // 如果未登录，跳转到登录页面
    if (status === 'unauthenticated') {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`)
      return
    }

    // 如果已登录，但无权限，跳转到未授权页面
    if (status === 'authenticated' && !currentPage.allowedRoles.includes(session.user.role)) {
      router.push(`/auth/unauthorized?callbackUrl=${encodeURIComponent(pathname)}`)
      return
    }
  }

  return (
    <div className='flex h-screen overflow-hidden'>
      <SideMenu />
      <main className='flex-1 overflow-auto'>
        {children}
      </main>
    </div>
  )
}
