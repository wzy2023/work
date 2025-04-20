import { createConnection } from 'typeorm'

export * as chatUser from './user'
export * as chatTalk from './talk'
export * as chatSystem from './system'
export * as chatShare from './share'
export * as chatIncome from './income'
export * as chatOrder from './order'
export * as chatPoint from './point'
export * as chatSMSCode from './smsCode'

createConnection().then(() => console.log('Database connected')).catch(error => console.log(error))
