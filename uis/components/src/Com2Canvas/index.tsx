'use client'

import React, { useEffect, useRef, ReactNode } from 'react'
import html2canvas from 'html2canvas'
import { useDebounceFn } from '@wzyjs/hooks'
import { getRandomColor } from '@wzyjs/utils'

interface Com2CanvasProps {
  children: ReactNode;
  downloadName?: string;
  onChange: (url: string) => void;
}

export const Com2Canvas = (props: Com2CanvasProps) => {
  const { children, downloadName, onChange } = props

  const random = useRef(getRandomColor())
  const htmlId = `h2c_html_${random.current}`
  const canvasId = `htc_canvas_${random.current}`

  const { run } = useDebounceFn(() => {
    const el = document.querySelector(`#${canvasId}`) as HTMLElement
    if (!el) {
      return
    }

    html2canvas(el, {
      allowTaint: true, // 允许污染
      useCORS: true, // 使用跨域(当allowTaint为true时这段代码没什么用)
      scale: 2,
    }).then((canvas: any) => {
      el.innerHTML = ''
      el.appendChild(canvas)

      if (onChange) {
        onChange(canvas.toDataURL('image/png'))
      }

      if (downloadName) {
        el.onclick = () => {
          const a = document.createElement('a')
          a.download = downloadName
          a.href = canvas.toDataURL('image/png')
          document.body.appendChild(a)
          a.click()
          a.remove()
        }
      }
    })
  }, { wait: 500 })

  useEffect(run, [children])

  return (
    <span style={{ position: 'relative' }}>
      <span id={htmlId}>{children}</span>
      <span id={canvasId} style={{ position: 'absolute', top: 0 }} />
    </span>
  )
}
