import { cookie, csrf, rules } from './config'
import { axios, dayjs } from '@wzyjs/utils/node'

const options = {
  headers: {
    cookie,
    'Content-Type': 'application/x-www-form-urlencoded',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41',
  },
}

const getMinute = (time: number) => {
  return dayjs().diff(dayjs(time), 'minutes')
}

const findKeyword = (str: string, keyword: string): boolean => {
  // 移除标题中的特殊字符并转换为小写
  const normalizedTitle = str.replaceAll(/[-_\s]/g, '').toLowerCase()
  const normalizedKeyword = keyword.replaceAll(/[-_\s]/g, '').toLowerCase()

  // 使用正则表达式来匹配处理过的关键词
  return new RegExp(normalizedKeyword).test(normalizedTitle)
}

export const getVideoList = async (keyword = 'ChatGPT') => {
  const url = `https://api.bilibili.com/x/web-interface/wbi/search/type?__refresh__=true&_extra=&context=&page=1&page_size=42&order=pubdate&from_source=&from_spmid=333.337&platform=pc&highlight=1&single_column=0&keyword=${keyword}&ad_resource=5654&source_tag=3&gaia_vtoken=&category_id=&search_type=video&dynamic_offset=0`

  const res = await axios.get(url, options)
  if (res.data.code !== 0) {
    throw new Error('获取失败')
  }

  const filterData = res.data.data.result.filter((item: any) => {
    // 过滤掉标题中不包含关键词的视频
    if (!findKeyword(item.title, keyword)) {
      return false
    }

    // 过滤掉播放量不符合规则的视频
    return rules.some(rule => {
      return getMinute(item.pubdate * 1000) <= rule[0] && item.play >= rule[1]
    })
  })

  console.log(666, '过滤后', filterData.length, res.data.data.result.length, keyword)

  // 移除标题中的关键词标记
  return filterData.map((item: any) => {
    item.title = item.title?.replace('<em class="keyword">', '').replace('</em>', '')
    return item
  })
}

export const sendComment = async (oid: string, message: string) => {
  const url = 'https://api.bilibili.com/x/v2/reply/add'

  const params = {
    oid,
    message,
    csrf,
    type: 1,
    plat: 1,
    at_name_to_mid: {},
  }

  const { data } = await axios.post(url, params, options)
  console.log(666, data)

  if (data.code !== 0) {
    throw new Error('发布失败', data)
  }
}
