import { AnchorCard, ParamsTable, PageHeader, TabsPro, CodeView, AlertPro } from '@/components'

export default () => [
  <PageHeader
    title='body标签'
    subTitle='一般定义页面的主体部分，包含页面的所有内容（如文本、超链接、图片、列表和表格等）'
  />,

  <AnchorCard title='文本标签' style={{ marginTop: 30 }}>
    <ParamsTable
      data={[
        { desc: `加粗`, example: `<strong>加粗</strong>`, effect: `<strong>加粗</strong>` },
        { desc: `斜体`, example: `<em>斜体</em>`, effect: `<em>斜体</em>` },
        { desc: `删除线`, example: `<del>删除线</del>`, effect: `<del>删除线</del>` },
        { desc: `下划线`, example: `<ins>下划线</ins>`, effect: `<ins>下划线</ins>` },
        {},
        { desc: `上标`, example: `<sup>上标</sup>`, effect: `<sup>上标</sup>` },
        { desc: `下标`, example: `<sub>下标</sub>`, effect: `<sub>下标</sub>` },
        {},
        { desc: `换行`, example: `<br />`, effect: `<br />` },
        { desc: `分隔线`, example: `<hr />`, effect: `<hr />` },
        {},
        { desc: `标题`, example: `<h1~h6>标题</h1~h6>`, effect: `<h5>标题</h5>`, attach: `dir` },
        { desc: `段落`, example: `<p>段落</p>`, effect: `<p>段落</p>`, attach: `align` },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='图片标签'>
    <CodeView language='html'>
      {`<img src='图片路径' alt='提示' title='标题' />`}
    </CodeView>
    <ParamsTable
      data={[
        { attr: `src`, desc: `图片路径`, example: `src='img/logo.jpg'` },
        { attr: `alt`, desc: `图片显示失败时的提示文本`, example: `alt='这是一张图片'` },
        { attr: `title`, desc: `鼠标悬浮时的提示文本`, example: `title='这是一张图片'` },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='链接标签'>
    <CodeView language='html'>
      {`
        <!--普通链接-->
        <a href='链接网址'>链接名称</a>

        <!--锚点定位-->
        <a name='mao'>这是要跳转到的位置</a>

        <!--定义锚点 方法一：-->
        <p id='mao'>这是要跳转到的位置</p>
        <!--定义锚点 方法二：-->
        <a href='#mao'>链接名称</a>
      `}
    </CodeView>
    <ParamsTable
      data={[
        { attr: `href`, desc: `跳转网址`, example: `href='http://qq.com'` },
        { attr: `href`, desc: `跳转本地链接`, example: `href='./new.html'` },
        { attr: `href`, desc: `空链接`, example: `href='#'` },
        { attr: `href`, desc: `无反应`, example: `href='javascript:void(0)'` },
        { attr: `target`, desc: `新窗口打开`, example: `target='_blank'` },
        { attr: `target`, desc: `本窗口打开`, example: `target='_self'` },
        { attr: `download`, desc: `将 href 地址的文件下载并以 file_name 命名`, example: `download='file_name'` },
        { attr: `rel`, desc: `禁止蜘蛛抓取`, example: `rel='nofollow'` },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='列表标签'>
    <TabsPro
      onChange={null}
      items={[
        {
          label: '无序列表',
          children: [
            <CodeView language='html'>
              {`
                <ul>
                  <!--ul标签下只允许有li标签-->
                  <li>无序表项1</li>
                  <!--li标签下允许有其它标签-->
                  <li>无序表项2</li>
                </ul>
              `}
            </CodeView>,
            <ParamsTable
              data={[
                { attr: `type`, desc: `小方块/实心圆/空心圆`, example: `type='square/disc/circle'` },
              ]}
            />,
          ],
        },
        {
          label: '有序列表',
          children: [
            <CodeView language='html'>
              {`
                <ol>
                  <!--ol标签下只允许有li标签-->
                  <li>有序表项1</li>
                  <!--li标签下允许有其它标签-->
                  <li>有序表项2</li>
                </ol>
              `}
            </CodeView>,
            <ParamsTable
              data={[
                { attr: `type`, desc: `表项前的序号格式`, example: `type='1/a/A/i/I'` },
                { attr: `start`, desc: `序号从几开始`, example: `start='3'` },
                { attr: `reversed`, desc: `序号为降序显示`, example: `reversed` },
              ]}
            />,
          ],
        },
        {
          label: '自定义列表',
          children: [
            <CodeView language='html'>
              {`
                <dl>
                  <!--dl标签下可以有多对dt、dd标签，但不能有其它标签-->
                  <dt>北京</dt>
                  <!--dt标签后允许多个dd标签-->
                  <dd>海淀区</dd>
                  <dd>昌平区</dd>
                  <dd>顺义区</dd>
                </dl>
              `}
            </CodeView>,
          ],
        },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='表格标签'>
    <CodeView language='html'>
      {`
        <table>
        <!--tr是行，th是表头，td是单元格-->
        <caption>
          这是表格标题
        </caption>
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      `}
    </CodeView>
    <TabsPro
      items={[
        {
          label: 'table标签',
          children: [
            <ParamsTable
              data={[
                { attr: `border`, desc: `边框`, example: `border='1'` },
                { attr: `bordercolor`, desc: `边框颜色`, example: `bordercolor='red'` },
                { attr: `bgcolor`, desc: `背景颜色`, example: `bgcolor='red'` },
                { attr: `background`, desc: `背景图片`, example: `background='1.jpg'` },
                { attr: `width`, desc: `整个表格宽度`, example: `width='300'` },
                { attr: `height`, desc: `整个表格高度`, example: `height='200'` },
                { attr: `algin`, desc: `整个表格对齐方式`, example: `algin='left/right/'` },
                { attr: `cellspacing`, desc: `单元格之间的距离`, example: `cellspacing='2'` },
                { attr: `cellpadding`, desc: `单元格内容与边框的距离`, example: `cellpadding='1'` },
              ]}
            />,
          ],
        },
        {
          label: 'tr、td、th 标签',
          children: [
            <ParamsTable
              data={[
                { attr: `bgcolor`, desc: `背景颜色`, example: `bgcolor='red'` },
                { attr: `background`, desc: `背景图片`, example: `background='1.jpg'` },
                { attr: `width`, desc: `整个表格宽度`, example: `width='300'` },
                { attr: `height`, desc: `整个表格高度`, example: `height='200'` },
                { attr: `align`, desc: `单元格内容水平对齐方式`, example: `align='left/right/center'` },
                { attr: `valign`, desc: `单元格内容竖直对齐方式`, example: `valign='top/middle/bottom'` },
              ]}
            />,
          ],
        },
        {
          label: 'caption 标签',
          children: [
            <ParamsTable
              data={[
                { attr: `align`, desc: `标题的位置`, example: `align='top/bottom'` },
              ]}
            />,
          ],
        },
        {
          label: '表格分组',
          children: [
            <AlertPro>
              <div>用于对表格的行进行分组</div>
              <div>thead 和 tfoot 只出现一次，tbody 可出现多次</div>
              <div>没有定义的话，全部在 tbody 里</div>
            </AlertPro>,
            <CodeView language='html'>
              {`
            <thead></thead>
            <tbody></tbody>
            <tfoot></tfoot>
          `}
            </CodeView>,
          ],
        },
        {
          label: '合并单元格',
          children: [
            <AlertPro>
              <div>跨行合并 'rowspan="要合并的行数"' 并把多余格删掉</div>
              <div>跨列合并 'colspan="要合并的列数"' 并把多余格删掉</div>
            </AlertPro>,
            <CodeView language='html'>
              {`
            <table>
                <tr>
                  <th>表头1</th>
                  <th>表头2</th>
                  <th>表头3</th>
                </tr>
                <tr>
                  <td colspan='3'>合并的列</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td rowspan='2'>合并的行</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
        </table>
          `}
            </CodeView>,
          ],
        },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='音频和视频和资源标签'>
    <CodeView language='html'>
      {`
        <audio src='' [autoplay] [controls] [loop] [muted] />
        <video src='' [autoplay] [controls] [loop] [muted] [width] [height] />

        <audio>
          <source src='horse.wav' type='audio/wav' />
          <source src='horse.mp3' type='audio/mpeg' />
        </audio>
      `}
    </CodeView>
    <AlertPro>
      <div>autoplay 属性在个别浏览器下失效，是因为有的浏览器不允许自动播放有声音的视频</div>
      <div>可以加个静音属性，或者在 video.oncanplay 事件中执行 video.play()方法来实现自动播放</div>
    </AlertPro>
    <ParamsTable
      data={[
        { attr: `autoplay`, desc: `自动播放`, example: `autoplay` },
        { attr: `controls`, desc: `播放控制条`, example: `controls` },
        { attr: `loop`, desc: `循环播放`, example: `loop` },
        { attr: `muted`, desc: `静音 (值是false为静音)`, example: `false` },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='语义化标签'>
    <ParamsTable
      data={[
        { desc: `头部`, example: `<header> </header>` },
        { desc: `导航`, example: `<nav> </nav>` },
        { desc: `主体内容`, example: `<main> </main>` },
        { desc: `侧边栏`, example: `<aside> </aside>` },
        { desc: `片段/区块`, example: `<section> </section>` },
        { desc: `底部`, example: `<footer> </footer>` },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='其它标签'>
    <ParamsTable
      data={[
        { desc: `代码标签`, example: `<code> </code>` },
        { desc: `模板标签(天生 display:none)`, example: `<template> </template>` },
        { desc: `源码原样显示`, example: `<pre> </pre>` },
        { desc: `长引用('<q></q>'为短引用)`, example: `<blockquote> </blockquote>` },
        { desc: `字体标签，属性(face、color、size)`, example: `<font>字体</font>` },
        { desc: `注释`, example: `<!--注释-->` },
        { desc: `进度条`, example: `<progress />` },
        { desc: `缩写标签`, example: `<abbr title='缩写内容'>WHO</abbr>` },
        { desc: `对话框标签`, example: `<dialog> </dialog>` },
        { desc: `突出标签，文本为黄色背景`, example: `<mark> </mark>` },
        { desc: `时间标签，表示内容是一个时间(语义化)`, example: `<time> </time>` },
        { desc: `地址标签，表示内容是一个地址(语义化)`, example: `<address> </address>` },
        { desc: `多媒体标签，表示内容是多媒体区域(语义化)`, example: `<figure> </figure>` },
        { desc: `键位标签，表示内容是一个键盘键位`, example: `<kbd> </kbd>` },
        {
          desc: `条件注释<br>满足 IE 版本小于 9 才渲染里面的 html 代码<br>一般用来有选择性的输出内容或加载 js`,
          example: `<!--[if lt IE 9 ]>\n\t<h2>版本过低，请您升级浏览器</h2>\n\t<script src='html5shiv.js'></script>\n<![endif]-->`,
        },
        { desc: `折<br>叠<br>问<br>答`, example: `<details>\n\t<summary>问题</summary> \n\t 回答 \n</details>` },
      ]}
    />
  </AnchorCard>,
]
