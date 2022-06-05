1. DOM文档对象模型
   1. DOM定义了表示和修改文档所需的方法.DOM对象即为宿主对象，由浏览器厂商定义，用来操作html和xml功能的一类对象的集合。也有人称DOM是对html和xml的标准编程接口。
   2. DOM只能操作html，css谁都操作不了。但是DOM可以在html元素上添加属性，例如<div style="width:100px;"></div>改变不了的是css样式表。
   3. 语句
      1. document.getElementsByTagName("div")[0] 把所有的元素选出来封装在类数组中，按索引位排序。选出来的就是DOM对象，可以增删改查
2. 对节点的增删改查
    1. 查看
        1. 查看元素节点
           1. document代表整个文档，document包含HTML标签，代表整个文档，
           2. document.getElementsById('')； IE8以下不区分大小写，并且没有ID会寻求相同的name名称的元素来替代。但是ID这个选择器在后端时会修改你写过的ID名称，当你通过ID选择器选择时，并不能选到想要的元素。
           3. *document.getElemensByTagName('div')[0],这里并不是数组，而是类数组。在DOM,BOM中基本都是生成的类数组形式。这个方法兼容性最好
           4. document.getElemensByName('')[0]，只有部分标签name可以生效。表单、表单元素、img、iframe
           5. *document.getElemensByClassName('demo')[0]，IE8以下版本没有这个方法。
           6. document.querySelector('div>span')，css选择器,用css选择器的方法选择元素 IE7以下版本没有。致命问题是选出的元素不是实时的，选择出来东西是静态的，所以很受限。
           7. document.querySelectorAll()，css选择器 IE7以下版本没有，不是实时的。
        2. 遍历节点树
           1. parentNode
           2. childNodes
           3. firstChild
           4. lastChild
           5. nextSibling
           6. previousSibling
           7. 节点
              1. 元素节点-1、属性节点-2、文本节点-3、注释节点-8、document-9、DocumentFragment-11（文档碎片）
        3. 基于元素节点树的遍历，除了children，其余都是ie9以下不兼容
           1. parentElement IE不兼容
           2. children
           3. node.childElementCount 元素子节点个数，建议用.length
           4. firstElementChild
           5. lastElementChild
           6. nextElementSibling
           7. previousElementSibling
        4. 节点的四个属性
           1. nodeName 元素的标签名，大写形式表示，只读
           2. nodeValue text节点和comment注释节点有文本内容，可读写
           3. nodeType 节点类型，只读
           4. attributes 该节点的属性节点的集合
           5. Node.hasChildNodes（）；
        5. DOM结构树
           1. 继承关系 ![图片](DOM结构树.png)
           2. document 代表整个文档
           3. Document 可以理解为构造函数，但是不可以new它产生对象，系统自用的。这个构造函数有原型，且在document上就能访问到。
           4. Document不是document直接的构造函数，doucument的构造函数是HTMLDocument，HTMLDocument原型的_proto_是Document.prototype。这是一个原型链。
           5. Node最终也继承自object。
        6. DOM基本操作
           1. getElementById方法定义在Document.prototype上，即Element节点上不能使用
           2. getElementsByName方法定义在HTMLDocument.prototype上，即非html中的document不能使用（xml document，Element）
           3. getElementByTagName方法定义在Document.prototype和Element.prototype上
           4. HTMLDocument.prototype定义了一些常用属性，body，head，分别代指HTML文档中的<body><head>标签
           5. Document.prototype上定义了documentElement属性，指代文档的根元素，在HTML文档中，它总是指代<html>元素。即document.documentElement就是<html>元素
           6. getElementsByClassName、querySelectorAll、querySelector在Document.prototype，Element.prototype中均有定义。
     1. 增
        1. document.createElement('div')
        2. document.createTextNode('文本内容')
        3. document.createComment('注释')
        4. document.createDocumentFragment() 文档碎片
     2. 插
        1. PARENTNODE.appendChild()  任何元素节点都有这个方法，元素中插入子节点。是一种剪切操作，即如果把已有的元素插入别的元素中，会直接剪切到新的位置上
        2. PARENTNODE.insertBefore(a,b) 例如div.insertBefore(a,b)可以解释为div insert a before b  。这里div是父元素，a和b是子元素
     3. 删
        1. parent.removeChild() 父节点删除子节点，其实是把子节点剪切下来了，把这个节点当作返回值
        2. child.remove 节点自己删除自己，没有返回值
     4. 替换
        1. parent.replaceChild(new,origin) 用新元素替换旧元素
3. 属性
   1. Element节点的一些属性
      1. innerHTML 改变节点HTML的内容，直接会覆盖原来的值。div.innerHTML += "<span>123</span>"这时才会在原来的基础上增加
      2. innerText（火狐不兼容）如果给节点内innerText赋值，那就把节点内所有内容覆盖为新的文本，不会只覆盖之前的文本内容，所以用的时候需要慎重。
      3. 火狐的方法：textContent（老版本IE不好使） 一般用innerText  
   2. Element节点的一些方法
      1. ele.setAttribute('属性名','属性值')
      2. ele.getAttribute('属性名')
   3. 后面另外增加的一个属性className表示class属性   id也可以，即div.className或者div.id
4. 日期对象
   1. 日期对象，封装函数，打印当前的年月日，时分秒。是系统提供好的。下面为Date对象中的方法：
      1. var date=new Date（）；这个date记录了它出生时的时间，不会改变
      2. getDate() 一个月的某一天，0~30
      3. getDay() 一周中的某一天，0~6 0表示周日
      4. getMonth() 月份，0~11
      5. getFullYear() 以四位数字返回年份，如2021
      6. getHours() 返回Date对象中的小时 0~23
      7. getMinutes() 0~59
      8. getSeconds() 0~999
      9. getMilliseconds() 毫秒
      10. *getTime() 返回1970.1.1（纪元时间，类似公元纪年）至今的毫秒数，时间戳
      11. getTimezoneOffset() 返回本地时间与格林威治时间GMT的分钟差
      12. 除了get方法，还有set方法，把上面各个方法get改编为set 
      13. *setTime（）
      14. toString() 把Date对象转换为字符串
      15. toTimeString() 仅转换时间部分
      16. toDateString() 进转换日期部分
5. JS定时器
   1. setInterval(function(){},1000); 定时循环。每隔1000毫秒执行一次这个函数，这个定时器非常不准，因为js单线程，每隔1000毫秒把这个任务放入队列中，导致时间增大。还有其他方面也是导致不准的原因。  有一个返回值，作为其唯一表示，从1开始往下继续，根据返回值就可以清除了，所以需要有一个变量接受这个返回值方便后续的清除。
   2. clearInterval(这里填作为唯一标识的返回值)；停止。如果前面没有用变量接受setInterval的返回值，这里直接填数字也可以
   3. setTimeout(function(){},1000)；定时器。隔了一段时间之后在执行，而不是循环执行。所以就不需要后续取消。也有返回值。与上面的setInterval返回值不会重叠，如果上面有1了，这里的返回值就是2
   4. clearTimeout(返回值)；如果定时器不需要执行时可以设定取消
   5. 上面的四个函数是全局对象window上的方法，内部函数this指向window。
   6. 注意：setInterval("func()",100)；就是把函数写成一些字符串，直接把字符串解释为代码开始执行
6. DOM、BOM基本操作
   1. 查看滚动条的滚动距离
      1. window.pageXOffset/pageYOffset。 IE8及IE8以下的不兼容。
      2. document.body/documentElement.scrollLeft/scrollTop. 兼容性比较混乱.用时取两个值相加，因为不可能存在两个同时有值. IE8及IE8以下时使用这种方法
   2. 查看视口的尺寸
      1. 视口：即编写html页面文档的部分
      2. window.innerWidth/innerHeight。 IE8及IE8以下的不兼容。
      3. document.documentElement.clientWidth/clientHeight. 标准模式下，任意浏览器兼容
      4. document.body.clientWidth/clientHeight。 用于怪异模式（非标准模式）下的浏览器。
      5. <!DOCTYPE html>加上就是标准模式，删掉就是怪异模式。两种渲染模式
      6. 标准模式：向前兼容
      7. 怪异（混杂）模式：向后兼容，即利用高版本的浏览器访问低版本浏览器时写的代码，依然使用低版本的语法结构。
      8. document.compatMode:返回值为css1compat为标准模式，返回值为backcompat为怪异模式，向后兼容
   3. 查看元素的几何尺寸
      1. domEle（任何的dom元素都可以调用）.getBoundingClinentRect()
      2. 兼容性好。该方法返回一个对象，对象里面有left、top、right、bottom等属性。left和top分别代表元素左上角的X和Y坐标，right和bottom分别代表元素右下角的X和Y坐标。其实就是左上的点和右下的点这两个点的坐标。
      3. height和width属性老版本IE并未实现。直接用那四个属性相减就可以了。
      4. 返回的结果不是实时的。  
      5. 用的少，被下面的方法取代了。
   4. 查看元素尺寸
      1. dom.offsetWidth  
      2. dom.offsetHeight
      3. 这里的宽高和上面的返回值都是元素整个的宽高，包括padding，border，不包括margin，指视觉上的尺寸。
   5. 查看元素位置
      1. dom.offsetLeft
      2. dom.offsetTop
      3. 不管自身是否是定位元素，求的只是这个元素距离 有定位元素的父级元素 的距离，不管这个元素是如何生成的，比如设置margin或者设置定位left、top，只是看元素的真实的位置决定
      4. 对于无定位父级的元素，返回相对文档的坐标，对于有定位的父级元素，返回相对于最近的有定位的父级的坐标。
      5. dom.offsetParent 返回最近的有定位的父级，如果没有，返回body，body.offsetParent没有父级，返回null。
   6. 让滚动条滚动
      1. window上有三个方法，scroll(x，y),scrollTo(),scrollBy()
      2. 三个方法功能类似，用法都是将x，y坐标传入，即实现让滚动轮滚动到当前位置。
      3. 区别：scrollBy()会在之前的数据基础上做累加。
      4. eg：利用scrollBy()快速阅读功能。
   7. 脚本化css
      1. 读写元素css属性
         1. dom.style.prop 只有这个方法可以写入
            1. div.style显示出了div所有的css属性，保存在一个类数组中，是一个对象可读写行间样式，没有兼容性问题，碰到float这样的保留字属性，前面应该加css。例：div.style.float-->div.style.cssFloat
            2. 复合属性必须拆解，例border代表border-width，border-height等等，需要拆解，但其实不拆解也行。组合单词变成小驼峰式写法，js访问属性没有-的形式，所以background-color写为小驼峰形式，backgroundColor
            3. css中写入的属性在这里访问不到，虽然有显示。只有在HTML中style中的属性（被写到行间了）可以访问到。所以在这里写的属性也是会被写到行间（HTML元素属性中了）,没在行间写，但是在其他地方写了，这里就认为没有，对象中显示为空值。 
            4. 写入的值必须是字符串格式 div.className
            5. 没有值的对象里显示为空
         2. 查询计算样式
            1. window.getComputedStyle(ele例如div,null).width
            2. null这里是针对于获取伪元素的样式表：：after。windowgetComputedStyle(div,"after")
            3. 获取的是当前元素所展示出的一切css属性的显示值。
            4. 计算样式只读，返回的计算样式的值都是绝对值（计算后最终的权重值，即权重值的单位是px绝对值，不可能是em这种相对值），没有相对单位。
            5. IE及IE8以下不兼容
         3. 查询样式
            1. ele.currentStyle
            2. IE独有的属性。计算样式只读，返回的计算样式的值不是经过转换的绝对值，例如以前是10em现在还是10，但是也是最终展示出来的值，权重值最高的值
         4. 封装兼容性方法getStyle（elem，prop）
            1. ```
                  function getStyle(elem,prop){
                     if(window.getComputedStyle){
                        return  window.getComputedStyle(elem,null)[prop];
                     }
                     else{
                        return elem.currentStyle[prop];
                     }
                  }
               ```
   