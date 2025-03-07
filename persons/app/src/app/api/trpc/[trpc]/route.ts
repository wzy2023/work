import { type NextRequest } from 'next/server'

import { apiRouter, createTRPCContext } from '@/api/server'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    req,
    router: apiRouter,
    endpoint: '/api/trpc',
    createContext: () => createTRPCContext({
      headers: req.headers,
    }),
    onError: ({ path, error }) => {
      console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
    },
  })
}

export { handler as GET, handler as POST }
