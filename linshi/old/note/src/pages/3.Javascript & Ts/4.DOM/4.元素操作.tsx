import { ParamsTable, AnchorCard } from '@/components'

export default () => [
  <AnchorCard title='元素操作'>
    <ParamsTable
      data={[
        { label: 'document.createElement("nodeName")', desc: '创建元素节点' },
        { label: 'document.createTextNode("str")', desc: '创建文本节点' },
        { label: 'node.cloneNode([是否深复制])', desc: '复制节点(不会复制到事件)' },
        {},
        { label: 'node.appendChild(node)', desc: '添加节点' },
        { label: 'node.insertBefore(新节点, 参考节点)', desc: '在参考节点前插入' },
        { label: 'node.replaceChild(新节点, 旧节点)', desc: '替换节点' },
        { label: 'node.removeChild(node)', desc: '删除节点(父节点删除子节点)' },
        { label: 'node.hasChildNodes("nodeName")', desc: '返回当前节点是否有指定子节点' },
        {},
        { label: 'node.innerHTML', desc: '获取双闭合标签里的所有内容，包括里面的标签' },
        { label: 'node.innerText', desc: '获取双闭合标签里的所有文本内容，不包括标签' },
        { label: 'node.nodeName', desc: '获取指定节点的名称' },
        { label: 'node.nodeType', desc: '1为元素节点、2为属性节点、3为文本节点' },
      ]}
    />
  </AnchorCard>,
]
