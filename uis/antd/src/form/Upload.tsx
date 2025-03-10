'use client'

import React from 'react'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { generateUniqueFileName } from '@wzyjs/utils'

interface item {
  name: string
  url: string
  status: string
}

interface UploadFormItemProps {
  oss: any
  multiple?: boolean,
  mode?: 'image' | 'video'
  value?: item[]
  onChange?: (value: item[]) => void
}

export const UploadFormItem = (props: UploadFormItemProps) => {
  const { oss, mode = 'image', multiple = true, onChange } = props

  const accept = mode === 'image' ? '.jpg,.png,.jpeg' : '.mp4,.mov'

  const onUpload = async (info: any) => {
    onChange?.(info.fileList.map((item: any) => ({
      name: item?.response.name,
      url: item?.response.url,
    })))
  }

  const customRequest = async ({ file, onSuccess }: any) => {
    const newName = generateUniqueFileName(file.name)
    const result = await oss.put(newName, file, {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable', // 设置缓存时间为365天
      },
    })
    onSuccess(result)
  }

  return (
    <Upload.Dragger
      multiple={multiple}
      accept={accept}
      listType='picture-card'
      onChange={onUpload}
      customRequest={customRequest}
    >
      <p className='ant-upload-drag-icon'>
        <InboxOutlined />
      </p>
      <p className='ant-upload-text'>
        <span>点击或拖拽文件到这里以上传</span>
      </p>
      {mode === 'image' && (
        <p className='ant-upload-hint'>支持上传多张 JPG 或者 PNG 格式的照片</p>
      )}
      {mode === 'video' && (
        <p className='ant-upload-hint'>支持上传多个 MP4 或者 MOV 格式的视频</p>
      )}
    </Upload.Dragger>
  )
}
