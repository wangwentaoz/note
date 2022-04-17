1. 数组中的哪些是响应式的
   1. arr.push、shift、unshift、splice、sort、reverse 这几个方法都是响应式的
   2. arr[0] = "bbb" 通过索引值修改数组中的元素不是响应式的。
   3. vue.set(要修改的对象，索引值，修改后的值)  例vue.set(this.letters,0,"aaa") 
      1. vue内部实现的函数，也是响应式的
2. 过滤器
   1. <td>{{item.price | 过滤器}}</td> 其中item.price作为过滤器的参数
   2. 过滤器在vue中定义，和method方法同等级的，filters:{showPrice(price){return price.toFixed(2)}}
3. js高阶函数的使用
   1. for(let i in this.books){return this.books[i].price * 2}
      1. 用in拿到的i是一个索引值
   2. for(let item of this.books){return item.price * 2}
      1. 用for拿到的item是循环中的一个元素
   3. 编程范式：命令式编程；声明式编程，面向对象编程（第一公民为对象）；面向函数编程（第一公民为函数）
   4. filter()函数
      1. nums.filter(回调函数function(n){return Boolean}) 其中nums为一个数组，回调函数每次会从数组中取出一个值作为它的参数。回调函数要求必须返回一个布尔值，如果返回的是true，函数内部会自动将这次回调的n加入到新的数组中;当返回值为false时，函数内部会过滤掉这次的n。
      2. let newNums = nums.filter(function(n){return n < 100}) 得到小于100的数组
   5. map()函数
      1. nums.map(回调函数function(n){对数组进行的操作}) 其中nums是一个数组，回调函数会对数组中的每一个值调用回调函数，全部的返回值构成一个新的数组，看起来像用回调函数对数组中的每一个元素进行了同样的操作。
      2. let newNums = nums.map(function(n){ return 2 *n }) 把原数组中的每一个元素乘二，然后返回一个新的数组。
   6. reduce()函数
      1. nums.reduce(回调函数function(preValue,n){}，初始化值)  作用：对数组中的所有的内容进行汇总。其中preValue是上一次返回的值， 
      2. nums.reduce(function(preValue,n){return 1}，0) 该数组会遍历四次，第一次preValue的值是0，即初始化值，n为数组中的第一个值，即nums[0] ; 第二次preValue的值是 第一次调用函数的返回值，因为这里返回值都是1，所以preValue的值也一直为1，n是nums[1]。如此往下。
      3. total = nums.reduce(function(preValue,n){return preValue + n}，0) 计算数组中的所有值相加的总和。
      4. 好处是函数可以连用，例如nums.filter().map().reduce()
4. 表单绑定v-model
   1. 表单控件在实际开发中很常见，特别是对于用户信息的提交，需要大量的表单。
      1. vue中使用v-model指令来实现表单元素和数据的双向绑定。下面显示了如何把input和message进行双向绑定，自动的将message里面的数据绑定到input里面，作为其value，并且是响应式的。这里不是通过mustache语法绑定，而是通过v-model，并且是双向绑定，意味着我们如果改变input的value，那么message也随之改变，即两个数据相互影响。
      2. 实现v-model的原理
         1. v-model是相当于两个指令的结合，首先是把message绑定到html的value属性中，即:value="message" 实现了改变message时input的value值也随之改变 ; 其次是把value值绑定到vue的message数据中，@input="methods中的valueChange方法" （这里的input事件表示只要有输入或者删减就会触发这个方法）,然后再这个方法中定义valueChange(event){this.message = "event.target.value" ;} 把value值赋给message从而实现响应式的。@input="message = $event.target.value" 这样写也是可以的。
         2. v-model也可以用于textarea元素中。例<textarea v-model="message" > </textarea>
         3. v-model其实是一个语法糖，他的背后本质上包括两个操作
            1. v-bind绑定一个value属性
            2. v-on指令给当前元素绑定input事件
         ```
         <div id="app">
            <input type="text" v-model="message">{{message}}
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
   2. v-model结合radio类型使用
      1. <label for="male"><input type="radio" id="male" name="gender" value="男" v-model="gender">男</label>
      2. <label for="female"><input type="radio" id="female" name="gender" value="女" v-model="gender">女</label>
      3. <h1>您选择的是{{isAgree}}</h1>
      4. <button :disabled="!isAgree">下一步</button>
      5. 把这两个单选按钮关联到同一个data中的数据gender，value中的值会和gender中的值相同，并且因为男女选择是互斥的，这里选到哪个，哪个的value就成为了gender的值。所以当选种的时候就可以把value值绑定到gender中，所以就可以利用这个把gender发送到服务器得到所选中的性别信息。
      6. 如果这两个元素绑定的是同一个gender，就可以替代name的作用，所以这里可以省略name属性（其作用是保证同时只有一个能被选中，name就相当于规定了一个小组），
      7. 如果想要默认值，只需要再data中的gender数据赋值“男”，那么input标签中value为男的就被选中，保证默认选中的是男 这里推测反向应该不是上面的input那样的mustache语法绑定的
   3. v-model结合checkbox类型使用
      1. 复选框分为两种情况：单个复选框和多个复选框
      2. 单选框
         1. <label for="agree"><input type="checkbox" id="agree" v-model="isAgree">同意协议</label>  设置默认data中的isAgree=false 如果点击后，value变为true，紧接着isAgree也变为true
         2. v-model为布尔值，并且input的value并不影响v-model的值
      3. 多选框
         1. 代码
            ```
            <div id="app">
            <input type="checkbox" value="篮球" v-model="hobbies">篮球
            <input type="checkbox" value="足球" v-model="hobbies">足球
            <input type="checkbox" value="网球" v-model="hobbies">网球
            </div>
            <h2>您的爱好是：{{hobbies}}</h2>
            <script>
            const app = new Vue({
               el:'#app',
               data:{
                  message:'你好'，
                  isAgree : false ,
                  hobbies : []
               }
            })
            </script>
            ```
         2. 当是多个复选框时，因为可以选中多个，所以对应的data中的属性是一个数组，当选中某一个元素时，就会把input的value添加到数组中。
   4. v-model结合select类型使用
      1. 也分单选和多选两种情况
      2. 单选
         1. 只能选中一个值，v-model绑定的是一个值，当我们选中option中的一个时，会将它对应的value复制到mySelect当中
         ```
         <div id="app">
            <select name="abc" v-model="fruit">
               <option value="苹果" >苹果</option>
               <option value="香蕉" >香蕉</option>
               <option value="草莓" >草莓</option>
            </select>
         </div>
         <h2>您的爱好是：{{hobbies}}</h2>
         <script>
            const app = new Vue({
               el:'#app',
               data:{
                  message:'你好'，
                  fruit : "香蕉"
               }
            })
         </script>
         ```
      3. 多选
         1. 可以选择多个值，v-model绑定的是一个数组，当选中多个值时，就会将选中的option对应的value添加到数组mySelect中
         ```
         <div id="app">
            <select name="abc" v-model="fruits" multiple>
               <option value="苹果" >苹果</option>
               <option value="香蕉" >香蕉</option>
               <option value="草莓" >草莓</option>
            </select>
         </div>
         <h2>您的爱好是：{{hobbies}}</h2>
         <script>
            const app = new Vue({
               el:'#app',
               data:{
                  message:'你好'，
                  fruits : []
               }
            })
         </script>
         ```
   5. 值绑定
      1. 即动态的给value赋值而已
         1. 我们前面value中的值，都是在定义input时直接给定的
         2. 但是真实开发中这些input的值很可能是从网络获取的或定义在data中
         3. 所以可以通过v-bind：value动态的给value绑定值
      2. originHobbies是定义在data中的一个现成的数组，可以通过服务器传值改变
         ```
         <label v-for="item in originHobbies">
            <input type="checkbox" :value="item" v-model="hobbies">{{item}}
         </label>
         <script>
            const app = new Vue({
               el:'#app',
               data:{
                  message:'你好'，
                  isAgree : false ,
                  hobbies : [] ,
                  originHobbies : ['篮球','足球','网球']
               }
            })
            </script>
         ```
   6. 修饰符
      1. lazy修饰符  
         1. 默认情况下，v-model默认是在input事件中同步输入框的数据的，也就是说一旦有数据发生改变，对应的data中的数据就会自动发生改变。
         2. lazy修饰符可以让数据在失去焦点或者会车时才会更新
         3. <input type="text" v-model.lazy="message">
      2. number修饰符
         1. 默认情况下，在输入框中无论我们输入的是字母或者数字，都会被当作字符串类型进行处理，但是如果我们希望处理的数字类型，那么最好直接将内容当作数据处理
         2. number修饰符可以让在输入框中输入的内容自动转成数字类型
         3. <input type="number" v-model.number="message"> 即使这样达到了只能输入数字的效果，但是系统内部中还是把这个数字当成字符串在处理。因为v-model默认绑定过去的东西都会转换为string类型，当从input的value拿到值赋给message，v-model给其转换为数字类型了，而这个message又等同于value。所以通过修饰符可以省略类型转换。 
      3. trim修饰符
         1. 如果输入的内容首位有很多空格，通常我们希望将其去除，trim修饰符可以过滤内容左右两边的空格。但是正常在浏览器显示时他会自动处理空格，只显示一个，但是message还是有空格。可以通过修饰符trim处理掉message中的空格。
         2. <input type="text" v-model.trim="message">
