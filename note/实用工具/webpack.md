# webpack

## 1.webpack 简介

webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具

他会将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。

在 webpack 中所有的资源都可以理解为模块(png,jpg,css,html,js,json...)

webpack 默认只支持打包 js 和 json 文件

## 2. 安装 webpack

### 2-1. 全局下载 webpack

```
npm i webpack webapck-cli -g
```

全局安装的化 我们可以使用 webpack 作为命令 直接运行

### 2-2. 本地安装 webpack

```
npm i webpack webpack-cli -D
```

本地安装使用 npx webpack 运行

从 v4.0.0 开始，webpack 可以不用再引入一个配置文件来打包项目, webpack 会假定项目的入口起点为 src/index.js，然后会在 dist/main.js 输出结果，并且在生产环境开启压缩和优化

### 2-3. 修改入口文件即出口文件夹

```js
webpack ./src/demo.js -o ./output/
// webpack 入口文件地址 -o 出口文件夹地址 --mode=development 打包模式
<!-- development 开发 production 生产 -->
```

webpack 4.X 后可以不使用配置文件运行 呢么打包的入口文件为 src 下面的 index.js 生成的文件存在 dest/main.js 中

默认配置文件名称是 webpack.config.js 地址是 根路径

如果你需要修改文件名称或者地址

```
webpack --config 配置文件地址
```

## 3. 基础配置

### 3-1. 指定入口文件 出口地址

```js
var path = require('path')
module.exports = {
  // 指定入口文件地址
  entry: './src/app.js',
  // 指定出口文件地址
  output: {
    //   指定出口文件地址
    path: path.resolve(__dirname, 'dist'),
    //   指定出口文件名称
    filename: 'index.js'
  },
  //   production 生产  "development" 开发
  //   打包的模式
  mode: 'development'
}
```

### 3.2 样式打包

样式打包需要使用 两个基础的 loader

style-loader 及 css-loader

安装 loader

```
npm i style-loader css-loader -D
```

webpack.config.js 中的配置

写 loader 需要遵从一个原则 从右到左 从下到上

```js
module.exports = {
  ...
  module: {
    rules: [
      // 数组中的每一个对象都会处理一种类型的文件
      // test 验证文件后缀名是否符合正则匹配 use 符合条件使用的loader
      //   { test: /\.css$/, use: "css-loader" },
      //   css-loader 将css 资源打包到js 中 运行时css并未生效
      //   { test: /\.css$/, use: "css-loader" },
      // 将 css 效果展示出来
      // 写loader 需要遵从一个原则 从右到左 从下到上
      // style-loader 就是将js 中的css 样式 通过 style 标签 添加到 head 标签中
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
    ],
  },
  ...
};

```

#### 3.2.1 less 样式打包

使用 less-loader

```js
module.exports = {
  ...
  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      // 处理 less 文件
      // less-loader 将less 转化为css
      { test: /\.less$/i, use: ["style-loader", "css-loader", "less-loader"] },
    ],
  },
  ...
};
```

### 3.3 plugins 插件

#### 3.3.1 html 打包

使用 html-webpack-plugin

下载

```
npm i html-webpack-plugin -D
```

如果不传递参数的话 会自动生成一个 html 文件 并引入外部资源

HtmlWebpackPlugin 会自动帮助我们引入外部资源 我们不需要手动引入 避免重复

template 我以哪一个 html 文件为模板生成一个新的 html 文件

```js
var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  ...
  plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
  ...
}
```

#### 3.3.2 清空数据目录插件

使用 clean-webpack-plugin

下载

```
npm i clean-webpack-plugin -D
```

使用

```js
var { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  ...
  plugins: [
    // CleanWebpackPlugin() 帮助我们清除 输出的dist目录
    new CleanWebpackPlugin(),
  ],
  ...
}
```

#### 3.3.3 展示打包进度

使用 webpack 内置的模块 ProgressPlugin

确保你有 webpack 就可以

```js
// 导入内置的插件
var { ProgressPlugin } = require("webpack");
module.exports = {
  ...
  plugins: [
    // ProgressPlugin 帮助我们展示打包的进度
    new ProgressPlugin(),
  ]
  ...
}
```

#### 3.3.4 插件 plugin 和 loader 的区别

1. 不论 plugin 还是 loader 我们都需要下载才能使用
2. 使用 loader 不需要导入，使用 plugin 需要导入
3. loader 一般用来加载处理文件 plugin 用来处理一些 loader 处理不了的内容 (例如 文件压缩，清空文件夹， 展示打包进度 等等)

### 3.4 打包图片资源

使用 url-loader
url-loader 依赖于 file-loader

```js
module.exports = {
  ...
   module: {
    rules: [
       {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: "url-loader",
            // 对 loader 进行配置
            options: {
              // 1k = 1024b 1m = 1024k 1g = 1024m
              // 会将 小于8 * 1024 文件大小的图片转化为 base64
              limit: 8 * 1024, // 文件大小为8kb
              // 原本文件加载可以看为 ES (模块化) 导入和导出 没有正常显示图片 使用 commonjs 导入导出
              esModule: false,
              // name 修改文件名
              // [ext] 使用文件原本的后缀名
              // [hash:6] 取hash值 前六位
              name: "[hash:6].[ext]",
              // 修改文件存放的地址
              outputPath: "img",
              // 修改访问文件的地址 打包好之后文件引用的地址
              publicPath: "./img",
            },
          },
        ],
        type: "javascript/auto",
      },
    ]
   }
  ...
}
```

如果我们需要打包 html 中的图片资源

我们可以使用 html-loader

```js
module.exports = {
  ...
  module:{
    rules: [
      // html-loader 是用来将 html 中的图片资源当作模块导入一下 交给 url-loader 处理
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ]
  }
  ...
}
```

### 3.5 打包其他资源

使用 file-loader 用法 urlloader 基本一致

```js
module.exports = {
  ...
   module: {
    rules: [
      // 其他资源打包
      {
        test: /\.(ttf|woff2?)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              // 处理其他文件也需要配置
              esModule: false,
              outputPath: "font",
              publicPath: "./font",
              name: "[hash:6].[ext]",
            },
          },
        ],
        // 兼容4.0版本的写下
        type: "javascript/auto",
      },
    ]
   }
  ...
}
```

### 3.6 css 优化

#### 3.6.1 拆分 css 为单独文件

使用 mini-css-extract-plugin 插件

要想使用这个插件 我们需要一个 loader 相配合

使用 css-loader 和 MiniCssExtractPlugin.loader 配合使用

```js
module.exports = {
  ...
   module: {
    rules: [
      //   // 帮助我们将css 提取出来
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // outputPath: "css",
              publicPath: "./css",
            },
          },
          "css-loader",
        ],
      },
    ],
  },

   plugins: [
    ...
    // 把css 放到文件中
    new MiniCssExtractPlugin({
      // 指定输出的目录和文件名称
      filename: "css/index.css",
    }),
  ],
  ...
}
```

#### 3.6.2 css 兼容处理

使用 postcss-loader

```js
 module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          //  兼容不同的浏览器 处理 css 语言 兼容不同版本的浏览器
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
        ],
      },
    ],
  },
```

#### 3.6.3 压缩 css 代码

使用 插件 css-minimizer-webpack-plugin

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
   module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          //  兼容不同的浏览器 处理 css 语言 兼容不同版本的浏览器
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
        ],
      },
    ],
  },
  plugins=[
    ...
    // 把css 放到文件中
    new MiniCssExtractPlugin({
      filename: "css/index.css",
    }),
    // 压缩css
    new CssMinimizerPlugin()
  ]
}
```

### eslint 语法检查

1. 下载模块包

```
npm install eslint -D
```

2. 初始化 eslint

```
npx eslint --init
```

初始化完成项目中会多一个 .eslintrc.js 文件 即为 eslint 配置文件

如果我们需要在项目中使用语法检查 需要在项目中创建 .eslintrc.js 文件对语法进行配置 同时需要借助 eslint vscode 插件 进行错误提示

// 语法规则配置

```js
"no-alert": 0,//禁止使用alert confirm prompt
"no-array-constructor": 2,//禁止使用数组构造器
"no-bitwise": 0,//禁止使用按位运算符
"no-caller": 1,//禁止使用arguments.caller或arguments.callee
"no-catch-shadow": 2,//禁止catch子句参数与外部作用域变量同名
"no-class-assign": 2,//禁止给类赋值
"no-cond-assign": 2,//禁止在条件表达式中使用赋值语句
"no-console": 2,//禁止使用console
"no-const-assign": 2,//禁止修改const声明的变量
"no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)
"no-continue": 0,//禁止使用continue
"no-control-regex": 2,//禁止在正则表达式中使用控制字符
"no-debugger": 2,//禁止使用debugger
"no-delete-var": 2,//不能对var声明的变量使用delete操作符
"no-div-regex": 1,//不能使用看起来像除法的正则表达式/=foo/
"no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
"no-dupe-args": 2,//函数参数不能重复
"no-duplicate-case": 2,//switch中的case标签不能重复
"no-else-return": 2,//如果if语句里面有return,后面不能跟else语句
"no-empty": 2,//块语句中的内容不能为空
"no-empty-character-class": 2,//正则表达式中的[]内容不能为空
"no-empty-label": 2,//禁止使用空label
"no-eq-null": 2,//禁止对null使用==或!=运算符
"no-eval": 1,//禁止使用eval
"no-ex-assign": 2,//禁止给catch语句中的异常参数赋值
"no-extend-native": 2,//禁止扩展native对象
"no-extra-bind": 2,//禁止不必要的函数绑定
"no-extra-boolean-cast": 2,//禁止不必要的bool转换
"no-extra-parens": 2,//禁止非必要的括号
"no-extra-semi": 2,//禁止多余的冒号
"no-fallthrough": 1,//禁止switch穿透
"no-floating-decimal": 2,//禁止省略浮点数中的0 .5 3.
"no-func-assign": 2,//禁止重复的函数声明
"no-implicit-coercion": 1,//禁止隐式转换
"no-implied-eval": 2,//禁止使用隐式eval
"no-inline-comments": 0,//禁止行内备注
"no-inner-declarations": [2, "functions"],//禁止在块语句中使用声明（变量或函数）
"no-invalid-regexp": 2,//禁止无效的正则表达式
"no-invalid-this": 2,//禁止无效的this，只能用在构造器，类，对象字面量
"no-irregular-whitespace": 2,//不能有不规则的空格
"no-iterator": 2,//禁止使用__iterator__ 属性
"no-label-var": 2,//label名不能与var声明的变量名相同
"no-labels": 2,//禁止标签声明
"no-lone-blocks": 2,//禁止不必要的嵌套块
"no-lonely-if": 2,//禁止else语句内只有if语句
"no-loop-func": 1,//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
"no-mixed-requires": [0, false],//声明时不能混用声明类型
"no-mixed-spaces-and-tabs": [2, false],//禁止混用tab和空格
"linebreak-style": [0, "windows"],//换行风格
"no-multi-spaces": 0,//不能用多余的空格
"no-multi-str": 2,//字符串不能用\换行
"no-multiple-empty-lines": [1, {"max": 3}],//空行最多不能超过2行
"no-native-reassign": 2,//不能重写native对象
"no-negated-in-lhs": 2,//in 操作符的左边不能有!
"no-nested-ternary": 0,//禁止使用嵌套的三目运算
"no-new": 1,//禁止在使用new构造一个实例后不赋值
"no-new-func": 1,//禁止使用new Function
"no-new-object": 2,//禁止使用new Object()
"no-new-require": 2,//禁止使用new require
"no-new-wrappers": 2,//禁止使用new创建包装实例，new String new Boolean new Number
"no-obj-calls": 2,//不能调用内置的全局对象，比如Math() JSON()
"no-octal": 2,//禁止使用八进制数字
"no-octal-escape": 2,//禁止使用八进制转义序列
"no-param-reassign": 2,//禁止给参数重新赋值
"no-path-concat": 0,//node中不能使用__dirname或__filename做路径拼接
"no-plusplus": 0,//禁止使用++，--
"no-process-env": 0,//禁止使用process.env
"no-process-exit": 0,//禁止使用process.exit()
"no-proto": 2,//禁止使用__proto__属性
"no-redeclare": 2,//禁止重复声明变量
"no-regex-spaces": 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/
"no-restricted-modules": 0,//如果禁用了指定模块，使用就会报错
"no-return-assign": 1,//return 语句中不能有赋值表达式
"no-script-url": 0,//禁止使用javascript:void(0)
"no-self-compare": 2,//不能比较自身
"no-sequences": 0,//禁止使用逗号运算符
"no-shadow": 2,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
"no-shadow-restricted-names": 2,//严格模式中规定的限制标识符不能作为声明时的变量名使用
"no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格
"no-sparse-arrays": 2,//禁止稀疏数组， [1,,2]
"no-sync": 0,//nodejs 禁止同步方法
"no-ternary": 0,//禁止使用三目运算符
"no-trailing-spaces": 1,//一行结束后面不要有空格
"no-this-before-super": 0,//在调用super()之前不能使用this或super
"no-throw-literal": 2,//禁止抛出字面量错误 throw "error";
"no-undef": 2,//不能有未定义的变量
"no-undef-init": 2,//变量初始化时不能直接给它赋值为undefined
"no-undefined": 2,//不能使用undefined
"no-unexpected-multiline": 2,//避免多行表达式
"no-underscore-dangle": 1,//标识符不能以_开头或结尾
"no-unneeded-ternary": 2,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
"no-unreachable": 2,//不能有无法执行的代码
"no-unused-expressions": 2,//禁止无用的表达式
"no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
"no-use-before-define": 2,//未定义前不能使用
"no-useless-call": 2,//禁止不必要的call和apply
"no-void": 2,//禁用void操作符
"no-var": 0,//禁用var，用let和const代替
"no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],//不能有警告备注
"no-with": 2,//禁用with

"array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格
"arrow-parens": 0,//箭头函数用小括号括起来
"arrow-spacing": 0,//=>的前/后括号
"accessor-pairs": 0,//在对象中使用getter/setter
"block-scoped-var": 0,//块语句中使用var
"brace-style": [1, "1tbs"],//大括号风格
"callback-return": 1,//避免多次调用回调什么的
"camelcase": 2,//强制驼峰法命名
"comma-dangle": [2, "never"],//对象字面量项尾不能有逗号
"comma-spacing": 0,//逗号前后的空格
"comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
"complexity": [0, 11],//循环复杂度
"computed-property-spacing": [0, "never"],//是否允许计算后的键名什么的
"consistent-return": 0,//return 后面是否允许省略
"consistent-this": [2, "that"],//this别名
"constructor-super": 0,//非派生类不能调用super，派生类必须调用super
"curly": [2, "all"],//必须使用 if(){} 中的{}
"default-case": 2,//switch语句最后必须有default
"dot-location": 0,//对象访问符的位置，换行的时候在行首还是行尾
"dot-notation": [0, { "allowKeywords": true }],//避免不必要的方括号
"eol-last": 0,//文件以单一的换行符结束
"eqeqeq": 0,//必须使用全等
"func-names": 0,//函数表达式必须有名字
"func-style": [0, "declaration"],//函数风格，规定只能使用函数声明/函数表达式
"generator-star-spacing": 0,//生成器函数*的前后空格
"guard-for-in": 0,//for in循环要用if语句过滤
"handle-callback-err": 0,//nodejs 处理错误
"id-length": 0,//变量名长度
"indent": [2, 2],//缩进风格
"init-declarations": 0,//声明时必须赋初值
"key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
"lines-around-comment": 0,//行前/行后备注
"max-depth": [0, 4],//嵌套块深度
"max-len": [0, 80, 4],//字符串最大长度
"max-nested-callbacks": [0, 2],//回调嵌套深度
"max-params": [0, 3],//函数最多只能有3个参数
"max-statements": [0, 10],//函数内最多有几个声明
"new-cap": 2,//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
"new-parens": 2,//new时必须加小括号
"newline-after-var": 2,//变量声明后是否需要空一行
"object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格
"object-shorthand": 0,//强制对象字面量缩写语法
"one-var": 1,//连续声明
"operator-assignment": [0, "always"],//赋值运算符 += -=什么的
"operator-linebreak": [2, "after"],//换行时运算符在行尾还是行首
"padded-blocks": 0,//块语句内行首行尾是否要空行
"prefer-const": 0,//首选const
"prefer-spread": 0,//首选展开运算
"prefer-reflect": 0,//首选Reflect的方法
"quotes": [1, "single"],//引号类型 `` "" ''
"quote-props":[2, "always"],//对象字面量中的属性名是否强制双引号
"radix": 2,//parseInt必须指定第二个参数
"id-match": 0,//命名检测
"require-yield": 0,//生成器函数必须有yield
"semi": [2, "always"],//语句强制分号结尾
"semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
"sort-vars": 0,//变量声明时排序
"space-after-keywords": [0, "always"],//关键字后面是否要空一格
"space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
"space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
"space-in-parens": [0, "never"],//小括号里面要不要有空格
"space-infix-ops": 0,//中缀操作符周围要不要有空格
"space-return-throw-case": 2,//return throw case后面要不要加空格
"space-unary-ops": [0, { "words": true, "nonwords": false }],//一元运算符的前/后要不要加空格
"spaced-comment": 0,//注释风格要不要有空格什么的
"strict": 2,//使用严格模式
"use-isnan": 2,//禁止比较时使用NaN，只能用isNaN()
"valid-jsdoc": 0,//jsdoc规则
"valid-typeof": 2,//必须使用合法的typeof的值
"vars-on-top": 2,//var必须放在作用域顶部
"wrap-iife": [2, "inside"],//立即执行函数表达式的小括号风格
"wrap-regex": 0,//正则表达式字面量用小括号包起来
"yoda": [2, "never"]//禁止尤达条件
```

3. 在 webpack 中使用 eslint 代码检查

使用 eslint-webpack-plugin 进行代码检查 如果语法规范不通过 将无法打包

```js
const ESLintPlugin = require('eslint-webpack-plugin')
module.exports = {
  plugins: [
    // 使用语法检查插件 语法检查不通过将无法打包
    new ESLintPlugin()
  ]
}
```

#### 3.6.4 解析

1. 别名

webpack.config.js

```js
module.exports = {
  // 解析
  resolve: {
    // alias 项目里面起一些别名
    alias: {
      demoCss: path.resolve(__dirname, './src/css'),
      // 使用@ 别名，表示项目目录的根目录
      // 找文件夹
      '@': __dirname,
      // 末尾添加 $，以表示精准匹配 文件
      css$: path.resolve(__dirname, './src/css/index.css')
    }
  }
}
```

js 文件中处理 不需要加~

```js
// @ 就是别名表示我们配置的项目根路径
import '@/src/css/index.css'
import 'domeCss/index.css'
// css 精确匹配的别名 直接写别名就可以找到文件
import 'css'
```

在 less css 文件中需要加~ 才能使用别名

```less
// 如果在css 中使用别名我们需要加一个~
@import '~@/src/css/index';
```

忽略后缀名

webpack.config.js

```js
module.exports = {
  ...
    resolve: {
    // 后缀名简写
    extensions: ['.css', '.less']
  }
}
```

导入文件中的写法

```js
import './src/index' // 忽略后缀名不写
```

#### 懒加载及预加载

只需要在 js 代码中书写就可以了

```js
document.querySelector('.btn').onclick = async function () {
  // foo()
  // 异步导入的方式
  // 将异步导入放在异步任务中 实现懒加载
  // 返回的内容是一个对象
  // 在使用异步打包时会将模块分离出来
  //   /* webpackChunkName: "lodash" */ 用来给我们打包的模块起一个名字
  //   webpackPrefetch: true 预加载 并不会导入到js 文件中 而是在使用的时候才会导入
  var foo = await import(
    /* webpackChunkName: "demo", webpackPrefetch: true   */ './js/a'
  )

  console.log(foo.default())
}
```

### devServer 开发服务器

我们需要下载 webpack-dev-server

配置 webpack 启动开发服务器

```js
  // 配置一个服务
  // 我们开启一个服务 会把我们打包的资源放在 内存空间中
  devServer: {
    //   配置服务启动的文件夹
    static: path.resolve(__dirname, 'dist'),
    // 是否开启压缩
    compress: true,
    // 配置启动的地址
    host: 'localhost',
    // 配置 端口号
    port: '3000',
    // 是否打开默认浏览器
    open: true
  }
```

在开发环境中运行服务

```
npx webpack serve
```

### devServer 代理请求

```
 proxy: {
      '/api1': {
        // 目标地址
        // target: 'http://api.uixsj.cn',
        target: 'http://192.168.109.16:5000',
        // 路径重写
        pathRewrite: { '^/api1': '' },
        // 当我们的地址和请求的地址不一样时就需要开启源
        changeOrigin: true
        // 如果请求为https 需要加 secure: false
        // secure: false
      },
      '/api2': {
        //   目标地址
        target: 'https://api.uixsj.cn',
        // target: 'http://192.168.109.16:5000',
        // 路径重写
        pathRewrite: { '^/api2': '' },
        // 当我们的地址和请求的地址不一样时就需要开启源
        changeOrigin: true,
        // 如果请求为https 需要加 secure: false
        secure: false
      }
    }
```

js 代码中书写

```js
$.get("/api2/json", function(res){
  console.log("res)
})

$.get('/api2/hitokoto/get', function (res) {
  console.log(res)
})
```
