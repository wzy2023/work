// @ts-nocheck

import OSS from 'ali-oss'

export const oss = new OSS({
  region: import.meta.env.VITE_OSS_REGION,
  accessKeyId: import.meta.env.VITE_OSS_ACCESS_KEY_ID as string,
  accessKeySecret: import.meta.env.VITE_OSS_ACCESS_KEY_SECRET as string,
  bucket: import.meta.env.VITE_OSS_BUCKET,
})
