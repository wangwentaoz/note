##  网络请求封装(axios)
1. 网络请求模块的选择
   1. 一般即使选择第三方框架来进行网络请求，我们也会对其进行进一步的封装，之后并不是面向第三方框架进行网络请求，而是使用自己封装好的模块。因为第三方可能某天突然不维护或者出现bug，这时再去切换框架就非常麻烦了。
   2. 网络模块的选择
      1. 一：传统的Ajax是基于XMLHttpRequest（XHR）。但是现在已经不太用了，因为配置和调用方式等非常混乱，编码起来看起来非常不好看，所以真实开发中使用jQuery-Ajax
      2. 二：jQuery-Ajax，相比于传统的ajax非常好用，但是我们现在也不用它，因为在Vue的整个开发过程中是不会使用jQuery的，如果为了网络请求特意引用jQuery(1w+行的代码)，根本没必要。
      3. 三：在Vue1.x版本的时候，推出了Vue-resource，它的体积相当于jQuery小很多，并且是Vue官方推出的。但是在Vue2.x版本出来时，就去掉了这个功能，Vue-resouce不再支持新的版本，并且不再更新和维护。
      4. 四：Vue作者推荐了一个框架，axios。
   3. 前端开发中，常见的网络请求方式就是JSONP，目的是解决跨域访问的问题。
      1. 原理
         1. JSONP的核心在于通过<script>标签的src来帮助我们请求数据。
         2. 原因是我们的项目部署在domain1.com服务器上时，是不能直接访问domain2.com服务器上的资料的。
         3. 这个时候我们利用<script>标签的src帮助我们去服务器请求到数据，将数据当作一个JavaScript的函数来执行，并且执行的过程中传入我们需要的json
         4. 所以封装jsonp的核心就在于我们监听window上的jsonp进行回调的名称
      2. 如何封装？
   4. axios功能特点
      1. 在浏览器中发送XMLHttpRequest请求
      2. 在node.js中发送http请求
      3. 支持Promise API
      4. 拦截请求和响应
      5. 转换请求和响应数据
2. axios框架的基本使用
   1. 支持多种请求方式
      1. axios(config)
      2. axios.request(config)
      3. axios.get(url[,config])
      4. axios.delete(url[,config])
      5. axios.head(url[,config])
      6. axios.post(url[,data [,config]])
      7. axios.put(url[,data [,config]])
      8. axios.patch(url[,data [,config]])
   2. 安装axios框架
      1. npm install axios --save
      2. 在main.js中进行引入，import axios from 'axios' ，之后在下面直接axios(config)进行使用就可以了。config作为一个对象传入，
      ```
      因为axios本身返回一个promise，所以拿到数据后会调用resolve方法，直接调用.then函数
      axios({
        url:'http://123.207.32.32:8000/home/multidata' ,
        method:'get'
      }).then((res) => {
        console.log(res);
      })
      这里如果只传一个url默认是get请求,这里通过method添加上get请求
      axios.get() 、 axios.post() 等都可以

      axios({
        url:'http://123.207.32.32:8000/home/data?type=sell&page=1' 
      }).then(() => {})
      axios({
        url:'http://123.207.32.32:8000/home/data' ,
        params:{
          type:'pop' ,
          page: 1
        }
      }).then(() => {})
      ```
3. 发送并发请求
   1. 有时我们需要同时发送两个请求，并且等到两个请求全都返回之后再进行相关处理。之前使用promise.all()进行处理的，但是axios也提供了相应的api
   2. 使用axios.all([axios({url}) , axios({url})]).then((results)=>{results[0]\results[1]})，可以放入多个请求的数组，返回的结果是一个数组。
   3. axios.all([axios({url}) , axios({url})]).then(axios.spread((res1,res2)=>{}))。使用axios.spread可将数组 [res1,res2] 展开为res1 ，res2 
4. 全局配置
   1. 在上面的案例中，我们的baseurl是固定的，事实上，在开发中可能很多参数都是固定的，这时我们可以进行一些抽取，也可以利用axios的全局配置
      ```
      axios.defaults是一些默认属性
      axios.defaults.timeout = 5000
      axios.defaults.baseURL = '123.207.32.32:8000'
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      axios({
        url:'home/data?type=sell&page=1' 
      }).then(() => {})      //这里面都设置了一些默认属性
      ```
   2. 常见的配置选项
      1. 请求地址 url:'/user'
      2. 请求类型 method:'get'
      3. URL查询对象 params:{id:12} //这个和上面的method:'get'是相对应的
      4. request body  data:{key:'aa'}  //这个和上面的method:'post'是相对应的
      5. 请求根路径 baseURL:'http://www.mt.com/api'
      6. 请求前的数据处理 transformRequest:[function(data){}]
      7. 请求后的数据处理 transformResponse:[function(data){}]
      8. 自定义的请求头 headers:{'x-Requested-With':'XMLHttpRequest'}
      9. 查询对象序列化函数 paramsSerializer:function(params){}
      10. 超时设置s timeout:1000
      11. 跨域是否带Token withCredentials:false
      12. 自定义请求处理 adapter:function(resolve,reject,config){}
      13. 身份验证信息 auth:{uname:'',pwd:'12'}
      14. 响应式的数据格式json/blob/documenet/arraybuffer/text/stream responseType:'json'
5. axios实例
   1. 创建axios实例的原因
      1. 当我们从axios模块中导入对象时，使用的实例是默认的实例。当给该实例设置一些默认配置时，这些配置就固定下来了。前面例子中我们都是使用全局的axios和对应配置在进行网络请求
      2. 但是后续开发中，某些配置可能会不太一样，比如某些请求需要使用特定的baseURL或者timeout，这个时候我们就可以创建新的实例，并且传入属于该实例的配置信息
   2. 创建对应的axios实例
      1. d
        ```
        创建实例
        const instance1 = axios.create({
          baseURL:'http://222.111.33.33:8000' ,
          timeout: 5000
        })
        使用实例
        instance1({
          url:'/home/multidata' 
        }).then(() => {})
        ```
6. axios模块封装
   1. 在App.vue组件中创建生命周期函数created，每当组件被加载就发送网络请求，并把请求到的数据保存在data中的result中，最后放在h2中进行展示。
   2. 但是这里面对框架依赖性太强，每个组件都需要引入axios框架发送请求，如果框架不维护或者出bug了，要一个一个组件改框架，非常不好
      ```
      <template>
        <div id="app">
          <h2>{{result}}</h2>
        </div>
      </template>

      <script>
      import axios from 'axios'
      export default {
        name: 'App' ,
        data(){
          return {
            result:''
          }
        } ,
        created(){
          axios({
            url:'http://123.207.32.32:8000/home/multidata'
          }).then( res => {
            this.result = res ;
          })
        }
      }
      ```
   3. 所以需要对这个axios框架功能进行一个封装，封装到一个文件中，之后所有的组件进行网络请求时是面向我们自己封装的文件的。
      1. src下面新建文件夹network,之后创建一个request.js文件
        ```
        request.js文件中
        import axios from "axios";
        export function request(config ,success ,failure){
          const instance = axios.create({
            baseURL:'http://123.207.32.32:8000' ,
            timeout: 5000
          })
          //发送真正的网络请求
          instance(config)
            .then(res=>{
              console.log(res);
              success(res);
            })
            .catch(err=>{
              console.log(err);
              failure(err);
            })
        }
        main.js文件中调用这个函数
        import {request} from './network/request'  
        request({
          url:'/home/multidata' 
        } , res => {
          console.log(res);
        } , err => {
          console.log(err);
        })
        ```
        ```
        另一种方法，只传一个config参数,即把上面的三个参数保存在一个大的config对象中
        request.js文件中
        import axios from "axios";
        export function request(config){
          const instance = axios.create({
            baseURL:'http://123.207.32.32:8000' ,
            timeout: 5000
          })
          //发送真正的网络请求
          instance(config.baseConfig)
            .then(res=>{
              console.log(res);
              config.success(res);
            })
            .catch(err=>{
              console.log(err);
              config.failure(err);
            })
        }
        main.js文件中调用这个函数
        request({
          baseConfig:{} ,
          success:function (res){} ,
          failure:function (err){}
        })
        ```
      2. 优雅的方案：给结果包装成promise
        ```
        request.js文件中
        import axios from "axios";
        export function request(config){
          return new Promise((resolve,reject) => {
            const instance = axios.create({
              baseURL:'http://123.207.32.32:8000' ,
              timeout: 5000
            })
            //发送真正的网络请求
            instance(config)
              .then(res=>{
                resolve(res)
              })
              .catch(err=>{
                reject(err)
              })
          })
        }
        main.js文件中调用这个函数
        request({
          url:'/home/multidata'
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
        ```
      3. 最优雅的方案
          ```
          request.js文件中
          import axios from "axios";
          export function request(config){
            const instance = axios.create({
              baseURL:'http://123.207.32.32:8000' ,
              timeout: 5000
            })
            //因为instance本身axios返回的就是一个期约，所以我们就不用包装了，如果返回的不是期约，是需要包装的
            return instance(config)
          }
          main.js文件中调用这个函数
          request({
            url:'/home/multidata'
          }).then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
          ```
7. 拦截器
   1. 如果发送某些请求之前我们想要做一些拦截，比如拼接上一些东西，或者判断是否携带某些东西，就是想把请求先拦截再发送。
   2. axios拦截器
      1. 用于每次发送请求或者得到响应后，进行对应的处理。请求成功、请求失败时都可以进行拦截；响应成功、响应失败时可以进行拦截，一共四种方法。
      2. 使用方法：
        ```
        export function request(config){
          const instance = axios.create({
            baseURL:'http://123.207.32.32:8000' ,
            timeout: 5000
          })
          //在下面进行请求拦截
          instance.interceptors.request.use(config => {
            console.log(config);
            return config;       //我们的拦截器必须要return，否则真就把request拦截了.一般我们会在这里进行一些操作，比如一：config中的信息不符合服务器的要求，需要进行处理。比如二：我们每次发送网络请求时，都希望在界面中显示一个请求的图标，就像点击提交后有个小图标在转圈，成功响应后就不转圈了。比如三：某些网络请求(如登录)，必须携带一些特殊的信息(登录携带令牌token)，如果没有携带信息，应该给用户提示，把这次请求拦截，并跳转到某个网址让用户先登录。
          } , err => {
            consol.log(err);
          })          //本地拦截请求,使用use方法，第一个参数是请求成功调用的函数，第二个参数是请求失败调用的函数。这两个函数中的config和err参数是自动传入的，我们使用就可以了，也可以自己命名。config参数就是我们发送的请求。正常发送请求都会成功，很少进入err失败函数中

          //在下面进行响应拦截
          instance.interceptors.response.use(res => {
            console.log(res);
            return res.data        //和上面一样，我们拦截之后必须进行return，否则真被拦截了，得不到响应。但是这里我们只要返回res.data就行了，别的信息都是它自动添加的，我们真正向服务器请求的数据只是其中的res.data 
          } , err => {
            console.log(err)
          })        //本地拦截请求,使用use方法，第一个参数是得到相应后调用的函数，第二个参数是没有响应时调用的函数。这两个函数中的res、err参数都是自动传入的，我们使用就可以了，也可以自己命名。res参数就是得到的响应结果。

          //全局拦截
          axios.interceptors   
          return instance(config)
        }
        ```