import { Cron } from '@wzyjs/midway/exports'
import { Material, MaterialStatus, MaterialType } from '@/apis/entities'
import { refreshImageStatus, refreshVideoStatus } from '../../routes/material/utils'

@Cron.Job({
  cronTime: '*/5 * * * *',
  // start: true,
  runOnInit: true,
})
export class SyncStatusob implements Cron.IJob {
  async onTick() {
    const materials = await Material.find({
      where: {
        status: MaterialStatus.Doing,
        isDeleted: 0,
      },
    })

    for (let material of materials) {
      if (material.type === MaterialType.IMAGECREATE) {
        refreshImageStatus(material, 0)
      }

      if (material.type === MaterialType.VIDEO) {
        refreshVideoStatus(material, 0)
      }
    }
  }
}
