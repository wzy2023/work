import { AlertPro, AnchorCard, CodeView } from '@/components'

export default () => [
  <AnchorCard title='HTML中直接书写' subTitle='(行内绑定)'>
    <AlertPro message='onclick属性的值就是一个js语句' />
    <CodeView language='html'>
      {`
        <div id='id' onclick='fn(this)' />
        <script>
          function fn(e) {
            ...  // 这种绑定方式，如需使用元素本身，需要传递参数，这样e就是元素本身
            ...  // 这种绑定方式，fn里的this是指window，而不是元素本身，因为fn函数是window的
          }
        </script>
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='获取元素后绑定点击事件' subTitle='(动态绑定)'>
    <AlertPro message='把函数作为值赋给该元素的onclick属性' />
    <CodeView language='javascript'>
      {`
        node.onclick = function(){
          ...
        }
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='事件监听器'>
    <AlertPro message='可添加/删除多个相同事件，把函数作为值赋给该元素'>
      这种方式可以给同元素的同类型事件绑定多个函数，且可以指定该函数在传播过程中的触发阶段
    </AlertPro>
    <CodeView language='javascript'>
      {`
        node.addEventListener('click', fn, true)  // 捕获阶段触发
        node.addEventListener('click', fn, false)  // 冒泡阶段触发
        node.removeEventListener('click', fn)
      `}
    </CodeView>
  </AnchorCard>,
]
