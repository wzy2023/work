import React from 'react'
import { Tabs } from 'antd'
import Video from './blocks/Video'

export default () => {

  const goodList = [
    { type: 'video', name: '视频', component: Video },
    { type: 'exe', name: '软件' },
    { type: 'text', name: '文本' },
    { type: 'image', name: '图片' },
    { type: 'game', name: '游戏' },
  ]

  return (
    <Tabs style={{ marginTop: -10 }} defaultActiveKey={goodList[0].type}>
      {goodList.map(({ type, name, component }) => (
        <Tabs.TabPane key={type} tab={name} disabled>
          {React.createElement(component, { type, name })}
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}
