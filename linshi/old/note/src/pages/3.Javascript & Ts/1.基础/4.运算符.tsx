import { AlertPro, AnchorCard, String } from '@/components'

export default () => [
  <AnchorCard title='一元运算符'>
    <AlertPro>
      <String>‘i++’ // 先使用i的值，用完立即+1，再用i就是+1后的值</String>
      <String>‘++i’ // 先给i+1，再使用i的值</String>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='算术运算符'>
    <AlertPro>
      <String>‘+、-、*、/、%’ // 加、减、乘、除、取余</String>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='比较运算符'>
    <AlertPro>
      <String>{'‘> < >= <= != !== ’ 、‘==’ 进行变量值的比较 、‘===’ 进行变量值和数据类型的比较'}</String>
      <div>注意：对象类型的变量值是内存地址，这时候就是比较内存地址</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='逻辑运算符'>
    <AlertPro>
      <String>‘&&’ 两个表达式都是true，才返回true</String>
      <String>‘||’ 两个表达式有一个是true，就返回true</String>
      <String>‘!’ 将表达式的结果取反</String>
      <String>注意：js中‘&&’和‘||’运算返回的结果不是布尔类型，而是：能起决定作用的子表达式的值</String>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='赋值运算符'>
    <AlertPro>
      <String>‘= += -= *= /= %=’ // a+=b 相当于 a=a+b</String>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='三元运算符'>
    <AlertPro>
      <String>‘条件 ? 为真执行 : 为假执行’</String>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='运算符的优先级'>
    <AlertPro>
      <String>1. 优先级最高 ‘()’</String>
      <String>2. 一元运算符 ‘++ -- !’</String>
      <String>3. 算数运算符 ‘先 * / % 后 + -’</String>
      <String>{'4. 比较运算符  ‘先 > >= < <= 后 == != === !==’'}</String>
      <String>5. 逻辑运算符 ‘先 && 后 ||’</String>
      <String>6. 赋值运算符 ‘=’</String>
    </AlertPro>
  </AnchorCard>,
]
