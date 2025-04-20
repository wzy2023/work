import { AnchorCard, CodeView } from '@/components'

export default () => [
  <AnchorCard title='发起请求'>
    <CodeView language='javascript'>
      {`
        ① axios.get(url, { params:{} }).then( res => {res.data} )
        ② axios.delete(url, { }).then( res => {res.data} )
        ③ axios.post(url, { }).then( res => {res.data} ).catch( err => {} )
        ④ axios({
            method: '', //请求方式
            url: '', //请求地址
            data: { }, //post数据
            params: { }, //url参数
            headers: {'key': 'value'}, //请求头
            timeout: 1000, //超时
          })
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='获取响应'>
    <CodeView language='javascript'>
      {`
        axios.get('/user/12345')
        .then( res => {
          console.log(res)
        })
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='默认配置'>
    <CodeView language='javascript'>
      {`
        // 全局的 axios 默认值
        axios.defaults.baseURL = 'https://api.example.com'
        // 自定义实例的默认值
        let axios1 = axios.create({ baseURL: 'https://api.example.com' })
        // 在实例创建后修改默认值
        axios1.defaults.headers.common['Authorization'] = AUTH_TOKEN
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='请求和响应拦截器'>
    <CodeView language='javascript'>
      {`
        axios.interceptors.request.use(function (config) {
            // 在发送请求之前修改请求配置
            config.headers.Authorization = 'AUTH_TOKEN'
            return config
          }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error)
          })
        // 添加响应拦截器
        axios.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response
          }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error)
         })
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='同时并发请求'>
    <CodeView language='javascript'>
      {`
        function getUser1() {
          return axios.get('/user/12345')
        }
        function getUser2() {
          return axios.get('/user/12345/permissions')
        }
        axios.all([getUser1(), getUser2()])
          .then(axios.spread(function (acct, perms){
            // 两个请求现在都执行完成
          }))
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='创建不同的axios实例'>
    <CodeView language='javascript'>
      {`
         let axios1 = axios.create({
           baseURL: 'http://localhost:3000',
           headers: {'key': 'value'}
         })
      `}
    </CodeView>
  </AnchorCard>,
  <AnchorCard title='es6方式解决异步地狱示例'>
    <CodeView language='javascript'>
      {`
        axios.get(url)
        .then( res => { return axios.get(url2) } ) //执行p1的，返回p2
        .then( res => { res.data } ) //执行p2的
        .catch( err => {} ) // 一旦报错执行这里
      `}
    </CodeView>
  </AnchorCard>,
]
