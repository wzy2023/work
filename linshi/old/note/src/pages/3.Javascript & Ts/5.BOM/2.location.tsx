import { PageHeader, ParamsTable } from '@/components'

export default () => [
  <PageHeader
    title='location'
    subTitle='地址栏'
  />,
  <ParamsTable
    data={[
      { label: 'location.href', desc: '当前页面的url' },
      { label: 'location.prorocol', desc: '协议，一般是http、https' },
      { label: 'location.hostname', desc: '主机名' },
      { label: 'location.host', desc: '主机名，包含端口，格式如"example.com:8080"' },
      { label: 'location.pathname', desc: 'url中的路径部分，不包括域名和查询字符串' },
      { label: 'location.hash', desc: 'url中#后面的内容(包含#)' },
      { label: 'location.search', desc: '查询字符串，不包括问号 "?"' },
      { label: 'location.port', desc: '端口号，如果省略则默认为80（http）或443（https）' },
      { label: 'location.origin', desc: '返回完整的源URL，包括协议、主机名和端口' },
      {},
      { label: 'location.assign()', desc: '改变地址 (并记录到历史)' },
      { label: 'location.replace()', desc: '替换地址 (不记录到历史)' },
      {
        label: 'location.reload(forceGet)',
        desc: '重新加载(可选参数forceGet为true时，从服务器而不是缓存中重新加载页面)',
      },
    ]}
  />,
]
