# 项目构建文档
各文件，文件夹作用
```
|-docs
  |- .vitepress 项目配置目录
    |- config.js 项目配置文件
  |- examples  // 代码示例
    |- html //html css 案例
    |- javascript // js 案例
    |- jquery // jq案例
    |- vue // vue 案例
  |- note // 笔记
    |- ... 各项目笔记
```

## html, js, jquery 案例配置
+ js 代码使用 es 模块化标准
+ 文件构成 
```
|- index.html
|- script.js // js 入口文件
|- style.css // 样式文件
|- import-map.json // 项目依赖
|- description.txt // 项目描述
```
**jquery项目 中内置了 jquery@3版本库 可直接书写jq代码**



