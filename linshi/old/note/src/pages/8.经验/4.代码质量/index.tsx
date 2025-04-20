import { AnchorCard, ParamsTable, TabsPro, AlertPro } from '@/components'

export default () => (
  <TabsPro
    items={[
      {
        label: '命名规范',
        children: [
          <AnchorCard title='代码规范'>
            <ParamsTable
              data={[
                { label: '命名', desc: '建议' },
                { label: '项目', desc: '全小写，以下划线分隔' },
                { label: '目录', desc: '全小写，以下划线分隔(内部文件为复数时，后面加s)' },
                { label: '变量', desc: '小驼峰命名法，建议前缀是名词，尽量在变量名字中体现所属类型' },
                { label: '事件函数', desc: '小驼峰命名法，前缀是动词，后缀是ev' },
                { label: '业务函数', desc: '小驼峰命名法，后缀是Fn' },
                { label: '类名/构造函数名', desc: '大驼峰命名法' },
                { label: '常量', desc: '全大写，以下划线分隔' },
                { label: '字面量', desc: 'setTimeout( blastOff, 86400000)，三个月后你还能知道 86400000 是什么吗' },
                { label: 'jQuery节点', desc: '以$开头，这样可以很方便地将它与普通变量区别开来' },
                { label: '私有属性', desc: '对象的私有方法前面可以加_以示区分' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='常用单词'>
            <TabsPro
              items={[
                {
                  label: 'base',
                  children: [
                    <ParamsTable
                      data={[
                        { label: 'has', desc: '判断是否含有某个值' },
                        { label: 'is', desc: '判断是否为某个值' },
                        { label: 'get', desc: '获取某个值' },
                        { label: 'set', desc: '设置某个值' },
                        { label: 'load', desc: '加载某些数据' },
                        { label: 'begin/end', desc: '开始/结束' },
                        { label: 'first/last', desc: '第一/最后' },
                        { label: 'locked/unlocked', desc: '已锁定/未锁定' },
                        { label: 'min/max', desc: '最小/最大' },
                        { label: 'next/previous', desc: '下一个/上一个' },
                        { label: 'old/new', desc: '老/新' },
                        { label: 'opened/closed', desc: '开的/关的' },
                        { label: 'visible/invisible', desc: '可见的/不可见的' },
                        { label: 'source/target', desc: '来源/目标' },
                        { label: 'up/down', desc: '上/下' },
                      ]}
                    />,
                  ],
                },
                {
                  label: 'layout',
                  children: [
                    <ParamsTable
                      data={[
                        { label: '导航', desc: 'nav' },
                        { label: '主导航', desc: 'mainbav' },
                        { label: '子导航', desc: 'subnav' },
                        { label: '顶导航', desc: 'topnav' },
                        { label: '边导航', desc: 'sidebar' },
                        { label: '左导航', desc: 'leftsidebar' },
                        { label: '右导航', desc: 'rightsidebar' },
                        { label: '菜单', desc: 'menu' },
                        { label: '子菜单', desc: 'submenu' },
                        { label: '标题', desc: 'title' },
                        { label: '摘要', desc: 'summary' },
                        { label: '页头', desc: 'header' },
                        { label: '内容', desc: 'content/container' },
                        { label: '页面往体', desc: 'main' },
                        { label: '页尾', desc: 'footer' },
                        { label: '导航', desc: 'nav' },
                        { label: '侧栏', desc: 'sidebar' },
                        { label: '栏目', desc: 'column' },
                        { label: '页面的外围控制整体布局宽度', desc: 'wrapper' },
                        { label: '左右中', desc: 'left right center' },
                      ]}
                    />,
                  ],
                },
                {
                  label: 'element',
                  children: [
                    <ParamsTable
                      data={[
                        { label: '标题', desc: 'title' },
                        { label: '摘要', desc: 'summary' },
                        { label: '箭头', desc: 'arrow' },
                        { label: '商标', desc: 'label' },
                        { label: '网站标志', desc: 'logo' },
                        { label: '转角/圆角', desc: 'corner' },
                        { label: '横幅广告', desc: 'banner' },
                        { label: '子菜单', desc: 'subMenu' },
                        { label: '搜索', desc: 'search' },
                        { label: '搜索框', desc: 'searchBox' },
                        { label: '登录', desc: 'login' },
                        { label: '登录条', desc: 'loginbar' },
                        { label: '工具条', desc: 'toolbar' },
                        { label: '下拉', desc: 'drop' },
                        { label: '标签页', desc: 'tab' },
                        { label: '当前的', desc: 'current' },
                        { label: '列表', desc: 'list' },
                        { label: '滚动', desc: 'scroll' },
                        { label: '服务', desc: 'service' },
                        { label: '提示信息', desc: 'msg' },
                        { label: '热点', desc: 'hot' },
                        { label: '新闻', desc: 'news' },
                        { label: '小技巧', desc: 'tips' },
                        { label: '下载', desc: 'download' },
                        { label: '栏目标题', desc: 'title' },
                        { label: '加入', desc: 'joinus' },
                        { label: '注册', desc: 'regsiter' },
                        { label: '指南', desc: 'guide' },
                        { label: '友情链接', desc: 'friendlink' },
                        { label: '状态', desc: 'status' },
                        { label: '版权', desc: 'copyright' },
                        { label: '按钮', desc: 'btn' },
                        { label: '合作伙伴', desc: 'partner' },
                        { label: '投票', desc: 'vote' },
                        { label: '左右中', desc: 'left right center' },
                        { label: '单词', desc: '作用' },
                        { label: '标志', desc: '1ogo' },
                        { label: '广告', desc: 'banner' },
                        { label: '登陆', desc: 'login' },
                        { label: '登录条', desc: 'loginbar' },
                        { label: '注册', desc: 'regsiter' },
                        { label: '搜索', desc: 'search' },
                        { label: '功能区', desc: 'shop' },
                        { label: '标题', desc: 'title' },
                        { label: '加入', desc: 'joinus' },
                        { label: '状态', desc: 'status' },
                        { label: '按钮', desc: 'btn' },
                        { label: '滚动', desc: 'scroll' },
                        { label: '标签页', desc: 'tab' },
                        { label: '文章列婊', desc: 'ist' },
                        { label: '提示信息', desc: 'msg' },
                        { label: '当前的', desc: 'current' },
                        { label: '小技巧', desc: 'tips' },
                        { label: '图标', desc: 'icon' },
                        { label: '注释', desc: 'note' },
                        { label: '指南', desc: 'guild' },
                        { label: '服务', desc: 'service' },
                        { label: '热点', desc: 'hot' },
                        { label: '新闻', desc: 'news' },
                        { label: '下载', desc: 'download' },
                        { label: '投票', desc: 'vote' },
                        { label: '合作伙伴', desc: 'partner' },
                        { label: '版权', desc: 'copyright' },
                      ]}
                    />,
                  ],
                },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='需要注意'>
            <AlertPro>
              <div>变量名要完全、准确地描述该变量代表的事物</div>
              <div>例如：不要用date来代表当前日期，而要用currentDate，可缩写成curDate</div>
              <div>好的命名：过一段时间后，还能见名知意、知类型</div>
              <div>不要一专多能：不要用同一个变量承担两个功能</div>
              <div>坚持英文命名!!!</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='书写顺序'></AnchorCard>,
        ],
      },
      {
        label: '注释规范',
        children: [
          <AlertPro>
            <div>{'// 用来显示一个解释的评论'}</div>
            <div>{'// -> 用来显示表达式的结果'}</div>
            <div>{'// > 用来显示 console 的输出结果'}</div>
          </AlertPro>,
        ],
      },
      {
        label: 'commit 规范',
        children: [
          <span>commit规范</span>,
        ],
      },
      {
        label: '代码风格',
        children: [
          <span>代码风格</span>,
        ],
      },
      {
        label: 'CodeReview',
        children: [
          <AlertPro>
            <div>少使用字符串/数字之类的字面量，改为使用Enum之类的常量</div>
            <div>函数可以不给默认值，使用onChange?.()这样调用</div>
            <div>除非必须，否则不使用any，尽量给出类型定义</div>
            <div>除了声明不会使用的函数参数，不要使用_开头的变量</div>
            <div>{'localStorage命名格式 {模块}.{页面}.{变量}'}</div>
            <div>不要循环引用，比如index引入config，config又引入index的某个interface</div>
            <div>注意模块划分，[这个校验功能是校验FG的，在模块划分上和fg-form-editor更有关联]</div>
            <div>优化看起来混乱的逻辑</div>
            <div>类型声明全部使用驼峰形式</div>
            <div>type.ts主要是声明ts类型或者enum，不能写变量，变量写到utils/const.ts下面吧</div>
            <div>{'<div /> div 不是一个自闭合标签，在 react 里面可以这么写，但 html 里不能这么写'}</div>
            <div>ev.target?.value可能是undefined。改成 ev.target?.value || ''</div>
            <div>enum 需要显式声明值</div>
            <div>详情页应该是列表页的子级</div>
            <div>封装条件语句，将条件判断的逻辑封装成一个独立函数，这种写法比较可读，我们从函数名就能知道做了一个什么判断</div>
            <div>a 标签target=‘_blank’时，需要加 rel="noopener noreferrer"，否则被打开的页面可以通过 window.opener 拿到本页面的
              window
            </div>
            <div>Table 或 Desction 没有内容时建议使用 - 显示</div>
            <div>{'arr?.length && <div><div> 判断数组有值才显示的代码，一定要写成 Boolean(arr?.length)， 不然arr.length=0的话，0会显示在页面上！！！'}</div>
            <div>如果要对后端的数据有修改，最好在获取数据源处做处理</div>
            <div>注意文件的拆分。例如：config内容过多时，单独抽为文件</div>
            <div>{'组件属性如果是true，可以忽略 ={true}'}</div>
            <div>[SideType.CLIENT, SideType.SEREVR].includes(json.type)</div>
            <div>禁用、删除之类的按钮，用danger显示</div>
            <div>注意防止用户的快速重复点击</div>
          </AlertPro>,
        ],
      },
    ]}
  />
)
