'use client'

import { type ReactNode, useState } from 'react'

import { message } from '@/components'

import SuperJSON from 'superjson'

import { type ApiRouter } from './trpc/apiRouter'
import { createQueryClient } from './trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { observable } from '@trpc/server/observable'
import { type TRPCLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'

import { printConsoleLog } from '@/utils'
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 输入推断辅助器。示例：type HelloInput = ApiRouterInput['example']['hello']
export type ApiRouterInput = inferRouterInputs<ApiRouter>

// 输出推断辅助器。示例：type HelloOutput = ApiRouterOutput['example']['hello']
export type ApiRouterOutput = inferRouterOutputs<ApiRouter>

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

// 获取基础URL函数，根据不同的执行环境返回相应的基础URL
const getBaseUrl = () => {
  // 浏览器环境直接使用window对象获取当前页面的基础URL
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  // 本地开发环境则返回localhost加默认或配置的端口号
  return `http://localhost:${process.env.PORT ?? 3000}`
}

// 错误处理
const errorLink: TRPCLink<ApiRouter> = () => {
  return ({ next, op }) => {
    return observable(observer => {
      const subscription = next(op).subscribe({
        next: value => {
          printConsoleLog(op.type, op.path, op.input, value.result.data)
          return observer.next(value)
        },
        complete: () => observer.complete(),
        error: err => {
          message.error(err.data?.formattedError || err.message || '操作失败')
          observer.error(err)
        },
      })
      return () => subscription.unsubscribe()
    })
  }
}

// 创建TRPC的React集成实例
export const api = createTRPCReact<ApiRouter>()

// 获取或创建查询客户端实例
export const queryClient = getQueryClient()

// TRPC React提供者组件，用于包裹应用中的组件树
export const TRPCReactProvider = (props: { children: ReactNode }) => {
  // 创建并维护TRPC客户端实例的状态
  const [trpcClient] = useState(() => {
    return api.createClient({
      links: [
        // 添加错误处理链接，用于处理TRPC客户端错误
        errorLink,
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
