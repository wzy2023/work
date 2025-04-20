import { AlertPro, AnchorCard, ParamsTable } from '@/components'

export default () => [
  <AnchorCard title='相对路径'>
    <ParamsTable
      data={[
        { desc: `同一目录`, example: `<img src='logo.jpg'/> <img src='./logo.jpg' />` },
        { desc: `上级目录`, example: `<img src='../logo.jpg' />` },
        { desc: `下级目录`, example: `<img src='./img/logo.jpg' />` },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='绝对路径'>
    <ParamsTable
      data={[
        { example: `<img src='D:\WEB\img\logo.jpg' />` },
        { example: `<img src='/logo.jpg' />` },
        { example: `<img src='//www.baidu.com/logo.jpg' />` },
        { example: `<img src='http://www.baidu.com/logo.jpg' />` },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='Emmet 语法'>
    <AlertPro>
      <div>Emmet 语法规则，能大大提高代码书写，只需要一行代码就能生成你想要的完整HTML结构</div>
      <div>它是一款插件，只要能安装他的编辑器都能使用，大部分编辑器都可以使用该语法规则</div>
    </AlertPro>
    <ParamsTable
      data={[
        { label: '!', desc: '生成 html5 基本结构' },
        { label: 'html:5', desc: '生成 html5 基本结构' },
        {},
        { label: '#', desc: '生成 id', attach: 'div#test', example: `<div id='test'></div>` },
        { label: '.', desc: '生成 class', attach: 'div.test', example: `<div class='test'></div>` },
        {},
        {
          label: '>', desc: '生成子节点', attach: 'ul>li', example: `<ul>
  <li></li>
</ul>`,
        },
        {
          label: '+', desc: '生成兄弟节点', attach: 'div+p', example: `<div></div>
<p></p>`,
        },
        {
          label: '^', desc: '生成上级节点', attach: 'div+p^h2', example: `<div>
  <p></p>
</div>
<h2></h2>`,
        },
        {},
        {
          label: '()', desc: '分组', attach: 'ul>(li>a)+p', example: `<ul>
  <li><a></a></li>
  <p></p>
</ul>`,
        },
        { label: '{}', desc: '文本', attach: 'p{hello world}', example: `<p>hello world</p>` },
        { label: '[]', desc: '生成 a 标签', attach: 'a[href="###" name="xiaoA"]', example: `<a href='###' name='xiaoA'></a>` },
        {},
        {
          label: '*', desc: '重复', attach: 'ul>li*3', example: `<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>`,
        },
        {
          label: '$', desc: '代表从 1 开始递增的一位数', attach: 'ul>li.item$*3', example: `<ul>
  <li class='item1'></li>
  <li class='item2'></li>
  <li class='item3'></li>
</ul>`,
        },
        {
          label: '$@3', desc: '代表从 3 开始递增的一位数', attach: 'ul>li.item$@3*3', example: `<ul>
  <li class='item3'></li>
  <li class='item4'></li>
  <li class='item5'></li>
</ul>`,
        },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='src 和 href 的区别'>
    <AlertPro>
      <div>src 用于替换当前元素，</div>
      <div>href 用于在当前文档和引用资源间确立联系，</div>
      <div>img、script 使用 src 属性，a、link 使用 href 属性</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='align 属性'>
    <AlertPro>
      <div>大部分元素的 align 属性都是控制元素里面内容的位置，</div>
      <div>table、img 元素的 align 属性是控制自身在行内的位置</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='table 表格的隐藏 tbody'>
    <AlertPro>
      <div>css 选择器选择 table 下的元素时，</div>
      <div>要注意 table 下有个自动生成的 tbody</div>
      <div>所以用子代选择器选不到 tr 元素，应该使用后代选择器</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='拖拽元素的属性'>
    <AlertPro>
      要在页面上拖拽元素，需要给元素添加 draggable="true" 属性，这样元素才能拖拽
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='HTML5 包含什么'>
    <AlertPro message='新的结构化元素'>
      <ParamsTable
        data={[
          { label: `header`, desc: `定义文档或部分的头部` },
          { label: `footer`, desc: `定义文档或部分的尾部` },
          { label: `section`, desc: `定义文档中的节` },
          { label: `article`, desc: `定义独立的内容` },
          { label: `aside`, desc: `定义内容之外的内容` },
          { label: `nav`, desc: `定义导航链接` },
          { label: `main`, desc: `定义文档的主要内容` },
          { label: `figure 和 figcaption`, desc: `用于图像和图像说明` },
        ]}
      />
    </AlertPro>

    <AlertPro message='语义元素'>
      <ParamsTable
        data={[
          { label: `mark`, desc: `用于标记文本` },
          { label: `time`, desc: `用于时间和日期` },
          { label: `progress`, desc: `表示任务的进度` },
          { label: `meter`, desc: `表示范围内的标量测量` },
        ]}
      />
    </AlertPro>

    <AlertPro message='多媒体元素'>
      <ParamsTable
        data={[
          { label: `audio`, desc: `用于音频内容` },
          { label: `video`, desc: `用于视频内容` },
          { label: `track`, desc: `用于定义字幕、章节、元数据等` },
        ]}
      />
    </AlertPro>

    <AlertPro message='表单控件'>
      <ParamsTable
        data={[
          { label: `email`, desc: `用于电子邮件输入` },
          { label: `url`, desc: `用于 URL 输入` },
          { label: `date`, desc: `用于日期输入` },
          { label: `datetime-local`, desc: `用于本地日期和时间输入` },
          { label: `number`, desc: `用于数字输入` },
          { label: `range`, desc: `用于范围输入` },
          { label: `search`, desc: `用于搜索输入` },
          { label: `tel`, desc: `用于电话号码输入` },
          { label: `color`, desc: `用于颜色选择` },
          { label: `placeholder`, desc: `提供占位符文本` },
          { label: `required`, desc: `表单字段是必填项` },
          { label: `pattern`, desc: `指定输入模式` },
          { label: `autocomplete`, desc: `提供自动完成功能` },
        ]}
      />
    </AlertPro>

    <AlertPro message='增强的 JavaScript API'>
      <ParamsTable
        data={[
          { label: `canvas`, desc: `用于绘制图形` },
          { label: `SVG`, desc: `可缩放矢量图形，用于绘制复杂的图形和动画` },
          { label: `地理定位 API`, desc: `获取用户位置` },
          { label: `本地存储和会话存储`, desc: `用于在客户端存储数据` },
          { label: `Web Workers`, desc: `后台运行 JavaScript` },
          { label: `Web Sockets`, desc: `实现双向通信` },
          { label: `拖放 API`, desc: `支持拖放操作` },
          { label: `微数据`, desc: `提供语义增强` },
        ]}
      />
    </AlertPro>
  </AnchorCard>,
]
