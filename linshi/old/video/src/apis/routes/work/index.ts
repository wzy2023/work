import * as path from 'path'
import { downloadFile } from '@wzyjs/utils/node'
import { Account, Material, MaterialType, Release, ReleaseStatus, TextData, Work } from '@/apis/entities'
import { generateApi, generateCrudApi, generateRelations } from '@/apis/utils'
import { platformMap } from '@/apis/utils/platforms'

const { list, remove, update, info } = generateCrudApi<Work>({
  name: 'work',
  label: '作品',
  Entity: Work,
  relations: ['content'],
})

const findParent = async (material?: Material): Promise<string> => {
  if (!material) {
    return ''
  }

  if (material.type === MaterialType.TEXT) {
    return (material.data as TextData).content
  }

  return findParent(material.parent)
}

const add = generateApi({
  url: '/work/add',
  successMsg: '创建成功',
  fn: async (id: string) => {
    const material = await Material.findOne({ where: { id }, relations: generateRelations('parent', 10) })

    if (!material) {
      throw new Error('未找到指定素材')
    }

    const work = new Work()
    work.text = await findParent(material)
    work.project = material.project

    work.content = [...(work.content || []), material]
    await work.save()

    return work
  },
})

const submit = generateApi({
  url: '/work/submit',
  successMsg: '发布成功',
  fn: async (data: any) => {
    const { id, values } = data

    const work = await Work.findOne({ where: { id }, relations: ['project', 'content'] })
    if (!work) {
      throw new Error('未找到指定作品')
    }

    const videoFilePath = path.resolve(__dirname, '../../../../', await downloadFile((work.content[0].data as any).url))

    const promises = values.map(async (item: any) => {
      let account
      try {
        const { accountId, form } = item

        if (!accountId) {
          throw new Error('未找到指定账号')
        }

        account = await Account.findOne({ where: { id: accountId } })
        if (!account) {
          throw new Error('未找到指定账号')
        }

        const platform = new platformMap[account.platform].class({ headers: account.headers })
        await platform.submit({ ...form, videoFilePath })
        await platform.submit({ ...form, videoFilePath })

        return {
          status: ReleaseStatus.Success,
          platform: account.platform,
        }
      } catch (err: any) {
        console.log(666, account?.platform, err.message)
        return {
          status: ReleaseStatus.Fail,
          platform: account?.platform,
          reason: err.message,
        }
      }
    })

    const results = await Promise.all(promises)

    const release = await Release.save({
      work,
      results,
      project: work.project,
      status: results.every(item => item.status === ReleaseStatus.Success) ? ReleaseStatus.Success :
        results.every(item => item.status === ReleaseStatus.Fail) ? ReleaseStatus.Fail :
          ReleaseStatus.PartialSuccess,
    })

    if (release.status !== ReleaseStatus.Success) {
      throw new Error(`发布失败，${release.results.filter((item: any) => item.status === ReleaseStatus.Fail).map((item: any) => item.platform).join(', ')}`)
    }
  },
})

export {
  list,
  info,
  add,
  submit,
  remove,
  update,
  Work,
}
