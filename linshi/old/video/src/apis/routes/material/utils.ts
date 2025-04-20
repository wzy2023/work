import fs from 'fs-extra'
import {
  ImageCreateData,
  Material,
  MaterialStatus,
  MaterialType,
  PromptData,
  VideoData,
  VideoHandleData,
} from '@/apis/entities'

import {
  ai,
  downloadFile,
  handleVideo,
  handleVideo2,
  replaceByVariables,
  splitImage,
  uploadFile,
  imageToBase64,
} from '@/apis/utils'

export const createMaterial = (type: MaterialType, projectId: string, data: any): Material => {
  const material = new Material()
  material.type = type
  material.data = data
  material.project = projectId as any
  return material
}

const createImageMaterial = async (data: ImageCreateData, projectId: string) => {
  if (!data.urls) {
    return []
  }
  const imageBuffers = await splitImage(data.urls[0])
  const urls = await Promise.all(imageBuffers.map((item, index) => uploadFile(item, `split_${index}_${imageBuffers.length}_${Date.now()}.png`)))
  return urls.map((url: string) => createMaterial(MaterialType.IMAGE, projectId, { url }))
}

export const refreshImageStatus = (material: Material, delay = 5000) => {
  setTimeout(async () => {
    const data = material.data as ImageCreateData
    if (!data.taskId) {
      return
    }

    const projectId = material.project?.id || material.project as unknown as string
    const res = await ai.ai302.image.midjourney.getImageStatus(data.taskId)

    console.log(666, data.taskId, res.status)

    if (['IN_PROGRESS', 'NOT_START', 'SUBMITTED', ''].includes(res.status)) {
      material.progress = parseInt(res?.progress || 0)
      data.urls = res.imageUrl ? [res?.imageUrl] : []
      await material.save()
      refreshImageStatus(material)
    }

    if (['FAILURE'].includes(res.status)) {
      material.status = MaterialStatus.Failed
      material.failReason = res.failReason
      material.progress = parseInt(res.progress)
      await material.save()
    }

    if (['SUCCESS'].includes(res.status)) {
      material.status = MaterialStatus.Done
      material.progress = parseInt(res.progress)
      data.urls = res.imageUrl ? [res.imageUrl] : []
      material.children = await createImageMaterial(data, projectId)
      await material.save()
    }
  }, delay)
}

export const saveImages = (material: Material) => {
  setTimeout(async () => {
    const projectId = material.project?.id || material.project as unknown as string
    material.status = MaterialStatus.Done
    material.progress = 100
    material.children = material.data.urls.map((url: string) => createMaterial(MaterialType.IMAGE, projectId, { url }))
    await material.save()
  }, 30 * 1000)
}

export const refreshVideoStatus = (material: Material, delay = 60 * 1000) => {
  setTimeout(async () => {
    const data = material.data as VideoData
    if (!data.taskId) {
      return
    }
    const statusData = await ai.keling.getVideoStatus(data.taskId)

    console.log(666, data.taskId, statusData?.status)

    if (statusData?.status === 10) {
      material.progress = statusData?.progress
      await material.save()
      refreshVideoStatus(material)
    }

    if (statusData?.status === 99) {
      material.status = MaterialStatus.Done
      material.progress = 100
      data.url = statusData?.url
      data.cover = statusData?.cover
      await material.save()
    }
  }, delay)
}

export const trigger = (material: Material) => {
  setTimeout(async () => {
    switch (material.type) {
      case MaterialType.PROMPT:
        try {
          const model = 'o1-mini' // 'claude-3-5-sonnet-20241022'
          const prompt = replaceByVariables((material.data as PromptData).prompt, { text: (material.data as PromptData).text })
          console.log(6662, prompt)
          const res = await ai.ai302.chat(prompt, model)
          material.data = { ...material.data, ...res, model }
          material.status = MaterialStatus.Done
        } catch (err: any) {
          material.failReason = err?.message
          material.status = MaterialStatus.Failed
        }
        await material.save()
        break

      case MaterialType.IMAGECREATE:
        // let base64 = []
        // if (material.data.urls?.length) {
        //   base64 = await Promise.all(material.data.urls.map(async (item: string) => await imageToBase64(item)))
        // }
        // const data = await ai.ai302.image.midjourney.generateImage((material.data as ImageCreateData).prompt, base64)
        // if (data.code !== 1 && data.code !== 22) {
        //   throw new Error(data.description)
        // }

        const data = await ai.midjourney.generateImage((material.data as ImageCreateData).prompt)
        if (!data) {
          throw new Error('生成图片失败~')
        }

        if (data?.failure?.length) {
          throw new Error(JSON.stringify(data.failure[0]))
        }

        const jobId = data.success[0].job_id // data.result
        material.data = {
          ...material.data,
          model: 'midjourney' as any,
          taskId: jobId,
          urls: [
            `https://cdn.midjourney.com/${jobId}/0_0.png`,
            `https://cdn.midjourney.com/${jobId}/0_1.png`,
            `https://cdn.midjourney.com/${jobId}/0_2.png`,
            `https://cdn.midjourney.com/${jobId}/0_3.png`,
          ],
        }
        // refreshImageStatus(material)
        await saveImages(material)
        await material.save()
        break

      case MaterialType.VIDEO:
        const taskId = await ai.keling.generateVideo((material?.data as VideoData).imageUrl, (material?.data as VideoData).prompt)
        material.data = {
          ...material.data,
          model: 'keling',
          taskId,
        }
        refreshVideoStatus(material)
        await material.save()
        break

      case MaterialType.VIDEOHANDLE:
        const path = await downloadFile((material.data as VideoHandleData).sourceUrl)
        const videoPath = (material.data as VideoHandleData).mode === 1 ? await handleVideo(path) : await handleVideo2(path);
        (material.data as VideoHandleData).url = await uploadFile(videoPath)
        await fs.unlink(videoPath)
        material.status = MaterialStatus.Done
        await material.save()
        break
    }
  }, 0)
}
