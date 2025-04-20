import { AlertPro, AnchorCard, PageHeader, CodeView } from '@/components'

export default () => [
  <PageHeader title='2种新的声明方式' />,
  <AnchorCard title='let 声明变量'>
    <AlertPro>
      <div>不允许重复声明、不存在变量提升、存在块级作用域</div>
    </AlertPro>
    <CodeView language='javascript'>
      {`
        if (true){
           let name = 'name'
        }
        console.log(name) // undefined
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='const 声明常量'>
    <AlertPro>
      <div>常量值为：值类型(简单类型)，一旦定义不能修改</div>
      <div>常量值为：引用类型(复杂类型)，定义后不能修改引用地址，但可以添加修改删除对象的属性或数组的成员</div>
      <div>const声明的常量也存在块级作用域</div>
    </AlertPro>
  </AnchorCard>,
]
