import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { prompt as defaultPrompt } from '../utils'

const modelOptions = [
  { value: 'gpt-4.1-mini', label: 'GPT-4.1-mini ($0.4)' },
  { value: 'o4-mini', label: 'o4-mini ($1.1)' },
  { value: 'gemini-2.5-pro-preview-05-06', label: 'gemini-2.5-pro ($1.25)' },
  { value: 'gpt-4.1', label: 'GPT-4.1 ($2)' },
  { value: 'claude-3-7-sonnet-20250219', label: 'CLAUDE-3-7-sonnet ($3.3)' },
]

interface AiConfigState {
  model: string
  prompt: string
  modelOptions: typeof modelOptions
  setModel: (model: string) => void
  setPrompt: (prompt: string) => void
  resetPrompt: () => void
}

export const useAiConfigStore = create<AiConfigState>()(
  persist(
    (set) => ({
      model: modelOptions[0].value,
      prompt: defaultPrompt,
      modelOptions,
      setModel: (model: string) => {
        set({ model })
      },
      setPrompt: (prompt: string) => set({ prompt }),
      resetPrompt: () => set({ prompt: defaultPrompt }),
    }),
    {
      name: 'ai-config',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
