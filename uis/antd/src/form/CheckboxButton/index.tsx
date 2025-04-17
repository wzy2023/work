'use client'

import { Col, Row } from 'antd'
import { CheckCard } from '@ant-design/pro-components'
import { CheckCardValueType } from '@ant-design/pro-card/es/components/CheckCard/Group'

import styles from './index.module.scss'

interface CheckboxButtonProps {
  options: { label: string; value: CheckCardValueType }[]
  value?: CheckCardValueType
  onChange?: (value?: CheckCardValueType) => void
}

export const CheckboxButton = (props: CheckboxButtonProps) => {
  const { options, value, onChange } = props

  return (
    <div className={styles.checkcard}>
      <CheckCard.Group style={{ width: '100%' }} size='small' multiple value={value} onChange={onChange}>
        <Row>
          {options.map((item, index) => (
            <Col key={index}>
              <CheckCard title={item.label} value={item.value} style={{ width: 60, height: 30 }} />
            </Col>
          ))}
        </Row>
      </CheckCard.Group>
    </div>
  )
}
