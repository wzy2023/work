import { OperatorType } from '@/types'

export interface Item {
  [key: string]: Item | number
}

export interface Params {
  dateTime?: {
    _type: OperatorType.Between,
    _value: number[]
  },
}
