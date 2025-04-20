import { AlertPro, AnchorCard, ImagePro } from '@/components'

export default () => [
  <AnchorCard title='变量的传值与传址'>
    <AlertPro>
      <div>不管是函数传递参数还是变量的赋值，简单类型和对象类型都是值传递，不同的是：</div>
      <div>简单数据类型的值是数据</div>
      <div>复杂数据类型的值是一个对象的地址</div>
    </AlertPro>
    <ImagePro src='/3.Javascript & Ts/varOther.png' />
  </AnchorCard>,
]
