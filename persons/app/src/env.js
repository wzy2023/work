import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * 在此处指定服务器端环境变量模式。
   * 这样可以确保应用程序不会使用无效的环境变量构建。
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  },

  /**
   * 在此处指定客户端环境变量模式。
   * 这样可以确保应用程序不会使用无效的环境变量构建。
   * 要将它们暴露给客户端，请使用 `NEXT_PUBLIC_` 前缀。
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * 在 Next.js 边缘运行时（如中间件）或客户端中，
   * 无法像常规对象一样解构 `process.env`，
   * 因此我们需要手动解构。
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * 使用 `SKIP_ENV_VALIDATION` 运行 `build` 或 `dev` 可以跳过环境变量验证。
   * 这在 Docker 构建时特别有用。
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * 使空字符串被视为未定义。
   * 例如：`SOME_VAR: z.string()` 和 `SOME_VAR=''` 将抛出错误。
   */
  emptyStringAsUndefined: true,
})
