import { create } from 'zustand'
import { defaultSteps } from './config'
import { _ } from '@/utils'
import type { StepDataItem, StepConfig, Column, QuestionStepData } from './types'
import { persist, createJSONStorage } from 'zustand/middleware'
import { disabledColumns } from '@/app/product/utils'

// LocalStorage键名
const STORAGE_KEY = 'product-steps-data'

interface ProductStoreValue {
  loading: boolean
  setLoading: (loading: boolean) => void

  steps: StepConfig[]
  setSteps: (steps: StepConfig[]) => void

  // 修改：将stepData改为数组形式
  stepData: StepDataItem[]

  // 将操作方法移到外部
  setColumns: (key: string, columns: Column[]) => void
  appendColumns: (key: string, columns: Column[]) => void

  setValues: (key: string, values: Record<string, any>) => void

  setContent: (key: string, content: string) => void

  // 新增：清除缓存方法
  clearCache: () => void

  step: {
    current: number
  },
  onNext: () => void
  onPrev: () => void
}

export const useProductStore = create<ProductStoreValue>()(
  persist(
    (set) => ({
      loading: false,
      setLoading: (loading: boolean) => set(() => ({
        loading,
      })),

      steps: defaultSteps,
      setSteps: (steps: StepConfig[]) => set(() => ({ steps })),

      step: {
        current: 0,
      },
      onNext: () => set((state) => ({
        step: {
          ...state.step,
          current: Math.min(state.step.current + 1, state.steps.length - 1),
        },
      })),
      onPrev: () => set((state) => ({
        step: {
          ...state.step,
          current: Math.max(state.step.current - 1, 0),
        },
      })),

      stepData: defaultSteps.map(item => ({
        key: item.key,
        ...item.initData,
      })),

      setColumns: (key: string, columns: Column[]) => set((state) => {
        const newStepData = [...state.stepData]
        const index = newStepData.findIndex(item => item.key === key)

        if (index !== -1 && newStepData[index] && 'columns' in newStepData[index]) {
          newStepData[index] = {
            ...newStepData[index],
            columns,
          }
        }

        return { stepData: newStepData }
      }),

      setValues: (key: string, values: Record<string, any>) => set((state) => {
        const newStepData = [...state.stepData]
        const index = newStepData.findIndex(item => item.key === key)

        if (index !== -1 && newStepData[index] && 'values' in newStepData[index]) {
          newStepData[index] = {
            ...newStepData[index],
            values,
          }
        }

        return { stepData: newStepData }
      }),

      appendColumns: (key: string, columns: Column[]) => set((state) => {
        const newStepData = [...state.stepData]
        const index = newStepData.findIndex(item => item.key === key)

        if (index !== -1 && newStepData[index] && 'columns' in newStepData[index]) {
          const item = newStepData[index] as QuestionStepData
          newStepData[index] = {
            ...item,
            columns: _.unionBy([...disabledColumns(item.columns), ...columns], 'dataIndex'),
          }
        }

        return { stepData: newStepData }
      }),

      setContent: (key: string, content: string) => set((state) => {
        const newStepData = [...state.stepData]
        const index = newStepData.findIndex(item => item.key === key)

        if (index !== -1 && newStepData[index] && 'content' in newStepData[index]) {
          newStepData[index] = {
            ...newStepData[index],
            content,
          }
        }

        return { stepData: newStepData }
      }),

      clearCache: () => {
        localStorage.removeItem(STORAGE_KEY)
        set(() => ({
          stepData: defaultSteps.map(item => ({
            key: item.key,
            ...item.initData,
          })),
        }))
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        stepData: state.stepData,
        step: {
          current: state.step.current,
        },
      }),
    },
  )
)
