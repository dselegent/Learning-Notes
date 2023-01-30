# 11 【Express服务端渲染】

## 1.Express脚手架的安装

安装Express脚手架有两种方式：

### 1.1 使用express-generator安装

使用命令行进入项目目录，依次执行：

```bash
cnpm i -g express-generator
```

可通过express -h查看命令行的指令含义

```bash
express -h
```

```bash
Usage: express [options] [dir]
```

```bash
Options:
    --version        输出版本号
-e, --ejs            添加对 ejs 模板引擎的支持
    --pug            添加对 pug 模板引擎的支持
    --hbs            添加对 handlebars 模板引擎的支持
-H, --hogan          添加对 hogan.js 模板引擎的支持
-v, --view <engine>  添加对视图引擎（view） <engine> 的支持 (ejs|hbs|hjs|jade|pug|twig|vash) （默认是 jade 模板引擎）
    --no-view        创建不带视图引擎的项目
-c, --css <engine>   添加样式表引擎 <engine> 的支持 (less|stylus|compass|sass) （默认是普通的 css 文件）
    --git            添加 .gitignore
-f, --force          强制在非空目录下创建
-h, --help           输出使用方法
```

创建了一个名为 myapp 的 Express 应用，并使用ejs模板引擎

```bash
express --view=ejs myapp
```

进入app，并安装依赖

```bash
cd myapp
npm install
```

**在Windows 下，使用以下命令启Express应用：**

```bash
set DEBUG=app:* & npm start
```

**在 MacOS 或 Linux 下，使用以下命令启Express应用：**

```bash
DEBUG=app:* npm start
```

### 1.2 使用 express 命令 来快速从创建一个项目目录

express 项目文件夹的名字 -e 如 使用命令行进入项目目录，依次执行：

```bash
express app -e
cd app
cnpm install
```

这时，你也可以看到在app文件夹下的文件结构；

```bash
bin: 启动目录 里面包含了一个启动文件 www 默认监听端口是 3000 (直接node www执行即可)
node_modules：依赖的模块包
public：存放静态资源
routes：路由操作
views：存放ejs模板引擎
app.js：主文件
package.json：项目描述文件
```

第一个Express应用“Hello World”

在这里，我们不使用npm构建的脚手架，而是向最开始那样直接在主目录中新建一个app.js文件。

在app.js中输入

```js
const express = require('express');     //引入express模块
var app= express();     //express()是express模块顶级函数

app.get('/',function(req,res){      //访问根路径时输出hello world
    res.send(`<h1 style='color: blue'>hello world</h1>`);
});

app.listen(8080);       //设置访问端口号
```

命令行进入项目文件夹后，键入

```
npm run start/npm start
```

即已开启服务器，接下来只需在浏览器中运行 http://localhost:3000/ 就可以访问到服务器得到响应后的数据

## 2.模板引擎简介

相比于jade模板引擎，ejs对原HTML语言就未作出结构上的改变，只不过在其交互数据方面做出了些许修改，相比于jade更加简单易用。因此其学习成本是很低的。您也可参考ejs官网：https://ejs.bootcss.com/

![image-20220618170512237](https://tva1.sinaimg.cn/large/0074UQWJgy1h3eh73418lj30pf0ah0zy.jpg)

> 服务端渲染可以在源码中看到，客户端渲染不能再源码中看到

## 3.ejs基本使用

需要在应用中进行如下设置才能让 Express 渲染模板文件：

![image-20220618190604147](https://tva1.sinaimg.cn/large/0074UQWJgy1h3eh8z7bmwj307j0hmq5q.jpg)

这里我们使用如下配置文件：

可以通过下面的方式实现基本的ejs操作： app.js文件：

```js
const express=require("express");
const ejs=require("ejs");
const fs=require("fs");

var app=express();

//引用ejs
app.set('views',"./views");  //设置视图的对应目录
app.set("view engine","ejs");       //设置默认的模板引擎

app.get("/",function(req,res){
    res.render("index",{title: "<h4>express</h4>"});
    //会去找views目录下的index.ejs文件
});

app.listen(8080);
```

ejs文件：

```ejs
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <% for(var i=0;i<10;i++){ %>
            <%= i %>
        <% } %>
        <!-- 获取变量 -->
        <div class="datas">
            <p>获取变量：</p>
            <%- title %>
            <%= title %>
        </div>
    </body>
</html>
```

由此可以知道：

```ejs
<% xxx %>：里面写入的是js语法，
<%= xxx %>：里面是服务端发送给ejs模板转义后的变量，输出为原数据
<%- xxx %>：里面也是服务端发送给ejs模板后的变量，解析html
如果写html的注释，那样会在源码中显示，下面这种ejs注释不会在源码中显示
<%# 注释标签，不执行、不输出内容 %>
```

同理res.render()函数也是支持回调的：

```js
res.render('user', { name: 'Tobi' }, function(err, html) {
  console.log(html);
});
```

这样我们即可将看到html的内容。

**关于res.redirect()**

```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', {
    isShow: false,
    error: '',
  });
});

router.post('/', (req, res) => {
  if (req.body.username === 'ds' && req.body.password === '123') {
    console.log('登录成功');
    // res.send("成功")
    // 重定向到home
    res.redirect('/index');
  } else {
    console.log('登录失败');
    res.render('login', { error: '用户名密码不匹配', isShow: true });
  }
});

module.exports = router;

```

## 4.ejs 标签各种含义

```ejs
<% '脚本' 标签，用于流程控制，无输出。
<%_ 删除其前面的空格符
<%= 输出数据到模板（输出是转义 HTML 标签）
<%- 输出非转义的数据到模板
<%# 注释标签，不执行、不输出内容
<%% 输出字符串 '<%'
%> 一般结束标签
-%> 删除紧随其后的换行符
_%> 将结束标签后面的空格符删除
```

![image-20220618170943284](https://tva1.sinaimg.cn/large/0074UQWJgy1h3eh7h67twj30me05tads.jpg)

以上就为ejs基本用法，往后对数据库操作就直接把json数据从服务器返送给模板引擎就行；

## 5.导入公共模板样式

`header.ejs`

```ejs
<header>
  我是公共样式
  <div>
    <% if(isShowSchool) {%>
    <h1>校园招聘</h1>
    <% } %>
  </div>
</header>
```

`index.ejs`

```ejs
<%- include("./header.ejs",{ isShowSchool:true }) %> index <%# 我的注释 %>
```

![image-20220618191129477](https://tva1.sinaimg.cn/large/0074UQWJgy1h3eh7cbp4jj31hc0rq7oj.jpg)

