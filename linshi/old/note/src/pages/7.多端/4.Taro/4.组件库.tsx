import { TabsPro, ReferenceLink } from '@/components'

export default () => (
  <TabsPro
    destroyInactiveTabPane={false}
    items={[
      {
        label: 'NutUI',
        children: (
          <ReferenceLink type='iframe' href='https://nutui.jd.com/#/zh-CN/component/button' />
        ),
      },
      {
        label: 'Taroify',
        children: (
          <ReferenceLink type='iframe' href='https://taroify.gitee.io/taroify.com/components/button' />
        ),
      },
      {
        label: 'Ant Design Mobile (支持80%)',
        children: (
          <ReferenceLink type='iframe' href='https://mobile.ant.design/zh/components/butto' />
        ),
      },
    ]}
  />
)
