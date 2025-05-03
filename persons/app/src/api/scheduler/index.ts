import { rssItem } from './rssItem'

const interval = (intervalMinutes: number, immediately: boolean, fn: () => (void | Promise<void>)) => {
  console.log(`定时任务已启动，将每${intervalMinutes}分钟执行一次`)

  if (immediately) {
    fn()
  }

  setInterval(() => {
    fn()
  }, intervalMinutes * 60 * 1000)
}

if (process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    interval(30, false, rssItem)
  }, 5000)
}
