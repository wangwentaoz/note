1. 计算属性的setter和getter
    1. 基本原理:计算属性一般只需要实现get方法就可以了，set方法一般都是空的，因为不需要别人给计算属性设置值，变为只读属性，所以可以直接删掉set方法。所以在使用计算属性时不需要调用小括号方法执行，即{{fullName}}，因为在使用这个属性时是去调用它的get方法，所以他就是一个属性而已。
      ```
      computed: {
        fullName: {
          set: function(newValue){
            const name=newValue.split(' ');
            this.firstName = name[0];
            this.lastName = name[1];
          },
          get: function(){
            return this.firstName + ' ' + this.lastName
          }
        }
      }
      这里如果给app传入了新值，例如app.fullName = 'lebron james' ,就会通过设置函数来改变计算属性fullName。


      下面是简化版
      computed: {
        fullName: function(){
          return this.firstName + ' ' + this.lastName
          }
      }
      ```
2. 计算属性和methods的对比
   1. 直接拼接过于繁琐，所以可以通过计算属性和methods两种方法来进行简化，如果调用多次，可以减少很多重复的工作量。但是methods方法会调用多次，而computed方法只会调用一次，然后vue内部对这个计算属性进行缓存，观察其中的变量是否发生变化，例如this.firstName，如果没发生变化，直接用缓存中的值，如果发生变化，那么重新调用函数。
    ```
    <script>
            const app = new Vue({
               el:'#app',
               data:{
                  firstName:'leborn',
                  lastName:'james'
               },
               methods:{
                  getFullname: function(){
                    return this.firstName + ' ' + this.lastName
                  }
               },
               computed:{
                  fullName:function(){
                     return this.firstName + ' ' + this.lastName
                  }
               }
            })
         </script>
    ```
3. 块级作用域let和var
   1. 能用let就用let，不要用var，因为var开始可以看成为js语言设计上的错误，因为要向后兼容，所以大概率不会取消的。let、const是有if和for的块级作用域的。
   2. var没有块级作用域会引发出很多问题，在块内定义的变量在外面是可以被修改的，而大多数情况下我们是不想要别人修改自己的变量的。例如if、for的作用域里面的变量会改变到外面，以前是通过闭包解决for问题的，因为闭包函数是一个作用域，在循环时i的值会被传到里面函数的作用域中，外面再次循环时就不会对其内部作用域造成影响，而for循环的整个作用域就是一个，是全局作用域。
   3. es5之前，因为if和for都没有块级作用域的概念，所以在很多时候，我们都必须借助于function的作用域来解决应用外面变量的问题。
   4. let还有暂时性死区，即在同一作用域中，如果声明了let变量，那么在声明let前，这个变量就不可以使用，即它没有声明提升。
   5. const 在es6开发中，优先使用const，且必须进行赋值，const name="s"。只有需要改变一个标识符时才使用let。
   6. const 常量的含义是指向的对象不能修改，但是可以改变对象内部的属性。即const定义的对象内部的属性是可以更改的。
4. 对象字面量增强写法
   1. 对象字面量：const obj = {}； 这里的{}就是字面量
   2. 属性的增强写法:这里的name是原来的写法，而age变量是直接放进去的，是es6新增的增强写法，可以直接把变量放进对象中。他会把变量名称作为对象的key，变量的值作为key的value。
      ```
      const name = "why";
      const age = 18;
      const obj = {
        name : name ,
        age ,
      }
      ```
   3. 函数的增强写法：可以直接写出函数来。例如下面的eat，变的更加简洁。
      ```
      const obj = {
        run : function () {} ,
        eat () {}
      }
      ```
5. v-on 事件监听
   1. 基本使用和语法糖
      1. 作用：绑定事件监听器
      2. 缩写：@
      3. 预期：Function | Inline Statement（内部表达式） | Object
      4. 参数：event
         ```
         <botton v-on:click="counter++">+</button>
         counter在这里是一个变量
         <botton v-on:click="increment">+</button>
         increment在这里是一个方法函数，而且这里没传入参数（没添加小括号）
         <botton @click="counter++">+</button>
         语法糖
         ```
   2. 参数传递
      1. 当通过methods中定义方法，以供v-on调用时，需要注意参数问题。
      2. 如果不需要传入参数时，那么v-on中的方法后面的（）可以不写。
         1. 在事件定义时，写函数时省略了小括号，即v-on:click="increment",但是方法本身是需要一个小括号的,只是这里做了处理可以简写了。
         2. 但是如果方法本身有一个参数，那么会默认将原生事件event参数传进去。
      3. 如果写入的方法需要传入参数时
         1. 调用的时候没传入参数，即increment（），会传入undefined。
            1. 与此同理的是正常情况下的定义函数，如果需要参数，但是调用时没有传入参数，这时会传入undefined
         2. 但是如果这里没有添加小括号，即increment，不会传入undefined，会将浏览器默认生成的event事件对象作为参数传入到方法中。 
         3. 方法定义时如果需要传入event时，同时有需要传入其他参数，可以通过$event传入事件。即v-on:click="increment（123，$event）" 注：这里传入的123是被当作基本数据类型传入的，如果是abc那么就被解析成变量，如果是'abc'那么就被解析为基本数据类型字符串。
   3. v-on修饰符
      1. 某些情况下我们拿到event的目的是进行一些事件处理，vue提供了修饰符来帮助我们更方便的进行一些处理。
      2. .stop ：调用event.stopPropagation()
         1. 阻止向上冒泡，例<button @click.stop="btnclick">按钮</button>
      3. .prevent ：调用event.preventDefault()
         1. 阻止默认事件，例<input type="submit" value="提交" @click.prevent="submitClick">
      4. .{keyCode | keyAlias} ：只当事件是从特定键触发时才触发回调
         1. 可以传入键盘编码（keycode）或者简写（keyalias）
         2. 监听某个键盘的键帽点击<input type="text" @keyup.enter="keyup"> 这里的enter表示修饰符，表示只监听enter键的keyup事件
         3. <input type="text" @keycode.13="onenter"> 13表示编码
      5. .native ：监听组件根元素的原生事件
         1. <cpn @click.native="cpnclick"></cpn> 如果不写.native是监听不到组件的click事件的
      6. .once ：只触发一次回调
6. 条件指令
   1. vue的条件指令可以根据表达式的值在DOM中渲染或者销毁元素或组件
      1. v-if
         1. <h1 v-if="true">{{message}}</h1> 根据if的值决定是否渲染h1
      2. v-else-if
         1. <h1 v-if="true">{{message}}</h1><h2 v-else>{{message1}}</h2>如果v-if为false就显示h2
      3. v-else
         1. <h1 v-if="true">{{message}}</h1><h2 v-else-if>{{message1}}</h2><h3 v-else>{{message1}}</h3>
   2. 登陆切换小案例
      1. 用户登录时可以选择邮箱登录或者用户账号登录
         ```
          <div id="app">
            <span v-if="isUser">
              <label for="username">用户账号</label>
              <input type="text" id="username" placeholder="用户账号">
            </span>
            <span v-else>
              <label for="email">用户邮箱</label>
              <input type="text" id="email" placeholder="用户邮箱">
            </span>
            <button @click="isUser = !isUser">切换类型</button>
          </div>
          <script>
            const app = new Vue({
               el:'#app',
               data:{
                  isUser: true 
               },
               methods:{
                  1
               }
            })
            </script>
         ```
      2. 案例中的问题
         1. 当用邮箱输入一些东西时，如果我们想切换到账户登录，这时输入的东西不会被清除，但是有时候我们的开发需求是需要清除刚刚输入的东西的。
         2. 奇怪之处是我们点击切换时明明input都已经切换到新的input了，但是内部的内容还被保存了下来。
         3. 原因：vue在把页面中的元素真正把这些DOM元素渲染到浏览器之前，他会把这些DOM元素抽象成虚拟DOM，即vue额外添加了一个增加虚拟DOM的环节。在这个环节中，vue会额外做一些事情，出于性能考虑，会尽可能的复用已经存在的元素，而不是重新创建新的元素，在上面的案例中，两个条件标签在同一时间只能有一个出现在页面中，在把虚拟DOM往真实的网页上进行渲染时，他会检查原来的虚拟DOM有没有label，有没有input，在上面的例子中，因为变量isUser变为false，他发现第一次的例子不用了，这时会把第一次的例子删除掉，这时发现渲染的还是label和input，并不会重新创建另一个新的label和input，而是把刚刚删除掉的东西拿过来，并且和新的东西在每一个层级上进行一个对比，发现有些东西不一样的时候会进行一个修改，把修改之后的东西再渲染到真实的DOM上面。上面的例子相当于输入了一个value属性，但是下面设置的input里面有三个属性，并没有value属性，所以只会重新替换那三个属性，value就保存了下来。
         4. 解决：<input type="text" id="username" placeholder="用户账号" key="username">  <input type="text" id="username" placeholder="用户账号" key="email"> 通过给input标签添加一个标识key，来决定在其他地方是否进行复用，这里因为两个标识不同，所以不能进行复用，就会创建一个新的input标签了。 
7. v-show
   1. 用法和v-if非常相似，也用于决定一个元素是否进行显示。
   2. 区别
      1. v-if当条件为false时，根本不会有对应的元素出现在DOM中。
      2. v-show当条件为false时，仅仅是将元素的display属性设置为none而已
   3. 如何选择
      1. 当需要在显示与隐藏之间切片频繁时，使用v-show
      2. 当只有一次切换时，选用v-if。
8. v-for 
   1. 遍历数组
      1. 在遍历的过程中没有使用索引值（下标值）
         1. <li v-for="item in names">{{item}}</li> names是定义在data中的数组
      2. 在遍历的过程中获取索引值
         1. <li v-for="(item,index) in names">{{index+1}}.{{item}}</li>
   2. 遍历对象
      1. 在遍历对象的过程中，如果只是获取一个值，那么获取到的是value
         1. <li v-for="item in info">{{item}}</li> info是定义在data中的对象
      2. 获取key和value
         1. <li v-for="(value,key) in info">{{value}}-{{key}}</li> info是定义在data中的对象
      3. 获取key，value和index
         1. <li v-for="(value,key,index) in info">{{value}}-{{key}}-{{index}}</li> info是定义在data中的对象
   3. 组件的key属性 ![图片](./key属性.png)
      1. 官方推荐我们在使用v-for时，给对应的元素或组件添加上一个：key属性，即上面的标识key。
         1. 用法：<li v-for="item in letters">{{item}}</li> 这里的letters是一个数组，里面存放了ABCDE五个元素。
         2. 正常往数组插入元素使用数组方法app.letters.splice(2,0,'F')
         3. 真实的DOM渲染到浏览器之前会创建一个虚拟DOM,在往页面渲染前会在虚拟DOM中创建五个li。然后再进行渲染
         4. 正常情况我们想的是在虚拟内存中往BC之间直接插入一个新的元素F，Diff算法会把虚拟DOM和真实页面上渲染的元素进行对比，发现页面中没有F元素，而虚拟dom中有，会直接把F元素插入到页面中的BC之间，效率会很高。但是真实不是这么做的，他会把F放在C的位置上，C放在D的位置上，D放在E的位置上，最后新建一个元素E，这时从虚拟内存中往页面中进行渲染时，页面中的许多元素不一样，需要在浏览器中进行替换，性能很低。
         5. <li v-for="item in letters" :key="item">{{item}}</li> 这里给每个元素绑定了各不相同的key值，所以每一个元素之间就可以做到区分，他就会直接在BC之间新建一个元素F，而不是一个个改。注：这里的 :key="index" 是不对的，因为每个item的key是会随之改变的，例如中间插入了一个F，那么F的key就变成2了(C的key就从2变为3了),然后key=="2"的item就不是C了，他们之间就没有对应关系了，他后面就不会重用之前的元素，所以key必须保证唯一性，就像身份证一样，一人一个，不能更改。但是如果数组中如果有两个相同的元素也不行，他俩的item相同导致key相同了。
         6. 有了key之后，会根据key和元素先进性对照，因为之前绑定的都是唯一的，元素也没有发生变化，就会直接复用之前的元素，直到发现插入一个元素时F时，他才会创建一个新的元素，然后在BC中间插入一个F，而不是改来改去
      2. 原因：与vue的虚拟DOM的Diff算法有关系
         1. 当某一层有很多相同的节点时，也就是列表节点时，我们希望插入一个新的节点
            1. 如图，我们希望在B和C之间插入一个新的节点F，Diff算法默认是把F放在C的位置上，C放在D的位置上，D放在E的位置上，最后新建一个元素E，即从列表ABCDE形成列表ABFCDE，因为一个F的插入，改变了很多元素。
      3. 如果使用key为每一个节点做一个唯一的标识，
         1. Diff算法就可以正确识别此节点
         2. 找到正确的位置区插入新节点。
      4. key的作用主要是为了高效的更新虚拟DOM