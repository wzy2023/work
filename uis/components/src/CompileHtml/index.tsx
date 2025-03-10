'use client'

import React, { useMemo } from 'react'
import Handlebars from 'handlebars'

interface Props {
  template?: string
  data: any
}

export default (props: Props) => {
  const { template, data } = props

  const html = useMemo(() => {
    const html = Handlebars.compile(template || '')(data)
    return html.replaceAll('\n', '').replaceAll('\t', '')
  }, [template, data])

  if (!html) {
    return null
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}
