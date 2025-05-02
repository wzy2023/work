import React, { useEffect } from 'react'

import { BetaSchemaForm, Form, Markdown } from '@/components'

import { useProductStore } from '../store'
import { STEP_TYPES } from '../consts'
import { type QuestionStepData } from '@/app/product/types'

export const StepContent = () => {
  const { steps, step, stepData, setValues } = useProductStore()

  const [form] = Form.useForm()

  const currentStep = steps[step.current]

  // 从数组中查找匹配key的数据
  const currentStepData = stepData.find(item => item.key === currentStep?.key)

  useEffect(() => {
    if (form) {
      form.setFieldsValue((currentStepData as QuestionStepData)?.values)
    }
  }, [currentStepData, form])

  if (!steps || steps.length === 0 || step.current < 0 || step.current >= steps.length) {
    return <div>步骤配置错误</div>
  }

  if (!currentStepData) {
    return <div>找不到当前步骤的数据</div>
  }

  // 根据步骤类型渲染不同的内容
  switch (currentStep?.type) {
    case STEP_TYPES.QUESTION:
      if ('columns' in currentStepData && 'values' in currentStepData) {
        return (
          <BetaSchemaForm
            form={form}
            layout='vertical'
            columns={currentStepData.columns}
            submitter={false}
            initialValues={currentStepData.values}
            onValuesChange={(_, values) => {
              if (currentStep.key) {
                setValues(currentStep.key, values as Record<string, any>)
              }
            }}
          />
        )
      }
      return null

    case STEP_TYPES.MARKDOWN:
      if ('content' in currentStepData) {
        return (
          <Markdown
            content={currentStepData.content}
          />
        )
      }
      return null

    default:
      return <div>未知的步骤类型: {currentStep?.type || '未定义'}</div>
  }
}
