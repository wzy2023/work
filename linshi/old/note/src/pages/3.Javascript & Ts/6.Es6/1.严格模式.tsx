import { AlertPro, AnchorCard } from '@/components'

export default () => [
  <AnchorCard title='严格模式'>
    <AlertPro>
      <div>进入严格模式后，js 的语法需要更严谨，'use strict'</div>
      <div>例如：变量必须先声明才能使用，声明变量时一定要用 var / let / const</div>
    </AlertPro>
  </AnchorCard>,
]
