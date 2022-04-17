## Vuex
1. action使用详解
   1. 通常情况下，Vuex要求我们Mutation中的方法必须是同步方法，因为当我们使用devtools时，它可以帮助我们捕捉mutation的快照。但是如果是异步操作，那么devtools将不能很好的追踪这个操作什么时候会被完成。
   2. Vue官网不推荐在mutation中进行异步操作，因为devtools中追踪不到
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
              setTimeout(() => {
                 state.info.name = 'codewhy'
              } , 1000)
           }
         } 
      })
      这时虽然页面已经响应式的改变了，但是devtools中name还是kobe，原因是devtools插件不能成功的追踪到异步操作，实际上改了但是它检查不出来。
      ```
   3. Action类似于Mutation，就是用来替代mutation进行异步操作的。
      1. 不优雅的
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
                  state.info.name = 'codewhy'
               }
            } ,
            actions:{
               aUpdateInfo(context ， payload){   //context:上下文，这里指store对象
                  setTimeout(() => {
                     context.state.info.name = 'codewhy' //不可以这么做，相当于直接修改了state，而我们要求修改state只能通过mutation
                     context.commit('updateInfo')  //以前$store.commit方法，这里既然context相当于store，当然也有commit方法。
                     console.log(payload.message) 取出信息
                     payload.success()  调用传入的函数，告诉外面异步操作完成了
                  } , 1000)
               }
            }
         })

         在App.vue中可以通过actions操作异步修改info
         <button @click="updateInfo">修改信息</button>
         methods:{
            undateInfo(){
               //this.$store.commit('updateInfo')    之前直接跳转到mutation中
               this.$store.dispatch('aUpdateInfo' , {
                  message:'我是携带的信息' ，
                  success: () => {
                     console.log('里面已经完成异步操作了') ;
                  }
               })   现在通过action实现异步操作中间过渡。传入的第二个参数进入action中的aUpdateInfo函数中进行打印
            }
         }
         ```
      2. 优雅的
         ```
         actions:{
            aUpdateInfo(context ， payload){   //context:上下文，这里指store对象
               return new Promise((resolve,reject) => {
                  setTimeout(() => {
                     context.commit('updateInfo')  ;
                     console.log(payload) ;
                     resolve('提交成功')
                  } , 1000)
               })
            }
         }    
         在App.vue中可以通过actions操作异步修改info
         <button @click="updateInfo">修改信息</button>
         methods:{
            undateInfo(){
               this.$store
               .dispatch('aUpdateInfo' , '我是携带的信息')
               .then((res) => {
                  //里面完成了提交
                  console.log(res);
               })
            } //这里面的then是被返回到下面的，也就是期约执行实在下面执行的，在上面主要是拿到作用域，取出context参数，这样在下面才可以执行context.commit
         }
         ```
2. modules使用详解
   1. Vue使用单一状态树，那么意味着很多状态都需要交给Vuex进行管理。如果所有数据都放入state中，看起来太臃肿了，所以可以modules把这些数据分成不同的模块，每个模块都有自己的state，mutations等等
      1. 定义和使用方法
         ```
         index.js文件夹中
         const moduleB = {
            state:{
               name:'zhangsan'
            } ,
            mutations:{
               updateName:{
                  state.name = 'lisi'
               }
            } ,
            actions:{
              aUpdateName(context){        //这时context对象上下文就不是store对象了，指这个模块
                setTimeout(() => {
                  context.commit('updateName')
                } , 1000)        //这个commit只能提交这个模块中的mutations，不能提交根上的mutations
              }
            } ,
            actions:{
              aUpdateName({state,commit,rootState}){        //对象的解构，即context对象实际上有三个属性state，commit，rootState，因为这里只用到这三个属性。因为context为第一个参数，所以可以通过对象的解构直接把属性取出来
                commit('updateName')
              }
            } ,
            getters:{
               fullName(state){
                  return state.name + '11111'
               } ，
               fullName2(state，getters){         //这里拿到的getters是和它同一个模块中的getters，不能那别的模块，也不能拿总的getters
                  return getters.fullName + '11111'
               } ，
               fullName(state，getters，rootState){  //通过rootState拿到了根上面的state的counter。
                  return getters.fullName + rootState.counter
               }
            } 
         }
         const store = new Vuex.Store({
            state:{
               counter:1000
            } ,
            mutations:{} ,
            actions:{} ,
            getters:{} ,
            modules:{
               a:{
                  state:{} ,
                  mutations:{} ,
                  actions:{} ,
                  getters:{} ,
               } ,
               b: moduleB 
            }
         })
         App.vue文件夹中
         <h2>{{$store.state.b.name}}</h2> //最终是把module中的内容放到了state中，所以从state中取
         <button @click="updateName">修改名字</button>
         <h2>{{$store.getters.fullName}}</h2>  //也是我所谓getters定义在模块中还是原来的地方。
         <button @click="asyncUpdateName">异步修改</button>
         methods:{
            updateName(){
               this.$store.commit('updateName')
            } ,
            asyncUpdateName(){
              this.$store.dispatch('aUpdateName')
            }
         }
         ```
3. store文件夹的目录组织
   1. Vuex相关的代码都是些到index.js文件夹中的，如果代码太多很不方便管理。
      ```
      store           state不用单独抽出去放入一个文件夹，放在index.js中就可以了
          index.js           我们组装模块并导出store的地方
          actions.js         根级别的action
          mutations.js       根级别的mutation
          getters.js         根级别的getters
          modules            
                cart.js             购物车模块
                products.js         产品模块
      ```