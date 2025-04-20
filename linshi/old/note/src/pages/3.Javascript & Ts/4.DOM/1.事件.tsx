import { ParamsTable, AnchorCard, AlertPro } from '@/components'

export default () => [
  <AnchorCard title='什么是事件'>
    <AlertPro>
      <div>每个节点对象都有一些事件属性，默认为 null，我们可以给某个节点的某个事件属性赋值一个函数，</div>
      <div>这样，浏览器监听到该节点的该事件时，就会执行该函数</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='事件处理两步骤'>
    <AlertPro message='事件对象'>
      <div>浏览器监听到事件发生后，会将事件发生时有关事件的所有信息封装成一个事件对象，</div>
      <div>然后在事件传播过程中，将该对象作为参数传入需要执行的事件函数中</div>
    </AlertPro>
    <AlertPro message='事件传播'>
      <div>①
        事件传播会从 window 对象开始，经过触发事件的元素的各上级节点，并执行这些上级节点上被绑定为捕获阶段执行的同类型事件函数
      </div>
      <div>② 直到触发事件的元素，执行触发的事件函数</div>
      <div>③ 再经过该元素的各上级节点，并执行这些上级节点上被绑定为冒泡阶段执行的同类型事件函数，最后回到 window 对象
      </div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='事件三要素'>
    <AlertPro>
      <div>1. 事件源 (引发后续事件的元素)</div>
      <div>2. 事件类型</div>
      <div>3. 事件处理程序</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='事件类型'>
    <ParamsTable
      data={[
        { label: '**鼠标事件**', desc: '' },
        { label: 'onclick', desc: '鼠标点击' },
        { label: 'oncontextmenu', desc: '鼠标右击' },
        { label: 'ondbclick', desc: '鼠标双击' },
        { label: 'onmouseover', desc: '鼠标移入' },
        { label: 'onmouseout', desc: '鼠标移出' },
        { label: 'onmousemove', desc: '鼠标移动' },
        {},
        { label: '**键盘事件**', desc: '' },
        { label: 'onkeydown', desc: '按下键盘按键' },
        { label: 'onkeyup', desc: '抬起键盘按键' },
        { label: 'onkeypress', desc: '按下并抬起键盘按键' },
        {},
        { label: '**拖拽事件**', desc: '' },
        { label: 'ondragstart', desc: '拖拽开始时' },
        { label: 'ondrag', desc: '元素被拖拽中' },
        { label: 'ondragleave', desc: '鼠标离开拖拽元素时' },
        { label: 'ondragend', desc: '拖拽结束时' },
        { label: '**被拖拽事件**', desc: '' },
        { label: 'ondragenter', desc: '进入目标元素时' },
        { label: 'ondragover', desc: '停留在目标元素时' },
        { label: 'ondragleave', desc: '离开目标元素时' },
        { label: 'ondrop', desc: '在目标元素松开鼠标时' },
        {},
        { label: '**触摸事件(移动端)**', desc: '' },
        { label: 'ontouchstart', desc: '手指触碰屏幕时' },
        { label: 'ontouchmove', desc: '手指在屏幕上滑动时' },
        { label: 'ontouchcancel', desc: '系统终止触摸时' },
        { label: 'ontouchend', desc: '手指离开屏幕时' },
        {},
        { label: '**其它事件**', desc: '' },
        { label: 'ontransitionend', desc: '过渡效果完成时' },
        { label: 'onresize', desc: '元素尺寸改变时' },
        {},
        { label: '**window事件**', desc: '' },
        { label: 'onload', desc: '网页加载完毕' },
        { label: 'onunload', desc: '关闭网页' },
        { label: 'DOMContentLoaded', desc: 'dom加载完成时' },
        { label: 'onpopstate', desc: '地址栏前进后退时' },
        {},
        { label: '**form事件**', desc: '' },
        { label: 'onsubmit', desc: '表单提交时' },
        { label: 'onreset', desc: '表单重置时' },
        {},
        { label: '**input / select事件**', desc: '' },
        { label: 'onfocus', desc: '获得焦点' },
        { label: 'onblur', desc: '失去焦点' },
        { label: 'oncopy', desc: 'input内容被复制' },
        { label: 'onselect', desc: 'input内容被选中' },
        { label: 'oninput', desc: 'input内容被改变' },
        { label: 'onchange', desc: '内容或下拉选项被改变且失去焦点时' },
        {},
        { label: '**video事件**', desc: '' },
        { label: 'oncanplay', desc: '可以播放视频时' },
        { label: 'ontimeupdate', desc: '当视频播放位置改变时' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='事件对象'>
    <ParamsTable
      data={[
        { label: 'e.target', desc: '触发事件的目标节点' },
        { label: 'e.currentTarget', desc: '当前正在处理事件的节点' },
        {
          label: 'e.preventDefault()',
          desc: '阻止浏览器默认行为，比如点击链接后防止跳转到指定页面',
        },
        { label: 'e.stopPropagation()', desc: '停止事件传播' },
        { label: 'e.bubbles', desc: '返回布尔值，表示当前事件是否会冒泡' },
        { label: 'e.eventPhase', desc: '返回整数值，表示事件在什么传播阶段' },
        { label: 'e.type', desc: '返回事件类型的字符串表示' },
        { label: 'e.timeStamp', desc: '返回事件发生时距离上次刷新的毫秒时间戳' },
        { label: 'e.clientX、e.clientY', desc: '鼠标事件中，获取鼠标触发点的坐标' },
        { label: 'e.keyCode', desc: '键盘事件中，获取触发事件的键盘码' },
        { label: 'changedTouches', desc: '触摸事件中，发生改变的触摸点集合' },
        { label: 'targetTouches', desc: '触摸事件中，当前元素的触摸点集合' },
        { label: 'touches', desc: '触摸事件中，所有元素的触摸点集合' },
        { label: 'clientX', desc: '触摸点的浏览器窗口水平坐标' },
        { label: 'pageX', desc: '触摸点的页面水平坐标' },
        { label: 'screenX', desc: '触摸点的屏幕水平坐标' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='事件代理'>
    <AlertPro>
      <div>由于事件传播机制，子元素的事件必定会经过其父元素，</div>
      <div>我们可以将多个子元素的同类型事件绑定在其父元素上，</div>
      <div>然后用事件对象的 target 属性获取具体是哪个子元素产生了事件，然后执行相应的操作</div>
      <div>它的好处是：</div>
      <ul>
        <li>减少冗余代码量，提高了代码的可维护性</li>
        <li>动态添加或删除子元素时，无需重新绑定事件监听器。</li>
        <li>提高性能，尤其在大型文档中，只需为父元素绑定一个事件监听器。</li>
      </ul>
    </AlertPro>
  </AnchorCard>,
]
