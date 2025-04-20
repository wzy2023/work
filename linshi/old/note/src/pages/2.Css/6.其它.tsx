import { AnchorCard, CodeView, TabsPro, AlertPro, ParamsTable, ImagePro } from '@/components'

export default () => (
  <TabsPro
    items={[
      {
        label: '引入方式',
        children: [
          <AnchorCard title='内联方式'>
            <CodeView language='html'>
              {`
            <style>
            p {                        /*属性由大括号包括*/
              color: red;            /*必须冒号分隔、分号结尾*/
              font-size: 16px;
              font-family: "微软雅黑",tahoma,arial;
            }
            </style>
          `}
            </CodeView>
          </AnchorCard>,
          <AnchorCard title='外联方式'>
            <CodeView language='html'>
              {`<link rel='stylesheet' href='./1.css' />`}
            </CodeView>
          </AnchorCard>,
          <AnchorCard title='行内方式'>
            <CodeView language='html'>
              {`<p style='width:100px'></p>`}
            </CodeView>
          </AnchorCard>,
        ],
      },
      {
        label: '样式表的特性',
        children: [
          <AnchorCard title='优先级'>
            <AlertPro>
              <div>[多个选择器]选中[同一个元素]后，并且要设置的样式有冲突时，元素使用哪个选择器的样式，称为优先级</div>
              <div>{'!important > 行内样式 > id选择器 > 伪/类选择器 > 标签选择器 > 继承样式 > 默认样式'}</div>
              <div>按官大一级压死人的原则，比优先级最高的选择器，都是同级就比同级选择器的数量。</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='层叠性'>
            <AlertPro>
              <div>当[多个][相同优先级]的选择器选中[同一个元素]，该元素的样式会以CSS代码里后面的选择器样式为准
                (也就是后面的会覆盖前面的)
              </div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='继承性'>
            <AlertPro>
              <div>继承性是指子元素可以继承父元素的属性 (如字号颜色等)</div>
              <div>h系列标签不能继承父元素的字号，a标签不能继承父元素的颜色</div>
              <div>如果某元素没有被直接选中，但可以继承多个上级的属性，那就按离该元素最近的上级元素的属性继承</div>
            </AlertPro>
          </AnchorCard>,
        ],
      },
      {
        label: '块/行内(块)的特性',
        children: [
          <AlertPro>
            <div>块状元素(独占一行)：div、p、h1~h6、pre、hr、ul、ol、li、dl、dt、dd、table</div>
            <div>它内部可放置其它元素，可设置宽高，默认宽度为父元素宽度，有四个方向的 padding、border、margin</div>
            <br />
            <div>行内元素(从左到右流动)：span、a、b、strong、i、font、em、ins</div>
            <div>不能设置宽高，默认宽高为0，宽度由其内容多少决定，高度由内容的字号/行高决定</div>
            <div>只有横向的 padding、border、margin，纵向的有显示效果但不会撑高盒子</div>
            <br />
            <div>行内块(从左到右流动)：img、input、select、textarea、button、video、audio</div>
            <div>一行可放多个，默认宽高为0，宽度由其内容多少决定，高度由内容的字号/行高决定</div>
            <div>可以设置宽高，有四个方向的 padding、border、margin</div>
          </AlertPro>,
        ],
      },
      {
        label: '移动端',
        children: [
          <AnchorCard title='开发现状'>
            <AlertPro>
              <div>开发移动端网页，不需要像pc端那样考虑浏览器兼容性，因为移动端大部分都是webkit内核</div>
              <div>但是，移动端需要考虑页面的自适应，因为手机屏幕尺寸各不相同，</div>
              <div>pc端屏幕尺寸虽然也不相同，但是pc端屏幕大，只要做成版心容器就行了，这样在较窄或较宽的屏幕上，中间的内容区域不变，区别只是两边空白区域的不同</div>
              <div>而移动端不一样，移动端屏幕本来就不大，所以不能用版心容器(两边留白浪费页面)，而要用自适应的技术，让网页元素根据屏幕尺寸来自适应</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='视口设置'>
            <AlertPro>
              <div>移动端开发还需要注意的一个问题就是viewport</div>
              <div>viewport就是视口，视口是一个虚拟区域，用来承载网页，浏览器再承载视口</div>
              <div>网页内容显示在视口里，视口再显示在浏览器窗口上</div>
              <div>一些设备的视口宽度是980px，网页显示在里面，为了能在320px的屏幕上显示，会自动缩放</div>
              <div>标准视口设置，将视口宽度设置为屏幕宽度</div>
            </AlertPro>
            <CodeView language='html'>
              {`
            <meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
          `}
            </CodeView>
            <ParamsTable
              data={[
                { attr: 'width', desc: '视口宽度，可以设置成device-width (即为设备宽度)' },
                { attr: 'height', desc: '视口高度，可以设置d成evice-height (即为设备高度)' },
                { attr: 'initial-scale', desc: '初始缩放比，设置视口宽度为屏幕宽度的多少倍' },
                { attr: 'maximum-scale', desc: '最大缩放比，大于0的数字' },
                { attr: 'minimum-scale', desc: '最小缩放比，大于0的数字' },
                { attr: 'user-scalable', desc: '用户是否可以缩放，yes或no' },
              ]}
            />
          </AnchorCard>,
        ],
      },
      {
        label: '名词解释',
        children: [
          <AnchorCard title='二倍图'>
            <AlertPro>
              <div>物理像素 - 屏幕显示的最小颗粒，是物理真实存在的</div>
              <div>CSS像素 - 显示颜色的最小单位，也就是css中的1px，1px只能显示一个颜色</div>
              <div>物理像素比 - 1css像素包含的物理像素的比例</div>
              <div>分辨率 - 屏幕上水平和垂直方向的物理像素的数量</div>
              <div>二倍图是为了解决在高清设备上显示图片模糊的问题，显示模糊的原因是：</div>
              <div>在高清设备上，1css像素可能包含多个物理像素点，这样显示颜色的时候，1css像素的颜色就会分给多个物理像素点显示，造成每个物理像素点的饱和度不够，所以在高像素点的设备上显示图片时，反而不清晰</div>
            </AlertPro>
            <CodeView language='css'>
              {`
            .box {
              /* 原始图片200*200px */
              background-size: 100px 100px;
            }
            img {
              /* 原始图片200*200px */
              width: 100px;
              height: 100px;
            }
          `}
            </CodeView>
          </AnchorCard>,
          <AnchorCard title='csshack'>
            <AlertPro>
              <div>csshack就是很难保证它以后不出问题</div>
              <div>c3属性加浏览器私有前缀可以更好的兼容多浏览器</div>
              <div>-webkit-、-moz-、-o-、-ms-</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='CSS3 新特性'>
            <AnchorCard title='新特性'>
              <ParamsTable
                data={[
                  { desc: '颜色：新增 RGBA，HSLA 模式' },
                  { label: '文字阴影(text-shadow)' },
                  { label: '盒子模型(box-sizing)' },
                  { label: '渐变(linear-gradient、radial-gradient)' },
                  { label: '过渡(transition)' },
                  { label: '伪元素(selection)' },
                  { label: '2D转换、3D转换、自定义动画、媒体查询、多栏布局' },
                  { label: '圆角边框(border-radius)、边框阴影(box-shadow)、边框图片(border-image)' },
                  { label: '背景(background-size、background-origin、background-clip)' },
                ]}
              />
            </AnchorCard>
          </AnchorCard>,
        ],
      },
      {
        label: '书写经验',
        children: [
          <AnchorCard title='模块一律用class，而不是id'>
            <AlertPro>
              <div>这样当该模块在页面被多次使用时，不会出现多个相同id的情况</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='要考虑到极端情况'>
            <AlertPro>
              <div>比如一个列表，高度由列表项撑起，如果一个列表项都没有，列表高度为0，应该怎么展示</div>
              <div>比如一段文本，内容过长时，应该怎么展示</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='要考虑页面在不同尺寸的屏幕上的差异'>
            <AlertPro>
              <div>比如屏幕过宽过窄，屏幕过长过短，刘海屏之类对页面展示的影响</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='组件的宽高如何设置好'>
            <AlertPro>
              <div>组件应该可以根据所在容器宽高，自动适应容器大小</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='可以通过父元素来达到修改子元素样式的目的'>
            <AlertPro>
              <div>通常在子元素不容易被选中时使用，比如子元素是伪元素的时候，</div>
              <div>下例就是通过给div不同的类来控制伪元素的内容</div>
              <div>{'div.red p::after { content: "red" }'}</div>
              <div>{'div.blue p::after { content: "blue" }'}</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='想清楚是否要用区域滚动组件，什么时候用区域滚动组件'>
            <AlertPro>
              <div>① 整个页面的垂直滚动是不需要区域滚动的，</div>
              <div>因为页面高度大于视口高度时，视口默认就是区域滚动的，这时视口区域就是滚动区域</div>
              <div>② 区域滚动一般用在要滚动的区域宽度小于视口宽度，或者要滚动的区域高度小于视口高度时，</div>
              <div>让大量的内容在固定的区域内滚动显示</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='css布局思想'>
            <AlertPro>
              <div>固定还是自适应，最恰当的布局方式应该是固定与自适应的结合，外部区块固定宽度，区块内容自适应区块大小，</div>
              <div>这样当区块大小改变时，里面的内容可以自适应区块大小</div>
              <div>自适应又有三种方式(%、flex和rem)</div>
              <div>版心容器不能用自适应，它必须有固定宽度</div>
              <div>图片不能用%、flex自适应，因为这两种方式的自适应只能自适应宽度不能自适应高度，会造成图片的变形(除非不用css设定图片高度)</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='做pc网页的思路'>
            <AlertPro>
              <div>① 网页是否需要同时兼容pc和移动端，如果需要，就要做响应式</div>
              <div>② 网页是否需要适应浏览器的尺寸变化，如果需要，就要做自适应</div>
              <div>③ 先把网页分成一行一个的块，每个块里再继续分，直到需要两个块左右分布时，使用flex排列或浮动排列</div>
              <div>④ 用width、height控制块的大小</div>
              <div>⑤ 用padding、position控制块里元素的位置，用margin控制块与块之间的距离</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='需要注意'>
            <AlertPro>
              <div>① 外部css中的图片路径 (例如：css目录和img目录平级的时候，css中的img路径需要是"../img/head.jpg")</div>
              <div>② nav:hover::after 注意元素选择时的顺序，先hover再after</div>
              <div>③ 调试时测试用的css不要写在正式的css里，这样写完后方便删除</div>
              <div>④ 拿到网页不要着急写，先分析网页布局，写的时候，先css初始化，再布局，再填充内容</div>
              <div>⑤ 用子代选择器比后代选择器更安全</div>
              <div>⑥ 要控制img在父元素中的位置时，最好给它加一个直接的div</div>
              <div>⑦ 文字垂直居中时，应该保持所有子元素的行高与父元素的高度相同</div>
              <div>⑧
                网页上的ul列表/或其它有可能因内容增多而撑开高度的块，最好都给固定高度，这样内容溢出，不会影响下面盒子的布局
              </div>
              <div>⑨ 如果项目中引用了别人的css文件，要注意把自己的css文件引入在别人之后，这样可以覆盖别人的样式</div>
              <div>⑩
                如果要给某个div加一层指定颜色的透明度，可以在它里面写个div，高度100%，背景颜色用rgba()，另外，父子div的背景图可以实现层叠效果
              </div>
              <div>{'⑩ 多个img或多个span之间有空隙，是因为代码里的img标签或span标签之间有换行或空格，删除(换行或空格)或给它们的父元素加个属性 \'font-size: 0px;\' 即可把空隙去掉，还有一个办法是给它们浮动，或者把它们转换成块元素'}</div>
              <div>⑩ css3属性记得做css hack</div>
              <div>⑩ 善于将页面元素抽象出公有样式</div>
              <div>{'⑩ body { font-size: 20px; line-height: 2; } body的子元素继承line-height属性是继承到了2这个值，而不是40px'}</div>
              <div>⑩ 目的是元素发生位移的话，margin和position:relative和2D位移都可以实现</div>
              <div>⑩ div的pading-top为10，这个div里面有元素top:
                0定位的话，是基于div的border位置的，也就是说会显示在内容区上面
              </div>
              <div>⑩ 内联元素能撑开高度的只有字号和行高，高度/内边距/外边距都不行</div>
              <div>⑩
                盒子a一旦设了高度，下面的盒子b就以a的底边为准，不管盒子a的内容是否超出后占用了此区域，也就是说，盒子a里面的内容溢出，不会影响到盒子b的位置
              </div>
              <div>⑩ {'文档流里，(img或其它行内块元素)与文字在一行的时候，默认是(img或其它行内块元素)底边和该行的底边对齐，这样造成的显示效果就是文字和图片不在一行上，给(img或其它行内块元素)加 vertacil-align: middle 属性可以设置与该行中心线对齐'}</div>
            </AlertPro>
          </AnchorCard>,
        ],
      },
      {
        label: '常见问题',
        children: [
          <AnchorCard title='浏览器渲染逻辑'>
            <AlertPro>
              <div>浏览器得到一个标签，先找有没有选择器直接选中该标签，</div>
              <div>如果有：就判断这些选择器的优先级，以优先级最高的选择器为准，如果优先级相同，就以css代码里后面的选择器样式为准。</div>
              <div>如果没：就判断这个元素是否有继承的属性，</div>
              <div>如果有：就以离这个元素最近的上级元素的继承属性为准。</div>
              <div>如果没：就用浏览器默认属性。</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='元素默认属性值'>
            <AlertPro>
              <div>①
                div默认宽度为auto，auto是指尽可能向右扩充填满父容器，这和100%还是不一样的，100%是指宽度为父容器宽度，如果有padding或margin就会超出父容器，而如果是auto的话，有padding或margin，内容区会向里收缩，不会超过父容器。
              </div>
              <div>② div默认高度为0，高度可由内容自动撑起，当内容过多或设置了过大的宽高，这个div就会溢出父元素的范围</div>
              <div>③ img元素的宽高默认情况下由图片决定，也可以设置宽高图片会自动填满，当图片过大或给img设置了过大的宽高，img元素就会溢出父元素的范围
                (这时候可以给img元素设置宽高100%)
              </div>
              <div>④ 文本在div里，汉字自动折行，无空格的英文/数字不会折行，不折行的话会溢出来</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='自适应和响应式的区别'>
            <AlertPro>
              <div>自适应是页面元素适应浏览器的尺寸变化，浏览器尺寸变化时，页面元素等比放大或缩小</div>
              <div>响应式是浏览器尺寸变化到某个尺寸后，切换网页的css样式</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='字体图标显示原理'>
            <AlertPro>
              <div>字体图标.css实际上还是提供了一系列的css，span标签写上指定类名，该span就能显示出字体图标来</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='使用img和div的background显示图片的不同'>
            <AlertPro>
              <div>① img是元素，所以会占文档流位置，div的background不是元素，所以div上可以放内容</div>
              <div>②
                img不设置宽高的话，默认就是图片的宽高，图片过大会撑高或溢出父div，background的宽高需要手动设置否则默认高度为0
              </div>
              <div>③ img上图片的显示效果是占满img元素，background上图片的显示效果可以通过属性设置</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='css reset的作用和用途'>
            <AlertPro>由于浏览器的品牌不同，所以css的默认样式也不一致，重置浏览器的默认样式 ，可以让他们统一</AlertPro>
          </AnchorCard>,
          <AnchorCard title='标签上title与alt属性的区别是什么'>
            <AlertPro>img上的alt属性用于当图片显示失败时用文字代表，title属性是文字悬浮时的提示信息</AlertPro>
          </AnchorCard>,
          <AnchorCard title='给tr加边框无效'>
            <AlertPro>https://blog.csdn.net/zlzbt/article/details/80089798</AlertPro>
          </AnchorCard>,
          <AnchorCard title='input标签添加上disable属性在移动端字体颜色不兼容'>
            <AlertPro>https://blog.csdn.net/q36835109/article/details/71514696</AlertPro>
          </AnchorCard>,
          <AnchorCard title='Chrome谷歌浏览器不支持CSS设置小于12px文字'>
            <AlertPro>https://www.divcss5.com/wenji/w321.shtml</AlertPro>
          </AnchorCard>,
          <AnchorCard title='js同时控制多个元素的多个动画'>
            <AlertPro>可以通过给这些元素加`.class`的方式，不同动画间的间隔可以通过过渡前的延迟实现</AlertPro>
          </AnchorCard>,
          <AnchorCard title='为什么淘宝等网站将css直接写进页面，而没有进行分离'>
            <AlertPro>
              <div>对大部分网站来说，将网站公共的部分分离为单独的css样式，对这些公共样式的重构是很有用的</div>
              <div>但对淘宝首页来说，直接将css嵌在页面头部，其降低请求数的重要性远大于样式的重用</div>
              <div>这些不同的处理方法，没有什么正确与错误之分，只有适合不适合</div>
            </AlertPro>
          </AnchorCard>,
        ],
      },
      {
        label: '代码示例',
        children: [
          <AnchorCard title='元素垂直居中的几种方式'>
            <CodeView language='css'>
              {`
        /* (1) */
        div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        /* (2) */
        div {
            width: 18em;
            padding: 1em 1.5em;
            margin: 50vh auto 0;
            transform: translateY(-50%);
        }

        /* (3) */
        div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 18em;
            height: 10em;
        }
      `}
            </CodeView>
          </AnchorCard>,
          <AnchorCard title='渐变颜色的文字'>
            <ImagePro src='/2.Css/css_test_1.png' />
            <CodeView language='css'>
              {`
        /* 背景渐变 */
        background-image:linear-gradient(90deg, red, bisque, navy);
        /* 裁切掉文字以外的背景 */
        background-clip: text;
        /* 文字颜色设置为透明色 */
        color: transparent;
      `}
            </CodeView>
          </AnchorCard>,
          <AnchorCard title='几种自动居中方式'>
            <AlertPro>
              <div>① html里，table/img的align属性，是控制自身元素在父元素里的水平位置</div>
              <div>② html里，tr/td/p标签里的align属性，是控制里面内容的水平位置</div>
              <div>③ css里，要让块元素在盒子里水平居中，给自身设置 `width: 100px; margin:0 auto`</div>
              <div>④ css里，要让行内(块)元素在盒子里水平居中，给盒子设置 `text-align: center`</div>
              <div>⑤ css里，要让行内元素在盒子里垂直居中，给盒子设置 `line-height: 盒子高度`</div>
              <div>⑥ css里，要让行内块元素在盒子里垂直居中，首先给盒子设置 `line-height: 盒子高度`，再给自身设置
                `vertical-align: middle`
              </div>
              <div>⑦ css里，要让块元素在盒子里垂直居中，给盒子设置 `display: flex; justify-content: center; align-items:
                center`
              </div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='让元素宽度跟随父元素且留有边距'>
            <AlertPro>
              <div>元素position脱离文档流后，变成行内块元素，想让它宽度占父容器的100%，可以用width: 100%，</div>
              <div>但如果还想要给它设置margin的话，设置margin后，元素会超出父容器，</div>
              <div>因为宽度固定为父容器的100%，加上margin宽度就会超出父容器</div>
              <div>所以，既要宽度占满父容器宽度，且留有一定边距的话，</div>
              <div>更合适的做法是：`left: 10px; right: 10px`，这样宽度跟随父容器宽度且左右各留10px边距。</div>
            </AlertPro>
          </AnchorCard>,
        ],
      },
    ]}
  />
)
