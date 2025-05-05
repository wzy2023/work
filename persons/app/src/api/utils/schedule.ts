import cron from 'node-cron'

export const interval = (intervalMinutes: number, immediately: boolean, fn: () => (void | Promise<void>)) => {
  console.log(`定时任务已启动，将每${intervalMinutes}分钟执行一次`)

  if (immediately) {
    fn()
  }

  setInterval(() => {
    fn()
  }, intervalMinutes * 60 * 1000)
}

export const schedule = (cronExpression: string, immediately: boolean, fn: () => (void | Promise<void>)) => {
  console.log(`定时任务已启动，cron表达式: ${cronExpression}`)

  if (immediately) {
    fn()
  }

  cron.schedule(cronExpression, () => {
    fn()
  })
}
