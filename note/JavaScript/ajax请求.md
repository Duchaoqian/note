# Ajax

## 1. 简介

Ajax（ Asynchronous JavaScript and XML）即异步的 JavaScript 和 XML，是一种无需重新加载整个网页的情况下与服务器交换数据并局部更新网页的技术（即局部刷新）。

> 注意：Ajax 并不是编程语言，而是一些旧有的成熟的技术以一种全新的更加强大的方式整合在一起；传统技术刷新是重新加载整个网页的。

#### 应用场景

- 场景 1. 数据验证
- 场景 2. 按需取数据
- 场景 3. 自动更新页面

## 2. 工作原理

Ajax 的工作原理相当于在用户和服务器之间加了一个中间层（Ajax引擎），使用户操作与服务器响应异步化。并不是所有的用户请求都提交给服务器，像—些数据验证（比如判断用户是否输入了数据）和数据处理（比如判断用户输入数据是否是数字）等都可以在浏览器端提前做，当数据满足要求时，载交给 Ajax 引擎进行请求提交，只有确定需要从服务器读取新数据时再由 Ajax 引擎代为向服务器提交请求。把这些交给了 Ajax 引擎，用户操作起来也就感觉更加流畅了。

Ajax 应用通过在用户和服务器之间引入一个媒介（Ajax engine）来异步发送请求，消除了传统的发送请求－等待－发送请求－等待的特性，极大的提高了用户体验。

![image](https://note.youdao.com/yws/public/resource/62324a67423d291305c7acbd12be6b04/xmlnote/42331BF0445642CB8C84E30C720F62E8/17229)

## 3. 优缺点

在 Ajax 出现之前，如果用户需要将更新的服务器数据显示在页面上，每次更新都需要向服务器请求一个新的完整的页面，从而增加了用户等待的时间，使得交互过程变得繁琐而缓慢。并且页面没有发生变化的部分也在重复的请求和响应，对用户来说，这些成为不必要的数据传输，浪费网络流量，对服务器来说，这些都是冗余的请求，增加服务器负担，降低服务器性能。

### 3.1 优点

当使用 Ajax 技术之后，上述的问题都可以被解决。

- 页面无刷新更新数据

通过 Ajax 只需要向服务器请求自己需要的数据即可，并且在得到响应时可以通过 DOM 操作只修改需要更新的页面部分即可。

- 前端和后端负载平衡，减少冗余请求，减轻了服务器负担

Ajax 的原则是“按需取数据”，那么不需要变化的部分不会再出现在请求部分中，就减少了请求的数量和请求数据的大小同时，Ajax 也可以原本一些服务端的负担转接的客户端，如数据请求前的格式检查，数据获取后的页面展示（DOM 操作等），从而减轻了服务器负担，服务器响应的时间也会大大加快。

- 异步通信，更加快的响应能力

Ajax 使用异步方式与服务器通信。用户无需在数据传输时等待，数据传输也不会打断用户的操作，当浏览器接收到服务器数据响应时，会自动进行页面信息更新，让用户能够感受到页面更加流畅迅速的响应能力。

- 基于标准化的并被广泛支持的技术，不需要下载插件或者小程序

Ajax 基于标准化的并被广泛支持的技术，只需要用户使用能够允许 JavaScript 执行的浏览器即可，不需要额外下载插件或者安装小程序，没有任何的使用成本。对于开发者来说，浏览器统一的标准和实现，能够大大的简化开发流程。

- 界面与应用分离

Ajax 使 WEB 中的界面与应用分离（也可以说是数据与呈现分离），有利于分工合作、减少非技术人员对页面的修改造成的 WEB 应用程序错误、提高效率、也更加适用于现在的发布系统。

### 3.2 缺点

- 对浏览器历史记录机制的破坏

在使用 Ajax 更新页面效果后，浏览器展示的仍是当前页面，没有发生页面的跳转，浏览器历史记录中是不会有新纪录产生的。但是用户是不知道究竟是 Ajax 修改了页面还是跳转了新页面，当需要后退操作时，会习惯性的点击浏览器后退按钮，于是就返回了浏览器历史中的上一页，而不是页面的上一个状态。所以，对于用户体验来说了，Ajax 改变了历史记录操作按钮原本的效果

- 存在一定的安全问题

当使用 Ajax 时，是客户端与服务器进行直接的数据交换，会在不经意间暴露数据交换的格式、内容及服务器数据处理逻辑，从而显示更多的漏洞允许黑客进行攻击。一些已知的安全弱点，诸如跨站点脚本攻击、SQL 注入攻击和基于 Credentials 的安全漏洞等等也是难以避免的。

- 对搜索引擎的支持比较弱

当搜索引擎找到开发的页面，对页面的内容进行收录时，是不会执行页面中的 js 代码的。如果页面的很多内容都是由 Ajax 方式获取，那么新增的内容搜索引擎是无法获取的。

- 破坏了程序的异常机制
- 无法用 URL 直接访问，违背 URL 与资源定位的初衷

## 4. 创建 Ajax 的步骤

标准浏览器通过内置 XMLHttpRequest 对象实现了 Ajax 的功能。

Ajax 的原理简单来说通过 XMLHttpRequest 对象来向服务器发异步请求，从服务器获得数据，然后用 js 来操作 DOM 从而更新页面。这其中最关键的一步就是从服务器获得请求数据。

原生创建 Ajax 可分为以下四步（下以发送 GET 请求为例）：

### 4.1 创建 XMLHttpRequest 对象

XMLHttpRequest 为 js 内置构造函数，创建对应实例即可

```js
var xhr = new XMLHttpRequest();
```

### 4.2 初始化请求

通过实例调用 open 方法配置请求方法 method、请求路径 url、及请求参数，及确定使用同步还是异步的方式发起请求

```js
xhr.open('GET', '/get?word=ajax&page=1')
```

### 4.3 发送请求

通过实例调用 send 方法即可真正发起请求。

```js
xhr.send();
```

### 4.4 处理响应

通过响应状态监听函数 onreadystatechange，查看进度状态码 readyState 的值及服务响应状态码的值，最终通过实例的 responseText 属性获得字符串形式的响应数据

```js
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        console.log(xhr.responseText);
        // DOM 操作...
    }
}
```

## 5. XMLHttpRequest 对象

XMLHttpRequest 对象是整个 Ajax 技术的核心。XMLHttpRequest 用于在后台与服务器交换数据，能对网页进行局部刷新。

Ajax 技术赖以生存的核心就是：异步发送请求，使用 XMLHttpRequest 对象与服务器异步通信。

### 5.1 浏览器兼容性

由于在部分 IE 浏览器中是以 ActiveXObject 方式实现 Ajax。所以，全平台兼容的 XMLHttpRequest 对象可以由如下方式获取：

```js
function getXHR(){
    var xhr = null;
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) { 
                alert("您的浏览器暂不支持Ajax!");
            }
        }
    }
    return xhr;
}
```
### 5.2 XMLHttpRequest 对象的属性、方法和事件

#### 5.2.1 属性

##### 5.2.1.1 responseType 和 response

responseType 是枚举类型属性，用于定义可以接收的响应数据的类型。**responseType 的设置要在调用 open() 初始化请求之后， 并且要在调用 send() 发送请求到服务器之前。**

当将 responseType 设置为一个特定的类型时，需要确保服务器所返回的类型和所设置的返回值类型是兼容的。所谓兼容，就是返回的数据可以按照指定的格式进行正常转换。那么如果两者类型不兼容，浏览器在处理服务器返回的数据就会将数据变成 null，从而无法正常获取。

response 的值是一个对象，其类型取决于 responseType 设置的值。

responseType 支持以下几种值，用于控制 response 中数据的格式：

值 | 描述
---|---
''（空字符串） | 与设置为 “text” 相同，是默认类型（实际上是 DOMString）
text | response 是包含在 DOMString 对象中的文本。即数据传输过程中的编码格式字符串。
json | response 是一个 JavaScript 对象。这个对象是通过将接收到的数据类型视为 JSON 解析得到的。
arraybuffer | response 是一个包含二进制数据的 JavaScript ArrayBuffer。
blob | response 是一个包含二进制数据的 Blob 对象。
document | response 是一个 HTML Document 或 XML XMLDocument，这取决于接收到的数据的 MIME 类型。

> 使用 arraybuffer（二进制数组）时一般与 WebGL 项目有关。所谓 WebGL，就是指浏览器与显卡之间的通信接口，为了满足 JavaScript 与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的，而不能是传统的文本格式。传统的文本格式在 JS 脚本发送端和显卡接收端都要额外的进行格式转化，是非常耗时的。

> Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是 JavaScript 原生格式的数据。一般可以认为是一个文件。

##### 5.2.1.2 responseText

responseText 属性作用于 response 属性相似，都是用于获取服务器返回的数据，是 response 的文本形式结果。

但是，只有当 responseType 的值设置为 '' 或者 text 时，responseText 才允许被使用获取对应的值。

**responseText 和 response 的差别：**

HTTP 规范中规定了一个 Content-type 头，用来指明数据主体的格式，来告诉收发的两端将二进制的数据主体按照什么类型进行解析。而这两个接口（response 和 responseText），其实只是提供了一些便捷的接口，配合 responseType，方便用户获取到解析好的响应，省去手动解析响应主体的步骤。

通过 Content-type 指定不同的 Mime type（数据类型），则数据传输时编码和解码的方式是不同的：

- 若 Content-type 的值设置为 text/plain（即普通的文本），那么接收的数据就是编码好的字串（DOMString 格式），这两个接口上都可以直接读取，且结果一致
- 若 Content-type 的值设置为 application/json（即 json），传输格式是序列化后的 json 字符串。前端接收到数据时，可以直接通过 responseText 属性获取 json 字符串，然后自行转换为 json 对象；也可以手动指定 responseType 值为 json，然后在 response 上直接获取解析好的 json 对象
- 若 Content-type 的值设置为 text/html（即 document 类型），如果指定好了 responseType 的值为 document，那么在  responseText 中可以获取到 html 文本，response 中却可以获取到解析好的 DOM 对象
- 对于其他数据，比如媒体类型如视频，音频（即 Blob），普通二进制流（即 arraybuffer），由于二进制数据无法按照 DOMString 格式进行解析，那么在 responseText 中 获取值就是乱码。但是如果指定 responseType 为 blob 或者 arraybuffer，那么就可以直接在 response 上获取到 Blob 对象或者 arraybuffer 数组，然后就通过对应的工具进行解析处理使用了。

##### 5.2.1.3 responseXML

responseXML 属性是一个只读值，它返回一个包含请求检索的 HTML 或 XML 的 Document。默认将返回的数据是当作 “text/xml” 来解析。当 responseType 设置为 document 并且请求已异步执行时，也会将数据当作 “text/xml” 来解析。若数据无法正确解析为 XML 或 HTML，则为 null。

> 如果服务器没有明确指出 Content-Type 头是 "text/xml" 还是 "application/xml", 你可以使用 xhr.overrideMimeType() 强制 xhr 解析为 XML

##### 5.2.1.4 responseURL

只读属性，xhr.responseURL 返回响应的序列化 URL，如果 URL 为空则返回空字符串。如果 URL 有锚点，则位于 URL # 后面的内容会被删除。如果 URL 有重定向， responseURL 的值会是经过多次重定向后的最终 URL。简单的说，就是响应本次请求的 URL 值。

##### 5.2.1.5 readyState

只读属性，记录了 Ajax 调用过程中所有可能的状态。

值 | 状态常量 | 状态描述
---|---|---
0 | UNSENT | 初始化状态。XMLHttpRequest 代理请求对象已被创建，但未调用 open 方法；或对象已被 abort() 方法重置
1 | OPENED | open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。在这个状态中可以通过 setRequestHeader() 方法来设置请求的头部
2 | HEADERS_RECEIVED | send() 方法已调用，HTTP 请求已发送到 Web 服务器，并且响应头已经被接收，响应状态也可以被获取
3 | LOADING | 下载中，响应体部分正在被接收。
4 | DONE | 请求操作已经完成，HTTP 响应以完全被。这意味着数据传输已经彻底完成或失败。 

readyState 的值不会递减，除非当一个请求在处理过程中的时候调用了 abort() 或 open() 方法。每次这个属性的值增加的时候，都会触发 onreadystatechange 事件句柄。

##### 5.2.1.6 onreadystatechange

只要 readyState 属性发生变化，就会调用相应的处理函数。这个回调函数会被用户线程所调用。在一个收到响应的 Ajax 请求周期中, onreadystatechange 方法会被触发 4 次。但是，当一个 XMLHttpRequest 请求被 abort() 方法取消时，其对应的 readystatechange 事件不会被触发。

```js
xhr.onreadystatechange = function (e) {
    if(xhr.readyState === 4) {
        console.log(e.type);  //  readystatechange
        // 响应结束操作...
    }
}
```

##### 5.2.1.7 timeout

timeout 超时属性是一个无符号长整型数，代表着一个请求在被自动终止前所消耗的毫秒数。默认值为 0，意味着没有超时限制。当请求等待实测超出超时限定，超时发生， timeout 事件将会被触发。

超时属性要在调用 open() 方法之后且在调用 send() 方法之前设置。

##### 5.2.1.8 status

只读属性，表示 http 响应中的数字状态码。在请求完成前，status 的值为 0。如果 XMLHttpRequest 出错，浏览器返回的 status 也为 0。如果服务器没有显式地指定状态码，那么 status 将被设置为默认值，即 200。

##### 5.2.1.9 **statusText**

只读属性，用于获取请求中由服务器返回的一个 DOMString 类型的文本信息，例如 “OK” 或是 “Not Found”，这则信息中也包含了响应的数字状态码。

如果请求的状态 readyState 的值为 “UNSENT” 或者 “OPENED”，则这个属性的值将会是一个空字符串。如果服务器未明确指定一个状态文本信息，则statusText的值将会被自动赋值为"OK"。

##### 5.2.1.10 **upload**

upload 属性返回一个 XMLHttpRequestUpload 对象，用来表示上传的进度。可以通过自身的事件来追踪进度。事件类型种类与下载的事件类型相同。

##### 5.2.1.11 **withCredentials**

用于控制一个跨域访问请求是否允许携带 cookie 等其它客户端证书。属性值为布尔值，默认为 false，即进行跨域请求无法携带 cookie 等客户端证书。如果不打开此属性，浏览器发送请求时不会携带 cookie；并且，如果服务器要求设置 cookie，浏览器也不会处理。

> 同站点访问请求设置此属性无效

#### 5.2.2 方法

##### 5.2.2.1 abort()

如果请求已被发出，可以通过 abort() 方法终止该请求。当一个请求被终止，该 xhr 的 readyState 属性将被置为 4。

##### 5.2.2.2 getAllResponseHeaders()

获取返回所有的响应头，结果为以 CRLF（回车符和换行符）分割格式的字符串。

若要获取单独的响应头的值，需要对字符串做以下方式处理拆解为对象：

```js
var headers = request.getAllResponseHeaders();
var arr = headers.trim().split(/[\r\n]+/);
var headerMap = {};
arr.forEach(function (line) {
    var parts = line.split(': ');
    var header = parts.shift();
    var value = parts.join(': ');
    headerMap[header] = value;
});
```
##### 5.2.2.3 getResponseHeader()

返回包含指定响应头的字符串，如果响应尚未收到或响应中不存在该报头，则返回 null。

##### 5.2.2.4 open()

作用为初始化一个请求。用于设置请求方法，请求地址等信息。

语法：

```js
xhr.open(method, url, async, user, password);
```
open 方法需要 5 个参数：

- method：需要使用的请求方法
- url：要向其发送请求的 URL 地址
- async：一个可选的布尔参数，默认为 true，表示是否执行异步操作。如果值为 false，send() 方法直到收到答复前不会返回。如果 true，已完成事务的通知可供事件监听器使用。如果 multipart 属性为 true 则这个必须 为true，否则将引发异常
- user：可选的用户名用于认证用途；默认为null
- password：可选的密码用于认证用途，默认为null

##### 5.2.2.5 overrideMimeType()

指定一个 MIME 类型用于替代服务器指定的类型，使服务端响应信息中传输的数据按照该指定 MIME 类型处理。在 response 属性中获取处理后的结果。如果服务器没有指定类型，那么 xhr 将会默认按照 “text/xml” 格式进行处理。

##### 5.2.2.6 send()

用于发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才会返回。xhr.send() 方法接受一个可选的参数，其作为请求主体；如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null。

如果没有使用 setRequestHeader() 方法设置 Accept 头部信息，则会发送带有 “\*/\*” 的 Accept 头部。

##### 5.2.2.7 setRequestHeader()

用于设置 HTTP 请求头部的方法。此方法必须在 open() 方法和 send()   之间调用。如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。

#### 5.2.3 事件

以下事件类型，针对 xhr 实例可以使用 on + type 的方式添加事件函数，也可以使用 addEventListener 方式

##### 5.2.3.1 load

请求完成的时候会触发 load 事件。

##### 5.2.3.2 loadstart

当开始接收到响应数据时触发。

##### 5.2.3.3 loadend

当请求结束时触发, 无论请求成功（load）还是失败（abort 或 error）。

##### 5.2.3.4 progress

在开始接受数据后，并且接收完成前周期性触发。

在事件对象中有以下两个属性可以获取数据接收进度：

- event.loaded：在周期性调用中已经接受到了多少数据
- event.total：该请求共需接收多少数据

##### 5.2.3.5 abort

当一个请求终止时 abort 事件被触发，如执行 abort() 方法。

##### 5.2.3.6 timeout

在预设超时时间（timeout 属性的值）内没有接收到响应时触发。

##### 5.2.3.7 error

当请求遇到错误时，将触发 error 事件。

---

#### 参考文档

- [Ajax总结篇](https://www.jianshu.com/p/c94e49772123)
- [Ajax 知识体系大梳理](https://juejin.im/post/58c883ecb123db005311861a)
- [Ajax入门](https://juejin.im/post/587f8dbd570c3522011c0f59)
- [MDN XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)