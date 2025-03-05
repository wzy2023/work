'use client'

import { ReactNode, useState } from 'react'
import { createTRPCReact } from '@trpc/react-query'
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'

import SuperJSON from 'superjson'

import { type AppRouter } from '@/server/api/root'
import { createQueryClient } from './query-client'

import '@ant-design/v5-patch-for-react-19'

// 定义一个全局变量用于保存客户端查询实例，确保在浏览器环境中仅初始化一次
let clientQueryClientSingleton: QueryClient | undefined = undefined

// 获取或创建查询客户端实例的函数
const getQueryClient = () => {
  // 在服务端：每次调用时都创建一个新的查询客户端实例
  if (typeof window === 'undefined') {
    return createQueryClient()
  }
  // 在浏览器端：使用单例模式保持同一个查询客户端实例
  return (clientQueryClientSingleton ??= createQueryClient())
}

// 创建TRPC的React集成实例
export const api = createTRPCReact<AppRouter>()

// 输入推断辅助器。示例：type HelloInput = RouterInputs['example']['hello']
export type RouterInputs = inferRouterInputs<AppRouter>;

// 输出推断辅助器。示例：type HelloOutput = RouterOutputs['example']['hello']
export type RouterOutputs = inferRouterOutputs<AppRouter>;

// TRPC React提供者组件，用于包裹应用中的组件树
export function TRPCReactProvider(props: { children: ReactNode }) {
  // 获取或创建查询客户端实例
  const queryClient = getQueryClient()

  // 创建并维护TRPC客户端实例的状态
  const [trpcClient] = useState(() => {
    return api.createClient({
      links: [
        // 添加日志记录链接，用于开发环境或错误发生时的日志记录
        loggerLink({
          enabled: (op) => {
            return process.env.NODE_ENV === 'development' || (op.direction === 'down' && op.result instanceof Error)
          },
        }),
        // 添加批量处理HTTP请求的链接，并设置Transformer、URL和自定义Headers
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: getBaseUrl() + '/api/trpc',
          headers: () => {
            const headers = new Headers()
            headers.set('x-trpc-source', 'nextjs-react')
            return headers
          },
        }),
      ],
    })
  })

  // 返回QueryClientProvider和TRPC Provider，为后代组件提供上下文
  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  )
}

// 获取基础URL函数，根据不同的执行环境返回相应的基础URL
function getBaseUrl() {
  // 浏览器环境直接使用window对象获取当前页面的基础URL
  // if (typeof window !== 'undefined') {
  //   return window.location.origin
  // }
  // Vercel环境下返回部署的应用URL
  // if (process.env.VERCEL_URL) {
  //   return `https://${process.env.VERCEL_URL}`
  // }
  // 本地开发环境则返回localhost加默认或配置的端口号
  return `http://localhost:${process.env.PORT ?? 3000}`
}
