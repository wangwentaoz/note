1. indexOf方法可以在字符串和数组上使用
   1. indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
      1. stringObject.indexOf(searchvalue,fromindex) 
      2. searchvalue：必需。规定需检索的字符串值。
      3. fromindex：可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。
      4. 如果要检索的字符串值没有出现，则该方法返回 -1。
   2. indexOf() 方法可返回数组中某个指定的元素位置
      1. Array.indexOf("value")
      2. 如果找到一个 item，则返回 item 的第一次出现的位置。开始位置的索引为 0。
      3. 如果在数组中没找到指定元素则返回 -1。
      4. 如果你想查找字符串最后出现的位置，请使用 lastIndexOf() 方法。
2. js的执行顺序（事件循环）机制
   1. https://www.jianshu.com/p/17f6e55a8127
3. promise、async和await在事件循环中的执行顺序
   1. https://blog.csdn.net/Coloryi/article/details/100773623
4. big.js常用操作及引用方法
   1. 安装big.js
      1. npm install --save big.js
   2. 页面上引用big.js
      1. const Big = require('big.js')
   3. 常用操作
      1. 加法 plus
          ```
          x = Big(0.1)
          y = x.plus(0.2)
          Big(0.7).plus(x).plus(y)
          ```
      2. 减法 minus
          ```
          x = Big(0.3)
          y = x.minus(0.2)
          ```
      3. 乘法 times
          ```
          x = Big(0.6)
          y = x.times(0.2)
          ```
      4. 除法 div
          ```
          x = Big(2)
          x = Big(3)
          z = x.div(y)
          ```
      5. 绝对值 abs
          ```
          x = Big(-0.6)
          y = x.abs()
          ```
      6. 模运算 mod (取余)
          ```
          x = Big(1)
          y = x.mod(0.9)
          ```
      7. 保留两位小数 toFixed
          ```
          x = Big(12).toFixed(2)
          ```
5. 闭包保存的变量
   1. 第一种情况：直接引用对象中的某个属性，这时闭包为整个对象
      ```
      function foo() {  
        var a = {
          b:'222',
          c:'222'
        }    
        return function(){
          a.b += 1
          console.log(a.b)
        }
      }
      var bar = foo()
      bar()

      Closure (foo) ：       a: {b: '2221', c: '222'}
      ```
   2. 第二种情况：把对象中的属性值赋值到新的变量，这时闭包为新的变量
      ```
      function foo() {  
        var a = {
          b:'222',
          c:'222'
        }    
        var d = a.b
        return function(){
          d += 1
          console.log(d)
        }
      }
      var bar = foo()
      bar()

      Closure (foo) ：     d: "2221"
      ```
   3. 特殊情况：父函数中的其他不执行函数引用了返回函数没有使用的变量,返回函数的闭包里也会有该变量
      ```
      function foo() {  
        var a = {
          b:'222',
          c:'222'
        }    
        var d = {
          e:'222'
        }
        function add(){
          d.e = '111'
        }
        add()
        return function(){
          a.b += 1
        }
      }
      var bar = foo()
      bar()
      console.log('2')

      Closure (foo) ：      a: {b: '2221', c: '222'}
                            d: {e: '111'}
      ```
6.  