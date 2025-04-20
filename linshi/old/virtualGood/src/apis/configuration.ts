import path from 'path'
import bodyParser from 'koa-bodyparser'
import * as typegoose from '@midwayjs/typegoose'
import { createConfiguration, hooks } from '@midwayjs/hooks'

export default createConfiguration({
  imports: [
    typegoose,
    hooks({
      middleware: [bodyParser()],
    }),
  ],
  importConfigs: [
    path.join(__dirname, './config'),
  ],
})
