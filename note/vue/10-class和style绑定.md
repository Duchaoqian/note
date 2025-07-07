# class和style绑定

1. 属性绑定添加字符串类名
   ```html
      <div :class="className"></div>
   ```
2. 类名绑定时会在原有的基础上进行添加
   ```html
      <div :class="className" class="item"></div>
   ```
3. 数组形式添加类名
   ```html
      <div :class="classList"></div>
   ```
   ```js
      classList: ['a', 'b', 'c', 'd'],
   ```
4. 对象形式添加类名 可以使用布尔值决定类名是否应该被添加
   ```html
      <div :class="classObj"></div>
   ```
   ```js
      classObj: {
              a: true,
              b: false,
              c: true
            },
   ```
5. 样式添加 对象形式 在原有的基础上进行添加
   ```html
      <div :style="styleObj" style="border: 10px solid black"></div>
   ```
   ```js
      styleObj: {
         // 属性式样式属性的名称 值式样式属性的值
         backgroundColor: 'red',
         width: '100px',
         height: '100px'
      },
   ```
6. 样式添加 数组形式
   ```html
      <div :style="styleList"></div>
   ```
   ```js
      styleList: [
         // 数组嵌套对象
         {
            backgroundColor: 'blue'
         },
         {
            width: '200px'
         },
         {
            height: '200px'
         }
      ]
   ```
