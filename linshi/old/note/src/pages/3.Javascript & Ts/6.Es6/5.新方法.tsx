import { AnchorCard, PageHeader, ParamsTable } from '@/components'

export default () => [
  <PageHeader title='3种新的方法' />,
  <AnchorCard title='字符串的新方法'>
    <ParamsTable
      data={[
        { label: 'str.repeat()', desc: '重复字符串' },
        { label: 'str.includes()', desc: '是否包含指定字符串' },
        { label: 'str.startsWith()', desc: '是否以指定字符串开头' },
        { label: 'str.endsWith()', desc: '是否以指定字符串结尾' },
        { label: 'str.padStart()', desc: '填充字符串到开头' },
        { label: 'str.padEnd()', desc: '填充字符串到结尾' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='数组的新方法'>
    <ParamsTable
      data={[
        { label: 'arr.flat([depth])', desc: '扁平化n维数组' },
        { label: 'Array.from({ 0:"a", 1:"b", length:2 })', desc: '根据类数组对象创建数组' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='对象的新方法'>
    <ParamsTable
      data={[
        { label: 'Object.keys(obj)', desc: '数组形式返回对象中的键 [键, 键, 键]' },
        { label: 'Object.values(obj)', desc: '数组形式返回对象中的值 [值, 值, 值]' },
        { label: 'Object.entries(obj)', desc: '二位数组形式返回对象中的键值 [ \[键,值\], \[键,值\] ]' },
      ]}
    />
  </AnchorCard>,
]
