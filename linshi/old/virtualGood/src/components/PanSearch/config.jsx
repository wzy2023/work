import React from 'react'
import { baiduPan } from '@/apis/config/default'

export const config = values => [
  {
    type: 'switch',
    name: 'isRename',
    label: '是否改名',
  },
  {
    type: 'input',
    name: 'newname',
    disabled: !values.isRename,
    style: { width: 730 },
  },
  {
    type: 'switch',
    name: 'isMove',
    label: '是否移动',
    style: { marginTop: 15 },
  },
  {
    type: 'input',
    name: 'path',
    disabled: !values.isMove,
    style: { width: 730, marginTop: 15 },
  },
  {
    type: 'switch',
    name: 'isShare',
    label: '是否分享',
    style: { marginTop: 15 },
  },
  {
    type: 'input-textarea',
    name: 'shareUrl',
    disabled: !values.isShare,
    style: { width: 730, marginTop: 15 },
  },
]

export const columns = evs => [
  {
    width: 100,
    dataIndex: 'fileType',
    title: '类型',
    filters: Object.values(baiduPan.fileTypeMap).map(item => ({ value: item, text: item })),
    onFilter: (value, record) => record.fileType === value,
  },
  {
    width: 100,
    dataIndex: 'fileSize',
    title: '大小',
  },
  {
    dataIndex: '',
    title: '名称',
    render: _ => {
      return _.isdir ? (
        <a href='javascript:void(0)' onClick={() => evs.onClick(_)}>{_.server_filename}</a>
      ) : <span>{_.server_filename}</span>
    },
  },
  {
    dataIndex: 'path',
    title: '路径',
  },
]
