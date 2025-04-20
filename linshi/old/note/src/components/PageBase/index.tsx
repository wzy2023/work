import { useEffect } from 'react'
import { history, Outlet, useModel } from '@umijs/max'
import { Col, Row } from '@/components'
import RightMenu from './components/RightMenu'
import { useResponsive } from 'ahooks'
import styles from './index.less'

export default () => {
  const responsive = useResponsive()
  const { data = [] } = useModel('anchorData')

  const rightMenuSpan = responsive.md && data?.length ? 5 : 2

  // 监听到页面改变时，滚动到顶部
  useEffect(() => {
    history.listen(({ action }) => {
      if (action === 'PUSH') {
        (document.querySelector(`.${styles.col}`) || {} as any).scrollTop = 0
      }
    })
  }, [])

  return (
    <Row className={styles.page}>
      <Col span={24 - rightMenuSpan} className={styles.col}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </Col>
      <Col span={rightMenuSpan} className={styles.col}>
        <RightMenu />
      </Col>
    </Row>
  )
}
