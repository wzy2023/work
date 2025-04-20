import { AlertPro, AnchorCard, PageHeader, ParamsTable } from '@/components'

export default () => [
  <PageHeader title='2种新的对象' />,
  <AnchorCard title='Set() 唯一对象'>
    <AlertPro>
      <div>(1) 接受一个数组作为参数，用来初始化</div>
      <div>(2) 类似于数组，但是成员的值都是唯一的，没有重复的值</div>
      <div>(3) 两个NaN是相等，两个对象总是不相等的</div>
    </AlertPro>
    <ParamsTable
      data={[
        { label: 'var set = new Set([1,2,3,3])', desc: '创建set对象' },
        { label: 'set.add(value)', desc: '添加成员，返回新set对象' },
        { label: 'set.has(value)', desc: '判断成员是否存在' },
        { label: 'set.delete(value)', desc: '删除成员，返回是否删除成功' },
        { label: 'set.clear()', desc: '清空所有成员' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='Map() 键值对象'>
    <AlertPro>
      <div>(1) 键名不限于字符串，各种类型的值都可以作为键名</div>
      <div>(2) 只有对同一个对象的引用，才将其视为同一个键</div>
    </AlertPro>
    <ParamsTable
      data={[
        { label: 'var map = new Map()', desc: '创建set对象' },
        { label: 'map.set("a", 1)', desc: '添加成员' },
        { label: 'set.get("a")', desc: '获取成员' },
        { label: 'set.has("a")', desc: '判断成员是否存在' },
        { label: 'set.delete("a")', desc: '删除成员' },
      ]}
    />
  </AnchorCard>,
]
