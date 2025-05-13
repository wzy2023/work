import NextAuth, { DefaultSession } from 'next-auth'
import type { AdapterUser } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'

import { PrismaAdapter } from '@auth/prisma-adapter'

import { env } from '@/env'
import { db } from '@/api/trpc/db'

// 扩展AdapterUser接口，添加自定义字段
declare module 'next-auth/adapters' {
  interface AdapterUser {
    role?: string
  }
}

// 扩展Session类型，添加用户自定义字段
declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
      role: string
    }
  }
}

// 调试信息：输出环境变量配置状态（不输出具体值）
console.assert(!!env.GOOGLE_CLIENT_ID, '- GOOGLE_CLIENT_ID 未设置')
console.assert(!!env.GOOGLE_CLIENT_SECRET, '- GOOGLE_CLIENT_SECRET 未设置')
console.assert(!!env.NEXTAUTH_SECRET, '- NEXTAUTH_SECRET 未设置')
console.assert(!!env.NEXTAUTH_URL, '- NEXTAUTH_URL 未设置')
console.assert(!!db, '- Prisma 客户端 未初始化')

// 自定义Prisma适配器配置
const customPrismaAdapter = PrismaAdapter(db)

// 修改适配器配置使用新的模型名称
const customAdapter = {
  ...customPrismaAdapter,
  // 覆盖默认的模型名称
  createUser: (data: any) => {
    return db.userItem.create({ data })
  },
  getUser: (id: string) => {
    return db.userItem.findUnique({ where: { id } })
  },
  getUserByEmail: (email: string) => {
    return db.userItem.findUnique({ where: { email } })
  },
  getUserByAccount: async (providerData: { provider: string, providerAccountId: string }) => {
    const account = await db.userAccount.findUnique({
      where: {
        provider_providerAccountId: {
          provider: providerData.provider,
          providerAccountId: providerData.providerAccountId,
        },
      },
      select: { user: true },
    })
    return account?.user ?? null
  },
  updateUser: async (data: any) => {
    const { id, ...userData } = data
    return db.userItem.update({ where: { id }, data: userData })
  },
  // 其他覆盖的方法
  linkAccount: async (data: any) => {
    return db.userAccount.create({ data }) as any
  },
  createSession: async (data: any) => {
    return db.userSession.create({ data })
  },
  getSessionAndUser: async (sessionToken: string) => {
    const session = await db.userSession.findUnique({
      where: { sessionToken },
      include: { user: true },
    })
    if (!session) return null
    return {
      session,
      user: session.user,
    }
  },
  updateSession: async (data: any) => {
    const { sessionToken, ...sessionData } = data
    return db.userSession.update({
      where: { sessionToken },
      data: sessionData,
    })
  },
  deleteSession: async (sessionToken: string) => {
    await db.userSession.delete({ where: { sessionToken } })
  },
}

const handler = NextAuth({
  adapter: customAdapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      // 记录登录尝试信息用于调试
      console.log('是否允许登录:', {
        email: user.email,
        provider: account?.provider,
        hasAccount: !!account,
        hasProfile: !!profile,
      })
      return true
    },
    async session({ session, user }) {
      if (session.user) {
        const dbUser = user as AdapterUser
        session.user.id = dbUser.id
        session.user.role = dbUser.role || 'user'
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url
      }
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      return baseUrl
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    newUser: '/auth/new-user',
  },
})

export { handler as GET, handler as POST }
