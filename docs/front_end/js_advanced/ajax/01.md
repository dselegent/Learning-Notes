# 01 【AJAX概述和基本使用】

## 1.AJAX简介

AJAX 全称为Asynchronous JavaScript And [XML](https://so.csdn.net/so/search?q=XML&spm=1002101.01.70)，就是异步的JS 和XML
通过AJAX 可以在浏览器中向服务器发送异步请求，最大的优势：**无刷新获取数据**
AJAX 不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式

## 2.AJAX 的特点

### 2.1 AJAX 的优点

1. 可以无需刷新页面而与服务器端进行通信
2. 允许你根据用户事件来更新部分页面内容

### 2.2 AJAX 的缺点

1. 没有浏览历史，不能回退
2. 存在跨域问题(同源)
3. SEO 不友好

## 2.HTTP相关问题

### 2.1 MDN 文档

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview

### 2.2 HTTP 请求交互的基本过程

![process](https://i0.hdslb.com/bfs/album/7cdb21cf5df63e0f78839315e2953e03eed9de84.png)

1. 前后应用从浏览器端向服务器发送HTTP 请求(请求报文)
2. 后台服务器接收到请求后, 调度服务器应用处理请求, 向浏览器端返回HTTP响应(响应报文)
3. 浏览器端接收到响应, 解析显示响应体/调用监视回调

### 2.3 HTTP 报文

HTTP（hypertext transport protocol）协议『超文本传输协议』，协议详细规定了浏览器和万维网服务器之间互相通信的规则。
约定, 规则

#### 2.3.1 请求报文

重点是格式与参数

```
行      POST  /s?ie=utf-8  HTTP/1 
头      Host: www.baidu.com
        Cookie: BAIDUID=AD3B0FA706E; BIDUPSID=AD3B0FA706;    
        Content-type: application/x-www-form-urlencoded
        User-Agent: chrome 83
空行
体      username=admin&password=admin
```

> 注:post请求才有请求体

**Request Headers**

| Request Header  | 说明                                  |
| --------------- | ----------------------------------- |
| Accept          | 浏览器可接收的数据格式（如：*/*）                  |
| Accept-Language | 客户端接收的语言类型（如：zh-CN,en-US）           |
| Connection      | 维护客户端和服务端的连接关系（如：Keep-Alive）        |
| Host            | 连接的目标主机和端口号（如：localhost:8080）       |
| User-Agent      | 客户端版本号的名字                           |
| Accept-Encoding | 客户端能接收的压缩数据的类型（如：gzip）              |
| Cookie          | 客户端暂存服务端的信息                         |
| Content-type    | 发送数据的格式，get请求没有（如：application/json） |

#### 2.3.2 响应报文

```
行      HTTP/1  200  OK
头      Content-Type: text/html;charset=utf-8
       Set-Cookie: BD_CK_SAM=1;path=/
        Content-length: 2048
        Content-encoding: gzip
空行    
体      <html>
            <head>
            </head>
            <body>
                <h1>尚硅谷</h1>
            </body>
        </html>
        (html 文本/json 文本/js/css/图片...)
```

![network](https://i0.hdslb.com/bfs/album/7815086ab584cb98b96c542cde0f7347320364b8.png)

> - 负载(Payload)用来查看请求发送的查询字符串和form data
> - Preview用来查看解析后的返回数据
> - Response用来查看返回数据

**Response Headers**

| Response Headers | 说明                                           |
| ---------------- | -------------------------------------------- |
| Content-Type     | 服务端发送的类型及采用的编码方式（如：text/html; charset=utf-8） |
| Content-Encoding | 服务端能够发送压缩编码类型（如：gzip）                        |
| Content-Length   | 服务端发送的压缩数据的长度（如：128）                         |
| Set-Cookie       | 服务端发送到客户端的暂存数据                               |
| Cache-Control    | 缓存相关                                         |
| Last-Modified    | 缓存相关                                         |
| Etag             | 缓存相关                                         |

#### 2.3.3 post请求体参数格式

1. Content-Type: application/x-www-form-urlencoded;charset=utf-8
   用于键值对参数，参数的键值用=连接, 参数之间用&连接
   例如: `name=%E5%B0%8F%E6%98%8E&age=12`
2. Content-Type: application/json;charset=utf-8
   用于 json 字符串参数
   例如: `{"name": "%E5%B0%8F%E6%98%8E", "age": 12}`
3. Content-Type: multipart/form-data
   用于文件上传请求

### 2.4 常见的响应状态码

**状态码**

- `1xx`：指示信息-表示请求已接收，继续处理
- `2xx`：成功-表示请求已被成功接收
- `3xx`：重定向-要完成请求必须进行更进一步的操作
- `4xx`：客户端错误-请求有语法错误或请求无法实现
- `5xx`：服务器错误-服务器未能实现合法的请求

**常见的http状态码**

- `200`：客户端请求成功
- `206`：客户发送带有`range`头的GET请求，服务器完成了它
- `301`：重定向（永久）
- `302`：重定向（临时）
- `304`：资源未被修改，有缓存
- `403`：请求被拒绝
- `404`：资源未找到
- `500`：服务器错误
- `504`：网关超时

### 2.5 不同类型的请求及其作用

1. `GET`: 从服务器端**读取**数据（查）
2. `POST`: 向服务器端**添加**新数据 （增）
3. `PUT`: 更新资源 （改）
4. `DELETE`: **删除**服务器端数据 （删）

## 3. 原生 AJAX 的基本使用

### 3.1 理解

1. 使用`XMLHttpRequest` (XHR)对象可以与服务器交互, 也就是发送ajax 请求
2. 前端可以获取到数据，而无需让整个的页面刷新。
3. 这使得Web 页面可以只更新页面的局部，而不影响用户的操作。

https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
`XMLHttpRequest`，AJAX 的所有操作都是通过该对象进行的

### 3.2 使用步骤

```js
const xhr = new XMLHttpRequest();
// 请求方式
xhr.open(method, url);
//可以设置请求头，一般不设置
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//get请求不传 body 参数，只有post请求使用
xhr.send(body) 
// 事件绑定 处理服务端返回的结果
// on  when 当....时候
// readystate 是 xhr 对象中的属性, 表示状态 0 1 2 3 4
//状态 0 表示未初始化  1 open方法调用完毕 2 send方法已经调用完毕 3 服务端返回部分结果 4 服务端返回了所有结果
// change  改变
xhr.onreadystatechange = function (){
     //判断 (服务端返回了所有的结果)
    if(xhr.readyState == 4 && xhr.status == 200){
          console.log(xhr.status);//状态码
           console.log(xhr.statusText);//状态字符串
           console.log(xhr.getAllResponseHeaders());//所有响应头
           console.log(xhr.response);//响应体
    }
```

#### 3.2.1 get请求

```js
      //  创建对象 
      const xhr = new XMLHttpRequest();
      // 2. 初始化 设置请求方法和url
      xhr.open('GET', 'http://127.0.0.1:8000/server')
      // 3. 发送
      xhr.send();
      // 4. 事件绑定 处理服务端返回的结果
      xhr.onreadystatechange = function(){
        // readyState 是 xhr 对象中的属性, 表示状态 0 1 2 3 4
        //判断 (服务端返回了所有的结果)
        if(xhr.readyState === 4){
          //判断响应状态码 200  404  403 401 500
          if(xhr.status >= 200 && xhr.status < 300){
            // 处理结果 行 头 空行 体
            // 响应
            console.log('状态码', xhr.status); // 状态码
            console.log('状态字符串', xhr.statusText); // 状态字符串
            console.log('所有响应头', xhr.getAllResponseHeaders()); // 所有响应头
            console.log('响应体', xhr.response); // 响应体
            //设置 result 的文本
            result.innerHTML=xhr.response;
          }
        }
      } 
```

**GET 请求设置请求参数**

设置url参数

```javascript
xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300');
```

![image-20220624212741956](https://i0.hdslb.com/bfs/album/6503382b9601cfc3e01d146acc072a6da94db603.png)

![](https://img-blog.csdnimg.cn/img_convert/24762725394ed29f5644b01259f0b0ef.png)

#### 3.2.2 post请求

```js
      //  创建对象
      const xhr = new XMLHttpRequest();
      // 2. 初始化 设置类型（请求方式）与url
      xhr.open('POST', 'http://127.0.0.1:8000/server');
      //设置请求头
       xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    // 自定义头信息
      xhr.setRequesHeader('name', 'ykyk');
      // 3. 发送   设置请求参数（请求体）
      xhr.send('a=100&b=200&c=300');
      // 4. 事件绑定
      xhr.onreadystatechange = function(){
        // 判断
        if(xhr.readyState === 4){
          if(xhr.status >=200 && xhr.status < 300){
            // 处理服务端返回的结果
            result.innerHTML = xhr.response;
          }
        }
```

**后端设置**

设置响应头允许自定义请求头 post改成all

```js
response.setHeader('Access-Control-Allow-Header','*');
```

#### 3.2.3 取消发送无用的参数

有的时候有的参数是可以不填写的，这时尽管是空串也会随着请求发过去，我们可以将参数的值设置成`undefined`，这样就不会随请求发过去了

### 3.3 请求超时与网络异常

```js
// 超时设置 （2秒） 超过2s请求就取消  status 状态变成 cancel 
xhr.timeout = 2000;
// 超时回调
xhr.ontimeout = function(){
    alert('网络超时，请稍后重试')
}
// 网络异常回调
xhr.onerror = function(){
    alert('网络异常，请稍后重试')
}
```

### 3.4 取消请求

```js
//     手动取消请求        
//    network中的status中pending为等待中
//    取消就变成cancel
xhr.abort()
```

### 3.5 AJAX 请求状态

`xhr.readyState` 可以用来查看请求当前的状态
https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState

![status](https://i0.hdslb.com/bfs/album/1b95ed0be7824a04e45b0dd9f776037bcb441417.png)

- 0: 表示XMLHttpRequest 实例已经生成，但是open()方法还没有被调用
- 1: 表示send()方法还没有被调用，仍然可以使用setRequestHeader()，设定HTTP请求的头信息
- 2: 表示send()方法已经执行，并且头信息和状态码已经收到
- 3: 表示正在接收服务器传来的body 部分的数据
- 4: 表示服务器数据已经完全接收，或者本次接收已经失败了

### 3.6 API总结

- XMLHttpRequest()：创建 XHR 对象的构造函数
- status：响应状态码值，如 200、404
- statusText：响应状态文本，如 ’ok‘、‘not found’
- readyState：标识请求状态的只读属性 0-1-2-3-4
- onreadystatechange：绑定 readyState 改变的监听
- responseType：指定响应数据类型，如果是 ‘json’，得到响应后自动解析响应
- response：响应体数据，类型取决于 responseType 的指定
- timeout：指定请求超时时间，默认为 0 代表没有限制
- ontimeout：绑定超时的监听
- onerror：绑定请求网络错误的监听
- open()：初始化一个请求，参数为：(method, url[, async])
- send(data)：发送请求
- abort()：中断请求 （发出到返回之间）
- getResponseHeader(name)：获取指定名称的响应头值
- getAllResponseHeaders()：获取所有响应头组成的字符串
- setRequestHeader(name, value)：设置请求头