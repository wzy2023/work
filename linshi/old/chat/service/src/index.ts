import 'reflect-metadata'
import express from 'express'

import userRouter from './routes/user'
import chatRouter from './routes/chat'
import manageRouter from './routes/manage'
import orderRouter from './routes/order'
import shareRouter from './routes/share'
import incomeRouter from './routes/income'
import pointRouter from './routes/point'
import systemRouter from './routes/system'

const app = express()
const router = express.Router()

app.use(express.static('public'))
app.use(express.json())

app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

router.use('/user', userRouter)

router.use('/chat', chatRouter)

router.use('/manage', manageRouter)

router.use('/order', orderRouter)

router.use('/share', shareRouter)

router.use('/point', pointRouter)

router.use('/system', systemRouter)

router.use('/income', incomeRouter)

app.use('', router)
app.use('/api', router)

app.set('trust proxy', 1)

const server = app.listen(3002, () => globalThis.console.log('Server is running on port 3002', server.timeout))

server.timeout = !isNaN(+process.env.TIMEOUT_MS) ? +process.env.TIMEOUT_MS : 300 * 1000
