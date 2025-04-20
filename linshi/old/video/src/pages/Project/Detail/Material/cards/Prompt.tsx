import React from 'react'
import { useModel } from '@umijs/max'

import { CardPro, Button, DeleteOutlined, Image, message, Spin, Tag } from '@/components'
import { useEffectValue } from '@/hooks'

import { MaterialStatus } from '../../../types'
import { useIsShow, useAutoRefresh, useCardExtra } from '../hooks'

interface PromptProps {
  active: boolean
  data: any
}

export const Prompt = (props: PromptProps) => {
  const { data, active } = props

  const { info } = useAutoRefresh(data) as any

  const { renderExtra, style } = useCardExtra(info, active)

  const { materialUpdateState, materialListState } = useModel('Project.Detail.Material.model')

  const [isEn, setIsEn] = useEffectValue(!info.data?.zh, () => {
    return !info.data?.zh
  }, [info.data?.zh])

  if (useIsShow(data)) {
    return null
  }

  const onDoubleClick = () => {
    if (!info.data?.zh) {
      message.error('暂无中文提示词')
      return
    }
    setIsEn(!isEn)
  }

  const onClickDeleteImg = async (index: number) => {
    await materialUpdateState.runAsync(info.id, {
      data: {
        ...info.data,
        urls: info.data.urls.filter((_: any, i: number) => i !== index),
      },
    })
    materialListState.refresh()
  }

  return (
    <Spin spinning={info.status === MaterialStatus.Doing}>
      <CardPro
        size='small'
        style={style}
        collapsedHeight={312}
        extra={renderExtra()}
        title={<Tag color='blue'>提示词</Tag>}
      >
        <div onDoubleClick={onDoubleClick}>
          {isEn ? info.data?.en : info.data?.zh}
        </div>
        <div>
          {info.data?.urls?.map((item: any, index: number) => (
            <div>
              <Image key={index} preview={false} width={63} src={item} />
              <Button type='text' icon={<DeleteOutlined />} onClick={() => onClickDeleteImg(index)} />
            </div>
          ))}
        </div>
      </CardPro>
    </Spin>
  )
}
