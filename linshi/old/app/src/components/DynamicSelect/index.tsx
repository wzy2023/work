import React from 'react'
import { AutoComplete, Button } from '@/components'
import { Option } from '@/types'

interface DynamicSelectProps {
  value?: string[]
  onChange?: (value: string[]) => void
  options?: Option[]
}

export const DynamicSelect = (props: DynamicSelectProps) => {
  const { value = [''], onChange, options } = props

  const removeOption = (index: number) => {
    const newOptions = [...value]
    newOptions.splice(index, 1)
    onChange?.(newOptions)
  }

  const handleChange = (index: number, val: string) => {
    const newValue = [...[...value].slice(0, index), val]
    onChange?.(newValue)

    if (newValue.every(item => item)) {
      onChange?.([...newValue, ''])
    }
  }

  const getOptions = (options: Option[], index: number): Option[] => {
    if (index === 0) {
      return options
    }

    return getOptions(options.find(item => item.value === value[value.length - 1 - index])?.children || [], index - 1)
  }

  return (
    <div>
      {value.map((val, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <AutoComplete
            style={{ width: 400, marginRight: 10 }}
            value={val}
            onChange={val => handleChange(index, val)}
          />

          {index !== 0 && (
            <Button
              type='text'
              danger
              size='small'
              onClick={() => removeOption(index)}
            >
              删除
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
