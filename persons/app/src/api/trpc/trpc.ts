import { ZodError } from 'zod'
import superjson from 'superjson'

import { initTRPC } from '@trpc/server'

import { type TRPCContext } from './context'

const t = initTRPC.context<TRPCContext>().create({
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

export const createCallerFactory = t.createCallerFactory

export const createTRPCRouter = t.router

export const createTRPCMiddleware = t.middleware

export const createTRPCProcedure = t.procedure

export const mergeTRPCRouters = t.mergeRouters
