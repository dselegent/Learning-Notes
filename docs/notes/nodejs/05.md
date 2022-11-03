# 05 【nodejs内置模块（上）】

## 1.nodejs 的官方API文档

- Node.js 的API文档（英文）： https://nodejs.org/docs/latest-v8.x/api/index.html
- Node.js 的API文档（中文）：http://nodejs.cn/api/

关于 Node.js 的内置模块和常见API，可以看官方文档。

查阅文档时，稳定指数如下：

- 红色：废弃。
- 橙色：实验。表示当前版本可用，其他版本不确定。也许不向下兼容，建议不要在生产环境中使用该特性。
- 绿色：稳定。与 npm 生态系统的兼容性是最高的优先级。

## 2.nodejs 中模块的分类

Node.js 应用由模块组成，采用 CommonJS 模块规范。Node.js中的模块分为三种：

- 内置模块
- 第三方模块
- 自定义模块

下面简单介绍一下。

### 2.1 内置模块

```js
const process = require('process');
const path = require('path');

console.log(process.version);
console.log(path.resolve('../'));
```

require方法用于加载模块。

常见的内置模块包括：

- FS：文件系统模块
- path：路径模块
- OS：操作系统相关
- net：网络相关
- http
- ...

你可能会有疑问：Node.js 这么牛吗？还能直接和操作系统做交互？

带着这个疑问，我们不妨简单看看 Node.js 的源码，以 os 模块举例：

- 打开os模块的源码：https://github.com/nodejs/node/blob/master/lib/os.js，翻到最底部，找到 `cpus`这个方法
- 进而找到 `getCPUs()`
- internalBinding('os')：通过 internalBinding 可以调用系统底层的方法。internalBinding 主要是 JS 虚拟机在做的事情。
- `internalBinding('os')` 的实现，在 https://github.com/nodejs/node/blob/master/src/node_os.cc 里，里面都是 C++ 的代码。比如有一个`getCPUs`方法。

现在你知道了，JS本身是没有能力获取底层系统资源的，这一切都是 JS虚拟机在和底层做交互，然后通过 JS 的表现形式，暴露给应用层。

另外，还有很多库，是直接使用C/++编写的，通过编译之后，再提供给 JS 应用层调用，或者直接提供给 Node.js层使用。

**所有的编程语言底层都会回归C/C++**，甚至是汇编语言。

### 2.2 require 加载第三方包的机制

```js
const express = require('express');
```

require 加载第三方包的机制：

（1）第三方包安装好后，这个包一般会存放在当前项目的 node_modules 文件夹中。我们找到这个包的 package.json 文件，并且找到里面的main属性对应的入口模块，这个入口模块就是这个包的入口文件。

（2）如果第三方包中没有找到package.json文件，或者package.json文件中没有main属性，则默认加载第三方包中的index.js文件。

（3）如果在 node_modules 文件夹中没有找到这个包，或者以上所有情况都没有找到，则会向上一级父级目录下查找node_modules文件夹，查找规则如上一致。

（4）如果一直找到该模块的磁盘根路径都没有找到，则会报错：can not find module xxx。

### 2.3 自定义模块（module）

每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

举例：

```js
var example = require('./example.js');
console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

## 3.网络服务 http

### 3.1 http模块概览

大多数nodejs开发者都是冲着开发web server的目的选择了nodejs。正如官网所展示的，借助http模块，可以几行代码就搞定一个超迷你的web server。

在nodejs中，`http`可以说是最核心的模块，同时也是比较复杂的一个模块。上手很简单，但一旦深入学习，不少初学者就会觉得头疼，不知从何入手。

本文先从一个简单的例子出发，引出`http`模块最核心的四个实例。看完本文，应该就能够对http模块有个整体的认识。

### 3.2 一个简单的例子

在下面的例子中，我们创建了1个web服务器、1个http客户端

- 服务器server：接收来自客户端的请求，并将客户端请求的地址返回给客户端。
- 客户端client：向服务器发起请求，并将服务器返回的内容打印到控制台。

代码如下所示，只有几行，但包含了不少信息量。下一小节会进行简单介绍。

```js
var http = require('http');

// http server 例子
var server = http.createServer(function(serverReq, serverRes){
    var url = serverReq.url;
    serverRes.end( '您访问的地址是：' + url );
});

server.listen(3000);

// http client 例子
var client = http.get('http://127.0.0.1:3000', function(clientRes){
    clientRes.pipe(process.stdout);
});
```

### 3.3 例子解释

在上面这个简单的例子里，涉及了4个实例。大部分时候，serverReq、serverRes 才是主角。

- server：http.Server实例，用来提供服务，处理客户端的请求。
- client：http.ClientReques实例，用来向服务端发起请求。
- serverReq/clientRes：其实都是 http.IncomingMessage实例。serverReq 用来获取客户端请求的相关信息，如request header；而clientRes用来获取服务端返回的相关信息，比如response header。
- serverRes：http.ServerResponse实例

### 3.4 关于http.IncomingMessage、http.ServerResponse

先讲下 http.ServerResponse 实例。作用很明确，服务端通过http.ServerResponse 实例，来个请求方发送数据。包括发送响应表头，发送响应主体等。

接下来是 http.IncomingMessage 实例，由于在 server、client 都出现了，初学者难免有点迷茫。它的作用是

在server端：获取请求发送方的信息，比如请求方法、路径、传递的数据等。 在client端：获取 server 端发送过来的信息，比如请求方法、路径、传递的数据等。

http.IncomingMessage实例 有三个属性需要注意：method、statusCode、statusMessage。

- method：只在 server 端的实例有（也就是 serverReq.method）
- statusCode/statusMessage：只在 client 端 的实例有（也就是 clientRes.method）

## 4.网络服务 http res

### 4.1 概览

http模块四剑客之一的`res`，应该都不陌生了。一个web服务程序，接受到来自客户端的http请求后，向客户端返回正确的响应内容，这就是`res`的职责。

返回的内容包括：状态代码/状态描述信息、响应头部、响应主体。下文会举几个简单的例子。

```js
var http = require('http');
var server = http.createServer(function(req, res){
    res.end('ok');
});
server.listen(3000);
```

### 4.2 例子

在下面的例子中，我们同时设置了 状态代码/状态描述信息、响应头部、响应主体，就是这么简单。

```js
var http = require('http');

// 设置状态码、状态描述信息、响应主体
var server = http.createServer(function(req, res){
    res.writeHead(200, 'ok', {
        'Content-Type': 'text/plain'
    });
    res.end('hello');
});

server.listen(3000);
```

### 4.3 设置状态代码、状态描述信息

`res`提供了 res.writeHead()、res.statusCode/res.statusMessage 来实现这个目的。

举例，如果想要设置 200/ok ，可以

```js
res.writeHead(200, 'ok');
```

也可以

```js
res.statusCode = 200;
res.statusMessage = 'ok';
```

两者差不多，差异点在于

1. res.writeHead() 可以提供额外的功能，比如设置响应头部。
2. 当响应头部发送出去后，res.statusCode/res.statusMessage 会被设置成已发送出去的 状态代码/状态描述信息。

### 4.4 设置响应头部

`res`提供了 res.writeHead()、response.setHeader() 来实现响应头部的设置。

举例，比如想把 `Content-Type` 设置为 `text-plain`，那么可以

```js
// 方法一
res.writeHead(200, 'ok', {
    'Content-Type': 'text-plain'
});

// 方法二
res.setHeader('Content-Type', 'text-plain');
```

两者的差异点在哪里呢？

1. res.writeHead() 不单单是设置header。
2. 已经通过 res.setHeader() 设置了header，当通过 res.writeHead() 设置同名header，res.writeHead() 的设置会覆盖之前的设置。

关于第2点差异，这里举个例子。下面代码，最终的 `Content-Type` 为 `text/plain`。

```js
var http = require('http');

var server = http.createServer(function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200, 'ok', {
        'Content-Type': 'text/plain'
    });
    res.end('hello');
});

server.listen(3000);
```

而下面的例子，则直接报错。报错信息为 `Error: Can't set headers after they are sent.`。

```js
var http = require('http');

var server = http.createServer(function(req, res){    
    res.writeHead(200, 'ok', {
        'Content-Type': 'text/plain'
    });
    res.setHeader('Content-Type', 'text/html');
    res.end('hello');
});

server.listen(3000);
```

### 4.5 其他响应头部操作

增、删、改、查 是配套的。下面分别举例说明下，例子太简单就直接上代码了。

```js
// 增
res.setHeader('Content-Type', 'text/plain');

// 删
res.removeHeader('Content-Type');

// 改
res.setHeader('Content-Type', 'text/plain');
res.setHeader('Content-Type', 'text/html');  // 覆盖

// 查
res.getHeader('content-type');
```

其中略显不同的是 res.getHeader(name)，name 用的是小写，返回值没做特殊处理。

```js
res.setHeader('Content-Type', 'TEXT/HTML');
console.log( res.getHeader('content-type') );  // TEXT/HTML

res.setHeader('Content-Type', 'text/plain');
console.log( res.getHeader('content-type') );  // text/plain
```

此外，还有不那么常用的：

- res.headersSent：header是否已经发送；
- res.sendDate：默认为true。但为true时，会在response header里自动设置Date首部。

### 4.6 设置响应主体

主要用到 res.write() 以及 res.end() 两个方法。

res.write() API的信息量略大，建议看下[官方文档](https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback)。

#### 4.6.1 response.write(chunk[, encoding][, callback])

- chunk：响应主体的内容，可以是string，也可以是buffer。当为string时，encoding参数用来指明编码方式。（默认是utf8）
- encoding：编码方式，默认是 utf8。
- callback：当响应体flushed时触发。（TODO 这里想下更好的解释。。。）

使用上没什么难度，只是有些注意事项：

1. 如果 res.write() 被调用时， res.writeHead() 还没被调用过，那么，就会把header flush出去。
2. res.write() 可以被调用多次。
3. 当 res.write(chunk) 第一次被调用时，node 会将 header 信息 以及 chunk 发送到客户端。第二次调用 res.write(chunk) ，node 会认为你是要streaming data（WTF，该怎么翻译）。。。

> Returns true if the entire data was flushed successfully to the kernel buffer. Returns false if all or part of the data was queued in user memory. 'drain' will be emitted when the buffer is free again.

#### 4.6.2 response.end([data][, encoding][, callback])

掌握了 res.write() 的话，res.end() 就很简单了。res.end() 的用处是告诉nodejs，header、body都给你了，这次响应就到这里吧。

有点像个语法糖，可以看成下面两个调用的组合。至于callback，当响应传递结束后触发。

```js
res.write(data, encoding);
res.end()
```

### 4.7 超时处理

接口：response.setTimeout(msecs, callback)

关于 timeout 事件的说明，同样是言简意赅（WTF），话少信息量大，最好来个demo TODO

> If no 'timeout' listener is added to the request, the response, or the server, then sockets are destroyed when they time out. If you assign a handler on the request, the response, or the server's 'timeout' events, then it is your responsibility to handle timed out sockets.

### 4.8 事件 close/finish

- close：response.end() 被调用前，连接就断开了。此时会触发这个事件。
- finish：响应header、body都已经发送出去（交给操作系统，排队等候传输），但客户端是否实际收到数据为止。（这个事件后，res 上就不会再有其他事件触发）

### 4.9 其他不常用属性/方法

- response.finished：一开始是false，响应结束后，设置为true。
- response.sendDate：默认是true。是否自动设置Date头部。（按HTTP协议是必须要的，除非是调试用，不然不要设置为false）
- response.headersSent：只读属性。响应头部是否已发送。
- response.writeContinue()：发送 HTTP/1.1 100 Continue 消息给客户端，提示说服务端愿意接受客户端的请求，请继续发送请求正文（body)。（TODO 做个demo啥的是大大的好）

## 5.网络服务 http req

### 5.1 概览

本文的重点会放在`req`这个对象上。前面已经提到，它其实是http.IncomingMessage实例，在服务端、客户端作用略微有差异

- 服务端处：获取请求方的相关信息，如request header等。
- 客户端处：获取响应方返回的相关信息，如statusCode等。

服务端例子：

```js
// 下面的 req
var http = require('http');
var server = http.createServer(function(req, res){
    console.log(req.headers);
    res.end('ok');
});
server.listen(3000);
```

客户端例子

```js
// 下面的res
var http = require('http');
http.get('http://127.0.0.1:3000', function(res){
    console.log(res.statusCode);
});
```

### 5.2 属性/方法/事件 分类

http.IncomingMessage的属性/方法/事件 不是特别多，按照是否客户端/服务端 特有的，下面进行简单归类。可以看到

- 服务端处特有：url
- 客户端处特有：statusCode、statusMessage

| 类型 |     名称      | 服务端 | 客户端 |
| :--- | :-----------: | :----: | :----: |
| 事件 |    aborted    |   ✓    |   ✓    |
| 事件 |     close     |   ✓    |   ✓    |
| 属性 |    headers    |   ✓    |   ✓    |
| 属性 |  rawHeaders   |   ✓    |   ✓    |
| 属性 |  statusCode   |   ✕    |   ✓    |
| 属性 | statusMessage |   ✕    |   ✓    |
| 属性 |  httpVersion  |   ✓    |   ✓    |
| 属性 |      url      |   ✓    |   ✕    |
| 属性 |    socket     |   ✓    |   ✓    |
| 方法 |  .destroy()   |   ✓    |   ✓    |
| 方法 | .setTimeout() |   ✓    |   ✓    |

### 5.3 服务端的例子

#### 5.3.1 例子一：获取httpVersion/method/url

下面是一个典型的HTTP请求报文，里面最重要的内容包括：HTTP版本、请求方法、请求地址、请求头部。

```http
GET /hello HTTP/1.1
Host: 127.0.0.1:3000
Connection: keep-alive
Cache-Control: no-cache
```

那么，如何获取上面提到的信息呢？很简单，直接上代码

```js
// getClientInfo.js
var http = require('http');

var server = http.createServer(function(req, res){
    console.log( '1、客户端请求url：' + req.url );
    console.log( '2、http版本：' + req.httpVersion );
    console.log( '3、http请求方法：' + req.method );
    console.log( '4、http请求头部' + JSON.stringify(req.headers) );

    res.end('ok');
});

server.listen(3000);
```

效果如下：

```bash
1、客户端请求url：/hello
2、http版本：1.1
3、http请求方法：GET
4、http headers：{"host":"127.0.0.1:3000","connection":"keep-alive","cache-control":"no-cache","user-age
```

#### 5.3.2 例子二：获取get请求参数

服务端代码如下：

```js
// getClientGetQuery.js
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url);
    var query = urlObj.query;
    var queryObj = querystring.parse(query);
    
    console.log( JSON.stringify(queryObj) );
    
    res.end('ok');
});

server.listen(3000);
```

访问地址 http://127.0.0.1:3000/hello?nick=chyingp&hello=world

服务端输出如下

```bash
{"nick":"chyingp","hello":"world"}
```

#### 5.3.3  例子三：获取post请求参数

服务端代码如下

```js
// getClientPostBody.js
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res){
    
    var body = '';  
    req.on('data', function(thunk){
        body += thunk;
    });

    req.on('end', function(){
        console.log( 'post body is: ' + body );
        res.end('ok');
    }); 
});

server.listen(3000);
```

通过curl构造post请求：

```bash
curl -d 'nick=casper&hello=world' http://127.0.0.1:3000
```

服务端打印如下：

```bash
post body is: nick=casper&hello=world
```

备注：post请求中，不同的`Content-type`，post body有不小差异，感兴趣的同学可以研究下。

本例中的post请求，HTTP报文大概如下

```http
POST / HTTP/1.1
Host: 127.0.0.1:3000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

nick=casper&hello=world
```

## 6.网络服务 https

### 6.1 模块概览

这个模块的重要性，基本不用强调了。在网络安全问题日益严峻的今天，网站采用HTTPS是个必然的趋势。

在nodejs中，提供了 https 这个模块来完成 HTTPS 相关功能。从官方文档来看，跟 http 模块用法非常相似。

本文主要包含两部分：

1. 通过客户端、服务端的例子，对https模块进行入门讲解。
2. 如何访问安全证书不受信任的网站。（以 12306 为例子）

篇幅所限，本文无法对 HTTPS协议 及 相关技术体系 做过多讲解，有问题欢迎留言交流。

### 6.2 客户端例子

跟http模块的用法非常像，只不过请求的地址是https协议的而已，代码如下：

```js
var https = require('https');

https.get('https://www.baidu.com', function(res){
    console.log('status code: ' + res.statusCode);
    console.log('headers: ' + JSON.stringify(res.headers));

    res.on('data', function(data){
        process.stdout.write(data);
    });
}).on('error', function(err){
    console.error(err);
});
```

### 6.3 服务端例子

对外提供HTTPS服务，需要有HTTPS证书。如果你已经有了HTTPS证书，那么可以跳过证书生成的环节。如果没有，可以参考如下步骤

#### 6.3.1 生成证书

**1.创建个目录存放证书。**

```bash
mkdir cert
cd cert
```

**2.生成私钥。**

```text
openssl genrsa -out chyingp-key.pem 2048
```

**3.生成证书签名请求（csr是 Certificate Signing Request的意思）。**

```text
openssl req -new \
  -sha256
  -key chyingp-key.key.pem \
  -out chyingp-csr.pem \
  -subj "/C=CN/ST=Guandong/L=Shenzhen/O=YH Inc/CN=www.chyingp.com"
```

**4.生成证书。**

```text
openssl x509 \
  -req -in chyingp-csr.pem \
  -signkey chyingp-key.pem \
  -out chyingp-cert.pem
```

#### 6.3.2 HTTPS服务端

代码如下：

```js
var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./cert/chyingp-key.pem'), // 私钥
    cert: fs.readFileSync('./cert/chyingp-cert.pem') // 证书
};

var server = https.createServer(options, function(req, res){
    res.end('这是来自HTTPS服务器的返回');
});

server.listen(3000);
```

由于我并没有 www.chyingp.com 这个域名，于是先配置本地host

```text
127.0.0.1 www.chyingp.com
```

启动服务，并在浏览器里访问 [http://www.chyingp.com:3000](http://www.chyingp.com:3000/)。注意，浏览器会提示你证书不可靠，点击 信任并继续访问 就行了。

## 7.URL 接口(代替内置模块url使用)

> nodejs内置模块`url`有些方法要被废弃，我们使用`URL类`代替

浏览器原生提供`URL()`接口，它是一个构造函数，用来构造、解析和编码 URL。一般情况下，通过`window.URL`可以拿到这个构造函数。

### 7.1 对比`url模块`和URL类

| 属性     | url模块 | URL类 |
| -------- | ------- | ----- |
| protocol | `✅`     | `✅`   |
| host     | `✅`     | `✅`   |
| port     | `✅`     | `✅`   |
| hostname | `✅`     | `✅`   |
| search   | `✅`     | `✅`   |
| query    | `✅`     | `-`   |
| path     | `✅`     | `-`   |
| pathname | `✅`     | `✅`   |
| href     | `✅`     | `✅`   |
| hash     | `✅`     | `✅`   |
| origin   | -       | `✅`   |

可以看出来，只有三个字段不同，分别是`query`,`path`,`origin`

```js
打印两个对象的输出

// url模块，url.parse('link')
{
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'm.shop.com',
  port: null,
  hostname: 'm.shop.com',
  hash: '#detail',
  search: '?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099',
  query: 'id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099',
  pathname: '/home/share',
  path: '/home/share?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099',
  href: 'https://m.shop.com/home/share?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099#detail'
}
// new URL()
{
  href: 'https://m.shop.com/home/share?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099#detail',
  origin: 'https://m.shop.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'm.shop.com',
  hostname: 'm.shop.com',
  port: '',
  pathname: '/home/share',
  search: '?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099',
  searchParams: URLSearchParams {
    'id' => '4433',
    'name' => '李备',
    'directCompanyId' => '',
    'mobile' => '18951431099' },
  hash: '#detail'
}
```

### 7.2 构造函数

`URL()`作为构造函数，可以生成 URL 实例。它接受一个表示 URL 的字符串作为参数。如果参数不是合法的 URL，会报错。

```js
var url = new URL('http://www.example.com/index.html');
url.href
// "http://www.example.com/index.html"
```

上面示例生成了一个 URL 实例，用来代表指定的网址。

除了字符串，`URL()`的参数也可以是另一个 URL 实例。这时，`URL()`会自动读取该实例的`href`属性，作为实际参数。

如果 URL 字符串是一个相对路径，那么需要表示绝对路径的第二个参数，作为计算基准。

```js
var url1 = new URL('index.html', 'http://example.com');
url1.href
// "http://example.com/index.html"

var url2 = new URL('page2.html', 'http://example.com/page1.html');
url2.href
// "http://example.com/page2.html"

var url3 = new URL('..', 'http://example.com/a/b.html')
url3.href
// "http://example.com/"
```

上面代码中，返回的 URL 实例的路径都是在第二个参数的基础上，切换到第一个参数得到的。最后一个例子里面，第一个参数是`..`，表示上层路径。

### 7.3 实例属性

URL 实例的属性与`Location`对象的属性基本一致，返回当前 URL 的信息。

- URL.href：返回整个 URL
- URL.protocol：返回协议，以冒号`:`结尾
- URL.hostname：返回域名
- URL.host：返回域名与端口，包含`:`号，默认的80和443端口会省略
- URL.port：返回端口
- URL.origin：返回协议、域名和端口
- URL.pathname：返回路径，以斜杠`/`开头
- URL.search：返回查询字符串，以问号`?`开头
- URL.searchParams：返回一个`URLSearchParams`实例，该属性是`Location`对象没有的
- URL.hash：返回片段识别符，以井号`#`开头
- URL.password：返回域名前面的密码
- URL.username：返回域名前面的用户名

```js
var url = new URL('http://user:passwd@www.example.com:4097/path/a.html?x=111#part1');

url.href
// "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
url.protocol
// "http:"
url.hostname
// "www.example.com"
url.host
// "www.example.com:4097"
url.port
// "4097"
url.origin
// "http://www.example.com:4097"
url.pathname
// "/path/a.html"
url.search
// "?x=111"
url.searchParams
// URLSearchParams {}
url.hash
// "#part1"
url.password
// "passwd"
url.username
// "user"
```

这些属性里面，只有`origin`属性是只读的，其他属性都可写，并且会立即生效。

```js
var url = new URL('http://example.com/index.html#part1');

url.pathname = 'index2.html';
url.href // "http://example.com/index2.html#part1"

url.hash = '#part2';
url.href // "http://example.com/index2.html#part2"
```

上面代码中，改变 URL 实例的`pathname`属性和`hash`属性，都会实时反映在 URL 实例当中。

## 8.URLSearchParams 对象(代替内置模块querystring使用)

> 1. nodejs内置模块`querystring`有些方法要被废弃，我们使用`URLSearchParams API `构造代替
>
> 2. 如果你的nodejs版本大于18，可以使用`const querystring= require('node:querystring')`
>    ``querystring`比`URLSearchParams`性能更高，但不是 标准化的 API。使用`URLSearchParams`当性能不重要或 当需要与浏览器代码兼容时。
> 3. 还可以安装`qs`模块，使用方式和`querystring`一样

### 8.1 概述

`URLSearchParams`对象是浏览器的原生对象，用来构造、解析和处理 URL 的查询字符串（即 URL 问号后面的部分）。

它本身也是一个构造函数，可以生成实例。参数可以为查询字符串，起首的问号`?`有没有都行，也可以是对应查询字符串的数组或对象。

```js
// 方法一：传入字符串
var params = new URLSearchParams('?foo=1&bar=2');
// 等同于
var params = new URLSearchParams(document.location.search);

// 方法二：传入数组
var params = new URLSearchParams([['foo', 1], ['bar', 2]]);

// 方法三：传入对象
var params = new URLSearchParams({'foo' : 1 , 'bar' : 2});
```

`URLSearchParams`会对查询字符串自动编码。

```js
var params = new URLSearchParams({'foo': '你好'});
params.toString() // "foo=%E4%BD%A0%E5%A5%BD"
```

上面代码中，`foo`的值是汉字，`URLSearchParams`对其自动进行 URL 编码。

浏览器向服务器发送表单数据时，可以直接使用`URLSearchParams`实例作为表单数据。

```js
const params = new URLSearchParams({foo: 1, bar: 2});
fetch('https://example.com/api', {
  method: 'POST',
  body: params
}).then(...)
```

上面代码中，`fetch`命令向服务器发送命令时，可以直接使用`URLSearchParams`实例。

`URLSearchParams`可以与`URL()`接口结合使用。

```js
var url = new URL(window.location);
var foo = url.searchParams.get('foo') || 'somedefault';
```

上面代码中，URL 实例的`searchParams`属性就是一个`URLSearchParams`实例，所以可以使用`URLSearchParams`接口的`get`方法。

`URLSearchParams`实例有遍历器接口，可以用`for...of`循环遍历。

```js
var params = new URLSearchParams({'foo': 1 , 'bar': 2});

for (var p of params) {
  console.log(p[0] + ': ' + p[1]);
}
// foo: 1
// bar: 2
```

`URLSearchParams`没有实例属性，只有实例方法。

### 8.2 URLSearchParams.toString()

`toString`方法返回实例的字符串形式。

```js
var url = new URL('https://example.com?foo=1&bar=2');
var params = new URLSearchParams(url.search);

params.toString() // "foo=1&bar=2'
```

那么需要字符串的场合，会自动调用`toString`方法。

```js
var params = new URLSearchParams({version: 2.0});
window.location.href = location.pathname + '?' + params;
```

上面代码中，`location.href`赋值时，可以直接使用`params`对象。这时就会自动调用`toString`方法。

### 8.3 URLSearchParams.has()

`has()`方法返回一个布尔值，表示查询字符串是否包含指定的键名。

```js
var params = new URLSearchParams({'foo': 1 , 'bar': 2});
params.has('bar') // true
params.has('baz') // false
```

### 8.4 URLSearchParams.get()，URLSearchParams.getAll()

`get()`方法用来读取查询字符串里面的指定键。它接受键名作为参数。

```js
var params = new URLSearchParams('?foo=1');
params.get('foo') // "1"
params.get('bar') // null
```

两个地方需要注意。第一，它返回的是字符串，如果原始值是数值，需要转一下类型；第二，如果指定的键名不存在，返回值是`null`。

如果有多个的同名键，`get`返回位置最前面的那个键值。

```js
var params = new URLSearchParams('?foo=3&foo=2&foo=1');
params.get('foo') // "3"
```

上面代码中，查询字符串有三个`foo`键，`get`方法返回最前面的键值`3`。

`getAll()`方法返回一个数组，成员是指定键的所有键值。它接受键名作为参数。

```js
var params = new URLSearchParams('?foo=1&foo=2');
params.getAll('foo') // ["1", "2"]
```

上面代码中，查询字符串有两个`foo`键，`getAll`返回的数组就有两个成员。

### 8.5 URLSearchParams.keys()，URLSearchParams.values()，URLSearchParams.entries()

这三个方法都返回一个遍历器对象，供`for...of`循环遍历。它们的区别在于，`keys`方法返回的是键名的遍历器，`values`方法返回的是键值的遍历器，`entries`返回的是键值对的遍历器。

```js
var params = new URLSearchParams('a=1&b=2');

for(var p of params.keys()) {
  console.log(p);
}
// a
// b

for(var p of params.values()) {
  console.log(p);
}
// 1
// 2

for(var p of params.entries()) {
  console.log(p);
}
// ["a", "1"]
// ["b", "2"]
```

如果直接对`URLSearchParams`进行遍历，其实内部调用的就是`entries`接口。

```js
for (var p of params) {}
// 等同于
for (var p of params.entries()) {}
```

## 9.qs模块

qs是一个npm仓库所管理的包,可通过npm install qs命令进行安装.

1. qs.parse()将URL解析成对象的形式
2. qs.stringify()将对象 序列化成URL的形式，以&进行拼接

```javascript
const qs = require('qs');

1.qs.parse()
const str = "username='admin'&password='123456'";
console.log(qs.parse(str)); 
// Object { username: "admin", password: "123456" }

2.qs.stringify()
const a = qs.stringify({ username: 'admin', password: '123456' });
console.log(a); 
// username=admin&password=123456
```

```js
qs.stringify() 和JSON.stringify()有什么区别?

var a = {name:'hehe',age:10};
qs.stringify序列化结果如
name=hehe&age=10
--------------------
而JSON.stringify序列化结果如下：
"{"a":"hehe","age":10}"
```

