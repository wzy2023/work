import { AnchorCard, CodeView, PageHeader } from '@/components'

export default () => [
  <PageHeader title='对象基础' subTitle='对象是有属性和方法的数据类型' />,
  <AnchorCard title='创建方式'>
    <CodeView language='javascript'>
      {`
        // 1.字面量方式创建
        var stu = {
          name: "张三",
          say: function() {
            console.log()
          }
        }

        // 2.内置构造函数创建
        var stu = new Object()
        stu.name = "张三"
        stu.say = function() {
          console.log()
        }

        // 3.自定义构造函数方式创建
        function Stu(name) {
          this.name = name
          this.say = function() {
            console.log()
          }
        }
        var stu1 = new Stu("张三")
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='使用属性'>
    <CodeView language='javascript'>
      {`
        const obj = { name: 'xxx', say: () => console.log('xxx') }
        stu.name // xxx
        stu.say() // xxx
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='增加属性'>
    <CodeView language='javascript'>
      {`
        const obj = {}
        obj.name = 'xxx' // 给原来没有的属性赋值就是增加属性
        obj['name'] = 'xxx'    // []内可使用变量
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='修改属性'>
    <CodeView language='javascript'>
      {`
        const obj = {}
        obj.name = 'xxx' // 给原来有的属性赋值就是修改属性
        obj['name'] = 'xxx'    // []内可使用变量
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='删除属性'>
    <CodeView language='javascript'>
      {`
        const obj = { name: 'xxx' }
        delete obj.name
        delete obj['name']
      `}
    </CodeView>
  </AnchorCard>,
]
