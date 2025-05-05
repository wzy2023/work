import { createRouter } from '../generated/trpc/routers'
import { createTRPCRouter, mergeTRPCRouters } from '../trpc/trpc'

import { habitItem } from './habit/item'
import { habitGroup } from './habit/group'
import { buttonsItem } from './buttons/item'
import { rssFeed } from './rss/feed'
import { rssItem } from './rss/item'
import { orderDemand } from './order/demand'

export default mergeTRPCRouters(
  createRouter(),

  createTRPCRouter({
    custom: {
      habitGroup,
      habitItem,

      buttonsItem,

      rssFeed,
      rssItem,

      orderDemand,
    },
  }),
)
