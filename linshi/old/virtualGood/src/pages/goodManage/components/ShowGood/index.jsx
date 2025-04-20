import React, { useState } from 'react'
import { Layout, PageHeader, Tabs, Descriptions, Typography, Spin, message } from 'antd'
import { ButtonGroup, Com2Canvas } from '@/components'
import MasterImg from '../../image/master'
import { send } from '@/apis/api/send'
import { useRequest } from 'ahooks'

export default (props) => {
  const { record } = props

  const [activeKey, setActiveKey] = useState('pdd')

  const sendState = useRequest(send, {
    manual: true,
    onSuccess: res => {
      if (res.success) {
        message.success(`发布成功，商品id: ${res.data}`)
      } else {
        message.error('发布失败')
      }
    },
  })

  return (
    <Spin spinning={sendState.loading}>
      <Layout style={{ height: '100%' }}>
        <Layout.Header style={{ background: '#fff', padding: 0 }}>
          <PageHeader
            style={{ paddingTop: 7 }}
            title={`查看：${record?.base.name}`}
          />
        </Layout.Header>
        <Layout.Content style={{ overflow: 'scroll', margin: '0 20px' }}>
          <Tabs activeKey={activeKey} onChange={setActiveKey}>
            {Object.entries(record?.good || {}).map(item => (
              <Tabs.TabPane key={item[0]} tab={item[1].platform}>
                <Descriptions bordered style={{ background: '#fff' }}>
                  <Descriptions.Item label='标题' span={3}>
                    <Typography.Paragraph copyable>{item[1].name}</Typography.Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item label='拼单价'>
                    <Typography.Paragraph copyable>{item[1].price[0]}</Typography.Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item label='单买价'>
                    <Typography.Paragraph copyable>{item[1].price[1]}</Typography.Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item label='原价'>
                    <Typography.Paragraph copyable>{item[1].price[1] * 5}</Typography.Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item label='网盘' span={3} style={{ whiteSpace: 'pre' }}>
                    <Typography.Paragraph copyable>{record?.pan?.share?.content}</Typography.Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item label='主图'>
                    <div style={{ width: 240 }}>
                      <Com2Canvas downloadName={item[1].name.substr(0, item[1].name.indexOf(' '))}>
                        <MasterImg {...item[1].image_master} size={240} />
                      </Com2Canvas>
                    </div>
                  </Descriptions.Item>
                </Descriptions>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </Layout.Content>
        <Layout.Footer style={{ display: 'flex', justifyContent: 'center', background: '#fff', padding: 10 }}>
          <ButtonGroup
            size='large'
            btns={[
              {
                type: 'primary',
                title: `发布到 ${activeKey}`,
                onClick: () => {
                  sendState.run(activeKey, record)
                },
              },
            ]}
          />
        </Layout.Footer>
      </Layout>
    </Spin>
  )
}
