1. js加载时间线
   1. 创建Document对象，开始解析web页面。解析HTML元素和他们的文本内容后添加Element对象和Text节点到文档中。这个阶段document.readyState = 'loading'。
   2. 遇到link外部css，创建线程加载，并继续解析文档。
   3. 遇到script外部js，并且没有设置async、defer，浏览器加载，并阻塞，等待js加载完成并执行该脚本，然后继续解析文档
   4. 遇到script外部js，并且设置有async、defer，浏览器创建线程加载，并继续解析文档。对于async属性的脚本，脚本加载完成后立即执行。（异步禁止使用document.write()）
   5. 遇到img等，先正常解析dom结构，然后浏览器异步加载src，并继续解析文档。
   6. 当文档解析完成，document.readyState = 'interactive'。
   7. 文档解析完成后，所有设置有defer的脚本都会按照顺序执行。（注意与async的不同，但同样禁止使用document.write()）
   8. document对象触发DOMContentLoaded事件，这也标志着程序执行从同步脚本执行阶段，转化为事件驱动阶段。
      1. DOMContentLoaded事件只在addEventListener（'DOMContentLoaded'，function(){},false）上绑定有效果。
      2. 在这里执行js是最好的，因为正常js在HTML最下面执行，但是因为js本身也是Dom树的一部分，所以就不是等到DOM树全部构建完再去处理。而window.onload太慢了，所以这里等到dom解析完成最好
      3. 所以这个事件可以帮助我们把代码写到上面，即开头部分，可以先解析，但是等到dom树解析完成后执行。
   9.  当所有async的脚本加载完成并执行后、img等加载完成后，document.readyState = 'complete',window对象触发load事件
   10. 从此，以异步响应方式处理用户输入、网络事件等。 
2. document.write()
    1.  当整个文档全都解析完成时，调用这个方法，它会把之前所有的文档流清空，用函数中的内容进行代替。即window.onload=function(){document.write("a")}
    2.  在异步加载js文件时，如果异步的文档里有async、defer，也会实现上面同样的功能，把整个文档全都清空了。
    3.  但是如果文档没有解析完成时，即渲染树虽然差不多完成，还没开始绘制文档，但是渲染还没有完成时，就不会发生这种情况，只会把document.write当成正常文档流输出到页面中
3. BOM
   1. 定义：Browser Object Model，定义了操作浏览器的接口
   2. BOM对象：window，History，Navigator，Screen，Location等
   3. 由于浏览器厂商的不同，bom对象的兼容性极低，一般情况下我们只能用其中的部分功能。
4. 正则表达式
   1. 补充知识
      1. 转义字符"\",强制把其后面的东西变成文本
      2. 多行字符串\+回车键，实现真正的换行。例document.body.innerHTML= "代码需要换行时就需要用到多行字符串 "，这里如果直接回车就会报语法错误
      3. 字符串换行符\n
      4. 缩进，tab键，\t
      5. 回车\r
   2. 作用：匹配特殊字符或有特殊搭配原则的字符的最佳选择。
   3. 两种创建方式
      1. 直接量 推荐 例：var reg = /abc/属性;
         1. var reg = /abc/i;  ignoreCase 忽略大小写
         2. var reg = /abc/g;  global执行全局匹配，正常是匹配一个就结束了，这个是有几个匹配几个
         3. var reg = /abc/m;  multiline执行多行匹配。字符串可以通过\n进行换行，当换成多行时就可以执行多行匹配。如果没有多行匹配时，即使是多行，也匹配不了开头这种。例/^a/表示匹配a开头的字符串，对于"asc\na",如果不加多行匹配只能匹配到第一个a，只有加了多行匹配才能匹配到第二个换行a
         4. reg.source  表达式的内容
         5. reg.lastIndex 
      2. new RegExp("abc","i")
         1. new RegExp(reg);  这里的reg是正则表达式，只不过创建形式不一样。但是如果这里没有new，直接reg1=RegExp(reg);表示reg1和reg是指向相同地址的同一个变量，只是有两个引用而已。
      3. 两个方法
         1. 正则表达式上的reg.test方法，只能判断有没有复合要求的片段，返回true或者false
         2. 字符串上的str.match方法，可以匹配所有东西并且返回
   4. 表达式
      1. 一个表达式就是一位，里面填的就是区间。[1234567890]表示这一位匹配所有的数字，只要是数字就匹配。/[1234567890][0-9]/g 表示匹配两位连续的数字。[0-9A-z]表示匹配数字+字母。
      2. ^放在表达式里面表达 非，即！，例如[^a]表示除了a字母。但是放在字符串前面表示以这个开头的意思。
      3. /(abc|bcd)/g; 表示匹配abc或者匹配bcd
   5. 元字符
      1. 拥有特殊含义的字符
      2. \w 也代表一位，完全等于单词字符，等于表达式[0-9A-z_]。\W===[^\w],除了\w以外的。
      3. \d === [0-9] \D===[^\d]
      4. \s 查找空白字符，包括空格符，制表符\t，回车符\r，换行符\n，垂直换行符\v，换页符\f。 \S===[^\s]
      5. \b===单词边界 \B===非单词边界 "abc aas fds"这里有六个单词边界。[\babc\b]表示匹配字符abc，并且其中a和c都是单词边界，结果匹配到一个。
      6. /\tc/g 匹配不了"a  c",只有"a\tc"才能匹配。
      7. \u0000 uni-code编码，这里每一个0的位都是十六进制，四位的是简单的uni-code编码，但是也能包括所有的汉字（2-3w个）。
      8. 升级的uni-code编码。uni-code编码是分层的，最简单的就是第0层，也就是四位，\u010000-\u01ffff 这是第1层 \u020000-\u02ffff 这是第2层，等等一直到第16层 \u100000-\u10ffff
      9. uni-code编码可以查找汉字，通过把uni-code编码放到正则表达式中。
      10. . ===[^\r\n]可以查找单个字符，除了换行和行结束符。
   6. 量词 （n × 这个量词）
      1. n+  n代表一个变量，+代表这个变量可以出现{1，+infinity}次
      2. n*  *代表{0，+infinity} 但是存在空位时会匹配一个空字符串""
      3. n?  {0,1}
      4. n{X}  {x}个，例如/\w{2}/g;两个两个匹配
      5. n{x，y}  {x-y}个
      6. n{X,}   y不写就代表+infinity
      7. n$    /^abc/g; 以a开头的匹配abc，/abc$/g; 以c结尾的匹配abc
      10. 检验字符串首尾是否有一个含有数字/^\d|\d$/g
      11. 检验字符串首尾全都有一个含有数字/^\d[\s\S]*\d$/g
   7. RegExp对象方法
      1. test     reg.test（str）检验字符串是否符合要求
      2. exec     reg.exec（str）也是匹配方法，里面有reg.lastIndex属性，表示游标的位置。这种方法匹配时会从游标开始的位置（0位）开始往后匹配，直到末尾，每匹配一次后lastIndex属性就显示游标目前的位置。匹配一轮后又会回到0位开始重新匹配。游标也可以通过lastIndex手动设置。 如果后面不加g属性，那么lastIndex属性会一直为0，也就是一直从0位开始匹配。
      3. compile
      4. /(a)\1/g  这里的\1表示引用前面括号表达式里面的内容，1表示第一个子表达式。也就是说\1和前面括号的内容是相同的。/(\w)\1\1\1/g;表示匹配四个同样的内容。如果用reg.exec（str）的话，除了会在类数组的第0位显示出匹配的字符串，还会在接下来的位上显示出表达式所匹配的字符串。例str="aaaa"  执行后的结果不仅会匹配aaaa，还会额外匹配表达式的a
   8. 支持正则表达式的String对象方法
      1. match：str.match(reg)。reg如果不加g返回结果类似于exec，如果加g了结果完全变样，就是test的返回结果。
      2. search：str.search(reg)。返回的是匹配到东西的位置，而不是匹配的结果。加不加g没区别，只匹配第一个符合要求的位置。匹配不到返回-1.
      3. split：str.split(reg)。拆分字符串
      4. replace：str.replace("a","b"),把第一个a替换成b，只替换一个，非正则表达式的缺陷。但是把其换成正则表达式就不同了，就可以匹配全局。reg=/a/g str.replace(reg,"b")
         1. 例：把aabb样式的字符串替换为bbaa. reg=/(\w)\1(\w)\2/g str.replace(reg，"$2$2$1$1")  也就是说$加数字可以匹配到正则表达式里面表达式中的内容。
         2. str.replace(reg,function($,$1,$2){return $2+$2+$1+$1;})  后面函数中的参数由系统自动传入参数，函数中的第一个参数是正则表达式匹配的全局，即前面的str，然后后面的参数$1,$2就和上面说的表达式内容相同。这里面参数必须写，因为系统是自动传进去的，没有参数接受就不能用。
      5. str.toUpperCase()
      6. str.toLowerCase()
      7. str.replace("a","$$") 把a替换为$，必须两个，前面那一个相当于转义字符
   9. 正向预查 正向断言
      1. ?=n   后面紧挨着字符串n。 /a(?=b)/g;   a后面跟着一个b，作为限定
      2. ?!n   后面没有紧挨着字符串n
   10. 贪婪匹配 非贪婪匹配
       1.  正常情况下默认为贪婪匹配。即能匹配多个就匹配多个，/a+/g;能匹配多个a就匹配多个a。str=aaaaa 这里有五个a，就一定不会匹配4个a
       2.  非贪婪匹配，能少就少，上面的情况就匹配一个a。只需要在量词后多加一个？就可以了。例：/a+?/g; 结果为"a" "a" "a" "a" "a"