import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import Form from './Form'

export default (props) => {
  const { data = {}, onChange = () => undefined } = props
  const [values, setValues] = useState(data.good || {})

  useEffect(() => {
    onChange({ good: values })
  }, [values])

  return (
    <Tabs style={{ margin: '0 20px' }} defaultActiveKey='pdd'>
      <Tabs.TabPane key='pdd' tab='拼多多'>
        <Form value={values.pdd} data={data} onChange={pdd => {
          pdd.platform = '拼多多'
          setValues({ ...values, pdd })
        }} />
      </Tabs.TabPane>
      <Tabs.TabPane key='tb' tab='淘宝' disabled>
        <Form value={values.tb} data={data} onChange={tb => {
          tb.platform = '淘宝'
          setValues({ ...values, tb })
        }} />
      </Tabs.TabPane>
      <Tabs.TabPane key='wxmini' tab='小程序' disabled>
        <Form value={values.wxmini} data={data} onChange={wxmini => {
          wxmini.platform = '微信小程序'
          setValues({ ...values, wxmini })
        }} />
      </Tabs.TabPane>
    </Tabs>
  )
}
