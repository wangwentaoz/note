#  事件
1. 绑定事件处理函数
   1. ele.onxxx=function(event){}
      1. 兼容性好，但是一个元素同一个事件上只能绑定一个处理程序。
      2. 基本等同于写在HTML行间上，也称为句柄绑定方式。
      3. event是形参，虽然不需要我们传，但是系统会自动传入一个事件对象{}，上面有很多属性，每个属性都记载了事件发生时的一些关键性数据，把这些打包成一个对象，传入参数event中。这个对象上有一个方法可以阻止事件，event.stopPropagation()。IE浏览器下event会失效，IE在window.event上记录
   2. obj.addEventListener(type,fn,false)
      1. IE9以下不兼容，可以为一个事件绑定多个处理程序，按顺序执行。但是如果绑定的处理函数在同一个地址，那么就认为是一个事件处理函数。如果不同的地址，则多个处理程序。
   3. obj.attachEvent("on"+type,fn)
      1. IE独有，一个事件可以绑定多个处理程序。这个函数如果把同一地址的函数绑定多次，它也可以执行多次。
      2. 特殊，this指向window，如果想要this指向本身，则需要
            ```
            div.attachEvent('onclick',function(){
               handle.call(div);
            })
            function handle(){
               this.
            }
            ```
      3. 封装兼容性方法addEvent(elem,type,handle)
            ```
            function addEvent(elem,type,handle){
               if(elem.addEventListener){
                  elem.addEventListener(type,handle,false);
               }
               else if(elem.attachEvent){
                  elem.attachEvent('on'+type,function(){
                     handle.call(elem);
                  })
               }
               else{
                  elem['on'+type]=handle;
               }
            }
            ```
2. 解除事件处理函数
   1. ele.onclick=false；ele.onclick=null；
   2. ele.removeEventListener(type,fn,false)
   3. ele.detachEvent('on'+type,fn)
   4. 若绑定匿名函数，则无法解除，例如这样绑定div.addEventListener(type,function(){content},false)肯定无法解除
3. 事件处理模型——事件冒泡、捕获
   1. 事件冒泡
      1. 结构上（非视觉上）嵌套关系的元素，会存在事件冒泡功能，即同一事件，自子元素冒泡向父元素，自底向上
   2. 事件捕获
      1. 结构上（非视觉上）嵌套关系的元素，会存在事件捕获功能，即同一事件，自父元素捕获至子元素（事件源元素），自顶向下。
      2. IE没有捕获事件
      3. obj.addEventListener(type,fn,true)；false改变为true立即就触发捕获功能
   3. 触发顺序：先捕获，后冒泡。元素本身的叫做事件执行，谁先写谁先执行。元素的父元素才会冒泡和捕获。
   4. focus,blur,change,submit,reset,select等事件不冒泡
4. 取消冒泡和捕获
   1. 取消冒泡
      1. W3C标准event.stopPropagation();IE9以下不支持
         1. ele.onxxx=function(event){}  这个方法是绑定在形参传入的对象中的。
      2. IE独有event.cancelBubble=true;
      3. 封装取消冒泡的函数stopBubble(event)
            ```
            function stopBubble(){
               if(event.stopPropagation){
                  event.stopPropagation();
               }else{
                  event.cancelBubble=true;
               }
            }
            ```
   2. 阻止默认事件(浏览器自带事件)
      1. 默认事件——表单提交，a标签跳转，右键菜单等。
      2. return false;以对象属性的方式注册的事件才生效，即div.onclick这种，addeventListener这种就不行。
         1. document.oncontextmenu=function(){
         2. return false；};阻止右键出菜单默认事件
      3. event.preventDefault();W3C标准，IE9以下不兼容
      4. event.returnValue=false;兼容IE
      5. 封装阻止默认事件的函数cancelHandler(event)
            ```
            function cancelHandler(event){
               if(event.preventDefault){
                  event.preventDefault();
               }else{
                  event.returnValue=false;
               }
            }
            ```
3. 事件对象 
   1. event||window.event用于IE,因为IE的对象是保存在window上的，不能在事件中访问到。
      1. event中的srcElement属性和target是事件源对象
         ```
         div.onclick=function(e){
            var event=e || window.event;
         }
         ```
   2. 事件源对象
      1. 事件源对象即这个事件是被谁触发的，冒泡的不算，找到冒泡或者捕获的源触发事件。例如有一个事件是冒泡上来的，事件源对象就记录了谁导致的这个冒泡
      2. event.target 火狐只有这个
      3. event.srcElement IE只有这个
      4. 这俩chrome都有
   3. 事件委托
      1. 利用事件冒泡和事件源对象进行处理
      2. 优点
         1. 性能：不需要循环所有元素一个个绑定事件
         2. 灵活：当有新的子元素时不需要重新绑定事件
   4. 事件分类
      1. 鼠标事件
         1. click、mousedown、mousemove、mouseup、contextmenu、mouseover、mouseout、mouseenter、mouseleave
         2. click=mousedown+mouseup
         3. contextmenu:右键产生菜单事件，唯一有用处的地方就是取消右键菜单的默认事件
         4. mouseover、mouseout鼠标进入或者离开时发生的事件
         5. mouseenter、mouseleave和上面一样，是HTML5新规范
               ```
               拖拽一个元素
               function drag(elem){
                  var disX,
                      disY;
                  div.onmousedown=function (e){
                     var event=e || window.event;
                     disX=e.pageX-parseInt(div.style.left);
                     disY=e.pageY-parseInt(div.style.top);;
                     document.onmousemove=function(e){
                        event=e || window.event;
                        elem.style.left=event.pageX-disX+"px";
                        elem.style.top=event.pageY-disY+"px";
                     }
                     document.onmouseup=function(){
                        event=e || window.event;
                        document.onmousemove=null;
                     }
                     stopBubble(event);
                     cancelHandler(event);
                  }
               }
               ```
               elem.setCapture();这个元素会捕获页面上发生的所有的事件。捕获到自己身上。即前面代码用document.onmousemove解决的在鼠标离开元素时依然可以捕获的问题，用这个函数同样可以解决
               div.releaseCapture();前面是开启，这个函数是释放。因为在这过程中其他的事件会无效。只有IE能用，不通用，平常不用。
         6. 用button来区分鼠标的按键，0、1、2
            1. 在mouseup和mousedown两个事件中的event对象里面有button属性，0表鼠标左键，2表右键，1表滚轮
         7. DOM3标准规定：click事件只能监听左键，只能通过mousedown、mouseup来判断鼠标键
         8. 如何解决mousedown和click冲突
            1. 通过两个时间戳，firstTime=new Date（）.getTime（）；相减，如果大于300，就认为是拖拽，小于300，认为是点击。解决拖拽的问题
      2. 移动端
         1. onmousedown等事件转变为touchstart，touchmove，touchend三个事件
      3. 键盘事件
         1. keydown > keypress > keyup
         2. keydown和keypress区别
            1. keydown可以响应任意键盘按键，keypress只可以响应字符类键盘按键（asc码里面有的）。keydown监测不了大小写，监测不了shift+字母键，keypress检测很准，可以直接转换为asc码表
            2. keypress返回ASC11码，在charcode属性上，可以转换成相应的字符
            3. 按住键盘会重复事件keydown和keypress
      4. 文本操作事件   
         1. input:输入的区域但凡有变化，都会把输入区域所有内容输出
         2. focus：聚焦时触发事件
         3. blur：失去焦点触发事件
         4. change：对比鼠标聚焦和失去焦点两个状态是否发生改变
      5. 窗体操作类（window上的事件）
         1. scroll：滚动条滚动时触发事件
         2. load：window.onload事件发生在页面加载成功时，即页面的所有资源什么的全都下载之后才执行，触发load事件，这个方法是最慢的
         3. 浏览器执行顺序：HTML和css是并行一起解析的，HTML在解析时会形成domTree,CSS会形成cssTree，两个树会拼在一起形成渲染树renderTree。
4. json
   1. 前后端以前是用xml格式传输数据，可以自定义标签，也就是把自定义标签当成属性名。现在是直接以对象的格式传输内容，称为json。为了于对象有所区别，强制对象的属性名加双引号""，不同于以前的随意加不加。即{"name" ： "deng"}。
   2. JSON就是一种传输数据的模式，以对象为样板，本质上就是对象，但用途有区别，对象就是本地用的，json是用来传输的。在前端需要把数据（json）转换为字符串形式的二进制，然后传给后端。把后端传过来的二进制的数据（字符串的json）转换为正常的json
   3. JSON.parse();          string——>json
   4. JSON.stringify();      json——>string
   5. 页面渲染
      1. domTree + cssTree =randerTree 。只有渲染树完成后，才开始渲染页面
      2. 如果domTree添加一个新的标签，randerTree重新构建，称为reflow（重构），又从第一行开始重新渲染，浪费效率。所以dom优化前提就是避免做一些无效的事情，尽量减少dom节点的改变。dom节点的增删、宽高变化、位置变化、offsetWidth、offsetLeft（查看也会导致reflow，只有重构后才能保证这次的查询是实时的）、repaint（重绘）等等都会触发reflow。可以基于html和基于css重新构建，比如基于css的颜色改变这种只是会在颜色那一块重绘，效率浪费较少
      3. 
5. 异步加载js
   1. 通常js加载会阻断HTML和css加载，因为如果同时加载的话他们都能改变页面，没法运行了，所以需要同步加载。但是有些js文件中封装的文件可以进行异步加载，没必要同步，如果js阻塞了后续就不能正常加载页面了，例如封装函数方法的js文件等等。
   2. js加载的缺点：加载工具方法没必要阻塞文档，过量js加载会影响页面效率，一旦网速不好，那么整个网站将等待js加载而不进行后续渲染工作。
   3. 有些工具方法需要按需加载，用到再加载，不用不加载。
   4. js异步加载的三种方法
      1. defer异步加载但要等到dom文档全部解析完才会被执行。只有IE能用，也可以将代码写到内部。<script type="text/javascript" defer="defer">var a = 123;</script>
      2. async异步加载，加载完就能执行，W3C标准方法。async只能加载外部脚本，不能把js写到script标签里。<script type="text/javascript" src="" async="async"></script>
      3. 前面两种方法执行时也不阻塞页面，但存在兼容性问题，引出第三种方法：
         1. 创建script，插入到DOM中，加载完毕后callBack，
            ```
            <script type="text/javascript">
            var script = documenet.createElement('script');
            script.type = "text/javascript";
            script.src = "tools.js"; 执行到这一步时会开始下载js文件，但不执行。这个下载是需要时间的，文件中的函数不能在下面立即执行。因为在这过程中下面的代码会立即执行，非常快，等不到文件下载完成就执行了。
            script.onload = function (){test();} 确保js代码下载完成后的执行方法
            document.head.appendChild(script); 执行到这一步时会开始解析js代码，否则就是下载完啥也不干。
            </script>
            ```
            兼容性非常好，但IE不兼容，因为script标签上没有onload事件。

            IE方法
            ```
            <script type="text/javascript">
            var script = documenet.createElement('script');
            script.type = "text/javascript";
            script.src = "tools.js";
            script.onreadystatechange = function(){
               if (script.readyState == "complete" || script.readyState ==  "loaded") {
                  test();
               }
            };当状态码发生改变时会触发这个事件，所以
            document.head.appendChild(script); 
            </script>
            ```
            script.readyState = "complete"; 这个属性一开始值为loading，他会根据script标签加载进度而动态改变，加载完后值会改变为complete或loaded
         2. 兼容
            ```
            function loadScript(url,callback){
               <script type="text/javascript">
               var script = documenet.createElement('script');
               script.type = "text/javascript";
               
               if (script.readyState){
                  script.onreadystatechange = function(){
                  if (script.readyState == "complete" || script.readyState ==    "loaded") {
                     callback();
                  }
               };
               }else{
                  script.onload = function (){callback();}
               }
               script.src = url ;先加载事件，这样就可以防止文件传输过快，src文件立即传输完成，触发不了IE的onreadystatechange事件状态改变，但是先加载事件就一定会触发。
               document.head.appendChild(script); 
               </script>
            }
            loadScript('demo.js',test());这时会报错，因为执行代码时，前面函数声明不会读取函数内部的内容，只有到下面函数引用时才会开始读取上面定义的函数，而这时传入的参数test（）是在url，里面的，外面根本读不到，所以报错
            loadScript('demo.js',function (){test();});通过这种传匿名函数的方法，当传入参数时只会传入函数引用，并不会读到参数内部的函数test（），所以执行时才会读到内部的代码。
            还有一种执行的方法，即loadScript('demo.js',"test"),然后把函数里面的callback改为eval（callback）；
            另一种执行方法就是改写函数库里的函数，把函数改为对象的形式，例如var tools={
               test:function(){},
               demo:function(){}
            }
            然后函数里面callback改为tools[callback](),调用函数传入属性名就可以了，loadScript('demo.js',"test");
            ```
