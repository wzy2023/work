import { PageHeader, AlertPro, ParamsTable, AnchorCard } from '@/components'

export default () => [
  <PageHeader
    title='storage'
    subTitle='浏览器存储'
  />,
  <AnchorCard title='cookie'>
    <AlertPro message='默认关闭浏览器失效，也可以指定失效时间' />
    <ParamsTable
      data={[
        { label: 'document.cookie', desc: '获取当前页面的所有cookie作为一个字符串。不同cookie以分号和空格分隔。' },
        {
          label: 'document.cookie = "键=值; Expires=过期时间戳";',
          desc: '设置一个新的cookie或者更新已存在的cookie。Expires指定cookie的有效期。',
        },
        {
          label: '无直接删除方法',
          desc: '但可以通过设置一个已过期的cookie来实现删除：document.cookie = "键=值; Expires=" + new Date(0).toUTCString();',
        },
        {
          label: '无直接查询方法',
          desc: '需要解析document.cookie字符串来获取特定cookie值。可以使用split和其他字符串函数来实现，如：function getCookie(name) { /*...*/ }',
        },
        {
          label: '无直接更新方法',
          desc: '更新cookie实质上是重新设置该cookie，使用相同的名称但可能有不同的值或过期时间。',
        },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='sessionStorage'>
    <AlertPro message='生命周期为关闭浏览器窗口，在同一个页面窗口下数据才可以共享' />
    <ParamsTable
      data={[
        { label: 'sessionStorage.length', desc: '获取长度' },
        { label: 'sessionStorage.key(索引)', desc: '获取值 (根据索引)' },
        { label: 'sessionStorage.getItem(键)', desc: '获取值 (根据键)' },
        { label: 'sessionStorage.setItem(键, 值)', desc: '添加/编辑' },
        { label: 'sessionStorage.removeItem(键)', desc: '删除' },
        { label: 'sessionStorage.clear()', desc: '清空' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='localStorage'>
    <AlertPro message='永久生效，除非手动删除 关闭浏览器也会存在，可以多页面窗口共享' />
    <ParamsTable
      data={[
        { label: 'localStorage.length', desc: '获取长度' },
        { label: 'localStorage.key(索引)', desc: '获取值 (根据索引)' },
        { label: 'localStorage.getItem(键)', desc: '获取值 (根据键)' },
        { label: 'localStorage.setItem(键, 值)', desc: '添加/编辑' },
        { label: 'localStorage.removeItem(键)', desc: '删除' },
        { label: 'localStorage.clear()', desc: '清空' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='三种区别'>
    <ParamsTable
      data={[
        { label: '三种比较', desc: 'cookie', attr: 'sessionStorage', value: 'localStorage' },
        {
          label: '生命周期',
          desc: '默认关闭浏览器失效',
          attr: '页面会话期间可用',
          value: '除非手动删除数据否则一直存在',
        },
        { label: '数据大小', desc: '4K左右', attr: '5M左右', value: '20M左右' },
        { label: '易用性', desc: '无', attr: '有原生接口', value: '有原生接口' },
        { label: '共同点', desc: '都是保存在浏览器端' },
      ]}
    />
  </AnchorCard>,
]
