'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { Tabs } from '@/components'

export default ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()

  // 根据当前路径确定激活的标签页
  const getActiveKey = () => {
    if (pathname.includes('/habit/record')) {
      return 'record'
    }
    return 'manage'
  }

  const handleTabChange = (key: string) => {
    if (key === 'manage') {
      router.push('/habit/manage')
    } else if (key === 'record') {
      router.push('/habit/record')
    }
  }

  return (
    <div className="p-4">
      <Tabs
        activeKey={getActiveKey()}
        onChange={handleTabChange}
        items={[
          {
            key: 'manage',
            label: '习惯管理',
          },
          {
            key: 'record',
            label: '习惯记录',
          },
        ]}
      />
      {children}
    </div>
  )
}
