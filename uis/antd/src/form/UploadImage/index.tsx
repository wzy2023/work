'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Modal, Popover, Space, Typography } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

interface UploadImageProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  maxImages?: number;
  enableDragDrop?: boolean;
  enableFileSelect?: boolean;
  enablePaste?: boolean;
  enablePasteTip?: boolean;
}

export const UploadImage = (props: UploadImageProps) => {
  const {
    value = [],
    onChange,
    maxImages = 10,
    enableDragDrop = false,
    enableFileSelect = false,
    enablePaste = true,
    enablePasteTip = false,
  } = props

  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!enablePaste) return

    const handlePaste = (event: ClipboardEvent) => {
      if (event.clipboardData && event.clipboardData.items) {
        const items = event.clipboardData.items
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile()
            if (file) {
              convertToBase64(file)
            }
          }
        }
      }
    }

    document.addEventListener('paste', handlePaste)
    return () => {
      document.removeEventListener('paste', handlePaste)
    }
  }, [value, enablePaste])

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!enableDragDrop) return
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (!enableDragDrop) return
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!enableDragDrop) return
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileList = Array.from(e.dataTransfer.files)
      fileList.forEach((file) => {
        if (file.type.match('image.*')) {
          convertToBase64(file)
        }
      })
    }
  }

  const handleClick = () => {
    if (!enableFileSelect) return
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!enableFileSelect) return
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files)
      fileList.forEach((file) => {
        if (file.type.match('image.*')) {
          convertToBase64(file)
        }
      })
    }
  }

  const handlePasteButton = () => {
    if (!enablePaste) return
    navigator.clipboard.read().then((clipboardItems) => {
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith('image/')) {
            clipboardItem.getType(type).then((blob) => {
              convertToBase64(blob)
            })
          }
        }
      }
    }).catch(error => {
      console.error('读取剪贴板失败:', error)
      alert('读取剪贴板失败。请尝试使用 Ctrl+V 粘贴或手动上传图片。')
    })
  }

  const convertToBase64 = (file: File | Blob) => {
    if (value.length >= maxImages) {
      alert(`最多允许上传 ${maxImages} 张图片。`)
      return
    }

    compressImage(file).then(compressedFile => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        if (!value.includes(base64String)) {
          onChange([...value, base64String])
        }
      }
      reader.readAsDataURL(compressedFile)
    })
  }

  const compressImage = (file: File | Blob): Promise<Blob> => {
    return new Promise((resolve) => {
      const originalSize = file.size / 1024

      const img = new Image()
      img.src = URL.createObjectURL(file)

      img.onload = () => {
        URL.revokeObjectURL(img.src)

        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // 计算压缩比例，保持宽高比
        const maxWidth = 1200
        const maxHeight = 1200

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = width * ratio
          height = height * ratio
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        // 转换为blob，压缩质量为0.8
        canvas.toBlob(
          (blob) => {
            // 获取压缩后的图片大小
            const compressedSize = blob.size / 1024
            console.log(`原始图片: ${originalSize.toFixed(2)} KB => ${compressedSize.toFixed(2)} KB`)
            console.log(`压缩到了: ${((compressedSize / originalSize) * 100).toFixed(2)}%`)
            resolve(blob)
          },
          'image/jpeg',
          0.8,
        )
      }
    })
  }

  const handleRemoveImage = (index: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '您确定要删除这张图片吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        const newImages = [...value]
        newImages.splice(index, 1)
        onChange(newImages)
      },
    })
  }

  return (
    <div className='w-full space-y-4'>
      <div className='flex flex-wrap gap-3'>
        {value.map((image, index) => (
          <div
            key={index}
            className='relative'
            style={{ width: '100px', height: '100px' }}
          >
            <Popover
              trigger='hover'
              placement='top'
              content={(
                <img
                  src={image}
                  alt={`预览图片 ${index + 1}`}
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                  }}
                />
              )}
            >
              <div className='rounded border overflow-hidden h-full w-full relative group'>
                <img
                  src={image}
                  alt={`上传图片 ${index + 1}`}
                  className='w-full h-full object-cover'
                />
                <Button
                  type='text'
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveImage(index)
                  }}
                  style={{ position: 'absolute', top: 0, right: 0 }}
                  className='absolute top-0 right-0 bg-black/40 text-white border-none hover:bg-black/60'
                  size='small'
                />
              </div>
            </Popover>
          </div>
        ))}

        {value.length < maxImages && (
          <Space style={{ width: '100%' }}>
            {enableFileSelect && (
              <div
                className={`border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragging && enableDragDrop ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
                }`}
                onDragOver={enableDragDrop ? handleDragOver : undefined}
                onDragLeave={enableDragDrop ? handleDragLeave : undefined}
                onDrop={enableDragDrop ? handleDrop : undefined}
                onClick={handleClick}
                style={{ width: '50px', height: '50px' }}
              >
                <PlusOutlined style={{ fontSize: '24px', color: '#8c8c8c' }} />
                <Typography.Text type='secondary' className='mt-1'>上传</Typography.Text>
              </div>
            )}

            {enablePaste && (
              <div
                style={{ width: '50px', height: '50px' }}
                className={`border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
                }`}
                onClick={handlePasteButton}
              >
                <PlusOutlined style={{ fontSize: '24px', color: '#8c8c8c' }} />
                <Typography.Text type='secondary' className='mt-1'>粘贴</Typography.Text>
              </div>
            )}
          </Space>
        )}
      </div>

      {enableFileSelect && (
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          accept='image/*'
          multiple
          style={{ display: 'none' }}
        />
      )}

      {(enablePasteTip && enablePaste) && (
        <Alert
          type='info'
          showIcon
          message={
            <Typography.Text type='secondary'>
              提示：您也可以在任意位置按下 <kbd style={{
              padding: '0.1rem 0.4rem',
              background: '#f5f5f5',
              border: '1px solid #d9d9d9',
              borderRadius: '3px',
              fontSize: '12px',
            }}>Ctrl</kbd> + <kbd style={{
              padding: '0.1rem 0.4rem',
              background: '#f5f5f5',
              border: '1px solid #d9d9d9',
              borderRadius: '3px',
              fontSize: '12px',
            }}>V</kbd> 从剪贴板粘贴图片
            </Typography.Text>
          }
        />
      )}
    </div>
  )
}
