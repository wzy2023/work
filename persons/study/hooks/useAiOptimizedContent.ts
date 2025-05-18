import { useState, useEffect } from 'react'
import { notification } from 'antd'
import { chat } from '@/utils'
import { type Content } from '@/components/JsonRenderer'

export interface Result {
  error?: string
  loading: boolean
  handleAiOptimize: () => void
  result?: Content[]
  hasCache: boolean
  contentHolder: any
  clearCache: () => void
}

interface UseAiOptimizedProps {
  content: string
  model: string
  manual?: boolean
}

export const useAiOptimizedContent = (props: UseAiOptimizedProps): Result => {
  const { content, manual = true, model } = props

  const url = window.location.href

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [hasCache, setHasCache] = useState<boolean>(false)

  // 生成缓存键，包含 URL、模型和内容的哈希
  const cacheKey = `ai-content-${url}-${model}-${content.length}`

  const [result, setResult] = useState<Content[]>(() => {
    if (typeof window !== 'undefined' && url) {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        setHasCache(true)
        return JSON.parse(cached)
      }
    }
    return []
  })

  // 清除缓存的方法
  const clearCache = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(cacheKey)
      setResult([])
      setHasCache(false)
    }
  }

  // 当 model 或 content 变化时，重置状态
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        setResult(JSON.parse(cached))
        setHasCache(true)
      } else {
        setResult([])
        setHasCache(false)
      }
    }
  }, [model, content])

  // 当result更新时，保存到localStorage
  useEffect(() => {
    if (result && url && typeof window !== 'undefined') {
      localStorage.setItem(cacheKey, JSON.stringify(result))
      setHasCache(true)
    }
  }, [result, url, model, content])

  // 显示通知
  const [api, contentHolder] = notification.useNotification()

  // 监听结果变化，显示通知
  useEffect(() => {
    if (result?.length && !loading) {
      api.success({
        message: 'AI 优化成功',
        description: `使用 ${model} 模型优化内容成功${hasCache ? '（已缓存）' : ''}`,
        placement: 'topRight',
        duration: 0, // 不自动关闭
      })
    }
  }, [result, loading, model, hasCache])

  // 监听错误变化，显示错误通知
  useEffect(() => {
    if (error) {
      api.error({
        message: 'AI 优化失败',
        description: String(error),
        placement: 'topRight',
        duration: 0, // 不自动关闭
      })
    }
  }, [error])

  const handleAiOptimize = async () => {
    if (!content) {
      return
    }

    try {
      setLoading(true)
      setError('')
      setResult(await chat(content, model))

    } catch (error: any) {
      console.error('AI 优化失败:', error)
      setError('优化过程中发生错误，请重试' + error.message)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!manual && content && !loading && !result) {
      handleAiOptimize()
    }
  }, [content, manual, loading, result])

  return {
    error,
    loading,
    result,
    handleAiOptimize,
    hasCache,
    clearCache,
    contentHolder,
  }
}
