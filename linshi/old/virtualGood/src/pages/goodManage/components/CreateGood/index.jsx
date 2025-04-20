import React, { useState } from 'react'

import { Tabs, PageHeader, Steps, Layout, message } from 'antd'
import { ButtonGroup } from '@/components'

import Create from './blocks/Create'
import Share from './blocks/Share'
import Grab from './blocks/Grab'
import Generate from './blocks/Generate/index'

import utils from '@/utils'
import { useRequest } from 'ahooks'
import { create, update } from '@/apis/api/good'

export default (props) => {
  const { type, name, record = {}, onClose } = props

  const [data, setData] = useState(record)

  const [steps = []] = utils.useEffectValue(() => {
    const s = [
      { name: '商品基础信息', key: 'base', component: Create },
      { name: '分享网盘资源', key: 'pan', component: Share },
      { name: '生成平台商品', key: 'good', component: Generate },
    ]
    if (type === 'video') {
      s.splice(2, 0, { name: '抓采集豆瓣数据', key: 'dou', component: Grab })
    }
    return s
  })

  const [current = 0, setCurrent] = utils.useEffectValue(() => {
    return Math.min(steps.length - 1, steps.findIndex(item => item.key === record.step) + 1)
  }, [steps])

  const reqState = useRequest(data => data._id ? update(data._id, data) : create(data), {
    manual: true,
  })

  const evs = {
    onChangeData: (value) => {
      setData({ ...data, ...value })
    },
    onSaveDone: async () => {
      if (await evs.onSave(true)) {
        onClose()
      }
    },
    onSaveChangeStep: async (type) => {
      if (await evs.onSave(false, type === 'next')) {
        setCurrent(current => type === 'next' ? current + 1 : current - 1)
      }
    },
    onSave: (isAlertMessage = false, isChangeStep = true) => {
      let newData = data
      if (isChangeStep && current > steps.findIndex(item => item.key === data.step)) {
        newData = {
          ...data,
          step: steps[current].key,
        }
      }
      if (newData.step === 'good') {
        newData.status = '成功'
      }
      return new Promise(async resolve => {
        const res = await reqState.run(newData)
        if (res.success) {
          setData(res.data)
          if (isAlertMessage) {
            message.destroy()
            message.success('保存成功')
          }
        } else {
          message.error('保存失败')
        }
        resolve(res.success)
      })
    },
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Header style={{ background: '#fff', padding: 0 }}>
        <PageHeader
          style={{ paddingTop: 7 }}
          title={Object.keys(record).length ? `修改：${data.base.name}` : `创建${name}商品`}
          subTitle={(
            <Steps size='small' current={current} style={{ margin: '0 30px', width: 950 }}>
              {steps.map((item, index) => (
                <Steps.Step key={index} title={item.name} />
              ))}
            </Steps>
          )}
        />
      </Layout.Header>
      <Layout.Content style={{ overflow: 'scroll' }}>
        <Tabs activeKey={steps[current]?.name} renderTabBar={() => null}>
          {steps.map(({ name, key, component }) => (
            <Tabs.TabPane key={name} tab={name} disabled>
              {React.createElement(component, {
                keyIndex: key,
                data,
                onChange: evs.onChangeData,
              })}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Layout.Content>
      <Layout.Footer style={{ display: 'flex', justifyContent: 'center', background: '#fff', padding: 10 }}>
        <ButtonGroup
          size='large'
          btns={[
            {
              title: '上一步',
              disabled: current === 0,
              onClick: () => evs.onSaveChangeStep('prev'),
            },
            {
              title: '保存',
              onClick: () => evs.onSave(true),
            },
            {
              title: '下一步',
              type: 'primary',
              disabled: current === 1 && !data.pan,
              visible: current < steps.length - 1,
              onClick: () => evs.onSaveChangeStep('next'),
            },
            {
              title: '保存并完成',
              type: 'primary',
              visible: current === steps.length - 1,
              onClick: evs.onSaveDone,
            },
          ]}
        />
      </Layout.Footer>
    </Layout>
  )
}
