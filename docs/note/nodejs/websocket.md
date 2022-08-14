# websocket

## 1. 概述
HTTP协议是一种无状态协议，服务器端本身不具有识别客户端的能力，必须借助外部机制，比如session和cookie，才能与特定客户端保持对话。这多多少少带来一些不便，尤其在服务器端与客户端需要持续交换数据的场合（比如网络聊天），更是如此。为了解决这个问题，HTML5提出了浏览器的WebSocket API。


WebSocket 是html5开始提供的一种浏览器与服务器进行全双工通讯的网络技术，属于应用层协议。它基于TCP传输协议，并复用HTTP的握手通道。

WebSocket的主要作用是，允许服务器端与客户端进行全双工（full-duplex）的通信。举例来说，HTTP协议有点像发电子邮件，发出后必须等待对方回信；WebSocket则是像打电话，服务器端和客户端可以同时向对方发送数据，它们之间存着一条持续打开的数据通道。

WebSocket协议用ws表示。此外，还有wss协议，表示加密的WebSocket协议，对应HTTS协议。

## 2. 连接过程

### 2-1. 发送一个GET请求
请求头信息 
```
GET / HTTP/1.1     // 请求方式及协议版本
Connection: Upgrade // 浏览器通知服务器，如果可以，就升级到webSocket协议 
Upgrade: websocket //Upgrade头信息表示将通信协议从HTTP/1.1转向该项所指定的协议
Host: localhost:5000
Origin: null // 源地址信息
Sec-WebSocket-Key: sN9cRrP/n9NdMgdcy2VJFQ== //用于握手协议的密钥，是base64编码的16字节随机字符串。
Sec-WebSocket-Version: 13 //  WebSocket 版本号
```

### 2-2. 服务期给出响应
```
HTTP/1.1 101 Switching Protocols // 请求方式及协议版本
Connection: Upgrade  // 通知浏览器，需要改变协议
Upgrade: websocket
Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s= // 是服务器在浏览器提供的Sec-WebSocket-Key字符串后面，添加“258EAFA5-E914-47DA-95CA-C5AB0DC85B11” 字符串，然后再取sha-1的hash值。浏览器将对这个值进行验证，以证明确实是目标服务器回应了webSocket请求
Sec-WebSocket-Location: ws://example.com/
```

#### 2-3. 握手完成 WebSocket 建立再tcp 协议之上 开始数据传输

### 3. nodejs 搭建websocket 服务器

使用ws模块包搭建websocket 服务

ws 是一个第三方库，帮助我们操作 webSocket 的一个库

### 3-1. 项目初始化
新建wechat文件夹 执行 `npm init -y` 初始化项目
```
npm init -y
```

### 3-2. 安装项目依赖包
**lib**
*express*
*ws*

```
npm install express ws
```


### 3-3. 在根目录下 建立入口文件 index.js

index.js
```js
const express = require("express");
// 基于 express 创建 一个服务器对象
const app = express();

// 注册静态目录，在浏览器中向 "localhost:3000" 发送请求的时候，服务端直接将静态目录中的 index.html 内容返回。
app.use(express.static("www"));

// 创建 http 服务
const http = require("http");
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("服务已启动");
});

// http 服务是用于客户端和服务端建立连接，而 某一个客户端 想要完成 和 websocket 之间的连接，首次连接是需要依赖于 http 服务的。

// 创建一个 websocket 服务，这个 websocket 服务是用于后期聊天功能，而 http 服务 可以继续处理 接口请求。
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

// 1. 使用 wss(webSocketServer) 监听 连接 事件，当有新的用户和websocket进行连接的时候，就会触发这个事件。
wss.on("connection", (ws) => {
  console.log("有新用户建立连接了");
  ws.send("欢迎进入xxx，请问需要什么帮助吗？");

  // 这里的 ws 参数，代表每一个用户所产生的连接对象，只要有新的用户产生，就会有新的 ws 连接对象。
  ws.on("close", () => {
    console.log("有用户断开连接了");
  });

  // 监听服务端的 websocket 接受数据的函数，只要客户端发送消息，就执行这个事件
  ws.on("message", (data) => {
    ws.send(data);
  });
});


```

### 3-4. 启动服务

```
node index.js
```

### 3-5. api 参考

#### 3-5-1. ws 事件

- message 当接受到客户端的消息时触发
- close 当客户段和服务端断开连接时处罚
- pong 当侦听到服务端发送的 ping 心跳事件时触发
- error 连接发生错误时执行

#### 3-5-2. ws Api

- send() 向客户段发送数据(二进制数据流|字符串)
- ping() 心跳机制方法 用于检测服务段和客户端是否断开连接 此方法调用时 会执行pong事件
- close() 关闭客户端和服务端之间的连接


#### 3-5-3. wss 事件

- connection 当有新用户连接时触发

#### 3-5-4. wss 属性
- clients 所有连接用户的集合

##  4. 客户端

index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="text" placeholder="输入内容" />
    <button class="connectBtn">和后端的websocket建立连接</button>
    <button class="sendBtn">向后端的websocket发送消息</button>
    <button class="deconnectBtn">断开和后端websocket的连接</button>
    <div class="content"></div>
    <script>
      let connectBtn = document.querySelector(".connectBtn");
      let sendBtn = document.querySelector(".sendBtn");
      let deconnectBtn = document.querySelector(".deconnectBtn");
      let input = document.querySelector("input");
      let div = document.querySelector(".content");

      let websocket = null;

      connectBtn.onclick = function (e) {
        // 点击按钮，和 websocket 服务建立连接
        // WebSocket() 这个类就是 h5 给我们提供的 用于操作 websocket 的 API.
        // 参数：表示和哪一个 websocket 服务进行连接。要和 localhost:3000 这个 服务连接，ws:是固定的。
        websocket = new WebSocket("ws:localhost:3000");

        // 客户端的 websocket 监听消息事件，当有服务端的消息时，自动触发这个事件。
        websocket.onmessage = function (e) {
          div.innerHTML += `<span>${e.data}</span><br/>`;
        };

        // 客户端监听 websocket 的断开事件
        websocket.onclose = function (e) {
          input.value = "";
          div.innerText = "";
        };
      };

      deconnectBtn.onclick = function (e) {
        if (!websocket) {
          alert("先建立连接");
          return;
        }
        // 点击按钮，断开和 websocket 服务的连接
        websocket.close();
      };

      sendBtn.onclick = function (e) {
        if (!websocket) {
          alert("先建立连接");
          return;
        }
        // 发送字符串
        websocket.send(
          JSON.stringify({ name: "张三", age: 20, input: input.value })
        );
      };
    </script>
  </body>
</html>

```

### 4-1. 连接步骤

#### 4-1-1.创建ws 对象
WebSocket
+ 参数一：要连接的 URL；这应该是 WebSocket 服务器将响应的 URL。
+ 参数二：一个协议字符串或者一个包含协议字符串的数组。这些字符串用于指定子协议，这样单个服务器可以实现多个 WebSocket 子协议（例如，您可能希望一台服务器能够根据指定的协议（protocol）处理不同类型的交互）。如果不指定协议字符串，则假定为空字符串。

```js
websocket = new WebSocket("ws:localhost:3000");
```

建立连接以后的WebSocket实例对象（即上面代码中的websocket），有一个readyState属性，表示目前的状态，可以取4个值：

0： 正在连接
1： 连接成功
2： 正在关闭
3： 连接关闭

握手协议成功以后，readyState就从0变为1，并触发open事件，这时就可以向服务器发送信息了。我们可以指定open事件的回调函数。

#### 4-1-2. 发送数据
onopen 当连接完成时触发
```js
websocket.onopen = ()=>{
    websocket.send() // 用于向服务端发送数据（二进制数据流｜字符串）
}
```


#### 4-1-3. 接受数据
onmessage 当接收到服务端的数据时触发
```js
websocket.onmessage = (e)=>{
    consloe.log(e.data) // 接受到的数据
}
```
#### 4-1-4. 关闭事件
onclose

#### 4-1-4. 连接错误事件
onerror

#### 4-1-5. api 方法
+ send() 发送数据
+ close() 关闭连接


## 5. 心跳机制

WebSocket为了保持客户端、服务端的实时双向通信，需要确保客户端、服务端之间的TCP通道保持连接没有断开。然而，对于长时间没有数据往来的连接，如果依旧长时间保持着，可能会浪费包括的连接资源。

但不排除有些场景，客户端、服务端虽然长时间没有数据往来，但仍需要保持连接。这个时候，可以采用心跳来实现。

+ 发送方->接收方：ping
+ 接收方->发送方：pong

ws 代码
```
ws.ping('ping');
ws.on('pong',(e)=>{
    console.log(e)
})
```



[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)