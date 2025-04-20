import React, { useState, useEffect } from 'react'

import { Input, Breadcrumb, Table, Space, Spin, Button, message, Select } from 'antd'
import { FormPro, AuthModal } from '@/components'

import utils from '@/utils'
import { useRequest } from 'ahooks'
import * as panApis from '@/apis/api/baidu/pan'
import { config, columns } from './config'

export default (props = {}) => {
  const { data = {}, value = {}, onChange } = props

  // 选中的文件信息
  const [selectedRow, setSelectedRow] = useState(value?.file)

  // 当前网盘文件列表的路径
  const p = selectedRow?.path.split('/').filter(i => i)
  const [path, setPath] = useState(p?.slice(0, p.length - 1) || ['资源大全'])

  // 搜索网盘文件的关键词
  const [searchValue, setSearchValue] = useState(data?.base?.name)
  const [searchPath, setSearchPath] = useState('/资源大全')

  const [values, setValues] = useState({
    newname: data?.base.name,
    path: `/虚拟资源/${data?.base.cat1}/${data?.base.cat2}`,
    shareUrl: value?.share?.content,
  })

  const [visible, { setTrue, setFalse }, [authUrl, setAuthUrl]] = utils.useVisibleInfo()

  useEffect(() => {
    const filename = selectedRow?.filename || selectedRow?.server_filename || ''
    setValues({
      ...values,
      isRename: selectedRow && filename.includes('.') ? filename.substr(0, filename.lastIndexOf('.')) !== values.newname : filename !== values.newname,
      isMove: selectedRow && selectedRow?.path !== `/虚拟资源/${data.base.cat1}/${data.base.cat2}/${selectedRow?.filename || selectedRow?.server_filename}`,
      isShare: selectedRow && value?.share?.fs_id !== selectedRow?.fs_id,
    })
  }, [selectedRow])

  const listState = useRequest(() => panApis.list(path.join('/')), {
    ready: !searchValue,
    refreshDeps: [path],
    onSuccess: res => {

      // 应该放request底层的
      if (res.errno === -6) {
        setTrue()
        setAuthUrl(res.authUrl)
      }

      setSelectedRow(res.data?.findIndex(item => item?.fs_id === value?.file?.fs_id) !== -1 ? value?.file : undefined)
    },
  })

  const searchState = useRequest(() => panApis.search(searchValue, searchPath), {
    ready: searchValue,
    debounceInterval: 500,
    refreshDeps: [searchValue, searchPath],
  })

  const operaState = useRequest(panApis.operaFile, {
    manual: true,
    onSuccess: res => {
      if (res.success) {
        message.success(res.msg, 0)
      } else {
        message.error(res.msg)
      }
    },
  })

  const shareState = useRequest(panApis.shareFile, {
    manual: true,
    onSuccess: res => {
      if (res.success) {
        message.success(res.msg, 0)
      } else {
        message.error(res.msg, 0)
      }
      setTimeout(message.destroy, 5000)
    },
  })

  const queryState = useRequest(panApis.queryFile, {
    manual: true,
  })

  const render = {
    title: () => {
      return (
        <div style={{ display: 'flex' }}>
          <Breadcrumb style={{ flex: 1 }}>
            {path.map((item, index) => (
              <Breadcrumb.Item style={{ cursor: 'pointer' }} onClick={() => evs.onClickTag(index)}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Input
            style={{ width: 260 }}
            placeholder='搜索'
            value={searchValue}
            onChange={ev => setSearchValue(ev.target.value)}
            addonBefore={(
              <Select
                value={searchPath}
                onChange={setSearchPath}
                options={[
                  {
                    label: '/资源大全',
                    value: '/资源大全',
                  },
                  {
                    label: '/root',
                    value: '/',
                  },
                ]}
              />
            )}
          />
        </div>
      )
    },
  }

  const evs = {
    onClick: _ => {
      setSearchValue('')
      setPath(_.path.split('/').filter(i => i))
    },
    onClickTag: (index) => {
      setPath(path.slice(0, index + 1).filter(i => i))
    },
    onClickExec: async () => {
      if (!selectedRow) {
        message.destroy()
        message.error('请先选择一个文件')
        return
      }

      if (values.isRename) {
        if (selectedRow.filename !== values.newname) {
          await operaState.run('rename', selectedRow.fs_id, null, values.newname)
        }
      }

      let share = {}
      if (values.isShare) {
        if (!values.shareUrl) {
          const pwd = utils.getRandomString()
          const res = await shareState.run([selectedRow.fs_id, 497565571678812], pwd, data._id)
          share = {
            pwd,
            fs_id: selectedRow.fs_id,
            shorturl: res.data.shorturl,
            content: `【${data.base.name}】\n链接：${res.data.shorturl}\n提取码：${pwd}`,
          }
          setValues({
            ...values,
            shareUrl: share.content,
          })
        }
      }

      if (values.isMove) {
        if (selectedRow.path !== values.path) {
          await operaState.run('move', selectedRow.fs_id, values.path)
        }
      }

      const file = (await queryState.run(selectedRow.fs_id)).data
      file.fileSize = selectedRow.fileSize
      onChange({
        file,
        share,
      })

      const p = file.path.split('/').filter(i => i)
      setPath(p.slice(0, p.length - 1))
    },
  }

  return (
    <Spin spinning={listState.loading || searchState.loading || operaState.loading || shareState.loading || queryState.loading}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Table
          rowKey='fs_id'
          title={render.title}
          dataSource={(searchValue && searchState.data?.data) ? searchState.data?.data : listState.data?.data}
          columns={columns(evs)}
          pagination={{ pageSize: 5 }}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: [(selectedRow || {}).fs_id],
            hideSelectAll: true,
            onChange: (keys, selectedRows) => {
              setSelectedRow(selectedRows.pop())
            },
          }}
        />

        <Spin spinning={!selectedRow} indicator={null} tip='请先选择一个文件'>
          <FormPro
            layout='inline'
            itemLayout={{}}
            values={values}
            onValueChange={v => setValues({ ...values, ...v })}
            fieldList={config(values)}
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <Button size='large' type='primary' onClick={evs.onClickExec}>执行</Button>
          </div>
        </Spin>
      </Space>

      <AuthModal
        visible={visible}
        setFalse={setFalse}
        url={authUrl}
      />
    </Spin>
  )
}
