import { axios, cheerio } from '@wzyjs/utils/node'
import { NeedJobSource } from './types'

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
}

// 需求
export const cxykz = async () => {
  // throw new Error('aa')
  const { data: { data: { list } } } = await axios.post('http://app.proginn.com/api/recruit/search', {
    is_vip: '0',
    page: '1',
    x_access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIzMzE0MTUiLCJjdGltZSI6MTY3NzIwNDA5NywiZXhwIjoxNjc5Nzk2MDk3fQ.J0cvyZHwxHnnnjBog0lKPWKPztqLw3T7bUFwWBOTIdA',
    x_app: 'ios 4.44.0',
    x_client_id: '4d2c78a937f2e88df4fefa04aab09b2f',
    x_nonce_str: '1677230370.733104',
    x_signature: 'a99dc5ece91dd382429a4ff6e998fdb6:',
  })

  return list.map((item: any) => ({
    source: NeedJobSource.Cxykz,
    title: item.title,
    desc: item.description.substr(13),
    url: item.link,
    price: item.salaryName,
    createTime: item.auditAtFormat,
    person: item.ownerInfo.developerHomePageURL,
  }))
}

export const jjzb = async () => {
  const {
    data: {
      data,
    } = {
      data: '',
    },
  } = await axios.get('https://bbs.125.la/d/task/getList.html', {
    headers,
  })

  const $ = cheerio.load(data || '')

  return $('div.tasklist-b-list').map((_: unknown, el: any) => ({
    source: NeedJobSource.Jjzb,
    title: $(el).find('a.text-666').text(),
    url: 'https://bbs.125.la' + $(el).find('a.text-666').attr('href'),
    price: $(el).find('span.text-16').text(),
    createTime: $(el).find('div.margin-top-sm.text-13.text-888 span[title^=发布于]').text().replace(
      ' | ', ''),
    deadTime: $(el).find('div.margin-top-sm.text-13.text-888 span.text-red').text(),
    applyNum: $(el).find('div.text-888.margin-top-sm[title=报名人数]').text().replace('人', '') || null,
  })).get()
}

export const jjzbDetail = async (url: string) => {
  const { data } = await axios.get(url, { headers })
  const $ = cheerio.load(data || '')
  return $('#content').text()
}

export const yjs = async () => {
  const {
    data = {
      data: '',
    },
  } = await axios.get('https://www.yuanjisong.com/job', {
    headers,
  })

  const $ = cheerio.load(data || '')

  return $('div.consultant_title').map((_: unknown, el: any) => ({
    source: NeedJobSource.Yjs,
    title: $(el).find('dd.text_type_1 b').text(),
    desc: $(el).find('p.margin_bottom_10').text(),
    url: $(el).find('a').attr('href'),
    price: $(el).find('span.rixin-text-jobs').text(),
    applyNum: $(el).find('i.i_post_num').text() || null,
  })).get()
}

export const ms = async () => {
  const {
    data: {
      rewards,
    },
  } = await axios.get(
    'https://codemart.com/api/project?page=1&role=develop_team&skill=&sort=PUBLISH_TIME&sortWay=DESC', {
      headers,
    })

  return rewards.map((item: any) => ({
    source: NeedJobSource.Ms,
    title: item.name,
    desc: item.description,
    url: 'https://codemart.com/project/' + item.id,
    price: item.price,
    createTime: new Date(parseInt(item.createdAt)).toLocaleString(),
    deadTime: item.duration + '天',
    applyNum: item.applyCount || null,
  }))
}

// 岗位
export const dy = async () => {
  const {
    data: {
      posts,
    },
  } = await axios.get('https://svc.eleduck.com/api/v1/posts?category=5&page=1', {
    headers,
  })

  return posts.map((item: any) => ({
    source: NeedJobSource.Dy,
    title: item.title,
    desc: item.summary,
    url: 'https://eleduck.com/posts/' + item.id,
    applyNum: item.comments_count || null,
  }))
}

export const sx = async () => {
  const {
    data = '',
  } = await axios.get('https://shixian.com/job/all?territory=frontend', {
    headers,
  })
  const $ = cheerio.load(data || '')
  return $('div.job').map((_: unknown, el: any) => ({
    source: NeedJobSource.Sx,
    title: $(el).find('h5.title').text().replace(/\s/g, ''),
    desc: $(el).find('p.describe').text(),
    url: 'https://shixian.com' + $(el).find('a').attr('href'),
    price: $(el).find('h4.price').text().replace('预估 ', '').replaceAll(' ', ''),
    applyNum: $(el).find('span.number').text() || null,
    createTime: $(el).find('span.publish-at').text(),
  })).get()
}

export const xmf = async () => {
  const {
    data = '',
  } = await axios.get('https://www.xmf.com/work/o1-100000?word=前端', {
    headers,
  })
  const $ = cheerio.load(data || '')

  return $('div.item-wrap').map((_: unknown, el: any) => ({
    source: NeedJobSource.Xmf,
    title: $(el).find('a[href^=\\/job]').text().replace(/\s/g, ''),
    desc: $(el).find('li.tags').text(),
    url: 'https://www.xmf.com' + $(el).find('a').attr('href'),
    price: $(el).find('span.font-20.color-orange').text().replaceAll(' ', ''),
    createTime: $(el).find(
      '.flex.flex--align__middle span.font-12.color-999.m10-left:not([title])').text(),
  })).get()
}

export const txgc = async () => {
  const {
    data = '',
  } = await axios.get('https://www.txgc.com/market/taskwall/?page=1&category=1oLnmWKdIKW0004', {
    headers,
  })
  const $ = cheerio.load(data || '')

  return $('div.postCard--3ZQKs').map((_: unknown, el: any) => ({
    source: NeedJobSource.Txgc,
    title: $(el).find('h3.postCard-title').text(),
    desc: $(el).find('span.postCard-info__work').text(),
    url: 'https://www.xmf.com' + $(el).find('span.postCard-title a').attr('href'),
    price: $(el).find('span.postCard-info__price').text(),
    createTime: $(el).find('span.postCard-date').text().replace(' 发布', ''),
  })).get()
}

export const yg = async () => {
  const {
    data = '',
  } = await axios.get('https://www.yungong.com/yuancheng/cat', {
    headers,
  })
  const $ = cheerio.load(data || '')

  return $('a.recommentItem-a').map((_: unknown, el: any) => ({
    source: NeedJobSource.Yg,
    title: $(el).find('h1.name').text().replace(/\s/g, ''),
    desc: $(el).find('p.xsortText').text(),
    url: 'https://www.yungong.com' + $(el).attr('href'),
    price: $(el).find('div.otherPost p').text(),
    applyNum: $(el).find('span.contributionNum').text().replace('已有', '').replace('人投递', '') || null,
  })).get()
}
