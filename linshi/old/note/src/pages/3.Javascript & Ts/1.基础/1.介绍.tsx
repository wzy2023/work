import { AlertPro, AnchorCard, CodeView } from '@/components'

export default () => [
  <AnchorCard title='介绍'>
    <AlertPro>
      <div>js是一种嵌入式、弱类型的脚本语言，是一种对象模型语言</div>
      <div>它分为五个部分：基础语法、标准库对象、BOM、DOM、网络类</div>
      <div>v8引擎是浏览器里js的解析引擎</div>
      <div>js的引入有三种方式：内嵌式可以在网页的任意位置，实际开发中建议使用外链式</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='使用'>
    <CodeView language='html'>
      {`
        <script type='text/javascript'>...</script>
        <script src='./1.js'></script>
        <p onclick='alert(111)'></p>
      `}
    </CodeView>
  </AnchorCard>,
]
