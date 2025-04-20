import { AlertPro, AnchorCard, PageHeader, CodeView } from '@/components'

export default () => [
  <PageHeader title='2种新的运算符' />,
  <AnchorCard title='... 展开运算符'>
    <AlertPro>
      <div>将String、Array、Set类型的数据展开，展开后可以[]为数组，或作为函数参数传递</div>
      <div>展开运算符的应用场景：要用到某对象里的全部属性的时候</div>
    </AlertPro>
    <CodeView language='javascript'>
      {`
        // 传递参数(将数组展开)
        function test(a, b, c) { }
        var args = [0, 1, 2]
        test(...args)

        // 合并数组(将数组展开)
        var arr1 = ['a', 'b', 'c']
        (1) var arr2 = [...arr1, 'd', 'e']  // ['a','b','c','d','e']
        (2) arr1.push(...arr2)  // ['a','b','c',''a','b','c','d','e']

        // 类数组对象转换为数组(将数组展开)
        var list = document.getElementsByTagName('div')
        var arr = [..list]

        // 解构赋值(合并为数组)
        let [arg1, arg2, ...arg3] = [1, 2, 3, 4]
        arg1 // 1
        arg2 // 2
        arg3 // [3,4]

        // 获取形参外实参(合并为数组)
        function fn(a, b, ...rest){
            console.log(...rest) // [3, 4, 5]
        }
        fn(1, 2, 3, 4, 5)
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='** 指数运算符'>
    <CodeView language='javascript'>
      {`
        5 ** 2 = 25
        3 ** 3 = 27
      `}
    </CodeView>
  </AnchorCard>,
]
