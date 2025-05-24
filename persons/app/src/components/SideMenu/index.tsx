'use client'

import React, { type ReactNode, useState, useEffect, useRef } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Button } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  BulbOutlined,
  UserOutlined,
  ShoppingOutlined,
  BookOutlined,
} from '@ant-design/icons'

import { UserAuthStatus } from '@/components/UserAuthStatus'

export interface MenuItem {
  key: string
  title: string
  path: string
  icon: ReactNode
  children?: MenuItem[]
  group?: string
  allowedRoles?: string[] // 允许的角色列表，空数组表示不限制角色
}

const menuGroups = {
  Base: '基础',
  Helper: '辅助',
  Collecting: '收集',
  Ai: 'AI',
  Other: '其它',
}

export const menuItems: MenuItem[] = [
  {
    key: 'habit',
    title: '习惯管理',
    path: '/habit/manage',
    icon: <CalendarOutlined />,
    group: menuGroups.Base,
    allowedRoles: ['admin'],
  },
  {
    key: 'task',
    title: '任务规划',
    path: '/task',
    icon: <AppstoreOutlined />,
    group: menuGroups.Base,
    allowedRoles: ['admin'],
  },
  {
    key: 'study',
    title: '学习辅助',
    path: '/study',
    icon: <BookOutlined />,
    group: menuGroups.Helper,
    allowedRoles: ['admin'],
  },
  {
    key: 'rss',
    title: 'RSS信息',
    path: '/rss',
    icon: <BulbOutlined />,
    group: menuGroups.Helper,
    allowedRoles: ['admin'],
  },
  {
    key: 'collecting',
    title: '资料收集',
    path: '/collecting',
    icon: <FileTextOutlined />,
    group: menuGroups.Collecting,
    allowedRoles: ['admin'],
  },
  {
    key: 'buttons',
    title: '按钮大盘',
    path: '/buttons/cma9f76o7001d138o5rq707ls',
    icon: <HomeOutlined />,
    group: menuGroups.Collecting,
    allowedRoles: ['admin'],
  },
  {
    key: 'ai',
    title: 'AI 角色',
    path: '/ai',
    icon: <UserOutlined />,
    group: menuGroups.Ai,
    allowedRoles: ['admin'],
  },
  {
    key: 'order-demand',
    title: '订单兼职',
    path: '/order-demand',
    icon: <ShoppingOutlined />,
    group: menuGroups.Other,
    allowedRoles: ['admin'],
  },
  // {
  //   key: 'product',
  //   title: '需求完善',
  //   path: '/product',
  //   icon: <BulbOutlined />,
  // },
]

export const SideMenu = () => {
  const menuRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname()

  const { data: session } = useSession()

  const [collapsed, setCollapsed] = useState(false)
  const [menuWidth, setMenuWidth] = useState(0)

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

  // 根据用户权限过滤菜单项
  const filterMenuItems = () => {
    return menuItems.filter(item => {
      if (!item.allowedRoles?.length) {
        return true
      }

      return item.allowedRoles.includes(session?.user.role || '')
    })
  }

  // 按分组整理菜单
  const getGroupedMenuItems = () => {
    const filteredItems = filterMenuItems()

    return filteredItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
      const group = item.group || '其他'
      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(item)
      return acc
    }, {})
  }

  const groupedMenuItems = getGroupedMenuItems()

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
        {Object.entries(groupedMenuItems).map(([group, items]) => (
          <div key={group}>
            {shouldShowTitle && !collapsed && (
              <div className='text-xs text-gray-500 py-2 px-4 font-medium'>
                {group}
              </div>
            )}
            {items.map((item) => (
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
          </div>
        ))}
      </ul>

      {/* 添加用户状态组件 */}
      <div className='border-t border-gray-200 mt-auto'>
        {!collapsed && <UserAuthStatus />}
      </div>
    </div>
  )
}
