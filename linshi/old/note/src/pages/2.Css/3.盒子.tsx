import { AlertPro, AnchorCard, ParamsTable, TabsPro } from '@/components'

export default () => (
  <TabsPro
    items={[
      {
        label: '基础',
        children: [
          <AnchorCard title='width'>
            <ParamsTable
              data={[
                { attr: 'auto', desc: '浏览器自动计算', example: 'width: auto', default: '默认' },
                { attr: 'length', desc: '使用 px、em 等单位定义宽度', example: 'width: 100px' },
                { attr: '%', desc: '父元素宽度的百分比', example: 'width: 50%' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='height'>
            <ParamsTable
              data={[
                { attr: 'auto', desc: '浏览器自动计算', example: 'height: auto', default: '默认' },
                { attr: 'length', desc: '使用 px、em 等单位定义高度', example: 'height: 100px' },
                { attr: '%', desc: '父元素高度的百分比', example: 'height: 50%' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='padding'>
            <ParamsTable
              data={[
                { attr: 'auto', desc: '浏览器自动计算', example: 'padding: auto' },
                { attr: 'length', desc: '使用 px、em 等单位定义内边距', example: 'padding: 100px' },
                { attr: '%', desc: '父元素宽度的百分比', example: 'padding: 50%' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='margin'>
            <ParamsTable
              data={[
                { attr: 'auto', desc: '浏览器自动计算', example: 'margin: auto' },
                { attr: 'length', desc: '使用 px、em 等单位定义外边距', example: 'margin: 100px' },
                { attr: '%', desc: '父元素宽度的百分比', example: 'margin: 50%' },
              ]}
            />
            <AlertPro message='margin相溶'>
              <div>margin相溶情况一：margin-bottom、margin-top，两盒子上下挨着，以它俩最大的为准</div>
              <div>margin相溶情况二：margin-top、margin-top，大盒子套小盒子，大盒子有边框就不会融合，没边框以它俩最大的为准</div>
              <div>margin可以为负值，负值将与前一个盒子位置重叠</div>
            </AlertPro>
          </AnchorCard>,
        ],
      },
      {
        label: '高级',
        children: [
          <AnchorCard title='display'>
            <ParamsTable
              data={[
                { attr: '元素名', desc: '独占一行', example: '设置宽高' },
                { attr: '块', desc: '√', example: '√' },
                { attr: '行内', desc: 'X', example: 'X' },
                { attr: '行内块', desc: 'X', example: '√' },
                { attr: '消失', desc: 'X', example: 'X' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='cursor' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'default', desc: '默认', example: 'cursor: default' },
                { attr: 'pointer', desc: '手型', example: 'cursor: pointer' },
                { attr: 'text', desc: '文本指针', example: 'cursor: text' },
                { attr: 'help', desc: '帮助', example: 'cursor: help' },
                { attr: 'wait', desc: '等待', example: 'cursor: wait' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='box-sizing'>
            <ParamsTable
              data={[
                {
                  attr: 'content-box',
                  desc: '这个模式下，从内容区计算宽度，width/height设置的是内容区的宽高',
                  example: 'box-sizing: content-box',
                  default: '默认',
                },
                {
                  attr: 'border-box',
                  desc: '这个模式下，从边框开始计算宽度，width/height设置的是内容区+内边距+边框的宽高',
                  example: 'box-sizing: border-box',
                },
                { attr: 'inherit', desc: '规定应从父元素继承 box-sizing 属性的值', example: 'box-sizing: border-box' },
              ]}
            />
          </AnchorCard>,
          <AlertPro message='盒子的宽高有两种模式'>
            <div>content-box，也就是内容模式，width设置的是内容区的宽度，这种情况下，</div>
            <div>设置border、padding会向外扩充，</div>
            <div>整个盒子所占的实际宽度为 border + padding + width</div>
            <br />
            <div>border-box，也就是边框模式：width设置的是盒子实际所占的宽度，这种情况下，</div>
            <div>设置border、padding会向内容区挤压</div>
            <div>内容区的宽度为 width - border - padding</div>
          </AlertPro>,
          <AnchorCard title='box-shadow'>
            <ParamsTable
              data={[
                { attr: 'none', desc: '没有盒子阴影', example: 'box-shadow: none', default: '默认' },
                {
                  attr: '水平 垂直 [模糊距离] [阴影尺寸] [颜色] [inset]',
                  desc: '阴影列表，逗号分隔',
                  example: 'box-shadow: 1px 2px 3px 4px red inset, 1px 2px 3px 4px red',
                },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='zoom'>
            <ParamsTable
              data={[
                { attr: 'normal', desc: '使用元素的实际尺寸', example: 'zoom: normal', default: '默认' },
                { attr: 'length', desc: '用浮点数来定义缩放比例', example: 'zoom: 0.5' },
                { attr: '%', desc: '用%来定义缩放比例', example: 'zoom: 125%' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='z-index'>
            <ParamsTable
              data={[
                { attr: 'auto', desc: '层级与父元素相等', example: 'z-index: auto', default: '默认' },
                { attr: 'length', desc: '指定元素的层级(数字越大层级越高)', example: 'z-index: 5' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='opacity'>
            <ParamsTable
              data={[
                { attr: 'length', desc: '0.0(完全透明) ~ 1.0(完全不透明)', example: 'opacity: 0.5' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='visibility'>
            <ParamsTable
              data={[
                { attr: 'visible', desc: '盒子是可见的', example: 'visibility: visible', default: '默认' },
                { attr: 'hidden', desc: '盒子是隐藏的', example: 'visibility: hidden' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='overflow'>
            <ParamsTable
              data={[
                {
                  attr: 'visible',
                  desc: '内容不会裁剪，会显示在元素框之外',
                  example: 'overflow: visible',
                  default: '默认',
                },
                { attr: 'hidden', desc: '元素框外的内容被裁剪', example: 'overflow: hidden' },
                {
                  attr: 'scroll',
                  desc: '元素框外的内容被裁剪，但可以滚动条的方式查看更多',
                  example: 'overflow: scroll',
                },
                { attr: 'auto', desc: '如果内容被裁剪，会以滚动条的方式查看更多', example: 'overflow: auto' },
              ]}
            />
          </AnchorCard>,
          <AlertPro message='处理盒子溢出内容'>
            <div>当一个盒子里内容过多，文字/图片可能超出盒子范围 (但不影响别的盒子的位置)</div>
            <div>这时候可以用overflow: hidden/visible/scroll来处理溢出的内容</div>
            <br />
            <div>除了处理盒子溢出内容，overflow还有清除浮动带来的影响，以及设置绝缘容器的作用，</div>
            <div>绝缘容器是指：使该盒子不受其它浮动元素的影响，也使盒子内部元素的浮动不影响盒子外部的元素</div>
          </AlertPro>,
        ],
      },
      {
        label: '背景',
        children: [
          <AnchorCard title='background'>
            <ParamsTable
              data={[
                {
                  attr: '颜色 路径 平铺 位置 滚动',
                  desc: '下面几种属性的连写',
                  example: '[red] url("1.jpg") [no-repet] [left]/[size] [scroll]',
                },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='background-color'>
            <ParamsTable
              data={[
                { attr: 'color_name', desc: '颜色名称', example: 'background-color: red' },
                { attr: '#ff00ff', desc: '十六进制颜色', example: 'background-color: #ff00ff' },
                { attr: 'rgb()', desc: 'rgb代码颜色', example: 'background-color: rgb(255,10,10)' },
                { attr: 'rgba()', desc: 'rgb代码颜色(透明度)', example: 'background-color: rgba(255,10,10, 0.5)' },
                { attr: 'transparent', desc: '透明色', example: 'background-color: transparent', default: '默认' },
              ]}
            />
          </AnchorCard>,
          <AlertPro>
            <div>同一个div可以同时显示背景图片和颜色，</div>
            <div>当图片不平铺，且图片宽高小于div宽高时，div超出图片的区域将显示背景颜色</div>
          </AlertPro>,
          <AnchorCard title='background-image'>
            <ParamsTable
              data={[
                { attr: 'none', desc: '无背景图片', example: 'background-image: none', default: '默认' },
                { attr: 'url("URL")', desc: '背景图的地址', example: 'background-image: url(" / bg.jpg")' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='background-repeat'>
            <ParamsTable
              data={[
                {
                  attr: 'repeat',
                  desc: '背景图将在垂直方向和水平方向重复',
                  example: 'background-repeat: repeat',
                  default: '默认',
                },
                { attr: 'repeat-x', desc: '背景图将在水平方向重复', example: 'background-repeat: repeat-x' },
                { attr: 'repeat-y', desc: '背景图将在垂直方向重复', example: 'background-repeat: repeat-y' },
                { attr: 'no-repeat', desc: '背景图不重复', example: 'background-repeat: no-repeat' },
                { attr: 'round', desc: '背景平铺，空隙部分拉伸填满', example: 'background-repeat: round' },
                { attr: 'space', desc: '背景平铺，空隙部分均分间隔', example: 'background-repeat: space' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='background-position'>
            <ParamsTable
              data={[
                { attr: '10px 30px', desc: '距左边20 顶边30', example: 'background-position: 10px 30px' },
                {
                  attr: 'left/center/right top/center/bottom',
                  desc: '指定背景图贴元素的哪条边',
                  example: 'background-position: left center',
                },
              ]}
            />
          </AnchorCard>,
          <AlertPro>
            <div>以元素左上角为原点，控制背景图相对于元素左上角的位置，显示的宽高由元素的宽高决定</div>
            <div>也可以用left / right / center / top / bottom指定背景图贴元素的哪条边</div>
            <br />
            <div>使用精灵图时，要显示的指定图标离别的图标过近的话，会在元素上显示出多余的部分背景，</div>
            <div>这时候可以用背景裁切，裁切掉元素内容区以外的背景</div>
          </AlertPro>,
          <AnchorCard title='background-attachment'>
            <ParamsTable
              data={[
                {
                  attr: 'scroll',
                  desc: '附着在元素上，页面滚动时，跟随元素滚动',
                  example: 'background-attachment: scroll',
                  default: '默认',
                },
                {
                  attr: 'fixed',
                  desc: '附着在视口上，位置固定不变，元素滚动消失时不再显示',
                  example: 'background-attachment: fixed',
                },
                {
                  attr: 'local',
                  desc: '附着在内容上，跟随内容滚动 (出现在元素有滚动条时)',
                  example: 'background-attachment: local',
                },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='background-origin'>
            <ParamsTable
              data={[
                { attr: 'content-box', desc: '背景显示在元素的content区', example: 'background-origin: content-box' },
                {
                  attr: 'padding-box',
                  desc: '背景显示在元素的padding区',
                  example: 'background-origin: padding-box',
                  default: '默认',
                },
                { attr: 'border-box', desc: '背景显示在元素的border区', example: 'background-origin: border-box' },
              ]}
            />
          </AnchorCard>,
          <AlertPro>
            <div>背景显示在盒子的哪个区域，默认情况，repeat显示在border下，no-repeat显示在padding下</div>
            <div>也可以用border-box、padding-box、content-box指定背景显示在哪个区域</div>
          </AlertPro>,
          <AnchorCard title='background-clip'>
            <ParamsTable
              data={[
                { attr: 'content-box', desc: '元素的content区外的背景裁切掉', example: 'background-clip: content-box' },
                { attr: 'padding-box', desc: '元素的padding区外的背景裁切掉', example: 'background-clip: padding-box' },
                {
                  attr: 'border-box',
                  desc: '元素的border区外的背景裁切掉',
                  example: 'background-clip: border-box',
                  default: '默认',
                },
                { attr: 'text', desc: '文字外的背景裁切掉', example: 'background-clip: text' },
              ]}
            />
          </AnchorCard>,
          <AlertPro>
            <div>只保留指定区域的背景，其它区域裁切掉</div>
            <div>text：文本以外的区域裁切，兼容需要用`-webkit-background-clip`属性</div>
          </AlertPro>,
          <AnchorCard title='background-size'>
            <ParamsTable
              data={[
                { attr: 'px px', desc: '宽 高', example: 'background-size: 30px 50px' },
                { attr: '% %', desc: '以父元素的百分比来设置宽高', example: 'background-size: 30% 50%' },
                { attr: 'auto', desc: '显示为图片大小', example: 'background-size: auto', default: '默认' },
                { attr: 'contain', desc: '按元素较短的边缩放', example: 'background-size: contain' },
                { attr: 'cover', desc: '按元素较长的边缩放(会填充满整个元素)', example: 'background-size: cover' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='background-image'>
            <ParamsTable
              data={[
                {
                  attr: 'linear-gradient',
                  desc: '线性渐变',
                  example: 'background-image: linear-gradient([角度],颜色1,颜色2,颜色n)',
                },
                {
                  attr: 'radial-gradient',
                  desc: '径向渐变',
                  example: 'background-image: radial-gradient([角度],颜色1,颜色2,颜色n)',
                },
              ]}
            />
          </AnchorCard>,
        ],
      },
      {
        label: '边框/轮廓',
        children: [
          <AnchorCard title='border'>
            <ParamsTable
              data={[
                { attr: 'border-width', desc: '边框的宽度', example: 'border-width: 2px' },
                { attr: 'border-style', desc: '边框的类型', example: 'border-style: solid/dashed/dotted' },
                { attr: 'border-color', desc: '边框的颜色', example: 'border-color: red' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='border-radius'>
            <ParamsTable
              data={[
                { attr: 'length', desc: '颜色名称', example: 'border-radius: 水平半径{1,4} [/ 垂直半径{1,4}]' },
                { attr: '%', desc: '十六进制颜色', example: 'border-radius: 50% 50% 50% 50%' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='border-image'>
            <ParamsTable
              data={[
                { attr: 'border-image', desc: '图片边框', example: 'url(图片地址) 10/10px round' },
                { attr: 'border-image-source', desc: '图片地址', example: 'url(图片地址)' },
                { attr: 'border-image-slice', desc: '切割尺寸', example: '1-4个数字 [fill]' },
                { attr: 'border-image-width', desc: '边框宽度', example: '如无设置遵循slice的值' },
                { attr: 'border-image-repeat', desc: '平铺方式', example: 'stretch/round/repect/space' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='outline'>
            <ParamsTable
              data={[
                { attr: 'outline', desc: '轮廓线', example: 'outline: solid red 1px' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='outline-offset'>
            <ParamsTable
              data={[
                { attr: 'length', desc: '轮廓线到border的距离', example: 'outline-offset: 2px' },
              ]}
            />
          </AnchorCard>,
          <AlertPro>
            <div>outline-offset 可以为负值，轮廓线会缩到盒子内</div>
          </AlertPro>,
        ],
      },
      {
        label: '多列',
        children: [
          <AlertPro>
            <div>多栏显示就是把一堆文字，设置用几个区域显示 (类似报纸文章的布局)</div>
            <div>① 设置栏数，自动根据栏数分配栏宽</div>
            <div>② 设置栏宽，实际宽度会根据父元素宽度自动调整，但不小于设置的宽度</div>
          </AlertPro>,
          <AnchorCard title='column-width'>
            <ParamsTable
              data={[
                { attr: 'auto', desc: '自动设置栏宽', example: 'column-width: auto', default: '默认' },
                { attr: 'px', desc: '指定栏宽', example: 'column-width: 100px' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='column-count'>
            <ParamsTable
              data={[
                { attr: 'auto', desc: '自动设置栏数', example: 'column-count: auto', default: '默认' },
                { attr: 'number', desc: '指定栏数', example: 'column-count: 3' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='column-gap'>
            <ParamsTable
              data={[
                { attr: 'normal', desc: '常规间隔，通常是1em', example: 'column-gap: normal', default: '默认' },
                { attr: 'px', desc: '指定栏间隔', example: 'column-gap: 10px' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='column-rule'>
            <ParamsTable
              data={[
                { attr: 'column-rule-width', desc: '间隔线的宽度', example: 'column-rule-width: 2px' },
                { attr: 'column-rule-style', desc: '间隔线的类型', example: 'column-rule-style: solid' },
                { attr: 'column-rule-color', desc: '间隔线的颜色', example: 'column-rule-color: red' },
              ]}
            />
          </AnchorCard>,
        ],
      },
    ]}
  />
)
