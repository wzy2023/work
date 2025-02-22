import React, { CSSProperties, useRef } from 'react'

interface VideoProps {
  url: string,
  width?: number,
  height?: number,
  style?: CSSProperties
}

export const Video = (props: VideoProps) => {
  const { url, width = 175, height = 310, style } = props

  const videoRef = useRef<HTMLVideoElement>(null)

  if (!url) {
    return null
  }

  return (
    <video
      ref={videoRef}
      width={width}
      height={height}
      style={style}
      onMouseEnter={() => {
        videoRef.current?.play()
      }}
      onMouseLeave={() => {
        videoRef.current?.pause()
      }}
    >
      <source src={url} type='video/mp4' />
    </video>
  )
}
