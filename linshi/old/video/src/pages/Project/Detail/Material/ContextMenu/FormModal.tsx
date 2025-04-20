import React, { useState } from 'react'
import { useModel, useParams } from '@umijs/max'

import { FormPro, Modal } from '@/components'

import { isFunction, _ } from '@/utils'
import { MenuKey, nodeMenuMap } from '../../config'
import { MaterialSourceType, MaterialType, Params } from '../../../types'

interface FormModalProps {
  data?: any
  currentMenuKey: string
  onClose?: () => void
}

const getDataByKey = (type: MaterialType, currentMenuKey: string) => {
  return nodeMenuMap[type]?.find((i: any) => i.menu.key === currentMenuKey)
}

export const FormModal = (props: FormModalProps) => {
  const { currentMenuKey, data, onClose } = props

  const { projectId } = useParams<Params>()

  const {
    materialListState,
    addMaterialState,
    addChildMaterialState,
    materialUpdateState,
    addChildTextPromptState,
  } = useModel('Project.Detail.Material.model')

  const currentMenuData = getDataByKey(data.type, currentMenuKey)

  const columns = isFunction(currentMenuData?.form) ? currentMenuData?.form(data) : currentMenuData?.form || []

  const [values, setValues] = useState<any>((columns || []).reduce((t: any, i: any) => {
    return {
      ...t,
      [i.dataIndex]: i?.initialValue,
    }
  }, {}))

  const onClickCreateGroup = async () => {
    if (!projectId) {
      return
    }

    switch (currentMenuData.menu.key) {
      case MenuKey.addGroup:
        if (!values.title) {
          return
        }
        await addMaterialState.runAsync({
          projectId,
          data: values,
        })
        break

      case MenuKey.addChildGroup:
        if (!values.title) {
          return
        }
        await addChildMaterialState.runAsync({
          id: data.id,
          type: MaterialType.GROUP as any,
          data: values,
        })
        break

      case MenuKey.addChildText:
        if (!values.list?.length) {
          return
        }
        await addChildMaterialState.runAsync({
          id: data.id,
          type: MaterialType.TEXT as any,
          data: values.list,
        })
        break

      case MenuKey.addChildImportText:
        if (!values.content) {
          return
        }
        await addChildMaterialState.runAsync({
          id: data.id,
          type: MaterialType.TEXT as any,
          data: {
            ...values,
            sourceType: MaterialSourceType.Import,
          },
        })
        break

      case MenuKey.addChildImportPrompt:
        if (!values.en && !values.zh) {
          return
        }
        await addChildMaterialState.runAsync({
          id: data.id,
          type: MaterialType.PROMPT as any,
          data: {
            ...values,
            sourceType: MaterialSourceType.Import,
          },
        })
        break

      case MenuKey.addChildImportImage:
        if (!values?.list?.length) {
          return
        }
        await addChildMaterialState.runAsync({
          id: data.id,
          type: data.type === MaterialType.IMAGECREATE ? MaterialType.IMAGE : MaterialType.IMAGECREATE as any,
          data: {
            urls: values.list.map((i: any) => i.url),
            sourceType: MaterialSourceType.Import,
          } as any,
        })
        break

      case MenuKey.addChildImportVideo:
        if (!values?.list?.length) {
          return
        }
        await addChildMaterialState.runAsync({
          id: data.id,
          type: MaterialType.VIDEO as any,
          data: values.list.map((item: any) => ({
            url: item.url,
            sourceType: MaterialSourceType.Import,
          }))
        })
        break

      case MenuKey.setReferenceImage:
        if (!values?.referenceImage) {
          return
        }
        await materialUpdateState.runAsync(data.id, {
          data: {
            ...data.data,
            urls: [
              ...(data.data?.urls || []),
              values.referenceImage,
            ],
          },
        })
        break

      case MenuKey.setReferencePrompt:
        if (!values?.referencePrompt) {
          return
        }
        await materialUpdateState.runAsync(data.id, {
          data: {
            ...data.data,
            prompt: values.referencePrompt,
          },
        })
        break

      case MenuKey.modify:
        if (
          data.type === MaterialType.GROUP && !values?.title ||
          data.type === MaterialType.TEXT && !values?.content ||
          data.type === MaterialType.PROMPT && !values?.en
        ) {
          return
        }
        await materialUpdateState.runAsync(data.id, {
          data: {
            ...data.data,
            ...values,
          },
        })
        break

      case MenuKey.addChildTextPrompt:
        if (!values.prompt) {
          return
        }
        await addChildTextPromptState.runAsync({
          id: data.id,
          projectId,
          data: {
            prompt: values.prompt,
          },
        })
        break
    }

    materialListState.refresh()
    onClose?.()
  }

  return (
    <Modal
      title={data.data ? `给 [${data.data?.title || data.data?.content || data.data?.zh || '图片'}] ${currentMenuData?.menu.label}` : currentMenuData?.menu.label}
      open={!!currentMenuKey}
      onOk={onClickCreateGroup}
      onCancel={onClose}
      destroyOnClose
      maskClosable={false}
      width='60%'
    >
      <FormPro
        layout='horizontal'
        submitter={false}
        labelCol={{ span: 3 }}
        style={{ marginTop: 25 }}
        onValuesChange={(_, allValues) => setValues(allValues)}
        columns={columns}
      />
    </Modal>
  )
}
