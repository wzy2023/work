import { AlertPro, AnchorCard, CodeView } from '@/components'

export default () => [
  <AnchorCard title='if'>
    <CodeView language='javascript'>
      {`
        if (条件1){
        ... // 满足条件1执行，执行完跳出

        } else if (条件2){
        ... // 满足条件2执行，执行完跳出

        } else {
        ... // 上述条件都不满足时执行，执行完跳出
        }
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='switch'>
    <CodeView language='javascript'>
      {`
        switch (值){ // 值可以是数值||字符串
          case 值1:
          ...
          break

          // 如果有多个case要执行相同的代码的话，可以这样写
          case 值2:
          case 值3:
          ...
          break

          // 没有符合的值时执行这里的代码
          default:

        }
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='while / do while'>
    <CodeView language='javascript'>
      {`
        while (条件){          // 先判断条件，满足条件就执行语句
          ...
        }

        do {                  // 先执行语句，再判断条件，满足条件继续执行
          ...
        } while(条件)
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='for  / for in  / for of'>
    <CodeView language='javascript'>
      {`
        for (声明变量; 条件; 变量自增/减){ // 先声明变量，再判断条件
          ... // 条件为真执行代码，变量自增自减，再判断条件...
        }

        for (var name in obj){
          name      // 代表obj的属性名
          obj[name] // 代表obj的属性值，可以遍历对象或数组
        }

        for (var item of arr){
          item // 代表arr的每个值，可以遍历数组
        }
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='中断循环'>
    <CodeView language='javascript'>
      {`
        continue // 只能在循环里使用，略过本次循环
        break // 只能在循环里使用，跳出本循环体
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='注意'>
    <AlertPro>
      <div>流程控制语句里的大括号内，没有自己的作用域，里面用var声明的变量外面也可以使用</div>
    </AlertPro>
  </AnchorCard>,
]
