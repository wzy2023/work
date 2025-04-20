import Page from './Page'
import axios from 'axios'
import { updateAttr } from '../good'

const cookies = 'bid=6o-KIlR987Y; ll="118110"; gr_user_id=03821863-2498-4247-a62a-271497fd960b; push_doumail_num=0; push_noty_num=0; __utmz=30149280.1641393113.36.3.utmcsr=127.0.0.1:3000|utmccn=(referral)|utmcmd=referral|utmcct=/; __utmv=30149280.13456; ap_v=0,6.0; __utma=30149280.1787825085.1630921709.1641560552.1641908462.38; __utmb=30149280.0.10.1641908462; __utmc=30149280; dbcl2="134565864:sNxeVort3wc"; ck=odxW; frodotk="a6c8eb8cec97e243f45ac2a6c5c7a6c9"'

export const detail = async (id, _id) => {
  const page = new Page(`https://movie.douban.com/subject/${id}`, { cookies })

  let data: any = {}
  try {
    data = await page.getData([
      // 名称
      {
        key: 'name',
        selector: 'h1 > span:nth-child(1)',
        attrOrFn: el => el.innerText?.split(' ')[0],
      },

      // 海报
      {
        key: 'poster',
        selector: 'img[title="点击看更多海报"]',
        attrOrFn: el => el.src,
      },

      // 导演
      {
        key: 'directedBy',
        selector: '#info > span:nth-child(1) > span.attrs > a',
        attrOrFn: el => el.innerText,
      },

      // 主演列表
      {
        key: 'actorList',
        type: 'list',
        selector: '.actor .attrs a',
        attrOrFn: els => els.map(el => el.innerText),
      },

      // 主创人员详细信息列表
      {
        key: 'actorDetailList',
        type: 'list',
        selector: '.celebrities-list > .celebrity:not(:empty)',
        attrOrFn: els => {
          return els.map(el => ({
            label: el.querySelector('.name>a').innerText,
            url: el.querySelector('a').href,
            role: el.querySelector('.role').innerText,
            image: /\("(.*?)"\)/.exec(el.querySelector('.avatar').style.backgroundImage)[1],
          }))
        },
      },

      // 上映日期及所在地
      {
        key: 'initialDate',
        selector: '#info',
        attrOrFn: el => el.innerText.match(/上映日期: (.*?)\n/)[1],
      },

      // 首播
      {
        key: 'firstPlay',
        selector: '#info',
        attrOrFn: el => el.innerText.match(/首播: (.*?)\n/)[1],
      },

      // 类型
      {
        key: 'genre',
        type: 'list',
        selector: '[property="v:genre"]',
        attrOrFn: els => els.map(el => el.innerText),
      },

      // 集数
      {
        key: 'runnum',
        selector: '#info',
        attrOrFn: el => el.innerText.match(/集数: (.*?)\n/)[1],
      },

      // 片长
      {
        key: 'runtime',
        selector: '#info',
        attrOrFn: el => el.innerText.match(/\n片长: (.*?)\n/)[1],
      },

      // 单集片长
      {
        key: 'runtimeSingle',
        selector: '#info',
        attrOrFn: el => el.innerText.match(/单集片长: (.*?)\n/)[1],
      },

      // 评分
      {
        key: 'average',
        selector: '#interest_sectl > div.rating_wrap.clearbox',
        attrOrFn: el => ({
          value: el.querySelector('div.rating_self strong').innerText,
          num: el.querySelector('div.rating_self .rating_people span').innerText,
        }),
      },

      // 剧情简介
      {
        key: 'summary',
        selector: '#link-report > span:nth-child(1)',
        attrOrFn: el => el.innerText.trim(),
      },

      // 喜欢更多
      {
        key: 'recommendList',
        selector: '#recommendations > div > dl',
        type: 'list',
        attrOrFn: els => els.map(el => ({
          label: el.querySelector('dt img').alt,
          value: el.querySelector('dt img').alt,
          url: el.querySelector('dt a').href,
          image: el.querySelector('dt img').src,
        })),
      },

      // 短评
      {
        key: 'commentList',
        selector: '.comment',
        type: 'list',
        attrOrFn: els => els.map(el => ({
          label: el.querySelector('.comment-info a').innerText,
          value: el.querySelector('.comment-content span').innerText,
          start: /allstar(\d)/.exec(el.querySelector('.comment-info .rating').className)[1],
          time: el.querySelector('.comment-info .comment-time ').title,
        })),
      },

      // 包含此片的片单
      {
        key: 'douList',
        type: 'list',
        selector: '#subject-doulist li',
        attrOrFn: els => els.map(el => ({
          label: el.querySelector('a').innerText,
          value: el.querySelector('a').innerText,
          href: el.querySelector('a').href,
        })),
      },

      // 标签
      {
        key: 'tagList',
        type: 'list',
        selector: '.tags-body a',
        attrOrFn: els => els.map(el => el.innerText),
      },

      // IMDb
      {
        key: 'IMDb',
        selector: '#info',
        attrOrFn: el => el.innerText.match(/IMDb: (.*?)\n/)[1],
      },
    ])
  } catch (err) {
    await updateAttr(_id, '获取详情超时')
  }

  // 预告片
  data.trailer = {
    url: await page.getValue('#related-pic > ul > li.label-trailer > a', el => el.href),
    img: await page.getValue('#related-pic > ul > li.label-trailer > a', el => /\("(.*?)"\)/.exec(el.style.backgroundImage)[1]),
    video: undefined,
  }
  if (data.trailer.url) {
    const page2 = new Page(data.trailer.url)
    data.trailer.video = await page2.getValue('video > source', el => el.src)
  }

  data.id = id

  return { success: true, msg: '成功', data }
}

export const list = async (q: string) => {
  if (!q) {
    return { success: true, msg: '请输入要查询的query', data: [] }
  }
  const res = await axios.request({
    method: 'get',
    url: `https://movie.douban.com/j/subject_suggest?q=${encodeURI(q)}`,
    headers: {
      Cookie: cookies,
    },
  })
  return { success: true, msg: '查询豆瓣列表成功', data: res.data }
}
