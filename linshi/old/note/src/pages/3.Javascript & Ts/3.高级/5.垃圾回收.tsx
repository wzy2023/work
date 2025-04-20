import { AlertPro, AnchorCard } from '@/components'

export default () => [
  <AnchorCard title='垃圾回收机制'>
    <AlertPro>
      <div>当我们在函数内部创建一个变量或函数时</div>
      <div>系统都会开辟一块内存空间，并将这块内存的引用计数器进行初始化，初始化值为0</div>
      <div>如果外部有变量引用了这块空间，则引用计数器会自动+1</div>
      <div>当函数执行完毕后，系统会对计数器为0的内存进行垃圾回收</div>
    </AlertPro>
  </AnchorCard>,
]
