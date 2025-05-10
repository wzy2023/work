'use client'

import React from 'react'
import { Card, Typography, Space } from 'antd'
import { useSession } from 'next-auth/react'

const { Title, Paragraph, Text } = Typography

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <Card>
        <Space direction='vertical' size='large' className='w-full'>
          <div>
            <Title level={2}>欢迎使用个人助手系统</Title>
            <Paragraph>
              <Text strong>您好，{session?.user?.name || '用户'}！</Text> 欢迎访问您的个人数据管理中心。
            </Paragraph>
          </div>
        </Space>
      </Card>
    </div>
  )
}
