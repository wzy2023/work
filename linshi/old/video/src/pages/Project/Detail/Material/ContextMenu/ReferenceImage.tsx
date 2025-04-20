import { useModel } from '@umijs/max'
import { Image } from '@wzyjs/component-web'
import { MaterialType } from '../../../types'

const getImages = (list?: any[]): any[] => {
  if (!list?.length) {
    return []
  }
  return [
    ...(list?.filter(item => {
      return item.type === MaterialType.IMAGE
    }) || []),
    ...(list?.map(item => {
      return getImages(item.children)
    }) || []),
  ]
}

export const ReferenceImage = (props: any) => {
  const { value = '', onChange } = props

  const { materialListState } = useModel('Project.Detail.Material.model')

  const list = getImages(materialListState?.data?.data)?.flat(100).slice(0, 10)

  return (
    <div>
      {list.map((item: any, index: number) => (
        <Image
          key={index}
          preview={false}
          width={65}
          style={{ cursor: 'pointer', marginRight: 4, outline: value === item.data?.url ? 'solid 2px blue' : '' }}
          src={item.data?.url}
          onClick={() => {
            onChange(item.data?.url)
          }}
        />
      ))}
    </div>
  )
}
