import { AlertPro, CodeView, TabsPro } from '@/components'

export default () => (
  <TabsPro
    items={[
      {
        label: '2D变换',
        children: [
          <AlertPro>
            <div>2D变换是将元素作为一个二维平面，然后进行：移动，旋转，缩放，斜拉变形。</div>
            <div>进行了2D变换的元素，虽然形状或位置可能都变了，但不影响其他元素的布局位置。</div>
            <div>注意：对一个元素可以同时进行多项变换，进行多项变换时，多个属性值要写在一个transform属性下，</div>
            <div>用空格隔开，类似这样：`transform: translate(x,y) rotate(xdeg);`</div>
          </AlertPro>,
          <CodeView language='css'>
            {`
              div {
                /* 指定变换的原点，默认是中心点 */
                transform-origin: 水平坐标 垂直坐标;

                /* 将div水平移动x像素，垂直移动y像素 */
                transform: translate(xpx, ypx);

                /* 将div旋转x个角度 */
                transform: rotate(xdeg);

                /* 将div水平方向缩放x倍，垂直方向缩放y倍 */
                transform: scale(x, y);

                /* 将div水平方向拉伸x个角度，垂直方向拉伸y个角度 */
                transform: skew(xdeg,ydeg);
              }
            `}
          </CodeView>,
        ],
      },
      {
        label: '3D变换',
        children: [
          <AlertPro>
            <div>3D变换是在2D变换的基础上，再加上一个Z轴 (屏幕垂直的方向)，构成三维空间</div>
            <div>对着某轴的正方向看，顺时针旋转为正角度，逆时针旋转为负角度</div>
          </AlertPro>,
          <CodeView language='css'>
            {`
              div {
                  /* 真实3D - 设置元素变换的方式，不设置默认是2D，该属性要设置在变换元素的父元素上 */
                  transform-style: preserve-3d;

                  /* 辅助观察3D - 设置距离变换元素的远近，不设置默认是无穷大，有以下两种方式 */
                  /* 设置在变换元素的上级且静止的元素上(选其一) */
                  1. perspective: 800px;
                  /* 设置在元素自身上(选其一) */
                  2. transform: perspective(800px);

                  /* 设置观察变换元素时眼睛直对屏幕的哪个点，默认是父元素中心，设置在变换元素的上级元素上 */
                  perspective-origin: center center;

                  /* 设置变换的原点，默认是中心点 */
                  transform-origin: center center;

                  /* 移动元素 */
                  transform: translate3d(x, y, z);
                  /* 旋转元素，xyz是相对大小 */
                  transform: rotate3d(x, y, z, deg);
                  /* 缩放元素 */
                  transform: translate3d(x, y, z);
              }
            `}
          </CodeView>,
        ],
      },
      {
        label: '过渡效果',
        children: [
          <AlertPro>
            <div>过渡能让元素的属性值发生改变时，不是立即实现，而是逐步变化完成</div>
            <div>设置多个属性的过渡变化可以把属性名用逗号隔开，设置所有的属性过渡可以用all</div>
            <div>特点：只能指定起始状态和结束状态，不能循环，不能自行触发,需要hover或js等动作</div>
            <div>使用：先给元素设置一个起始属性和过渡属性，再在hover或js里设置它的最终属性，这样元素就会开始过渡变化</div>
          </AlertPro>,
          <CodeView language='css'>
            {`
              /* 组合写法 */
              div {
                  transition: 属性名 过渡时长 过渡方式 过渡前的延迟时间;
              }

              /* 分开写法 */
              div {
                transition-property: all; // all代表所有属性都过渡，也可以单独指定属性
                transition-duration: 2s; // 过渡时长
                transition-timing-function: ease; // 速度方式
                transition-delay: 1s; // 过渡延迟
              }

              /* 速度方式有6种 */
              ease // 平滑过渡
              linear // 线性过渡
              ease-in // 由慢到快
              ease-out // 由快到慢
              ease-in-out // 由慢到快再到慢
              steps(4) // 步进(指定时间内分4步执行完)
            `}
          </CodeView>,
        ],
      },
      {
        label: '动画效果',
        children: [
          <AlertPro>
            <div>使用：动画的使用有点像函数，先定义一个效果，然后哪个元素用 animation 属性调用，动画效果就会作用在它上</div>
            <div>特点：效果可以是阶段性的，0%-100%，可以循环、暂停和继续播放，可以自动触发</div>
          </AlertPro>,
          <CodeView language='css'>
            {`
              /* 动画的定义 */
              @keyframes 动画名称 {
                0% {...}
                50% {...}
                100% {...}
              }

              /* 元素调用动画 */
              div {
                  /* 分开写法 */
                  animation-name: 动画名称;
                  animation-duration: 动画持续时间;
                  animation-timing-function:linear/ease/ease-in/ease-out/steps(); // 播放方式
                  animation-delay: 0s; // 动画播放前的延迟时间
                  animation-iteration-count: 10/infinite(无限); // 动画循环播放次数
                  animation-direction: normal/alternate(正播放后逆播放); // (逆播放也算播放次数)
                  animation-fill-mode: forwards / backwards; // 保持结束状态/回到起始状态

                  /* 组合写法 */
                  animation: ; // 依次写上面的属性值
              }

              /* 悬停其上时修改播放状态 */
              div:hover {
                  /* 动画播放状态：播放 */
                  animation-play-state: running;
                  /* 动画播放状态：停止 */
                  animation-play-state: paused;
              }
            `}
          </CodeView>,
        ],
      },
    ]}
  />
)
