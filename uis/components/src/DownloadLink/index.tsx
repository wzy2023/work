import React from 'react'

interface DownloadLinkProps {
  url: string
  filename?: string
}

export const DownloadLink = ({ url, filename }: DownloadLinkProps) => {
  const handleDownload = (e: any) => {
    e.preventDefault()
    fetch(url, { method: 'GET' })
    .then(response => response.blob())
    .then(blob => {
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = filename || '下载文件'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(downloadUrl)
    })
    .catch((err) => {
      console.log(666, err)
      alert('下载失败')
    })
  }

  return (
    <a href={url} onClick={handleDownload}>
      下载
    </a>
  )
}
