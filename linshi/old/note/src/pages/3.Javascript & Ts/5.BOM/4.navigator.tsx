import { PageHeader, ParamsTable } from '@/components'

export default () => [
  <PageHeader
    title='navigator'
    subTitle='浏览器本身及其运行环境的详细信息'
  />,
  <ParamsTable
    data={[
      { label: 'navigator.userAgent', desc: '获取浏览器UA' },
      { label: 'navigator.platform', desc: '获取操作系统类型' },
      { label: 'navigator.geolocation', desc: '定位对象，用于获取用户地理位置' },
      { label: 'navigator.appName', desc: '获取浏览器的名称' },
      { label: 'navigator.appVersion', desc: '获取浏览器的版本信息' },
      { label: 'navigator.language', desc: '获取用户的首选语言' },
      { label: 'navigator.languages', desc: '获取用户的所有首选语言列表' },
      { label: 'navigator.onLine', desc: '表示用户是否在线（true/false）' },
      { label: 'navigator.cookieEnabled', desc: '指示浏览器是否启用cookie' },
      { label: 'navigator.vendor', desc: '获取浏览器供应商' },
      { label: 'navigator.product', desc: '获取浏览器的产品名称，通常是"Gecko"' },
      { label: 'navigator.hardwareConcurrency', desc: '返回系统的CPU核心数（近似值）' },
      { label: 'navigator.doNotTrack', desc: '获取用户的“请勿跟踪”偏好设置' },
      { label: 'navigator.mimeTypes', desc: '返回MimeTypeArray对象，包含浏览器支持的MIME类型' },
      { label: 'navigator.plugins', desc: '返回PluginArray对象，包含浏览器中的插件信息' },
      { label: 'navigator.serviceWorker', desc: '控制Service Worker的注册、移除等操作' },
      { label: 'navigator.storage', desc: '提供对浏览器存储管理的访问' },
      { label: 'navigator.mediaDevices', desc: '访问媒体输入输出设备，如摄像头和麦克风' },
      { label: 'navigator.share', desc: '允许web应用使用Web Share API分享内容' },
      { label: 'navigator.getUserMedia', desc: '请求访问用户的媒体输入设备（已被mediaDevices.getUserMedia取代）' },
      { label: 'navigator.sendBeacon()', desc: '在页面卸载时发送少量数据到服务器' },
      { label: 'navigator.vibrate()', desc: '使设备震动（如果设备支持）' },
    ]}
  />
]
