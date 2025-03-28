import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

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
        formattedError: error.cause instanceof ZodError ? fromZodError(error.cause)?.message : null,
      },
    }
  },
})

export const createCallerFactory = t.createCallerFactory

export const createTRPCRouter = t.router

export const createTRPCMiddleware = t.middleware

export const createTRPCProcedure = t.procedure

export const mergeTRPCRouters = t.mergeRouters
