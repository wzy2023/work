import { AnchorCard, ParamsTable } from '@/components'

export default () => [
  <AnchorCard title='标签的分类' subTitle='标签分为双标签和单标签'>
    <ParamsTable
      data={[
        { desc: `双标签有两个`, example: `<p></p>` },
        { desc: `单标签需要自身闭合`, example: `<br />` },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='标签的关系' subTitle='一般有两种关系'>
    <ParamsTable
      data={[
        { desc: `嵌套关系`, example: `<div>\n  <p></p>\n</div>` },
        { desc: `并列关系`, example: `<div></div>\n<p></p>` },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='标签的属性' subTitle='标签可以有多个属性，属性之间用空格分开，不分前后顺序'>
    <ParamsTable
      data={[
        { desc: `采取键值对的格式`, example: `<a href=""> </a>` },
      ]}
    />
  </AnchorCard>,
]
