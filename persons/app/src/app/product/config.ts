import { prompts, STEP_TYPES } from './consts'
import { ValueType, type StepConfig } from './types'

export const aiModel = 'gpt-4.1'
// export const aiModel = 'deepseek-v3-aliyun'
// export const aiModel = 'grok-3'

export const defaultSteps: StepConfig[] = [
  {
    type: STEP_TYPES.QUESTION,
    title: '需求分析',
    key: 'requirement',
    prompt: prompts[0],
    initData: {
      columns: [
        {
          dataIndex: 'content',
          title: '一句话需求',
          valueType: ValueType.Textarea,
        },
      ],
      values: {
        content: '我想做个抓取rss信息的工具网页，我可以添加指定的抓取链接，然后把链接保存到数据库，再用定时任务去抓取这些链接的内容，将内容存到数据库',
      },
    },
  },
  {
    type: STEP_TYPES.QUESTION,
    title: '界面分析',
    key: 'ui',
    prompt: prompts[1],
    initData: {
      columns: [],
      values: {},
    },
  },
  {
    type: STEP_TYPES.MARKDOWN,
    title: '文档生成',
    key: 'document',
    prompt: prompts[2],
    initData: {
      content: '',
    },
  },
  {
    type: STEP_TYPES.MARKDOWN,
    title: '技术方案',
    key: 'technical',
    prompt: prompts[3],
    initData: {
      content: '',
    },
  },
]
