import React, { useState, useEffect } from 'react'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import { ContentDrawer } from './ContentDrawer'
import { FloatingButton } from './FloatingButton'

import './styles.css'

export default () => {
  const [drawerVisible, setDrawerVisible] = useState(false)

  const [pageContent, setPageContent] = useState('')

  useEffect(() => {
    const content = document.body.innerHTML
    setPageContent(content)
  }, [])

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const closeDrawer = () => {
    setDrawerVisible(false)
  }

  return (
    <ConfigProvider locale={zhCN}>
      <FloatingButton onClick={showDrawer} />

      <ContentDrawer
        visible={drawerVisible}
        onClose={closeDrawer}
        pageContent={pageContent}
      />
    </ConfigProvider>
  )
}
