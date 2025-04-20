import { PageHeader, ParamsTable } from '@/components'

export default () => [
  <PageHeader
    title='history'
    subTitle='历史记录'
  />,
  <ParamsTable
    data={[
      { label: 'history.state', desc: '当前历史记录的状态对象' },
      { label: 'history.length', desc: '历史记录栈中的条目数量' },
      {},
      { label: 'history.back()', desc: '后退' },
      { label: 'history.go(-1)', desc: '后退' },
      { label: 'history.forward()', desc: '前进' },
      { label: 'history.go(1)', desc: '前进' },
      {},
      {
        label: 'history.pushState(状态对象, 标题, [url])',
        desc: '插入一条记录，并改变地址栏的地址，但不触发页面加载',
      },
      {
        label: 'history.replaceState(状态对象, 标题, [url])',
        desc: '替换当前记录，并改变地址栏的地址，但不触发页面加载',
      },
    ]}
  />
]
