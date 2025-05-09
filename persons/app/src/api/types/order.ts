import type { OrderDemand } from '@prisma/client'

declare global {
  export namespace Order {
    export type Demand = OrderDemand
  }
}
