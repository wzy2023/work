import { AlertPro, AnchorCard, PageHeader, CodeView } from '@/components'

export default () => [
  <PageHeader title='Promise' subTitle='可以解决回调函数的嵌套问题' />,
  <AnchorCard title='创建Promise对象'>
    <CodeView language='javascript'>
      {`
        var fs = require("fs");

        var p1 = new Promise((resolve, reject) => {
          fs.read("./1.txt", (err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve(data)
            }
          })
        })

        var p2 = new Promise((resolve, reject) => {
          fs.read("./2.txt", (err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve(data)
            }
          })
        })
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='获取Promise对象执行得到的值' subTitle='通过then方法来执行对象上的函数，可以给该函数传参数'>
    <CodeView language='javascript'>
      {`
        p1.then(res => {
          console.log(res)
          return 123 // 返回的123 作为下一个then方法内函数的参数
        }).then(res => {
          console.log(res) // 123
          return p2 // 3.将下一个要执行的Promise对象返回
        }).then(res => { // 4.执行该Promise对象的then方法
          console.log(res)
        }).catch(err => {
          // 统一的处理错误的方法，一旦有错误就执行这里的代码，不再继续下面的then()
        })
      `}
    </CodeView>
    <AlertPro message='then方法里可以返回三种值'>
      <div>(1) 什么都不返回 - 下一个的then方法只是单纯的执行</div>
      <div>(2) 返回 非Promise对象 - 作为下一个then方法的参数</div>
      <div>(3) 返回 Promise对象 - 调用该Promise对象的then方法</div>
    </AlertPro>
    <AlertPro message='附：then方法里如果resolve函数执行错误，同样会跳到reject函数'>

    </AlertPro>
    <AlertPro message='附：Promise.finally()不管执行结果是reject还是resolove，都会在执行完reject还是resolove后走finally'>

    </AlertPro>
    <AlertPro message='附：如果没有用catch方法捕获错误，而是用了then方法的第二个参数reject'>
      <div>那么即使报错，也会继续执行下面的then方法</div>
      <div>如果报错的话，then方法的reject函数的优先级高于catch方法</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='理解'>
    <AlertPro>
      <div>new一个Promise，它的参数是一个函数，这个函数的参数，传两个</div>
      <div>一个是成功后执行的函数-resolve，一个是失败后执行的函数-reject，这两个函数是Promise内部定义的</div>
      <div>这个函数的代码，写我们要执行的异步函数，比如：wx.request()，然后在代码的相应位置，调用resolve()和reject()</div>
      <div>promise之所以能解决回调地狱，是因为它把异步函数和它执行完后调用的回调函数分离了，让回调函数由外部传入</div>
    </AlertPro>
    <CodeView language='javascript'>
      {`
        // new一个Promise就是先执行里面的代码，如果是异步代码，那还是异步执行
        // 异步执行完调用相应的resolve或reject
        var p2 = new Promise((resolve, reject) => {
          $.ajax({
            url: "/api",
            success: resolve,
            fail: reject
          })
        })

        // then方法就是 将第一个参数绑定到resolve后执行，第二个参数绑定到reject后执行
        p2.then(res => console.log(res), err => console.log(err))

        // 需要注意的是：p2这个对象执行后，不管用then还是await，获取它的值多少次，能获取到，但它都是原来的值
        // 这时可以用下面的方式来进行多次调用，每次都返回一个不同的Promise对象
        function P(url) {
          return new Promise((resolve, reject) => {
            $.ajax({
              url,
              success: resolve,
              fail: reject
            })
          })
        }

        var p3 = P("url3") // 这样返回的就是不同的Promise对象，并且还可以传参
        var p4 = P("url4") // 这样返回的就是不同的Promise对象，并且还可以传参
        var p5 = P("url5") // 这样返回的就是不同的Promise对象，并且还可以传参

        // 某个值获取成功后，可以进行下一步，执行另一个Promise对象
        P("url1", "").then(res => {
          return P("url2", res)
        }).then(res => {
          console.log(res)
        })
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='手写Promise对象'>
    <CodeView language='javascript'>
      {`
        class myPromise {
          constructor(executor) {
            this.state = "pending" // 初始状态
            this.value = null
            this.onResolvedCallbacks = []
            this.onRjectedCallbacks = []

            // 改变状态，并执行成功函数数组
            const resolve = value => {
              this.state = "fulfilled"
              this.value = value
              this.onResolvedCallbacks.forEach(fn => fn())
            }

            // 改变状态，并执行失败函数数组
            const reject = value => {
              this.state = "rejected"
              this.value = value
              this.onRjectedCallbacks.forEach(fn => fn())
            }

            // 执行代码，并把改变状态的函数传进去
            executor(resolve, reject)
          }

          // 执行回调
          then(onFulfilled, onRejected) {

            // 如果已执行完代码，并且是成功状态
            if (this.state === "fulfilled") {
              onFulfilled(this.value)
            }

            // 如果已执行完代码，并且是失败状态
            if (this.state === "rejected") {
              onRejected(this.value)
            }

            // 如果未执行完代码，就先把要执行的函数绑定上去
            if (this.state === "pending") {
              this.onResolvedCallbacks.push(() => onFulfilled(this.value))
              this.onRjectedCallbacks.push(() => onRejected(this.value))
            }
          }
        }
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='async和await'>
    <AlertPro>
      <div>`async`修饰的函数，表示里面有要等待的`await`操作</div>
      <div>`async`修饰的函数，会固定返回一个Promise对象，如果函数里返回了值的话，</div>
      <div>{'可以通过`返回的Promise对象.then( res => {} )`里的`res`取到'}</div>
      <div>`await`表示执行后面的Promise对象，会把原本应该传给then方法的第一个函数的参数返回</div>
    </AlertPro>
  </AnchorCard>,
]
