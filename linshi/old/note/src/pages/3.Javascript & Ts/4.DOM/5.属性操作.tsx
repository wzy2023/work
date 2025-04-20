import { ParamsTable, CodeView, AnchorCard, AlertPro } from '@/components'

export default () => [
  <AnchorCard title='原生属性'>
    <ParamsTable
      data={[
        { label: 'node.属性名 / node[属性名]', desc: '节点原生属性的值可以这样获取和设置' },
        { label: 'node.getAttribute("属性名")', desc: '获取指定属性的值，不存在返回Null' },
        { label: 'node.setAttribute("属性名", "属性值")', desc: '设置属性的值' },
        { label: 'node.hasAttribute("属性名")', desc: '判断节点是否有指定属性' },
        { label: 'node.removeAttribute("属性名")', desc: '从当前节点移除指定属性' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='自定义属性'>
    <AlertPro message='注意属性名写的大写字母无效会自动转为小写，如需大写需要在前面加"-"' />
    <ParamsTable
      data={[
        { label: '<div data-my-name="itcast" data-age="10">', desc: '设置自定义属性' },
        { label: 'node.dataset["myName"]', desc: '获取自定义属性' },
        { label: 'node.dataset["age"] = 10', desc: '修改自定义属性' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='style属性'>
    <AlertPro message='注意属性名写的大写字母无效会自动转为小写，如需大写需要在前面加"-"' />
    <ParamsTable
      data={[
        { label: 'node.style.属性名', desc: '能获取节点的行内样式，获取不了css样式' },
        { label: 'node.style.backgroundColor = "red"', desc: 'js中不准写-，需要驼峰命名法' },
        { label: 'node.style.cssText = "width:10px; height:20px"', desc: '获取所有属性并转换为字符串' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='class属性'>
    <AlertPro message='注意属性名写的大写字母无效会自动转为小写，如需大写需要在前面加"-"' />
    <ParamsTable
      data={[
        { label: 'node.className = "aaa"', desc: 'class是关键字，所以要写成className' },
        { label: 'node.classList.add("class")', desc: '添加class' },
        { label: 'node.classList.remove("class")', desc: '移除class' },
        { label: 'node.classList.toggle("class")', desc: '切换class，有则移除，无则添加' },
        { label: 'node.classList.contains("class")', desc: '检测是否存在class' },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='获取元素计算后的属性'>
    <CodeView language='javascript'>
      {`
        getComputedStyle(node) // 返回指定节点的最终style对象
      `}
    </CodeView>
  </AnchorCard>,
]
