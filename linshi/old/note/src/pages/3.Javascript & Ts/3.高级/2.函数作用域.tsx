import { AlertPro, PageHeader, AnchorCard } from '@/components'

export default () => [
  <PageHeader
    title='函数的作用域'
    subTitle='函数外部不能访问函数内部的变量/函数'
  />,
  <AnchorCard title='作用域链'>
    <AlertPro style={{ marginBottom: 10 }}>
      <div>函数内访问变量或函数有个就近原则，优先使用本函数内的变量/函数</div>
      <div>如果本函数内没有就去函数外部逐级查找，直到全局作用域</div>
      <div>还没有就报错，这种向外部作用域逐级查找就是作用域链</div>
    </AlertPro>
    <AlertPro message='注意'>
      <div>函数内调用外部函数，或函数外调用函数内的函数时，都会回到它们定义时的位置执行，能使用的变量，都是定义时作用域的变量，与调用位置无关</div>
    </AlertPro>
  </AnchorCard>,
]
