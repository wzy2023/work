import React from 'react'
import { Space, SpaceProps } from 'antd'

export type SpaceProProps = SpaceProps

export const SpacePro = (props: SpaceProProps) => {
  return (
    <Space
      style={{ width: '100%' }}
      {...props}
    />
  )
}
