import { db } from './db'
import { enhance } from '../generated/enhancer/enhance'

// 定义了在后端 API 中可用的“上下文”，允许你在处理请求时访问诸如数据库、会话等
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    prisma: enhance(db),
    ...opts,
  }
}

export type TRPCContext = typeof createTRPCContext
