'use client'

import { Col, Row } from 'antd'
import { CheckCard } from '@ant-design/pro-components'

import styles from './index.module.scss'

interface CheckboxButtonProps {
  options: { label: string; value: number }[]
  value?: number[]
  onChange?: (value: number[]) => void
}

export const CheckboxButton = (props: CheckboxButtonProps) => {
  const { options, value, onChange } = props

  return (
    <div className={styles.checkcard}>
      <CheckCard.Group style={{ width: '100%' }} size='small' multiple value={value} onChange={onChange}>
        <Row>
          {options.map(i => (
            <Col key={i.value}>
              <CheckCard title={i.label} value={i.value} style={{ width: 60, height: 30 }} />
            </Col>
          ))}
        </Row>
      </CheckCard.Group>
    </div>
  )
}
