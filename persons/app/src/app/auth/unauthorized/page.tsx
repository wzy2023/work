'use client'

import React, { Suspense, useMemo } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button, Card, Result, Space, Spin, Typography } from 'antd'
import { ArrowRightOutlined, LogoutOutlined, RetweetOutlined, StopOutlined } from '@ant-design/icons'

import { type MenuItem, menuItems } from '@/components/SideMenu'

const Unauthorized = () => {
  const { data: session, status } = useSession()

  const router = useRouter()
  const searchParams = useSearchParams()

  const retryUrl = searchParams.get('callbackUrl') || '/'

  const homeUrl = '/'

  // 检查用户是否对原始URL有权限
  const hasAccess = useMemo(() => {
    if (status !== 'authenticated' || !retryUrl || retryUrl === '/') {
      return false
    }

    // 查找对应的菜单项
    const targetMenuItem = menuItems.find((item: MenuItem) =>
      retryUrl.startsWith(item.path.split('/').slice(0, 2).join('/')),
    )

    // 如果找不到菜单项或者菜单项没有角色要求，则默认有权限
    if (!targetMenuItem?.allowedRoles || targetMenuItem.allowedRoles.length === 0) {
      return true
    }

    // 检查用户角色是否符合要求
    const userRole = session?.user?.role || ''
    if (targetMenuItem.allowedRoles.includes(userRole)) {
      return true
    }

    return false
  }, [session, status, retryUrl])

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' })
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100'>
      <Card className='w-full max-w-lg shadow-lg'>
        <Result
          status='403'
          title='访问受限'
          icon={<StopOutlined style={{ color: '#f5222d' }} />}
          subTitle={
            <div className='mt-4'>
              <Typography.Paragraph>
                很抱歉，您的账号 <strong>{session?.user?.email}</strong> 没有权限访问此功能。
              </Typography.Paragraph>
              <Typography.Paragraph>
                需要特定邮箱账号才能访问某些功能。如果您认为这是一个错误，请联系管理员申请权限。
              </Typography.Paragraph>
            </div>
          }
          extra={
            <Space>
              {hasAccess ? (
                <Button type='primary' icon={<RetweetOutlined />} onClick={() => router.push(retryUrl)}>
                  重试
                </Button>
              ) : (
                <Button type='primary' icon={<ArrowRightOutlined />} onClick={() => router.push(homeUrl)}>
                  回到首页
                </Button>
              )}
              <Button type='primary' danger icon={<LogoutOutlined />} onClick={handleSignOut}>
                切换账号
              </Button>
            </Space>
          }
        />
      </Card>
    </div>
  )
}

export default () => (
  <Suspense fallback={<Spin />}>
    <Unauthorized />
  </Suspense>
)
