import { AlertPro, AnchorCard, PageHeader, CodeView } from '@/components'

export default () => [
  <PageHeader
    title='JS预解析'
    subTitle='js引擎执行代码的时候分为两个过程：预解析、执行代码'
  />,
  <AnchorCard title='预解析'>
    <AlertPro>
      <div>在执行 JavaScript 代码之前，JavaScript 引擎会先扫描代码，进行：</div>
      <div>① 语法检查，如果有错误，直接报错不再运行</div>
      <div>② 先把 function 定义的函数，提升它的声明及赋值</div>
      <CodeView language='javascript'>
        {`
          console.log(foo()); // 输出: "Hello"
          function foo() {
              return "Hello";
          }
        `}
      </CodeView>
      <div>③ 再把 var 定义的变量，提升它的声明，注意：只提升声明，不提升赋值</div>
      <CodeView language='javascript'>
        {`
          console.log(a); // 输出: undefined，不会报错，因为执行前该变量已被提升
          var a = 10;
          console.log(a); // 输出: 10
        `}
      </CodeView>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='注意'>
    <AlertPro>
      <div>1.在函数预解析阶段，函数内部的变量和内部函数不会被提升。只有在函数实际执行时，这些变量和内部函数才会被提升。也就是说，在函数定义阶段，函数体内的变量和函数声明是不可见的，直到函数被调用时，这些变量和函数声明才会被提升</div>
      <div>2.在 JavaScript 中，声明提升时，function 定义的函数会先被提升，然后才是 var 定义的变量</div>
      <div>3.变量声明提升的本质是在内存中为该变量名创建一个空间，如果内存中已经存在同名变量，则不会再次创建</div>
      <div>4.在严格模式下，var 声明的变量仍会提升，但 function 声明的函数在块级作用域内不会被提升</div>
      <div>5.let 和 const 声明的变量，也会进行提升，但是在其赋值之前的代码区域（称为"暂时性死区"）内不能访问，会报错：未初始化前不可使用
      </div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='变量声明提升的效果'>
    <AlertPro>
      <div>1.js代码使用整个页面里没有的变量，会报错</div>
      <div>2.js代码使用整个页面里有的变量:</div>
      <div>如果使用时该变量还未赋值，值会是 undefined</div>
      <div>如果使用时该变量已被赋值，值会是相应的值</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='函数声明提升的效果'>
    <AlertPro>
      <div>1.js代码执行整个页面里没有的函数，会报错</div>
      <div>2.js代码执行整个页面里有的函数，会正常执行</div>
    </AlertPro>
  </AnchorCard>,
]
