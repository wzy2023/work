import '@ant-design/v5-patch-for-react-19'

export * from 'antd'

export * from '@ant-design/icons'

export { default as zh_CN } from 'antd/locale/zh_CN'

export {
  AntdRegistry,
} from '@ant-design/nextjs-registry'

export {
  PageLoading,
  PageHeader,

  ProCard,
  ProList,
  ProTable,

  ProFormText,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormUploadButton,
  LoginForm,
  BetaSchemaForm,

  CheckCard,
  EditableProTable,
} from '@ant-design/pro-components'

export type { ProLayoutProps, ProFormInstance } from '@ant-design/pro-components'

export * from './pro'
export * from './form'
