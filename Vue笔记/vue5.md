1. 父子组件通信-结合双向绑定案例
   1. 实现的效果
      1. <h2>中的内容和input进行双向绑定
      2. input内部的value改变后，反向传回到父组件app中
      3. 改变上面的input时，下面的props和data全都变为上面的100倍
   2. 在例子的组件中，不推荐直接用双向绑定v-model绑定input和props中的属性，因为props规定的想让父组件改变子组件的，如果input也可以改变那么就会变得很乱，并且可能会出错。所以双向绑定不要绑定到props内部的属性中。
   3. 正确做法：用一个data或者计算属性保存props属性的值，然后进行双向绑定
      ```
      <div id="app">
        <cpn  :number1="num1" 
              :number2="num2"
              @num1change="num1change"
              @num2change="num2change">
        </cpn>
      </div>

      <templeta id="cpn">
        <div>
          <h2>props:{{number1}} data:{{dnumber1}}</h2>
          <input type="text" v-model="number1"> 正确做法v-model="dnumber1"

          <input type="text" :value="dnumber1" @input="num1input">   把v-model双向绑定函数按照原理拆解，input事件为methods中的方法,效果还是一样的，但是可以在input触发的事件中用$emit发送一个事件

          <h2>props:{{number2}} data:{{dnumber2}}</h2>
          <input type="text" v-model="number2">   正确做法v-model="dnumber2"

          <input type="text" :value="dnumber2" @input="num2input">   
        </div>
      </templeta>

      <script>
      const app = new Vue({
            el:'#app',
            data:{
              num1:1，
              num2:0
            },
            methods:{
              num1change(value){
                this.num1 = Number(value)  注意这里面传入的参数是字符串，需要把其转换为number类型，parseInt也可以
              },
              num2change(value){
                this.num2 = Number(value)
              }
            },
            components：{
              cpn:{
                templeta:'#cpn' ,
                props:{
                  number1:Number,
                  number2:Number
                }，
                data(){
                  return {
                    dnumber1:this.number1 ,
                    dnumber2:this.number2 ,
                  }
                },
                methods:{
                  num1input(event){
                    this.dnumber1=$event.target.value ;
                    this.$emit("num1change" , this.dnumber1) ;
                    改变下面的props和data数据
                    this.dnumber2 = this.dnumber1 * 100 ;    改data
                    this.$emit('num2change' , this.dnumber2) 改props
                  },
                  num2input(event){
                    this.dnumber2=$event.target.value ;
                    this.$emit("num2change" , this.dnumber2);

                    this.dnumber1 = this.dnumber2 * 100 ;
                    this.$emit('num1change' , this.dnumber1)
                  }
                }
              }
            }，
            })  
      </script>
      ```
   4. 画图分析  ![图片](./双向绑定案例效果图.png) 
   5. watch实现
      1. 用于监听某一个属性的改变，无论是在data中的或者在props中的属性，在这个案例中可以监听dnumber1属性的改变。
      2. 可以有两个参数，属性（newvalue，oldvalue）{}，一旦属性改变，就会触发这个事件，执行下面的代码
      3. <input type="text" :value="dnumber1" @input="num1input">
          ```
          components：{
              cpn:{
                templeta:'#cpn' ,
                props:{
                  number1:Number,
                  number2:Number
                }，
                data(){
                  return {
                    dnumber1:this.number1 ,
                    dnumber2:this.number2 ,
                  }
                },
                watch:{
                  dnumber1(newValue){
                    this.dnumber2 = newValue * 100 ;
                    this.$emit('num1change' , newValue);
                  },
                  dnumber2(newValue){
                    this.dnumber1 = newValue / 100 ;
                    this.$emit('num2change' , newValue);
                  }}}
          ```
2. 父子组件的访问方式
   1. 有时候我们需要父组件直接访问子组件，子组件直接访问父组件，或者子组件访问根组件。
      1. 父组件访问子组件：使用$children或$refs
      2. 子组件访问父组件：使用$parent
   2. $children访问 对象类型
      1. this.$children是一个数组类型，它包含所有的子组件对象
      2. 我们在这里通过一个遍历，取出所有子组件的message状态
      3. 但是这里存在一个问题，即如果我们取到的是this.$children[0]，当我们在开头再次插入一个子组件的话，就会发生错误，因为这时我们取到的组件是新插入的，而不是原来的。所以这种方法用的比较少。通常用于需要取得所有组件的时候。
   3. $refs访问 对象类型，默认是空对象，只有在子组件中加入refs属性才可以取到
      1. <cpn ref="aaa"></cpn>   this.$refs.aaa就可以取到正确的标签了，无论插入与否，因为这里相当于给这个子组件命名aaa，取的时候通过.aaa就可以取到特定的这一个组件。
        ```
        <div id="app">
        <cpn></cpn>
        <cpn></cpn>
        <cpn></cpn>
        <button @click="btnClick">按钮</button>
        </div>
        <template id="cpn">
          <div>子组件</div>
        </template>
      <script>  
        const app = new Vue({
          el:'#app',
          data:{
            message:
          },
          methods:{
            btnClick(){
              this.$children[0].showMessage()   这里面有三个子组件，this.$children取到的子组件被保存为数组，可以通过数组的下标来取想要的那一个子组件，这里为第一个子组件。取到组建后可以继续取组件中的data、methods等
            }
          },
          components：{
            cpn:{
              template:'#cpn' ,
              methods :{
                showMessage(){}
              }
            }
          }
        })  
      </script>
        ```
   4. $parent
      1. 不建议这样使用，如果这样使用那么这个组件就不够独立了，复用性不强了。耦合度太高了。
      2. 直接访问根组件this.$root
        ```
        <div id="app">
        <cpn></cpn>
        </div>
        <template id="cpn">
          <div>子组件</div>
          <button @click="btnClick">按钮</button>
        </template>
      <script>  
        const app = new Vue({
          el:'#app',
          data:{
            message:
          },
          
          components：{
            cpn:{
              template:'#cpn' ,
              methods:{
              btnClick(){
              访问父组件
              this.$parent.message
              }
              },
              components:{套娃}
            }
          }
        })  
      </script>
        ```