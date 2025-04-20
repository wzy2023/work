import { PageHeader, ParamsTable } from '@/components'

export default () => [
  <PageHeader
    title='window'
    subTitle='通常情况下可以省略，全局变量都会成为window的属性，全局函数都会成为window的方法'
  />,
  <ParamsTable
    data={[
      { label: 'alert("111")', desc: '弹出信息框' },
      { label: 'confirm("111")', desc: '弹出确定取消框' },
      { label: 'prompt("111")', desc: '弹出输入框' },
      { label: 'typeof(a)', desc: '查看变量的数据类型' },
      { label: 'timeid = setIimeout(函数，间隔时间)', desc: '一次性定时器' },
      { label: 'clearTimeout(timeid)', desc: '清除定时器' },
      { label: 'timeid = setInterval(函数，间隔时间)', desc: '循环定时器' },
      { label: 'clearInterval(timeid)', desc: '清除定时器' },
      { label: '', desc: '定时器里写函数的三种方式' },
      { label: 'setInterval(function(){...}, 1000)', desc: '直接写匿名函数' },
      { label: 'setInterval(fn, 1000)', desc: '定义函数fn后' },
      { label: 'setInterval("fn(aaa)", 1000)', desc: '定义函数fn后(带参数)' },
      { label: 'open(url, [target], [param])', desc: '打开新窗口，返回值是新窗口对象' },
      { label: 'close()', desc: '关闭本页面' },
      { label: 'moveTo(x, y)', desc: '移动窗口位置' },
      { label: 'resizeTo()', desc: '改变窗口大小' },
      { label: 'innerWidth', desc: '当前窗口宽度' },
      { label: 'encodeURIComponent()', desc: 'URL编码' },
      { label: 'decodeURIComponent()', desc: 'URL解码' },
    ]}
  />,
]
