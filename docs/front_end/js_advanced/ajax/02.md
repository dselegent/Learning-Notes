# 02 【axios fetch 跨域】

## 1.axios

### 1.1 axios 是什么?

1. 前端最流行的 ajax请求库
2. react/vue 官方都推荐使用 axios 发ajax 请求
3. [文档: https://github.com/axios/axios](https://github.com/axios/axios)

### 1.2 axios 特点

1. 基于 xhr + promise 的异步 ajax请求库
2. 浏览器端/node 端都可以使用
3. 支持请求／响应拦截器
4. 支持请求取消
5. 请求/响应数据转换
6. 批量发送多个请求

### 1.3 axios 常用语法

axios(config): 通用/最本质的发任意类型请求的方式
axios(url[, config]): 可以只指定url 发get 请求
axios.request(config): 等同于axios(config)
axios.get(url[, config]): 发get 请求
axios.delete(url[, config]): 发delete 请求
axios.post(url[, data, config]): 发post 请求
axios.put(url[, data, config]): 发put 请求

axios.defaults.xxx: 请求的默认全局配置（method\baseURL\params\timeout…）
axios.interceptors.request.use(): 添加请求拦截器
axios.interceptors.response.use(): 添加响应拦截器

axios.create([config]): 创建一个新的axios(它没有下面的功能)

axios.Cancel(): 用于创建取消请求的错误对象
axios.CancelToken(): 用于创建取消请求的 token 对象
axios.isCancel(): 是否是一个取消请求的错误
axios.all(promises): 用于批量执行多个异步请求
axios.spread(): 用来指定接收所有成功数据的回调函数的方法

![image-20220625194840070](https://i0.hdslb.com/bfs/album/ddc28465dad12c1c979947998de61a0ca9bd3968.png)

### 1.4 使用

#### 配置对象常用的配置项

```js
{
  // 路径url
  url: '/user',

  // 请求方法，默认get
  method: 'get', 

  //基础url，最终请求的url是 baseURL+url拼接，所以再全局设置默认，可以使得发送请求时的url变得简洁
  baseURL: 'https://some-domain.com/api/',

  //设置请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  //设置请求url的query参数，可以使得url简洁。
  //比如url是https://some-domain.com/api/user  然后params如下设置，那么最终的url是：
  //https://some-domain.com/api/user?ID=12345&name=Jack
  params: {
    ID: 12345,
    name:"Jack"
  },


 //设置请求体
  data: {
    firstName: 'Fred'
  },

  //设置请求的另外一种格式，不过这个是直接设置字符串的
  data: 'Country=Brasil&City=Belo Horizonte',

 //请求超时，单位毫秒，默认0，不超时。
  timeout: 1000,

  //响应数据类型，默认json
  responseType: 'json', 

  //响应数据的编码规则，默认utf-8
  responseEncoding: 'utf8',

  //响应体的最大长度 
  maxContentLength: 2000,

  // 请求体的最大长度
  maxBodyLength: 2000,

  //设置响应状态码为多少时是成功，调用resolve，否则调用reject失败
  //默认是大于等于200，小于300
  validateStatus: function (status) {
    return status >= 200 && status < 300; 
  }
```

**代码**

```js
    <button id="btn1">发送get请求</button> <br><br>
    <button id="btn2">发送post请求</button><br><br>
    <button id="btn3">发送put请求</button><br><br>
    <button id="btn4">发送delete请求</button>

    <hr>

    <div>其他发送请求的api:</div><br><br>
    <button id="btn5">发送get请求1</button> <br><br>
    <button id="btn6">发送post请求1</button><br><br>
    <button id="btn7">发送put请求1</button><br><br>
    <button id="btn8">发送delete请求1</button>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
    //发送get
    document.getElementById("btn1").onclick = function(){
       axios({
        method:"GET",
        url:"http://localhost:3000/posts/1"
       }).then(response=>{
           console.log(response);
       })
    };

    //发送post
    document.getElementById("btn2").onclick = function(){
       axios({
        method:"POST",
        url:"http://localhost:3000/posts",
        data:{
            title:"axios学习",
            author:"Yehaocong"
        }
       }).then(response=>{
           console.log(response);
       })
    };
    //发送put
    document.getElementById("btn3").onclick = function(){
       axios({
        method:"PUT",
        url:"http://localhost:3000/posts/2",
        data:{
            title:"axios学习",
            author:"Liaoxiaoyan"
        }
       }).then(response=>{
           console.log(response);
       })
    };
    document.getElementById("btn4").onclick = function(){
       axios({
        method:"DELETE",
        url:"http://localhost:3000/posts/2",
       }).then(response=>{
           console.log(response);
       })
    };



    //其他发送请求的api


    document.getElementById("btn5").onclick = function(){
        //发送get,使用get，第一个参数时url，第二个参数时config配置对象
       axios.get("http://localhost:3000/posts/1")
       .then(response=>{
           console.log(response);
       })
    };

    //发送post
    document.getElementById("btn6").onclick = function(){
        //发送post请求，第一个参数时url，第二个参数时请求体，第三个参数时config配置对象
        axios.post("http://localhost:3000/posts",
        {title:"axios学习2",
            author:"Yehaocong2"})
            .then(response=>{
           console.log(response);
       })
    };
    //发送put,
    document.getElementById("btn7").onclick = function(){
        //发送put,接收三个参数，url  请求体 、 config配置对象
       axios.put("http://localhost:3000/posts/2",{title:"axios学习",
            author:"Liaoxiaoyan"})
       .then(response=>{
           console.log(response);
       })
    };
    document.getElementById("btn8").onclick = function(){
        //发送delete请求，接收2个参数， url config配置对象
        axios.delete("http://localhost:3000/posts/3")
       .then(response=>{
           console.log(response);
       })
    };
```

![image-20220625195401372](https://i0.hdslb.com/bfs/album/34b45913177b519321b0d509a3a9c527eb87d4d3.png)

#### 默认配置

可以设置全局默认配置，是为了避免多种重复配置在不同请求中重复，比如baseURL、timeout等，这里设置baseURL。

```js
        axios.defaults.baseURL="http://localhost:3000";

        //因为上面配置了baseURL，所以我们之后的请求只需要配置url不用像之前那样的全路径
        axios.get("/posts/1")
       .then(response=>{
           console.log(response);
       })
```

### 1.5 创建一个新的axios对象

根据指定配置创建一个新的 axios, 也就是每个新 axios 都有自己的配置
新 axios 只是没有取消请求和批量发请求的方法, 其它所有语法都是一致的
为什么要设计这个语法?
(1) 需求: 项目中有部分接口需要的配置与另一部分接口需要的配置不太一样, 如何处理（比如有多个baseURL需要指定）
(2) 解决: 创建2 个新axios, 每个都有自己特有的配置, 分别应用到不同要求的接口请求中

```js
const instance = axios.create({ // instance是函数类型
    baseURL: 'http://localhost:3000'
})
// 使用instance发Ajax请求
instance({
    url: '/posts'
})
instance.get('/posts')
```

### 1.6 拦截器

**请求拦截器**（在发送请求前，使用函数对请求的参数和内容进行处理和检测，若请求有问题可直接进行拦截->取消，后进先执行=则后面的请求拦截器先执行）

**响应拦截器**（对响应的结果预处理，先进先执行=前面的响应拦截器先执行）

1）请求拦截器：

① 在真正发送请求前执行的回调函数

② 可以对请求进行检查或配置进行特定处理

③ 失败的回调函数，传递的默认是error

④ 成功的回调函数，传递的默认是config（也必须是）

2）响应拦截器

① 在请求得到响应后执行的回调函数

② 可以对响应数据进行特定处理

③ 成功的回调函数，传递的默认是response

④ 失败的回调函数，传递的默认是error

3）请求转换器：对请求头和请求体数据进行特定处理的函数

响应转换器：将响应体json字符串解析为js对象或数组的函数

1. 说明: 调用axios()并不是立即发送ajax 请求, 而是需要经历一个较长的流程
2. 流程: 请求拦截器2 => 请求拦截器1 => 发ajax 请求 => 响应拦截器1 => 响应拦截器2 => 请求的回调
3. 注意: 此流程是通过 promise 串连起来的, 请求拦截器传递的是config, 响应拦截器传递的是response

**代码**

```js
script>
      //设置一个请求拦截器，在请求拦截器中可以对请求参数进行修改
      //config：配置对象
      axios.interceptors.request.use(
        function (config) {
          console.log("请求拦截器 成功 1号");
          // config.headers.test = "I am only a header!";
          //修改 config 中的参数
          config.params = { a: 100 };
          return config;
        },
        error => {
          console.log("请求拦截器 失败 1号");
          return Promise.reject(error);
        }
      );

      axios.interceptors.request.use(
        function (config) {
          config.timeout = 5000;
          console.log("请求拦截器 成功 2号");
          // config.headers.test = "I am only a header!";
          //修改 config 中的参数
          config.timeout = 2000;
          return config;
        },
        error => {
          console.log("请求拦截器 失败 2号");
          return Promise.reject(error);
        }
      );

      //设置一个响应拦截器，可以对响应结果做一些处理
      axios.interceptors.response.use(
        function (response) {
          console.log("响应拦截器 成功 1号");
            //返回到请求回调时，只要data数据
             return response.data;
        },
        function (error) {
          console.log("响应拦截器 失败 1号");
          return Promise.reject(error);
        }
      );

      //设置一个响应拦截器
      axios.interceptors.response.use(
        function (response) {
          console.log("响应拦截器 成功 2号");
          return response;
        },
        function (error) {
          console.log("响应拦截器 失败 2号");
          return Promise.reject(error);
        }
      );

      //发送请求
      axios({
        method: "GET",
        url: "http://localhost:3000/posts",
      })
        .then((response) => {
          console.log("自定义回调处理成功的结果");
          //console.log(response);
        })
        .catch((reason) => {
          console.log(reason);
        });
    </script>
```

![image-20220625200618691](https://i0.hdslb.com/bfs/album/397433af4df136d75a4f6efdf2be9b9d95f450ab.png)

### 1.7 取消请求

**0.22版本之前可以使用,0.22开始被废弃**

```js
  <body>
    <div class="container">
      <h1 class="page-header">axios取消请求</h1>
      <button class="btn btn-primary">发送请求</button>
      <button class="btn btn-warning">取消请求</button>
    </div>
  </body>
  <script>
    //获取按钮
    const btns = document.querySelectorAll("button");
    //2.声明一个全局变量
    let cancel = null;
    //发送请求
    btns[0].onclick = () => {
      //检测上一次请求是否已经完成
      if (cancel !== null) {
        //则代表上一次请求还未取消，故直接取消上一次请求
        cancel();
      }
      axios({
        method: "GET",
        url: "http://localhost:3000/posts",
        //1.添加配置对象的属性
        cancelToken: new axios.CancelToken((c) => {
          //3.将c的值赋值给cancel
          cancel = c;
        }),
      }).then((response) => {
        console.log(response);
        //当请求执行完后 将cancel进行初始化设置
        cancel = null;
      });
    };

    //取消请求
    btns[1].onclick = () => {
      cancel();
    };
  </script>
```

**0.22新方法**

```js
<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.27.2/axios.min.js"></script>
 let btn = document.querySelectorAll('button');
const controller = new AbortController();
      btn[0].onclick = function () {
          axios( {
              url:'https://api.uomg.com/api/get.kg?songurl=https://node.kg.qq.com/play?s=YaCv8EYfJunVWYcH',
              signal: controller.signal
              }).then(function(response) {
                  console.log(response);
              });
      }

      btn[1].onclick = function () {
        controller.abort()
      }
```

### 1.8 在vue中封装axios

`requests.js`

```js
//对于axios进行二次封装
import axios from 'axios';
//获取仓库:存储数据
import store from '@/store';

//axios.create方法执行,其实返回一个axios和request一样的
let requests = axios.create({
  //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
  baseURL: '/api',
  //超时的设置
  timeout: 5000,
});

//请求拦截器:将来项目中【N个请求】，只要发请求,会触发请求拦截器!!!
requests.interceptors.request.use(config => {
  //请求拦截器:请求头【header】,请求头能否给服务器携带参数
  //请求拦截器：其实项目中还有一个重要的作用,给服务器携带请求们的公共的参数
  if (store.state.detail.nanoid_token) config.headers.userTempId = store.state.detail.nanoid_token;
  if (store.state.user.token) config.headers.token = store.state.user.token;

  return config;
});

//响应拦截器：请求数据返回会执行
requests.interceptors.response.use(
  res => {
    //res:实质就是项目中发请求、服务器返回的数据
    return res.data;
  },
  err => {
    //温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
    alert(err.message);
    //终止Promise链
    return new Promise();
  }
);

//最后需要暴露:暴露的是添加新的功能的axios,即为requests
export default requests;
```

**使用**

```js
import requests from '@/api/requests';
//注册的接口
export const reqRegister = data =>
  requests({ url: `/user/passport/register`, method: 'post', data });
```

## 2.fetch

### 2.1 XMLHttpRequest缺点

浏览器提供了原生的AJAX实现类XMLHttpRequest，基于该类实例，我们可以实现在网页上发送AJAX请求到服务端。

但是XMLHttpRequest的设计并不完美，主要体现在以下几个方面：

HTTP请求，响应都被耦合在XMLHttpRequest实例上，结构不够简单明了
采用事件回调的方式获取HTTP响应，可能会产生回调地狱
如果HTTP响应数据过大，则会占用大量内存
最后一点就是，XMLHttpRequest实现AJAX的步骤太零碎了

### 2.2 fetch 的优点

fetch和XMLHttpRequest一样，也是浏览器原生的，用于发送AJAX请求。

![fetch](https://i0.hdslb.com/bfs/album/38f9be56559957dd41f78484da8608d627b09af8.png)

![image-20220624220655195](https://i0.hdslb.com/bfs/album/1258b1db7577409542c0b9794f54c38beb7cf580.png)

XMLHttpRequest之后诞生的，它旨在解决XMLHttpRequest的不足，所以XMLHttpRequest的缺点就是它的优点，具体优点如下

- 语法简单，结构清晰明了
- 支持Promise获取异步的HTTP响应
- HTTP响应支持流式获取，内存友好

fetch被设计为函数，通过fetch函数调用即可发起AJAX，而不需要像XMLHttpRequest那样创建实例，然后基于xhr实例发起AJAX。

```js
fetch('http://localhost:3000/test') // fetch函数调用即发起AJAX
```

fetch函数返回一个Promise对象，而Promise对象的结果值就是HTTP响应

```javascript
fetch('http://localhost:3000/test').then(response => { // fetch函数返回值是一个Promise类型对象
    console.log(response) // 该Promise对象的结果值response就是HTTP响应
```

fetch函数返回的Promise对象的结果值HTTP响应是流式获取，即使HTTP响应数据很大，也不会占用过多的内存。

### 2.3 fetch 基本用法

`fetch()`的功能与 XMLHttpRequest 基本相同，但有三个主要的差异。

（1）`fetch()`使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。

（2）`fetch()`采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。

（3）`fetch()`通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。

在用法上，`fetch()`接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象。它的基本用法如下。

```js
fetch(url)
  .then(...)
  .catch(...)
```

下面是一个例子，从服务器获取 JSON 数据。

```js
fetch('https://api.github.com/users/ruanyf')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Request Failed', err)); 
```

上面示例中，`fetch()`接收到的`response`是一个 [Stream 对象](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)，`response.json()`是一个异步操作，取出所有内容，并将其转为 JSON 对象。

Promise 可以使用 await 语法改写，使得语义更清晰。

```js
async function getJSON() {
  let url = 'https://api.github.com/users/ruanyf';
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Request Failed', error);
  }
}
```

上面示例中，`await`语句必须放在`try...catch`里面，这样才能捕捉异步操作中可能发生的错误。

后文都采用`await`的写法，不使用`.then()`的写法。

### 2.4 fetch 的请求对象

```javascript
fetch(url,options).then((response)=>{
//处理http响应
},(error)=>{
//处理错误
})
```

url ：是发送网络请求的地址。

options：发送请求参数,

- body - http请求参数
- mode -  请求的模式
  - `cors`：默认值，允许跨域请求。
  - `same-origin`：只允许同源请求。
  - `no-cors`：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求。
- cache - 用户指定缓存。
- method - 请求方法，默认GET
- signal - 用于取消 fetch
- headers - http请求头设置
- keepalive - 用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。
- credentials -是否发送 Cookie
  - `same-origin`：默认值，同源请求时发送 Cookie，跨域请求时不发送。
  - `include`：不管同源请求，还是跨域请求，一律发送 Cookie。
  - `omit`：一律不发送。
- referrer- 用于设定`fetch()`请求的`referer`标头
- referrerPolicy- 用于设定`Referer`标头的规则
  - no-referrer-when-downgrade：默认值，总是发送Referer标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。
  - no-referrer：不发送Referer标头。
  - origin：Referer标头只包含域名，不包含完整的路径。
  - origin-when-cross-origin：同源请求Referer标头包含完整的路径，跨域请求只包含域名。
  - same-origin：跨域请求不发送Referer，同源请求发送。
  - strict-origin：Referer标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送Referer标头。
  - strict-origin-when-cross-origin：同源请求时Referer标头包含完整路径，跨域请求时只包含域名，
  - HTTPS 页面请求 HTTP 资源时不发送该标头。
  - unsafe-url：不管什么情况，总是发送Referer标头。

```js
fetch('http://localhost:3000/test',{
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'qfc',
        age: 18
    })
}).then(res => {
    console.log(res)
})
```

![image-20220624222137163](https://i0.hdslb.com/bfs/album/fbd11a8129e218c75e9897080d3e4014f5db996a.png)

其中需要注意的是Request对象的body属性，该属性值支持

- 查询参数字符串，如'name=qfc&age=18'
- 文本字符串，如'{"name":"qfc", "age": 18}'
- FormData对象
- Blob对象
- ReadableStream对象
- BufferSource对象

### 2.5 fetch 的响应对象

#### Response 对象的同步属性

`fetch()`请求成功以后，得到的是一个 [Response 对象](https://developer.mozilla.org/en-US/docs/Web/API/Response)。它对应服务器的 HTTP 回应。

```js
const response = await fetch(url);
```

前面说过，Response 包含的数据通过 Stream 接口异步读取，但是它还包含一些同步属性，对应 HTTP 回应的标头信息（Headers），可以立即读取。

```js
async function fetchText() {
  let response = await fetch('/readme.txt');
  console.log(response.status);
  console.log(response.statusText);
}
```

上面示例中，`response.status`和`response.statusText`就是 Response 的同步属性，可以立即读取。

fetch 请求成功后，响应 response 对象如图：

![image-20220624221326446](https://i0.hdslb.com/bfs/album/980304396e4a9765abf9f9831d4ab42a3870973d.png)

标头信息属性有下面这些。

- status - `Response.status`属性返回一个数字，表示 HTTP 回应的状态码（例如200，表示成功请求）。
- statusText - `Response.statusText`属性返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回“OK”）。
- ok - `Response.ok`属性返回一个布尔值，表示请求是否成功，`true`对应 HTTP 请求的状态码 200 到 299，`false`对应其他的状态码。
- headers - 响应头
- body - 响应体。响应体内的数据，根据类型各自处理。
- type - 返回请求的类型。可能的值如下：
  - `basic`：普通请求，即同源请求。
  - `cors`：跨源请求。
  - `error`：网络错误，主要用于 Service Worker。
  - `opaque`：如果`fetch()`请求的`type`属性设为`no-cors`，就会返回这个值，详见请求部分。表示发出的是简单的跨源请求，类似`<form>`表单的那种跨源请求。
  - `opaqueredirect`：如果`fetch()`请求的`redirect`属性设为`manual`，就会返回这个值，详见请求部分。
- url - `Response.url`属性返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL。
- redirected - 返回一个布尔值，表示请求是否发生过跳转。

#### 判断请求是否成功

`fetch()`发出请求以后，有一个很重要的注意点：只有网络错误，或者无法连接时，`fetch()`才会报错，其他情况都不会报错，而是认为请求成功。

这就是说，即使服务器返回的状态码是 4xx 或 5xx，`fetch()`也不会报错（即 Promise 不会变为 `rejected`状态）。

只有通过`Response.status`属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功。请看下面的例子。

```js
async function fetchText() {
  let response = await fetch('/readme.txt');
  if (response.status >= 200 && response.status < 300) {
    return await response.text();
  } else {
    throw new Error(response.statusText);
  }
}
```

上面示例中，`response.status`属性只有等于 2xx （200~299），才能认定请求成功。这里不用考虑网址跳转（状态码为 3xx），因为`fetch()`会将跳转的状态码自动转为 200。

另一种方法是判断`response.ok`是否为`true`。

```js
if (response.ok) {
  // 请求成功
} else {
  // 请求失败
}
```

#### Response.headers 属性

Response 对象还有一个`Response.headers`属性，指向一个 [Headers 对象](https://developer.mozilla.org/en-US/docs/Web/API/Headers)，对应 HTTP 回应的所有标头。

Headers 对象可以使用`for...of`循环进行遍历。

```js
const response = await fetch(url);

for (let [key, value] of response.headers) {
  console.log(`${key} : ${value}`);
}

// 或者
for (let [key, value] of response.headers.entries()) {
  console.log(`${key} : ${value}`);
}
```

Headers 对象提供了以下方法，用来操作标头。

> - `Headers.get()`：根据指定的键名，返回键值。
> - `Headers.has()`： 返回一个布尔值，表示是否包含某个标头。
> - `Headers.set()`：将指定的键名设置为新的键值，如果该键名不存在则会添加。
> - `Headers.append()`：添加标头。
> - `Headers.delete()`：删除标头。
> - `Headers.keys()`：返回一个遍历器，可以依次遍历所有键名。
> - `Headers.values()`：返回一个遍历器，可以依次遍历所有键值。
> - `Headers.entries()`：返回一个遍历器，可以依次遍历所有键值对（`[key, value]`）。
> - `Headers.forEach()`：依次遍历标头，每个标头都会执行一次参数函数。

上面的有些方法可以修改标头，那是因为继承自 Headers 接口。对于 HTTP 回应来说，修改标头意义不大，况且很多标头是只读的，浏览器不允许修改。

这些方法中，最常用的是`response.headers.get()`，用于读取某个标头的值。

```js
let response =  await  fetch(url);
response.headers.get('Content-Type')
// application/json; charset=utf-8
```

`Headers.keys()`和`Headers.values()`方法用来分别遍历标头的键名和键值。

```js
// 键名
for(let key of myHeaders.keys()) {
  console.log(key);
}

// 键值
for(let value of myHeaders.values()) {
  console.log(value);
}
```

`Headers.forEach()`方法也可以遍历所有的键值和键名。

```js
let response = await fetch(url);
response.headers.forEach(
  (value, key) => console.log(key, ':', value)
);
```

#### 读取内容的方法

`Response`对象根据服务器返回的不同类型的数据，提供了不同的读取方法。

> - `response.text()`：得到文本字符串。
> - `response.json()`：得到 JSON 对象。
> - `response.blob()`：得到二进制 Blob 对象。
> - `response.formData()`：得到 FormData 表单对象。
> - `response.arrayBuffer()`：得到二进制 ArrayBuffer 对象。

上面5个读取方法都是异步的，返回的都是 Promise 对象。必须等到异步操作结束，才能得到服务器返回的完整数据。

**response.text()**

`response.text()`可以用于获取文本数据，比如 HTML 文件。

```
const response = await fetch('/users.html');
const body = await response.text();
document.body.innerHTML = body
```

**response.json()**

`response.json()`主要用于获取服务器返回的 JSON 数据，前面已经举过例子了。

**response.formData()**

`response.formData()`主要用在 Service Worker 里面，拦截用户提交的表单，修改某些数据以后，再提交给服务器。

**response.blob()**

`response.blob()`用于获取二进制文件。

```
const response = await fetch('flower.jpg');
const myBlob = await response.blob();
const objectURL = URL.createObjectURL(myBlob);

const myImage = document.querySelector('img');
myImage.src = objectURL;
```

上面示例读取图片文件`flower.jpg`，显示在网页上。

**response.arrayBuffer()**

`response.arrayBuffer()`主要用于获取流媒体文件。

```
const audioCtx = new window.AudioContext();
const source = audioCtx.createBufferSource();

const response = await fetch('song.ogg');
const buffer = await response.arrayBuffer();

const decodeData = await audioCtx.decodeAudioData(buffer);
source.buffer = buffer;
source.connect(audioCtx.destination);
source.loop = true;
```

上面示例是`response.arrayBuffer()`获取音频文件`song.ogg`，然后在线播放的例子。

#### Response.clone()

Stream 对象只能读取一次，读取完就没了。这意味着，前一节的五个读取方法，只能使用一个，否则会报错。

```js
let text =  await response.text();
let json =  await response.json();  // 报错
```

上面示例先使用了`response.text()`，就把 Stream 读完了。后面再调用`response.json()`，就没有内容可读了，所以报错。

Response 对象提供`Response.clone()`方法，创建`Response`对象的副本，实现多次读取。

```js
const response1 = await fetch('flowers.jpg');
const response2 = response1.clone();

const myBlob1 = await response1.blob();
const myBlob2 = await response2.blob();

image1.src = URL.createObjectURL(myBlob1);
image2.src = URL.createObjectURL(myBlob2);
```

上面示例中，`response.clone()`复制了一份 Response 对象，然后将同一张图片读取了两次。

Response 对象还有一个`Response.redirect()`方法，用于将 Response 结果重定向到指定的 URL。该方法一般只用在 Service Worker 里面，这里就不介绍了。

#### Response.body 属性

`Response.body`属性是 Response 对象暴露出的底层接口，返回一个 ReadableStream 对象，供用户操作。

它可以用来分块读取内容，应用之一就是显示下载的进度。

```js
const response = await fetch('flower.jpg');
const reader = response.body.getReader();

while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

上面示例中，`response.body.getReader()`方法返回一个遍历器。这个遍历器的`read()`方法每次返回一个对象，表示本次读取的内容块。

这个对象的`done`属性是一个布尔值，用来判断有没有读完；`value`属性是一个 arrayBuffer 数组，表示内容块的内容，而`value.length`属性是当前块的大小。

### 2.6 `fetch()`的第二个参数：定制 HTTP 请求

`fetch()`的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。

```js
fetch(url, optionObj)
```

上面命令的`optionObj`就是第二个参数。

HTTP 请求的方法、标头、数据体都在这个对象里面设置。下面是一些示例。

**（1）POST 请求**

```js
const response = await fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum',
});

const json = await response.json();
```

上面示例中，配置对象用到了三个属性。

> - `method`：HTTP 请求的方法，`POST`、`DELETE`、`PUT`都在这个属性设置。
> - `headers`：一个对象，用来定制 HTTP 请求的标头。
> - `body`：POST 请求的数据体。

注意，有些标头不能通过`headers`属性设置，比如`Content-Length`、`Cookie`、`Host`等等。它们是由浏览器自动生成，无法修改。

**（2）提交 JSON 数据**

如果是提交json数据时，需要把json转换成字符串。如

```js
fetch(`http://localhost:80/fetch`,{
 method:'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        name: 'qfc',
        age: 18
    }).then(response=>{
  console.log('响应',response)
})
```

**（3）提交表单**

如果提交的是表单数据，使用 formData转化下，如：

```js
body:new FormData(form)
```

上传文件，可以包含在整个表单里一起提交，如：

```js
const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data
});
```

**（4）文件上传**

如果表单里面有文件选择器，可以用前一个例子的写法，上传的文件包含在整个表单里面，一起提交。

另一种方法是用脚本添加文件，构造出一个表单，进行上传，请看下面的例子。

```js
const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data
});
```

上传二进制文件时，不用修改标头的`Content-Type`，浏览器会自动设置。

**（5）直接上传二进制数据**

`fetch()`也可以直接上传二进制数据，将 Blob 或 arrayBuffer 数据放在`body`属性里面。

```js
let blob = await new Promise(resolve =>
  canvasElem.toBlob(resolve,  'image/png')
);

let response = await fetch('/article/fetch/post/image', {
  method:  'POST',
  body: blob
});
```

### 2.7 `fetch()`配置对象的完整 API

`fetch()`第二个参数的完整 API 如下。

```js
const response = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined,
  referrer: "about:client",
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors",
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",
  keepalive: false,
  signal: undefined
});
```

`fetch()`请求的底层用的是 [Request() 对象](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request)的接口，参数完全一样，因此上面的 API 也是`Request()`的 API。

这些属性里面，`headers`、`body`、`method`前面已经给过示例了，下面是其他属性的介绍。

**cache**

`cache`属性指定如何处理缓存。可能的取值如下：

- `default`：默认值，先在缓存里面寻找匹配的请求。
- `no-store`：直接请求远程服务器，并且不更新缓存。
- `reload`：直接请求远程服务器，并且更新缓存。
- `no-cache`：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存。
- `force-cache`：缓存优先，只有不存在缓存的情况下，才请求远程服务器。
- `only-if-cached`：只检查缓存，如果缓存里面不存在，将返回504错误。

**mode**

`mode`属性指定请求的模式。可能的取值如下：

- `cors`：默认值，允许跨源请求。
- `same-origin`：只允许同源请求。
- `no-cors`：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨源的复杂标头，相当于提交表单、`<script>`加载脚本、`<img>`加载图片等传统的跨源请求方法。

**credentials**

`credentials`属性指定是否发送 Cookie。可能的取值如下：

- `same-origin`：默认值，同源请求时发送 Cookie，跨源请求时不发送。
- `include`：不管同源请求，还是跨源请求，一律发送 Cookie。
- `omit`：一律不发送。

跨源请求发送 Cookie，需要将`credentials`属性设为`include`。

```js
fetch('http://another.com', {
  credentials: "include"
});
```

**signal**

`signal`属性指定一个 AbortSignal 实例，用于取消`fetch()`请求，详见下一节。

**keepalive**

`keepalive`属性用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。

一个典型的场景就是，用户离开网页时，脚本向服务器提交一些用户行为的统计信息。这时，如果不用`keepalive`属性，数据可能无法发送，因为浏览器已经把页面卸载了。

```js
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      some: 'data'
    }),
    keepalive: true
  });
};
```

**redirect**

`redirect`属性指定 HTTP 跳转的处理方法。可能的取值如下：

- `follow`：默认值，`fetch()`跟随 HTTP 跳转。
- `error`：如果发生跳转，`fetch()`就报错。
- `manual`：`fetch()`不跟随 HTTP 跳转，但是`response.url`属性会指向新的 URL，`response.redirected`属性会变为`true`，由开发者自己决定后续如何处理跳转。

**integrity**

`integrity`属性指定一个哈希值，用于检查 HTTP 回应传回的数据是否等于这个预先设定的哈希值。

比如，下载文件时，检查文件的 SHA-256 哈希值是否相符，确保没有被篡改。

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

**referrer**

`referrer`属性用于设定`fetch()`请求的`referer`标头。

这个属性可以为任意字符串，也可以设为空字符串（即不发送`referer`标头）。

```js
fetch('/page', {
  referrer: ''
});
```

**referrerPolicy**

`referrerPolicy`属性用于设定`Referer`标头的规则。可能的取值如下：

- `no-referrer-when-downgrade`：默认值，总是发送`Referer`标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。
- `no-referrer`：不发送`Referer`标头。
- `origin`：`Referer`标头只包含域名，不包含完整的路径。
- `origin-when-cross-origin`：同源请求`Referer`标头包含完整的路径，跨源请求只包含域名。
- `same-origin`：跨源请求不发送`Referer`，同源请求发送。
- `strict-origin`：`Referer`标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送`Referer`标头。
- `strict-origin-when-cross-origin`：同源请求时`Referer`标头包含完整路径，跨源请求时只包含域名，HTTPS 页面请求 HTTP 资源时不发送该标头。
- `unsafe-url`：不管什么情况，总是发送`Referer`标头。

### 2.8 取消`fetch()`请求

`fetch()`请求发送以后，如果中途想要取消，需要使用`AbortController`对象。

```js
let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal: controller.signal
});

signal.addEventListener('abort',
  () => console.log('abort!')
);

controller.abort(); // 取消

console.log(signal.aborted); // true
```

上面示例中，首先新建 AbortController 实例，然后发送`fetch()`请求，配置对象的`signal`属性必须指定接收 AbortController 实例发送的信号`controller.signal`。

`controller.abort()`方法用于发出取消信号。这时会触发`abort`事件，这个事件可以监听，也可以通过`controller.signal.aborted`属性判断取消信号是否已经发出。

下面是一个1秒后自动取消请求的例子。

```js
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/long-operation', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') {
    console.log('Aborted!');
  } else {
    throw err;
  }
}
```

## 3.跨域

### 3.1 同源策略

- 同源策略(Same-Origin Policy)最早由Netscape 公司提出，是浏览器的一种安全策略
- 同源： 协议、域名、端口号必须完全相同
- 跨域： 违背同源策略就是**跨域**

### 3.2 如何解决跨域

#### JSONP

> jsonp 只支持get请求不支持post请求

**1) JSONP 是什么**

JSONP(JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明
才智开发出来，只支持get 请求。

**2) JSONP 怎么工作的？**

在网页有一些标签天生具有跨域能力，比如：img link iframe script。
JSONP 就是利用script 标签的跨域能力来发送请求的。

**3) JSONP 的使用**

**html代码**

```js
            //1. 创建 script 标签
            const script = document.createElement('script');
            //2. 设置标签的 src 属性
            script.src = 'http://127.0.0.1:8000/check-username?callback=abc';
            //3. 将script 添加到body 中
            document.body.appendChild(script);
            function abc(data) {
                alert(data.name);
            };
```

**后端代码**

```js
app.get("/check-username" , function (req , res) {
    var callback = req.query.callback;
    const data = {
        name: '孙悟空'
    };
    //将数据转化为字符串
    let str = JSON.stringify(data);
    //返回结果(一段可执行的JavaScript代码)
    response.end(`handle(${str})`);
});
```

#### CORS

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

1) **CORS 是什么？**
   CORS（Cross-Origin Resource Sharing），跨域资源共享。CORS 是官方的跨域解决方
   案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持
   get 和post 请求。跨域资源共享标准新增了一组HTTP 首部字段，允许服务器声明哪些
   源站通过浏览器有权限访问哪些资源

2) **CORS 怎么工作的？**
   CORS 是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应
   以后就会对响应放行。

3) **CORS 的使用**
   主要是服务器端的设置：

```js
router.get("/testAJAX" , function (req , res) {
    //通过res 来设置响应头，来允许跨域请求
    //res.set("Access-Control-Allow-Origin","http://127.0.0.1:3000");
    res.set("Access-Control-Allow-Origin","*");//允许所有来源访问
    res.send("testAJAX 返回的响应");
});
```
