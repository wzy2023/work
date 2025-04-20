import {
  GroupData,
  ImageCreateData,
  Material,
  MaterialData,
  MaterialSourceType,
  MaterialStatus,
  MaterialType,
} from '@/apis/entities'
import { createMaterial, trigger } from './utils'
import { ai, generateApi, generateCrudApi, generateRelations, validateParams } from '@/apis/utils'

const { list, remove, update, info, create } = generateCrudApi<Material>({
  name: 'material',
  label: '素材',
  Entity: Material,
  relations: generateRelations('children', 10),
})

const toggleVisible = generateApi({
  url: '/material/toggle-visible',
  successMsg: '可见状态已更新',
  fn: async (id: string) => {
    validateParams({ id }, ['id'])

    const material = await Material.findOne({ where: { id } })

    if (!material) {
      throw new Error('未找到指定素材')
    }

    material.isHidden = !material.isHidden

    await material.save()

    return material
  },
})

const toggleFavorite = generateApi({
  url: '/material/toggle-favorite',
  successMsg: '收藏状态已更新',
  fn: async (id: string) => {
    validateParams({ id }, ['id'])

    const material = await Material.findOne({ where: { id } })

    if (!material) {
      throw new Error('未找到指定素材')
    }

    material.isFavorite = !material.isFavorite

    await material.save()

    return material
  },
})

const setReferenceImage = generateApi({
  url: '/material/set-referenceImage',
  successMsg: '设置参考图',
  fn: async ({ id, url }: { id: string, url: string }) => {
    validateParams({ id, url }, ['id', 'url'])

    const material = await Material.findOne({ where: { id } })

    if (!material) {
      throw new Error('未找到指定素材')
    }

    material.data.url = url

    await material.save()

    return material
  },
})

type addMaterial = {
  projectId: string,
  data: GroupData
}

const addMaterial = generateApi({
  url: '/material/add-material',
  successMsg: '添加成功',
  fn: async ({ projectId, data }: addMaterial) => {
    validateParams({ projectId, data }, ['projectId', 'data'])

    const material = createMaterial(MaterialType.GROUP, projectId, data)

    await material.save()

    return material
  },
})

type addChildMaterial<T> = {
  id: string,
  type: T,
  data: MaterialData<T> | MaterialData<T>[]
}

const addChildMaterial = generateApi({
  url: '/material/add-child-material',
  successMsg: '添加成功',
  fn: async <T extends MaterialType>({ id, type, data }: addChildMaterial<T>) => {
    validateParams({ id, type, data }, ['id', 'type', 'data'])

    const parentMaterial = await Material.findOne({ where: { id }, relations: ['children', 'project'] })
    if (!parentMaterial) {
      throw new Error(`添加子分类失败，父分类不存在`)
    }

    if (!Array.isArray(data)) {
      data = [data]
    }

    // 给图片组导入图片时的特殊处理流程
    if (type === MaterialType.IMAGE && (data[0] as ImageCreateData).sourceType === MaterialSourceType.Import) {
      const childMaterials = (data[0] as ImageCreateData).urls?.map((url: string) => {
        return createMaterial(MaterialType.IMAGE, parentMaterial.project.id, {
          url,
          sourceType: MaterialSourceType.Import,
        })
      })

      parentMaterial.children = [
        ...(parentMaterial.children || []),
        ...(childMaterials || []),
      ]

      // @ts-ignore
      parentMaterial.data.urls = parentMaterial.children.map((item: Material) => item.data.url)

      return await parentMaterial.save()
    }

    const childMaterials = await Promise.all(data.map(async (item: any) => {
      const material = createMaterial(type, parentMaterial.project.id, item)

      if (material.type === MaterialType.PROMPT) {
        if (item.sourceType === MaterialSourceType.Generate) {
          material.status = MaterialStatus.Doing
          trigger(material)
        }
      }

      if (material.type === MaterialType.IMAGECREATE) {
        if (item.sourceType === MaterialSourceType.Generate) {
          material.status = MaterialStatus.Doing
          material.progress = 0
          trigger(material)
        }
        if (item.sourceType === MaterialSourceType.Import) {
          material.children = item.urls.map((url: string) => {
            return createMaterial(MaterialType.IMAGE, parentMaterial.project.id, {
              url,
              sourceType: MaterialSourceType.Import,
            })
          })
        }
      }

      if (material.type === MaterialType.VIDEO) {
        if (item.sourceType === MaterialSourceType.Generate) {
          material.status = MaterialStatus.Doing
          material.progress = 0
          trigger(material)
        }
      }

      if (material.type === MaterialType.VIDEOHANDLE) {
        material.status = MaterialStatus.Doing
        trigger(material)
      }

      return material
    }))

    parentMaterial.children = [...(parentMaterial.children || []), ...childMaterials]

    return await parentMaterial.save()
  },
})

const addChildTextPrompt = generateApi({
  url: '/material/add-child-text-prompt',
  successMsg: '添加成功',
  fn: async <T extends MaterialType>({ id, projectId, data }: any) => {
    validateParams({ id, projectId, data }, ['id', 'projectId', 'data'])

    const parentMaterial = await Material.findOne({ where: { id }, relations: ['children', 'project'] })
    if (!parentMaterial) {
      throw new Error(`添加文本失败，分类不存在`)
    }

    const prompt = `
帮我将下面的提示词概括成一句话的中文(着重写人物外貌特点)，并将这个提示词翻译为中文；

${data.prompt}

注意：返回格式必须是 JSON { text: string, zh: string }
除了json内容外其它什么都不要，必须使用 \`\`\`json \`\`\` 包裹`

    const res = await ai.ai302.chat(prompt)

    const childMaterials = createMaterial(MaterialType.TEXT, projectId, {
      content: res.text,
      model: 'o1-moni',
      sourceType: MaterialSourceType.Generate,
    })

    if (!childMaterials.children) {
      childMaterials.children = []
    }

    childMaterials.children.push(createMaterial(MaterialType.PROMPT, projectId, {
      en: data.prompt + ' ' + '--ar 9:16 --quality 2 --stylize 500 --v 6.1',
      zh: res.zh + ' ' + '--ar 9:16 --quality 2 --stylize 500 --v 6.1',
      model: 'o1-moni',
      prompt: '',
      text: res.text,
      sourceType: MaterialSourceType.Generate,
    }))

    parentMaterial.children = [
      ...(parentMaterial.children || []),
      childMaterials,
    ]

    return await parentMaterial.save()
  },
})

export {
  list,
  info,
  create,
  remove,
  update,
  addMaterial,
  addChildMaterial,
  addChildTextPrompt,
  toggleFavorite,
  toggleVisible,
  setReferenceImage,
  Material,
  MaterialType,
}
