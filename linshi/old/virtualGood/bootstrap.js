const { Framework } = require('@midwayjs/koa')
const { Bootstrap } = require('@midwayjs/bootstrap')

const web = new Framework().configure({
  port: 80,
})

Bootstrap.load(web)
.run()
.then(() => {
  console.log('Your application is running at http://localhost:80')
})
