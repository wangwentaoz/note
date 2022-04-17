1. 立即执行函数
   1.  正常定义函数等待调用会占用空间，有些函数只需要执行一次，执行完就可以被销毁。
       1.  只执行一次的函数，称为初始化函数
       2.  好处执行完就会被立即释放，再也找不到了
   2. （function（形参）{   函数内容  } （实参））
   3. （function（形参）{   函数内容  } ）（实参）
   4. 只要有括号，里面的东西就变成表达式了，开始执行了，表达式是会执行的。
   5. 两种方法，建议用第一个
   6. 只有表达式才能被执行符号执行，第一个是声明，不是表达式
      1. function test（）{} （）不能执行
      2. function test（）{}；test（）可以执行
      3. var test = function（）{} （） 可以执行
      4. + function test（）{} （）能执行
      5. 所以 能被执行符号执行的表达式，名字会被忽略，即上面第三种情况再次调用test时，显示undefined。也就是被执行符号立即执行的表达式会变为立即执行函数。
      6. 第四种情况把声明通过正号（减号可以，乘除不行，！可以，&&和||都行，但这俩前面要放东西）变为表达式了，执行后忽略函数名字test 
      7. 第三个，立即执行时会放弃函数储存在test中的引用，让test回归到未被声明的状态
      8. 上面立即执行函数中的括号会把里面的内容变为表达式，然后就可以用执行符号执行
      9. function test（a，b）{} （1，2）；因为（）当成执行符号会因为其为函数声明被报错，js理解为function test（）{} ；（1，2）；后面括号里面的为逗号运算符，所以不会报错，也没执行，test函数声明还在。
      10. 但是这里（function（形参）{   函数内容  } （实参））的实参括号还是被理解为执行符号。
      ```
      function test(){
         var arr=[];
         for (var i=0;i<10;i++){
            (function(j){
               arr[j]=function(){
                  document.write(j+" ");
               }
            }(i));
         }
         return arr;
      }
      var myarr=test();
      for(var j=0;j<10;j++){
         myarr[j]();
      }
      通过闭包解决i变量改变的问题
      通过调用立即执行函数把i转换为数值成功保存在j中，因为立即执行函数会建立自己的执行上下文，所以每次j都是分属于不同的执行上下文，不会发生覆盖 
      ```
2.  对象
    1.  删除属性
        1.  delete 对象.属性
        2.  当一个变量未经声明就使用会报错，当一个对象属性未生明就使用会显示undefined，不会报错
    2. 对象的创建方法
       1. var obj={} 对象字面量
       2. 构造函数
          1. 系统自带的构造函数 Object（） var obj=new Objcect（）；
          2. 自定义 function ABC{内容}；var a=new ABC；形式上与函数定义没有区别。为了与函数区别开来，采用大驼峰式命名规则（每个单词首字母都大写，小驼峰第一个不大写）
          3. 通过new把函数变为构造函数
       3. 构造函数原理
          1. 在函数体最前面隐式的加上this={}，其余等同预编译，也有AO,只是最后只返回this给前面的new的
             1. 即在函数的内容区域第一行加上var this=object.create（x.prototype）也就是形成了{__proto__:x.prototype}
          2. 执行this.xxx=xxx
             1. 这一步在第一行形成的this空对象里面添加属性内容
             2. 即AO{this ： {name ： 'wang'}}
          3. 隐式的返回this
             1. return this;
             2. 但是这里容易出问题，如果这里直接显示return一个对象，则这个this对象返回不出来，如果显示return的不是对象，而是比如数字123，还是可以隐式的返回this对象。因为是new function（），所以系统自动给你把显示返回值微调，忽略不是对象的返回值
          4. undefined和null这俩原始值无论如何都不可以有属性，正常的三个原始值也没有属性和方法，但是number、string、Boolean这三个原始值可以通过new变为对象来拥有属性
          5. 包装类：当给三个原始值赋值时，例如num=4； num.length=3，这时会新建new Number（4）.length=3； 然后delete这个新建的类，让赋值操作不报错，但是又没保存这个属性，访问时又会重新新建new Number（4）.length，这时因为新建的啥都没有，访问不到，显示为undefined
          6. string.length时会新建一个字符串对象，而这个对象是有length属性的
       4. 对象里面的方法中的this指的是对象，而不是函数创建的this
       5. 问题
          1. ```
               function six(name){
                  this.name=name;
               } 
               onesix=new six("wang")
               这时参数并不会改变对象的属性，这里有且只有name属性，只是改变了属性值为wang，参数不能改变属性
             ```
3.  原型
    1.  原型是function对象的一个属性。它定义了构造函数制造出的对象的公共祖先。通过该构造函数产生的对象，可以继承该原型的属性和方法。原型也是对象。构造函数有原型，原型里有两个属性，__proto__和constructor。对象通过__proto__属性找到原型。
        1. 利用原型的特点和概念，可以提取共有属性。
        2. 对象查看原型：隐式属性 proto
        3. 对象查看其构造函数：constructor
        4. x.prototype里面含有两个对象，一个是__proto__，另一个是constructor（指的是的构造函数，可以通过x.prototype.constructor修改为另外一个函数）,这俩对象都是在原型中才能找到。
        5. 在构造函数创建对象时，会在最开始的this对象里先创建一个__proto__属性，这里存放的是原型，当在对象里找不到属性时就会从这个指向的原型里面找属性，虽然前后加个下划线表示隐式属性是系统私人的，不建议修改（正常编写属性时表示不允许别人修改可以在属性前面添加一个下划线_），但实际上是可以把原型修改为别的函数的原型的。 
    2.  this中的属性__proto__
        1.  首先X.prototype.name='sunny';
        2.  新建一个对象x，var x=new X；
        3.  修改X.prototype={name：'cherry'}
        4.  这时访问x的name属性，访问到的时sunny
        5.  原因：第三步修改原型时是新建了一个原型，而新建对象时其this中的__proto__属性指向的地址从未改变，一直指向sunny，所以在第四步访问不到新改动的cherry。可以参考前面堆栈储存时的内存访问。
        6.  如果这里直接修改x.prototype.name就没问题。或者把第二部提到第三步后面
    3.  原型链
        1.  object.prototype是所有对象的最终原型，里面有一些方法，比如toString，但是没有__proto__了
        2.  调用修改：son.fortune.card1。条件为儿子没有fortune属性，父亲有，但是父亲这个对象属性没有card1属性。这里通过原型链调用，在这个基础上给父亲的fortune对象属性增加一个属性，实现了儿子通过原型链修改父亲的属性
        3.  父亲有num=100的属性，儿子没有，当儿子调用son.num++时，son.num=son.num+1，把父亲的值取过来赋给自己新建的属性
        4.  object.create
            1.  var obj=object.create(原型)  原型只能是对象或者null
            1.  出现了特例，可以使最终继承不是object.prototype。即在object.create（null）括号里添加null作为原型，所以这里面啥原型都没有了，也没有toString等方法。如果手动给其定义__proto__属性，不好使，访问不到
            2.  undefined、null不能调用toString，原因是数字、字符串等其他类型可以通过包装类（即通过对象包装）访问到原型object，但是undefined、null没有包装类，只是原始值，没有原型。只有他俩没有原型，访问不到object.prototype。
                1.  122.toString不行，只能通过把其赋值给变量，然后变量调用to.String方法。数学计算的.优先级最高，没有把.看成调用方法，首先把.识别为浮点型数值，但是发现后面是字母，所以不行。
                    1.  var num=123；
                    2.  num.toString（）；
                    3.  包装类包装为new Number（num）.toString（）
                    4.  Number.prototype.toString上面有这个方法
                    5.  Number.prototype.__proto__=object.prototype
                    6.  因为Number里面有toString方法，所以调用不到object的toString方法，称为重写
                2.  obj.toString（）；返回值为"[object object]"  
                    1.  不止Number里面有重写的toString，Array.prototype.toString也有，Boolean.prototype.toString也有，String.prototype.toString也有。
                    2.  object.prototype.toString和上述的toString不同，其显示的信息很少，如同上面显示的，只有两个object
                3.  document.write（）调用的其实是toString方法
                    1.  例var obj=Object.create（null）；
                    2.  document.write(obj)这时等于document.write(obj.tostring())
                    3.  这时会报错，因为没有tostring函数。如果第二步前面加上obj.toString=function(){ return'good';}。这时会打印出来good，说明调用了tostring方法
            3. js的精度比较低，所以有时候需要取整
                1. 向上取整：Math.ceil（数字）
                2. 向下取整：Math.floor（数字）
                3. 产生0-1之间的随机数，不包含0和1 ：Math.random（）
                4. 保留几位小数：数字.toFixed（几位小数）
                5. 可正常计算的范围，小数点前16位，后16位，科学计数法只算前面显示的数，10的多少次方不算，算前面的数，多余16位会被忽略
    4. call、apply 实际并没有减少工作效率
        1. call
           1. 正常函数调用adb（）其实都是调用adb.call（） 
           2. function.call（对象）传进去的对象指代函数内部的this，第二位开始正常传实参。
           3. 通过函数调用call可以把构造函数第一步中的this传进去，然后函数调用完成后把这个this返回，成功调用函数。例：fuc.call（this，实参）
        2. 区别
           1. 传参列表不同
              1. apply只能传一个实参，这个实参必须为数组形式。即传一个arguments。例fuc.apply（this，[a,b]）通过数组里面包括几个实参
4.  继承extend
    1.  共有原型：Son.prototype=Father.prototype ，通过这个实现了继承
    2.  如果son想要在原型上添加属于自己的属性，那么父亲也要被修改，这时可以设置一个中间层，即新建一个函数作为中间层，因为儿子的原型是一个新的对象，所以不会修改到父亲的原型
         ```
         function F(){};
         F.prototype=Father.prototype;
         Son.prototype=new F();
         Son.prototype.constructor=Son；
         Son.prototype.uber=Father.prototype；表明son继承自父亲
         ```
    3. 在前三步函数时，son的构造函数存放在constructor中，但是由于把其原型修改为新建的对象了，而对象里没有constructor，又找到了它的原型F.prototype，即Father.prototype，这里的构造函数是function Father，所以需要在第四步修改一下，直接在F新建的对象中添加一个属性就可以了，因为原型也是对象。注意：对象是没有构造函数的，只有在原型里有，所以需要找到其原型。
    4. 构造函数有原型，原型里有两个属性，__proto__和constructor。对象通过__proto__属性找到原型。
    5. 构造函数内部的变量外面访问不到，但是通过内部定义方法，形成闭包可以在外部通过方法访问到，但是如果直接在外部访问这个变量，显示undefined
         ```
         var inherit = (function(){
            var F = function {};
            return function(Son,Father){
               F.prototype=Father.prototype;
               Son.prototype=new F();
               Son.prototype.constructor=Son；
               Son.prototype.uber=Father.prototype；
            }
         })
         ```
    6. 这里通过形成闭包，把F保存在return返回的函数的执行上下文中，形成私有化变量，外面直接访问不到
5. 命名空间
   1. 管理变量，防止污染全局，适用于模块化开发。保证每个人之间的命名空间不冲突
   2. 以前
      ```
      org={department1：{
         wang:{王的命名空间};
         wen:{文的命名空间};
      },
      department2:{
         wang:{王的命名空间};
         wen:{文的命名空间};
      }}
      ```
   3. 现在通过闭包把变量私有化，内部的变量不会污染到外面，因为立即执行函数会销毁变量，通过闭包把变量保存在执行上下文中调用，留出一个接口callName直接调用就可以了
      ```
      var name = "bcd";
      var init=(function(){
         var name="abc";
         function callName(){
            console.log(name);
         }
         return function(){
            callName();
         }
      }())
      ```
6. 对象里面的方法中的this指的是对象，而不是函数创建的this，通过在方法中return this可以实现连续调用方法
   1. 对象中的属性，在被方法中访问时，必须要用this.属性指代，否则访问不到。方法是直接调用的没有构造函数可以通过执行上下文形成的闭包，导致访问不到，必须知道哪个对象中的属性
7. 属性表示方法   
   1. obj.name被隐式的转换为obj["name"]
   2. 所以可以通过拼接方式把属性名分几部分表示。例：this[“name”+num]，其中num变量=1，实现访问this.name1属性
8. 枚举（遍历）
   1. for （var x in obj）{console.log（x）}
   2. 这里每个x都是一个变量，等于每一次的属性名，就是字符串，从开始循环直到结束
   3. for （var x in obj）{console.log（obj.x）}
   4. for （var x in obj）{console.log（obj["x"]）}
   5. 第三个第四个是相同的，访问结果都是undefined，因为这里系统认为是在访问x这个属性，而不是x指代的每次的变量。所以这里需要console.log（obj[x]）,这时x代表的是不同的变量，变量本身就是字符串，把它的名字字符串放入就可以成功访问。只有枚举是特例
9. hasOwnProperty 
   1.  obj.hasOwnProperty（属性）：表示这个验证对象本身的属性，不包括其继承自原型的一些属性
   2.  for in循环可以访问原型以及原型链上的属性，但是排除最内层的每个对象都有的object的属性
   3.  
      ```
      for （var x in obj）{
         if(obj.hasOwnProperty(x){
            过滤不是自己本身的属性
         })
      }
      ```
10. in
    1.  "属性" in obj ：表示判断这个属性是不是obj对象中的，返回布尔值。
    2.  注意需要把属性正常写法为字符串，而这里是变量，需要给属性添加引号
    3.  in 这里为true的情况包括其为原型链上的属性，这是与hasOwnProperty的区别
11. instance of
    1.  A instance of B 表示A对象是不是B构造函数构造出来的
    2.  其实是 看A对象的原型链上 有没有 B的原型
    3.  例如大部分对象的原型链上都有object
12. 区别数组和对象三种方法
    1.  constructor
    2.  instance of array
    3.  object.prototype.toString.call（[]）
        1.  这里调用call是想用数组替换this的原本指向，谁调用this就指向谁，这里替换了更方便。
        2.  如果直接用.toString转换的话不行。因为调用的不是对象原型上的toString，数组调用的是数组上的toString方法，方法不同，就像Number也有自己的toString方法一样