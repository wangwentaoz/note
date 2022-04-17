1. 插槽slot
   1. 组件的插槽
      1. 目的是为了让我们封装的组件更加具有扩展性，让使用者决定组件内部的一些内容到底展示什么。
      2. 例子：移动网站中的导航栏
         1. 导航栏我们一定会封装成一个插件，比如nav-bar组件，一旦有了这个组件我们就可以在多个页面中复用了。
         2. 但是每个页面的导航栏又各有不同，这需要我们抽取共性，保留不同，即将共性抽取到组件中，将不同暴露为插槽。一旦我们预留了插槽，就可以让使用者根据自己的需求，决定插槽中插入什么内容。
         3. 直接把插槽标签放入组件中就可以使用了。
      3. 下面案例中会把cpn标签中的内容（按钮）替换到slot（插槽）标签中，但是slot标签中也可以插入默认值，如果cpn标签中没有传入内容，就会用默认值替代
            ```
            <div id="app">
            <cpn>
              <button>按钮</button>
            </cpn>
            </div>
            <template id="cpn">
              <div>
                <button @click="btnClick">按钮</button>
                <slot><button>按钮</button></slot>
              </div>
            </template>
            ```
   2. 具名插槽slot
      1. 当需要有多个插槽的时候，需要给插槽起名字来进行区分，如果插槽有名字了，相上面那种替换（<cpn><bottom>按钮</bottom></cpn>）就只能替换没有名字的插槽，有名字的不会被替换。如果想要替换有名字的，必须在cpn里面的标签中添加插槽属性，<cpn><bottom slot="center">按钮</bottom></cpn>
        ```
        <div id="app">
          <cpn>
            <bottom slot="center">按钮</bottom>
          </cpn>
        </div>
        <template id="cpn">
          <div>
            <slot name="left"><span>左边</span></slot>
            <slot name="center"><span>中间</span></slot>
            <slot name="right"><span>右边</span></slot>
          </div>
        </template>
        ```
   3. 作用域插槽
      1. 编译作用域
         1. 在实例中使用了很多的变量，也就是例子中的div中的cpn的属性上使用的变量，在查找这些变量的时候，都是先查找这些变量在哪个模板里面，而不是因为使用的是这个组件，所以在这个组件里面查找这个变量。即在使用组件时，传入的属性变量首先会在实例app中查找这些变量，只有在<template>中标签中的属性定义的变量才会在模板中查找数据。所以只会在自己的作用域中查找相关的变量。
         2. 官方准则：父组件模板的所有东西都会在父级作用域内编译；子组件模板的所有东西都会在子级作用域内编译。<cpn v-show="isShow"></cpn>我们在使用这个时，整个组件的使用过程是相当于在父组件中出现的，那么它的作用域就是父组件，使用的属性也是属于父组件的属性，所以isShow是使用的vue实例当中的属性，而不是子组件的属性。
            ```
          <div id="app">
            <cpn v-show="isShow"></cpn>  这里面的isShow会使用实例vue中的数据，所以这个cpn会显示出来
          </div>
          <template id="cpn">
          <div>
            <h2>子组件</h2>
          </div>
          </template>
          <script>  
            const app = new Vue({
            el:'#app',
            data:{
              message:'hello',
              isShow:true
            },
            components:{
              cpn:{
                template: '#cpn' ,
                data(){
                  return {
                    isShow : false
                  }
                }
              }
            }
          </script>
            ```
      2. 作用域插槽的使用
         1. 父组件替换插槽的标签，但是内容由子组件来提供 。也就是相当于一个简化的props接口
         2. 需求
            1. 子组件中包括一组数据，例pLanguages:['javascript','python','c++']
            2. 需要在多个界面进行展示：某些界面是水平方向展示，某些界面列表形式展示，某些界面直接展示一个数组
         3. 内容在子组件，希望父组件告诉我们如何展示，使用slot作用域插槽
            ```
            <div id="app">
              <cpn></cpn>
              <cpn> 目的是获取子组件中的pLanguages ,在vue2.5以下的版本必须使用template，在这个版本以上也可以使用别的标签，比如div标签
                <template slot-scope="slot">  通过这个属性就可以引用下面slot标签中的插槽对象
                  <span v-for="item in slot.data">{{item}}-</span>  
                  这里取到的data就是下面slot标签中的：data中存放的数据。通过这种方式可以拿到子组件中的数据交给父组件。这里形成的效果就是javascript-python-c++- 如果想要取消末尾的'-'字符串，就可以使用数组的join方法  
                  <span>{{slot.data.join('-')}}</span>  
                  数组的join方法可以把数组转化成字符串，并且在每个数组元素之间添加字符串，这里形成的效果就是javascript-python-c++  
                </template>
              </cpn>
            </div>

            <template id="cpn">
            <div>
              <slot :data="pLanguages">
                <ul>
                  <li v-for="item in pLanguages">{{item}}</li>
                </ul>
              </slot>
            </div>
            </template>

            <script>  
              const app = new Vue({
              el:'#app',
              data:{
                message:'hello',
              },
              components:{
                cpn:{
                  template: '#cpn' ,
                  data(){
                    return {
                      pLanguages:['javascript','python','c++']
                    }
                  }
                }
              }
            </script>
            ```
2. 模块化开发
   1. 前端代码复杂带来的问题
      1. 全局变量名称会重复，导致一系列问题，如果用匿名函数闭包的方式解决的话，会导致闭包内部的变量外部不可用，代码的复用性降低。
      2. 但是如果在立即执行函数外部用一个变量接受函数内部的返回值，那么就可以把内部的变量方法等保存到外部，下面的例子中moduleA已经把立即执行函数内部所需要的东西保存在外部了。这只是最基础的模块化开发。
        ```
        var moduleA=  (function(){
          var obj={};
          function sum(){略};
          var flag=false;
          obj.flag=flag;
          obj.sum=sum;
          return obj
        })()
        moduleA.flag
        moduleA.sum()
        ```
      3. 另外这种代码的编写方式对js文件的依赖顺序几乎是强制性的，当js文件过多，弄清他们的顺序是一件比较麻烦的事情，而且即使顺序搞清了，也不能避免上面的问题发生
      4. 常见的模块化规范：CommonJS,AMD,CMD,也有ES6的Modules
   2. CommonJS
      1. 模块化有两个核心：导入和导出，刚才的return就是导出，导入就是moduleA.flag
      2. CommonJS的导出
         1. 模块化里面一个js文件就算是一个模块，这个模块有自己的作用域，所以只需要在js文件正常写代码，不用立即执行函数，只要在最后面写module.exports = {flag:flag ,sum:sum}
         2. 但是需要有底层帮助实现这种方式导出的，如果直接用但没有解析是没有意义的。
            ```
            module.exports = {
              flag: true ,
              test(a,b){
                return a+b
              },
              demo(a,b){
                return a*b
              }
            }
            ```
      3. CommonJS的导入
         1. 的
            ```
            CommonJS模块(这里面对导出的对象进行解构，直接用对象中的变量直接接受)
            var {test, demo, flag } = require('moduleA') ;
            var {test, demo, flag } = require('./aaa.js') ;

            等同于(这里面导出的直接保存为_mA这个对象)
            let _mA = require('moduleA');
            let test = _mA.test;
            let demo = _mA.demo;
            let flag = _mA.flag;
            ```
   3. ES6模块化的导入和导出
      1. 模块化
         1. <script src="aaa.js" type="module"></script> 加入的type=module表示导入的文件是按照模块化思想导入的，意味着这个文件就是单独的模块，具有单独的作用域，不会发生命名冲突，并且如果引用别的模块中的变量会报错，必须导出然后再导入才可以使用别的模块中的东西
      2. 导出export
         1. 方法一：在js文件末尾用export语法导出，例 export {flag, sum} 这里面导出的不能写做对象，好像是没有导出为对象保存的，只写想要导出的变量、方法就行了
         2. 方法二：定义时就直接导出，例 export var num1 = 1000； 
      3. 导出函数或类
         1. 在定义时导出函数：export function sum(){}   当然也可以在末尾导出
         2. 导入函数 import {sum} from "./aaa.js" ;
         3. 在定义时导出es6的类：export class Person{}
      4. 默认导出 
         1. 正常情况下，我们导出的名字是什么，导入的时候就必须用这个名字来导入。但是某些情况下，一个模块中包含的某个功能，我们并不希望给这个功能命名，而让导入者自己命名，这时就可以用export default。
         2. export指令导出模块对外提供的接口 
            ```
            const address= '上海市' ;
            export default address 同一模块中默认导出的东西只能有一个，导出多个接受时就乱了
            export default function (){} 如果默认导出的是函数的话，就不需要给函数起名字了，用匿名函数导出
            ```
            ```
            import addr from "./aaa.js" ;  默认导入这个文件aaa.js中默认导出的东西，名字随便起,这时就不需要大括号{}了。
            ```
      5. 导入import
         1. 在js文件最上方用import导入，例 import{flag ,sum } from "./aaa.js" ;
         2. 如果我们希望导入某个模块中的所有的信息，通过 * 可以导入模块中的所有的export变量，但通常情况下需要给 * 起一个别名，方便后续的使用
          ```
          import * as aaa from "./aaa.js" ;
          aaa.flag 直接取出导入的变量，相当于把导入的全部变量全都加载到对象aaa中
          ```
