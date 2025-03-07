import { createTRPCMiddleware } from './trpc'

// 用于计时 procedure 执行时间。
export const timingMiddleware = createTRPCMiddleware(async ({ next, path }) => {
  const start = Date.now()

  const result = await next()

  const end = Date.now()
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`)

  return result
})
