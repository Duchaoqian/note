# rem适配

### 安装 lib-flexible 根据屏幕尺寸设置 根标签字体大小

```
npm install lib-flexible
```
### 安装 autoprefixer 兼容浏览器，添加前缀

```
npm install autoprefixer
```

### 安装 postcss-pxtorem 用于将 css 中的 px 转化为 rem

```
npm install postcss-pxtorem
```

### 新建 postcss.config.js 书写一下配置

```js
module.exports = {
  plugins: {
    // 兼容浏览器，添加前缀
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      propList: ['*'], //是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
      unitPrecision: 5, //保留rem小数点多少位
      selectorBlackList: ['.radius'], //则是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
      mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
      minPixelValue: 12 //px小于12的不会被转换
    }
  }
}
```
