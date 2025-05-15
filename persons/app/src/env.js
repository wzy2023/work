import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  /**
   * 在此处指定服务器端环境变量模式。
   * 这样可以确保应用程序不会使用无效的环境变量构建。
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    // 数据库
    DATABASE_URL: z.string().url(),
    // 阿里云 OSS
    VITE_OSS_REGION: z.string(),
    VITE_OSS_ACCESS_KEY_ID: z.string(),
    VITE_OSS_ACCESS_KEY_SECRET: z.string(),
    VITE_OSS_BUCKET: z.string(),
    // Google OAuth 配置
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    // NextAuth 密钥
    NEXTAUTH_SECRET: z.string().optional(),
    NEXTAUTH_URL: z.string().url().optional(),
    // RSSHub 配置
    RSSHUB_BASE_URL: z.string().url().optional(),
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
    NODE_ENV: process.env.NODE_ENV,
    // 数据库
    DATABASE_URL: process.env.DATABASE_URL,
    // 阿里云 OSS
    VITE_OSS_REGION: process.env.VITE_OSS_REGION,
    VITE_OSS_ACCESS_KEY_ID: process.env.VITE_OSS_ACCESS_KEY_ID,
    VITE_OSS_ACCESS_KEY_SECRET: process.env.VITE_OSS_ACCESS_KEY_SECRET,
    VITE_OSS_BUCKET: process.env.VITE_OSS_BUCKET,
    // Google OAuth 配置
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    // NextAuth 配置
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    // RSSHub 配置
    RSSHUB_BASE_URL: process.env.RSSHUB_BASE_URL,
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
