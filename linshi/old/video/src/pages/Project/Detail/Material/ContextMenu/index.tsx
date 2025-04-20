import React, { useMemo, useState } from 'react'
import { useModel, useParams } from '@umijs/max'

import { Dropdown, Modal, message } from '@/components'
import { FormModal } from './FormModal'

import { copy } from '@/utils'

import { usePromptList } from '../hooks'
import { MenuKey, nodeMenuMap, menuMap, projectSettingMap } from '../../config'
import { MaterialSourceType, MaterialType, Params } from '../../../types'

interface ContextMenuProps {
  children: any
  data: any
}

export const ContextMenu = (props: ContextMenuProps) => {
  const { children, data } = props

  const { projectId } = useParams<Params>()

  const [currentMenuKey, setCurrentMenuKey] = useState<string>('')

  const { promptMenus } = usePromptList()

  const {
    workCreateState,
    addChildMaterialState,
    materialListState,
    materialRemoveState,
    materialVisibleState,
  } = useModel('Project.Detail.Material.model')

  const items = useMemo(() => {
    return nodeMenuMap[data.type]?.map((i: any) => {
      if (i.menu.key.startsWith(MenuKey.addChildPrompt)) {
        i.menu.children = promptMenus
        return i.menu
      }

      return i.menu
    })
  }, [promptMenus, data.type])

  const onClickMenuItem = async (ev: any) => {
    if (ev.key === MenuKey.copy) {
      if (data.type === MaterialType.TEXT) {
        copy(data.data.content)
      }
      if (data.type === MaterialType.PROMPT) {
        copy(data.data.en)
      }
      return
    }

    if (ev.key === MenuKey.hidden) {
      Modal.confirm({
        title: 'Confirm',
        content: `确认${(menuMap as any)[ev.key].menu.label}?`,
        onOk: async () => {
          await materialVisibleState.runAsync(data.id)
          materialListState.refresh()
        },
      })
      return
    }

    if (ev.key === MenuKey.remove) {
      Modal.confirm({
        title: 'Confirm',
        content: `确认${(menuMap as any)[ev.key].menu.label}?`,
        onOk: async () => {
          await materialRemoveState.runAsync(data.id)
          materialListState.refresh()
        },
      })
      return
    }

    if (ev.key === MenuKey.createWork) {
      await workCreateState.runAsync(data.id)
      message.success('创建成功')
      return
    }

    if (ev.key.startsWith(MenuKey.addChildPrompt)) {
      if (!projectId || !data.data.content || !ev.item.props.value) {
        return
      }

      await addChildMaterialState.runAsync({
        id: data.id,
        type: MaterialType.PROMPT as any,
        data: {
          prompt: ev.item.props.value,
          text: data.data.content,
          sourceType: MaterialSourceType.Generate,
        },
      })

      materialListState.refresh()
      return
    }

    if (ev.key === MenuKey.addChildImage) {
      if (!projectId || !data.data.en) {
        return
      }

      Modal.confirm({
        title: 'Confirm',
        content: `确认${(menuMap as any)[ev.key].menu.label}?`,
        onOk: async () => {
          await addChildMaterialState.runAsync({
            id: data.id,
            type: MaterialType.IMAGECREATE as any,
            data: {
              prompt: data.data.en,
              url: data.data.url,
              sourceType: MaterialSourceType.Generate,
            },
          })
          materialListState.refresh()
        },
      })

      return
    }

    if (ev.key === MenuKey.addChildVideo) {
      if (!projectId || !data.data.url) {
        return
      }

      Modal.confirm({
        title: 'Confirm',
        content: `确认${(menuMap as any)[ev.key].menu.label}?`,
        onOk: async () => {
          await addChildMaterialState.runAsync({
            id: data.id,
            type: MaterialType.VIDEO as any,
            data: {
              imageUrl: data.data.url,
              prompt: data.data.prompt,
              sourceType: MaterialSourceType.Generate,
            },
          })
          materialListState.refresh()
        },
      })

      return
    }

    if (ev.key === MenuKey.handleVideo) {
      if (!projectId) {
        return
      }
      await addChildMaterialState.runAsync({
        id: data.id,
        type: MaterialType.VIDEOHANDLE as any,
        data: {
          sourceUrl: data.data.url,
          sourceImageUrl: data.data.imageUrl,
          sourceType: MaterialSourceType.Handle,
          mode: projectSettingMap[projectId]?.mode ?? 0,
        },
      })
      materialListState.refresh()
      return
    }

    setCurrentMenuKey(ev.key)
  }

  return (
    <div onContextMenu={ev => ev.stopPropagation()}>
      <Dropdown
        trigger={['contextMenu']}
        menu={{ items, onClick: onClickMenuItem }}
      >
        <div>{children}</div>
      </Dropdown>

      <FormModal
        data={data}
        currentMenuKey={currentMenuKey}
        onClose={() => {
          setCurrentMenuKey('')
        }}
      />
    </div>
  )
}
