'use client'

import React from 'react'
import { Button, Result } from 'antd'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function NewUser() {
  const router = useRouter()
  const { data: session } = useSession()

  const handleContinue = () => {
    router.push('/auth/unauthorized')
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-6'>
      <Result
        status='success'
        title='欢迎加入!'
        subTitle={
          <>
            <p>
              您好 {session?.user?.name || '新用户'}，您的账号已成功注册。
            </p>
            <p>
              您的账号目前权限受限，某些功能可能无法访问。
            </p>
          </>
        }
        extra={[
          <Button key='continue' type='primary' onClick={handleContinue}>
            继续
          </Button>,
        ]}
      />
    </div>
  )
}
