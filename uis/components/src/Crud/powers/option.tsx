import React from 'react'
import { Space } from 'antd'
import Update from '../components/update'
import Remove from '../components/remove'
import { Apis, Column } from '../types'
import { handleColumns } from '../utils'

interface OptionProps<I> {
  name?: string,
  columns: Column<I>[],
  layoutType?: 'ModalForm' | 'DrawerForm',
  updateApi: Apis<I>['update'],
  removeApi: Apis<I>['remove'],
  mvalidator: (columns: Column<I>[]) => Column<I>[],
  convertValues?: (values: Partial<I>) => Partial<I>,
}

export default <I extends { id: string }>(props: OptionProps<I>): Column<I>[] => {
  const { name, columns, convertValues, updateApi, removeApi, mvalidator, layoutType = 'ModalForm' } = props

  // 编辑和删除按钮
  const optionRender = {
    title: '操作',
    key: 'option',
    render: (dom: React.ReactNode, record: I) => (
      <Space key='option'>
        {updateApi && (
          <Update
            name={name}
            columns={handleColumns(columns, { type: 'update', isUpdate: true }, [mvalidator])}
            layoutType={layoutType}
            initialValues={record}
            api={updateApi}
            convertValues={convertValues}
          />
        )}
        {removeApi && (
          <Remove
            api={removeApi}
            initialValues={record}
          />
        )}
      </Space>
    ),
  }

  const last = columns[columns.length - 1]
  if (last?.key === 'option') {
    const originalRender = last.render
    // @ts-ignore
    last.render = (dom: React.ReactNode, entity: I, index: number, action: any, schema: any) => [
      (updateApi || removeApi) && optionRender.render(dom, entity),
      originalRender?.(dom, entity, index, action, schema),
    ].flat()
  }

  return columns
}
