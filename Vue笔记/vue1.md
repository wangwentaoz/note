1. vue介绍
   1. debug：开发版本，release：完成版本，index：入口
   2. 代码规范：一般都是缩进4个空格，但前端开发一般缩进两个空格更加规范。
   3. vue是一个渐进式框架
      1. 渐进式意味着可以将vue作为应用的一部分嵌入其中，带来更丰富的交互体验
      2. 或者如果希望将更多的业务逻辑用vue实现，那么vue的核心库以及生态系统。
      3. 例如core+vue-router+vuex，也可以满足各种需求。
   4. vue有很多特点和web开发中常见的高级功能
      1. 解耦试图和数据
      2. 可复用的组件
      3. 前端路由技术
      4. 状态管理
      5. 虚拟DOM
   5. const app=new Vue( {el:  ,data:{message: } } )
      1. 创建vue对象时，传入了一些options：{}
      2. 对象{}中包含的el属性：该属性决定了这个vue对象挂载到哪一个元素上。
      3. 对象{}中包含了data属性：该属性中通常会存储一些数据，这些数据可以是我们直接定义出来的，也可能是来自网络，从服务器加载的。
   6. 等等
2. Vue中的MVVM
   1. Model View ViewModel
      1. MVVM(Model-view-viewmodel)是一种软件架构模式。
      2. MVVM有助于将图形用户界面的开发与业务逻辑或后端逻辑或后端逻辑(数据模型)的开发分离开来，这是通过置标语言或GUI代码实现的。MVVM的视图模型是一个值转换器，这意味着视图模型负责从模型中暴露（转换）数据的对象，以便轻松管理和呈现对象。在这方面，视图模型比视图做得更多，并且处理大多数视图的显式逻辑。视图模型可以实现中介者模式，组织对视图所支持的用例集的后端逻辑访问。
      3. MVVM是马丁-富勒的PM（Presentation Model）设计模式的变体。MVVM以相同的方式抽象出视图的状态和行为，但PM以不依赖于特定用户界面平台的方式抽象出视图（创建了视图模型）。
      4. MVVM和PM都来自于MVC模式。
      5. MVVM由微软构架师Ken Cooper和Ted Peters开发，通过利用WPF（微软.NET图形系统）和Silverlight(WPF的互联网应用派生品)的特性来简化用户界面的事件驱动设计。微软的WPF和Silverlight构架师之一John Gossman于2005年在他的博客上发表了MVVM。
      6. MVVM也被成为model-view-binder，特别是在不涉及.NET平台的实现中。ZK(Java写的一个Web应用框架)和KnockoutJS(一个JavaScript库)使用model-view-binder。
   2. MVVM模式的组成部分
      1. 模型
         1. 模型是指代表真实状态内容的领域模型（面向对象），或指代表内容的数据访问层（以数据为中心）。
      2. 视图
         1. 就像在MVC和MVP模式中一样，视图是用户在屏幕上看到的结构、布局和外观（UI）。
      3. 视图模型
         1. 视图模型是暴露公共和命令的视图的抽象。MVVM没有MVC模式的控制器，也没有MVP模式的presenter，有的是一个绑定器。在视图模型中，绑定器在视图和数据绑定器之间进行通信。
      4. 绑定器
         1. 声明性数据和命令绑定隐含在MVVM模式中。在Microsoft解决方案堆中，绑定器是一种名为XAML的标记语言。绑定器使开发人员免于被迫编写样板逻辑来同步视图模型和视图。在微软的堆之外实现时，声明性数据绑定技术的出现是实现该模式的一个关键因素。
      5. 理论基础
         1. MVVM旨在利用WPF中的数据绑定函数，通过从视图层中几乎所有GUI代码（代码隐藏），更好地促进视图层开发与模式其余部分的分离。不需要用户体验（UX）开发人员编写GUI代码，他们可以使用框架标记语言（如XAML），并创建到应用程序开发人员编写和维护的视图模型的数据绑定。角色的分离使得交互设计师可以专注与用户体验需求，而不是对业务逻辑进行编程。这样，应用程序的层次可以在多个工作流中进行开发以提高生产力。即使一个开发人员在整个代码上工作，视图与模型的适当分离也会更加好笑，因为基于最终用户反馈，用户界面通常在开发周期中经常发生变化，而且处于开发周期后期。
         2. MVVM模式试图获得MVC提供的功能性开发分离的两个优点，同时利用数据绑定的优势和通过绑定数据的框架尽可能接近应用程序模型。它使用绑定器、视图模型和任何业务层的数据检查功能来验证传入的数据。结果是模型和框架驱动尽可能多的操作，消除或最小化直接操纵视图的应用程序逻辑（如代码隐藏）。
      6. 批评
         1. 对这种模式的批评来自MVVM的创造者John Gossman本人，他指出，实现MVVM的开销对于简单的UI操作是"过度的"。他说，对于更大的应用来说，推广ViewModel变得更加困难。而且，他说明了非常大的应用程序中的数据绑定会导致相当大的内存消耗。
   3. Vue中的MVVM
      1. ![图片](./Vue中的MVVM.png)
      2. Date Bindings 数据绑定
         1. 把js（model）里的数据，通过Vue（ViewModel）绑定到DOM（view），并且是响应式的，js中的数据改动了，DOM也随之响应。
      3. DOM Listeners DOM监听
         1. DOM（View）通过Vue的指令v-on把事件响应的东西绑定到js（Model）上，对DOM做一些监听。
      4. View层
         1. 视图层，在前端开发中通常就是DOM层，主要的作用就是给客户展示各种信息。
      5. Model层
         1. 数据层，可能是我们固定好的死数据，更多的是来自于服务器，从网络上请求下来的数据。
      6. VueModel层
         1. 视图模型层，是View和Model沟通的桥梁，一方面它实现Data Binding，也就是数据绑定，将Model的改变实时的反映到View中。另一方面它实现了DOM Listener，也就是DOM监听，当DOM发生一些事件（点击、滚动、touch等）时，可以监听到，并在需要的情况下改变对应的Data。
3. 创建Vue实例传入的options
   1. el
      1. 类型：string|HTMLElement
      2. 作用：决定之后Vue实例会管理哪一个DOM
   2. data
      1. 类型：Object|Function  注：如果不是newvue而是组件的话，其中data必须是一个函数
      2. 作用：Vue实例对应的数据对象
   3. methods
      1. 类型：{[key:string]：Function} 
      2. 作用：定义属于Vue的一些方法，可以在其他地方调用，也可以在指令中使用。
4. Vue的生命周期
   1. 生命周期：事物从诞生到消亡的整个过程。
   2. vue自己的生命周期：new vue（）创建出来，做了一系列的操作，在这一整个过程中，通过一些生命周期函数可以做一些回调，来告诉用户现在执行到哪一步了。如果想要在某一步操作前做点什么，可以通过传入的参数来改变，也就是传入的参数会被这个vue的构造函数调用，逐步执行。
   3. ![图片](./lifecycle.png) ![图片](./lifecycle1.png)
5. template（模板）语法
   1. 插值操作
      1. Mustache（胡须）双大括号语法{{data中定义的数据}}
         1. 括号中不仅仅可以写简单的变量，也可以写简单的表达式，例如message + message 两个字符串变量相加
      2. v-once 指令
         1. 通常情况下插值操作是响应式的，即数据改变显示也随之改变，如果想要数据改变显示不变，还显示当初最开始的值，就可以在前面的html元素上添加v-once属性
         2. 该指令表示元素和组件只渲染一次，不会随着数据改变而改变。
         3. <h1 v-once></h1>
      3. v-html 指令
         1. 某些情况下从服务器请求到的数据本身就是HTML代码，若直接用{{}}来输出，会输出一个html代码标签，但是我们希望按照HTML格式进行解析，并显示。
         2. 可以在HTML元素上添加v-html属性，值往往为字符串类型，其会将字符串类型的html解析出来
         3. <h1 v-html="url"></h1>
      4. v-text 指令
         1. 作用与Mustache作用相似，用于将数据显示在界面中。
         2. 通常情况其接受一个字符串类型
         3. 一般不用，因为不够灵活，只能显示一个数据，不可以拼接，并且会覆盖标签中的所有文本，包括{{message}}，下面的url同样也会被覆盖
         4. <h1 v-text="message">url</h1>
      5. v-pre 指令
         1. <pre></pre>标签会原封不动的展示标签内的内容
         2. 这个指令作用类似pre标签，只要HTML元素加上了这个属性，那么后面显示的内容会原封不动的显示，不会解析data中的数据，例如下面就会显示{{message}}这几个字符串
         3. <h1 v-pre>{{message}}</h1>
      6. v-cloak 指令
         1. cloak（斗篷），在某些情况下，我们的浏览器可能会直接显示出未编译的Mustache标签，例如vue代码卡住了，HTML标签就会直接显示字符串{{message}}，等到vue代码不卡了，才开始渲染，把这段代码{{message}}解析为数据。
         2. 但是我们不想要它显示代码的样子，没解析vue的话就不要显示那种原生代码，所以添加属性v-cloak。在vue解析之前，h1中有v-cloak属性，在vue解析之后就会把这个属性删除，所以就可以根据有没有这个属性决定这段代码现不现实。
         3. 作用是一旦vue没有对这个HTML代码解析，即存在v-cloak属性，就display：none，不会显示出来。相当于添加了一段代码，<style> [v-cloak]{display:none;} </style>
         4. <h1 v-cloak></h1>
   2. 绑定属性
      1. <img src=""></img> 有时候我们想要动态的把服务器返回的数据绑定到HTML标签的属性（例如这里的src属性）中，而不是标签的内容中，就需要用到绑定属性。
      2. v-bind 指令
         1. 动态绑定属性，参数为attrOrProp（optional）
            1. 可以传入any（with argument）| Object（without argument）作为参数，表示任意或者对象。
         2. v-bind基础
            1. <img src="{{message}}"></img> 这里不能写Mustache语法，只能写在内容区域才会解析成数据，这里就是{{message}}这几个字符串，不会变为数据。
            2. <img v-bind:src="message"></img> 这时才会把message当成一个变量来解析成数据。
         3. v-bind语法糖
            1. 简写方式：<img :src="message"></img>
         4. 动态绑定class（对象语法）
         ```
         点击按钮，h1的类名就会在是否有isActive之间来回跳跃，从而改变标签的样式.h1标签里面的两个class会进行合并，当然也可以绑定一个methods或者computed中,例如下面的classes是一个methods,注意这里需要给计算属性加上小括号。但是v-on里面的btnClick不用加小括号是因为被省掉了，而这里不能省略。
         :class="{类名:布尔值}
         <div id="app">
            <h1 class="title" :class="getClasses()" :class="{active:isActive,line:isLine}"> {{message}}</h1>
            <h1 class="title" :class="getClasses()" > {{message}}</h1>
            <button v-on:click="btnClick">按钮</button>
         </div>
         <script>
            const app = new Vue({
               el:'#app',
               data:{
                  message:'你好'，
                  isActive:true,
                  isLine:true
               },
               methods:{
                  btnClick:function(){
                     this.isActive = !this.isActive;
                  }，
                  getClasses: function(){
                     return {active:this.isActive,line:this.isLine}
                  }
               }
            })
         </script>
         ```
         5. 动态绑定class（数组语法） 用的少，因为数组内的属性可以直接写到类中，:class="active,line" 。当然，如果数组内传入的是变量，变量中保存着从服务器传入的值，那么还是可以的。用的很少，即使是第二种情况，也可以通过methods返回一个数组来代替。
         ```
         <div id="app">
            <h1 class="title" :class="['active','line']" :class="[active,line] > {{message}}</h1>
            <button v-on:click="btnClick">按钮</button>
         </div>
         <script>
            const app = new Vue({
               el:'#app',
               data:{
                  message:'你好'，
               }
            })
         </script>
         ```
         6. 动态绑定style（对象语法）
            1. <h1 :style="{key（css属性名）：value（属性值）}">{{message}}</h1>
            2. <h1 :style="{font-size：'50px'">{{message}}</h1>
            3. 属性名也可以用小驼峰式写法，例如fontSize。这里的属性值必须加引号，把属性值当成字符串解析。如果不加引号就被系统视为变量，而变量是不能以数字开头的，所以会在这里报错。css中属性值不需要加单引号，但是vue中必须加，等到vue把其转换为真正的css时，是会消除单引号的。
            4. 也可以通过methods方法返回一个对象，然后添加到style中
         7. 动态绑定style（数组语法）
            1. <h1 :style="[baseStyles,oneStyles,twoStyles]">{{message}}</h1>
            2. 数组里面放的数据是一个对象，例如baseStyles就是定义在data中的一个对象，里面存放键值对css属性。用的很少。
   3. 计算属性
      1. 在模板中可以直接通过插值语法显示一些data中的数据，但在某些情况下我们可能需要对数据进行一些转化后再显示，或者需要将多个数据结合起来再显示
      2. 所以我们就可以用计算属性来进行转化合成。计算属性是把计算过后的值变成一个属性，而不是methods中的方法，属性比方法更加方便，所以后面也就不需要加方法要加的（）。
      3. 计算属性和methods有很大的区别就在于，计算属性多次调用时只会调用一次，而methods调用几次就会执行几次，他是没有缓存的，性能更低。
         ```
         <script>
            const app = new Vue({
               el:'#app',
               data:{
                  message:'你好'，
                  firstName:'leborn',
                  lastName:'james'
               },
               computed:{
                  fullName:function(){
                     return this.firstName + ' ' + this.lastName
                  }
               },
               methods:{
                  1
               }
            })
         </script>
         ```
      4. 计算属性的复杂操作
         1. <h1>总价格：{{totalPrice}}</h1>
            ```
            <script>
            const app = new Vue({
               el:'#app',
               data:{
                  books: [
                     {id: 110, name: '深入理解计算机系统' ，price: 119},
                     {id: 111, name: '现代操作系统' ，price: 85}
                  ]
               },
               computed:{
                  totalPrice: function(){
                     let result = 0;
                     for (let i=0; i < this.books.length; i++) {
                        result += this.books[i].price
                     }
                     return result
                  }
               },
               methods:{
                  1
               }
            })
            </script>
            ```
      