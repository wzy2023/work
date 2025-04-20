import { AlertPro, AnchorCard, ParamsTable, TabsPro, CodeView } from '@/components'

export default () => [
  <AnchorCard title='介绍'>
    <AlertPro>
      <div>小程序框架的逻辑层并非运行在浏览器中，因此 JavaScript 在 web 中一些能力都无法使用，如 window，document 等</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='app.js'>
    <AlertPro>
      <div>1. App() 函数注册小程序</div>
      <div>2. 参数是一个对象，可以有四个默认方法，也可以写全局自定义方法或属性</div>
    </AlertPro>
    <CodeView language='javascript'>
      {`
        App({
          onLaunch(){}, //小程序启动时执行
          onShow(){},   //小程序显示时执行
          onHide(){},   //小程序后台时执行
          onError(){},  //小程序出错时执行
          自定义方法(){}, //自定义全局方法
          自定义属性: value        //自定义全局属性
        })
      `}
    </CodeView>
  </AnchorCard>,

  <AnchorCard title='app.wxss'>
    <AlertPro>
      <div>全局样式表</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='app.json'>
    <AlertPro>
      <div>1. 对微信小程序进行全局配置</div>
      <div>2. 决定页面文件的路径、窗口表现、设置网络超时时间、 tab 等</div>
    </AlertPro>
    <TabsPro
      items={[
        {
          label: '配置',
          children: [
            <ParamsTable
              data={[
                { label: 'pages', attr: 'String Array', required: '是', desc: '设置页面路径' },
                { label: 'window', attr: 'Object', required: '否', desc: '设置小程序的状态栏、导航条等' },
                { label: 'tabBar', attr: 'Object', required: '否', desc: '设置底部 tab 的表现' },
                { label: 'networkTimeout', attr: 'Object', required: '否', desc: '设置网络超时时间' },
                { label: 'debug', attr: 'Boolean', required: '否', desc: '设置是否开启 debug 模式' },
                { label: 'usingComponents', attr: 'Object', required: '否', desc: '全局自定义组件配置' },
              ]}
            />,
          ],
        },
        {
          label: '示例',
          children: [
            <CodeView language='javascript'>
              {`
        {
          "pages": [
            "pages/index/index",
            "pages/logs/logs"
          ],
          "window": {
            "navigationBarBackgroundColor": "导航栏背景颜色",
            "navigationBarTextStyle": "导航栏标题颜色，仅支持 black/white",
            "navigationBarTitleText": "导航栏标题内容",
            "backgroundColor": "窗口的背景色",
            "backgroundTextStyle": "下拉背景字体，仅支持 dark/light",
            "enablePullDownRefresh": "是否开启下拉刷新",
            "onReachBottomDistance": "页面上拉触底触发时距底部距离，单位为px"
          },
          "tabBar": {
            "color": "tab上的文字默认颜色",
            "selectedColor": "tab上的文字选中时的颜色",
            "backgroundColor": "tab的背景色",
            "borderStyle": "tab上边框的颜色， 仅支持 black/white",
            "position": "tab栏的位置，可选值 bottom、top",
            "list": [
              {
                "pagePath": "页面路径，必须在 pages 中先定义",
                "text": "tab 上按钮文字",
                "iconPath": "icon路径，大小限制为40kb，建议尺寸为81px",
                "selectedIconPath": "选中时的icon路径"
              },
              {
                "pagePath": "页面路径，必须在 pages 中先定义",
                "text": "tab 上按钮文字",
                "iconPath": "icon路径，大小限制为40kb，建议尺寸为81px",
                "selectedIconPath": "选中时的icon路径"
              }
            ]
          },
          "networkTimeout": {
            "request": 1000,
            "connectSocket": 1000,
            "uploadFile": 1000,
            "downloadFile": 1000
          },
          "debug": "flase"
        }
      `}
            </CodeView>,
          ],
        },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='page.json'>
    <AlertPro>
      <div>每一个小程序页面也可以使用.json文件来对本页面的窗口表现进行配置</div>
      <div>页面的配置只能设置 app.json 中部分 window 配置项的内容，页面的.json只能设置 window 相关的配置项</div>
      <div>以决定本页面的窗口表现，所以无需写 window 这个键</div>
      <br />
      <div>增加 App 和 Page 方法，进行程序和页面的注册</div>
      <div>页面的.json只能设置 window 相关的配置项，以决定本页面的窗口表现，所以无需写 window 这个键</div>
    </AlertPro>
  </AnchorCard>,

  <AnchorCard title='经验技巧'>
    <AlertPro message='小程序里显示多个空格'>
      <div>{'<text space="emsp">你好 啊</String>'}</div>
    </AlertPro>
    <AlertPro message='小程序wxss设置变量'>
      <div>{'page { --color: red; }'}</div>
      <div>{'view { color: var(--color); }'}</div>
    </AlertPro>
    <AlertPro message='页面布局采用flex占满屏幕'>
      <div>而不是浏览器页面自动滚动</div>
    </AlertPro>
    <AlertPro message='多页面都用到的一些逻辑'>
      <div>可以用 behaviors</div>
    </AlertPro>
  </AnchorCard>,
]
