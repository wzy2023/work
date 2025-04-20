import { ReferenceLink, TabsPro } from '@/components'

export default () => (
  <TabsPro
    items={[
      {
        label: '开发',
        children: (
          <TabsPro
            destroyInactiveTabPane={false}
            items={[
              {
                label: '多端处理',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/envs' />
                ),
              },
              {
                label: '错误处理',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/react-error-handling' />
                ),
              },
              {
                label: '动态 import',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/dynamic-import' />
                ),
              },
              {
                label: '自定义 Tabbar',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/custom-tabbar' />
                ),
              },
              {
                label: '渲染 HTML',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/html' />
                ),
              },
              {
                label: '使用 HTML 标签',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/use-h5' />
                ),
              },
              {
                label: 'jQuery-like API',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/jquery-like' />
                ),
              },
            ]}
          />
        ),
      },
      {
        label: '优化',
        children: (
          <TabsPro
            destroyInactiveTabPane={false}
            items={[
              {
                label: 'PReact',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/preact' />
                ),
              },
              {
                label: '独立分包',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/independent-subpackage' />
                ),
              },
              {
                label: '性能优化',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/optimized' />
                ),
              },
              {
                label: '编译优化',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/compile-optimized' />
                ),
              },
            ]}
          />
        ),
      },
      {
        label: '其它',
        children: (
          <TabsPro
            destroyInactiveTabPane={false}
            items={[
              {
                label: 'DevTools',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/react-devtools' />
                ),
              },
              {
                label: '小程序插件开发',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/miniprogram-plugin' />
                ),
              },
              {
                label: 'Taro插件功能',
                children: (
                  <ReferenceLink type='iframe' href='https://taro-docs.jd.com/docs/plugin' />
                ),
              },
            ]}
          />
        ),
      },
    ]}
  />
)
