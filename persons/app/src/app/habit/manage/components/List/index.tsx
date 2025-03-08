import { Space, Dropdown, Popconfirm, message } from 'antd'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { useBoolean } from 'ahooks'

import { api } from '@/api/react'

import { Create } from './Create'
import { Delete } from './Delete'

interface ListProps {
  groupId: number
}

export const List = (props: ListProps) => {
  const { groupId } = props

  const utils = api.useUtils()

  const [isHovered, { setFalse, setTrue }] = useBoolean()

  const listState = api.habit.item.list.useQuery({ id: groupId })

  const updateSort = api.habit.item.updateSort.useMutation({
    onSuccess: () => listState.refetch(),
  })

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const newItems = Array.from(listState.data || [])
    const [removed] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, removed!)

    utils.habit.item.list.setData({ id: groupId }, newItems)

    updateSort.mutate(newItems.map((item, index) => ({
      id: item.id,
      sort: index,
    })))
  }

  return (
    <div style={{ width: '100%', padding: 10 }} onMouseEnter={setTrue} onMouseLeave={setFalse}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={`group-${groupId}`}
          direction='horizontal'
          isDropDisabled={false}
          isCombineEnabled={false}
          ignoreContainerClipping
        >
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Space direction='horizontal' style={{ width: '100%' }} wrap>
                {listState.data?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {provided => (
                      <Dropdown
                        trigger={['contextMenu']}
                        menu={{
                          items: [
                            {
                              key: 'edit',
                              label: (
                                <Create
                                  id={item.id}
                                  initialValues={item}
                                  habitGroupId={groupId}
                                  onSubmit={listState.refetch}
                                />
                              ),
                            },
                            {
                              key: 'delete',
                              danger: true,
                              label: <Delete id={item.id} onSuccess={listState.refetch} />,
                            },
                          ],
                        }}
                      >
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className='flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-grab shadow-md hover:shadow-lg'
                        >
                          {item.name}
                        </div>
                      </Dropdown>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}

                <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <Create habitGroupId={groupId} onSubmit={listState.refetch} />
                </div>
              </Space>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
