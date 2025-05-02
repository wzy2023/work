export enum ValueType {
  Checkbox = 'checkbox',
  Radio = 'radio',
  Textarea = 'textarea',
}

export interface Column {
  dataIndex: string
  title: string
  valueType: ValueType
  disabled: boolean
  fieldProps: any
  valueEnum?: { [key in string]: { text: string } }
}

export interface StepConfig {
  type: 'question' | 'markdown'
  title: string
  key: string
  prompt?: (options: string) => string
  initData: any
}

// 问题步骤数据
export interface QuestionStepData {
  key: string
  columns: Column[]
  values: Record<string, any>
}

// Markdown步骤数据
export interface MarkdownStepData {
  key: string
  content: string
}

// 步骤数据联合类型
export type StepDataItem = QuestionStepData | MarkdownStepData
