import React, { useEffect, useRef } from 'react'
import utils from '@/utils'
import html2canvas from 'html2canvas'
import { useDebounceFn } from 'ahooks'

export default (props) => {
  const { children, downloadName, onChange } = props

  const random = useRef(utils.getRandomColor())
  const htmlId = `h2c_html_${random.current}`
  const canvasId = `htc_canvas_${random.current}`

  const { run } = useDebounceFn(() => {
    html2canvas(document.querySelector(`#${htmlId}`), {
      allowTaint: true, // 允许污染
      taintTest: true, // 在渲染前测试图片(没整明白有啥用)
      useCORS: true, // 使用跨域(当allowTaint为true时这段代码没什么用)
      scale: 2,
    }).then(canvas => {
      document.querySelector(`#${canvasId}`).innerHTML = ''
      document.querySelector(`#${canvasId}`).appendChild(canvas)

      if (onChange) {
        onChange(canvas.toDataURL('image/png'))
      }

      if (downloadName) {
        document.querySelector(`#${canvasId}`).onclick = () => {
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
