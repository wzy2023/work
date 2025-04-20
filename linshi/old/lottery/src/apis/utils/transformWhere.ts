import { Between, In, LessThan, MoreThanOrEqual, Equal, LessThanOrEqual, Like, MoreThan, IsNull } from 'typeorm'
import { Where, OperatorType } from '@/apis/types'

const operatorMap = {
  [OperatorType.In]: In,
  [OperatorType.Like]: Like,
  [OperatorType.Between]: Between,
  [OperatorType.Equal]: Equal,
  [OperatorType.LessThan]: LessThan,
  [OperatorType.MoreThan]: MoreThan,
  [OperatorType.LessThanOrEqual]: LessThanOrEqual,
  [OperatorType.MoreThanOrEqual]: MoreThanOrEqual,
  [OperatorType.IsNull]: IsNull,
}

export const transformWhere = (where?: Where) => {
  if (!where) {
    return where
  }

  const transformed = {} as any

  for (const key in where) {
    const item = where[key]

    if (typeof item === 'object' && '_type' in item) {
      const operatorFunction = operatorMap[item._type as OperatorType]
      item._value = Array.isArray(item._value) ? item._value : [item._value]
      // @ts-ignore
      transformed[key] = operatorFunction?.(...item._value)

    } else {
      transformed[key] = item
    }
  }

  return transformed
}
