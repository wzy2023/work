import { TabsPro, ReferenceLink } from '@/components'

export default () => (
  <TabsPro
    destroyInactiveTabPane={false}
    items={[
      {
        label: 'TaroHooks',
        children: (
          <ReferenceLink type='iframe' href='https://taro-hooks.onrender.com/site/hooks/useAccountInfo' />
        ),
      },
    ]}
  />
)
