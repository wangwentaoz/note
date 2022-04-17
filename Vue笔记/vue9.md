## Vue-Router
1. 认识路由
   1. 路由就是通过互联的网络把信息从源地址传输到目的地址的活动.
   2. 路由器提供了两种机制
      1. 路由:决定数据包从来源到目的地的路径
      2. 转送:将输入端的数据转移到合适的输出端
   3. 映射表:[内网ip1:电脑1mac地址,内网ip2:电脑2mac地址]
   4. 路由表本质上就是一个映射表,决定了数据包的指向
2. 前端渲染、后端渲染
   1. 后端渲染：
      1. 以前早期的网页只有html、css，没有js，都是用jsp(java server page)、php开发网页。当我们在浏览器中输入一个网页，浏览器会把这个url发送到服务器，服务器拿到地址后，首先进行解析，判断请求的网页是什么，比如淘宝网。服务器会在后台通过jsp直接把网页写好，这个网页中有html、css和一些Java代码，java的作用就是从数据库读取数据，并且将他动态的渲染到当前页面中。最终在服务器就已经完全弄好了页面的样子，意味着不会通过ajax请求了，再将最终渲染好的网页直接传到浏览器，传给浏览器的东西只有html、css，这就是最终展示的网页了。称为后端渲染，或者服务端渲染。每个url都在服务器上对应着一个网页，这种映射关系被服务器保存。
      2. 后端路由：后端处理url和页面之间的映射关系。
          1. 早期的网站开发整个html页面是由服务器来渲染的。服务器直接生产渲染好对应的html页面，返回给客户端进行显示。
          2. 每个页面都有自己对应网址（url），url会发送到服务器，服务器会通过正则对改url进行匹配，并且最后交给Controller进行处理。Controller会进行各种处理，最终生成html或者数据返回给前端。这就完成了一个IO操作。
          3. 这种操作就是后端路由，当我们页面中需要请求不同的路径内容时，交给服务器来进行处理，服务器渲染好整个页面，并且将页面返回给客户端。这种情况下渲染好的页面，不需要单独加载任何的js和css，可以直接交给浏览器显示，这样也有利于SEO优化。
          4. 缺点：一种情况是整个页面的模块由后端人员来编写和维护的。另一种情况是前端开发人员如果要开发页面，需要通过PHP和java等语言来编写页面代码。而且通常情况下html代码和数据以及对应的逻辑会混在一起，编写和维护都是非常糟糕的事情。
   2. 前后端分离阶段
      1. 随着ajax的出现，有了前后端分离的开发模式。后端只负责提供api来返回数据，前端通过Ajax获取数据并且可以通过js将数据渲染到页面中。后端链接着数据库，只负责提供数据。
      2. 这时还有个静态资源服务器，有的公司会把静态资源服务器和之前的服务器合并为一个，即提供静态资源，也提供一些接口。之前的服务器（API服务器）只负责提供一些api（接口），前端为了获取数据经常需要往这个服务器发送一些Ajax请求，服务器把数据返回，然后浏览器通过js代码继续执行，创建标签，把数据动态的放在浏览器上进行渲染。
      3. 当用户在浏览器中输入一个网页url，他就会去静态资源服务器中拿到前端写的三个文件，html，css，js ，浏览器会直接渲染html，css文件，然后执行js文件,当js代码向服务器请求api数据时，浏览器就会向之前的服务器请求相应的api资源，拿到大量数据后继续执行js代码。也就是我们的数据是从服务器请求过来的，然后我们自己写的js代码把它渲染到浏览器上。
      4. 这就是前端渲染，浏览器中显示的网页中的大部分内容，都是由前端写的js代码在浏览器中执行，最终渲染出来的网页。
      5. 优点：前后端责任清晰，后端专注于数据上，前端专注于交互和可视化上，并且当移动端出现后，后端不需要进行任何处理，依然使用之前的一套Api即可。
   3. 单页面富应用阶段 SPA(simple page web application)
      1. 其实SPA最主要的特点就是在前后端分离的基础上加了一层前端路由，也就是前端来维护一套路由规则，url和页面的映射关系。前端路由的核心是改变url但是页面不进行整体的刷新。
      2. 整个网页只有一个html页面，SPA阶段和前后端分离阶段在静态资源服务器上存放的数据是不同的。
         1. 前后端分离时，在静态资源服务器上存放了好几套的html+css+js文件，每一套文件对应一个url，请求不同的url返回不同套的文件。
         2. SPA阶段只有一套文件，index.html , css和js文件数目不确定，可能都只有一个。请求不同的url时全都下载这同一套相同的文件，里面包含全部的资源。但并不是里面所有的内容全都渲染执行。
            1. 当我们点击这个页面中的按钮请求首页页面、关于页面、我的页面，会使用前端路由作为技术支撑，里面配置一些映射关系，每当我们点击不同的按钮，都会在浏览器上生成不同的url，即显示不同的网页（url），但是这里显示url和之前的不同，之前是立即向静态资源服务器请求html、css、js文件，而这里前端路由会生成url，但是生成的这个url不会向服务器请求资源的。他只会通过js代码的判断，将我们要显示的代码从我们之前请求的全部资源里面抽取下来进行显示。
            2. 其实这里抽取下来的资源就是一个个组件，每个组件就是一个页面。也就是我们之前开发的时候开发了很多页面，他们都打包到一个js文件里了，前端会监听浏览器，一旦发现浏览器的url变了，他就会从js中找到这个url相关的组件部分文件在界面上进行渲染。一旦url再次改变，他就又会从包含全部资源的js文件中找到这个url对应的相应的组件来渲染。前端路由就是 映射url和js文件中渲染的组件 之间的关系。
      3. 前端路由的核心就是改变url，但是页面不进行整体的刷新。两种方案
         1. 改变url的hash:
            1. 当发现hash发生改变时，不会向服务器请求资源，他会根据在前端路由中的映射来寻找需要渲染的组件，然后取出来进行渲染。
            2. url的hash也就是锚点（#），本质上是改变window.location的href属性
            3. 我们可以通过直接赋值location.hash = 'foo'来改变href，但是页面不刷新
         2. HTML5的history模式：pushState
            1. 可以通过这个history对象来修改url，网页也是不会刷新。
            2. history.pushState({},'','home') 第三个参数是修改url的。这个是一个栈结构，所以用push，如果后面还要继续history.pushState({},'','about') ，连续向栈中连续放入两个url，这个栈顶永远是后放入的，这里就是about。如果调用history.back（），就会将栈顶的移除掉，现在的url就是home了。和网页中左上角的后退、前进两个按钮实现差不多，都是通过栈结构。history.forward()是前进，入栈。
         3. HTML5的history模式：replaceState
            1. 可以通过这个history对象来修改url，网页也是不会刷新。
            2. history.replaceState({},'','home')第三个参数是修改url的。这个和上面的pushState就不同，不可以回退，左上角的后退按钮也不能点击，这个直接就是替换的，不是栈操作。
         4. HTML5的history模式：go
            1. 只能在pushState时使用，直接跳到栈的某个位置。
            2. history.back()等价于history.go(-1)
            3. history.back()等价于history.go(1)
3. vue-router安装和配置
   1. 目前三大框架都有自己的路由实现
      1. Angular的ngRouter
      2. React的ReactRouter
      3. Vue的vue-router
   2. vue-router是vue.js官方的路由插件，他和vue.js是深度集成的，适合用于构建单页面应用。官网为https://ruoter.vuejs.org/zh/ 
   3. vue-router是基于路由和组件的
      1. 路由用于设定访问路径，将路径和组件映射起来
      2. 在vue-router的单页面应用中，页面的路径的改变就是组件的切换。
   4. 安装
      1. npm install vue-router --save  程序运行在客户端时还需要依赖这个路由，所以是--save
      2. 在模块化工程中使用他（因为是一个插件，所以可以通过Vue.use()来安装路由功能）
         1. 第一步：导入路由对象，并且调用Vue.use(VueRouter)
         2. 第二步：创建路由实例，并且传入路由映射配置
         3. 第三步：在Vue实例中挂载创建的路由实例
4. 使用
   1. 在src文件夹中创建一个router文件夹，在里面创建一个index.js文件，通常是创建好的。
   2. 在index.html文件中配置相关信息
      ```
      import Vue from 'vue'   导入Vue
      import Router from 'vue-router'    导入路由，这个路由就是一个插
      Vue.use(Router)     通过Vue.use命令安装插件router
      const routes = [
        {
          path:'/home' ,        路径为/home时
          component : Home   
        },{
          path:'/about' ,        路径为/about时
          component : About
        }
      ]
      export default new Router({    创建路由对象，和new vue差不多，这里也需要传数
        routes            配置路由和组件之间的映射关系
      }) 
               最后将router对象传入到Vue实例中，即挂载到vue实例中。在new vue时传入router：router属性，所以这里导出export default 。当在main.js文件夹中导入时import router from './router'  ./router后面的.index.js文件是可以省略的，这里就不用写./router/index
      ```
   3. 使用vue-router的步骤
      1. 一：创建路由组件
      2. 二：配置路由映射：组件和路径映射的关系
      3. 三：使用路由：通过<router-link>和<router-view>,这两个组件是被vue全局注册好的。
         1. router-link表示我们显示的链接，点击之后就会跳转到某个组件，在页面上它最终被渲染为a标签，所以样子和a标签一样。
         2. router-view是根据当前的路径，动态渲染出我们将要显示的组件，用来占位用的。网页的其他内容，比如顶部的标题、导航，或者底部的一些版权信息等会和<router-view>在同一个层级，即路由切换时，切换的就是这里挂载的组件，其他内容不改变。 
   4. 路由的默认路径
      1. 我们希望进入网站的首页，<router-view>直接渲染首页的内容
      2. 只需要在配置里多配置一个映射就可以了
         ```
         const routes =[       我们在配置中又配置了一个映射
            {
               path:'/' ,      这里表示当路径没有显示的时候
               redirect:'/home'    redirect表示重定向，我们将根路径/重定向到/home的路径下。
            }
         ]
         ```
      3. 默认情况下，路径是hash模式，即有个#，如果想用HTML5表示的话，只需要在index.js中默认导出的路由添加一个属性，mode：history
               ```
               export default new Router({
                 routes ,
                 mode:'history'
               })
               ```
   4. router-link的补充
      1. 我们之前只讲了一个属性，to，用于指定跳转的路径。
      2. tag="button" ：指定<router-link>之后渲染成什么组件，比如上面的代码被指定渲染成了一个a标签。
      3. repalce="replace" :表示左上角不可以点击回退了，即这里不是用pushState，而是用replaceState
      4. router-link被点击之后会被添加一个类名，router-link-active，所以我们可以根据这个类名给他添加css样式，如果想要修改这个类名，可以通过它的属性active-class修改名字，即active-class="active" 。但是如果想要在这两个router-link标签上全都修改这个属性，有一个简便写法，在index.js中默认导出的地方修改就行，如下
      ```
               export default new Router({
                 routes ,
                 mode:history ，
                 linkActiveClass:'active'
               })
      ```
   5. 通过代码跳转路由
      1. 之前跳转路由都是通过<router-link>的，我们也可以直接通过App.vue中的代码跳转路径
         ```
         <template>
           <div id="app">
             <button @click="homeClick">首页</button>
             <button @click="aboutClick">关于</button>
             <router-view></router-view>
           </div>
         </template>

         <script>
         export default {
           name: 'App' ，
           methods:{
              homeClick(){
                 //history.pushState('/home') 不要通过这种绕过路由的方法改变url
                 this.$router.push('/home')   路由给每个组件都提供了$router属性(因为这个$router其实是值index.js中创建的router对象的),可以调用它的push方法给url添加/home从而跳转网页
                 this.$router.replace('/home') 这个replace方法不能返回
              } ,
              aboutClick(){
                 this.$router.push('/about')
              }
           }
         }
         </script>
         ```
5. 动态路由
   1. 某些情况下一个页面的path路径是不确定的，比如我们进入用户界面时希望是如下路径：http://localhost:8081/user/userid 这种path和component的匹配关系，我们称之为动态路由（也是路由传递数据的一种方式）
   2. 需要修改两处地方
      1. App.vue  <router-link to="/user/zhangsan">用户</router-link>
      2. index.js {path:'/user/zhangsan' ,component: User}
   3. 如果我们想要动态的从外面抓取用户信息，即张三是外面传进来的，是一个被定义在data中的变量
      1. App.vue  <router-link :to="'/user/' + userId">用户</router-link> 这里面的userId是我们在下面data中定义的数据
      2. index.js {path:'/user/:abc' ,component: User}  这里面的:userId是指可以动态获取数据，名称没必要和使用时的userId相同，比如这里就叫abc
   4. 如果我们希望这个userId在user.vue这个组件中显示，那么可以通过this.$route.params.abc取到这个数据，这里面的 $route 就是我们每次显示在App.vue组件上的小组件，可能是about、home、user，哪一个路由处于活跃状态，拿到的就是哪个路由，在路由映射里面有好几个路由。里面有个$params方法，可以取到注册在routes中的活跃的对象的path路径中信息，这里.abc ,那么拿到的数据就是路径中的userId数据。
   ```
   {
    path:'/user/:abc' ,
    component: User
   }
   ```
   5. $router 和 $route
      1. $router：路由器，指的是index.js文件夹中默认导出的路由器，路由器管理下面的三个路由，也就是三个组件
      2. $route：路由，是我们页面中的三个组件之一，这三个组件都被称为路由
6. vue-router打包文件
   1. 路由的懒加载：当打包构建应用时，js包会变的非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
   2. 这里的文件打包后会在dist文件夹中出现三个文件，首先是index.html，其次是css文件和js文件，css文件是从我们写出的css代码中分离出来的。
      1. js文件夹中有三个文件首先就是app.js ，当前应用程序开发的所有代码，即我写的所有业务代码，首页，关于，等等页面的代码。
      2. vendor.js文件，vendor：提供商，第三方。指的是在我们项目中引用的第三方的东西，比如vue、vue-router、axios、bs
      3. manifest.js文件，为我们打包的代码做底层支撑的，我们项目中用到了很多模块化，import等，但是我们最终打包的js文件是不支持common.js的，甚至有的es6都不支持，所以需要通过某种方式让我们之前的导入导出变成有效的，浏览器可以识别的，所以就要写一些代码对导入导出做底层支撑的，这里面打包的就是这样的代码。
   3. 如果所有页面的代码全都打包一个app.js文件中，那么这个文件会变得非常大。我们希望每一个路由组件都被打包为一个个小的js文件，而且这个js文件默认情况下是不会跟着整个文件全都一起请求下来的，假如用户刚刚打开应用程序，我们默认展示的是首页，路由文件我们只请求首页这一个文件，其他的路由组件页面还是在服务器，可以大大降低请求的响应时间，避免出现短暂空白的情况。如果用到别的页面再次请求就可以了。上述过程称之为懒加载：用到时再加载。
   ```
   之前的效果
   import Home from '../components/home.vue'
   import About from '../components/about.vue'
   Vue.use(Router)
   const routes = [
    {
      path:'/home' ,
      component : Home
    },{
      path:'/about' ,
      component : About
   }]
   现在的效果
   const Home = () => import('../components/home.vue')
   const About = () => import('../components/about.vue')
   Vue.use(Router)
   const routes = [
      {
         path:'/home' ,
         component : Home
      },{
         path:'/about' ,
         component : About
      }]
   ```
   4. 这时打包的js文件中就会多出两个文件，app、vender、manifest这三个js文件外加我们懒加载的两个文件。App.vue文件还处于业务逻辑中，并没有懒加载，所以还存在于app.js文件中。多出了两个文件是我们懒加载的两个路由组件，首页和关于 这两个文件，他俩并不会一开始就从服务器请求下来，只有我们用到了他才会去请求。
   5. 懒加载的三种方式
      1. 方式一：结合Vue的异步组件和Webpack的代码分析
         ```
         constt Home = resolve => { require.ensure(['../components/Home.vue'], ()=>{resolve(require('../components/Home.vue')) }) };
         ```
      2. 方式二：AMD写法
         ```
         const About = resolve => require(['../components/About.vue'],resolve) ;
         ```
      3. 方式三：再ES6中，我们可以有更加简单的写法来组织Vue异步组件和Webpack的代码分割
         ```
         const Home = () => import('../components/Home.vue')
         ```
7. 路由的嵌套使用
   1. 嵌套路由是很常见的功能，比如再home页面中，我们希望通过/home/news和/home/message访问一些内容。一个路径映射一个组件，访问这两个路径也会分别渲染两个组件。
   2. 实现嵌套有两个步骤
      1. 创建对应的子组件，并且在路由映射中配置对应的子路由
      2. 在组件内部使用<router-view>标签
         ```
         配置映射
         const routes = [
           {
             path:'/home' ,
             component : Home ,
             children : [
               {
                 path:'news' ,          注意这里面不需要加/
                 component: HomeNews
               },{
                 path:'message' ,
                 component : HomeMessage
               }
             ]
           },{
             path:'/about' ,
             component : About
           }
         ]
         之后在home.vue中添加<router-view><router-link>标签就可以使用了
         <template>
           <div>
             <h2>我是首页</h2>
             <p>我是内容哈哈哈</p>
             <router-link to="/home/news">新闻</router-link>       这里要写上完成的路径才能跳转成功
             <router-link to="/home/message">消息</router-link>
             <router-view></router-view>
           </div>
         </template>
         ```
