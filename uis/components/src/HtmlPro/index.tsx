import React, { CSSProperties } from 'react'

export interface HtmlProProps {
  html: string;
  style?: CSSProperties
}

export const HtmlPro = (props: HtmlProProps) => {
  const { html, style = {} } = props
  return (
    <div
      style={{ minWidth: '100%', ...style }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
