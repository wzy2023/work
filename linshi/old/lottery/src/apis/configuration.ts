import { Koa, Cron, Orm, createConfiguration, hooks } from '@wzyjs/midway/exports'
import { logger, result, login } from './middlewares'

export default createConfiguration({
  imports: [
    Koa,
    Cron,
    Orm,
    hooks({
      middleware: [
        logger,
        result({ include: [/^\/api/] }),
        login({ exclude: [/^\/api\/user\/login/, /^\/api\/user\/register/, /^\/api\/lottery\/rule\/batch/] }),
      ],
    })
  ],
  importConfigs: [{
    default: {
      keys: 'session_keys',
      typeorm: {
        dataSource: {
          default: {
            type: 'mysql',
            username: 'root',

            host: '127.0.0.1',
            port: 3306,
            password: '',

            // host: 'sh-cynosdbmysql-grp-14b0m22m.sql.tencentcdb.com',
            // port: 22639,
            // password: 'Abcd1234',

            database: 'lottery',
            synchronize: true,
            logging: false,
            charset: 'utf8mb4',
            entities: ['**/entities/*.ts', '**/entities/*.js'],
          },
        },
      },
    },
  }],
})
