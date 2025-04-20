import { AlertPro, CodeView, TabsPro, AnchorCard, ParamsTable, ImagePro } from '@/components'

export default () => (
  <TabsPro
    items={[
      {
        label: '静态',
        children: [
          <TabsPro
            type='card'
            size='small'
            items={[
              {
                label: '正常文档流',
                children: [
                  <AlertPro>
                    <div>HTML里，子元素在父元素里是从上至下的排列顺序，</div>
                    <div>块状元素独占一行，行内和行内块元素依次排列，直到显示不下，自动换到下一行。</div>
                    <div>屏幕足够大的话，所有的行内元素都是一行显示，直到遇到一个块状元素，块状元素独占一行显示后，行内元素继续排列显示，直到遇到下一个块状元素…</div>
                    <div>这样的排列方式明显不符合网页的需求，所以就产生了下面的技术：浮动排列</div>
                  </AlertPro>,
                ],
              },
              {
                label: '浮动排列',
                children: [
                  <AlertPro>
                    <div>浮动排列是将元素浮动起来后，水平排列在一行上的方式</div>
                    <div>可以用float: left / right指定元素向左还是向右排列</div>
                    <br />
                    <div>元素浮动起来后，自身变为行内块元素，没有了默认的宽高，但可以设置宽高</div>
                    <div>位置会往指定方向移动，后面的块级元素会占据它原先所处的位置并在它的下方，元素浮动起来后就脱离了正常的文档流位置，不占父元素的高度，造成父元素高度塌陷</div>
                    <br />
                    <div>对自身的影响：变为行内块元素，尽量往左/右侧移动，碰到前一个浮动元素或父内容区边缘停下</div>
                    <div>对所在行内联元素的影响：移动到所在行最前面</div>
                    <div>对后面块级兄弟的影响：相当于浮起来了，后面块级兄弟会处在它的下方</div>
                    <div>对父元素的影响：脱离正常的文档流，不占父元素的高度，造成父元素高度塌陷</div>
                    <br />
                    <div>浮动排列带来的这些影响，可以用下面几种方式清除</div>
                  </AlertPro>,
                  <CodeView language='css'>
                    {`
              /* 第一种清除浮动 - 父元素添加属性 */
              父元素 {
                overflow: hidden;
              }

              /* 第二种清除浮动 - 父元素结尾处加空div标签 */
              .clear {
                clear: both;
              }

              /* 第三种清除浮动 - 父元素添加伪元素(常用) */
              父元素::after {
                content: "";
                display: block;
                visibility: hidden;
                height: 0;
                line-height: 0;
                clear: both;
              }
              父元素 {
                zoom: 1;
              }

              /* 第四种清除浮动 - 父元素双伪元素 */
              父元素:before, 父元素:after {
                content: "";
                display: block;
                clear: both;
              }
              父元素 {
                zoom: 1;
              }
            `}
                  </CodeView>,
                ],
              },
              {
                label: 'flex布局',
                children: [
                  <AlertPro>
                    <div>除了浮动排列外，还有一种让元素水平排列的方式，叫flex排列</div>
                    <div>给父元素定义`display: flex`属性后，就可以指定里面子元素的排列方式</div>
                    <div>这时父元素又被称为弹性盒子</div>
                  </AlertPro>,
                  <ParamsTable
                    data={[
                      { attr: 'display', desc: '弹性盒子', value: 'display: flex' },
                      {
                        attr: 'flex-direction',
                        desc: '子盒_排列方向及顺序',
                        value: 'row/row-reverse/column/column-reverse',
                      },
                      { attr: 'flex-wrap', desc: '子盒_超出换行', value: 'nowrap/wrap/wrap-reverse' },
                      { attr: 'justify-content', desc: '子盒_主轴排布', value: '详见下图' },
                      { attr: 'align-content', desc: '子盒_辅轴排布', value: '详见下图' },
                      {
                        attr: 'align-items',
                        desc: '子盒_行内排布',
                        value: 'flex-start/flex-end/center/baseline/stretch',
                      },
                      { attr: 'flex', desc: '子盒_均分空隙', value: 'flex: 1' },
                    ]}
                  />,
                  <ImagePro src='/2.Css/flex.png' />,
                  <AlertPro message='主轴方向'>
                    <div>主轴方向就是排列方向</div>
                  </AlertPro>,
                  <AlertPro message='辅轴方向'>
                    <div>不是主轴方向的那个方向，有多行主轴且父盒子高度大于所有主轴高度之和时可用，控制每行主轴的排布方式</div>
                  </AlertPro>,
                  <AlertPro message='超出换行'>
                    <div>子盒一行放不下是否换行，默认不换行，会缩减宽度尽量显示</div>
                  </AlertPro>,
                  <AlertPro message='行内排布'>
                    <div>所有横轴均分盒子高度即为行，控制子盒在行内垂直方向的位置</div>
                  </AlertPro>,
                ],
              },
              {
                label: 'grid布局',
                children: [
                  <AlertPro>
                    <div>还有一种让子元素以网格方式呈现的布局，叫grid网格布局</div>
                    <div>给父元素定义`display: grid`属性后，父元素就成了网格的容器</div>
                    <div>可以用`grid-template-columns: 100px 1fr 1fr`属性定义网格有多少列，列宽分别多少</div>
                    <div>可以用`grid-template-rows: 20px 20px`属性定义网格有多少行，行高分别是多少</div>
                    <div>可以用`grid-gap: 5px`属性定义每个网格之间的间距</div>
                    <div>可以用`grid-column/grid-row: 1 / 4`属性来定义某个子网格占据多少个格位</div>
                    <div>(1/4是指格子的左边贴着第1条网格线，格子的右边贴着第4条网格线，如下图所示)</div>
                  </AlertPro>,
                  <AlertPro>
                    <div>① grid网格布局还带来一个新的尺寸单位：`fr`，它允许你将容器分成多个等分空间</div>
                    <div>② `grid-template-column: 100px 100px 100px`也可以写成`...: repeat(3, 100px)`</div>
                    <div>还可以用`auto-fit取代3`，`...: repeat(auto-fit, 100px)`，它会试图尽可能多地将100px宽的列排列在容器中
                    </div>
                    <div>{'还可以用`minmax(100px, 1fr)取代100px`，`...: repeat(auto-fit, minmax(100px, 1fr))`，它会试图尽可能多地将最小宽度为100px的列排列在容器中'}</div>
                  </AlertPro>,
                  <ImagePro src='/2.Css/grid.png' />,
                ],
              },
              {
                label: '定位',
                children: [
                  <AlertPro>
                    <div>以上几种方式有时候还是不能让元素显示在指定位置，这时候可以用元素定位</div>
                    <div>定位后用 left、right、top、bottom 属性可以设置元素距相对元素的指定方向边框的距离</div>
                    <div>元素在被absolute或fixed后，会脱离了文档流，变成行内块元素</div>
                  </AlertPro>,
                  <AlertPro>
                    <div>设置了sticky的元素，在屏幕范围内时该元素位置并不受到定位影响（设置的top、left等属性无效）</div>
                    <div>当该元素将要移出偏移范围时，根据left、top等属性设置成固定位置的效果</div>
                  </AlertPro>,
                  <ParamsTable
                    data={[
                      { attr: 'static', desc: '参数-默认位置', value: '盒子的正常位置' },
                      { attr: 'relative', desc: '参数-相对定位', value: '相对于该盒子本来的位置来定位' },
                      {
                        attr: 'absolute',
                        desc: '参数-绝对定位',
                        value: '相对于最近的一个非默认定位的上级元素来定位<br>直到回溯到浏览器屏幕',
                      },
                      { attr: 'fixed', desc: '参数-固定定位', value: '相对于浏览器屏幕固定的位置' },
                      {
                        attr: 'sticky',
                        desc: '参数 - 滚动定位',
                        value: '用top来指定偏移值，当超过偏移值时，使用偏移值的效果',
                      },
                    ]}
                  />,
                ],
              },
            ]}
          />,
        ],
      },
      {
        label: '自适应',
        children: [
          <AlertPro>
            <div>有了上面的几种布局方式，基本就能把设计图用网页写出来了，</div>
            <div>但这个网页在不同尺寸的窗口下显示可能会错乱，所以这时候还需要让网页能自适应不同的窗口尺寸</div>
            <div>自适应的方式就是，元素的宽高没有固定写死，而是用%或rem的方式，根据窗口尺寸变化伸缩元素尺寸</div>
          </AlertPro>,
          <TabsPro
            type='card'
            size='small'
            items={[
              {
                label: '%方式',
                children: [
                  <AlertPro>
                    <div>%方式就是流式布局，也称非固定像素布局</div>
                    <div>通过将盒子的宽度设置成父盒子的百分比，来根据窗口宽度自动进行伸缩</div>
                    <div>往往配合 max-width/min-width 来控制尺寸范围以免过大或过小影响阅读</div>
                    <div>特点：</div>
                    <div>① div之类的元素，可以让宽自适应，但高度固定 (容易造成背景图显示错误的问题)</div>
                    <div>② img由于会默认保持宽高比，所以宽高都可以自适应</div>
                    <div>③ 字号尺寸、字体图标尺寸，无法自适应</div>
                  </AlertPro>,
                ],
              },
              {
                label: 'rem方式',
                children: [
                  <AlertPro>
                    <div>rem是一个相对单位，相对于html的font-size，这个font-size又叫rem基准值</div>
                    <div>{'假设 html {font-size: 100px}，那么，1rem就代表100px'}</div>
                    <div>把设计图上各元素的尺寸用rem为单位来写，</div>
                    <div>{'例如：在750px的设计图上，某元素 {width: 100px; height: 200px}，假设设置750px的屏幕上rem基准值为100px'}</div>
                    <div>{'可以用rem为单位写成 {width: 1rem; height: 2rem}'}</div>
                    <div>这样，在750px的屏幕上，rem基准值不用变化，还是100px</div>
                    <div>在别的尺寸的屏幕上，计算出设计图与该屏幕的尺寸比例，然后根据该比例修改rem基准值</div>
                    <div>例如：屏幕宽度为375px，设计图与该屏幕的尺寸比例为2:1，在375px的屏幕上，修改rem基准值为50px就可以了</div>
                    <div>这样就达到了修改rem基准值，让以rem为单位的元素等比伸缩，宽高都自适应的效果</div>
                    <div>{'需要注意的是，我们在设置了rem基准值后，还需要给 body {font-size: 16px}，这样会使页面上继承的font-size值正常'}</div>
                    <div>步骤：</div>
                    <div>①
                      设计师给一张750px的设计图，上面有个元素，宽200px，高300px，我们假设rem基准值为100px，那么这个元素的尺寸，可以写成宽2rem，高3rem
                    </div>
                    <div>②
                      但这里的rem基准值不是必须为100px，100px只是为了好算，实际上写成其它的比如：66px、88px之类都行，写成别的基准值，可以用less帮我们计算
                    </div>
                    <div>③
                      less中先定个变量，fs=100，那么宽为500px的元素可以写成宽为500rem/fs，也就是500除以100，最后得到的，就是100px为基准值时，这个元素的rem尺寸
                    </div>
                    <div>③ rem布局中使用less，只是为了好计算元素的rem尺寸</div>
                    <div>④
                      这样把css写好后，还是不能随着窗口尺寸的变化实现元素尺寸的变化，因为没有写随着窗口尺寸变化修改rem基准值的js代码
                    </div>
                    <div>⑤ 这时候，可以引入flexible.js，它会把rem基准值改为当前窗口宽度的1/10</div>
                    <div>⑤ rem布局中使用flexible，只是为了不用自己写js去修改rem基准值</div>
                    <div>⑥
                      也就是说，在750px的窗口上，它会把rem基准值设置为75px，所以，我们拿到750px的设计图后，就以75px作为rem基准值
                    </div>
                    <div>缺点：兼容性不好，ie9以下不兼容</div>
                    <ImagePro src='/2.Css/rem.png' />
                    <div>还有一种方式修改html的font-size是通过媒体查询的方式</div>
                  </AlertPro>,
                ],
              },
            ]}
          />,
        ],
      },
      {
        label: '响应式',
        children: [
          <AlertPro>
            <div>网页有了自适应的特性后，可以适应不同尺寸的浏览器窗口，但这时候还有个问题，</div>
            <div>就是浏览器窗口过小时，虽然各元素都等比缩小了，但看起来会很拥挤，这时候就需要给网页加上响应式特性了</div>
            <div>响应式，就是为一个页面准备多套css，根据不同屏幕尺寸来选择使用哪套css</div>
            <div>这样，当浏览器屏幕过小时，直接切换为为小屏幕设计的css样式，让页面换一种排版效果</div>
          </AlertPro>,
          <AnchorCard title='媒体查询' subTitle='检测屏幕尺寸，执行满足条件的css'>
            <CodeView language='css'>
              {`
                @media screen and (min-width: 320px) {
                  /* 屏幕宽度>320px时执行里面的css */
                  html {
                    font-size: 20px;
                  }
                }

                @media screen and (min-width: 480px) {
                  /* 屏幕宽度>480px时执行里面的css */
                  html {
                    font-size: 30px;
                  }
                }

                @media screen and (min-width: 640px) {
                  /* 屏幕宽度>640px时执行里面的css */
                  html {
                    font-size: 40px;
                  }
                }
              `}
            </CodeView>
          </AnchorCard>,
        ],
      },
    ]}
  />
)
