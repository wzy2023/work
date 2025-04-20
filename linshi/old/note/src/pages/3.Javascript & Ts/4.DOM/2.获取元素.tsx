import { AlertPro, AnchorCard, CodeView } from '@/components'

export default () => [
  <CodeView language='html'>
    {`<div id='id1' class='class1' name='name1'></div>`}
  </CodeView>,
  <AnchorCard title='直接获取' subTitle='(五种方式)'>
    <AlertPro>
      <div>(1) `var id = document.getElementById("id")`</div>
      <div>(2) `var class = document.getElementsByClassName("class")[0]`</div>
      <div>(3) `var div = document.getElementsByTagName("div")[0]`</div>
      <div>(4) `var name = document.getElementsByName("name")[0]`</div>
      <div>(5) `直接用元素的id值来操作元素，但不建议使用`</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='css选择器获取' subTitle='(两种方式)(不支持伪元素和伪类选择器)'>
    <AlertPro>
      <div>(1) `var p = document.querySelector(".class")` // 返回满足条件的第一个元素</div>
      <div>(2) `var p = document.querySelectorAll(".class")` // 返回满足条件的元素数组</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='访问关系获取'>
    <AlertPro>
      <div>(1) 父节点 `id1.parentElement / id1.parentNode`</div>
      <div>(2) 下个兄弟节点 `id1.nextElementSibling / id1.nextSibling`</div>
      <div>(3) 上个兄弟节点 `id1.previousElementSibling / id1.previousSibling`</div>
      <div>(4) 第一子节点 `id1.firstElementChild / node.firstChild`</div>
      <div>(5) 最后子节点 `id1.lastElementChild / node.lastChild`</div>
      <div>(5) 所有子节点 `id1.children / id1.childNodes`</div>
    </AlertPro>
  </AnchorCard>,
]
