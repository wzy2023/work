import { getRequire } from '../utils'
import { Apis, Column } from '../types'

interface ValidatorProps<I> {
  columns: Column<I>[],
  findApi?: Apis<I>['find']
}

const validatorValue = <I>(item: Column<I>, findApi: Apis<I>['find']): any[] => {
  const { validator, title } = item

  if (!validator?.length) {
    return []
  }

  return validator.map(item => {
    if (!item) {
      return
    }

    const [type, option] = Array.isArray(item) ? item : [item]

    switch (type) {
      case 'require':
        return getRequire(title as string)

      case 'unique':
        if (!findApi) {
          return
        }

        return {
          asyncValidator: async ({ field }: { field: keyof I }, value: string) => {
            if (!value || !findApi) {
              return
            }

            const { data } = await findApi({ [field]: { type: 'eq', value } } as any)
            if (data) {
              return Promise.reject(option)
            }

            return Promise.resolve()
          },
        }

      default:
        return {}
    }
  }).filter(item => item)
}

export default <I>(props: ValidatorProps<I>): Column<I>[] => {
  const { columns, findApi } = props

  return columns.map(item => {
    if (item?.validator) {
      item.formItemProps = {
        ...(item.formItemProps || {}),
        rules: [
          // @ts-ignore
          ...(item.rules || []),
          ...validatorValue(item, findApi),
        ].flat(),
      }
      delete item.validator
    }

    return item
  })
}
