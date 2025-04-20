import { Client, withUserAccessToken } from '@larksuiteoapi/node-sdk'
import { NeedJob } from '@/apis/entities'
import { axios, dayjs, JsonFile } from '@/apis/utils'
import { nameMap } from './config'
import { _ } from '@wzyjs/utils'

const client = new Client({
  appId: 'cli_a614c12ba6b8100b',
  appSecret: 'B0npxnY0az9aLyv4IcjTEcjGa0VNYvyx',
})

const baseResInfo = {
  path: {
    app_token: 'TEIPb52isajibhshp3TcMCVonec',
    table_id: 'tbls30cFrxoVoHOL',
  },
}

const refreshToken = () => {
  return axios('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    data: {
      app_id: 'cli_a614c12ba6b8100b',
      app_secret: 'B0npxnY0az9aLyv4IcjTEcjGa0VNYvyx',
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}

const getToken = async () => {
  const config: any = new JsonFile('./config.json')

  let larkToken = await config.get('larkToken')
  if (Date.now() > (larkToken?.expire ?? 0)) {
    const res = await refreshToken()
    larkToken = res.data
    larkToken.expire = Date.now() + larkToken.expire * 1000
    await config.set('larkToken', larkToken)
  }

  return withUserAccessToken(larkToken.tenant_access_token)
}

export const tranData = (data: NeedJob[]) => {
  return data.map((item: any) => ({
    fields: Object.keys(item).reduce((o, k) => ({
      ...o,
      [nameMap[k]]: k === 'createTime' ? dayjs(item[k]).unix() * 1000 : k === 'url' ? { link: item[k] } : item[k],
    }), {}),
  }))
}

export const batchCreate = async (records: any[]) => {
  return client.bitable.appTableRecord.batchCreate({
      ...baseResInfo,
      data: { records },
    },
    await getToken(),
  )
}

export const getAllRecords = async () => {
  const size = 500
  let token: string = ''
  let allRecords: any[] = []
  let hasMore: boolean = true

  while (hasMore) {
    const res = await client.bitable.appTableRecord.list(
      {
        ...baseResInfo,
        params: {
          page_size: size,
          page_token: token,
        },
      },
      await getToken(),
    )

    if (res.code !== 0) {
      throw new Error(`Error: ${res.msg}`)
    }

    allRecords = allRecords.concat(res.data?.items)
    hasMore = res.data?.has_more as boolean

    if (hasMore) {
      token = res.data?.page_token as string
    }
  }

  return allRecords
}

export const getData = async () => {
  const items = await getAllRecords()

  return items?.map(i => Object.keys(i.fields).reduce((o, k) => {
    return {
      ...o,
      // @ts-ignore
      [k]: Array.isArray(i.fields[k]) ? i.fields[k][0]?.text : i.fields[k]?.text,
    }
  }, {}))
}

export const uniqData = async () => {
  const res = await getAllRecords()

  const list = res?.map(i => ({
    id: i.id,
    link: i.fields['地址']?.link,
  }))

  const uniqueLinks: Record<string, boolean> = {}
  const repeat: string[] = []

  for (const item of list) {
    if (item.link) {
      if (!uniqueLinks[item.link]) {
        uniqueLinks[item.link] = true
      } else {
        repeat.push(item.id)
      }
    }
  }

  console.log(666, list.length, repeat.length)

  for (let records of _.chunk(repeat, 300)) {
    try {
      const res = await client.bitable.appTableRecord.batchDelete({
        ...baseResInfo,
        data: {
          records,
        },
      }, await getToken())
      console.log(666, res.code)

    } catch (err) {
      console.log(666, err)
    }
  }

}
