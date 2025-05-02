import { type Column, ValueType } from './types'

export const getHistoryAnswer = (columns: Column[], values: any, has = true) => {
  const options = columns.map((item: any) => {
    const res: any = {
      title: item.title,
      value: '',
    }

    if ([ValueType.Textarea, ValueType.Radio].includes(item.valueType)) {
      res.value = values?.[item.dataIndex]
    }

    if (item.valueType === ValueType.Checkbox) {
      res.value = values?.[item.dataIndex]?.map?.((i: string) => item?.valueEnum?.[i]?.text || i)
      res.options = has ? Object.values(item.valueEnum || []) : []
    }

    return res
  }).filter(item => item.value)

  return JSON.stringify(options, null, 2)
}

export const disabledColumns = (columns: Column[]) => {
  return columns.map(item => ({
    ...item,
    fieldProps: {
      ...item.fieldProps,
      disabled: true,
    },
  }))
}
