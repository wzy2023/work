import React from 'react'

import { Button, Card, Table, Drawer, Spin, Space, message } from 'antd'
import { PopconfirmBtn } from '@/components'
import CreateGood from '../../components/CreateGood/index'
import ShowGood from '../../components/ShowGood'

import utils from '@/utils'
import { useRequest } from 'ahooks'
import { list, del } from '../../../../apis/api/good/index'

export default (props) => {
  const { type, name } = props

  const listState = useRequest(() => list({ 'base.cat1': type }), {
    refreshDeps: [type],
  })

  const deleteState = useRequest(del, {
    manual: true,
    onSuccess: res => {
      if (res.success) {
        message.success('删除成功')
      } else {
        message.error('删除失败')
      }
    },
  })

  // 编辑的抽屉
  const [visible, { setTrue, setFalse }, [record, setRecord]] = utils.useVisibleInfo(false, undefined)
  // 查看的抽屉
  const [visibleShow, {
    setTrue: setTrueShow,
    setFalse: setFalseShow,
  }, [recordShow, setRecordShow]] = utils.useVisibleInfo(false, undefined)

  const evs = {
    onDelete: async record => {
      await deleteState.run(record._id)
      await listState.run()
    },
    onShowDrawer: record => {
      setTrue()
      setRecord(record)
    },
    onShow: record => {
      setTrueShow()
      setRecordShow(record)
    },
    onCloseDrawer: () => {
      setFalse()
      listState.run()
    },
  }

  const render = {
    extra: (
      <Button type='link' onClick={() => evs.onShowDrawer()}>
        添加{name}
      </Button>
    ),
  }

  const columns = [
    {
      width: 70,
      title: '序号',
      dataIndex: 'index',
      render: (a, b, c) => c + 1,
    },
    {
      title: '步骤',
      dataIndex: 'step',
    },
    {
      title: '名称',
      key: 'name',
      dataIndex: 'base',
      render: _ => _?.name,
    },
    {
      title: '主分类',
      key: 'cat1',
      dataIndex: 'base',
      render: _ => _?.cat1,
    },
    {
      title: '子分类',
      key: 'cat2',
      dataIndex: 'base',
      render: _ => _?.cat2,
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: _ => (
        <Space size='small'>
          <Button size='small' type='link' disabled={!_.good} onClick={() => evs.onShow(_)}>查看</Button>
          <Button size='small' type='link' onClick={() => evs.onShowDrawer(_)}>编辑</Button>
          <PopconfirmBtn tip='是否确认删除' type='link' onClick={() => evs.onDelete(_)}>删除</PopconfirmBtn>
        </Space>
      ),
    },
  ]

  return (
    <Spin spinning={listState.loading || deleteState.loading}>
      <Card key='card' title={`${name}列表`} size='small' className={{ width: '100%' }} bodyStyle={{ padding: 0 }} extra={render.extra}>
        <Table
          columns={columns}
          dataSource={listState.data?.data || []}
        />
      </Card>

      {/* 编辑的抽屉 */}
      <Drawer
        width='80%'
        visible={visible}
        maskClosable={false}
        onClose={evs.onCloseDrawer}
        destroyOnClose={true}
        bodyStyle={{ padding: 0 }}
      >
        <CreateGood
          type={type}
          name={name}
          record={record}
          onClose={() => {
            setFalse()
            listState.run()
          }}
        />
      </Drawer>

      {/* 查看的抽屉 */}
      <Drawer
        width='80%'
        visible={visibleShow}
        onClose={setFalseShow}
        destroyOnClose={true}
        bodyStyle={{ padding: 0 }}
      >
        <ShowGood record={recordShow} />
      </Drawer>
    </Spin>
  )
}
