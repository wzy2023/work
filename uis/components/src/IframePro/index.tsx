import React, { useEffect, CSSProperties } from 'react'
import { Spin } from 'antd'
import { useBoolean } from '@wzyjs/hooks'
import styles from './index.module.less'

export interface IframeProProps {
  url: string;
  errMessage?: string;
  style?: CSSProperties;
  isShowLoading?: boolean;
}

export const IframePro = (props: IframeProProps) => {
  const { url, style, errMessage = '', isShowLoading = false } = props

  const [loading, { setTrue, setFalse }] = useBoolean(true)

  useEffect(() => {
    setTrue()
  }, [url])

  if (!url) {
    return (
      <span
        style={{
          ...style,
          color: '#ccc',
          fontSize: 14,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {errMessage || '没有url'}
      </span>
    )
  }

  return (
    <Spin spinning={loading && isShowLoading} wrapperClassName={styles.wrapper}>
      <iframe
        src={url}
        width='100%'
        height='100%'
        style={style}
        onLoad={setFalse}
      />
    </Spin>
  )
}
