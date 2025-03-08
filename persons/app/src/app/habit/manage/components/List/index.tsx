import { Button } from 'antd'

import { api } from '@/api/react'

import { Create } from './Create'

interface ListProps {
  groupId: number
}

export const List = (props: ListProps) => {
  const { groupId } = props

  const listState = api.habit.item.list.useQuery({ id: groupId })

  return (
    <div className='p-4 space-y-4'>
      {listState.data?.map(item => (
        <Button
          key={item.id}
          shape='circle'
          className='w-16 h-16 bg-white hover:bg-blue-50 border-2 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105'
          onClick={() => console.log('点击习惯', item)}
        >
          <span className='text-sm text-blue-600 font-medium'>{item.name}</span>
        </Button>
      ))}

      <Create habitGroupId={groupId} onSubmit={listState.refetch} />
    </div>
  )
}
