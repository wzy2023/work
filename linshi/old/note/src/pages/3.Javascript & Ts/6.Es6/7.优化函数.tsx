import { AlertPro, AnchorCard, CodeView } from '@/components'

export default () => [
  <AnchorCard title='箭头函数'>
    <AlertPro>
      <div>(1) 为了书写匿名函数方便，同时为了解决函数内this的指向问题，就提出了箭头函数，用来简化匿名函数</div>
      <div>(2) 箭头函数和包围它的代码共享同一个 this</div>
      <div>{'匿名函数：function () {}'}</div>
      <div>{'箭头函数：() => {}'}</div>
    </AlertPro>
    <AlertPro message='语法'>
      <div>如果参数只有一个，可以省略参数的()，没有参数或多个参数()就不能省略</div>
      <div>{'如果代码体只有一句，可以省略代码体的 {}'}</div>
      <div>如果代码体只有一句且是return，可以省略return</div>
    </AlertPro>
    <AlertPro message='注意'>
      <div>① 箭头函数里，this和arguments，指向它上级作用域里的this和arguments</div>
      <div>② 箭头函数里，apply()和call()，改变不了this的指向</div>
      <div>③ 箭头函数不能作为构造函数</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='函数的默认值' subTitle='支持在定义函数的时候为其设置默认值'>
    <CodeView language='javascript'>
      {`
        function fn(name = "aaa") {
            console.log(name)
        }
        fn() // aaa
      `}
    </CodeView>
  </AnchorCard>,
]
