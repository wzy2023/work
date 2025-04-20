import { screen } from '@electron/remote'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import { Button, CloseOutlined, Input, message, Modal, PopconfirmPro, Tabs } from '@wzyjs/component-web'
import Copy from './Copy'
import { Item, Menu, useContextMenu } from 'react-contexify'
import 'react-contexify/ReactContexify.css'

import tabsStore from '../electron/store/tabs'

const App = () => {
  const [name, setName] = useState('')
  const [href, setHref] = useState('https://www.baidu.com')
  const [type, setType] = useState<'card' | 'editable-card'>('card')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { show } = useContextMenu({ id: 'menu' })
  const [screenPoint, setScreenPoint] = useState({ x: 0, y: 0 })

  const onConfirmTabName = () => {
    if (!name) {
      message.error('名称不能为空')
      return
    }
    if (tabsStore.tabs.find(tab => tab.key === name)) {
      message.error('名称不能重复')
      return
    }

    tabsStore.addTab({ label: name, key: Math.random().toString() })
    setName('')
  }

  const onDeleteTab = (key: string) => {
    tabsStore.removeTab(key)
    setName('')
  }

  const onConfirmView = () => {
    if (!href) {
      message.error('网页地址不能为空')
      return
    }
    tabsStore.addView(tabsStore.activeKey, {
      key: Math.random().toString(),
      href,
      bounds: { x: screenPoint.x, y: 100, width: 800, height: 600 }
    })
    setIsModalOpen(false)
  }

  useEffect(() => {
    setTimeout(() => {
      if (tabsStore.activeKey === tabsStore.tabs[0].key) {
        tabsStore.setActiveKey('ChatGPT')
      }
    }, 5000)
  }, [])

  return (
    <div>
      <Tabs
        items={tabsStore.tabs.map(tab => ({
          ...tab,
          closeIcon: (
            <PopconfirmPro
              title="确定删除吗？"
              onConfirm={() => onDeleteTab(tab.key)}
            >
              <CloseOutlined rev={undefined} />
            </PopconfirmPro>
          )
        }))}
        hideAdd
        centered
        type={type}
        onEdit={(targetKey: any) => {
          tabsStore.removeTab(targetKey)
        }}
        activeKey={tabsStore.activeKey}
        onChange={key => tabsStore.setActiveKey(key)}
        tabBarExtraContent={(
          <div>
            {type === 'editable-card' && (
              <PopconfirmPro
                title="请输入名称"
                description={() => <Input value={name} onChange={ev => setName(ev.target.value)} />}
                onConfirm={onConfirmTabName}
              >
                <Button>添加</Button>
              </PopconfirmPro>
            )}
            <Button
              onClick={() => {
                setType(type === 'card' ? 'editable-card' : 'card')
              }}
            >
              {type === 'card' ? '管理' : '完成'}
            </Button>
          </div>
        )}
      />

      <Menu id='menu'>
        <Item
          id="add"
          onClick={() => setIsModalOpen(true)}
        >
          添加新网页
        </Item>
      </Menu>

      <Modal title="请输入网页地址" visible={isModalOpen} onOk={onConfirmView} onCancel={() => setIsModalOpen(false)}>
        <Input
          value={href}
          onChange={ev => {
            setHref(ev.target.value)
          }}
        />
      </Modal>

      <div
        style={{ height: '91vh' }}
        onContextMenu={event => {
          show({ event, props: { key: 'value' } })
          setScreenPoint(screen.getCursorScreenPoint())
        }}
      >
        {tabsStore.activeKey === 'COPY' && (
          <Copy />
        )}
      </div>
    </div>
  )
}

export default observer(App)
