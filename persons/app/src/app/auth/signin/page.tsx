'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button, Card, message, Space, Typography, Spin } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'

import { signIn } from 'next-auth/react'

const { Title, Paragraph, Text } = Typography

const SignInPage = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const error = searchParams.get('error')

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl })
    } catch (error) {
      console.error('登录失败:', error)
      message.error('登录失败，请稍后重试')
    }
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100'>
      <div className='text-center mb-8'>
        <Title level={1}>个人助手系统</Title>
      </div>

      <Card className='w-full max-w-md shadow-lg'>
        <div className='text-center mb-8'>
          <Title level={3}>账号登录</Title>
          <Paragraph>
            使用 Google 账号登录系统
          </Paragraph>
          {error && (
            <Text type='danger'>
              {error === 'AccessDenied' ? '登录权限被拒绝' : '登录失败，请重试'}
            </Text>
          )}
        </div>

        <Space direction='vertical' className='w-full'>
          <Button
            type='primary'
            size='large'
            icon={<GoogleOutlined />}
            onClick={handleGoogleSignIn}
            block
          >
            Google 账号登录
          </Button>

          <div className='text-center mt-6'>
            <Text type='secondary'>
              只有经过授权的账号才能访问核心功能
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  )
}

export default () => (
  <Suspense fallback={<Spin />}>
    <SignInPage />
  </Suspense>
)
