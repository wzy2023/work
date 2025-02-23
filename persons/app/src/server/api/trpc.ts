// 你可能不需要编辑这个文件，除非：
// 1. 你想要修改请求上下文（见第1部分）。
// 2. 你想要创建一个新的中间件或类型的 procedure（见第3部分）。
// 简而言之 - 这里是所有 tRPC 服务器相关代码被创建和插入的地方。你需要使用的部分在文档末尾有相应的说明。
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { db } from '@/server/db'

// 1. 上下文
// 本节定义了在后端 API 中可用的“上下文”。
// 这些允许你在处理请求时访问诸如数据库、会话等东西。
// 这个助手生成 tRPC 上下文的“内部”。API 处理程序和 RSC 客户端各自包装这个并提供所需的上下文。
// @see https://trpc.io/docs/server/context
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    ...opts,
  }
}

// 2. 初始化
// 这里是 tRPC API 被初始化的地方，连接上下文和转换器。
// 我们还解析 ZodErrors，以便如果由于后端验证错误导致 procedure 失败，你可以在前端获得类型安全。
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

// 创建一个服务器端调用者。
// @see https://trpc.io/docs/server/server-side-calls
export const createCallerFactory = t.createCallerFactory

// 3. 路由器和 PROCEDURE（重要部分）
// 这些是你用来构建 tRPC API 的部件。
// 你应该在 "/src/server/api/routers" 目录中导入这些。

// 这是你如何在 tRPC API 中创建新路由器和子路由器。
// @see https://trpc.io/docs/router
export const createTRPCRouter = t.router

// 用于计时 procedure 执行并在开发中添加人工延迟的中间件。
// 如果你不喜欢这个，可以删除它
// 它可以模拟在生产中发生，但在本地开发中不会发生的网络延迟，来帮助捕捉瀑布流。
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now()

  if (t._config.isDev) {
    const waitMs = Math.floor(Math.random() * 400) + 100
    await new Promise((resolve) => setTimeout(resolve, waitMs))
  }

  const result = await next()

  const end = Date.now()
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`)

  return result
})

// 公共（未认证）procedure
export const publicProcedure = t.procedure.use(timingMiddleware)
