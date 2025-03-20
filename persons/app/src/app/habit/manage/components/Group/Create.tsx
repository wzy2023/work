import { Button, Form, Modal, PlusOutlined, BetaSchemaForm } from '@/components'

import { useBoolean } from 'ahooks'

import { useHabitGroupCRUD } from '@/api/generated/store'

interface Values {
  name: string
  color: string
}

interface CreateProps {
  onSuccess: () => void
}

export const Create = (props: CreateProps) => {
  const { onSuccess } = props

  const [form] = Form.useForm<Values>()

  const [isModalOpen, { setTrue, setFalse }] = useBoolean(false)

  const { createState } = useHabitGroupCRUD({
    list: false,
    create: {
      onSuccess: () => {
        setFalse()
        onSuccess?.()
      },
    },
  })

  const onOk = async () => {
    await form.validateFields()

    const values = form.getFieldsValue()
    values.color = (values.color as any)?.toHex()

    createState.mutate(values)
  }

  return (
    <>
      <Modal title='创建分组' open={isModalOpen} onCancel={setFalse} onOk={onOk}>
        <BetaSchemaForm<Values>
          form={form}
          submitter={false}
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
              fieldProps: {
                showText: true,
                style: {
                  width: 110,
                  display: 'flex',
                },
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
