'use client'

import React from 'react'

import { Button, DeleteOutlined, Layout, message, Steps } from '@/components'
import { StepContent } from './components/StepContent'

// import { ai302 } from '@/utils'
// import { aiModel } from './config'
import { STEP_TYPES } from './consts'

import { type StepConfig } from './types'
import { useProductStore } from './store'
import { disabledColumns, getHistoryAnswer } from './utils'

const { Step } = Steps
const { Header, Footer, Content } = Layout

export default () => {
  const {
    steps,
    step,
    stepData,
    loading,
    setLoading,
    setContent,
    setColumns,
    setValues,
    appendColumns,
    clearCache,
    onNext,
    onPrev,
  } = useProductStore()

  const currentStep = steps[step.current]
  const currentStepData = stepData.find(item => item.key === currentStep?.key)

  const nextStep = steps[step.current + 1]
  const nextStepData = stepData.find(item => item.key === nextStep?.key)

  const onClearCache = () => {
    clearCache()
    message.success('缓存已清除')
  }

  const onSubmit = async () => {
    if (step.current < 0 || step.current >= steps.length) {
      return
    }

    if (!currentStepData || !currentStep) {
      return
    }

    const prevStep = steps[step.current - 1]
    const prevStepData = stepData.find(item => item.key === prevStep?.key)

    switch (currentStep.type) {
      case STEP_TYPES.QUESTION:
        if (!('columns' in currentStepData) || !('values' in currentStepData)) {
          return
        }

        const { values, columns } = currentStepData
        const answer = getHistoryAnswer(columns, values)

        setLoading(true)
        const prompt = currentStep.prompt?.(answer)

        if (!prompt) {
          return
        }

        // const newColumns = await ai302.chat(prompt, aiModel)

        // if (Array.isArray(newColumns) && currentStep.key) {
        //   appendColumns(currentStep.key, newColumns)
        // }

        setLoading(false)
        break

      case STEP_TYPES.MARKDOWN:
        if (!('content' in currentStepData)) {
          return
        }

        let content = currentStepData.content

        if (prevStepData) {
          if (prevStep?.type === 'question' && 'columns' in prevStepData && 'values' in prevStepData) {
            const { values, columns } = prevStepData
            content = getHistoryAnswer(columns, values, false)
          }

          if (prevStep?.type === 'markdown' && 'content' in prevStepData) {
            content = prevStepData.content
          }
        }

        setLoading(true)
        const promptNext = currentStep.prompt?.(content)

        if (!promptNext) {
          return
        }

        // const res_ = await ai302.chat(promptNext, aiModel, false)

        // if (currentStep.key) {
        //   setContent(currentStep.key, res_ || '')
        // }

        setLoading(false)
        break
    }
  }

  const onNext_ = () => {
    if (currentStepData && 'columns' in currentStepData && nextStepData?.key && nextStep?.type === 'question') {
      setValues(nextStepData.key, currentStepData.values)
      setColumns(nextStepData.key, disabledColumns(currentStepData.columns))
    }
    onNext()
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ padding: 16, background: '#fff' }}>
        <Steps current={step.current}>
          {steps.map((item: StepConfig) => (
            <Step key={item.key} title={item.title} />
          ))}
        </Steps>
      </Header>

      <Content style={{ padding: 24, overflow: 'auto' }}>
        <StepContent />
      </Content>

      <Footer
        style={{
          padding: 16,
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          icon={<DeleteOutlined />}
          danger
          onClick={onClearCache}
          style={{ marginRight: 'auto' }}
        >
          清除缓存
        </Button>

        <div style={{ display: 'flex', gap: 12 }}>
          {step.current > 0 && (
            <Button onClick={onPrev}>上一步</Button>
          )}

          <Button type='primary' loading={loading} onClick={onSubmit}>
            AI 生成
          </Button>

          {step.current < (steps.length - 1) && (
            <Button
              onClick={onNext_}
            >
              下一步
            </Button>
          )}
        </div>
      </Footer>
    </Layout>
  )
}
