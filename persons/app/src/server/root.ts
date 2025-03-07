import { createCallerFactory, createTRPCRouter } from './trpc'

import habit from './routers/habit'
import habitGroup from './routers/habit/group'

// 这是服务器的主路由
// 所有在 /api/routers 中添加的路由都应该在这里手动添加
export const appRouter = createTRPCRouter({
  habit,
  habitGroup,
})

// 导出 API 的类型定义
export type AppRouter = typeof appRouter;

// 创建服务器端的 tRPC API 调用器
// const trpc = createCaller(createContext);
// const res = await trpc.post.all();
export const createCaller = createCallerFactory(appRouter)
