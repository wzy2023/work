import { AnchorCard, CodeView } from '@/components'

export default () => [
  <AnchorCard title='类'>
    <CodeView language='javascript'>
      {`
        // 定义类
        class User {
          // 构造方法，new User()时自动调用
          constructor (name, password){
            this.name = name
            this.password = password
          }
          login(){
            console.log("登陆成功")
          }
        }

        // 继承类
        class UserVip extends User {
          constructor (name, password){
            super(name, password) // 必须调用父类构造方法
            this.vip = 1
          }
          vip(){
            console.log("我是vip")
          }
        }
      `}
    </CodeView>
  </AnchorCard>,
]
