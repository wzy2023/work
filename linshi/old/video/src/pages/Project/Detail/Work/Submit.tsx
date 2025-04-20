import React, { useEffect, useMemo } from 'react'
import { useParams } from '@umijs/max'

import { FormPro, ImagePro, Space, Spin, Tabs, Checkbox, Video } from '@wzyjs/component-web'

import { account } from '@/apis'
import { useRequestPro, useSetting } from '@/hooks'

import { Params } from '../../types'
import { projectSettingMap } from '@/pages/Project/Detail/config'

interface SubmitProps {
  data: any
  value: any[]
  onChange: (values: any) => void
}

export const Submit = (props: SubmitProps) => {
  const { projectId } = useParams<Params>()

  const { data, value, onChange } = props

  const platformListState = useRequestPro(account.getPlatformList)

  const accountListState = useRequestPro(() => account.list({
    where: { project: { id: projectId } },
  }))

  const [setting, setSetting] = useSetting(`work.submit.value.${projectId}.${data.id}`, [])

  const accountList = useMemo(() => {
    return accountListState.data?.data.filter((item: any) => {
      const { label, config } = platformListState.data?.options?.find(i => i.value === item.platform) || {}
      if (!config) {
        return false
      }

      item.config = config
      item.label = label
      return true
    })
  }, [accountListState.data?.data, platformListState.data?.options])

  useEffect(() => {
    if (data && !value.length) {
      onChange((accountList || []).map(item => {
        const oldData = setting?.find(i => i.accountId === item.id)
        return {
          accountId: item.id,
          enable: oldData?.enable ?? true,
          form: oldData?.form || {
            title: data.title,
            desc: data.desc,
            tags: projectSettingMap[projectId]?.tags ?? [],
          },
        }
      }))
    }
  }, [value, data, accountList, setting])

  useEffect(() => {
    if (value.some(i => i.form.title) || value.some(i => i.form.desc)) {
      setSetting(value)
    }
  }, [value])

  return (
    <div>
      <Space>
        <div style={{ fontWeight: 700 }}>视频封面</div>
        <div style={{ minHeight: 200, border: 'solid .5px #ddd' }}>
          {data.content.map((item: any, index: number) => (
            <Video url={item.data?.url} />
          ))}
        </div>
      </Space>

      <Spin spinning={accountListState.loading || platformListState.loading}>
        <Tabs style={{ marginTop: 40 }}>
          {accountList?.map((item: any, index) => {
            return (
              <Tabs.TabPane
                key={index}
                tab={(
                  <div>
                    <Checkbox
                      checked={value[index]?.enable}
                      onChange={() => {
                        value[index].enable = !value[index].enable
                        onChange([...value])
                      }}
                    />
                    <span style={{ marginLeft: 5 }}>{`[${item.label}] ${item.name}`}</span>
                  </div>
                )}
              >
                <FormPro
                  layout='horizontal'
                  columns={item.config}
                  submitter={false}
                  labelCol={{ span: 3 }}
                  style={{ marginTop: 30 }}
                  value={value[index]?.form}
                  onValuesChange={(_, allValue) => {
                    if (!value[index]) {
                      value[index] = {}
                    }
                    value[index].id = item.id
                    value[index].form = allValue
                    onChange([...value])
                  }}
                />
              </Tabs.TabPane>
            )
          })}
        </Tabs>
      </Spin>
    </div>
  )
}
