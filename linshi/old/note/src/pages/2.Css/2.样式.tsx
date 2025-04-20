import { AlertPro, AnchorCard, ParamsTable, TabsPro } from '@/components'

export default () => (
  <TabsPro
    items={[
      {
        label: '字体',
        children: [
          <AnchorCard title='font' tags={['可继承']}>
            <ParamsTable
              data={[
                {
                  attr: '样式 粗细 尺寸/行高 系列',
                  desc: '下面几种属性的连写',
                  example: 'font: italic bold 12px/20px "微软雅黑"}',
                },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='font-style' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'normal', desc: '正常的', example: 'font-style: normal', default: '默认' },
                { attr: 'italic', desc: '倾斜的', example: 'font-style: italic' },
                { attr: 'oblique', desc: '倾斜的(让没有斜体字体的字体倾斜)', example: 'font-style: oblique' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='font-weight' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'normal', desc: '正常的 (相当于400)', example: 'font-weight: normal', default: '默认' },
                { attr: '100 - 900', desc: '最细 - 最粗', example: 'font-weight: 500' },
                { attr: 'lighter', desc: '更细的 (相当于100)', example: 'font-weight: lighter' },
                { attr: 'bold', desc: '加粗的 (相当于700)', example: 'font-weight: bold' },
                { attr: 'bolder', desc: '最粗的 (相当于900)', example: 'font-weight: bolder' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='font-size' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'medium', desc: '正常', example: 'font-size: medium', default: '默认' },
                { attr: 'px', desc: '字体大小为16px', example: 'font-size: 16px' },
                { attr: 'em', desc: 'em(父元素字号*em=字号)', example: 'font-size: 2em' },
                { attr: '%', desc: '针对父元素字体大小', example: 'font-size: 50%' },
                { attr: 'smaller', desc: '针对父元素字体相对减小', example: 'font-size: smaller' },
                { attr: 'larger', desc: '针对父元素字体相对增大', example: 'font-size: larger' },
                { attr: 'xx-small', desc: '最小', example: 'font-size: xx-small' },
                { attr: 'x-small', desc: '较小', example: 'font-size: x-small' },
                { attr: 'small', desc: '小', example: 'font-size: small' },
                { attr: 'large', desc: '大', example: 'font-size: large' },
                { attr: 'x-large', desc: '较大', example: 'font-size: x-large' },
                { attr: 'xx-large', desc: '最大', example: 'font-size: xx-large' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='font-family' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'inherit', desc: '字体名称优先表', example: 'font-family: "微软雅黑" sans-serif' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='@font-face{ }' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: '', desc: '引入外部字体', example: 'font-family: 字体名称;<br>src: url(字体路径);' },
              ]}
            />
          </AnchorCard>,
        ],
      },
      {
        label: '文本',
        children: [
          <AnchorCard title='color' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'color_name', desc: '颜色名称', example: 'color: red' },
                { attr: '#ff00ff', desc: '十六进制颜色', example: 'color: #ff00ff' },
                { attr: 'rgb()', desc: 'rgb代码颜色', example: 'color: rgb(255, 10, 10)' },
                { attr: 'rgba()', desc: 'rgb代码颜色(透明度)', example: 'color: rgba(255, 10, 10, 0.5)' },
                { attr: 'transparent', desc: '透明色', example: 'color: transparent' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='line-height' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'normal', desc: '正常的', example: 'line-height: normal', default: '默认' },
                { attr: 'number', desc: '设置数字(当前元素字号*number=行高)', example: 'line-height: 2' },
                { attr: '%', desc: '百分比(当前元素字号*%=行高)', example: 'line-height: 150%' },
                { attr: 'em', desc: 'em(当前元素字号*em=行高)', example: 'line-height: 2em' },
                { attr: '16px', desc: '固定的', example: 'line-height: 16px' },
              ]}
            />
          </AnchorCard>,
          <AlertPro message='font-size、line-height'>
            <div>会把盒子的默认高度撑开</div>
            <div>所有元素都有默认的字号和行高，都可以设置字体属性，设置字体属性后对它内部的文字产生效果，</div>
            <div>字体属性的字号和行高会把包裹它们的元素的默认高度撑开</div>
          </AlertPro>,
          <AnchorCard title='letter-spacing' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'normal', desc: '字符间没有额外的空间', example: 'letter-spacing: normal' },
                { attr: 'length', desc: '字符间的固定空间 (允许使用负值)', example: 'letter-spacing: 1px' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='word-spacing' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'normal', desc: '单词间没有额外的空间', example: 'word-spacing: normal' },
                { attr: 'length', desc: '单词间的固定空间 (允许使用负值)', example: 'word-spacing: 1px' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='word-break' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'normal', desc: '会在中文内和英文单词结束换行', example: 'word-break: normal' },
                { attr: 'break-all', desc: '会在中文内和英文单词内换行', example: 'word-break: break-all' },
                { attr: 'keep-all', desc: '只能在半角空格或连字符处换行', example: 'word-break: keep-all' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='word-wrap' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'normal', desc: '只在允许的断字点换行', example: 'word-wrap: normal' },
                { attr: 'break-word', desc: '会在英文单词内换行', example: 'word-wrap: break-word' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='white-space' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'normal', desc: '默认 (空白会被浏览器忽略)', example: 'white-space: normal' },
                { attr: 'pre', desc: '空白会被浏览器保留 (类似pre标签)', example: 'white-space: pre' },
                { attr: 'nowrap', desc: '文本不会换行，直到遇到br标签为止', example: 'white-space: nowrap' },
                { attr: 'pre-wrap', desc: '保留空白符序列，但是正常地进行换行', example: 'white-space: pre-wrap' },
                { attr: 'pre-line', desc: '合并空白符序列，但是保留换行符', example: 'white-space: nowrap' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='text-indent' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: '%', desc: '百分比(父元素宽度*%=缩进)', example: 'text-indent: 10%' },
                { attr: 'em', desc: 'em(当前元素字号*em=缩进)', example: 'text-indent: 2em' },
                { attr: '16px', desc: '固定的', example: 'text-indent: 16px' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='text-decoration'>
            <ParamsTable
              data={[
                { attr: 'underline', desc: '定义文本底部的一条线', example: 'text-decoration: underline' },
                { attr: 'overline', desc: '定义文本顶部的一条线', example: 'text-decoration: overline' },
                { attr: 'line-through', desc: '定义穿过文本下的一条线', example: 'text-decoration: line-through' },
                { attr: 'none', desc: '去掉文本的修饰线', example: 'text-decoration: none', default: '默认' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='text-overflow'>
            <ParamsTable
              data={[
                { attr: 'clip', desc: '裁切文本', example: 'text-overflow: clip', default: '默认' },
                { attr: 'ellipsis', desc: '显示省略号来代表被裁切的文本', example: 'text-overflow: ellipsis' },
              ]}
            />
          </AnchorCard>,
          <AlertPro>
            <div>设置文本溢出盒子时的处理方式 (默认不显示溢出部分，也可以设置为显示省略号)</div>
            <div>默认情况下，文本自动折行，不会溢出盒子，所以要设置文本为不换行 `white-space: nowrap;`</div>
            <div>默认情况下，文本溢出盒子是不会隐藏的，所以要给盒子设置溢出隐藏属性`overflow: hidden;`</div>
            <div>同时有这两个属性，文本溢出盒子并且被隐藏时，text-overflow属性才会生效</div>
          </AlertPro>,
          <AnchorCard title='text-transform' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'uppercase', desc: '转换为大写字母', example: 'text-transform: uppercase' },
                { attr: 'lowercase', desc: '转换为小写字母', example: 'text-transform: lowercase' },
                { attr: 'capitalize', desc: '转换为每个单词以大写字母开头', example: 'text-transform: capitalize' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='text-align' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'left', desc: '文本排列到左边', example: 'text-align: left' },
                { attr: 'right', desc: '文本排列到右边', example: 'text-align: right' },
                { attr: 'center', desc: '文本排列到中间', example: 'text-align: center' },
                { attr: 'justify', desc: '文本均分元素宽度', example: 'text-align: justify' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='text-shadow' tags={['可继承']}>
            <ParamsTable
              data={[
                {
                  attr: 'h-shadow',
                  desc: '水平阴影的位置(允许负值)',
                  example: 'text-shadow: -10px v-shadow [blur] [color]',
                },
                {
                  attr: 'v-shadow',
                  desc: '垂直阴影的位置 (允许负值)',
                  example: 'text-shadow: h-shadow 10px [blur] [color]',
                },
                { attr: 'blur', desc: '模糊的距离', example: 'text-shadow: h-shadow v-shadow 10px [color]' },
                { attr: 'color', desc: '阴影的颜色', example: 'text-shadow: h-shadow v-shadow [blur] rgba(0,0,0,0.2)' },
              ]}
            />
          </AnchorCard>,
        ],
      },
      {
        label: '列表',
        children: [
          <AnchorCard title='list-style' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: '类型 位置 图片', desc: '下面几种属性的连写', example: 'list-style: disc outside none' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='list-style-type' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'disc', desc: '实心圆', example: 'list-style-type: disc', default: '默认' },
                { attr: 'circle', desc: '空心圆', example: 'list-style-type: circle' },
                { attr: 'square', desc: '实心方块', example: 'list-style-type: square' },
                { attr: 'none', desc: '无标记', example: 'list-style-type: none' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='list-style-position' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'outside', desc: '放置在文本以外', example: 'list-style-position: outside', default: '默认' },
                { attr: 'inside', desc: '放置在文本以内', example: 'list-style-position: inside' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='list-style-image' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'none', desc: '无图形被显示', example: 'list-style-image: none', default: '默认' },
                { attr: 'url', desc: '图像的路径', example: 'list-style-image: url(./img.jpg)' },
              ]}
            />
          </AnchorCard>,
        ],
      },
      {
        label: '表格',
        children: [
          <AnchorCard title='caption-side' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'top', desc: '把表格标题定位在表格之上', example: 'caption-side: top', default: '默认' },
                { attr: 'bottom', desc: '把表格标题定位在表格之下', example: 'caption-side: bottom' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='border-collapse' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'separate', desc: '边框会被分开', example: 'border-collapse: separate', default: '默认' },
                { attr: 'collapse', desc: '边框会合并为一个单一的边框', example: 'border-collapse: collapse' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='border-spacing' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: '水平间隙 垂直间隙', desc: '边框会被分开', example: 'border-spacing: 1px 1px' },
              ]}
            />
          </AnchorCard>,
        ],
      },
      {
        label: '图片',
        children: [
          <AnchorCard title='vertical-align'>
            <ParamsTable
              data={[
                {
                  attr: 'baseline',
                  desc: '元素放置在父元素的基线上',
                  example: 'vertical-align: baseline',
                  default: '默认',
                },
                { attr: 'sub', desc: '垂直对齐文本的下标', example: 'vertical-align: sub' },
                { attr: 'super', desc: '垂直对齐文本的上标', example: 'vertical-align: super' },
                { attr: 'top', desc: '把元素的顶端与行中最高元素的顶端对齐', example: 'vertical-align: top' },
                { attr: 'text-top', desc: '把元素的顶端与父元素字体的顶端对齐', example: 'vertical-align: text-top' },
                { attr: 'middle', desc: '把此元素放置在父元素的中部', example: 'vertical-align: middle' },
                { attr: 'bottom', desc: '把元素的顶端与行中最低的元素的顶端对齐', example: 'vertical-align: bottom' },
                {
                  attr: 'text-bottom',
                  desc: '把元素的底端与父元素字体的底端对齐',
                  example: 'vertical-align: text-bottom',
                },
              ]}
            />
          </AnchorCard>,
        ],
      },
      {
        label: '其它',
        children: [
          <AnchorCard title='-webkit-tap-highlight-color' tags={['可继承']}>
            <ParamsTable
              data={[
                { attr: 'color_name', desc: '指定颜色', example: '-webkit-tap-highlight-color: red' },
                { attr: 'transparent', desc: '透明色', example: '-webkit-tap-highlight-color: transparent' },
              ]}
            />
          </AnchorCard>,
        ],
      },
    ]}
  />
)
