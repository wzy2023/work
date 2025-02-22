import React from 'react'
import { Image, ImageProps } from 'antd'

export type ImageProProps = ImageProps

export const ImagePro = (props: ImageProProps) => {
  const { preview = false } = props

  return (
    <Image
      {...props}
      preview={preview}
    />
  )
}
