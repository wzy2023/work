import { AlertPro, AnchorCard, ParamsTable } from '@/components'

export default () => [
  <AnchorCard title='语法'>
    <ParamsTable
      data={[
        { label: '导出变量', desc: '`export let name = 123`' },
        { label: '导出常量', desc: '`export const NAME = 123`' },
        { label: '导出对象', desc: '`export let obj = { name: 123 }`' },
        { label: '导出函数', desc: '`export function fn() { }`' },
        { label: '导出多个', desc: '`export { name, NAME, obj, fn }`  `export { name as nnnn }`' },
        {
          label: '导入多个',
          desc: '`import { name, NAME, obj, fn } from "model.js"`  `import { name as nnnn } from "model.js"`',
        },
        { label: '导入全部', desc: '`import * as obj from "model.js"`' },
        { label: '导出默认', desc: '`export default obj`' },
        { label: '导入默认', desc: '`import def from "model.js"`' },
        { label: '导入默认+多个', desc: '`import def, { name, NAME, obj, fn } from "model.js"`' },
        { label: '继承导出', desc: '`export * from "model.js"`' },
      ]}
    />
    <AlertPro message='注意'>
      <div>1.import必须放在代码文件的最开始，且前面不允许有其他逻辑代码</div>
      <div>2.一个模块只能有1个默认导出</div>
      <div>3.`export *`命令会忽略default导出</div>
    </AlertPro>
    <AlertPro message='模块化的发展：'>
      <div>全局变量命名冲突，或全局变量污染</div>
      <div>是由多人开发引起的，多人开发了多个js文件，里面可能定义了同名变量，</div>
      <div>被引入到同一页面后，同名变量互相影响，这就是变量命名冲突</div>
      <br />
      <div>这时有个解决方案就是，匿名闭包</div>
      <div>利用了函数内部有自己的作用域的特点，不会影响外部变量，让匿名函数立即执行，即执行了代码，又不会污染全局变量</div>
      <br />
      <div>但这样有个问题，就是代码的复用性降低，在一个js文件里写过的变量，函数，在另一个js文件里不可以使用</div>
      <br />
      <div>这个时候，可以给立即执行的匿名函数return想导出的变量，函数，然后在匿名函数前用一个变量接收</div>
      <br />
      <div>es6增加了模块化js的方案</div>
      <div>.js文件里就是正常的export导出 import导入，html里可以script标签把type写为model ，引入js模块</div>
    </AlertPro>
    <AlertPro message='问题'>
      <div>1.导入全部的语法是不是连同默认也一起导入了，还是只导入命名的?</div>
      <div>2.命名导出的是否被集合为一个对象?</div>
      <div>3.导入多个命名时的{}是否代表解构对象，如果是的话为什么导入时不能用解构赋值</div>
    </AlertPro>
  </AnchorCard>,
]
