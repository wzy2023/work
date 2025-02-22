import { useRef } from 'react'

import {
  // Spin,
  Alert,
  LockOutlined,
  UserOutlined,
  ProFormInstance,
  LoginForm,
  ProCard,
  ProFormCheckbox,
  ProFormText,
} from '@wzyjs/antd'

import { md5 } from '@wzyjs/utils'
import { useAsyncEffect } from '@wzyjs/hooks'
import { defaultBackgroundImageUrl, getRememberUserInfo, rememberUserInfo, Values } from './utils'
import React from 'react'

export interface LoginPageProps<U> {
  backgroundImageUrl?: string | false,
  onSuccess?: (userInfo: U) => void,
  apis: {
    login: (values: Values) => Promise<any>,
  },
}

export const LoginPage = <U extends any>(props: LoginPageProps<U>) => {
  const {
    apis,
    onSuccess,
    backgroundImageUrl = defaultBackgroundImageUrl,
  } = props

  const formRef = useRef<ProFormInstance<Values>>()

  // const { runAsync, loading } = useRequestPro(apis.login, {
  //   manual: true,
  //   alertSuccessMessage: true,
  // })

  // 读取本地账号密码填充到表单
  useAsyncEffect(async () => {
    formRef.current?.setFieldsValue(await getRememberUserInfo())
  }, [])

  // 点击登录
  const onFinish = async (values: Values) => {
    values.name = values.name.trim()
    values.password = md5(values.password.trim())

    // const res = await runAsync(values)
    // if (!res?.data || !res?.success) {
    //   return false
    // }

    // onSuccess?.(res.data)
    rememberUserInfo(values)
    return true
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: backgroundImageUrl ? `url('${backgroundImageUrl}') round` : '',
      }}
    >
      <ProCard
        hoverable
        bodyStyle={{ padding: 0 }}
        style={{
          backgroundColor: '#fff',
          width: 500,
          padding: 50,
          margin: '15% auto',
        }}
      >
        {/*<Spin spinning={loading}>*/}
        <LoginForm
          formRef={formRef}
          title={(
            <div style={{ marginBlockEnd: 20 }}>登录</div>
          )}
          onFinish={onFinish}
          message={(
            <Alert style={{ marginBlockEnd: 24 }} message='tip: 未注册的账号登录将会自动注册' />
          )}
        >
          <ProFormText
            name='name'
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined rev={undefined} />,
            }}
            placeholder='用户名'
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name='password'
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined rev={undefined} />,
            }}
            placeholder='密码'
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <div style={{ marginBlockEnd: 24 }}>
            <ProFormCheckbox noStyle name='remember'>
              30天内自动登录
            </ProFormCheckbox>
          </div>
        </LoginForm>
        {/*</Spin>*/}
      </ProCard>
    </div>
  )
}
