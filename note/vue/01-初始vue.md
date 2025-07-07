# VUE

## 1.初识 vue

1. 引入 vue js
   1. 将 vue.global.min.js 文件保存到本地，通过 script 标签引入本地 vue.global.min.js
   2. 通过 cdn 使用 script 标签,src 为 vue js 文件网址
      ```html
         <script src="https://unpkg.com/vue@next"></script>
      ```
2. 操作步骤

   1. 指定数据

      ```js
          var option = {
              // 指定数据
              // data: function(){

              // }
              // 简写称
              data() {
              return {
                  say: 'hello'
              }
          }
      ```

   2. 通过 vue 创建 app
      ```js
         var app = Vue.createApp(option)
      ```
   3. 通过 app 接管 div 标签 将 app 中的数据展示在 div 标签中
      ```js
         // mount 挂载
         app.mount('.app') // 括号中写的是挂载元素的选择器
      ```
   4. 一个 app(vue 实例) 只能接管一个容器；是一个一一对应的关系

