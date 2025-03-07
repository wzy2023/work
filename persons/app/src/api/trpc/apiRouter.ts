import { createTRPCRouter } from './trpc'

import routes from '../routes'

export const apiRouter = createTRPCRouter(routes)

export type ApiRouter = typeof apiRouter
