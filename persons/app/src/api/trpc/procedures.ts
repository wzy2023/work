import { createTRPCProcedure } from './trpc'

import { timingMiddleware } from './middlewares'

// 公共（未认证）procedure
export const publicProcedure = createTRPCProcedure.use(timingMiddleware)
