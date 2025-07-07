# 4. mvc 模型及 mvvm 模型

1. mvc 模型
   1. 起源于服务端
   2. 字母介绍
      1. m: model(模型) 简单理解就是数据
      2. v: view(视图) 就是页面
      3. c: controller(控制器) 就是将数据展示到页面中
         把数据获取到 对数据进行处理 将数据添加到页面中
2. mvvm 模型
   1. 字母介绍
      1. m: model(模型) 简单理解就是数据 option
      2. v: view(视图) 就是页面 #app
      3. vm: viewModel (视图模型) 用来将数据进行处理 连接 model(模型) 和 view(视图)
3. 在 vm 身上的所有东西都可以在 页面中展示出来
4. 通过 vue 获取 vm 实例对象
   > var vm = Vue.createApp(option).mount('#app')
5. 我们在 data 中写的数据 最终都放在了 vm 的身上
6. vm 直接通过对象操作数据与 $data 操作一样