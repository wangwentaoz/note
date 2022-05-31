1. 使用
   1. 我们使用 useStore 获取 store 的实例
   2. 并且使用计算属性返回 count，在修改 count 的时候使用 store.commit(‘add’) 来修改 count 的值。
   ```
    import {useStore} from '../store/gvuex'
    let store =useStore()
    let count = computed(()=>store.state.count)
    function add(){
        store.commit('add')
    }
   ```
2. 首先，我们需要创建一个变量 store 用来存储数据。下一步就是把这个 store 的数据包转成响应式的数据，并且提供给 Vue 组件使用
   1. 在 Vue 中有 provide/inject 这两个函数专门用来做数据共享，provide 注册了数据后，所有的子组件都可以通过 inject 获取数据
3. 我们直接进入到 src/store 文件夹下，新建 gvuex.js。
   1. 我们使用一个 Store 类来管理数据，类的内部使用 _state 存储数据，使用 mutations 来存储数据修改的函数
   2. 注意这里的 state 已经使用 reactive 包裹成响应式数据了。
   3. 暴露了 createStore 去创建 Store 的实例
   4. 并且可以在任意组件的 setup 函数内，使用 useStore 去获取 store 的实例
   5. Store 类内部变量 _state 存储响应式数据，读取 state 的时候直接获取响应式数据 _state.data
   6. 并且提供了 commit 函数去执行用户配置好的 mutations。
4. 回到 src/store/index.js 中
   1. 我们使用 createStore 创建了一个 store 实例
   2. 并且实例内部使用 state 定义了 count 变量和修改 count 值的 add 函数
5. 最终我们使用 store 的方式，在项目入口文件 src/main.js 中使用 app.use(store) 注册
   1. 为了让 useStore 能正常工作，我们需要给 store 新增一个 install 方法,这个方法会在 app.use 函数内部执行
   2. 我们通过 app.provide 函数注册 store 给全局的组件使用。