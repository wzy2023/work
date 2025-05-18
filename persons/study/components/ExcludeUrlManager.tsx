import React, { useState, useEffect } from 'react'

import { Input, Button, Typography, message, Modal, List, Spin, Tooltip, Popconfirm } from 'antd'
import { PlusOutlined, DeleteOutlined, ReloadOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

import { extractDomain } from '@/utils'
import { useExcludeUrlStore } from '@/store'

export const ExcludeUrlManager = ({ onClose }: any) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newUrl, setNewUrl] = useState<string>('')

  const { excludeUrls, addExcludeUrl, removeExcludeUrl } = useExcludeUrlStore()

  const handleExcludeUrl = () => {
    const domain = extractDomain(window.location.href)

    // 添加到排除列表
    addExcludeUrl(domain)

    message.success(`已将域名 ${domain} 添加到排除列表`)
    onClose()

    window.dispatchEvent(new CustomEvent('exclude-url-updated'))
  }

  // 用于触发UI更新的状态
  const [refreshKey, setRefreshKey] = useState(0)

  const refreshList = () => {
    setLoading(true)
    // 触发一次状态更新，确保从存储中重新获取数据
    setTimeout(() => {
      setRefreshKey(prev => prev + 1)
      setLoading(false)
    }, 300)
  }

  const handleAddUrl = () => {
    if (!newUrl.trim()) {
      message.error('请输入有效的URL或域名')
      return
    }

    try {
      // 提取域名
      const domain = extractDomain(newUrl)

      if (!domain) {
        message.error('无法提取有效的域名')
        return
      }

      // 添加域名到排除列表
      addExcludeUrl(domain)
      setNewUrl('')
      message.success(`已添加域名 ${domain} 到排除列表`)
      refreshList() // 刷新列表

      // 如果当前页面是这个域名，立即更新
      if (window.location.hostname === domain) {
        window.dispatchEvent(new CustomEvent('exclude-url-updated'))
      }
    } catch (error) {
      message.error('请输入有效的URL或域名')
    }
  }

  const handleDeleteUrl = (url: string) => {
    removeExcludeUrl(url)
    message.success('已从排除列表中删除')
    refreshList() // 刷新列表
  }

  const showModal = () => {
    setVisible(true)
    refreshList() // 打开模态框时刷新列表
  }

  const closeModal = () => {
    setVisible(false)
  }

  // 确保组件初始化时获取存储的数据
  useEffect(() => {
    if (visible) {
      refreshList()
    }
  }, [visible])

  return (
    <>
      <Popconfirm
        title='排除此网站'
        description='确定要排除此网站吗？这将使扩展按钮在此网站的所有页面不再显示。'
        onConfirm={handleExcludeUrl}
        okText='确定'
        cancelText='取消'
      >
        <Tooltip title='将此网站添加到排除列表'>
          <Button icon={<EyeInvisibleOutlined />} type='text'>
            排除此网站
          </Button>
        </Tooltip>
      </Popconfirm>

      <Button
        icon={<PlusOutlined />}
        type='text'
        onClick={showModal}
      >
        添加排除URL
      </Button>

      <Modal
        title='管理排除域名列表'
        open={visible}
        onCancel={closeModal}
        footer={null}
        width={700}
      >
        <Typography.Paragraph>
          添加不希望显示扩展按钮的网站域名。
          系统会自动提取域名部分（例如 example.com）。
        </Typography.Paragraph>

        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <Input
            placeholder='输入要排除的URL或域名'
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onPressEnter={handleAddUrl}
            style={{ marginRight: '8px', flex: 1 }}
          />
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={handleAddUrl}
          >
            添加
          </Button>

          <Button
            icon={<ReloadOutlined />}
            onClick={refreshList}
            style={{ marginLeft: '8px' }}
          >
            刷新
          </Button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin tip='加载中...' />
          </div>
        ) : (
          <List
            bordered
            dataSource={excludeUrls}
            key={refreshKey}
            locale={{ emptyText: '暂无排除的域名' }}
            renderItem={(url) => (
              <List.Item
                actions={[
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteUrl(url)}
                    type='text'
                  >
                    删除
                  </Button>,
                ]}
              >
                {url}
              </List.Item>
            )}
          />
        )}
      </Modal>
    </>
  )
}
