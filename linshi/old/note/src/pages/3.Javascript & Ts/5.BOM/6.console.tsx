import { PageHeader, ParamsTable } from '@/components'

export default () => [
  <PageHeader
    title='console'
    subTitle='在浏览器中输出信息的方式，用于调试和测试代码'
  />,
  <ParamsTable
    data={[
      { label: 'console.log("111")', desc: '输出信息到控制台' },
      { label: 'console.error("111")', desc: '输出错误信息到控制台' },
      { label: 'console.table(arr)', desc: '以表格形式输出数组到控制台' },
      { label: 'console.clear()', desc: '清空控制台中的输出' },
      { label: 'console.warn("111")', desc: '输出警告信息到控制台' },
      { label: 'console.info("111")', desc: '输出信息到控制台' },
      { label: 'console.group("111")', desc: '在控制台中创建一个新的分组' },
      { label: 'console.groupEnd()', desc: '结束当前的分组' },
      { label: 'console.time("111")', desc: '开始一个计时器' },
      { label: 'console.timeEnd("111")', desc: '结束一个计时器' },
    ]}
  />,
]
