import React from 'react'
import { useParams } from '@umijs/max'

import { FormPro, QRCode } from '@wzyjs/component-web'

import { account } from '@/apis'
import { useRequestPro } from '@/hooks'
import { Params, AccountLoginStatus } from '../../types'

interface ScanLoginFormItem {
  value?: any
  onChange?: (p: any) => void
  onSuccess?: () => void
}

export const ScanLoginFormItem = (props: ScanLoginFormItem) => {
  const { value, onChange, onSuccess } = props

  const { projectId } = useParams<Params>()

  const platformListState = useRequestPro(account.getPlatformList)

  const loginTokenState = useRequestPro(() => account.getLoginToken(value?.platform), {
    ready: !!value?.platform,
    refreshDeps: [value?.platform],
  })

  const loginStatusState = useRequestPro(() => account.getLoginStatus(projectId!, value.platform, loginTokenState.data?.loginToken), {
    ready: !!value?.platform && !!loginTokenState.data?.loginToken,
    refreshDeps: [value?.platform, loginTokenState.data?.loginToken],
    pollingInterval: 3000,
    onError: () => {
      loginStatusState.cancel()
    },
    onSuccess: (res: any) => {
      if (res.data.status === AccountLoginStatus.LoggedIn) {
        loginStatusState.cancel()
        onSuccess?.()
      }
    },
  })

  return (
    <FormPro
      submitter={false}
      layout='horizontal'
      onValuesChange={(_, allValues) => onChange?.(allValues)}
      initialValues={value}
      columns={[
        {
          title: '账号类型',
          dataIndex: 'platform',
          valueType: 'radio',
          fieldProps: {
            options: platformListState.data?.options,
          },
        },
        {
          title: '二维码',
          renderFormItem: () => (
            <>
              {loginTokenState.data?.loginUrl ? (
                <QRCode
                  status={loginStatusState.data?.status === 2 ? 'scanned' : 'active'}
                  value={loginTokenState.data.loginUrl}
                />
              ) : (
                <span>请先选择账号类型</span>
              )}
            </>
          ),
        },
      ]}
    />
  )
}
