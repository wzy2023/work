import type { InfoItem } from '@prisma/client'

declare global {
  export namespace Info {
    export type Item = InfoItem
  }
}
