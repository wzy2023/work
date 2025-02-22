import { TableProColumns } from '../TablePro'
import { RequestRes, Pagination, Where, Order } from '@wzyjs/types'

// 扩展了 ProColumns 的能力
export type Column<I, ValueType = 'text'> = TableProColumns<I, ValueType> & {
  hideInCreate?: true, // 创建表单里隐藏
  hideInUpdate?: true, // 编辑表单里隐藏
  validator?: ('require' | null | ['unique', string])[], // 使用内置的校验规则
}

export type ColumnContent = {
  type: 'create' | 'update' | 'list',
  isCreate?: boolean,
  isUpdate?: boolean,
  isList?: boolean,
}

export type Columns<I, ValueType = 'text'> = Column<I, ValueType>[] | ((content: ColumnContent) => Column<I>[])

export type Apis<I> = {
  list: (params: {
    where?: Where,
    order?: Order,
    pagination?: Pagination
  }) => Promise<RequestRes<{ data: I[], total: number }>>,
  find?: (params: I) => Promise<RequestRes<unknown>>,
  create?: (data: Partial<I>) => Promise<RequestRes<unknown>>,
  update?: (id: string, data: Partial<I>) => Promise<RequestRes<unknown>>,
  remove?: (id: string) => Promise<RequestRes<unknown>>,
}

// 调用各个接口时的附加参数
export type ApiParams = {
  list?: Where,
  create?: Where,
}
