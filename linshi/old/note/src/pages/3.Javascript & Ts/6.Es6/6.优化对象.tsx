import { AlertPro, AnchorCard, CodeView } from '@/components'

export default () => [
  <AnchorCard title='简写属性/方法'>
    <CodeView language='javascript'>
      {`
        let name = "zs"
        let age = 18

        let obj = {
          name, // 简写属性，相当于 name = name
          say() { // 简写方法，省略关键字 function
            console.log("哈哈哈")
          }
        }
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='解构赋值'>
    <AlertPro>
      <div>解构赋值就是按照一定的模式，从字符串、数组、对象中提取，对变量进行赋值</div>
      <div>本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值</div>
    </AlertPro>
    <CodeView language='javascript'>
      {`
        // 字符串的解构赋值
        // a="a" b="b" c="c"
        let [a, b, c] = "abc"

        // 可以有默认值：a="a" b="b" c="c" d="d"
        let [a, b, c, d="d"] = "abc"

        // 数组的解构赋值
        // 可以只取前两个：a=1、b=2
        let [a, b] = [1, 2, 3]

        // 和名称无关，和顺序有关：a=1、c=2、b=3
        let [a, c, b] = [1, 2, 3]

        // 可以有默认值：a=1、b=2、c=3、d=4
        let [a, b, c, d=4] = [1, 2, 3]

        // 对象的解构赋值
        // 和名称有关，和顺序无关
        let {age, name} = {name:"zs", age:18}

        // 属性别名 myname="zs" name=undefined
        let {name:myname} = {name:"zs"}

        // 可以有默认值
        let {name, age, sex="男"} = {name:"zs", age:18}

        // 多层对象解构
        let {name, a:{aname}} = {name:"zs", a:{aname:"ls"}}
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='对象的新方法'>

  </AnchorCard>,
]
