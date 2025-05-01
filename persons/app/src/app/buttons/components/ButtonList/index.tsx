import { DragSort, Button, Dropdown, Spin, type DropResult } from '@/components'
import { Create } from './Create'
import { Delete } from './Delete'

import { useButtonItemCRUD } from '@/api/generated/crud'

import { copy } from '@/utils'
import { useHovered } from '@/hooks'
import { api } from '@/api/react'
import { ButtonsType } from '@/api/types'
import { message } from 'antd'

interface ButtonListProps {
  item?: CommonGroupLayout.Item
}

export const ButtonList = (props: ButtonListProps) => {
  const { item } = props

  const { isHovered, hoverProps } = useHovered()

  const utils = api.useUtils()

  const { listState } = useButtonItemCRUD({
    list: {
      query: {
        orderBy: { sort: 'desc' },
        where: { groupId: item?.i },
      },
      option: {
        enabled: !!item?.i,
      },
    },
  })

  const updateButtonsItemSortState = api.custom.buttonsItem.updateSort.useMutation({
    onSuccess: () => listState?.refetch(),
  })

  const menuItems = (item: Buttons.Item) => {
    return [
      {
        key: 'edit',
        label: (
          <Create
            id={item.id}
            initialValues={item}
            onSuccess={listState.refetch}
          />
        ),
      },
      {
        key: 'delete',
        danger: true,
        label: (
          <Delete
            id={item.id}
            onSuccess={listState.refetch}
          />
        ),
      },
    ]
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    if (result.type === 'button') {
      const newItemsOrder = Array.from(listState.data || [])

      const [removed] = newItemsOrder.splice(result.source.index, 1)
      if (removed) {
        newItemsOrder.splice(result.destination.index, 0, removed)
      }

      // 乐观更新
      utils.buttonItem.findMany.setData(
        {
          orderBy: { sort: 'asc' },
          where: { groupId: item?.i },
        },
        newItemsOrder,
      )

      updateButtonsItemSortState.mutate(
        newItemsOrder.map((item, index) => ({
          id: item.id,
          sort: index,
        })),
      )
    }
  }

  const onClick = (item: Buttons.Item) => {
    switch (item?.type) {
      case ButtonsType.Copy:
        copy(item.content)
        message.success('复制成功')
        break
    }
  }

  return (
    <Spin spinning={listState.isLoading}>
      <div {...hoverProps} className='h-full'>
        <DragSort
          list={listState.data}
          direction='horizontal'
          dropType='button'
          onDragEnd={onDragEnd}
          lastChildren={item?.i && (
            <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <Create groupId={item?.i} onSuccess={listState.refetch} />
            </div>
          )}
        >
          {(item, provided) => (
            <div key={item.id}>
              <Dropdown getPopupContainer={a => a} trigger={['contextMenu']} menu={{ items: menuItems(item) }}>
                <div {...provided.dragHandleProps}>
                  <Button
                    onClick={() => onClick(item)}
                  >
                    {item?.title || item.content}
                  </Button>
                </div>
              </Dropdown>
            </div>
          )}
        </DragSort>
      </div>
    </Spin>
  )
}
