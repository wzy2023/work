'use client'

import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button, Result, Card, Typography, Spin } from 'antd'
import { LoginOutlined, HomeOutlined } from '@ant-design/icons'

const AuthError = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = () => {
    switch (error) {
      case 'Configuration':
        return '服务器配置错误，请联系管理员'
      case 'AccessDenied':
        return '访问被拒绝，您可能没有权限'
      case 'Verification':
        return '验证链接已过期或已被使用'
      default:
        return '登录过程中出现错误，请重试'
    }
  }

  const handleBackToSignIn = () => {
    router.push('/auth/signin')
  }

  const handleBackHome = () => {
    router.push('/')
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100'>
      <Card className='w-full max-w-lg shadow-lg'>
        <Result
          status='error'
          title='登录失败'
          subTitle={
            <div className='mt-4'>
              <Typography.Paragraph>
                {getErrorMessage()}
              </Typography.Paragraph>
              <Typography.Paragraph>
                请尝试重新登录或联系管理员获取帮助。
              </Typography.Paragraph>
            </div>
          }
          extra={[
            <Button key='home' icon={<HomeOutlined />} onClick={handleBackHome}>
              返回首页
            </Button>,
            <Button key='signin' type='primary' icon={<LoginOutlined />} onClick={handleBackToSignIn}>
              重新登录
            </Button>,
          ]}
        />
      </Card>
    </div>
  )
}

export default () => (
  <Suspense fallback={<Spin />}>
    <AuthError />
  </Suspense>
)
