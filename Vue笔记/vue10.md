## Vue-Router
1. 参数传递
   1. 当我们从一个页面跳转到另一个页面时，我们希望他们之间可以传递消息，比如之前传递的userid
   2. 为了传递参数，我们这里先创建一个组件
      1. 创建新的组件Profile.vue    Profile：档案，通常作为 我的 文件名使用
      2. 配置路由映射
      3. 添加跳转的<router-link>
   3. 传递参数的两种方式
      1. params
         1. 配置路由格式：/router/:id
         2. 传递的方式：在path后面跟上对应的值
            1. <router-link :to="'/user/' + userid"></router-link>
         3. 传递后形成的路径：/router/123 , /router/abc
            1. $route.params.id
      2. query
         1. 配置路由格式：/router , 也就是普通的配置
         2. 传递的方式：对象中使用query的key作为传递方式
            1. <router-link :to="{path:'/profile' , query:{name:'why' , age: 18 }}">
         3. 传递后形成的路径：/router?id=123 , /router?id=abc,  http://localhost:8080/profile?name=why&age=18
            1. $route.query.name
         4. 通过代码跳转
            ```
            <button @click="profileclick">档案</button>

            methods:{
              profileclick(){
                this.$router.push({
                  path:'/profile' ,
                  query:{
                    name:"kobe" ,
                    age: 18 
                  }
                })
              }
            }
            ```
2. $route 和 $router
   1. $router在任何组件中拿到的都是相同的东西，指的都是index.js文件中导入的import Router from 'vue-router' ，最后在下面默认导出New的router，然后这个被main,js文件导入，在main.js中又导入的App.vue。所以在App.vue下面的组件中拿到的 $router都是之前导入的router
      1. $router为VueRouter实例，想要导航到不同的URL，则使用 $router.push方法
   2. $route是我们在index.js中配置的路由，即路由器下面配置的路由和组件的映射关系 中的路由。进入哪一个路由组件中，哪一个就处于活跃状态，我们这里的 $route指的就是哪个路由。
      1. $route为当前router跳转的对象，里面可以获取name、path、query、params等
   3. vue.use(VueRouter) 其实内部是执行的VueRouter.install方法，安装这个插件
   4. 所有的组件都是对象，都继承自vue类的原型，而vue.prototype上面有一个$router 和 $route两给属性，所以我们拿到的这两个值都是定义在vue原型上的。
3. 全局导航守卫
   1. 需求：切换不同的网页时，改变网页的<title>标题
   2. 三个生命周期函数：不止vue被创建时有生命周期函数，每一个组件被创建时也有生命周期函数
      1. created(){} 组件被创建时就会回调这个函数
        ```
        home.vue文件中，在script标签中export default中默认导出created方法
        created(){
          document.title = '首页'
        }
        之后再每个vue组件中全都添加created方法，就可以修改网页的title标题了
        ```
      2. mounted(){} template被挂载到dom上会回调这个函数
      3. updated(){} 界面发生刷新时会会掉这个函数。
      4. destroyed(){} 和created生命周期函数相对，这个是表示组件被销毁时就会调用这个函数
      5. activated(){} 一旦界面进入活跃状态（即我们进入了这个组件页面中）就会执行这个函数，这个函数只有该组件被保存了状态使用了keep-alive时，才有效。原因是如果不保存组件的状态，每次都要重新渲染，那么我们就没必要记录这个界面的活跃状态了，他是用一次之后就没有了，就死了。 
      6. deactivated(){} 一旦界面不活跃了就会执行这个函数，同上只有使用keep-alive才有效
   3. 导航守卫主要用于监听路由的进入和离开的。vue-router提供了beforeEach的守卫函数和afterEach的钩子函数，他们会在路由组件即将改变前和改变后触发。
      1. 首先我们可以在钩子当中定义一些标题，可以用meta来定义
      2. 然后就可以利用导航守卫修改我们的标题。
      3. 导航守卫(guard)的三个参数
         1. to：即将要进入的目标的路由对象
         2. from：当前导航即将要离开的路由对象
         3. next()：调用该方法后，才能进入下一个钩子。
    ```
    在index.js文件中，我们new了一个路由器，在路由器下面给他添加导航守卫方法
    router.beforeEach((to,from,next) => {
      document.title = to.meta.title          把将要到达的路由组件中的title拿到，赋给DOM。但是这个title我们需要在index.js文件中配置路由的映射关系时加上源数据meta，然后通过to.title获取 。但是会出现问题，即首页的title时undefined
      document.title = to.matched[0].meta.title   这里不能直接去meta中取title，因为在首页中我们设置了嵌套，/home/news ，如果是/home的话我们会正常取到首页，我们这里to去到的路由组件是首页和它下面的小路由组件news，所以这里to里面的meta就没有数据，但是to对象里面有上面的两个匹配路由组件，我们拿到第一个matched[0] ,也就是首页，也就相当于别的组件中拿到的to了
      next()         必须调用next()函数，不调用就不会进入下一步，出错
    })
    ```
   4. 补充
      1. 如果是后置钩子(hook)，也就是afterEach，不需要主动调用next()函数，因为这里是跳转到下一个组件路由完了，所以也就不需要在调用next()函数了。
      2. 上面我们使用的导航守卫和钩子。被称为全局守卫，意味着只要路由进行跳转就会执行这两函数。除了这两个全局守卫，还有路由独享的守卫和组件内的守卫
         1. 路由独享的守卫：只有进入到某个路由里面，才会进行回调的函数
            ```
            在路由配置上直接定义beforeEnter守卫,这里面的三个参数和之前的全局守卫的参数相同
            const router = new VueRouter({
              routes:[{
                path:'/foo' ,
                component:Foo ,
                beforeEnter:(to,from,next) => {}
              }]
            })
            ```
         2. 组件内的守卫： 看官网学习
            ```
            const Foo = {
              template:`` ,
              beforeRouteEnter (to,from,next){} ,
              beforeRouteUpdate (to,from,next){} ,
              beforeRouteLeave (to,from,next){} ,
            }
            ```
4. keep-alive
   1. 当我们切换组件时，通常是重新创建一个新的组件，但如果我们之前使用过某个组件再次切换回去时，是否能保留上次使用过的组件原来的状态。例如当我们从首页中的新闻组件切换到消息组件时，我们切换首页组件到关于，当再次切换回首页，是否可以保留切换到消息组件的状态。
   2. keep-alive是vue内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染
      1. <router-view>也是一个组件，如果直接被包含在keep-alive里面，所有路径匹配到的视图组件都会被缓存
         1. 例如我们如果在home中使用了created(){}生命周期函数函数，当从首页跳转到关于，然后再次点击首页，这个生命周期函数并不会再次调用，意味着首页我们只创建了一次。
      2. 在App.vue文件夹中添加<keep-alive><router-view/></keep-alive> 。
         1. 但是我们点击首页中的消息，之后跳转到关于页面，然后再次点击首页，会发现并没有停留在消息页面，而是重新回到了首页下的新闻组件。
         2. 原因：我们在点击首页进行路由跳转时，他自动跳转到news地址，我们又重新加载/home/news地址，所以会重新进入页面，并没有进入之前首页下的message页面。虽然不再重新创建首页了，但是我们跳转的地址还是/home/new，我们这里是指定了跳转的地址，即使首页没有重新创建。
          ```
          home.vue文件中
          data(){
            return {path: '/home/news'}
          } ,
          activated(){
            this.$router.push(this.path);     点击首页后，默认跳转到下面的news组件
          } , 
          beforeRouteLeave (to,from,next){
            this.path = this.$route.path;     离开首页时，获取当前路由中的路径，可能是news或messages，赋值给path
            next()
          }
          ```
   3. keep-alive中两个重要的属性
      1. 因为我们这里的keep-alive是放在App.vue中的，所以首页、关于、用户这三个组件第一次创建后都会被保留状态。但是我们希望档案这个组件每次进入都重新创建，每次离开全都销毁。
      2. include：字符串或者正则表达式，只有匹配的组件才会被缓存
      3. exclude：字符串或者正则表达式，任何匹配的组件都不会被缓存
        ```
        App.vue文件中
        <keep-alive exclude="Profile,User">  这个Profile我们是从Profile.vue文件中默认导出的对象中的name属性。注意，这两个排除的组件Profile和User之间不要随便加空格，不可以写成exclude="Profile,   User"，加上空格之后User就没效果了。就好比正则表达式，匹配2~9个数字\d{2,9} 这里的2,9之间也不能加空格，不可以写为2,  9
          <router-view/>
        </keep-alive>
        ```
5. 文件夹起别名
   1. 在build文件夹，webpack.base.conf.js文件中，有一个resolve对象，里面有alias属性，这里就给我们写代码的src文件起了一个别名，@，即我们以后写路径可以写'@/components/tabbar/tabbar' 。我们也可以起一些自己的别名，如下我们写好的路径别名，我们写上面的路径就可以写为'components/tabbar/tabbar' 
   2. 我们在import中可以是用这种路径，但是在src属性中我们不能写这种路径，找不到。如果要使用起别名的这种方式，必须在前面加一个~符号，例如src="~assets/img/tabbar/home.svg"
      ```
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': resolve('src'),
          'assets': resolve('src/assets'),
          assets:'@/assets' ,
          'components':resolve('src/components'),
          'views':resolve('src/views')
        }
      }
      ```
6. Promise
   1. Promise是异步编程的一种解决方案
      1. 很常见的应用场景就是网络请求了，我们封装一个网络请求的函数，因为不能立即拿到结果，所以往往我们会传入另外一个函数，在数据请求成功时，将数据通过传入的函数回调出去。如果只是一个简单的网络请求这种方案不会给我们带来很大的麻烦，但是当网络请求非常复杂时就会出现回调地狱。
   2. Promise是一个类,虽然代码多了，但是结构更好看了
      ```
      new Promise((resolve,reject) => {
         setTimeout(() => {
            resolve('hello')
         } , 1000)
      }).then((data) => {
         console.log(data);
         return new Promise((resolve,reject) => {
            setTimeout(() => {
               resolve()
            },1000)
         })
      }).then(() => {
         console.log("abc");
      })
      失败的情况，拿到错误信息，但后面是调用catch函数而不是then
      new Promise((resolve,reject) => {
         setTimeout(() => {
            reject('error message')
         } , 1000)
      }).then(() => {
         console.log("abc");
      }).catch((error) => {
         console.log(error);
      })
      ```
   3. 只要有异步操作时，就可以使用Promise，把异步操作放入new Promise中，把异步请求成功后的操作放入.then函数中进行处理 
      1. new Promise -> 构造函数(1.保存一些状态信息 2.执行传入的函数，即上面的箭头函数 3.执行这个转入的函数时，他会给这个箭头函数传入两个参数，resolve，reject 3.执行我们定义的异步函数，即上面的setTimeout，但是他不希望我们在这个异步函数里面进行处理数据，它希望我们在Promise后面的then函数中进行处理，所以箭头函数中只是写异步代码的，不负责处理，在后面处理 )
   4. Promise三种状态  
      1. 只要存在异步操作，我们就可以给异步操作包装一个Promise，但是异步操作之后会存在三种状态
         1. pending：等待状态，比如正在进行的网络请求，或者定时器时间没到
         2. fulfill：满足状态，当我们主动调用了resolve时，就处于该状态，并且会调用.then()
         3. reject：拒绝状态，当我们主动调用了reject时，就处于该状态，并且会调用.catch()
      2. 另一种处理形式
         ```
         原来的方式
         new Promise((resolve,reject) => {
            setTimeout(() => {
               resolve('hello vue.js');
               reject('error message');
            } ,1000)
         }).then().catch()
         新方法
         new Promise((resolve,reject) => {
            setTimeout(() => {
               resolve('hello vue.js');
               reject('error message');
            } ,1000)
         }).then(函数1，函数2)  函数1会在上面满足时也就是resolve时执行，函数2会在拒绝时也就是reject时执行，和setTimeout中resolve和reject书写顺序无关。这个新方法和上面原来的写了两个函数一个then一个catch效果相同的
         ```
   5. Promise的链式调用
      1. 简写：关键是后续的promise中只有传参，并没有别的动作，比如异步等
         ```
         new Promise((resolve,reject) => {
            setTimeout(() => {
               resolve('aaa')
            } , 1000)
         }).then((res) => {
            console.log(res);
            return new Promise((resolve) => {
               resolve(res+'111')
            })
         }).then(() => {
            console.log("abc");
         })
         简写
         new Promise((resolve,reject) => {
            setTimeout(() => {
               resolve('aaa')
            } , 1000)
         }).then((res) => {
            console.log(res);
            return Promise.resolve(res+'111')
         }).then((res) => {
            console.log(res);
         })
         再次简写
         new Promise((resolve,reject) => {
            setTimeout(() => {
               resolve('aaa')
            } , 1000)
         }).then((res) => {
            console.log(res);
            return res+'111'        这里默认是resolve，不是reject。可以通过throw 'err' 抛出异常，后面的catch也能捕捉到
         }).then((res) => {
            console.log(res);
         })
         ```
   6. 需求本身依赖两个请求，必须两个请求全都resolve之后才能满足需要，达成功能
      1. 使用promise.all 。
         ```
         Promise.all([
            new Promise((resolve,reject) => {
               setTimeout(() => {
                  resolve('result1')
               } , 1000)
            }) ,
            new Promise((resolve,reject) => {
               setTimeout(() => {
                  resolve('result2')
               } , 1000)
            })
         ]).then(result => {
            results[0]       在最后的then函数中，会拿到一个result数组，里面保存着两次期约resolve中返回的参数，这里通过result[0]\result[0]拿到了他们的值：result1\result2
            results[1]       
         })
         ```