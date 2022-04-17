1. webpack
   1. 概念
      1. 从本质上讲，webpack是一个现代的JavaScript应用的静态模块打包工具
      2. 两个核心功能，模块化和打包
         1. 用sass、less、ts等等工具开发的代码浏览器是不支持的，还有比如ES6开发的代码还需要转换成ES5，大部分浏览器才会支持，也就是说这些软件开发整个应用程序不能直接放到服务器，而是需要经过一些工具进行打包、转化，最终生成浏览器可以识别的能执行的代码，让浏览器执行。这就需要一些打包工具，比如gulp、webpack、rollup（vue源码就是用这个构建的）、grunt等。
      3. 前端模块化
         1. 前端模块化有许多方案，AMD,CMD,CommonJS,ES6等。目前只有es6被浏览器底层支持，但是在webpack里面这些模块化方案全都能用，自动将其他的代码转化成大部分浏览器都能识别的代码，也不是转化成es6，因为有些浏览器还不支持es6的语法。
         2. 在模块化开发完成了项目后，还需要处理模块间的各种依赖，并且将其进行整合打包。
         3. webpack其中的一个核心就是让我们可能进行模块化开发，并且会帮助我们处理模块间的依赖关系。
         4. 不仅仅是JavaScript文件，我们的css、图片、json文件、等等在webpack中都可以被当作模块来使用。
      4. 打包
         1. 打包就是将webpack中的各种资源模块进行打包合并成一个或多个包（bundle），并且在打包的过程中，还可以对资源进行各种处理，比如压缩图片，将scss转成css，将es6语法转换成es5语法，将TS转换成JS等等操作。
         2. 但是grunt、gulp也可以完成打包，grunt基本没人用了，gulp、grunt的核心是Task，我们可以配置一系列的Task，并且定义Task要处理的事务（例如es6，ts转化，图片压缩，scss转成css），之后让grunt、gulp来依次执行这些task，而且让整个流程自动化，所以gulp、grunt也被称为前端自动化任务管理工具。
         3. 一个简单的gulp的task。这个task就是将src下面的所有js文件转换成es5的语法，并且最终输出到dist文件夹中
               ```
               const gulp = require('gulp');
               const babel = require('gulp-babel');

               gulp.task('js', ()=>
                   gulp.src('src/*.js')
                       .pipe(babel({
                         presets:['es2015']
                       }))
                       .pipe(gulp.dest('dist'))
               );
               ```
         4. 什么时候使用gulp、grunt呢？
               1. 如果工程模块依赖非常简单，甚至是没有用到模块化的概念。
               2. 只需要进行简单的合并、压缩，就是用gulp、grunt就可以了。
               3. 但是如果整个项目使用了模块化管理，而且相互依赖非常强，我们就可以使用更加强大的webpack了。
         5. gulp、grunt更加强调的是前端流程的自动化，模块化不是它的核心。webpack更加强调模块化开发管理，而文件压缩合并、预处理等功能，是他的附带功能。
         6. webpack为了正常运行必须依赖node环境，node环境为了可以正常的执行很多代码，必须其中包含各种依赖的包，这些包如果手动管理，用到哪个就去下载哪个包，很麻烦，所以就可以用npm（node packages manager）工具，来帮助我们管理node环境下面的各种包。
         7. 安装webpack首先安装node.js,node.js自带了软件包管理工具npm
   2. 使用
      1. webpack的配置 cd 文件名 这个操作是进入某个文件中 ;cd .. 这个操作是返回上一个文件夹
         1. 正常的话可以直接使用weppack打包，例如webpack ./src/main.js ./dist/bundle.js 前面是webpack需要打包的文件的入口文件，其需要指定入口文件就可以的，其他的模块化文件会自动导入，后面的是想要把文件打包到的位置。
         2. 我们也可以通过配置省去上面的过程，直接在终端中输入webpack就可以了。首先在大的文件夹中创建文件（即这里创建的文件是和html、src、dist同一级的，都在cd进入的文件夹下面），名为webpack.config.js ，名字是固定的。当执行webpack指令时，其会自动进入这个文件，从里面找入口和出口。
         ```
         module.exports = {
            entry: './src/main.js' ,     入口
            output: {                    出口
               path: 'C:\Users\metaphor wang\Desktop\文件\JavaScript DOM编程艺术(第2版)-源代码-最新\vue\webpack\dist' ,         path需要写绝对路径，
               filename: 'bundle.js'
            } ,                          
         }
         ```
         为了解决文件可能会换位置的情况，需要动态获取文件路径绝对位置，用到node.js的语法
         ```
         const path=require('path')      首先导入一个path模块，这个模块不要手动写，是从node的包里面找来的，所以就需要有path包。如何给它装包：首先在控制台中当前文件夹的位置输入npm init ，即初始化，这时需要填写一些信息，也可以直接用npm init -y一键配置。填写的信息有packet name，这里随便起一个meetwebpack，第二个是当前的版本号，直接回车，第三个是描述，不写，第四个是入口，不懂什么入口，随便写index.js，后面的都不需要写，直接回车，这时会生成一个package.json文件，里面是当前项目的一些信息。
         package.json依赖另一些东西，这时在控制台输入npm install ，即如果package.json里面有依赖的东西，他会根据里面的依赖帮助在当前文件夹安装一些东西，一旦项目里依赖node相关的东西，像这个项目里就依赖node相关的东西path。这时的path就会从全局里面找相关的东西。这个path其实是一个模块，里面有resolve函数,这个函数可以把两个路径进行拼接。dirname是一个全局变量，node上下文自带的，全局变量，里面保存的就是当前文件所在的路径。下面就把当前路径和dist进行了拼接。这下就拿到绝对路径了，可以直接webpack了。
         module.exports = {
            entry: './src/main.js' ,
            output: {
               path: path.resolve(__dirname,'dist') ,        ，这里需要用到node的语法，
               filename: 'bundle.js'
            } 
         }
         ```
         3. 正常多数情况下是不会在控制台中打webpack命令的，一般是输入npm run serve 让项目跑起来。如果准备打包的，就会在控制台中打npm run build 命令，即如果命令很长的话，像上面的webpack命令，就可以把他映射到npm run命令上，所以npm run就会执行webpack相关的命令了。所以这里需要把webpack一些命令和npm run相映射起来。
            1. 打开package.json文件，里面有"scripts":{"test":"echo \"Error: no test specified\" && exit 1"} 这时一个脚本，意味着可以在里面执行test脚本，本质上会执行test后面的命令的，也就是npm run test的时候，他会进入这个script里面找test这个名字，之后执行test后面的代码。
            2. 所以我们可以在里面添加一些脚本，然后npm run build 就会执行webpack命令。所以相当于把build的命令拷贝到控制台上执行，但是和直接在控制台执行webpack略有不同：就是如果npm run build会优先执行本地的webpack，本地没有再执行全局的。直接在控制台执行webpack，他执行的全局的webpack，如果想再控制台执行本地的webpack，就需要在控制台输入./node_modules/webpack  这里的node_modules是本地webpack的文件名
            3. 本地webpack和全局webpack区别
               1. 正常开发项目都会有一个本地的webpack包，因为单某一个项目的webpack很可能和自己电脑上全局的webpack版本不同，如果直接在控制台执行webpack就会使用全局的版本，很可能出错。所以需要下载一个本地的webpack，即cnpm install webpack@3.6.0 把全局安装时的-g删掉，就会下载到项目中，成为本地的webpack，
               2. 开发时依赖：只有项目开发阶段才需要用webpack，项目运行时已经打包好了，把包放在服务器上，再也用不到webpack了，所以安装时可以加上一个终端命令，cnpm install webpack@3.6.0 --save-dev  在本地安装，这时在package.json文件中会有"devDependencies":{"webpack" : "^3.6.0"} 这样的命令，dev单词是开发的意思，所以需要加--save-dev表示开发时依赖，项目打包后不需要继续使用的，这时就安装成功一个本地webpack
               3. 全局：
               ```
               "scripts":{
                  "test":"echo \"Error: no test specified\" && exit 1" ,
                  "build": "webpack "
               }
               ```
   3. loader
      1. loader是webpack中非常核心的一个概念。
         1. webpack最主要的是处理我们写的js代码，并且webpack会自动处理js之间相关的依赖
         2. 但是开发中不仅仅有js代码处理，还要加载css、图片，也包括将一些高级的es6代码转换成es5的代码，将TS转换成es5的代码，将scss、less转换成css，将.jsx和.vue文件转换成js文件等等。
         3. webpack本身是不支持这些处理的，给webpack扩展对应的loader就可以处理了。
      2. loader使用过程
         1. 一：通过npm安装需要使用的loader
         2. 二：在webpack.config.js中的module关键字下面进行配置
         3. 大部分loader我们都可以在webpack官网中找到，并且学习对应的用法
      3. css文件处理
         1. 在src目录中创建一个css文件，其中创建一个normal.css文件，我们也可以重新组织文件的目录结构，将零散的js文件放在一个js文件夹中。
         2. 需要让main.js依赖这个css文件，可以直接把main.js当作一个模块，然后在其中require('./css/normal.css')
         3. 在webpack.config.js文件中的module.exports依赖这个文件
            ```
            const path=require('path')
            module.exports = {
              entry: './src/main.js' ,
              output: {
                 path: path.resolve(__dirname,'dist') ,
                 filename: 'bundle.js'
              } ,
              module: {
                rules: [
                  {
                    test: /\.css$/,    //正则表达式，目的是匹配所有的css文件当匹配到css文件就会对文件应用下面use中的css-loader
                    // css-loader只负责将css文件进行加载，不负责解析，不把css代码放入main.js中让其生效，这些是style-loader做的
                    // style-loader负责将模块的导出作为样式添加到DOM中，这时才生效。即先加载css文件，然后再添加到dom文件上
                    // 使用多个loader时, 是从右向左
                    use: [ 'style-loader', 'css-loader' ]
                  }
                ]
              }
            }
            ```
      4. less文件处理
         1. 如果项目中使用less、scss、stylus写样式，也是可以进行处理的。
         2. npm install --save-dev less-loader@4.1.0 less 这里面需要两个东西，一个是正常的less loader，帮我们加载less文件的；另一个是less，less的作用是帮助我们把less文件装换成css文件。
         3. 这个也需要在webpack.config.js中进行配置，如下
         ```
              module: {
                rules: [
                  {
                    test: /\.css$/,    //正则表达式，目的是匹配所有的css文件当匹配到css文件就会对文件应用下面use中的css-loader
                    // css-loader只负责将css文件进行加载，不负责解析，不把css代码放入main.js中让其生效，这些是style-loader做的
                    // style-loader负责将模块的导出作为样式添加到DOM中，这时才生效。即先加载css文件，然后再添加到dom文件上
                    // 使用多个loader时, 是从右向左
                    use: [ 'style-loader', 'css-loader' ]
                  } ,
                  {
                    test: /\.less$/,     //这里就是另一个针对less的loader了
                    use: [{
                       loader:'style-loader'
                    },{
                       loader:'css-loader'
                    },{
                       loader:'less-loader'
                    }]
                  }
                ]
              }
            
         ```
      5. 图片文件的处理
         1. 在webpack官网上在文件中找图片的loader，图片没有专门的loader，用的是url-loader,npm install --save-dev url-loader@1.1.2
         2. 继续在webpack.config.js中配置module
            ```
            module: {
                rules: [
                  {
                    test: /\.css$/,    
                    use: [ 'style-loader', 'css-loader' ]
                  } ,
                  {
                     test: /\.(png|jpg|gif|jpeg)$/ ,   正则表达式，匹配四种图片
                     use : [
                        {
                           loader: 'url-loader' ,
                           options:{
                              limit:20000   这里的数字20000指的是bite，1kb=1024b，也就是大约为20kb 。 webpack加载图片时，他会在这里对比一下图片和limit的大小，如果加载的图片大小小于limit时，会使用上面的url-loader进行加载，并且将图片编译成base64字符串形式,就不需要单独形成一个文件进行打包传输了。如果图片大小大于limit时，他会使用file-loader对图片进行加载，而file-loader就不需要进行module配置了，安装就行了npm install file-loader@3.0.1 --save-dev 。这时把图片当成一个完整的图片加载就需要进行打包，打包到dist文件夹中，发布的时候只需要dist文件夹就可以了。为了防止名字重复，这时会用32位的hash值将这个图片文件重新命名，我们想展示的就是上面的重新命名后的图片，这里会报错，说这个图片找不到。在网页中展示的background：url（hash重新命名后的名字.jpg）。因为这里我们是通过index.html打开的网页，所以说这时候url想要展示的图片是和index.html这个文件同一层级，但事实上图片被我们保存到同一层级中的dist文件夹下面了，所以找不到。如果连index.html全都打包到dist文件夹下面就不会报错了。我们这里用的是另一种解决办法，即在url的地址前面添加一个./dist就会成功找到文件了。解决办法如下面的注释，在webpack.config.js文件中的output对象里面添加一个publicPath属性，以后在任何涉及到url的东西都会在前面自动添加一个地址dist/  页面中打开后的效果为background：url（dist/hash重新命名后的名字.jpg）
                              真是开发中我们可能不希望让他用hash将图片重新命名，命名之后都不认识了，所以需要用到下面的name属性进行重新命名
                           } ，
                           name: 'img/[name].[hash:8].[ext]'   这里操作的目的是给图片重新命名。我们希望将所有的图片都放在打包后dist文件下的新建的img文件中，img/name表示图片的位置，name是用新的方法命名的名字。但是在我们原来的src中的img文件中下面可能细分为更多的文件，会出现重名的情况，但是因为分属不同的文件夹之前才会没关系，但是我们这里想的是全都打包在dist下的img文件夹中，所以需要在名字中加一个hash值，避免同名的图片相互覆盖。这里的语法是用中括号里面存放变量，name代表图片以前的名字，例test，hash：8表示截取了hash值的前8位数字，ext表示文件原来的扩展名，而前面的img/表示都存放在新建的img文件下。
                        }
                     ]
                  }
                ]
              }
            ```
            ```
            output: {
                 path: path.resolve(__dirname,'dist') ,
                 filename: 'bundle.js' ,
                 publicPath:'dist/'
              }
            ```
      6. ES6语法处理 babel
         1. webpack打包后的js文件，我们写的es6语法并没有转换为es5的语法，那就意味着某些不支持es6的浏览器可能不会运行我们的代码
         2. npm install --save-dev babel-loader@7 babel-core babel-preset-es2015 这里面安装了三个工具，babel、babel-core、babel-preset，全都是本地安装，这里的babel-preset-es2015可以写为babel-preset-env 然后env（环境）需要自己进行配置，后面脚手架会讲到这个东西
            ```
            配置weboack.config.js文件
            module: {
              rules: [
                {
                  test: /\.m?js$/,
                  exclude: /(node_modules|bower_components)/,   在对es6进行转化的时候，只需要转换src文件夹，排除node_modules文件夹和bower_components文件夹。我们只需要打包一些我们写的代码，
                  use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['es2015']   因为我们上面下载的时候修改了env为es2015，所以这里也要修改。如果上面是babel-preset-env，那么这里就要写['@babel/preset-env']，然后他会去找babel啊C文件，
                    }
                  }
                }
              ]
            }
            ```
      7. Vue配置
         1. 最早的都是通过script标签引入vue源码的方式，他不是通过模块化的方式来管理vue的webpack支持模块化，所以可以通过webpack进行模块化的方式使用vue
         2. 安装vue的三种方式
            1. 直接下载引用
            2. CDN引用
            3. npm安装 这里只需要npm安装一下就会被下载到node_modules文件夹中，就可以把vue当作一个模块来使用了，即import Vue from 'vue'  这里面的'vue'没有写路径，没有路径时就会从node_modules里面引进，如果里面安装vue的就会成功引进。在node_modules源码的'vue'里面它export default Vue ，所以这里就成功引进Vue
         3. npm install vue@2.5.21 --save 注意这里-dev目的是开发时依赖，运行时就不需要用这个东西，但是vue运行的时候也是需要依赖的，打包后的dist文件中的代码也是依赖vue的，所以这里不写-dev
         4. vue在发布的时候最终构建了两类版本
            1. runtime-only         代码中不可以有任何的template，这个例子中div被挂载在vue实例中，就相当于是vue实例的template了，所以会报错，因为这里使用是这个版本。
            2. runtime-compiler     代码中可以有template，因为它里面有compiler这部分代码，可以用于编译template
            3. 解决方案：修改webpack.config.js的配置，添加如下内容,指定使用的runtime-compiler版本。
               ```
               module.exports = {
                  resolve: {
                  alias:{                           alias:别名的的意思
                     'vue$':'vue/dist/vue.esm.js'
                  }  
               }}
               意思是当使用import Vue from 'vue' 时，他会检查这个'vue'有没有指向具体的文件夹，而我们这里改过之后的是把vue指向了'vue/dist/vue.esm.js'这个文件夹了，他就不会以默认的方式找文件了，会找到我们这里指定的文件夹了，在node_modules里面找vue/dist/vue.esm.js这个文件夹，这个vue就包括了compiler版本，就可以正常使用。
               ```
      8. 创建Vue时template和el关系
         1. 以后做的项目很可能只有一个index.html，因为html模板在之后的开发中我们并不希望手动的来频繁修改，所以index.html里面的代码是不会改的，意味着这个html代码里是不包含{{message}}这种代码的，正常开发中就是<div id="app"></div>这样一点都不改，这个div的目的是和vue实例对应起来。如果想要展示message的话，就定义template属性把代码写到main.js中。
         2. 定义template属性
            1. 一旦在vue中定义了template属性，到时候template中的内容会被vue复制到index.html中的div标签中，即同时有el挂载标签，又有template，vue就会自动替换到el挂载的标签的位置中，也就是index.html中的<div id="app"></div>会被拿掉，然后把template属性中的内容放到div标签的位置上。
            2. 所以以后开发中代码都需要写在template中，因为同时有el和template，el会被template替换掉
         3. 操作
            1. 首先在html中挂载div
            2. 创建vue文件夹下面的app.js文件
            3. 在main.js文件中引入app.js
      9. Vue的终极使用方案
         1.  安装vue-loader和vue-template-compiler，前者是用于加载vue，后者是vue模板编译，真正对vue进行编译，先加载再编译 npm install vue-loader@15.4.2 vue-template-compiler@2.5.21 --save-dev 。这里也需要在webpack.config.js文件中进行配置loader，代码如下
         ```
         module: {
            rules: [
               {
              test: /\.vue$/,
              use: ['vue-loader']
            }
            ]
         }
         ```     
         2. 注意这里的vuetemplatecompiler的版本必须和上面的vue版本相同。因为vue从14版本开始想要使用vue-loader的话必须给它配一个插件。所以这里有两种办法改进
            1. 安装vue-loader的时候选择@13.0.0 版本，就不会报错
            2. 安装15.4.2版本但是在webpack.config.js文件中配置插件
               1. 官网有解释，下面是链接https://vue-loader.vuejs.org/zh/migrating.html#%E5%80%BC%E5%BE%97%E6%B3%A8%E6%84%8F%E7%9A%84%E4%B8%8D%E5%85%BC%E5%AE%B9%E5%8F%98%E6%9B%B4
               2. 首先在这个文件开头输入const { VueLoaderPlugin } = require('vue-loader')
               3. 然后
                  ```
                  module.exports = {
                     plugins: [
                       new VueLoaderPlugin()
                     ]
                  }
                  ```
            3. 这里使用老师的方法更改package.json中版本号，然后npm install更新版本的方式不好使，结果是版本根本就没更新，所以这里更改版本一律npm uninstall 然后再npm install
         3. 这时就可以在./src/vue/下创建App.vue文件，把app.js文件中的代码搬到App.vue文件中，这时可以在上面写template标签，中间script标签中用vue语法默认导出vue实例对象，在下面还可以给template中的标签写css样式。最后在main.js使用以下就可以了。
   4. plugin 插件
      1. 概念
         1. 插件常用于对某个现有的架构（框架）进行扩展，webpack中的插件，就是对webpack先有功能的各种扩展，比如打包优化、文件压缩等。
         2. loader和plugin区别：loader主要用于转换某些类型的模块，他是一个转换器。plugin是插件，他是对于webpack本身的扩展，是一个扩展器。
         3. 使用过程
            1. 通过npm安装需要使用的plugin插件（某些webpack已经内置的插件不需要安装）
            2. 在webpack.config.js文件中的plugins中配置插件
      2. BannerPlugin 插件
         1. webpack自带的插件，用于为打包的文件添加版权声明
         2. 修改webpack.config.js文件配置。 Banner：横幅
            ```
            const path = require('path')
            const webpack =  require('webpack')   因为是webpack自带的，所以需要导入一下
            module.exports = {
               plugins:[
                  new webpack.BannerPlugin('最终版权归tao所有')  
               ]
            }
            重新打包程序，查看bundle.js文件头部添加了版权信息
            ```
      3. HTMLWebpackPlugin插件
         1. 概念
            1. 目前我们的index.html文件是存放在项目的根目录下的，但是真实发布时我们只会发布dist文件夹中的内容，那么如果dist文件夹中没有index.html文件，那么打包js等文件就没有意义了。所以需要把index.html打包到dist文件夹中
            2. HtmlWebpackPlugin插件可以自动生成一个index.html文件（指定模板来生成），并且将打包的js文件，自动通过script标签插入到body中。
         2. 使用方法
            1. 安装HtmlWebpackPlugin插件
               1. npm install html-webpack-plugin@3.2.0 --save-dev
            2. 使用插件修改webpack.config.js文件中plugins配置
               ```
               const HtmlWebpackPlugin = require('html-webpack-plugin') 导入安装的插件
               plugins:[
                  new HtmlWebpackPlugin({
                     template:'index.html'         template表示根据什么模板生成index.html，因为之前的html模板中有script标签指定插入的文件，这里webpack会自动加入标签，所以也需要删除index.html文件夹中的script标签
                  })
                  因为这里直接插入index.html文件到dist文件夹下面了，所以我们需要删除之前在output中添加的publicPath属性，否则插入的script标签中的src可能会有问题
               ]
               ```
      4. UglifyjsWebpackPlugin插件
         1. 在项目发布之前，我们必然要对js等文件（bundle.js）进行压缩处理
         2. 使用uglifyjs-webpack-plugin第三方插件，指定版本号@1.1.1，如果使用它自带的会报错，和CLI2保持一致
            1. npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
         3. 修改webpack.config.js文件夹
            ```
            const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
            plugins:[
               new uglifyJsPlugin()
            ]
            查看打包后的bundle.js文件，已经被压缩过了
            ```
         4. 这时会将第一个插件中声明的东西全都删掉了
      5. webpack-dev-server搭建本地服务器
         1. 概念
            1. webpack提供了一个可选的本地开发服务器，这个本地服务器基于node.js搭建，内部使用express框架，可以实现我们想要的让浏览器自动刷新显示我们修改后的结果.
            2. 类似于vscode中的live-server插件作用
         2. 使用
            1. npm install --save-dev webpack-dev-server@2.9.3
               ```3.8.2
               module.exports = {
                  devServer:{
                     contentBase:'./dist' ,    这里本地服务器肯定要服务我们打包之后的文件夹，
                     inline: true              表示是否进行实时监听
                  }
                    这里devserver里面还可以写port属性，指定本地服务器（local
                    host）的端口，不指定就是默认的8080端口。
                    另一个属性就是historyApiFallback，在SPA页面中，依赖HTML5的history模式
               }
               ```
            2. 当配置好就可以使用了，webpack-dev-server，因为是在本地使用而不是全局使用，如果直接这么执行就是在全局执行了，而我们这里安装在本地。所以有上面的两种方式使用。
               1. 第一直接写文件路径名字，直接找到文件开始执行，比较粗暴。例.\node_modules\.bin\webpack-dev-server,注意这里使用的是反斜杠\,而不是我们经常使用的斜杠/
               2. 第二种也可以在webpack.json文件夹中scripts里面直接定义方法"dev" :"webpack-dev-server --open"  这里npm run dev就会在本地执行，这里的--open表示自动打开网页，不用手动点开
               3. 最后使用ctrl+c键关闭本地服务器
            3. 等文件修改完再次npm run build进行打包就可以了。这里本地服务器运行实际上是在本地内存中运行的，内存中访问较快可以实时改变。
      6. webpack配置文件（webpack.config.js）的分离
         1. 开发阶段和发布阶段使用到的插件不同的问题
            1. 如果现在是在开发阶段，不建议在插件中使用丑化插件对bundle文件进行压缩，因为js代码如果压缩之后，想要在浏览器中进行调试js代码，非常不方便，因为我们这里执行的dist下面的bundle.js代码，已经被压缩了，变量名字都被改掉了，调试不方便。所以在开发阶段不需要丑化插件，只有在最后发布阶段用一次就可以了。
            2. 在编译的时候devserver是不需要的，因为它只在开发阶段调试代码有用到，真正运行起来就不需要了，即编译打包到dist之后就不需要了。
         2. 对插件进行抽离，即开发时用到的东西进行一个单独的抽离，发布（也就是编译）时用到的东西抽离到另外的地方（就是最后压缩js代码到bundle的那一个阶段）。把抽离的文件都放在新建文件夹build中
            1. base.config.js文件中放的配置是一些公共的东西，即开发时、编译时都依赖这个文件
            2. prod.config.js文件中放的配置是生产时用到的东西，在base.config.js文件中有的代码就可以删掉了，一会进行合并就可以了
               ```
               const uglifyJsPlugin = require('uglifyjs-webpack-plugin') ;

               module.exports = {
                 plugins: [
                   new uglifyJsPlugin()
                 ] 
               }
               ```
            3. dev.config.js文件中放的配置是开发时用到的东西，在base.config.js文件中有的代码就可以删掉了，一会进行合并就可以了
               ```
               module.exports = {
                 devServer:{
                   contentBase:'./dist' ,
                   inline: true
                }
               }
               ```
         3. 为了将文件进行合并，这里需要安装npm install webpack-merge@4.1.5 --save-dev
            1. prod.config.js文件
               ```
               const uglifyJsPlugin = require('uglifyjs-webpack-plugin') 
               const webpackMerge = require('webpack-merge')
               const baseConfig = require('./base.config.js')

               module.exports = webpackMerge(baseConfig,{
                 plugins: [
                   new uglifyJsPlugin()
                 ] 
               })
               ```
            2. dev.config.js文件
               ```
               const webpackMerge = require('webpack-merge')
               const baseConfig = require('./base.config.js')

               module.exports = webpackMerge(baseConfig,{
                 devServer:{
                   contentBase:'./dist' ,
                   inline: true
                }
               })
               ```
            3. 这时已经可以把webpack.config.js删掉了，但是删除后就不能执行了，没有脚本文件，这时需要在package.json里面配置脚本文件"build": "webpack --config ./build/prod.config.js"，"dev" :"webpack-dev-server --open --config ./build/dev.config.js"自己指定使用哪些配置文件,如果不指定他就会找webpack.config.js文件。
            4. 这时运行打包会打包到build文件夹中，因为这个webpack.config.js配置文件在build文件下了，而以前时在总文件夹下面的,当初output（输出路径）设置的就是在__dirname（当前文件目录）然后在后面拼接一个dist文件夹。所以这里要找到上一层路径，即../dist 
            5. 但是entry入口路径不用改，因为是相对终端的命令行的当前目录的，而不是配置文件。和__dirname拿到的路径略有不同
               ```
               output: {
                  //path: path.resolve(__dirname, 'dist')
                  path: path.resolve(__dirname, '../dist'),
                  filename: 'bundle.js' 
                  //publicPath:'dist/'
               }
               ```