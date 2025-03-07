import 'server-only'

import { cache } from 'react'
import { headers } from 'next/headers'

import { createCallerFactory } from './trpc/trpc'
import { createQueryClient } from './trpc/client'
import { createTRPCContext } from './trpc/context'
import { type ApiRouter, apiRouter } from './trpc/apiRouter'
import { createHydrationHelpers } from '@trpc/react-query/rsc'

export { apiRouter } from './trpc/apiRouter'

export { createTRPCContext } from './trpc/context'

const createCaller = createCallerFactory(apiRouter)

const createContext = cache(async () => {
  const heads = new Headers(await headers())
  heads.set('x-trpc-source', 'rsc')
  return createTRPCContext({ headers: heads })
})

const getQueryClient = cache(createQueryClient)

const caller = createCaller(createContext)

export const { trpc, HydrateClient } = createHydrationHelpers<ApiRouter>(caller, getQueryClient)
