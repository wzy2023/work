import { Koa, Cron, Orm, createConfiguration, hooks } from '@wzyjs/midway/exports'
import { logger, result, login, quizLogin } from './middlewares'

export default createConfiguration({
  imports: [
    Koa,
    Cron,
    Orm,
    hooks({
      middleware: [
        logger,
        result({ include: [/^\/api/] }),
        quizLogin({
          include: [
            /^\/api\/quiz\/*/,
          ],
          exclude: [
            /^\/api\/quiz\/user\/login/,
          ],
        }),
        login({
          exclude: [
            /^\/api\/user\/login/,
            /^\/api\/user\/register/,
            /^\/api\/quiz\/*/,
          ],
        }),
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

            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,

            synchronize: true,
            logging: false,
            charset: 'utf8mb4',
            entities: ['**/entities/*.ts', '**/entities/*.js'],
          },
        },
      },
      cron: {
        defaultCronJobOptions: {
          timeZone: 'Asia/Shanghai',
        },
      },
    },
  }],
})
