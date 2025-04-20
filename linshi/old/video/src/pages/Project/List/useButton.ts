import { ButtonProps } from '@/components'
import { useState } from 'react'
import { delay } from '@/utils'

const useButton = (props: ButtonProps, option?: any) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [isShow, setIsShow] = useState(option?.isShow ?? true)

  const handleClick = async () => {
    if (!props.onClick) {
      return
    }

    try {
      setLoading(true)
      await props.onClick?.()
    } catch (error) {
      console.error('Error in button click handler:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    isShow,
    setIsShow,
    setLoading,
    setDisabled,
    buttonProps: {
      ...props,
      loading,
      disabled,
      onClick: handleClick,
    },
  }
}

const { buttonProps, isShow, setIsShow } = useButton({
  type: 'primary',
  children: '按钮',
  onClick: async () => {
    await delay(1000)
    setIsShow(false)
  },
})
