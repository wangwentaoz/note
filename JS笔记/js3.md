1. this
   1. 函数预编译过程 window
      1. 函数预编译时不仅仅有变量、函数声明，还有this：window，arguments：[1]
      2. 当对着函数new一个新对象，this会被替换为原型__proto__:原型，和原型链哪里讲的一样
   2. 全局作用域里 window  
      1. GO里直接打this
   3. call/apply 可以改变this指向
   4. obj.func（）；func（）里的this指向obj
      1. 这里面谁调用对象里的方法a，this就指向谁。走预编译时this改变为调用者。
      2. a方法里面的立即执行函数fun（）走的是预编译过程，里面的this指向的window，虽然外面同等级的this指向变了，但是因为没人调用它，所以this不会传进去改变，obj.a（）这里是有人调用了。
         ```
         var obj={
             a:function(){
                 this.name
                 (fun（）{
                    this
                 }())
            },
             name:"abc"
         }
         obj.a();
         ```
2. arguments：数组，表示实参列表
   1. arguments.callee
      1. callee指向函数的引用，即以这个arguments作为参数的函数
      2. 通常在立即调用函数里使用，递归时作为本身的函数，因为立即执行函数的函数名省略了，所以很有用
      3. arguments.length：表示参数长度
   2. func.caller
      1. 函数的属性，表示这个函数被谁调用了
3. 整理
   1. 三目运算符
      1. 条件判断？是：否 例num=1>3?2+5;4-8;
      2. 注：条件判断最后是会返回return的，把值返回给num
   2. 构造函数和函数执行上下文
   ```
   function test(){
       var a=0;
       this.b=1;
   }
    直接执行时形成AO{
        a：0；
    }
    b是全局作用域下面的window.b=1

    new test时也会形成AO{
        var this={
            b：1；
        }；
        a：0；
    }
    作为构造函数首先声明一个this对象作为后面return的返回值
   ```
4. 数组
   1. 定义方法
      1. 字面量 var arr=[1，2];
      2. 构造函数 var arr=new Array（1，3）；
         1. 如果构造函数只传入一个参数，那么这个数会被当做长度而不是数组中的值，这时写小数时会报错。传多位参数时会被当成值。
   2. 数组的读和写
      1. 不会存在越界等报错行为，只会显示undefined。因为js中数组是基于对象定义的，数组和对象没太大差别。
      2. 可以溢出写
   3. 常用方法
      1. 方法在Array.prototype原型里
      2. 改变原数组
         1. arr.push（参数）：在数组的最后面添加内容。可以加很多个
         2. arr.pop（）：把数组的最后一位剪切下来。并且传参没用
         3. arr.shift（）：在数组的前面剪掉内容
         4. arr.unshift（参数）：在数组的前面添加内容，和push相反，也可以添加多个
         5. arr.reverse（）：把原数组改为逆序
         6. arr.splice（从第几位开始，截取多少长度，在切口处添加新的数据）
            1. 也是剪切行为，如果只有前面两个参数，会返回在切口处切掉的长度的数组。
            2. 如果是大于两个参数，在前面两个参数切掉一定长度的数组后，会把第三个直到最后面的参数加到数组的切口处。
            3. 可以切0个，就相当于直接在那里插入数组
            4. 如果从负数-1位开始截取，这里表示的是倒数第一位，如果长度为1的话刚好把最后一位截取了。即在-1的基础上加数组的长度，刚好就是倒数第一位了。
         7. arr.sort（function（）{}）：给数组重新排序，从小到大的顺序，但是这里的排序是字符串排序，即所有的数的第一位比较，第一位相同的话比较第二位，不是数字排序
            1. 所以可以在里面可以添加function，即arr.sort（function（a，b）{if（a>b）{return 1;} else{return -1;}}）真正的升序排序，可以简化为return a-b
            2. 规则
               1. 必须有两个形参
               2. 看返回值
                  1. 当返回值为负数时，那么前面的参数a放在前面
                  2. 当返回值为正数时，那么后面的参数b放在前面
                  3. 当返回值为0时，不动。
            3. 这个函数会调用无数次，当调用第一次时，会把数组的前两位当作参数传进去。
            4. 比较方法：先拿出arr[0],b从第一个依次往后取。再拿出arr[1],b从第二个依次往后取，直到最后，类似于冒泡排序。
      3. 不改变原数组
         1. arr.concat（arr1）
            1. 链接两个数组，把arr1拼到arr上，并且形成一个全新的数组
         2. arr.toString
            1. 把数组变成字符串展示出来
         3. arr.slice（从该位开始截取，截取到该位）
            1. 例如arr.slice(1,2)表示只截取第一位，第二位没有被截取
            2. 如果只有一个参数表示从这位开始截取直到最后
            3. 没有参数表示整个截取
         4. arr.join（“”）
            1. 传的参数为字符串形式，可以传各种字符串
               1. 如果传参数的是"-"，表示所有的数组通过-连接起来，例如"1-2-1"
               2. 不传参数按逗号链接，可以传空字符串""
            2. split
               1. 字符串的方法，不是数组的方法，和join是可逆的
               2. str=arr.join（"-"）
               3. str.split("-")
               4. 变回原样了
5. 类数组
   1. [arguments]是类数组
      1. 属性要为索引（数字）属性，必须有length属性，最好加上push方法
      1. 例:一但加上splice方法，就可以把对象变成数组的表现形式，["1","2"]这种,但还是对象，可以当数组用
         ```
         var obj={
            "0" : "a",
            "1" : "b",
            "length" : 2,
            "push" : Array.prototype.push,
            "splice" : Array.prototype.splice
         }

         Array.prototype.push = function (target){
            obj[obj.length]=target;
            obj.length ++;
            等等
         }
         ```
   2. 可以利用属性名模拟数组的特性
      1. 
      2. 可以动态的增长length属性
      3. 如果强行让类数组调用push方法，则会根据length属性值的位置进行属性的扩充
6. 复习
   1. 包装类
      1. 原始值和引用值区别就是原始值没有各种方法，并且存储地址为栈
      2. 调用原始值的方法时，这时会调用包装类机制。例如str.length，调用length属性时，因为其原始值是字符串，这时会new String(“内容”)；这时字符串对象的构造函数，字符串也有原始值和引用值，这里构造出字符串对象，然后把字符串内容填进去，这时对新构造出的对象进行new String(“内容”).length操作，并且把结果返回，实际写的是str.length，但是却被转换成了new String(“内容”).length，这个过程就叫做包装类，原始值被包装成对象了
      3. 例var num=123，num.a=“a”，不会报错，因为这时会new Number（num）.a=“a”；执行完就会被销毁delete，这时访问num.a时，又会重新new Number（num）.a另外新生成一个新对象，接着访问它的a属性，返回undefined
   2. object.create
      1. delete可以删除对象的属性，一旦经历了var操作，所得出的属性，这种属性叫做不可配置属性，不可配置的属性，delete不掉。例如在全局作用域var num=123；delete window.num就删不掉num
      2. var obj={}；obj.num=234；这里的num就是可配置的，可以删掉。或者直接写window.num=123，都是可以删掉的
      3. object.create（prototype，definedProperty）
         1. 第一个参数为原型对象，第二个为特性，包括可枚举型，可读可写等等
   3. this call
      1.    ```
            预编译
            test()-->AO{
               arguments : {},
               this : window,
               num : undefined,
               a : function(){}
            }
            ```
      2. 如果test（）.call（对象），对象就会被传到this中替代window
7. try catch
   1. try{内容}catch(e){处理}
      1. 当内容中有错误时不抛出错误。不终止后续代码执行，但是内容中的后续代码不会执行。
      2. 如果内容没发生错误，那么正常执行。
      3. catch的作用是捕捉错误信息。
      4. e是形参，系统会把错误项传到e中，在后续代码中处理，有e.name和e.message
   2. Error.name六种值对应的信息
      1. EvalError:eval（）的使用与定义不一致
      2. RangeError:数值越界
      3. ReferenceError:非法或者不能识别的引用数值
         1. 变量未经声明就使用
      4. SyntaxError:发生语法解析错误低级错误
      5. TypeError:操作数类型错误，es5，es3
      6. URLError:URL处理函数使用不当
8. es5严格模式
   1. "use strict"； 
      1. 不再兼容es3的一些不规则语法，使用全新的es5规范
      2. 两种方法
         1. 全局严格模式，写在页面的最顶端
         2. 局部函数内严格模式（推荐），写在函数内部的最顶端
      3. 就是一行字符串，不会对不兼容严格模式的浏览器产生影响
      4. 不支持with,arguments,callee,func,caller,变量赋值前必须声明，局部this必须被赋值，（Person.call(null/undefined)赋值什么就是什么），拒绝重复属性和参数。
         1. with（obj）{ 代码 }
            1. 括号里面的对象会作为代码中的作用域链最顶端。
            2. with（document）{ write("a")} document.write
            3. 消耗大量的效率改变作用域链，效率太低，所以es5严格模式取消了
         2. arguments.callee()
         3. test.caller() 
         4. 变量赋值前必须声明（暗示全局变量不行了）
         5. this如果不赋值不指向Window了，指向undefined，必须被赋值
         6. 拒绝重复属性和参数
         7. eval（字符串） eval可以把字符串当成代码执行。es3不能使用，因为其改变了作用域