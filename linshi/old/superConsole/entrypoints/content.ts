// 判断变量的类型
const getType = (obj: any) => {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

const log = console.log.bind(console)

const map: any = {
  'Object': console.table.bind(console),
  'Array': console.table.bind(console),
  'String': log,
  'Number': log,
  'Boolean': log,
  'Null': console.warn.bind(console),
  'Undefined': console.warn.bind(console),
}

export default defineContentScript({
  matches: ['*://*.google.com/*'],
  main() {

    console.log = (...params) => {
      Object.entries(params).forEach(([, value]) => {
        const fn = map[getType(value)] ?? log
        fn(value)
      })
      log()
    }

    console.log('Hello content.')
    console.log({ a: 1 })
    console.log([1, 2])
    console.log(true)
  },
})
