export default [
  {
    'content': '在 HTML 中，哪个标签用于表示最重要的标题？',
    'type': 'SingleChoice',
    'options': {
      'a': {
        'content': '<h1>',
        'tip': '正确！<h1> 标签用于表示文档中最重要的标题。',
      },
      'b': {
        'content': '<h2>',
        'tip': '不对。<h2> 标签表示次一级的标题，不是最重要的标题。',
      },
      'c': {
        'content': '<title>',
        'tip': '选错了，<title> 标签用于指定网页的标题，通常显示在浏览器的标签页上。',
      },
      'd': {
        'content': '<header>',
        'tip': '不对，<header> 元素表示页面的头部内容，而不是标题。',
      },
    },
    'answer': ['a'],
    'level': 'easy',
    'pointText': '了解 HTML 标题标签的用途',
    'point': ['HTML', '标题', '<h1>'],
    'asalysis': '标题标签的等级表示其重要性，<h1> 最重要，依次递减到 <h6>。',
    'technique': '记住：<h1> 表示最高级别的标题，通常用于页面的主要标题。',
  },
  {
    'content': '在 HTML 中，哪个标签用于创建超链接？',
    'type': 'SingleChoice',
    'options': {
      'a': {
        'content': '<a>',
        'tip': '正确！<a> 标签用于定义超链接。',
      },
      'b': {
        'content': '<link>',
        'tip': '不对，<link> 标签通常用于链接外部资源，如样式表。',
      },
      'c': {
        'content': '<url>',
        'tip': '选错了，<url> 不是有效的 HTML 标签。',
      },
      'd': {
        'content': '<href>',
        'tip': '不对，href 是 <a> 标签的一个属性，不是标签本身。',
      },
    },
    'answer': ['a'],
    'level': 'easy',
    'pointText': '了解 HTML 中的超链接',
    'point': ['HTML', '超链接', '<a>'],
    'asalysis': '超链接是网页之间导航的基础元素，理解 <a> 标签的使用非常重要。',
    'technique': '记住：<a> 标签用于创建超链接，href 属性指定链接目标。',
  },
  {
    'content': '在 HTML 中，哪个属性用于为元素提供替代文本？',
    'type': 'SingleChoice',
    'options': {
      'a': {
        'content': 'alt',
        'tip': '正确！alt 属性通常用于 <img> 标签，提供图片的替代文本。',
      },
      'b': {
        'content': 'title',
        'tip': '不对，title 属性通常用于提供元素的额外信息，如工具提示。',
      },
      'c': {
        'content': 'href',
        'tip': '不对，href 属性用于指定超链接的目标 URL。',
      },
      'd': {
        'content': 'src',
        'tip': '不对，src 属性通常用于指定图像或嵌入内容的路径。',
      },
    },
    'answer': ['a'],
    'level': 'easy',
    'pointText': '了解 HTML 中的 alt 属性',
    'point': ['HTML', '属性', 'alt'],
    'asalysis': 'alt 属性对于无障碍网页设计和搜索引擎优化（SEO）都非常重要。',
    'technique': '记住：alt 属性提供替代文本，尤其在图片无法显示时非常有用。',
  },
  {
    'content': '在 HTML 中，哪个标签用于定义表格的行？',
    'type': 'SingleChoice',
    'options': {
      'a': {
        'content': '<tr>',
        'tip': '正确！<tr> 标签用于定义表格中的一行。',
      },
      'b': {
        'content': '<td>',
        'tip': '不对，<td> 标签用于定义单元格，不是表格行。',
      },
      'c': {
        'content': '<th>',
        'tip': '不对，<th> 标签用于定义表头单元格。',
      },
      'd': {
        'content': '<table>',
        'tip': '不对，<table> 标签用于定义整个表格，而不是单行。',
      },
    },
    'answer': ['a'],
    'level': 'easy',
    'pointText': '了解 HTML 表格的基本结构',
    'point': ['HTML', '表格', '<tr>'],
    'asalysis': '理解表格结构是创建和管理表格数据的基础。',
    'technique': '记住：<tr> 用于定义表格行，<td> 和 <th> 用于定义单元格。',
  },
  {
    'content': '哪个 HTML 标签用于嵌入视频？',
    'type': 'SingleChoice',
    'options': {
      'a': {
        'content': '<video>',
        'tip': '正确！<video> 标签用于嵌入视频内容。',
      },
      'b': {
        'content': '<iframe>',
        'tip': '不对，<iframe> 标签用于嵌入外部网页。',
      },
      'c': {
        'content': '<media>',
        'tip': '不对，<media> 不是有效的 HTML 标签。',
      },
      'd': {
        'content': '<source>',
        'tip': '不对，<source> 标签用于指定媒体文件的路径，通常在 <video> 或 <audio> 标签内使用。',
      },
    },
    'answer': ['a'],
    'level': 'easy',
    'pointText': '了解 HTML 中的媒体嵌入标签',
    'point': ['HTML', '媒体', '<video>'],
    'asalysis': '<video> 标签常用于网页中的多媒体内容，理解其使用方式非常重要。',
    'technique': '记住：<video> 标签用于嵌入视频内容，可以包含多个 <source> 标签。',
  },
  {
    'content': '在 HTML 中，哪个元素用于创建无序列表？',
    'type': 'SingleChoice',
    'options': {
      'a': {
        'content': '<ul>',
        'tip': '正确！<ul> 标签用于定义无序列表。',
      },
      'b': {
        'content': '<ol>',
        'tip': '不对，<ol> 标签用于定义有序列表。',
      },
      'c': {
        'content': '<li>',
        'tip': '不对，<li> 标签用于定义列表项。',
      },
      'd': {
        'content': '<list>',
        'tip': '不对，<list> 不是有效的 HTML 标签。',
      },
    },
    'answer': ['a'],
    'level': 'easy',
    'pointText': '了解 HTML 中的列表元素',
    'point': ['HTML', '列表', '<ul>'],
    'asalysis': '无序列表通常用于项目的集合，使用圆点标记。',
    'technique': '记住：<ul> 表示无序列表，<li> 表示列表项。',
  },
  {
    'content': '在 HTML5 中，哪个标签用于定义页面的导航链接？',
    'type': 'SingleChoice',
    'options': {
      'a': {
        'content': '<nav>',
        'tip': '正确！<nav> 标签用于定义页面的主要导航链接。',
      },
      'b': {
        'content': '<header>',
        'tip': '不对，<header> 标签通常用于定义页面的头部区域。',
      },
      'c': {
        'content': '<footer>',
        'tip': '不对，<footer> 标签用于定义页面的底部区域。',
      },
      'd': {
        'content': '<aside>',
        'tip': '不对，<aside> 标签通常用于定义侧边内容。',
      },
    },
    'answer': ['a'],
    'level': 'medium',
    'pointText': '了解 HTML5 的语义化标签',
    'point': ['HTML5', '语义化', '<nav>'],
    'asalysis': '语义化标签有助于提高网页的可访问性和 SEO 效果。',
    'technique': '记住：<nav> 标签用于定义页面的导航部分，包含链接到其他部分的导航链接。',
  },
]
