'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  BulbOutlined,
} from '@ant-design/icons'

interface MenuItem {
  key: string
  title: string
  path: string
  icon: React.ReactNode
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    key: 'habit',
    title: '习惯管理',
    path: '/habit/manage',
    icon: <CalendarOutlined />,
  },
  {
    key: 'task',
    title: '任务规划',
    path: '/task',
    icon: <AppstoreOutlined />,
  },
  {
    key: 'buttons',
    title: '按钮大盘',
    path: '/buttons/cma9f76o7001d138o5rq707ls',
    icon: <HomeOutlined />,
  },
  {
    key: 'collecting',
    title: '资料收集',
    path: '/collecting',
    icon: <FileTextOutlined />,
  },
  {
    key: 'product',
    title: '需求完善',
    path: '/product',
    icon: <BulbOutlined />,
  },
  {
    key: 'rss',
    title: 'RSS信息',
    path: '/rss',
    icon: <BulbOutlined />,
  },
]

export const MenuContent = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [menuWidth, setMenuWidth] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // 监控菜单宽度变化
  useEffect(() => {
    if (!menuRef.current) return

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setMenuWidth(entry.contentRect.width)
      }
    })

    resizeObserver.observe(menuRef.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  // 判断当前路径是否匹配菜单项
  const isActive = (path: string) => {
    return pathname.startsWith(path.split('/').slice(0, 2).join('/'))
  }

  // 是否应该显示标题
  const shouldShowTitle = menuWidth > 180

  return (
    <div
      ref={menuRef}
      className={`bg-gray-100 h-screen flex flex-col transition-all ${collapsed ? 'w-16' : 'w-48'}`}
    >
      <div className='p-4 flex items-center justify-between'>
        {shouldShowTitle && <div className='text-xl font-bold'>个人助手</div>}
        <Button
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className='flex items-center justify-center'
        />
      </div>
      <ul className='flex-1 overflow-y-auto'>
        {menuItems.map((item) => (
          <li key={item.key}>
            <Link
              href={item.path}
              className={`flex items-center py-2 transition-colors justify-center ${collapsed ? '' : 'pr-4'} ${isActive(item.path) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
            >
              <span className='text-lg'>
                {item.icon}
              </span>
              {shouldShowTitle && (
                <span className='ml-2'>
                  {item.title}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MenuContent
