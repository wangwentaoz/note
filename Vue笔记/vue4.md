1. 组件化
   1. 组件化开发思想
      1. 如果将一个页面中所有的处理逻辑全部放在一起，处理起来就会变的非常复杂，而且不利于后续的管理以及扩展。
      2. 但如果我们将一个页面拆分成一个个小的功能块，每个功能块完成属于自己的这部分独立的功能，那么之后整个页面的管理和维护就变的非常容易了。
   2. vue组件化思想
      1. 他提供了一种抽象，让我们可以开发出一个个独立可复用的小组件来构造我们的应用。
      2. 任何的应用都会被抽象成一颗组件树
   3. 注册组件的基本结构
      1. 创建组件构造器 Vue.extend()
         1. 在创建组件构造器时，传入template代表我们自定义组件的模板
         2. 改模板就是在使用到组件的地方，要显示的HTML代码
         3. 事实上，这种写法在Vue2.x的文档中几乎已经看不见了，他会直接用下面我们会讲到的语法糖，但是在很多资料中还会提到这种方式，而且这种方式是后面学习方式的基础。
      2. 注册组件 Vue.component()
         1. 调用Vue.component()是将刚才的组件构造器注册为一个组件，并且给它起一个组件的标签名称。
         2. 所以需要传递两个参数，注册组件的标签名，组件构造器
      3. 使用组件 在Vue实例的作用范围内使用组件
         1. 组件必须挂在在某个vue实例下，否则不会生效
      4. 全局组件和局部组件
         1. 下面例子中注册组件就是在全局上，意味着可以在多个Vue的实例下面引用。
         2. 如果想要只在app内局部注册局部组件，只需要在vue实例中增加一个components属性,下面的例子中在app内部创建了一个组件，其中cpn是使用时组件的标签名，cpnC是组件构造器。局部组件用的多，大部分情况下只会创建一个vue实例。
   4. 例子
      ```
      <div id="app">
        <ny-cpn></my-cpn>
        <ny-cpn></my-cpn>
        <ny-cpn></my-cpn>
      </div>
      <script>
        1.创建组件构造器对象
        const cpnC = Vue.extend({
          template: `
            <div>
              <h2>我是标题</h2>
              <p>我是内容</p>
              <p>我是内容0.0</p>
            </div>
            `
        })
        2.注册组件  （全局组件）
        Vue.component('组件的标签名'，组件构造器)
        Vue.component('my-cpn',cpnC)

        const app = new Vue({
          el:'#app',
          data:{
            message:
          },
          components：{
            cpn:cpnC
          }
        })  
      </script>
      ```
   5. 父组件和子组件 
      1. vue实例也可以看成一个组件，只是没有写template属性而已，其实也是可以写template属性的。所以也可以把vue实例看成一个最顶层的组件，root（根）组件。
      2. 注意在div中并不能写<cpn1></cpn1>，向下面这样写会报错，因为如果想使用这个组件，它必须是在全局注册或者在局部注册过了，但是cpn1并没有在app中注册，他是在cpnC2中注册的，它的作用域只是在cpnC2中的，所以也就不能在app中使用。
      3. 在这里我们看到了组件树：组件和组件之间存在层级关系，其中最重要的关系就是父子组件的关系。
      4. 父子组件的错误用法：以子标签的形式在Vue实例中使用，即<cpn1></cpn1>为什么会出错
         1. 因为当子组件注册到父组件的components时，Vue会编译好父组件的模块。即例子中的cpnC2中的cpnC1已经在编译时已经被替换cpnC1的template（模板）了，所以编译完成后cpnC2中已经没有cpnC1 了。
         2. 改模板的内容已经决定了父组件将要渲染的HTML（相当于父组件中已经有了子组件中的内容了），所以对于vue实例来说，它根本不知道有cpnC1的存在，所以不能使用cpnC1.
         3. <child-cpn></child-cpn>是只能在父组件中被识别的，即在这个例子中，他在找cpnC1的时候，只会在app的vue实例中找，但是没找到，那就从全局找，也没有，所以报错。
         4. 类似这种用法， <child-cpn></child-cpn>是会被浏览器忽略的。
      ```
      <div id="app">
        <cpn1></cpn1> 报错
        <cpn2></cpn2>
      </div>
      <script>
        1.创建第一个组件构造器(子组件)
        const cpnC1 = Vue.extend({
          template: `
            <div>
              <h2>我是标题1</h2>
              <p>我是内容</p>
            </div>
            `
        })
        2.创建第二个组件构造器(父组件),并且在这个组件构造器内注册组件,好处是可以在第二个组件构造器中使用组件构造器1，但是这里组件构造器2还未被别人注册，此时还是用不了的。
        const cpnC2 = Vue.extend({
          template: `
            <div>
              <h2>我是标题2</h2>
              <p>我是内容0.0</p>
              <cpn1></cpn1>
            </div>
            `,
            components：{
            'cpn1':cpnC1
          }
        })
        3.注册局部组件 
        const app = new Vue({
          el:'#app',
          data:{
            message:
          },
          components：{
            'cpn2':cpnC2
          }
        })  
      </script>
      ```
   6. 注册组件的语法糖
      1. 即直接使用注册组件函数，在第二个参数本应该传组件构造器，这里直接传组件构造器的对象参数。
      2. 通过语法糖主要省去了Vue.extend()的步骤，直接用一个对象来替代。
      ```
      Vue.component('cpn1'，({
          template: `
            <div>
              <h2>我是标题1</h2>
              <p>我是内容</p>
            </div>
            `
        })

      const app = new Vue({
          el:'#app',
          data:{
            message:
          },
          components：{
            'cpn1':{
              template: `
              <div>
              <h2>我是标题1</h2>
              <p>我是内容</p>
              </div>
              `
            }
          }
        })  
      ```
   7. 组件模板抽离的写法
      1. 使用script标签,类型必须是text/x-template
          ```
          <script type="text/x-template" id="myCpn">
          <div>
              <h2>我是标题1</h2>
              <p>我是内容</p>
          </div>
          </script>
          <script>
          Vue.component("cpn",{
            template:"#myCpn"
          })
          </script>
          ```
      2. 使用template标签，在
          ```
          <template id="myCpn">
          <div >
              <h2>我是标题1</h2>
              <p>我是内容</p>
          </div>
          </template>
          <script>
          Vue.component("cpn",{
            template:"#myCpn"
          })
          </script>
          ```
   8. 组件中的数据存放问题
      1. 组件访问的数据
         1. 之前组件中的内容都是写死的，因为组件内部是不可以访问vue实例中的数据
         2. 组件是一个单独功能模块的封装，这个模块有属于自己的HTML模板，也应该有属于自己的数据data
         3. 组件中的数据是保存在其本身当中，注册组件时可以保存其自己的data属性，里面存放数据，正常在vue实例中存放在data中的数据是一个对象，但是这里存放对象的话会直接报错，应该存放的是一个function函数，并且这个函数需要返回一个对象实例,对象内部保存着数据
          ```
          Vue.component("cpn",{
            template:"#myCpn" ,
            data(){
              return {
                title : 'abc'
              }
            }
          })
          ```
      2. 为什么必须使用函数存放数据
         1. 当使用同一个组件创建多个相同的<cpn></cpn>时，每次都会调用注册组件的函数，因为这里使用的是函数返回一个对象，每次的数据对象都是不同的，都是新创建的数据对象，保证在使用这个组件时互相之间不发生数据冲突。
         2. 如果想要他们相互影响，可以在组件外部定义一个obj，然后再组件函数内返回这个obj，这样的话不同的页面也会同步，连锁反应，造成不好的影响
   9. 父子组件通信
      1. 父传子props
         1. 上一节中，我们提到了子组件是不能引用父组件或者Vue实例中的数据的。但是在开发中往往需要把一些数据从上层传递到下层。例如在一个页面中，从服务器请求到了很多数据，其中的一部份数据给整个页面的大组件来展示的，另一部分需要下面的子组件进行展示，所以就需要从大组件传递数据给小组件。
         2. props基本用法
            1. 使用选项props来声明需要从父级接收到的数据
            2. props的值有两种方式
               1. 字符串数组，数组中的字符串就是传递时的名称
               2. 对象，对象可以设置传递时的类型，也可以设置默认值、必传值等。类型有String;Number;Boolean;Array;Object;Date;Function;Symbol。![图片](./props验证值.png)
         3. 代码中将vue实例作为父组件，作为子组件.
            1. 注意传数据时必要要使用v-bind，即:cmovie
         4. props中的驼峰标识
            1. props:{cMovie：Array }  <cpn :cMovie="movie"></cpm> 这样写并不能显示出正常的的对象，显示为空对象，即对象没能成功传入，原因是v-bind这里是不支持驼峰的，写成c-movie就可以了，但是在props中还是驼峰的写法，需要在v-bind转化一下就行了props:{cMovie：Array }  <cpn :c-movie="movie"></cpm> 
         5. vue的子组件即<template>中是必须包括一个根div的，不一定是div，但是必须有一个根，
            ```
            <div id="app">
              <cpn :cmovie="movie" :cmessage="message"></cpn>
            </div>
            <template id="cpn">
              <div>
                <ul>
                  <li v-for="item in cmovie">{{item}}</li>
                </ul>
                <h2>{{cmessage}}</h2>
              </div>
            </template>
            <script>
            const cpn={
              template:'#cpn',
              props:['cmovie','cmessage'],
              props:{
                cmovie:Array,
                cmessage:String,
                cmovie:{
                  type:Array,
                  default: [] 在vue2.5.17以下的版本中，这样写不会报错，如果在这版本以上如果是数组类型，并且默认值写为[],就会报错。解决办法，如果是对象或者数组时，默认值必须是一个函数，即default(){return []}
                },
                cmessage:{
                  type:String,
                  default: 'aaaa', 表示cmessage在上面的<cpn :cmessage>没有传值时默认值是什么
                  required : true  意味着使用cmessage时必须在<cpm>中传入cmessage变量
                }
              },
              data(){return {}},
              methods:{}
            }
            const app = new Vue({
            el:'#app',
            data:{
              message="你好" ，
              movie:['海王','海贼王','进击的巨人']
            },
            components：{
              'cpn': cpn
              cpn 也可以直接用属性增强写法直接写cpn就行了
            }
            })  
            </script>
            ```
      2. 子传父（自定义事件）
         1. 当子组件需要向父组件传递数据时，就需要用到自定义事件。我们之前学的v-on不仅可以监听DOM事件，也可以用于组件之间的自定义事件。
         2. 自定义事件流程
            1. 在子组件中通过$emit()来触发事件
            2. 在父组件中通过v-on来监听子组件事件
            ```
            1.父组件模板
            <div id="app">
              <cpn v-on:item-click="cpnClick"></cpn>   注意v-on和v-bind一样，也不能写驼峰。这里的cpnClick没有传参数，但是默认的参数不是之前的event，而是子组件发射的参数item
            </div>
            2.子组件模板
            <template id="cpn">
              <div>
                <button v-for="item in categories"
                 @click="btnClick(item)">{{item.name}}</button>
              </div>
            </template>

            <script>
            1.子组件
            const cpn={
              template:'#cpn',
              data(){
                return {
                  categories : [
                    {id:'aaa', name: '热门推荐',},
                    {id:'bbb', name: '手机数码',},
                    {id:'ccc', name: '电脑办公',},
                  ]
                }
              },
              methods:{
                btnClick(item){    这里是要给父组件传递数据了
                  this.$emit('item-click' ,item)      emit:发射 这里是要在子组件里面发射出一个事件，事件名称叫itemClick ,后面的item表示发射事件的同时传递出的参数。父组件需要监听这个事件itemClick,在cpn中进行监听，<cpn v-on:item-click="cpnClick"></cpn> cpnClick方法在父组件中定义，这样就可以接收到子组件传来的数据了。emit的时候也不能定义驼峰事件，和上面的v-on、v-bind一样
                }
              }
            }
            2.父组件
            const app = new Vue({
            el:'#app',
            data:{
              message="你好" ，
            },
            components：{
              cpn
            }，
            methods:{
              cpnClick(item){}   这里的item表示子组件传过来的参数
            }
            })  
            </script>
            ```