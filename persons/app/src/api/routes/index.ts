import { createRouter } from '../generated/trpc/routers'
import { createTRPCRouter, mergeTRPCRouters } from '../trpc/trpc'

import { habitItem } from './habit/item'
import { habitGroup } from './habit/group'
import { buttonsItem } from './buttons/item'

export default mergeTRPCRouters(
  createRouter(),

  createTRPCRouter({
    custom: {
      habitGroup,
      habitItem,
      buttonsItem,
    },
  }),
)
