import { ParamsTable, CodeView, AnchorCard, AlertPro } from '@/components'

export default () => [
  <AnchorCard title='body元素'>
    <AlertPro message='body元素不需要获取，可以直接使用 document.body' />
  </AnchorCard>,
  <AnchorCard title='取消默认事件' subTitle=''>
    <CodeView language='html'>
      {`<a href='https://www.baidu.com' onclick='fn(); return false'></a>`}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='input.file元素的属性'>
    <CodeView language='html'>
      {`
        <input type='file'>
        <script>
          // 获取文件数据数组
          document.querySelecter("input[type='file']").files;
        </script>
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='全屏操作'>
    <AlertPro>
      <div>① 注意：该方法有兼容性问题，不同的内核，方法前需要加`webkit`/`moz`/`o`/`ms`</div>
      <div>② 注意：取消全屏和判断是否有全屏元素，都是document的方法</div>
      <div>③ 注意：全屏就相当于将指定元素弹窗并铺满屏幕，这时会把别的元素挡住且无法操作，且不支持键盘事件</div>
    </AlertPro>
    <ParamsTable
      data={[
        { label: 'node.requestFullScreen() / webkitRequestFullScreen()', desc: '全屏显示' },
        { label: 'document.cancelFullScreen() / webkitCancelFullScreen()', desc: '取消全屏' },
        { label: 'document.isFullScreen / document.webkitIsFullScreen', desc: '判断是否处于全屏' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='video元素的属性/方法'>
    <ParamsTable
      data={[
        { label: 'video.currentTime', desc: '设置或返回当前播放位置的时间' },
        { label: 'video.duration', desc: '当前视频的总时间' },
        { label: 'video.volume', desc: '设置或返回当前音量' },
        { label: 'video.show()', desc: '显示视频' },
        { label: 'video.play()', desc: '播放视频' },
        { label: 'video.pause()', desc: '暂停视频' },
        { label: 'video.load()', desc: '重新加载视频' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='拖拽事件'>
    <AlertPro>
      <div>注意：拖拽事件时浏览器默认不允许拖拽元素放下，</div>
      <div>所以需要在目标元素的`ondragenter、ondragover、ondrop`这三个事件中，</div>
      <div>写阻止浏览器默认事件的代码`e.preventDefault()`</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='轻触事件'>
    <AlertPro>
      <div>为了检测是否为双击操作，延长了click的响应时间300ms，这样用户体验不好，所以需要自己封装轻触事件。</div>
      <div>轻触事件是用touch事件封装的，从touchstart到touchend时间不超过150ms，且没有过touchmove，即为轻触</div>
    </AlertPro>
    <CodeView language='javascript'>
      {`
        var startTime = 0 // 开始时间
        var isMove = false // 标记是否移动过

        dom.addEventListener('touchstart', function() {
          startTime = Date.now() // 记录开始时间
        })

        dom.addEventListener('touchmove', function() {
          isMove = true // 标记为移动过
        })

        dom.addEventListener('touchend', function(e) {
          // 判断结束时间-开始时间是否小于150ms且没有移动过
          if ((Date.now() - startTime) < 150 && !isMove) {
            callback && callback.call(this, e)
          }

          // 重置为初始化
          startTime = 0
          isMove = false
        })
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='滑动事件'>
    <AlertPro>
      <div>滑动事件是用touch事件封装的，必须有过touchmove，且从touchstart到touchend的移动距离超过50px，即为滑动过</div>
    </AlertPro>
    <CodeView language='javascript'>
      {`
        function bindSwipeEvent(dom, leftCallback, rightCallback) {
          var isMove = false
          var startX = 0
          var distanceX = 0

          dom.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX
          })

          dom.addEventListener('touchmove', function(e) {
            isMove = true
            var moveX = e.touches[0].clientX
            distanceX = moveX - startX
          })

          dom.addEventListener('touchend', function(e) {
            if (isMove && Math.abs(distanceX) > 50) {
              if (distanceX > 0) {
                rightCallback && rightCallback.call(this, e)
              } else {
                leftCallback && leftCallback.call(this, e)
              }
            }

            isMove = false
            startX = 0
            distanceX = 0
          })
        }

        bindSwipeEvent(document.querySelector('.box'), function(e) {
          console.log('左滑手势')
        }, function(e) {
          console.log('右滑手势')
        })
      `}
    </CodeView>
  </AnchorCard>,
]
