import React, { useRef, useState } from 'react'
import { useParams } from '@umijs/max'

import { ActionType, Button, Crud, FormPro, message } from '@/components'
import { ScanLoginFormItem } from './ScanLogin'

import { account } from '@/apis'
import { AccountLoginStatus, Params } from '../../types'
import { useRequestPro } from '@/hooks'

export default () => {
  const { projectId } = useParams<Params>()

  if (!projectId) {
    return null
  }

  const actionRef = useRef<ActionType>()

  const platformListState = useRequestPro(account.getPlatformList)

  const [open, setOpen] = useState<boolean>(false)

  const [values, setValues] = useState<any>(null)

  const checkAllStatusState = useRequestPro(() => account.checkAllStatus(projectId), {
    manual: true,
    alertSuccessMessage: true,
  })

  return (
    <Crud
      apis={account}
      actionRef={actionRef}
      search={false}
      apiParams={{
        list: {
          project: { id: projectId },
        },
        create: {
          projectId,
        },
      }}
      columns={[
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 48,
        },
        {
          title: '平台',
          dataIndex: 'platform',
          valueType: 'radio',
          fieldProps: {
            options: platformListState.data?.options,
          },
        },
        {
          title: '名称',
          dataIndex: 'name',
          hideInForm: true,
        },
        {
          title: '作品数',
          dataIndex: 'works',
          hideInForm: true,
        },
        {
          title: '粉丝数',
          dataIndex: 'fans',
          hideInForm: true,
        },
        {
          title: '状态',
          dataIndex: 'status',
          hideInForm: true,
          valueEnum: {
            [AccountLoginStatus.NotLoggedIn]: { text: '❌' },
            [AccountLoginStatus.LoggedIn]: { text: '✅' },
            [AccountLoginStatus.Scanned]: { text: '已扫码' },
          },
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          valueType: 'dateTime',
          hideInSearch: true,
          hideInForm: true,
        },
        {
          title: 'Headers',
          dataIndex: 'headers',
          render: _ => JSON.stringify(_ || '{}', null, 2),
        },
        {
          title: '操作',
          key: 'option',
          valueType: 'option',
          fixed: 'right',
          render: (_, record) => [
            record.status === AccountLoginStatus.NotLoggedIn && (
              <Button
                type='link'
                onClick={() => {
                  setOpen(true)
                  setValues({ status: { platform: record.platform } })
                }}
              >
              重新登录
              </Button>
            ),
            <Button
              type='link'
              onClick={() => account.openSite(record.id)}
            >
              打开官网
            </Button>,
          ],
        },
      ]}
      toolBarRender={() => [
        <Button
          onClick={async () => {
            await checkAllStatusState.runAsync()
            actionRef.current?.reload()
          }}
        >
          检测全部账号
        </Button>,
        <FormPro
          submitter={false}
          labelCol={{ span: 3 }}
          layout='horizontal'
          layoutType='ModalForm'
          title='添加账号'
          open={open}
          initialValues={values}
          modalProps={{
            destroyOnClose: true,
            maskClosable: false,
            onCancel: () => {
              setOpen(false)
              setValues(null)
            },
          }}
          trigger={(
            <Button onClick={() => setOpen(true)}>添加账号</Button>
          )}
          columns={[
            {
              dataIndex: 'status',
              renderFormItem: () => (
                <ScanLoginFormItem
                  onSuccess={() => {
                    setOpen(false)
                    setValues(null)
                    message.success('登录成功~')
                  }}
                />
              ),
            },
          ]}
        />,
      ]}
    />
  )
}
