import React, { useRef, useState } from 'react'
import { useModel, useParams } from '@umijs/max'

import { ActionType, Button, ButtonPro, Crud, Flex, message, Space, Video as VideoCom, Tag } from '@/components'
import { Submit } from './Submit'

import { work } from '@/apis'
import { Params, WorkPublishStatus } from '../../types'

export default () => {
  const { projectId } = useParams<Params>()

  const actionRef = useRef<ActionType>()

  const [values, setValues] = useState([])

  const { aiChatState, workUpdateState, workSubmitState } = useModel('Project.Detail.Material.model')

  const onClickGenTitle = async (record: any) => {
    const prompt = `
帮我给下面的内容写一个简短有趣的标题和简短有趣的描述；
标题要纯文字，突出最引人注意的点，不要带上表情，语气要夸张幽默有槽点，最好是问句；
描述要小红书风格，带上一些小表情，不要太长
评论要模拟用户发布的有趣的引人点赞的评论

"{{ text }}"

注意：返回格式必须是 JSON { title: string, desc: string, comments: string[] }
除了json内容外其它什么都不要，必须使用 \`\`\`json \`\`\` 包裹`
    const data = await aiChatState.runAsync(prompt.replace('{{ text }}', record.text), 'o1-mini')

    await workUpdateState.runAsync(record.id, data)

    actionRef.current?.reload()
    message.success('生成标题成功')
  }

  return (
    <Crud
      apis={work}
      actionRef={actionRef}
      apiParams={{
        list: {
          project: { id: projectId },
        },
        create: {
          project: projectId,
        },
      }}
      columns={[
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 48,
          fixed: 'left',
        },
        {
          title: '标题',
          dataIndex: 'title',
          hideInSearch: true,
          fixed: 'left',
        },
        {
          title: '描述',
          dataIndex: 'desc',
          valueType: 'textarea',
          hideInSearch: true,
          render: (_, record) => {
            return (
              <div style={{ width: 300 }}>{record?.desc || record?.text}</div>
            )
          },
        },
        {
          title: '发布状态',
          dataIndex: 'status',
          sorter: true,
          initialValue: WorkPublishStatus.Draft,
          valueEnum: {
            published: { text: '已发布' },
            draft: { text: '草稿' },
          },
        },
        {
          title: '内容',
          dataIndex: 'content',
          hideInSearch: true,
          hideInForm: true,
          render: (content: any) => {
            return (
              <Space>
                {content.map((item: any, index: number) => (
                  <VideoCom key={index} width={90} height={160} url={item?.data?.url} />
                ))}
              </Space>
            )
          },
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          valueType: 'dateTime',
          hideInSearch: true,
          hideInForm: true,
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          valueType: 'dateTime',
          hideInSearch: true,
          hideInForm: true,
        },
        {
          title: '操作',
          key: 'option',
          fixed: 'right',
          valueType: 'option',
          render: (_, record) => [
            // <DownloadLink
            //   key='download'
            //   url={record?.content?.[0]?.data?.url}
            //   filename={record?.title || record.desc || record.text}
            // />,
            <Button type='link' loading={aiChatState.loading} onClick={() => onClickGenTitle(record)}>
              生成标题
            </Button>,
            record.status === 'draft' && (
              <ButtonPro.Drawer
                key='submit'
                width='60%'
                btnProps={{
                  type: 'link',
                  children: '发布',
                  onClick: () => {
                    setValues([])
                  },
                }}
                footer={(
                  <Flex justify='flex-end'>
                    <Button
                      type='primary'
                      size='large'
                      loading={workSubmitState.loading}
                      onClick={async () => {
                        await workSubmitState.runAsync({
                          id: record.id,
                          values: values.filter((item: any) => item.enable),
                        })
                        actionRef.current?.reload()
                        message.success('发布成功~')
                      }}
                    >
                      发布
                    </Button>
                  </Flex>
                )}
              >
                <Submit data={record} value={values} onChange={setValues} />
              </ButtonPro.Drawer>
            ),
          ],
        },
      ]}
    />
  )
}
