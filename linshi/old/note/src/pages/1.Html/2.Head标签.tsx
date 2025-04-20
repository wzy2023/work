import { AnchorCard, ParamsTable, PageHeader, CodeView } from '@/components'

export default () => [
  <PageHeader
    title='head标签'
    subTitle='一般定义页面的头部，描述页面的各种属性和信息，用于存放：title、meta、style、script、link、base'
  />,

  <AnchorCard title='title 标签' style={{ marginTop: 30 }}>
    <ParamsTable
      data={[
        { desc: `定义文档的标题，显示在浏览器窗口的标题栏上`, example: '<title></title>' },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='meta 标签'>
    <ParamsTable
      data={[
        { desc: `网页编码`, example: `<meta charset='utf-8' />` },
        { desc: `网页关键字`, example: `<meta name='keywords' content='关键字1,关键字2' />` },
        { desc: `网页描述`, example: `<meta name='description' content='描述' />` },
        { desc: `优先使用webkit内核`, example: `<meta name='renderer' content='webkit' /> ` },
        {
          desc: `视口设置`,
          example: `<meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' />`,
        },
        { desc: `重定向`, example: `<meta http-equiv='refresh' content='5; http://www.qq.com' />` },
        { desc: `优先使用edge渲染`, example: `<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1' />` },
        { desc: `作者信息`, example: `<meta name="author" content="作者姓名">` },
        { desc: `版权信息`, example: `<meta name="copyright" content="版权信息">` },
        { desc: `移动设备优化`, example: `<meta name="HandheldFriendly" content="true">` },
        { desc: `禁止搜索引擎索引和缓存`, example: `<meta name="robots" content="noindex, nofollow">` },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='link 标签'>
    <ParamsTable
      data={[
        { desc: `引入样式表`, example: `<link rel='stylesheet' href='index.css'>` },
        { desc: `引入小图标`, example: `<link rel='icon' href='1.ico'>` },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='base 标签'>
    <ParamsTable
      data={[
        { desc: '网页所有链接为_blank方式打开', example: `<base target='_blank' />` },
        { desc: '网页所有链接的基准URL', example: `<base href='https://example.com/aaa/' />` },
      ]}
    />
  </AnchorCard>,

  <AnchorCard title='style 标签'>
    <CodeView language='html'>
      {`
        <style>
          ...;
        </style>
      `}
    </CodeView>
  </AnchorCard>,

  <AnchorCard title='script 标签'>
    <CodeView language='html'>
      {`
        <script type='text/javascript' src='index.js'></script>

        <script>
          ...
        </script>
      `}
    </CodeView>
  </AnchorCard>,
]
