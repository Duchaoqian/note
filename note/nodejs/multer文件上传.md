# multer 文件上传系统在express中的使用


+ Multer 是一个node.js中间件，用于处理 multipart/form-data类型的表单数据，主要用于上传文件。
+ 在form表单上要加上 enctype=“multipart/form-data” 的属性。
+ Multer 不会处理任何非 multipart/form-data 类型的表单数据。


## 1. 安装multer

```shell
npm install multer
```

## 2. 基础使用 

服务端代码
```js
// 导入multer 文件上传系统模块
const multer=require("multer");

// 文件上传系统配置
const upload = multer({
  dest: "public/images",// 指定上传文件地址
});

...

app.post("/upload/single", upload.single("img"), function (req, res) {
    console.log(req.file)
    ...
    if (req.file) {
      res.send("文件上传成功")
    } else {
      res.send("上传失败");
    }
    
})

```

客户端代码
    
+ form 表单上传文件

```html
<!--在form表单上要加上 enctype=“multipart/form-data” 的属性-->
 <form action="/upload" method="post" enctype="multipart/form-data">
  <label for="">
    图片上传
    <!--accept 用于指定上传文件类型 -->
    <input type="file" accept="image/png,image/jpg,text/html" name="img" />
  </label>
  <br />
  <input type="submit" value="上传" />
</form>
```

+ ajax 上传文件

```html
<!--在form表单上要加上 enctype=“multipart/form-data” 的属性-->
 <form action="/upload" method="post" enctype="multipart/form-data">
  <label for="">
    图片上传
    <!--accept 用于指定上传文件类型 -->
    <input type="file" accept="image/png,image/jpg,text/html" name="img" />
  </label>
  <br />
  <input type="submit" value="上传" />
</form>


<script>
    var form = document.querySelector('form');
    form.onsubmit = function (e) {
        e.preventDefault();

        // 使用 formData 数据格式上传文件
        // 构造函数生成的结果就是 multipart/form-data 格式的数据
        // 不仅能包含文件信息，也能包含普通的文本信息
        // 并且收集提交数据时也非常的方便
        var data = new FormData(form);
        // 只需要将用于收集用户信息的表单标签作为 FormData 的参数即可。
        // 他只会收集包含有 name 属性的 input 标签的值

        // 也可以使用自带的方法去完善要提交的数据，比如 额外的添加，去除不必要的数据
        data.append('title', '这是一个头像');

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload');
        xhr.responseType = 'json';
        xhr.send(data);

        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                console.log("上传成功")
                ...
            }
        }
    }
</script>
  
```

## 3. multer(options) 配置项

Multer 接受一个 options 对象，其中最基本的是 dest 属性，这将告诉 Multer 将上传文件保存在哪。如果省略 options 对象，这些文件将保存在内存中，永远不会写入磁盘，options 配置如下：

|   属性值      |   描述   |
|------------   |----------|
|dest or storage|在哪里存储文件    |
|limits         |限制上传数据的大小|
|fileFilter     |文件过滤器，控制哪些文件可以被接受|
|preservePath   |保存包含文件名的完整文件路径|


### 3.1 dest
指定上传文件的存储路径。文件名默认为随机字符
```js
const upload = multer({
    dest:"/public/images",
})
```

### 3.2 storage 存储引擎

***DiskStorage 磁盘存储引擎***

磁盘存储引擎可以让你控制文件的存储。有两个属性 

+ destination，指定文件存储的路径；

destination 是用来确定上传的文件应该存储在哪个文件夹中。也可以提供一个 string (例如 '/tmp/uploads')。如果没有设置 destination，则使用操作系统默认的临时文件夹。

**注意: 如果你提供的 destination 是一个函数，你需要负责创建文件夹。当提供一个字符串，multer 将确保这个文件夹是你创建的。**

```js
// 指定文件存储路径
var filePath = path.join(__dirname, "../public/img");

// 生成storage 对象
var storage = multer.diskStorage({
  destination: filePath,// 可以指定属性
});

var storage = multer.diskStorage({
    // 函数的形式
  destination: function (req, file, cb) {
      // 函数接收三个参数
      // req 请求报文
      // file 上传的文件属性对象
      // cb 回调函数
      // 回调函数参数信息
      // cb(错误信息,文件存储路径信息)
      cb(null, filePath)
  },
});

// 将生成的storage 对象传递给multer方法
let upload=multer({storage});
```


+ filename，指定文件的存储名称。

filename 用于确定文件夹中的文件名的确定。 如果没有设置 filename，每个文件将设置为一个随机文件名，并且是没有扩展名的。

**注意: Multer 不会为你添加任何扩展名，你的程序应该返回一个完整的文件名。**



```js
const multer=require("multer");
const path=require("path");

//获取绝对路径
var filePath = path.join(__dirname, "../public/img");

var storage = multer.diskStorage({
  destination: filePath,
  filename: function (req, file, cb) {
     // 函数接收三个参数
     // req 请求报文
     // file 上传的文件属性对象
     // cb 回调函数
     // 回调函数参数信息
     // cb(错误信息,文件存储路径信息)
     // 获取文件的后缀名
     var ext = path.extname(file.originalname);
     // 指定文件名及后缀
     cb(null, Math.floor(Math.random() * 90000 + 10000) + +new Date() + ext);
   },
});

let upload=multer({storage});
```

每个函数都传递了请求对象 (req) 和一些关于这个文件的信息 (file)，有助于你的决定。

**注意 req.body 可能还没有完全填充，这取决于向客户端发送字段和文件到服务器的顺序。**

### 3.3 limits
用来指定一些数据大小的限制，设置 limits 可以帮助保护你的站点抵御拒绝服务 (DoS) 攻击。

属性|	值类型|	默认值|	描述
----|---|----|-----
files         |	Number |	无限                 |  在 multipart 表单中，上传文件的最大数量
fileSize      |	Number |	无限                 |	上传时，每一个文件最大长度 (单位：bytes)
fields        |	Number |	无限                 | 	非文件 field 的最大数量（提交表单时，可以提交非文件的字段的数量）
fieldNameSize |	Number |	100 bytes            |	上传时，每一个 field 名字的最大长度
fieldSize     |	Number |	1048576 bytes，即1MB |	上传时，每一个 field 的最大长度
parts         |	Number |	无限                 |	在 multipart 表单中，part 传输的最大数量(fields + files)
headerPairs   |	Number |	2000                 |	在 multipart 表单中，键值对最大组数

```js
const multer = require("multer");
let upload = multer({
        ...
        limits:{
        	files:2, //最多上传2个文件
            fileSize:5120 //设置单个文件最大为 5kb
        }
    });
```

### 3.4 fileFilter
fileFilter 为一个函数，用来控制什么文件可以上传以及什么文件应该跳过。

```js
const multer = require("multer");
let upload = multer({
        ...
        fileFilter:function(req,file,cb){
            //通过调用回调函数,用boolean值来指示是否应接受该文件
            // cb(null, false);//不接收
            // cb(null, true);//接收
             
            var reg = /^image\/.*$/;
            // 只接受 图片 格式的文件
            if (reg.test(file.mimetype)) {
              cb(null, true);
            } else {
              cb(null, false);
            }
        }
    });
```

## 4. api 方法
### 4.1 single
接受一个名称为fieldname的文件。单个文件将存储在req.file中。

single有一个参数
1. 表单name属性值
```js
const multer = require("multer");
let upload = multer({
    dest:"/image",
})


app.post('/profile', upload.single('img'), function (req, res, next) {
  // req.file 是上传成功文件的信息对象
  // req.body 上传文件时所携带的其他文本表单数据
})

```

### 4.2 array
接受一个文件名都为fieldname的文件数组。如果上传的文件超过maxCount，可选地出错。文件数组将存储在req.files中。

array有两个参数
1. 表单name属性值
2. 最多上传文件的个数
```js
const multer = require("multer");
let upload = multer({
    dest:"/image",
})


app.post('/profile', upload.array('img',5), function (req, res, next) {
  // req.files 包含所有上传文件的信息对象
  // req.body 上传文件时所携带的其他文本表单数据
})

```

### 4.3 fields
接受指定 fields 的混合文件。这些文件的信息保存在 req.files。
fields 应该是一个对象数组，应该具有 name 和可选的 maxCount 属性。

single有两个参数
1. 表单name属性值
2. 最多上传文件的个数
```js
const multer = require("multer");
let upload = multer({
    dest:"/image",
})


app.post('/profile', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), function (req, res, next) {
  // req.files 包含所有上传文件的信息对象
  // req.body 上传文件时所携带的其他文本表单数据
})

```

### 4.4 none

只接受文本字段。如果上传任何文件，将发出代码为“LIMIT_UNEXPECTED_FILE”的错误。

### 4.5 any

接受通过网络传输的所有文件。文件数组将存储在req.files中。

**警告**:确保您总是处理用户上传的文件。永远不要添加multer作为全局中间件，因为恶意用户可能会将文件上传到你没有预料到的路由。只在处理上传文件的路由上使用这个函数。

