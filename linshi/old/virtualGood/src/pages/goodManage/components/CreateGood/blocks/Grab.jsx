import React, { useState, useEffect, useRef } from 'react'

import { Spin, Space, Tag, Image, Button } from 'antd'
import { FormPro } from '@/components'

import utils from '@/utils'
import { debounce } from 'lodash'
import { useRequest } from 'ahooks'
import * as doubanApis from '@/apis/api/douban/movie'

export default (props) => {
  const { data = {}, onChange = () => undefined } = props

  const formRef = useRef()
  const [values, setValues] = useState(data.dou)
  const [options, setOptions] = useState([])

  const [name, setName] = useState('')
  const listState = useRequest(doubanApis.list, {
    manual: true,
    debounceInterval: 300,
    onSuccess: res => {
      setOptions(res?.data?.map((item = {}) => ({
        title: item.title,
        value: item.id,
        label: (
          <Space>
            <Image src={utils.getProxyUrl(item.img)} width={50} />
            <Tag>{item.title}</Tag>
            <Tag>{item.year}</Tag>
            <Tag>{item.type}</Tag>
            <Button type='link' size='small'>
              <a href={item.url} target='_blank'>详情</a>
            </Button>
          </Space>
        ),
      })))
    },
    onError: err => {
      console.log(666, err)
    },
  })

  const detailState = useRequest(id => doubanApis.detail(id, data._id), {
    manual: true,
    onSuccess: res => {
      setValues(res.data)
    },
  })

  useEffect(() => {
    onChange({ dou: values })
    formRef.current?.setFieldsValue(values)
  }, [values])

  useEffect(() => {
    if (!data || name === data?.base?.name) {
      return
    }
    setTimeout(() => {
      setName(data?.base?.name)
      listState.run(data?.base?.name)
    }, 1000)
  }, [data])

  return (
    <div style={{ margin: 20 }}>
      <Spin spinning={detailState.loading}>
        <FormPro
          formRef={formRef}
          values={values}
          onValueChange={v => setValues({ ...values, ...v })}
          fieldList={[
            {
              name: '_keyword',
              label: '搜索',
              type: 'select',
              showSearch: true,
              options,
              optionLabelProp: 'title',
              filterOption: false,
              onSearch: debounce(value => value ? listState.run(value) : undefined, 500),
              onChange: detailState.run,
            },
            {
              name: 'id',
              label: 'id',
              type: 'input-search',
              rules: ['required'],
              enterButton: '获取详情',
              onSearch: detailState.run,
            },
            {
              name: 'name',
              label: '名称',
              rules: ['required'],
            },
            {
              name: 'poster',
              label: '海报',
            },
            {
              name: 'genre',
              label: '类型',
              type: 'select',
              mode: 'tags',
            },
            {
              name: 'directedBy',
              label: '导演',
            },
            {
              name: 'actorList',
              label: '主演',
              type: 'select',
              mode: 'tags',
            },
            {
              name: 'initialDate',
              label: '上映日期',
            },
            {
              name: 'firstPlay',
              label: '首播',
            },
            {
              name: 'runtime',
              label: '时长',
            },
            {
              name: 'runnum',
              label: '集数',
            },
            {
              name: 'runtimeSingle',
              label: '单集时长',
            },
            {
              name: ['average', 'value'],
              label: '评分',
            },
            {
              name: ['average', 'num'],
              label: '评分人数',
            },
            {
              name: 'tagList',
              label: '标签',
              type: 'select',
              mode: 'tags',
            },
            {
              name: 'summary',
              label: '简介',
              type: 'input-textarea',
            },
            {
              name: 'trailer',
              label: '预告片',
            },
            {
              name: 'IMDb',
              label: 'IMDb',
            },
            {
              name: 'actorDetailList',
              label: '主创详情列表',
              type: 'select',
              mode: 'tags',
              labelInValue: true,
            },
            {
              name: 'recommendList',
              label: '猜你喜欢',
              type: 'select',
              mode: 'tags',
              labelInValue: true,
            },
            {
              name: 'commentList',
              label: '短评列表',
              type: 'select',
              mode: 'tags',
              labelInValue: true,
            },
            {
              name: 'douList',
              label: '片单列表',
              type: 'select',
              mode: 'tags',
              labelInValue: true,
            },
          ]}
        />
      </Spin>
    </div>
  )
}
