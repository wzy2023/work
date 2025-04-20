import React, { useRef } from 'react'
import { Modal } from 'antd'
import * as panApis from '@/apis/api/baidu/pan'

export default (props) => {
  const { url, visible, setFalse } = props
  const iframeRef = useRef()

  const onOk = async () => {
    const url = iframeRef.current?.contentWindow.location.href
    const code = url.match(/code=(.*?)#/)[1]
    await panApis.updateAccessToken(code)
    setFalse()
  }

  return (
    <Modal title='授权' visible={visible} onOk={onOk} onCancel={setFalse}>
      <iframe ref={iframeRef} src={url} />
    </Modal>
  )
}
