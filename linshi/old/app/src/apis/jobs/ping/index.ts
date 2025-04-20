import { Cron } from '@wzyjs/midway/exports'
import { ping } from './apis'

@Cron.Job({
  cronTime: '0 11 * * *',
  // cronTime: '0 10,11,15,16,17,18 * * *',
  start: true,
  runOnInit: false,
})
export class PingJob implements Cron.IJob {
  async onTick() {
    // if (getCurrentTime() === '08:55') {
    //   return await openOrClose(-1)
    // }
    //
    // if (getCurrentTime() === '09:05') {
    //   return await openOrClose(1)
    // }

    const res = await ping()
    console.log(666, res)
  }
}
