import React, { useRef, useImperativeHandle, useEffect } from 'react'

import { Create } from './components/create'
import { ActionType, TablePro, TableProProps } from '../TablePro'

import { handleParams, dayjs } from '@wzyjs/utils'
import { useRequestPro } from '@wzyjs/hooks'
import { FilterParams, Pagination, SortParams } from '@wzyjs/types'

import option from './powers/option'
import validator from './powers/validator'
import { handleColumns } from './utils'
import { ApiParams, Apis, Column, Columns } from './types'

export { getRequire, getRequireFormProps } from './utils'

export * from './types'

interface CrudProps<I> extends Omit<TableProProps<I, I>, 'columns'> {
  layoutType?: 'ModalForm' | 'DrawerForm',
  columns: Columns<I>,
  apis: Apis<I>,
  initialValues?: Partial<I>,

  // 获取到列表数据后传递给父组件
  onLoadData?: (data: I[]) => void,
  // 调用接口时的附加参数
  apiParams?: ApiParams

  // 转换列表数据
  convertData?: (values: I[]) => I[],
  // 处理创建或提交表单提交的数据
  convertValues?: (values: Partial<I>) => Partial<I>,
}

export const Crud = <I extends { id: string }>(props: CrudProps<I>) => {
  const {
    name = '',
    columns,
    apis,
    toolBarRender,
    initialValues,
    convertValues = values => values,
    convertData = data => data,
    onLoadData,
    apiParams,
    layoutType = 'ModalForm',
  } = props

  const actionRef = useRef<ActionType>()

  useImperativeHandle(props.actionRef, () => actionRef.current)

  const listState = useRequestPro(apis.list, {
    manual: true,
  })
  const createState = useRequestPro(apis.create, {
    manual: true,
    alertSuccessMessage: true,
    onSuccess: () => actionRef.current?.reload()
  })
  const updateState = useRequestPro(apis.update, {
    manual: true,
    alertSuccessMessage: true,
    onSuccess: () => actionRef.current?.reload()
  })
  const removeState = useRequestPro(apis.remove, {
    manual: true,
    alertSuccessMessage: true,
    onSuccess: () => actionRef.current?.reload()
  })

  const mvalidator = (columns: Column<I>[]) => validator({
    columns,
    findApi: apis.find,
  })

  const moption = (columns: Column<I>[]) => {
    columns.forEach(column => {
      if (column.valueType === 'dateTime') {
        column.render = (_, __) => {
          return dayjs(__?.[column.dataIndex]).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    })
    return columns
  }

  const timeoption = (columns: Column<I>[]) => option({
    name,
    columns,
    layoutType,
    updateApi: apis.update && updateState?.runAsync,
    removeApi: apis.remove && removeState?.runAsync,
    mvalidator,
    convertValues,
  })

  const request = async (
    params: Pagination & I,
    sort: SortParams,
    filter: FilterParams,
  ) => {
    let { data = { data: [], total: 0 } } = await listState?.runAsync(
      handleParams(params, sort, filter, apiParams?.list),
    )
    onLoadData?.(data.data)
    return {
      data: convertData(data.data || []),
      total: data.total,
    }
  }

  useEffect(() => {
    actionRef.current?.reload()
  }, [JSON.stringify(apiParams?.list)])

  return (
    <TablePro
      {...props}
      headerTitle={`${name}列表`}
      actionRef={actionRef}
      request={request}
      columns={handleColumns(columns, { type: 'list', isList: true }, [moption, timeoption])}
      toolBarRender={(action, rows) => [
        ...(toolBarRender && toolBarRender?.(action, rows) || []),
        apis?.create && (
          <Create
            name={name}
            key='create'
            columns={handleColumns(columns, { type: 'create', isCreate: true }, [mvalidator])}
            layoutType={layoutType}
            apiParams={apiParams}
            api={createState?.runAsync}
            initialValues={initialValues}
            convertValues={convertValues}
          />
        ),
      ]}
    />
  )
}
