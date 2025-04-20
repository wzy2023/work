import { Button, Result } from 'antd'
import { history } from '@umijs/max'

export default () => (
  <Result
    status='404'
    title='404'
    extra={
      <Button type='primary' onClick={() => history.push('/')}>
        回到首页
      </Button>
    }
  />
)
