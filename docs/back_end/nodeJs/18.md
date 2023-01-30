# 18 【Koa基本使用】

## 1.简介

![image-20221231151037428](https://i0.hdslb.com/bfs/album/143d174518b6a8dc724b126198b11f07fdac90f7.png)

koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升错误处理的效率。koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

## 2.快速开始

### 2.1 安装koa2

```bash
# 初始化package.json
npm init

# 安装koa2 
npm install koa
```

### 2.2 hello world 代码

```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  ctx.body = 'hello koa2' //json数据
})

app.listen(3000)
```

![image-20220417092053231](https://i0.hdslb.com/bfs/album/4a42b285b99e5ea0050fa789b7d1ab84ae181862.png)

### 2.3 启动

```bash
node index.js
```

## 3. koa vs express

通常都会说 Koa 是洋葱模型，这重点在于中间件的设计。但是按照上面的分析，会发现 Express 也是类似的，不同的是Express 中间件机制使用了 Callback 实现，这样如果出现异步则可能会使你在执行顺序上感到困惑，因此如果我们想做接口耗时统计、错误处理 Koa 的这种中间件模式处理起来更方便些。最后一点响应机制也很重要，Koa 不是立即响应，是整个中间件处理完成在最外层进行了响应，而 Express 则是立即响应。

### 3.1更轻量

- koa 不提供内置的中间件；
- koa 不提供路由，而是把路由这个库分离出来了（koa/router）

### 3.2 Context对象

koa增加了一个Context的对象，作为这次请求的上下文对象（在koa2中作为中间件的第一个参数传入）。同时Context上也挂载了Request和Response两个对象。和Express类似，这两个对象都提供了大量的便捷方法辅助开发, 这样的话对于在保存一些公有的参数的话变得更加合情合理

### 3.3 异步流程控制

​    express采用callback来处理异步，    koa v1采用generator，koa v2 采用async/await。

​	generator和async/await使用同步的写法来处理异步，明显好于callback和promise，

### 3.4 中间件模型

​	express基于connect中间件，线性模型；

​     koa中间件采用洋葱模型（对于每个中间件，在完成了一些事情后，可以非常优雅的将控制权传递给下一个中间件，并能够等待它完成，当后续的中间件完成处理后，控制权又回到了自己）

<img src="https://i0.hdslb.com/bfs/album/6cf0381ffebbfe885585a711b1027d1caa9db1b8.png" alt="image-20220417083817823" style="zoom:50%;float:left;" />

   ![image-20220417085913567](https://i0.hdslb.com/bfs/album/1de2bd02f891fae61b8ec9ec032cf14f29b65735.png)

```js
//同步
var express = require("express")
var app = express()

app.use((req,res,next)=>{
    console.log(1)
    next()
    console.log(4)
    res.send("hello")
})
app.use(()=>{
    console.log(3)
})

app.listen(3000)

//异步
var express = require("express")
var app = express()

app.use(async (req,res,next)=>{
    console.log(1)
    await next()
    console.log(4)
    res.send("hello")
})
app.use(async ()=>{
    console.log(2)
    await delay(1)
    console.log(3)
})

function delay(time){
 return new Promise((resolve,reject)=>{
    setTimeout(resolve,1000)
 })
}
```

```js
//同步
var koa = require("koa")
var app = new koa()

app.use((ctx,next)=>{
    console.log(1)
    next()
    console.log(4)
    ctx.body="hello"
})
app.use(()=>{
    console.log(3)
})

app.listen(3000)

//异步
var koa = require("koa")
var app = new koa()

app.use(async (ctx,next)=>{
    console.log(1)
    await next()
    console.log(4)
    ctx.body="hello"
}) 
app.use(async ()=>{
    console.log(2)
    await delay(1)
    console.log(3)
})

function delay(time){
 return new Promise((resolve,reject)=>{
    setTimeout(resolve,1000)
 })
}

app.listen(3000)
```

 ## 4. 路由

### 4.1基本用发

```js
var Koa = require("koa")
var Router = require("koa-router")

var app = new Koa()
var router = new Router()

router.post("/list",(ctx)=>{
    ctx.body=["111","222","333"]
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
```

### 4.2 router.allowedMethods作用

![image-20220417102845079](https://i0.hdslb.com/bfs/album/354a30b8f46c9a20669beddbf29494a46e25be87.png)

### 4.3 请求方式

Koa-router 请求方式： `get` 、 `put` 、 `post` 、 `patch` 、 `delete` 、 `del`  ，而使用方法就是 `router.方式()`  ，比如 `router.get()` 和 `router.post()` 。而 `router.all()` 会匹配所有的请求方法。

```js
var Koa = require("koa")
var Router = require("koa-router")

var app = new Koa()
var router = new Router()

router.get("/user",(ctx)=>{
    ctx.body=["aaa","bbb","ccc"]
})
.put("/user/:id",(ctx)=>{
    ctx.body={ok:1,info:"user update"}
})
.post("/user",(ctx)=>{
    ctx.body={ok:1,info:"user post"}
})
.del("/user/:id",(ctx)=>{
    ctx.body={ok:1,info:"user del"}
})


app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
```

### 4.4 拆分路由

`routes/list.js`

```js
var Router = require("koa-router")
var router = new Router()
router.get("/",(ctx)=>{
    ctx.body=["111","222","333"]
})
.put("/:id",(ctx)=>{
    ctx.body={ok:1,info:"list update"}
})
.post("/",(ctx)=>{
    ctx.body={ok:1,info:"list post"}
})
.del("/:id",(ctx)=>{
    ctx.body={ok:1,info:"list del"}
})
module.exports = router
```

`routes/index.js`

```js
var Router = require("koa-router")
var user = require("./user")
var list = require("./list")

var router = new Router()

router.use('/user', user.routes(), user.allowedMethods())
router.use('/list', list.routes(), list.allowedMethods())

module.exports = router
```

entry入口

```js
var Koa = require("koa")
var router = require("./routes")

var app = new Koa()
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
```

### 4.5 路由前缀

```js
router.prefix('/api')
router.use('/user', user.routes(), user.allowedMethods())
```

### 4.6 路由重定向

```js
router.get("/home",(ctx)=>{
    ctx.body="home页面"
})

//写法1 
router.redirect('/', '/home'); //匹配到/重定向到/home
//写法2
router.get("/",(ctx, next)=>{
    ctx.redirect("/home")
})
```

## 5. 静态资源

```js
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

app.use(static(path.join( __dirname,  "public")))

app.use( async ( ctx ) => {
  ctx.body = 'hello world'
})

app.listen(3000)
```

## 6.  获取请求参数

### 6.1 get参数

在koa中，获取GET请求数据源头是koa中request对象中的`query`方法或`querystring`方法。

query返回是格式化好的参数对象，querystring返回的是请求字符串，由于ctx对request的API有直接引用的方式，所以获取GET请求数据有两个途径。

- 从上下文中直接获取 请求对象ctx.query，返回如 { a:1, b:2 } 请求字符串 ctx.querystring，返回如 a=1&b=2
- 从上下文的request对象中获取 请求对象ctx.request.query，返回如 { a:1, b:2 } 请求字符串 ctx.request.querystring，返回如 a=1&b=2

### 6.2 post参数

对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中

```js
const bodyParser = require('koa-bodyparser')

// 使用ctx.body解析中间件
app.use(bodyParser())
```

## 7. ejs模板

### 7.1 安装模块

```bash
# 安装koa模板使用中间件
npm install --save koa-views

# 安装ejs模板引擎
npm install --save ejs
```

### 7.2 使用模板引擎

**文件目录**

```
├── package.json
├── index.js
└── view
    └── index.ejs
```

**./index.js文件**

```js
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa2'
  await ctx.render('index', {
    title: 'hello world',
  })
})

app.listen(3000)
```

**./view/index.ejs 模板**

```ejs
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <p>EJS Welcome to <%= title %></p>
</body>
</html>
```

## 8. cookie&session

### 8.1 cookie

koa提供了从上下文直接读取、写入cookie的方法

- ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
- ctx.cookies.set(name, value, [options]) 在上下文中写入cookie

### 8.2 session

- koa-session-minimal 适用于koa2 的session中间件，提供存储介质的读写接口 。

  ```js
  const session = require('koa-session-minimal')
  
  app.use(session({
      key: 'SESSION_ID',
      cookie: {
          maxAge:1000*60
      }
  }))
  ```

  ```js
  app.use(async (ctx, next) => {
      //排除login相关的路由和接口
      if (ctx.url.includes("login")) {
          await next()
          return
      }
  
      if (ctx.session.user) {
          //重新设置sesssion
          ctx.session.mydate = Date.now()
          await next()
      } else {
          ctx.redirect("/login")
      }
  })
  ```

## 9.图片上传

### 9.1 环境

- koa：用来起一个web服务器
- koa2-cors: 解决跨域问题
- koa-router: koa的路由处理
- koa-body： koa参数的获取
- koa-static: 静态资源配置
- @koa/multer和multer:图片上传的插件

### 9.2 代码结构

![image-20221231153921717](https://i0.hdslb.com/bfs/album/b515b2432db01bacbb93fe52c1dd02a6211cdbea.png)

### 9.3 实现

1. 第一步:用koa+koa-router搭建一个简单的web服务

```js
//main.js
const Koa = require('koa') // 引入koa
const Router = require('koa-router') // 引入koa-router
const { koaBody } = require('koa-body');

var router = new Router()

router.get('/', async (ctx) => {
    ctx.type = 'html'
    ctx.body = '<h1>hello world!</h1>'
}).post('/upload', async (ctx) => {
    ctx.body = 'ok'
})

app.use(koaBody())
   .use(router.routes())
   .use(router.allowedMethods())
    

app.listen(3000)
```

现在我们就可以打开[http://localhost:3000看到](https://link.juejin.cn?target=http%3A%2F%2Flocalhost%3A3000%E7%9C%8B%E5%88%B0) **hello world**

2. 接着我们新建一个upload文件夹,且在代码中加入静态内容的的代码

```js
//mian.js 新增代码
const static = require('koa-static')
const path = require('path')

app.use(router.routes())
    .use(router.allowedMethods())
    .use(static(path.join(__dirname, './upload')))
```

此时假如你在upload文件夹下新增一张照片便可通过[http://localhost:3000/***.png](https://link.juejin.cn?target=http%3A%2F%2Flocalhost%3A3000%2F***.png) 查看到了。（***：你自己新增的照片名称加后缀）

3. 此时新增一个index.html文件，且加入以下代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <input type="file" class="file" name="avatar">
  <button onclick="send()">上传</button>
  
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
    let formData = new FormData()
    
    document.querySelector('.file').addEventListener('change', function(e) {
          let files = e.target.files
          console.log(files)
          if (!files.length) return
          formData.append('file', files[0], files[0].name)
        })
    
        function send(){
          axios.post('http://localhost:3000/upload',formData,{
            Headers:{
              "Content-type":"multipart/form-data"
            }
          })
        }
  </script>
</body>
</html>
```

选择图片且上传会发现存在跨域问题，那么发现问题解决问题直接上代码：

```js
//mian.js新增代码
const cors = require('koa2-cors')

//注意这个配置要在router前使用不然不生效
app.use(cors())
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(static(path.join(__dirname, './upload')) )
```

解决完跨域后,选择图片且上传，此时咱们已经拿到传过来的数据啦，重头戏来了：@koa/multer使用

```js
const multer = require('@koa/multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        const fileFormat = (file.originalname).split('.')
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})
const upload = multer({ storage })
```

配置好后修改/upload

```js
router.post('/upload', upload.single('file'), async (ctx) => {
    console.log('ctx.file',  ctx.file)
})
```

`note:需要注意的是upload.single('file'),中的file需要和上方的index.html中的formData字段一致` 此时就可以愉快的上传啦~~~

## 10.记录日志

```js
const Koa = require('koa')
const Router = require('koa-router')
// 引入 koa-logger
const logger = require('koa-logger')

const app = new Koa()
const router = new Router()
// 使用 koa-logger 中间件
app.use(logger((str, args) => {
  // console.log(str);
  // console.log(args);
}))

router.get('/', ctx => {
  ctx.body = '首页'
})

// 使用路由中间件
app.use(router.routes())

app.listen(3000, () => {
  console.log('listen 3000 ok');
})
```

- 在注册 koa-logger  中间件时可以传递一个函数，该函数有2个参数
-  str 是一个字符串类型，在发生请求时 str 包含 请求类型、请求路径信息，在发生响应时 str 包含 响应状态码、响应时长、响应文件大小信息。
-  args 是一个数组类型，在发生请求时会将请求类型、请求路径放在该数组中，在发生响应时会将响应状态码、响应时长、响应文件大小信息放入该数组中