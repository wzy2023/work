import { AlertPro, AnchorCard, CodeView, ImagePro } from '@/components'

export default () => [
  <ImagePro src='/3.Javascript & Ts/object.png' />,
  <AnchorCard title='this关键字'>
    <AlertPro message='判断this的指向'>
      <div>1. 全局函数中的this，指的是window</div>
      <div>2. 构造函数中的this，指的是new出来的空对象</div>
      <div>3. 对象方法中的this，指的是方法运行时调用这个方法的对象</div>
      <div>4. 原型对象方法里的this不是指原型对象，而是调用对象</div>
      <div>
        5. HTML节点行内事件里的this指向该节点，但事件调用的函数里的this指向window(可以把this作为函数的参数传入，这样函数里也能使用该节点)
      </div>
      <div>6. 总而言之一句话，确定了哪个对象调用函数，就可以知道函数里的this是指向谁</div>
    </AlertPro>
    <AlertPro message='改变this的指向'>
      <div>以下两个函数的方法，可以将函数里的 this 指向 obj 对象并执行，相当于执行 obj 对象下的方法</div>
      <div>fn.call(obj, arg1, arg2...)</div>
      <div>fn.apply(obj, [arg1, arg2...])</div>
      <br />
      <div>复制一个函数，该函数里的 this 永久指向 obj 对象</div>
      <div>fn.bind(obj)</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='构造函数'>
    <AlertPro>
      <div>1. 函数里面写普通代码就是普通函数，写 this 添加属性/方法的代码就是构造函数</div>
      <div>2. 用 new 构造函数() 的方式创建有指定属性/方法的对象的过程，可以看作构造函数对新创建的空对象进行初始化</div>
      <div>3. new一个构造函数会发生以下4步</div>
      <div>① 创建一个空对象</div>
      <div>② 将这个空对象的 __proto__ 属性，指向构造函数的 prototype 属性</div>
      <div>③ 将函数内的this指向这个空对象，并执行函数内的代码</div>
      <div>④ 返回新对象 (如果构造函数最后有return别的对象的话会有影响)</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='原型'>
    <AlertPro>
      <div>实例对象.__proto__ // 指向构造函数的 prototype 属性指向的对象</div>
      <div>实例对象.hasOwnProperty('name') // 获取该实例对象自身是否有指定属性</div>
      <div>属性 in 实例对象 // 判断属性是否在这个对象或它的原型对象上</div>
      <div>Object.getPrototypeOf(实例对象) // 获取实例对象的原型对象</div>
      <div>Object.setPrototypeOf(实例对象，原型对象) // 为实例对象指定原型对象</div>
      <br />
      <div>实例对象.constructor // 原型的属性，指向这个实例对象的原型在哪个构造函数上</div>
      <div>实例对象.constructor.prototype // 原型的属性，指向这个实例对象的原型对象</div>
      <br />
      <div>1.可以通过 实例对象.__proto__ = 新对象
        的方式，给实例对象重新指定个原型对象，这样可以继承新原型对象上的属性和方法
      </div>
      <div>2.当实例对象的 __proto__ 被改变后，它的 constructor 也会被改变，因为对象的 constructor 属性实际上是在它
        __proto__ 上的
      </div>
      <div>实例对象 instanceof 构造函数 ，可以在 __proto__ 未被改变过时，判断实例对象是否为指定构造函数创建的</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='继承'>
    <AlertPro message='什么是继承'>
      <div>构造函数的方式创建实例对象有个弊端，就是每个实例对象上都有相同的属性和方法，</div>
      <div>这样很占内存，可以用对象继承的方式来解决</div>
    </AlertPro>
    <AlertPro message='原型对象继承'>
      <div>构造函数的原型上添加属性和方法，或者直接给它赋值一个新对象</div>
      <div>这种方式的继承，会使实例对象的 constructor 属性指向错误且打破原型链的完整性</div>
    </AlertPro>
    <AlertPro message='指定原型创建'>
      <div>将某对象作为原型，创建实例对象</div>
      <CodeView language='javascript'>
        {`
          var obj = Object.create(原型对象)
          // Object.create(Object.prototype) === new Object() // 这两种等价
        `}
      </CodeView>
    </AlertPro>
    <AlertPro message='class的继承'>
      <div>类不会变量提升，类同样也有prototype属性，而属性的值依然是实例对象的原型对象</div>
      <CodeView language='javascript'>
        {`
           // 定义类
           class Run {
             p() {
              console.log('ppp')
             }
           }

           class Point extends Run {
             // 实例化对象时，该方法自动指向，对象属性全在这里定义
             constructor(x, y) {
               super() // 如果有继承父类的话，需要先实例化父类
               this.x = x // 类里的thisd
               this.y = y
             }

             // 定义类的方法时，前面不需要加function
             to() {
               return this.x + ' - ' + this.y
             }
           }
        `}
      </CodeView>
    </AlertPro>
  </AnchorCard>,
]
