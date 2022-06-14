1. vue自定义组件上的v-model值与子组件数据绑定
   1. 可以用于子组件主动修改父组件的值
      ```
      父组件v-model data值
      子组件
      props：{
        data: {
          type: String,
          default: () =>{''},
        },
      }
      model:{
        prop:'data',   //代表和父传子props的值
        event:'cc'     //触发这个事件的时候会改变父组件v-model的值
      }
      method:{
        change(data){
          this.$emit('cc', '信息')
        }
      }
      ```
2. watch监听一个对象中的属性
   1. 例：
      ```
      方法一：直接监听对象，如果修改了这个queryData中的任何一个属性，都会执行handler这个方法
      watch: {
        queryData: {
          handler: function() {},
          deep: true,
          immediate:true
        }\

        ` 
      }
      不过这样开销很大，尤其是对象里面结构嵌套过深的时候。

      方法二：有时候我们就想关心这个对象中的某个属性，比如name
      watch: {
        'queryData.name': {
          handler: function() {},
        }
      }

      方法三：巧用计算属性
      computed: {
        getName: function() {
          return this.queryData.name
        }
      }
      watch: {
        getName: {
          handler: function() {},
        }
      }
      ```
3. @input="inputEvent(arguments,scope.$index)"
   1. input事件里面传出来的参数，argument
   2. 后面的参数是自己另外加上的
   3. argument也可以使用$event代替,不过$event只能取到一个参数
4. el-table表格表头自定义，使用插槽的方式，表头数据不更新
   1. <template slot="header" >改成<template #header>
5. 在vue页面文件中使用el-popover组件时，在style标签中设置样式无效。
   1. el-popover的class是el-popover，他比较特别的是,el-popover生成的div不在当前组件之内，甚至不在App.vue组件的div内，他和App.vue组件的div平级，需要设置全局style。
   2. 当不同页面都使用到了el-popover组件，并且样式有区别，在全局设置样式时针对每一个popover-class的名字修改样式即可解决！
6. el-input-number直接在输入框输入内容v-model的值不会跟着改变
   1. el-input-number组件中直接输入值，然后离开鼠标直接mouseenter其他的button,这个时候要获取v-model的值，发现v-model的值并不会改变
   2. 查elementui的issure发现是因为el-input-number在封装时并没有将直接输入的值赋值给v-model,然后自己细想一下使用@keyup事件把输进去的值在给到v-model.
      ```
      <el-input-number
        v-model.number="choose_quantity"
        @keyup.native="number_change($event)"
      />
      number_change(e) {
      //在输入的时候就要判断只能输入正整数
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
      //   然后在每次keyup时把值赋给v-model
      if (!e.target.value) {
       // 这里给undefined是因为不给值就会默认变为0，不会为空
        this.choose_quantity = undefined
      } else {
        this.choose_quantity = e.target.value
      }
      ```
7.  vue中div元素的@contextmenu.prevent="openMenu($event, scope.row, index)" 右键事件
8.  vue背景图不要使用background-image，会出现bug，使用下面的方式或者直接用img图片放在div后面
    1. :style="{backgroundImage: 'url(' +color+ ')'}"
    2. color:require('./assets/default.png')
9.  关于组件传值
    1. 父组件向子组件中传值
       1. :apiParams='landIdParams' 和 :apiParams='{a:''}'
    2. 如果在子组件中通过watch监听apiParams，那么第二种情况会一直刷新
10. vue使用dragstart等方法，实现拖拽排序
    1. 具体使用见roomImg.vue
    2. draggable="true"，使元素可拖拽 
      ```
      <ul class="img-group">
          <li
              class="img-group-item"
              v-for="(i,ind) in goodsDetail"
              draggable="true"
              :data-index="ind"
              @dragstart.stop="dragstart($event,goodsDetail)"
              @dragenter.stop="dragenter"
              @dragover="dragover"
              @dragend="dragend($event,changeSort)"
          >
              <img
                  :src="i"
                  class="pointer"
              >
              <i
                  class="delete-icon"
              ></i>
          </li>
      </ul>
      ```
    3. 把方法提出来做成公共方法使用，命名drag.js
        ```
        export default {
          data() {
              return {
                  currList: [],
                  startIndex: '',
                  enterIndex: '',
              }
          },
          methods: {
            dragstart(e, list) {
                this.currList = list;
                this.startIndex = e.target.getAttribute('data-index') || e.target.parentNode.getAttribute('data-index');
            },
            dragenter(e) {
                this.enterIndex = e.target.getAttribute('data-index') || e.target.parentNode.getAttribute('data-index');
            },
            dragover(e) {

            },
            dragend(e, callback) {
              // 交换位置
              // this.currList[this.enterIndex] = this.currList.splice(this.startIndex, 1, this.currList[this.enterIndex])[0];
              // 按顺序排序
              if (this.enterIndex < this.startIndex) { // 拖动图片到前面
                  this.currList.splice(this.enterIndex, 0, this.currList[this.startIndex]);
                  this.currList.splice(Number(this.startIndex) + 1, 1);
              } else { // 拖动图片到后面
                  this.currList.splice(Number(this.enterIndex) + 1, 0, this.currList[this.startIndex]);
                  this.currList.splice(Number(this.startIndex), 1);
              }
              this.startIndex = '';
              e.preventDefault(); // 设置为可以被拖放
              if (callback) {
                  callback();
              }
            }
          }
        }
        ```
    4. 引入js：import Drag from './drag.js'; mixins: [Drag],
        ```
        <script>
        import Drag from './drag.js';
        export default {
            mixins: [Drag],
            methods: {
                changeSort() {
                    // console.log(this.currList);
                    // 交换位置之后回调
                },
            }
        }
        </script>
        ```