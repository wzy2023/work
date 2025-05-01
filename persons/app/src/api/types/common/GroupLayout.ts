import { type GridLayoutItem } from '@/components'

declare global {
  export namespace CommonGroupLayout {
    interface Item extends GridLayoutItem {
      data: {
        title: string
      }
    }
  }
}
