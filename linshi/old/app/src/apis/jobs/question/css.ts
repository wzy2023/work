export default [
  {
    'content': '在 CSS 中，哪个属性用于设置元素的背景颜色？',
    'type': 'SingleChoice',
    'options': {
      'a': {
        'content': 'color',
        'tip': '选错了，color 属性是用来设置文字的颜色，背景颜色需要使用 background-color 属性。',
      },
      'b': {
        'content': 'font-color',
        'tip': '不对，font-color 不是有效的 CSS 属性，用于背景颜色的是 background-color。',
      },
      'c': {
        'content': 'background-color',
        'tip': '正确！background-color 用于设置元素的背景颜色。',
      },
      'd': {
        'content': 'bg-color',
        'tip': '不对，虽然 bg-color 看起来像是背景颜色的缩写，但在 CSS 中并不是有效的属性。',
      },
    },
    'answer': ['c'],
    'level': 'easy',
    'pointText': '了解基础的 CSS 属性',
    'point': ['CSS', '背景颜色'],
    'asalysis': '此题主要考察对常用 CSS 属性的理解。需要掌握常用属性的名称和用途。',
    'technique': '记住：background-color 设置背景颜色，color 设置文字颜色。',
  },
  {
    'content': '如何在 CSS 中创建一个水平居中的块级元素？',
    'type': 'MultipleChoice',
    'options': {
      'a': {
        'content': '设置元素的 margin-left 和 margin-right 为 auto',
        'tip': '这是正确的方法之一，通过将左右外边距设置为 auto，可以让块级元素水平居中。',
      },
      'b': {
        'content': '设置元素的 text-align 为 center',
        'tip': '这方法不对。text-align 仅影响行内元素或行内块元素中的文本，而不是块级元素。',
      },
      'c': {
        'content': '将元素设为 flex 容器，并使用 justify-content: center',
        'tip': '这也是正确的方法之一。使用 flex 布局，可以通过 justify-content 属性轻松水平居中子元素。',
      },
      'd': {
        'content': '设置元素的 display 为 inline-block',
        'tip': '这方法不对。inline-block 改变的是元素的显示方式，但不会自动居中。',
      },
    },
    'answer': ['a', 'c'],
    'level': 'medium',
    'pointText': '理解如何在 CSS 中实现水平居中',
    'point': ['CSS', '布局', '水平居中'],
    'asalysis': '水平居中是前端开发中的常见需求，熟悉多种居中方法非常重要。',
    'technique': '记住：使用 margin auto 是块级元素居中的传统方法，flex 布局提供了更灵活的方式。',
  },
  {
    'content': '在 CSS 中，position: absolute; 的作用是什么？',
    'type': 'SingleChoice',
    'options': {
      'a': {
        'content': '将元素相对于其父元素绝对定位',
        'tip': '不完全正确。absolute 定位是相对于最近的已定位祖先元素，如果没有则相对于初始包含块。',
      },
      'b': {
        'content': '将元素固定在屏幕上，不随页面滚动',
        'tip': '不对。这描述的是 position: fixed 的行为。',
      },
      'c': {
        'content': '将元素从文档流中移除，并相对于最近的已定位祖先元素进行定位',
        'tip': '正确！absolute 定位的元素脱离了正常文档流，并相对于最近的已定位祖先元素定位。',
      },
      'd': {
        'content': '将元素相对于其最近的兄弟元素进行定位',
        'tip': '不对。absolute 定位并不依赖兄弟元素，而是依赖父元素。',
      },
    },
    'answer': ['c'],
    'level': 'medium',
    'pointText': '理解 position: absolute 的特性及其使用场景',
    'point': ['CSS', '定位', 'absolute'],
    'asalysis': '掌握不同的定位方式及其行为是布局中非常重要的技能。',
    'technique': '记住：absolute 定位元素从文档流中移除，并相对于最近的已定位祖先元素。',
  },
  {
    'content': '下列哪一项是 CSS 选择器中表示所有元素的通用选择器？',
    'type': 'SingleChoice',
    'options': {
      'a': {
        'content': '*',
        'tip': '正确！在 CSS 中，* 选择器选择页面中的所有元素。',
      },
      'b': {
        'content': '#',
        'tip': '不对。# 是用于 ID 选择器的标志符。',
      },
      'c': {
        'content': '.',
        'tip': '不对。点号（.）是类选择器的标志符。',
      },
      'd': {
        'content': ':',
        'tip': '不对。冒号（:）通常用于伪类选择器。',
      },
    },
    'answer': ['a'],
    'level': 'easy',
    'pointText': '了解 CSS 选择器的基础知识',
    'point': ['CSS', '选择器', '通用选择器'],
    'asalysis': '通用选择器在一些全局样式的设置中非常有用，但需谨慎使用以避免性能问题。',
    'technique': '记住：* 选择器是通用选择器，用于选择所有元素。',
  },
  {
    'content': '在 CSS 中，哪种方式可以最准确地改变元素的透明度？',
    'type': 'SingleChoice',
    'options': {
      'a': {
        'content': '使用 opacity 属性',
        'tip': '正确！opacity 属性可以设置元素的透明度，取值范围为 0 到 1。',
      },
      'b': {
        'content': '使用 background-color 的 alpha 通道',
        'tip': '虽然这可以改变背景颜色的透明度，但不能改变整个元素的透明度。',
      },
      'c': {
        'content': '使用 visibility: hidden',
        'tip': 'visibility: hidden 会使元素不可见，但不会改变其透明度。',
      },
      'd': {
        'content': '使用 display: none',
        'tip': 'display: none 会移除元素及其占用的空间，并不会影响透明度。',
      },
    },
    'answer': ['a'],
    'level': 'easy',
    'pointText': '了解如何在 CSS 中控制元素的透明度',
    'point': ['CSS', '透明度', 'opacity'],
    'asalysis': '透明度是 UI 设计中的常见需求，理解不同属性对元素显示的影响非常重要。',
    'technique': '记住：opacity 是改变整个元素透明度的属性，值越小越透明。',
  },
  {
    'content': 'CSS Grid 布局中的 fr 单位是指什么？',
    'type': 'SingleChoice',
    'options': {
      'a': {
        'content': '一个可变长度单位，用于定义网格轨道的比例',
        'tip': '正确！fr 单位表示 \'fraction\'，用于分配可用空间。',
      },
      'b': {
        'content': '固定单位，用于定义网格轨道的绝对宽度',
        'tip': '不对。fr 是相对单位，表示可用空间的比例。',
      },
      'c': {
        'content': '一个相对长度单位，用于定义字体大小',
        'tip': '不对。em 和 rem 才是与字体大小相关的相对长度单位。',
      },
      'd': {
        'content': '一种用于指定图像大小的单位',
        'tip': '不对。fr 与图像大小无关，通常用于布局。',
      },
    },
    'answer': ['a'],
    'level': 'medium',
    'pointText': '理解 CSS Grid 布局中的 fr 单位',
    'point': ['CSS', 'Grid', 'fr'],
    'asalysis': 'fr 单位在 Grid 布局中非常强大，可以简化复杂的布局定义。',
    'technique': '记住：fr 表示 \'fraction\'，即可用空间的分数。',
  },
  {
    'content': '在 CSS 中，如何使元素完全覆盖其父元素？',
    'type': 'TrueFalse',
    'options': {
      'a': {
        'content': '设置 position: absolute; top: 0; right: 0; bottom: 0; left: 0;',
        'tip': '正确！这种方式可以让绝对定位的元素完全覆盖其父元素。',
      },
      'b': {
        'content': '设置 width: 100%; height: 100%;',
        'tip': '错误。虽然这种方式能让元素填满父元素的宽高，但不能确保完全覆盖，尤其是当父元素有内边距时。',
      },
    },
    'answer': ['a'],
    'level': 'medium',
    'pointText': '理解如何使用绝对定位覆盖父元素',
    'point': ['CSS', '布局', '绝对定位'],
    'asalysis': '绝对定位和宽高百分比在布局中有不同的应用场景，理解它们的差异非常重要。',
    'technique': '记住：使用绝对定位和上下左右0可以确保元素覆盖父元素。',
  },
]
