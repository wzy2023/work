import * as typegoose from '@midwayjs/typegoose'

// 数据库
export const mongoose: typegoose.DefaultConfig = {
  uri: 'mongodb://127.0.0.1:27017',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'virtual_good',
    mongos: {
      allowMixed: 'ALLOW',
    },
  },
}

// 百度网盘
export const baiduPan = {
  fileTypeMap: {
    0: '目录',
    1: '视频',
    2: '音频',
    3: '图片',
    4: '文档',
    5: '应用',
    6: '其他',
    7: '种子',
  },
  appKey: 'Ahlu4DyaV4usNtCx3DwBm8E42mu1qpXQ',
  secretKey: 'zEpUR04EbBlNf1Kl0wcGxk0ewGVMKYjM',
  redirectUri: 'http://127.0.0.1:3000/auth/baidupan',
}
