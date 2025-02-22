import { isFunction, cloneDeep } from '@wzyjs/utils'
import { Column, Columns, ColumnContent } from './types'

export const getRequireFormProps = (label?: string) => ({
  rules: [
    getRequire(label),
  ],
})

export const getRequire = (label?: string) => ({
  required: true,
  message: `${label + ' ' || '此项'}为必填项`,
})

export const handleColumns = <I>(columns: Columns<I>, content: ColumnContent, mids: any[]): Column<I>[] => {
  return mids.reduce((columns, mid) => mid(columns), isFunction(columns) ? columns(content) : cloneDeep(columns))
}
