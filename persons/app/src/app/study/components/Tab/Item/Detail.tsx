import { Button, Drawer, EyeOutlined } from '@/components'

import { useBoolean } from '@/hooks'

interface DetailProps {
  item: any
}

export const Detail = (props: DetailProps) => {
  const { item } = props

  const [visible, { setTrue, setFalse }] = useBoolean(false)

  return (
    <>
      <Button
        type='text'
        icon={<EyeOutlined />}
        onClick={setTrue}
      />

      <Drawer
        title='学习项目详情'
        open={visible}
        onClose={setFalse}
        width='80%'
      >
        <div className='space-y-4'>
          <div>
            <h3 className='text-sm font-medium text-gray-500 mb-1'>项目名称</h3>
            <p className='text-base text-gray-900'>{item?.name || '-'}</p>
          </div>

          <div>
            <h3 className='text-sm font-medium text-gray-500 mb-1'>标签</h3>
            <p className='text-base text-gray-900'>
              {item?.tags?.length > 0 ? item.tags.join(', ') : '-'}
            </p>
          </div>

          <div>
            <h3 className='text-sm font-medium text-gray-500 mb-1'>创建时间</h3>
            <p className='text-base text-gray-900'>
              {item?.createdAt ? new Date(item.createdAt).toLocaleString() : '-'}
            </p>
          </div>

          <div>
            <h3 className='text-sm font-medium text-gray-500 mb-1'>更新时间</h3>
            <p className='text-base text-gray-900'>
              {item?.updatedAt ? new Date(item.updatedAt).toLocaleString() : '-'}
            </p>
          </div>
        </div>
      </Drawer>
    </>
  )
}
