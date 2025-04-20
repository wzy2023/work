import { useLocation, useModel } from '@umijs/max'
import { Anchor } from '@/components'
import { AnchorItem } from '@/models/anchorData'
import styles from '../index.less'

export default () => {
  const { pathname } = useLocation()
  const { active, menuData } = useModel('anchorData')

  const renderList = (data: AnchorItem[]) => (
    data.map((item, index) => {
      if (Array.isArray(item?.children)) {
        return (
          <Anchor.Link key={index} title={item.name} href={`#${pathname}#${encodeURI(item.name || '')}`}>
            {renderList?.(item.children)}
          </Anchor.Link>
        )
      }
      return <Anchor.Link key={index} href={`#${pathname}#${encodeURI(item.name || '')}`} title={item.name} />
    })
  )

  if (!menuData?.length) {
    return null
  }

  return (
    <Anchor
      className={styles.anchorList}
      getCurrentAnchor={() => `#${pathname}#${encodeURI(active || menuData?.[0]?.name || '')}`}
    >
      {renderList?.(menuData)}
    </Anchor>
  )
}
