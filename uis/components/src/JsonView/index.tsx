import React from 'react'
import ReactJson, { ReactJsonViewProps } from 'react-json-view'

export type JsonViewProps = ReactJsonViewProps

export const JsonView = (props: JsonViewProps) => {
  const { style } = props

  return (
    <ReactJson
      enableClipboard={false}
      collapsed={true}
      displayObjectSize={false}
      displayDataTypes={false}
      {...props}
      style={{ overflow: 'auto', ...style }}
    />
  )
}
