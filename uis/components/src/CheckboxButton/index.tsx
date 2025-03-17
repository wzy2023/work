import { Col, Row, CheckCard } from '@wzyjs/antd'

interface CheckboxButtonProps {
  options: { label: string; value: number }[]
}

export const CheckboxButton = (props: CheckboxButtonProps) => {
  const { options } = props

  return (
    <CheckCard.Group style={{ width: '100%' }} size='small' multiple>
      <Row>
        {options.map(i => (
          <Col key={i.value}>
            <CheckCard title={i.label} value={i.value} style={{ width: 60, height: 30 }} />
          </Col>
        ))}
      </Row>
    </CheckCard.Group>
  )
}
