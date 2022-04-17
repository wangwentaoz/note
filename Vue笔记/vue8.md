
##  Vue CLI脚手架  ctrl + c 关闭终端 
1. 概念
   1. 原因：使用vue.js开发大型应用时，我们需要考虑代码目录结构、项目结构和部署、热加载、代码单元测试等事件。如果每个项目都手动完成，效率很低，所以会使用一些脚手架工具帮助我们完成
   2. CLI：Command-Line Interface ，翻译为命令行界面，俗称脚手架。vue CLI是官方发布的vue.js项目脚手架，使用vue-cli可以快速搭建Vue开发环境以及对应的webpack配置
   3. Vue-CLI使用前提：Node.js ,要求node环境在8.9以上。安装node的同时也会安装NPM，全称Node Package Manager。是一个nodejs包管理和分发工具，已经成为了非官方的发布Node模块（包）的标准。
   4. cnpm设置淘宝安装镜像，因为npm安装是在国外服务器上，很慢。npm install -g cnpm --registry=https://registry.npm.taobao.org 以后就可以使用cnpm install 命令安装模块了。 不过cnpm容易出问题，不太推荐
   5. vue cli使用前提：webpack。    vue.js官方脚手架工具就使用了webpack模板，对所有的资源进行压缩等优化操作。他在开发过程中提供了一套完整的功能，使我们开发更高效。webpack全局安装npm install webpack -g 
2. Vue CLI的使用
   1. 安装vue脚手架：npm install -g @vue/cli
      ```
      可能安装不成功，npm clean cache --force 清除缓存就好了，这个指令清除的是C盘的user，Administrator，AppData，Roaming，里面有npm-cache文件夹，直接删除，再次执行npm安装命令就可以了
      如果还解决不掉，直接cmd以管理员身份打开，再次执行clean
      ```
   2. 上面安装的是4版本，如果想要按照Vue cli2的方式初始化项目，必须拉取2.x模板，命令如下：：npm install @vue/cli-init -g 
   3. Vue CLI2初始化项目，命令如下：vue init webpack my-project  他会在my-project这个配置文件中生成webpack相关的配置文件
      1. project name (vuecli2test) :   给项目起名字，这里的vuecli2test是创建的文件夹名字，不是项目的名字,如果直接enter键他就会用vuecli2test的名字命名这个项目名称
      2. project description(A Vue.js project) :描述信息,小括号内的是默认的描述信息，这里重新指定描述信息test vue cli2
      3. Author (这里会读取git上的东西)：直接回车使用默认信息，也可以自己输入
      4. 这里会出现两个选项，一个是runtime + compiler ，另一个是runtime-only，如同webpack里面讲到的，但是以后项目用的runtime-only比较多，好处：文件小，运行效率高。暂时选runtime + compiler ，并且在接下来选择n，不安装vue router路由
      5. 是否使用ESLint ，lint：限制，表示对ES(js)代码进行一个限制,让以后代码写的更规范，只要写的不规范编译器就会报错，例function abc  (){} 这里因为abc和小括号之间有空，不规范编译不通过。这里选择n
         1. 如果选择的是y，下面会出现三个选项，一共有三种规范，第三种是可以自己配置规范的。
         2. 如果之后用了一段时间后不想用了,在config文件夹,index.js文件中有一个属性,useEslint:true,改为false就行了,重新编译npm run dev
      6. 是否设置unit tests（单元测试），国内很少使用单元测试，这里选择n 
      7. setup e2e(e to e 的简写，表示end to end) tests with Nightwatch 这里表示是否设置端到端测试，安装Nightwatch ，是一个利用selenium或webdriver或phantomjs等进行自动化测试的框架。这里选n
      8. 最后一步决定选择npm或者yarn，这里选npm
         ```
         vue-cli · Failed to download repo vuejs-templates/webpack: connect ETIMEDOUT 192.30.253.112:443 报错信息原因是github网站访问不到，ping github.com接受不到数据

         解决办法：打开http://ping.chinaz.com/https://github.com 网址，在里面搜索github.com进行ping检测，找一个外国的响应时间最短的ip，这次选择的是一个韩国KT的ip，15.164.81.167

         打开目录为C:\Windows\System32\drivers\etc\hosts 这个文件，在最后添加一行代码，15.164.81.167 github.com 。之后再进行ping github.com就可以接受到数据包了
         ```
         ```
         如何改变hosts文件
         首先右键属性，下面有个只读，关闭只读
         其次右键属性，点击安全，点击高级，点击添加，点击选择主体，点击高级，点击立即查找，在下面选中我们的账户metaphor，点击确定，在界面中选择完全控制，后面一直确定就行了
         ```
3. vuecli2文件
   1. build和config文件夹都是有关于webpack的配置
   2. 首先从package.json文件开始读，找到"script"中的build和dev命令
      1. build命令：node build/build.js ![图片](./npm%20run%20build.png)
         1. 以前js文件必须嵌套在.html文件中，然后打开网页通过浏览器执行，所以就想到能不能直接执行js文件。node是用c++开发的，核心是V8引擎，js代码执行时会生成中间的东西，字节码，再把字节码跑在浏览器上执行解析，V8引擎跳过了字节码，直接让js代码转换为二进制代码，而二进制代码才是真正浏览器所执行的东西，所以二进制代码肯定比字节码快，字节码还需要再次解析。
         2. 所以本来js代码是跑在浏览器上，但是在服务器用V8引擎开发一个东西，通过V8引擎帮助解析js代码，用它作为支撑，所以node就可以在电脑上在服务端当作执行js代码的底层支撑，可以直接使用node执行js文件，这里的build命令中的node就是直接执行后面目录中的js文件，在终端里执行
         3. 在这个js文件中做了很多事情，主要还是之前学到的webpack打包相关的东西，合并了一些配置，又添加了很多配置，插件什么的。
      2. dev命令：webpack-dev-server --inline --progress --config build/webpack.dev.conf.js  ![图片](./npm%20run%20dev.png)
         1. 首先搭建了本地服务器，然后--config指定自己的类似于以前的webpack.config.js配置文件。在config文件夹中主要是定义了一些变量，和之前写的配置文件有些不同，在--config指定的js文件会执行这些变量
   3. node_modules文件夹存放的和之前没什么不同，主要是一些我们配置文件中依赖的各种包loader、plugin等
   4. src文件夹就是我们开发写的代码
   5. static文件夹里面会放一些静态的资源，这里面的文件会原封不动的复制到之后的dist文件中。这里面放了一个.gitkeep文件，git的话如果某些文件夹为空它不会把这个git上传到服务器但是加上一个这个gitkeep文件表示无论文件夹是否为空都会上传到服务器。例如上面的图片大小如果小于limit会被编译成base64，大于limit会原封不动的封装。
   6. .babelrc文件，babel就是把es6转为es5，之前配置的文件是options：{presets：['es2015'} 这里的presets还可以利用利用env配置，即如果在package.json文件中安装的配置文件"babel-preset-env":"^1.3.2" 一般要求单独生成一个.babelrc文件，里面写着相关的配置，例"preset":[ ["env",{}],"stage-2" ]
   7. .editorconfig文件，对代码进行一些统一，比如缩进使用几个空格等
   8. .eslintignore文件，之后写的代码有些地方不规范，想对其做一个忽略
   9. .gitignore文件，有些东西并不想上传服务器，忽略
   10. .eslintrc.js文件，之后的代码检测配置的东西
   11. .gitignore文件，配置文件
   12. .postcssrc.js文件，css转化时配置的东西，配置一些插件等。一般不需要改
   13. index.html文件，html模板，和之前的相同，打包时会根据这个模板创建html，放入dist文夹中
   14. package.json文件，node包相关东西
   15. package-lock.json文件，在package.json中指定的包是用^4.1.15符号的，表示安装这个本或者4.15.x版本。如果这里是~4.1.15，表示安装的是4.x.x 后面两位版本号都是可变的。即node_modeles中安装的版本可能会与之要求的不同，这个映射关系就保存在这个文件中，记录真的版本。
   16. README.md文件，里面就是一些说明
4. runtime + compiler 和 runtime-only ![图片](./vue程序运行过程.png)
   1. compiler 
      ```
      new Vue ({
         el:'#app',
         components: { App },
         template: '<App/>'
      })
      ```
      1. new vue时,先注册component:{App},再使用template:'<App/>'
      2. vue的运行过程:首先把template模板传给vue的时候,vue会把它保存到vm.options中,保存后会对这个template进行parse(解析),解析为ast(abstract syntax tree 抽象语法树),然后会compiler(编译)为render函数,之后通过render函数把对应的template翻译为virtual dom,最后把虚拟dom渲染为真实的dom。
   2. only
      ```
      new Vue ({
         el:'#app',
         render: function (h){
            return h(App)
         }
      })
      ```
      1. render: createElement => createElement(App)  这个render函数传过来的h变量实际是createElement函数，用来创建元素。
         1. createElement('标签',{标签属性},['']) 传入的标签参数可以通过createElement函数在DOM中创建出来一个标签,比如createElement('h2',{class: 'box'},['Hello World'])创建一个h2标签,<h2 class="box">Hello World</h2>。利用创建出来的标签替换掉el挂载的标签。
         2. 套娃用法:createElement('h2',{class: 'box'},['Hello World',createElement('button',['按钮'])])  创建出来的标签是<h2 class="box">Hello World<button>按钮</button></h2>
         3. 传入一个组件对象:render: createElement => createElement(App) App是一个import导入的组件,我们就不需要template了,直接用render函数来在dom中创建标签
         4. App组件是我们从App.vue文件中导入的,在App.vue中是有template的,在App.vue文件中最终被编译出来的就是一个普通的对象,它已经将template渲染成render函数了也就是createElement拿到的App对象是没有template属性的,反而多了一个render函数属性,即template被渲染后的render函数。
         5. 问题是App.vue文件中的template是被谁处理成了render函数？是由vue-template-compiler 帮我们处理的，即我们在webpack中配置vue时，为了解析.vue文件,安装的两个组件 npm install --save-dev vue-loader vue-template-compiler 这其中vue-loader是用来加载.vue文件的。而这个是开发时依赖，意味着运行的所有项目所有组件它里面都不包含任何template，都被渲染成对象中的render函数，运行时只依赖vue。
      2. 这种方法是从render直接到达虚拟dom，相比于上面的省去了很多步骤，性能更高，代码量更少
5. Vue CLI3初始化项目，命令如下：vue create my-project
   1. 认识Vue CLI3
      1. vue-cli3 是基于webpack4打造的，vue-cli2是基于webpack3
      2. vue-cli3 的设计原则是"0配置",移除的配置文件根目录下的,build和config等目录
      3. vue-cli3 提供了vue ui命令,提供了可视化配置,更加人性化
      4. 移除了static文件夹,新增public文件夹,并且index.html移动到public中
   2. 创建一个项目
      1. vue create my-project 选择Manually select features 手动选择特性，之后用空格选择是否要使用，这里只选择babel（es6转es5）。其中还有一个progressive(先进的) web app support 和以前开发的app相比增加了很多功能，比如本地存储，推送通知 
      2. prefer placing config for babel,eslint,etc.意思是打算把配置放在那里，两个选项
         1. package.json   以前的文件
         2. dedicated(独立的) config files  独立的配置文件 这里选第二个
      3. save this as a preset for future projects 表示是否把刚才前两部的选择保存为一个文件，以后在第一步的时候可以直接选择这次保存的文件，直接跳过前两步。如果选择y，会让你给他起一个名字。如果想删除的话在C盘，user，metaphor，.vuerc文件里面保存的。rc：run command ，运行终端
   3. vuecli3 文件夹
      1. node_modules
      2. public 就相当于以前的static文件夹，原封不动的把文件夹中的内容复制到dist中。
      3. src 我们写的源代码
      4. .browserslistrc 配置浏览器相关东西
      5. .gitignore 忽略文件，一些不想上传的文件，例如node_modules,一般会拿到package.json，然后npm install自动安装。例如/dist，打包只需要有一个人打包就可以了。
      6. babel.config.js 这里是有关babel的一些配置，一般不需要改
      7. package-lock.json  和之前cli2相同
      8. package.json 里面安装了一个@vue/cli-service工具，可以帮助我们管理很多包，所以这里的devdependencies比之前vuecli2少很多东西，都隐藏了。
      9. readme.md 一些说明
   4. 执行文件
      1. 因为使用了@vue/cli-service帮助管理，所以和之前的执行命令略有不同
      2. npm run build：
      3. npm run serve：相当于以前的dev命令
      4. el:'App' 这个挂载标签元素App之后会执行.$moount('#app') ,如果代码中没有挂载直接写.$moount('#app')也是可以的。
   5. 配置文件的查看和修改(三种方案)
      1. 启动配置服务器：vue ui
      2. 原来的build和config文件只是被隐藏了，node_modules,@vue,cli-service,webpack.config.js
      3. 在当前项目目录下创建一个文件，名字为vue.config.js 之后在这个文件夹中module.exports={内容} 内容里面添加自己想要的配置，他会自动和其他的配置进行合并。
6. 箭头函数的参数和返回值
   1. const sum = (num1,num2) => {return num1 + num2}
   2. 如果只有一个参数,小括号可以省略
   3. 函数代码块中只有一行代码,中括号和return都可以省略,自动将这一行代码的结果返回.
   4. const mul = num1 => num1 * num1
   5. 箭头函数中this的使用
      1. 当我们准备把一个函数作为参数传到另一个函数中,这时使用箭头函数比较多
      2. 箭头函数中的this会向外层作用域,一层层查找this,直到有this的定义
         ```
         const obj= {
            aaa(){
               setTimeout(function (){
                  console.log(this); window 这里面的函数调用是通过call,call会把window作为第一个参数传进去
               })

               setTimeout(() => {
                  console.log(this); obj对象 这里箭头函数中没有this变量,会向外查找,找到了obj对象
               })
            }
         }
         ```