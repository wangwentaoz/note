## Vuex
1. 官方解释：Vuex是一个专为Vue.js应用程序开发的状态管理模式
   1. 采用 集中式存储管理 应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
   2. Vuex也集成到Vue的官方调试工具 devtools extension ，提供了诸如零配置的time-travel调试、状态快照导入导出等高级调试功能。
   3. 状态管理
      1. 状态可以理解为变量，因为变量中可以保存状态。组件之间的状态我们希望是共享的，即每个组件内的状态都能被别的组件读取。
      2. 如果状态放在某一个组件中，那么非常不方便我们读取。比如在组件树最底层的组件想要读取组件树最顶层中的组件中的一个状态，那么这个状态需要层层传递，才能传递到最底层。
      3. 状态管理模式、集中式存储管理。简单的将其看成把需要多个组件共享的变量全部储存在一个对象里面，然后将这个对象放在顶层的Vue实例中，让其他组件可以使用，那么多个组件就可以共享这个对象中的所有变量属性。
      4. 如果我们自己定义一个对象，const shareobj={} ; 然后在Vue.prototype.shareobj = shareobj 。所有组件都继承自Vue的原型，但是做不到响应式的，具体见javascript，即在一个组件中该了这个对象，但是原型中的对象没被改变。所以官方就出了一个插件Vuex
   4. 在组件之间共享什么状态
      1. 用户的登陆状态、用户名、头像、地理位置信息
      2. 商品的收藏、购物车中的物品
      3. 这些状态信息，我们都可以放在同一的地方，对他进行保存和管理，而且他们还是响应式的。
2. 安装vuex
   1. npm install vuex --save 
   2. 多界面状态管理
      1. 多个界面都试图依赖一个状态，这个状态改变了所有的界面全都实现更新，也就是这个状态被一个大管家进行管理。
      2. 全局单例模式（大管家）：将共享的状态抽离出来，交给大管家统一进行管理，之后每个视图按照规定进行访问和修改等操作。
      3. 官方给出的图片 ![图片](./vuex状态管理图片.png)
         1. dispatch：分发，发布
         2. Devtools插件可以记录每次修改state的状态，即每次状态是被哪一个组件修改的，如果绕过mutation环节，就记录不到了
         3. actions环节是如果有异步操作，不要再mutation中做，因为一旦有异步操作mutations跟踪不到，devtools只能跟踪到同步操作。等到在action中异步操作完成后再次提交到mutations中，就可以了。所以没有异步操作时actions环节可以绕过，重要性远远没有mutations环节大。
         4. 所以actions中是用来发送网络请求的，链接backend(后端) api。  前端：frontend
3. 插件devtools
   1. 在浏览器中，选择更多工具，选择扩展程序，安装devtools。
      ```
      index.js文件中
      const store = new Vuex.Store({
        state:{
          counter:1000
        } ,
        mutations:{
          increment(state){     //固定用法，在mutation中可以直接把state当作参数传入
            state.counter++
          } ,
          decrement(state){
            state.counter--
          }
        }
      })

      在App.vue中通过mutations修改store中的counter
      <h2>{{$store.state.counter}}</h2>
      <button @click="addition">+</button>
      <button @click="subtraction">-</button>
      <hello-vuex></hello-vuex>
      <script>
        import HelloVuex from './components/HelloVuex.vue'
        export default {
          name: 'App' ,
          components:{
            HelloVuex
          } ,
          methods:{
            addition(){
              //$store.state.counter++ //如果这样做就是直接修改store，没有通过mutations
              this.$store.commit('increment')  //不可以直接this.@store.increment直接拿到方法，这里类似于固定用法，必须通过commit把 increment 作为参数提交，然后就会调用increment方法
            } ,
            subtraction(){
              this.$store.commit('decrement')
            }
          }
        }
      ```
4. state单一状态树
   1. state就是用来放置状态信息的，他就会帮助我们管理了，而且其他组件可以通过$store.state取出来状态信息。
   2. Single Source of Truth 也可以翻译成单一数据源。例：我们国家有很多信息都是需要被记录下的，比如上学档案、社保、户口等等。这些信息被分散到很多地方进行管理，某天需要办理某个业务时，需要到各个工作地点去打印、盖章各种资料信息，最后到一个地方提交证明信息无误。但是这种保存信息的方案不仅低效而且不方便管理，日后的维护也是一个庞大的工作。
   3. 所以在vue里面如果我们想要有更多的new Vues.Store 来存储各种分类后的信息，Vue是不推荐这么做的，建议全部信息全都放在一个store中，更方便管理维护。所以Vuex也使用了单一状态树来管理应用层级的全部状态。单一状态树能让我们最直接的方式找到某个状态的片段，在之后的维护和调试过程中更方便管理和维护。
5. getters使用详解
   1. 类似于单个组件中的计算属性。
      ```
      index.js文件中
      const store = new Vuex.Store({
        state:{
          counter:1000
        } ,
        getters:{
          powerCounter(state){
            return state.counter * state.counter
          } ，
          boxCounter(state,getters){     //这里面传参数我所谓名称，因为在这里第一个参数一定是state，第二个参数一定是getters，就算是boxCounter(aaa,bbb)这里面的aaa还是指state，bbb还是指getters
             return getters.powerCounter + 1
          } ,
          cppCounter(state){
             return function(num){
                return state.counter + num
             }
          }
        }
      })
      App.vue文件中
      <h2>{{$store.getters.powerCounter}}</h2>
      <h2>{{$store.getters.boxCounter}}</h2>
      <h2>{{$store.getters.cppCounter(2)}}</h2>
      ```
6. mutation的携带参数
   1. Vuex的store状态的更新唯一方式：提交mutation
   2. mutation主要包括两部分：
      1. 字符串的事件类型(type)  例：下面的increment字符串和decrement字符串
      2. 一个回调函数(handler)，该回调函数的第一个参数就是state 例：下面的increment函数和decrement函数，state作为这两个函数的第一个参数，也可以给state起别名，但是还是state，例如下面的decrement
         ```
         App.vue文件夹中
         <button @click="addCount(10)">+10</button>
         mutation的定义方式
         mutations:{
           increment(state){
             state.counter++
           } ,
           decrement(aaa){
             aaa.counter--
           } ,
           incrementCount(state,count){    //后面跟上一个参数count接受调用提交时参数
             state.counter += count
           }
         }

         mutation的更新
         methods:{
           addition(){
             this.$store.commit('increment')
           } ,
           subtraction(){
             this.$store.commit('decrement')
           },
           addCount(num){
              this.$store.commit('incrementCount',num)  //这里提交的参数后面跟着一个num，就可以把num传到incrementCount函数中。添加的这个参数被称为是mutation的paylord：负载。如果参数不是一个可以用对象来传递。
           }
         }
         ```
   3. mutation的提交风格
      1. 除了通过this.$store.commit('increment')进行提交，还可以通过一个包含type属性的对象来提交。
      ```
      mutations:{
         incrementCount(state,count){   
            //以前count就是下面提交的count
            //现在通过对象提交后，count变为提交的对象了，里面有type属性和num属性，相当于上面的负载paylord，只不过多了个type属性，所以这里count叫paylord更合适
            state.counter += count.count
         }
      }
      addCount(count){
         //this.$store.commit('incrementCount',count) //上面的方式
         this.$store.commit({
            type: 'incrementCount' ,
            count:count
         })
      }
      ```
7. mutation响应规则
   1. Vuex的store中的state是响应式的，state中的数据都被加入到响应式系统中，而响应式系统会监听数据的变化，当数据发生变化时，会通知所有界面中用到这些数据的地方，让界面发生刷新。所以当state中的数据发生改变时，Vue组件会自动更新。这就要求我们必须遵守一些对应的Vuex规则：
      1. 提前在store中初始化好所需的属性。如果没有还要硬加，因为新添加的属性没有在响应式系统中，所以虽然改变了，但是界面上却没改变。
      2. 当给state中的对象添加新属性时，要使用下面的方式
         1. 方式一：使用Vue.set(obj,'newProp',123)添加属性，如果是数组，第二个参数就是下标值。使用Vue.delete(obj,'oldProp')删除属性    prop：属性
         2. 方式二：用新对象给旧对象重新赋值 
         ```
         const store = new Vuex.Store({
           state:{
             info:{
                name:'kobe' ,
                age: 40 ,
                height: 1.98
             }
           } ,
           mutations:{
             updateInfo(state){
                state.info['address']='洛杉矶' //虽然改了，但不是响应式的
                Vue.set(state.info,'address','洛杉矶') //好使
                Vue.delete(state.info,'age') //好使
                Vue.set(state.info,'address','洛杉矶') //好使
                state.info = {
                   name:'kobe' ,
                   age: 40 ,
                   height: 1.98 ,
                   address: '洛杉矶'
                }   //好使
                state.info = {...state.info,'address' : '洛杉矶'} //应该好使
             }
           } 
         })
         ```
8. mutation类型常量
   1. 在index.js文件夹中的store中定义了很多mutation方法，当我们在组件中通过this.$store.commit('incrementCount',count)提交时，其中的mutation方法容易写错，所以如果我们可以把这两个地方的名字统一成一个名字，那么将更方便，更改也很方便。
   2. 在./src/store文件夹中新建一个mutations-types.js文件，里面导出一个变量export const INCREMENT = 'increment'  所以我们就可以在App组件中导入import {INCREMENT} from './store/mutations-types'  
      1. 之后App组件中的所有increment变量都可以用INCREMENT代替，例如this.$store.commit(INCREMENT)
      2. 在index.js文件中继续导入import {INCREMENT} from './mutations-types' 
         ```
         因为INCREMENT = 'increment' 而这里我们想使用increment，所以必须加[],因为['a']的效果等于a的效果，中括号之间可以夹变量
         mutations:{
            [INCREMENT](state){
              state.counter++
            } ,
            decrement(state){
              state.counter--
            }
         }
         ```
