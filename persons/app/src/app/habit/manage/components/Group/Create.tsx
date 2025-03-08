import { useState } from 'react'

import { Button, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { BetaSchemaForm } from '@ant-design/pro-components'

import { useBoolean } from 'ahooks'

import { api } from '@/api/react'

interface CreateProps {
  onSuccess?: () => void
}

interface Values {
  name: string
  color: string
}

export const Create = (props: CreateProps) => {
  const { onSuccess } = props

  const [isModalOpen, { setTrue, setFalse }] = useBoolean(false)

  const [values, setValues] = useState<Values>()

  const createState = api.habit.group.create.useMutation({
    onSuccess: () => {
      message.success('创建成功')
      onSuccess?.()
    },
  })

  const onOk = async () => {
    if (!values) {
      return
    }
    await createState.mutateAsync(values)
    setFalse()
  }

  return (
    <>
      <Modal title='创建分组' open={isModalOpen} onCancel={setFalse} onOk={onOk}>
        <BetaSchemaForm<Values>
          submitter={false}
          onValuesChange={(_, values) => {
            const { color, ...rest } = values
            setValues({
              ...rest,
              // @ts-ignore
              color: color?.toHex(),
            })
          }}
          layout='horizontal'
          columns={[
            {
              title: '标题',
              dataIndex: 'name',
              formItemProps: {
                rules: [{ required: true, message: '请输入标题' }],
              },
            },
            {
              title: '颜色',
              dataIndex: 'color',
              valueType: 'color',
              formItemProps: {
                rules: [{ required: true, message: '请选择颜色' }],
              },
              fieldProps: {
                showText: true,
                format: 'hex',
                defaultFormat: 'hex',
                presets: [
                  {
                    label: '暖色系',
                    colors: ['#FF6B6B', '#FFB347', '#FF8C42', '#FFA07A', '#FF7F50', '#FF6347', '#FF4500', '#FF8066'],
                    defaultOpen: true,
                    key: 'warm',
                  },
                  {
                    label: '冷色系',
                    colors: ['#4ECDC4', '#45B7D1', '#96CEB4', '#2F9BC1', '#5F9EA0', '#4682B4', '#6495ED', '#1E90FF'],
                    defaultOpen: true,
                    key: 'cool',
                  },
                  {
                    label: '柔和色系',
                    colors: ['#FFEEAD', '#D4A5A5', '#9B89B3', '#79BD9A', '#A8D8B9', '#E6B89C', '#B4A8C4', '#CFB997'],
                    defaultOpen: true,
                    key: 'soft',
                  },
                  {
                    label: '优雅色系',
                    colors: ['#DDA0DD', '#9370DB', '#BA55D3', '#8B008B', '#C71585', '#800080', '#663399', '#D87093'],
                    defaultOpen: true,
                    key: 'elegant',
                  },
                  {
                    label: '梦幻色系',
                    colors: ['#E6E6FA', '#B0E0E6', '#F0E68C', '#FFB6C1', '#DDA0DD', '#E0FFFF', '#FFF0F5', '#FFE4E1'],
                    defaultOpen: true,
                    key: 'dreamy',
                  },
                ],
              },
            },
          ]}
        />
      </Modal>

      <Button type='primary' icon={<PlusOutlined />} onClick={setTrue}>
        添加习惯分组
      </Button>
    </>
  )
}
