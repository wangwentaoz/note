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
3. 