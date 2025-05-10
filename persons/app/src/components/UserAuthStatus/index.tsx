'use client'

import React from 'react'
import { Avatar, Button, Dropdown, Space, message } from 'antd'
import type { MenuProps } from 'antd'
import { signIn, signOut, useSession } from 'next-auth/react'
import { UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'

export const UserAuthStatus = () => {
  const { data: session, status } = useSession()

  const handleLogin = async () => {
    try {
      await signIn('google')
    } catch (error) {
      console.error('登录失败:', error)
      message.error('登录失败，请稍后重试')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('退出登录失败:', error)
      message.error('退出登录失败，请稍后重试')
    }
  }

  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center p-2'>
        <span className='text-gray-400 text-sm'>加载中...</span>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className='p-2'>
        <Button
          type='text'
          icon={<LoginOutlined />}
          onClick={handleLogin}
          size='small'
          className='flex items-center w-full'
        >
          <span className='ml-1'>登录</span>
        </Button>
      </div>
    )
  }

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <div className='p-2'>
          <div className='font-medium'>{session?.user?.name}</div>
          <div className='text-xs text-gray-500'>{session?.user?.email}</div>
        </div>
      ),
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: () => {
        handleLogout()
      },
    },
  ]

  return (
    <div className='p-2'>
      <Dropdown menu={{ items }} placement='topLeft'>
        <Space className='cursor-pointer w-full flex items-center'>
          <Avatar
            size='small'
            src={session?.user?.image || undefined}
            icon={!session?.user?.image ? <UserOutlined /> : undefined}
          />
          <span className='text-sm text-ellipsis overflow-hidden'>
            {session?.user?.name}
          </span>
        </Space>
      </Dropdown>
    </div>
  )
}
