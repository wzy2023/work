'use client'

import React, { useMemo } from 'react'

import { Typography } from 'antd'
import { TextProps } from 'antd/lib/typography/Text'

import { replaceByRules } from '@wzyjs/utils'

export interface StringProps extends TextProps {
  isCopy?: boolean;
  isEllipsis?: boolean;
}

export const String = (props: StringProps) => {
  const { isEllipsis, isCopy, children } = props

  const { source = '', __html = '' } = useMemo<{ source?: string, __html?: string }>(() => {
    if (typeof children !== 'string') {
      return {}
    }

    if (!children.includes('’')) {
      return {
        source: children.trim(),
      }
    }

    return {
      source: children.trim(),
      __html: replaceByRules(children.trim(), [
        [
          '‘',
          '<xmp style="display: inline-block; color: #d56161; margin: 0 3px; font-family: Consolas, Monaco, monospace;">',
        ],
        ['’', '</xmp>'],
      ]),
    }
  }, [])

  const ellipsis = useMemo(() => {
    if (!isEllipsis) {
      return false
    }
    return { rows: 100, expandable: true }
  }, [isEllipsis])

  const copyable = useMemo(() => {
    if (!isCopy) {
      return
    }
    return {
      text: replaceByRules(source, [
        ['‘', ''],
        ['’', ''],
      ]),
    }
  }, [isCopy, source])

  return (
    <Typography.Paragraph
      {...props}
      ellipsis={ellipsis}
      copyable={copyable}
    >
      <span
        style={{ whiteSpace: 'pre' }}
        dangerouslySetInnerHTML={{ __html: __html || source }}
      />
    </Typography.Paragraph>
  )
}
