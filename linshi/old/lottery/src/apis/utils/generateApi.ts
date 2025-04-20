import { BaseEntity, FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from 'typeorm'
import { Api, Delete, Middleware, Patch, Post, Put, Validate } from '@wzyjs/midway/exports'
import { useAttr } from '@wzyjs/midway/hooks'

import { Pagination, RequestRes, Where } from '@/apis/types'

import { BaseModel } from './baseModel'
import { transformWhere } from './transformWhere'

interface GenerateApiOption<Fn extends (...args: any) => any> {
  url: string;
  fn: Fn;
  apiType?: 'post' | 'put' | 'patch' | 'delete';
  validate?: any;
  middleware?: any[];
  successMsg?: string;
  ignorePrefix?: true;
}

export const generateApi = <Fn extends (...args: any) => any>(option: GenerateApiOption<Fn>) => {
  const {
    url,
    ignorePrefix = false,
    apiType = 'post',
    validate,
    middleware = [],
    successMsg,
    fn,
  } = option

  const url_ = ignorePrefix ? url : `/api${url}`

  const arr = [
    apiType === 'post' && Post(url_),
    apiType === 'put' && Put(url_),
    apiType === 'patch' && Patch(url_),
    apiType === 'delete' && Delete(url_),

    validate && Validate(...(Array.isArray(validate) ? validate : [validate])),

    Middleware(middleware),

    (...params: any) => {
      if (successMsg) {
        useAttr('message', successMsg)
      }
      return fn(...params)
    },
  ].filter(Boolean)

  return Api(...arr as any) as (...params: Parameters<Fn>) => Promise<RequestRes<Awaited<ReturnType<Fn>>>>
}

interface GenerateApiBatchOption<En> {
  name: string,
  label?: string,
  Entity: typeof BaseEntity & (new () => En),
  select?: FindOptionsSelect<En>,
  successMsg?: {
    list?: string,
    info?: string,
    create?: string,
    update?: string,
    del?: string,
  },
}

export const generateCrudApi = <En extends BaseModel>(option: GenerateApiBatchOption<En>) => {
  const { name, Entity, label = '', successMsg, select } = option

  const list = generateApi({
    url: `/${name}/list`,
    successMsg: successMsg?.list || `获取${label}列表成功`,
    fn: async (params?: { where?: Where, order?: FindOptionsOrder<En>, pagination?: Pagination }) => {
      const { where, pagination, order } = params || {}
      const { pageSize = 10, current = 1 } = pagination || {}

      const [data, total] = await Entity.findAndCount<En>({
        where: transformWhere(where),
        order,
        select,
        skip: pageSize * (current - 1),
        take: pageSize,
      })

      return {
        data,
        total,
      }
    },
  })

  const info = generateApi({
    url: `/${name}/info`,
    successMsg: successMsg?.info || `获取${label}信息成功`,
    fn: async (id: string) => {
      if (!id) {
        throw new Error(`获取${label}信息失败，id 不能为空`)
      }

      const info = await Entity.findOne({ where: { id } as FindOptionsWhere<En> })

      if (!info) {
        throw new Error(`获取${label}信息失败`)
      }

      return info
    },
  })

  const create = generateApi({
    url: `/${name}/create`,
    successMsg: successMsg?.create || `创建${label}成功`,
    fn: (data: any) => {
      return Entity.insert(data)
    },
  })

  const update = generateApi({
    url: `/${name}/update`,
    successMsg: successMsg?.update || `更新${label}成功`,
    fn: (id: string, data: any) => {
      if (data?.id) {
        delete data.id
      }
      return Entity.update(id, data)
    },
  })

  const del = generateApi({
    url: `/${name}/del`,
    successMsg: successMsg?.del || `删除${label}成功`,
    fn: (id: string) => {
      return Entity.delete(id)
    },
  })

  return {
    list,
    info,
    create,
    update,
    del,
  }
}
