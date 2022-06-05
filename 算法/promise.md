1. Promise初试
   1. Promise是一个构造函数，需要我们对其进行实例化，我们把传入的参数表示为executor函数
   2. 这个executor函数其实是一个执行器，在我们 new Promise 的时候它会自动执行
   ```
   let promise = new Promise(executor)
   let promise = new Promise((resolve,reject) =>{
     resolve('success')
   })
   promise.then((value) =>{
     console.log(value)
   }, (reason) =>{
     console.log(reason)
   })
   ```
2. es6写promise
```
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise(promise2, x, resolve,reject){
  if(x === promise2){
    return reject(new TypeError('链式循环，fulfilled函数return的promise是我们then函数返回的promise'))
  }
  let called = false
  if((typeof x === 'object' && x!== null) || typeof x === 'function'){
    try{
      let then = x.then
      if(typeof then === 'function'){
        x.then((y)=>{
          if(called) return
          called = true
          // resolve(y)
          resolvePromise(promise2, y, resolve,reject)
        }, (r)=>{
          if(called) return
          called = true 
          reject(r)
        })
      }else{
        resolve(x)
      }
    }catch(e){
      if(called) return
      called = true 
      reject(e)
    }
  }else{
    resolve(x)
  }
}


class MyPromise {
  constructor(executor){
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) =>{ 
      if(this.status == PENDING){
        this.state = FULFILLED
        this.value = value
        // 发布
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }
    const reject = (reason) =>{
      if(this.status == PENDING){
        this.state = REJECTED
        this.reason = reason
        // 发布
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try{
      executor(resolve, reject)
    } catch(e){
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
    let promise2 = new MyPromise((resolve,reject) =>{
      if(this.status == FULFILLED){
        setTimeout(()=>{
          try{
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve,reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if(this.status == REJECTED){
        setTimeout(()=>{
          try{
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve,reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if(this.status == PENDING){
        // 订阅
        this.onFulfilledCallbacks.push(() =>{
          try{
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve,reject)
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectedCallbackspush(() =>{
          try{
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve,reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    return promise2
  }
  catch(errorCallback){
    return this.then(null, errorCallback)
  }
}
module.exports = MyPromise
```
3. Promise.all
   1. Promise.all() 方法接收一个 promise 的 iterable 类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例， 那个输入的所有 promise 的 resolve 回调的结果是一个数组。这个Promise的 resolve 回调执行是在所有输入的 promise 的 resolve 回调都结束，或者输入的 iterable 里没有 promise 了的时候。它的 reject 回调执行是，只要任何一个输入的 promise 的 reject 回调执行或者输入不合法的 promise 就会立即抛出错误，并且reject的是第一个抛出的错误信息。
```
Promise.MyAll = function (promises) {
  let arr = [], count = 0
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(res => {
        arr[i] = res
        count += 1
        if (count === promises.length) resolve(arr)
      }, reject)
    })
  })
}
```
4. Promise.race
   1. Promise.race 从字面意思理解就是赛跑，以状态变化最快的那个 Promise 实例为准，最快的 Promise 成功 Promise.race 就成功，最快的 Promise 失败 Promise.race 就失败。
```
Promise.MyRace = function (promises) {
  return new Promise((resolve, reject) => {
    // 这里不需要使用索引，只要能循环出每一项就行
    for (const item of promises) {
      Promise.resolve(item).then(resolve, reject)
    }
  })
}
```
5. Promise.any
   1. Promise.any 与 Promise.all 可以看做是相反的。Promise.any 中只要有一个 Promise 实例成功就成功，只有当所有的 Promise 实例失败时 Promise.any 才失败，此时Promise.any 会把所有的失败/错误集合在一起，返回一个失败的 promise 和AggregateError类型的实例。MDN 上说这个方法还处于试验阶段，如果 node 或者浏览器版本过低可能无法使用，各位看官自行测试下。
```
Promise.MyAny = function (promises) {
  let arr = [],
    count = 0
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(resolve, err => {
        arr[i] = { status: 'rejected', val: err }
        count += 1
        if (count === promises.length) reject(new Error('没有promise成功'))
      })
    })
  })
}
```
6. Promise.allSettled
   1. 有时候，咱代码人总是会有点特殊的需求：如果咱希望一组 Promise 实例无论成功与否，都等它们异步操作结束了在继续执行下一步操作，这可如何是好？于是就出现了 Promise.allSettled
```
Promise.MyAllSettled = function (promises) {
  let arr = [],
    count = 0
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(res => {
        arr[i] = { status: 'fulfilled', val: res }
        count += 1
        if (count === promises.length) resolve(arr)
      }, (err) => {
        arr[i] = { status: 'rejected', val: err }
        count += 1
        if (count === promises.length) resolve(arr)
      })
    })
  })
}
```