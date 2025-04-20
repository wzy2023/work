import { AlertPro, AnchorCard, ParamsTable, TabsPro } from '@/components'

export default () => (
  <TabsPro
    items={[
      {
        label: '匹配元素',
        children: [
          <AnchorCard title='通配选择器'>
            <ParamsTable
              data={[
                { value: `*`, desc: `选择页面上所有元素` },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='id选择器'>
            <ParamsTable
              data={[
                { value: `#id`, desc: `选择页面上指定id的元素，一个id名在页面上只能出现一次` },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='标签选择器'>
            <ParamsTable
              data={[
                { value: `标签名`, desc: `选择页面上指定标签的元素` },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='类名选择器'>
            <ParamsTable
              data={[
                { value: `.类名`, desc: `选择页面上指定类名的元素` },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='属性选择器'>
            <ParamsTable
              data={[
                { value: `[src]`, desc: `只要元素包含这个属性就会选中` },
                { value: `[alt="img a"]`, desc: `只要元素的这个属性的值等于这个内容就会选中` },
                { value: `[alt~="a"]`, desc: `只要元素的这个属性的值有这个单词就会选中` },
                { value: `[alt*="mg"]`, desc: `只要元素的这个属性值包含这个内容就会选中` },
                { value: `[alt^="im"]`, desc: `只要元素的这个属性的值是这个内容开头就会选中` },
                { value: `[alt$=" a"]`, desc: `只要元素的这个属性的值是这个内容结尾就会选中` },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='元素选择器'>
            <ParamsTable
              data={[
                { value: 'E:first-child { }', desc: 'E元素作为第一个子元素的时候' },
                { value: 'E:last-child { }', desc: 'E元素作为最后一个子元素的时候' },
                { value: 'E:only-child { }', desc: 'E元素作为唯一一个子元素的时候' },
                {},
                { value: 'E:first-of-type { }', desc: 'E元素作为第一个指定类型的子元素的时候' },
                { value: 'E:last-of-type { }', desc: 'E元素作为最后一个指定类型的子元素的时候' },
                { value: 'E:only-of-type { }', desc: 'E元素作为唯一一个指定类型的子元素的时候' },
                {},
                { value: 'E:nth-child(even) { }', desc: 'E元素作为偶数位置的子元素的时候' },
                { value: 'E:nth-child(odd) { }', desc: 'E元素作为奇数位置的子元素的时候' },
                { value: 'E:nth-child(3) { }', desc: 'E元素作为第3个子元素的时候' },
                {
                  value: 'E:nth-child(2n+1) { }',
                  desc: '选择每2个E元素中的第1个，从第1个开始 (即2的倍数+1)，其中n是从0开始的任意非负整数',
                },
                {
                  value: 'E:nth-child(n+3) { }',
                  desc: '选择E元素作为子元素的第n+3个，其中n是从0开始的任意非负整数',
                },
                {
                  value: 'E:nth-child(-n+3) { }',
                  desc: '选择E元素作为子元素的前3个[存疑]',
                },
                {},
                { value: 'E:nth-of-type(3) { }', desc: 'E元素作为第3个E元素的时候' },
                {},
                { value: 'E:nth-last-child(3) { }', desc: 'E元素作为第3个子元素的时候(末尾计数)' },
                {},
                { value: 'E:nth-last-of-type(3) { }', desc: 'E元素作为第3个E元素的时候(末尾计数)' },
                {},
                { value: 'E:not(s) { }', desc: '匹配未被s选择器匹配到的所有E元素' },
                {},
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='关系选择器'>
            <ParamsTable
              data={[
                { value: 'p~h1 { }', desc: '同级兄弟选择器，以 ~ 连接，只从同级的后面的兄弟元素选择' },
                { value: 'p+span { }', desc: '同级紧邻兄弟选择器，以 + 连接，只选中紧挨的下一个兄弟元素' },
                { value: 'div>span { }', desc: '子元素选择器，以 > 连接，只选中直接的子代元素' },
                { value: 'div .aaa { }', desc: '后代元素选择器，以空格连接，选中符合条件的后代元素(可隔代)' },
              ]}
            />
          </AnchorCard>,
        ],
      },
      {
        label: '匹配伪类',
        children: [
          <AlertPro>
            <div>伪类选择器，选中的还是指定元素，只不过是不同状态下的元素</div>
          </AlertPro>,
          <AnchorCard title='匹配伪类'>
            <ParamsTable
              data={[
                { value: 'a:link', desc: '未访问过的链接 (只能用于a)' },
                { value: 'a:visited', desc: '已访问过的链接 (只能用于a)' },
                { value: 'E:hover', desc: 'E元素被鼠标悬停的时候' },
                { value: 'E:active', desc: 'E元素被鼠标按下的时候' },
                { value: 'E:focus', desc: 'E元素拥有焦点的时候' },
                { value: 'E:empty', desc: 'E元素作为空元素的时候' },
                { value: 'E:checked', desc: 'E元素是选中元素的时候' },
                { value: 'E:disabled', desc: 'E元素是禁止元素的时候' },
                { value: 'E:enabled', desc: 'E元素是有效元素的时候' },
              ]}
            />
          </AnchorCard>,
        ],
      },
      {
        label: '匹配伪元素',
        children: [
          <AlertPro>
            <div>伪元素选择器，是给选中的元素，创造伪元素</div>
          </AlertPro>,
          <AnchorCard title='匹配伪元素'>
            <ParamsTable
              data={[
                { value: 'E::selection', desc: 'E元素内被选中的文字' },
                { value: 'E::first-letter', desc: 'E元素的第一个字符' },
                { value: 'E::first-line', desc: 'E元素的第一行字符' },
              ]}
            />
          </AnchorCard>,
          <AnchorCard title='创建伪元素'>
            <ParamsTable
              data={[
                { value: 'E::before', desc: 'E元素内部最前面创建一个元素' },
                { value: 'E::after', desc: 'E元素内部最后面创建一个元素' },
              ]}
            />
          </AnchorCard>,
        ],
      },
    ]}
  />
)
