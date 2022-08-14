在开发过程中，在前端准备调后端接口时，如果发现后端接口还没开发完成，则可以使用 Mock 这一种模拟后端接口的解决方案，可以让前端提前调用模拟接口，完成前端开发。

Mock 有以下特点：

前后端分离：让前端攻城师独立于后端进行开发
增加单元测试的真实性：通过随机数据，模拟各种场景
开发无侵入：不需要修改既有代码，就可以拦截 Ajax 请求，返回模拟的响应数据
用法简单：符合直觉的接口
数据类型丰富：支持生成随机的文本、数字、布尔值、日期、邮箱、链接、图片、颜色等
方便扩展：支持支持扩展更多数据类型，支持自定义函数和正则
# 1. 基本用法
Mock 有两种使用方式：

搭配开发服务器创建 Mock 数据接口返回数据
单独使用，拦截页面的 ajax 请求返回数据
## 1.1 安装
使用以下命令进行安装：

`$ npm i mockjs -D`
## 1.2 基本用法
使用提供的 mock 方法创建模拟数据：

```js
const Mock = require('mockjs');

let data = Mock.mock(/* ... */);
```
## 1.3 数据创建
### 1.3.1 语法规范
### 数据模板定义规范
数据模板中的每个属性由 3 部分构成：属性名（name）、生成规则（rule）、属性值（value）。
```json
{
    'name|rule': value 
}
```
其中，name 为实际生成数据的属性名，rule 为定义生成随机数据的规则，value 为定义字段的初始值，或基础值。

注意：name 和 rule 之间要使用 | 分隔开。

### 数据占位符定义规范
占位符只是在属性值字符串中匹配某种数据生成规则，作为 value 模版的一部分，自身并会不出现在最终的属性值中。
```json
{
    'name|rule': '@占位符',
    'name|rule': '@占位符(参数[, 参数2, ...])'
}
```
### 1.3.2 数据创建语法示例
'name|min-max': string：通过重复 string 生成字符串，其中 min 和 max 分别表示字符串的最小和最大长度
```js
Mock.mock({
    "string|1-10": "★"
});
```
生成数据为：
```json
{
  "string": "★★★★★★★★"
}
```
'name|min-max': number：生成制定范围的数字，其中 min 和 max 分别表示限制数字的最小值和最大值
```js
Mock.mock({
    "number|1-100": 100
});
```
生成数据为：
```json
{
    "number": 34
}
```
@id()、@guid()：id 占位符，用于生成指定格式的随机 id 值
```js
Mock.mock({
    "id": "@id()",      // 身份证号
    "guid": "@guid()"   // UUID
});
```
生成数据为：
```json
{
    id: '450000200609051706',
    guid: 'e6A8cdF4-0ee4-921e-ce6D-FBE8bBc8932C'
}
```
更多数据模版和占位符用法见[官网](http://mockjs.com/examples.html)。

## 2. 场景使用
### 2.1 独立使用
在开发环境中，可以不搭配任何开发工具，甚至也可以不需要搭建服务器环境，就可以直接使用 Mock 为 ajax 请求返回模拟数据。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Mock</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/Mock.js/1.0.0/mock-min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
    
</body>
<script>
    // 为指定的 url 地址请求设置响应数据
    Mock.mock('/api/user', {
        'id': '@guid()',
        'username': '@cname()'
    });

    $.ajax({
        method: 'GET',
        url: '/api/user',
        success(res) {
            console.log(res);
        }
    });
</script>
</html>
```
也可以使用 [jquery-mockjax](https://www.npmjs.com/package/jquery-mockjax) 实现更多的功能

2.2 搭配开发服务器使用
Mock 更多的使用场景是搭配 node 环境下的开发服务器使用，只是作为单纯的数据创建方法。

以 webpack 的 devSever.onBeforeSetupMiddleware 配置为例：
```js
const Mock = require('mockjs');

module.exports = {
    mode: 'development',
    devServer: {
        port: 3000,
        open: true,
        onBeforeSetupMiddleware({ app }) {
            app.get('/api/user', (req, res) => {
                let data = Mock.mock({
                    "id": "@id()",
                    "guid": "@guid()"
                });
                res.json(data);
            });
        }
    },
}
```
将返回模拟数据的接口创建在 devSever 自身创建的服务器对象上，可以避免跨域问题。


