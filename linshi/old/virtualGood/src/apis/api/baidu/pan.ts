import qs from 'qs'
import axios from 'axios'

import { baiduPan } from '../../config/default'
import { updateAttr } from '../good'
import { getFileSize, catchJson, checkShareUrl } from './utils'

import * as json from '../../utils/json'
import { accessToken } from '../../config/config.json'

let token = accessToken
const cookie = 'BIDUPSID=7D14A354B56C17EC552FADAD2FB800A5; PSTM=1629301084; BAIDUID=7D14A354B56C17ECB4385F79E16CA590:FG=1; __yjs_duid=1_a7e8d97d61deabd54ba6c7583b70f5131629301087939; pan_login_way=1; PANWEB=1; BDUSS=3pLV2I3SVRYYWh2WU9OVGZmbXZ5UjJqTWZqNUQtU0Yxdnp4TnB5OWdWQU1tSXhoRVFBQUFBJCQAAAAAAAAAAAEAAABMR-yBsK6~tLmk1~fK0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwLZWEMC2Vhc; BDUSS_BFESS=3pLV2I3SVRYYWh2WU9OVGZmbXZ5UjJqTWZqNUQtU0Yxdnp4TnB5OWdWQU1tSXhoRVFBQUFBJCQAAAAAAAAAAAEAAABMR-yBsK6~tLmk1~fK0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwLZWEMC2Vhc; csrfToken=jxm7b0faffbbDtgRtUV7CvdP; H_PS_PSSID=34441_35105_31254_35488_35605_35457_34584_35491_35245_35665_35315_26350_35624_22160; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; STOKEN=71b732b3ee72117166b61502910313549ef3e08e95ebf011448180c1a3143e8e; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1641034356; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1641034356; PANPSC=5149948841010298207:Kkwrx6t0uHAMvaQaO2UK00y7txDAjOFZSWXeNdM4xlsRpc0lX1QMvG2B3XAJxtzGh0wNp5c7deor2wqYbSNJzHC/gmQuRiQwd8U24IPRKWhE2OlLZIpvWpwI2lYmdZVObHbzjWmHlDh2JX8/+SZlCJC9qgHiau/ldS8c7ndIzLExGZiuUUeCaoX0p6z9lD8V7g+5PM2vWus=; ndut_fmt=820E9B24226E9CA22F546010B98C9ADF3543960DAEBBA5DCA5230CF21F8FD6A7'

// 获取AccessToken
export const updateAccessToken = async (code) => {
  const res = await axios.get(`https://openapi.baidu.com/oauth/2.0/token`, {
    params: {
      grant_type: 'authorization_code',
      code,
      client_id: baiduPan.appKey,
      client_secret: baiduPan.secretKey,
      redirect_uri: baiduPan.redirectUri,
    },
  })
  token = res.data.access_token
  json.set('accessToken', token)
}

// 获取文件列表
export const list = async (dir = '/', order = 'name', isDeep = true): Promise<any> => {
  const res = await axios.get(`https://pan.baidu.com/rest/2.0/xpan/file?method=list`, {
    params: {
      access_token: token,
      dir: dir[0] === '/' ? dir : '/' + dir,
      order,
      limit: 1000,
      web: 1,
    },
  })

  if (res.data.errno !== 0) {
    return catchJson(res, '获取网盘文件列表失败')
  }

  // 添加友好的文件类型名称
  res.data.list = await Promise.all((res.data.list || []).map(async item => ({
    ...item,
    fileType: item.isdir === 1 ? '目录' : baiduPan.fileTypeMap[item.category],
    fileSize: item.isdir === 1 && isDeep ? getFileSize(((await list(item.path, 'name', false))?.data || []).reduce((t, i) => t + i.size, 0)) : getFileSize(item.size),
  })))

  return { success: true, msg: '获取网盘文件列表成功', data: res.data.list }
}

// 搜索文件
export const search = async (key, dir) => {
  const res = await axios.get(`https://pan.baidu.com/rest/2.0/xpan/file?method=search`, {
    params: {
      access_token: token,
      key,
      dir,
      num: 1000,
      web: 1,
      recursion: 1,
    },
  })

  if (res.data.errno !== 0) {
    return catchJson(res, '搜索网盘文件失败')
  }

  // 添加友好的文件类型名称
  res.data.list = await Promise.all((res.data.list || []).map(async item => ({
    ...item,
    fileType: item.isdir === 1 ? '目录' : baiduPan.fileTypeMap[item.category],
    fileSize: item.isdir === 1 ? getFileSize(((await list(item.path, 'name', false)).data || []).reduce((t, i) => t + i.size, 0)) : getFileSize(item.size),
  })))

  return { success: true, msg: '搜索网盘文件成功', data: res.data.list }
}

// 查询文件信息
export const queryFile = async (fsids): Promise<any> => {
  const res = await axios.get(`https://pan.baidu.com/rest/2.0/xpan/multimedia?method=filemetas`, {
    params: {
      access_token: token,
      fsids: `[${(Array.isArray(fsids) ? fsids : [fsids]).join()}]`,
    },
  })

  if (res.data.errno !== 0) {
    return catchJson(res, '查询网盘文件信息失败')
  }

  // 添加友好的文件类型名称
  res.data.list = await Promise.all((res.data.list || []).map(async item => ({
    ...item,
    fileType: item.isdir === 1 ? '目录' : baiduPan.fileTypeMap[item.category],
    fileSize: item.isdir === 1 ? getFileSize(((await list(item.path, 'name', false)).data || []).reduce((t, i) => t + i.size, 0)) : getFileSize(item.size),
  })))

  return {
    success: true,
    msg: '查询网盘文件信息成功',
    data: Array.isArray(fsids) ? res.data.list : res.data.list[0],
  }
}

// 分享文件
export const shareFile = async (fid_list, pwd, id, isCheck = true) => {

  const res = await axios.request({
    method: 'post',
    url: `https://pan.baidu.com/share/set?channel=chunlei&clienttype=0&web=1&channel=chunlei&web=1&app_id=250528&clienttype=0`,
    headers: {
      'Cookie': cookie,
      'Content-Type': 'application/x-www-form-urlencoded', // 普通表单提交的Content-Type
    },
    data: qs.stringify({
      channel_list: '[]',
      period: 0,
      schannel: 4,
      pwd,
      fid_list: JSON.stringify(fid_list),
    }),
  })

  if (res.data.errno !== 0 || !res.data.shorturl) {
    const errMsg = res.data?.show_msg || '分享网盘文件失败'
    await updateAttr(id, { status: errMsg })
    return catchJson(res, errMsg)
  }

  // 检查分享链接是否还存在
  if (isCheck) {
    if (!await checkShareUrl(res.data.shorturl)) {
      return { success: false, msg: '分享网盘文件失败-分享链接被取消' }
    }
  }

  return { success: true, msg: '分享网盘文件成功', data: res.data }
}

// 操作文件
export const operaFile = async (opera, fs_id, dest, newname) => {

  const info: any = (await queryFile(fs_id)).data || {}

  // 不同操作使用不同的数据
  const operaMap = {
    move: {
      name: '移动',
      data: {
        dest,
        path: info.path,
        newname: info.filename,
      },
    },
    copy: {
      name: '复制',
      data: {
        dest,
        path: info.path,
        newname: info.filename,
      },
    },
    rename: {
      name: '重命名',
      data: {
        newname: newname + info.filename.substr(info.filename.lastIndexOf('.')),
        path: info.path,
      },
    },
    delete: {
      name: '删除',
      data: info.path,
    },
  }

  const res = await axios.request({
    method: 'post',
    url: `https://pan.baidu.com/rest/2.0/xpan/file?method=filemanager`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // 普通表单提交的Content-Type
    },
    params: {
      access_token: token,
      opera,
    },
    data: qs.stringify({
      ondup: 'newcopy',
      filelist: JSON.stringify([operaMap[opera].data]),
    }),
  })

  if (res.data.errno !== 0) {
    return catchJson(res, `${operaMap[opera].name}网盘文件失败`)
  }

  return { success: true, msg: `${operaMap[opera].name}网盘文件成功`, data: res.data }
}
