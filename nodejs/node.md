---
title: node笔记

date: 2021-02-20

sidebar: 'auto'

categories:
  - node

tags:
  - node

publish: true

---

::: tip

node笔记

:::

<!-- more -->

# 1.模块化

Node.js采用的是CommonJs规范，在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，而文件路径就是模块名。 在编写每个模块时，都有require、exports、module三个预先定义好的变量可供使用。

> Node.js中模块的分类：

- 核心模块（已经封装好的内置模块）
- 自己定义的模块
- 第三方的模块（npm下载下来的）

## 1.1commonJS

我们可以把公共的功能 抽离成为一个单独的 js 文件 作为一个模块，默认情况下面这个模块里面的方法或者属性，外面是没法访问的。如果要让外部可以访问模块里面的方法或者属性，就必须在模块里面通过 exports 或者 module.exports 暴露属性或者方法。

1. require

`require`函数用来在一个模块中引入另外一个模块。传入一个模块名，返回一个模块导出对象。用法：`let cc = require("模块名")` ，其中模块名可以用绝对路径也可以用相对路径,模块的后缀名.js可以省略。例如：

```js
let cc1 = require('./main.js')
let cc2 = require('home/src/main.js')
let cc3 = require('./main')
```

require()函数用两个作用：

- 执行导入的模块中的代码；
- 返回导入模块中的接口对象； 

2. exports

`exports`对象用来导出当前模块的公共方法或属性，别的模块通过`require`函数使用当前模块时得到的就是当前模块的`exports`对象。用法：`exports.name`,name为导出的对象名。例子：

```js
exports.add = function () {
  let i = 0
  console.log(++i)
}

导出一个add方法供其他模块使用
```

> 其实exports类似于ES6中的export的用法，用来导出一个指定名字的对象。

3. module.exports

`module.exports`用来导出一个默认对象，没有指定对象名，常见于修改模块的原始导出对象。比如原本模块导出的是一个对象，我们可以通过module.exports修改为导出一个函数。如下：

```js
module.exports = function () {
  console.log('hello world！')
}
```

4. 模块的初始化

一个模块中的JS代码仅在模块**第一次被使用时**执行一次，并且在使用的过程中进行*初始化*，之后缓存起来便于后续继续使用。

5. 主模块

通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。主模块负责调度组成整个程序的其它模块完成工作。例如通过以下命令启动程序时，main.js就是主模块。

```js
$ node main.js // 运行main.js启动程序，main.js称为主模块
```

完整实例：

在项目中我们有个`hello.js`文件，里面定义了一个求和的函数

```js
var a = 1;

function add () {
  return ++a;
}

exports.add = add
```

我们在项目的主模块 `main.js`中引入`hello.js`

```js
var add1 = require('./hello')
var add2 = require('./hello')

console.log(add1.add())
console.log(add2.add())
```

该程序运行的结果如下：

```js
$ node main.js
2
3
```

我们可以看到`hello.js`并没有别引入两次而初始化两次，说明模块只会在执行的过程中被初始化一次。

**m1.js**

```js
function test() {
  console.log('test1');
}
let name = 'm1';
 module.exports = {
   test,
   name,
 };

```

**m2.js**

```js
function test() {
  console.log('test2');
}
let name = 'm2';

module.exports = name;
module.exports = test;

```

**app.js**

```js
const m1 = require('./js/m1');
const m2 = require('./js/m2);

console.log(m1, m2);
/*
m1 {test:function,name:"m1"}
和es6模块的默认暴露一样，导入的就是传出来的值本身
*/

/*
m2 {test:function,name:"m2"}
和es6模块的批量暴露一样，会把每次导出的放入一个对象
*/

// 上面这两种写法这样写就没有区别

```

**关于加载第三方包规则**

Node.js中使用`CommonJs`模块化机制，通过`npm`下载的第三方包，我们在项目中引入第三方包都是：`let xx = require('第三方包名')`，究竟`require`方法加载第三方包的原理机制是什么，今天我们来探讨下。

1. `require('第三方包名')`优先在加载该包的模块的同级目录`node_modules`中查找第三方包。
2. 找到该第三方包中的`package.json`文件，并且找到里面的`main`属性对应的入口模块，该入口模块即为加载的第三方模块。
3. 如果在要加载的第三方包中没有找到`package.json`文件或者是`package.json`文件中没有`main`属性，则默认加载第三方包中的`index.js`文件。
4. 如果在加载第三方模块的文件的同级目录没有找到`node_modules`文件夹，或者以上所有情况都没有找到，则会向上一级父级目录下查找`node_modules`文件夹，查找规则如上一致。
5. 如果一直找到该模块的磁盘根路径都没有找到，则会报错：`can not find module xxx`。

## 1.2ES-module

**首先得初始化`package.json`文件，使用es6模块化语法必须写全文件名（包括后缀）**

```js
{
  "name": "1.模块化",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",//默认是"commonjs"
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

**m1.js**

```js
 export default {
   name: 'ds',
   age: 18,
 };

```

m2.js

```js
export let name = 'ds';
export let age = 18;
```

es6.js

```js

import obj from './js2/m1.js';
import * as obj from './js2/m2.js';

console.log(obj.name);

```

# 2.npm包管理

## 2.1npm的使用

```js
1.npm init -y 添加初始化文件记录安装信息，如果在后面加-S或者-D会自动创建该文件

2.npm install 包名 –g  （uninstall,update）

3.npm install 包名 --save（-S） --dev(-D)  (uninstall,update)
如果不写后缀默认是安装到生产环境
如果先装到了开发环境，那么后面覆盖安装不写后缀也是本身的环境下
一个包只能存在在一种环境，得先卸载才能换环境

4.npm list -g (不加-g，列举当前目录下的安装包)

5.npm info 包名（详细信息） npm info 包名 version (获取最新版本)

6.npm install md5@1.8.0（安装指定版本）

7.npm outdated(检查包是否已经过时)
如果版本比较新就不会有输出

8.pwd输出当前目录的绝对路径

9.npm view 包名 version查看当前版本   npm view 包名 versions查看该包所有版本

10.npm update 包名 更新指定包 npm update 更新所有的包（pnpm up）

11.npm config list  查看npm配置信息

12.npm 指定命令 --help 查看指定命令的帮助。

13.npm root：查看当前包的安装路径。  npm root -g：查看全局的包的安装路径。

14.npm ls 包名：查看本地安装的指定包及版本信息，没有显示empty。 npm ls 包名 -g：查看全局安装的指定包及版本信息

15.npm cache clean --force 清除缓存

16.npm -v查看npm的版本


"dependencies": {    "md5": "^2.1.0"  }  ^ 表示 如果 直接npm install 将会 安md5@2.*.*  	最新版本

"dependencies": {    "md5": "~2.1.0"  }  ~ 表示 如果 直接npm install 将会 安装md5 2.1.*  最新版本

"dependencies": {    "md5": "*"  }  * 表示 如果 直接npm install 将会 安装 md5  最新版本
```

## 2.2pnpm的使用

**官网**： `https://pnpm.js.org/installation/`

**全局安装**

```js
npm install pnpm -g
```

**设置源**

```js
//查看源
pnpm config get registry 
//切换淘宝源
pnpm config set registry https://registry.npmmirror.com/
```

**使用**

```js
//可以和npm一样使用方式

pnpm init //直接初始化
pnpm install 包  // 
pnpm i 包
pnpm add 包    // -S  默认写入dependencies
pnpm add -D    // -D devDependencies
pnpm add -g    // 全局安装
```

**移除**

```js
pnpm remove(uninstall) 包                            //移除包
pnpm remove 包 --global                   //移除全局包
```

**更新**

```js
pnpm up                //更新所有依赖项
pnpm upgrade 包        //更新包
pnpm upgrade 包 --global   //更新全局包
```

## 2.3使用nodemon自动重启服务

我们在开发的过程中，每次改完代码之后都必须重启服务器，显然这样的操作效率是比较低，这里给大家推荐个工具，`nodemon`,`nodemon`可以帮我们实时监听项目中代码的变化，并且自动重启服务，而且配置简单。

1. 安装：`npm install -g nodemon`

   > 如果无法使用nodemon，那么要去环境变量中进行配置

2. 使用`nodemon`运行项目，取代之前的`node app.js`。

```
nodemon  app.js
```

项目运行之后，`nodemon`会自动监听代码的改动，并且重新启动服务，大大增加我们开发效率。

1. `nodemon`常见配置

- 在命令行指定应用的端口号：`nodemon ./server.js localhost 8080`
- 查看帮助，帮助里面有很多选项都是一目了然：`nodemon -h 或者 nodemon --help`
- 运行 debug 模式：`nodemon --debug ./server.js 80`
- 手动重启项目： `Nodemon` 命令运行的终端 窗口中输入 `rs` 两个字符，然后再按下回车键，就能手动重启 `Nodemon`了。

# 3.内置模块

## 3.1http

### http

```js
const http = require('http');

http
  .createServer((req, res) => {
    //每一次请求都会调用这个回调函数
    //req 接受浏览器传的参数
    //res 返回渲染的内容

    //1必须要写end方法来结束这一次请求，不然浏览器会认为没请求完一直转圈。
    res.write('ds');
    res.write('ds1');
    res.end(JSON.stringify([1, 2, 3]));

    //2设置状态码和响应头
        res.writeHead(200, {
          'Content-Type': 'text/html;charset=utf-8',
        });
        res.end(`
        <html>
            <b>hello wolrd</b>
            <div>大家好</div>
        </html>
      `);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        data: 'Hello World!',
      })
    );

    //3
    /* 一般网站都会默认发送http://127.0.0.1:8888/favicon.ico请求，
    所以第一次有两个请求，后面因为缓存暂时不会发送 */
    console.log(req.url);
    //这个url不包括前面的域名
    //比如http://127.0.0.1:8888/favicon.ico会输出/favicon.ico
    res.end();
  })
  .listen(8888, () => {
    console.log('启动成功');
  });

```

### http-jsonp

jsonp.js

```js
const http = require('http');

http
  .createServer((req, res) => {
    const myUrl = new URL(`http://127.0.0.1:8888${req.url}`);

    if (myUrl.pathname == '/api') {
      res.end(
        `${myUrl.searchParams.get('callback')}(${JSON.stringify({
          name: 'ds',
          age: 18,
        })})`
      );
    }
  })
  .listen(8888, () => {
    console.log('启动成功');
  });

```

jsonp.html

```html
    <script>
      //       var oscript = document.createElement("script")
      // oscript.src="http://localhost:3000/api/callback=test"

      // document.body.appendChild(oscript);
      function test(data) {
        console.log(data);
      }
    </script>
    <script src="http://127.0.0.1:8888/api?callback=test"></script>

```

### http-cors

cors.js

```js
const http = require('http');
http
  .createServer((req, res) => {
    const myUrl = new URL(`http://127.0.0.1:8888${req.url}`);
    if (myUrl.pathname == '/api') {
       res.writeHead(200, {
         'Access-Control-Allow-Origin': '*',
       });
       res.end(
         JSON.stringify({
           name: 'ds',
           age: 18,
         })
       );
    }
  })
  .listen(8888, () => {
    console.log('启动成功');
  });

```

cors.html

```html
   <script>
      fetch('http://127.0.0.1:8888/api')
        .then(ret => ret.json())
        .then(ret => {
          console.log(ret);
        });
    </script> 

```

![屏幕截图 2022-06-13 193659.png](https://tva1.sinaimg.cn/large/0074UQWJgy1h3b2bz611hj314i0fmad2.jpg)

### http-get

```js
const http = require('http');
//如果请求的网站是https，得用https模块
const https = require('https');

http
  .createServer((req, res) => {
    const myUrl = new URL(`http://127.0.0.1:8888${req.url}`);

    if (myUrl.pathname == '/api') {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8',
      });
      //客户端 去猫眼要数据
      getMaoYan(data => {
        res.end(data);
      });
    }
  })
  .listen(8888, () => {
    console.log('启动成功');
  });

function getMaoYan(callback) {
  let data = '';
  https.get(
    'https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4',
    res => {
      //这个操作是异步的，每次获取一点数据
      res.on('data', chunk => {
        data += chunk;
      });
      // 监听上面获取数据结束调用这个回调函数
      res.on('end', () => {
        callback(data);
      });
    }
  );
}
```



## 3.2url

```js
const http = require('http');
http
  .createServer((req, res) => {
    接收一个完整的url
    const myUrl = new URL(`http://127.0.0.1:8888${req.url}`);

    if (myUrl.pathname !== '/favicon.ico') {
      console.log(myUrl);  输出url信息对象
    URL {
        href: 'http://127.0.0.1:8888/api/a?a=ds&b=ds2',
        origin: 'http://127.0.0.1:8888',
        protocol: 'http:',
        username: '',
        password: '',
        host: '127.0.0.1:8888',
        hostname: '127.0.0.1',
        port: '8888',
        pathname: '/api/a',
        search: '?a=ds&b=ds2',
        searchParams: URLSearchParams { 'a' => 'ds', 'b' => 'ds2' },
        hash: ''
    } 
        
      console.log(myUrl.searchParams.get('a'));  'ds'

      myUrl.searchParams是一个迭代器
      for (const i of myUrl.searchParams) {
        console.log(i);
         [ 'a', 'ds' ]
           [ 'b', 'ds2' ] 
      }
      for (const [key, value] of myUrl.searchParams) {
        console.log(key, value);
         a ds
           b ds2 
      }
    }
    res.end();
  })
  .listen(8888, () => {
    console.log('启动成功');
  });

```

## 3.3qs

  qs是一个npm仓库所管理的包,可通过npm install qs命令进行安装.

1. qs.parse()将URL解析成对象的形式

2. qs.stringify()将对象 序列化成URL的形式，以&进行拼接

```js
const qs = require('qs');

1.qs.parse()
const str = "username='admin'&password='123456'";
console.log(qs.parse(str)); Object { username: "admin", password: "123456" }

2.qs.stringify()
const a = qs.stringify({ username: 'admin', password: '123456' });
console.log(a); username=admin&password=123456



qs.stringify() 和JSON.stringify()有什么区别?

    var a = {name:'hehe',age:10};
    qs.stringify序列化结果如
    name=hehe&age=10
    --------------------
    而JSON.stringify序列化结果如下：
    "{"a":"hehe","age":10}"
```

## 3.4events

Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件，如下实例：

```js
// 引入 events 模块
var EventEmitter = require('events');
// 创建 eventEmitter 对象
var event = new EventEmitter();
```

以下程序绑定事件处理程序：

```js
// 绑定事件及事件的处理程序
eventEmitter.on('eventName', eventHandler);
```

我们可以通过程序触发事件：

```js
// 触发事件
eventEmitter.emit('eventName');
```

`EventEmitter `的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，`EventEmitter `支持 若干个事件监听器。

当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

让我们以下面的例子解释这个过程：

```js
// 引入 events 模块
var EventEmitter = require('events');
// 创建 eventEmitter 对象
var event = new EventEmitter();
event.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
}); 
event.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
}); 
event.emit('someEvent', 'arg1 参数', 'arg2 参数'); 
```

执行以上代码，运行的结果如下：

```
$ node event.js 
listener1 arg1 参数 arg2 参数
listener2 arg1 参数 arg2 参数
```

以上例子中，event 为事件 someEvent 注册了两个事件监听器，然后触发了 someEvent 事件。

运行结果中可以看到两个事件监听器回调函数被先后调用。 这就是`EventEmitter`最简单的用法。

`EventEmitter `提供了多个属性，如 **on** 和 **emit**。**on** 函数用于绑定事件函数，**emit** 属性用于触发一个事件

## 3.5fs

Node.js中赋予了JavaScript很多在浏览器中没有的能力，譬如：文件读写，创建http服务器等等，今天我们就来看看在node中怎样用JavaScript进行文件的读写操作。

### 读文件

- 我们在data文件夹下新建一个`a.txt`，并且在里面写入：`hello， node.js!`

- node中对文件相关的操作需要依赖fs模块，这个是node中内置模块之一。

   最后我们`hello.js`中的代码如下:

```js
//1.
fs.readFile('image2/a.txt', 'utf-8', (err, data) => {
  console.log(err);
  if (!err) {
    console.log(data);
  }
});

//2.
fs.readFile('image2/a.txt', (err, data) => {
    console.log(err);
    if (!err) {
      console.log(data.toString("utf-8"));
    }
  });
    // 读文件。 readFile函数接受两个参数：读取文件路径，回调函数（error，data两个参数），
   读取文件成功：data为文件内容，error为null，读取失败：error为错误对象，data为undefined
   
   
// 同步读取文件
try {
  const content = fs.readFileSync('./logs/log-1.txt', 'utf-8')
  console.log(content)
  console.log(0)
} catch (e) {
  console.log(e.message)
}

// 异步读取文件
const fs = require("fs").promises
fs.readFile('./logs/log-0.txt', 'utf-8').then(result => {
  console.log(result)
}).catch(err=>console.log(err));
```

   在这里可以说一下，我们读取回来的默认是二进制的内容，所以需要调用toString()方法进行转换。

### 写文件

```js
写入文件(目录必须存在，会自动创建文件，会覆盖文件重新写入)
 fs.writeFile('./image2/a.txt', '你好', err => {
   console.log(err);
 });
```

最后我们看到在同级目录下出现了一个`a.txt`文件，并且里面的内容为`你好`. 如图：

### 追加内容

```js
追加内容(会自动创建文件)
fs.appendFile('./image2/b.txt', '\nhello world', err => {
  console.log(err);
});
```

### 删除文件

```js
删除文件
fs.unlink('./image2/a.txt', err => {
  console.log(err);
});
```

------

#### 删除整个目录

```js
//1
const fs = require("fs")
fs.("./avatar",(err,data)=>{
    // console.log(data)
    data.forEach(item=>{
        fs.unlinkSync(`./avatar/${item}`)
    })

    fs.rmdir("./avatar",(err)=>{
        console.log(err)
    })
})

//2
const fs = require('fs')
fs.readdir("./avatar").then(async (data)=>{
    let arr = []
    data.forEach(item=>{
        arr.push(fs.unlink(`./avatar/${item}`))
    })
    await Promise.all(arr)
    await fs.rmdir("./avatar")
})

//3
const fs = require('fs').promises;
fs.readdir('./image2').then(async data => {
  await Promise.all(data.map(item => fs.unlink(`./image2/${item}`)));
  await fs.rmdir('./image2');
});

```

### 创建目录

```js
fs.mkdir('image', err => {
  if (err && err.code === 'EEXIST') {
    console.log('目录已经存在');
  }
});
```

### 读取目录

```js
读取该目录所有文件和文件夹名称(包括后缀)
fs.readdir('./image2', (err, data) => {
  if (!err) {
    console.log(data);
  }
});
```

------

### 删除目录

```js
删除目录(前提没有文件在里面)
fs.rmdir('./avatar', err => {
  if (err && err.code === 'ENOENT') {
    console.log('目录不存在');
  }
});
```

### 重命名

```js
更改目录或者文件名称
fs.rename('image', 'image2', err => {
  if (err && err.code === 'ENOENT') {
    console.log('目录不存在');
  }
});
fs.rename('./image2/2.txt', './image2/1.txt', err => {
  if (err && err.code === 'ENOENT') {
    console.log('目录不存在');
  }
});
```

### 判断是目录还是文件

```js
判断是目录还是文件，返回布尔值
fs.stat('./image2/a', (err, data) => {
  console.log(data.isDirectory());
  console.log(data.isFile());
});
```

## 3.6path

**什么是path模块？**
path模块也是node.js官方提供的用于处理路径的模块，用于满足对路径处理的需求。
如果要在JavaScript中使用path模块同样也需要用如下方式进行导入

const path = require('path')

常用的方法有：

> path.join() ：将多个路径片段拼接成一个完整的路径字符串
>
> path.basename() ：从路径字符串中将文件名解析出来

```js
let path = require("path")
let fs = require("fs")

console.log(path)

let strPath = "http://www.newsimg.cn/xjp20171103/images/xjp_banner.jpg";
//获取路径信息的扩展名
let info =path.extname(strPath)
console.log(info)//.jpg

//获取当前执行目录的完整路径(将所有字符连接起来)
console.log(__dirname)
let info2 = path.join(__dirname,'sxt','qianduan','zhongji')
console.log(info2)

//path.basename( )
//该方法可以获取路径中的最后一部分,路径终点的文件名，语法如下：
// 定义一个文件的存放路径
const fpath = 'a/b/c/index.html'
// 从文件路径中获取到文件名
const fullName = path.basename(fpath)
//const fullName = path.basename(fpath,'html')// 剔除扩展名，只保留文件名
console.log(fullName)
// 打印得到结果"index.html"

//获取当前执行文件的目录
console.log(__dirname)

//获取当前的执行文件的完整路径
console.log(__filename)

//解析路径，可以将路径信息直接解析出来,解析出根路径，目录，扩展名，文件名称，文件名，扩展名
console.log(path.parse(__filename))
```

## 3.7stream

`stream`是Node.js提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。

什么是流？流是一种抽象的数据结构。想象水流，当在水管中流动时，就可以从某个地方（例如自来水厂）源源不断地到达另一个地方（比如你家的洗手池）。我们也可以把数据看成是数据流，比如你敲键盘的时候，就可以把每个字符依次连起来，看成字符流。这个流是从键盘输入到应用程序，实际上它还对应着一个名字：标准输入流（stdin）。

如果应用程序把字符一个一个输出到显示器上，这也可以看成是一个流，这个流也有名字：标准输出流（stdout）。流的特点是数据是有序的，而且必须依次读取，或者依次写入，不能像Array那样随机定位。

有些流用来读取数据，比如从文件读取数据时，可以打开一个文件流，然后从文件流中不断地读取数据。有些流用来写入数据，比如向文件写入数据时，只需要把数据不断地往文件流中写进去就可以了。

在Node.js中，流也是一个对象，我们只需要响应流的事件就可以了：`data`事件表示流的数据已经可以读取了，`end`事件表示这个流已经到末尾了，没有数据可以读取了，`error`事件表示出错了。

```js
const fs = require('fs');

//创建读取流
let rs = fs.ReadStream('hello.txt', 'utf-8');

rs.on('open', function () {
  console.log('读取的文件已打开');
});

rs.on('close', function () {
  console.log('读取流结束');
});

rs.on('error', err => {
  console.log(err);
});

//每一批数据流入完成
rs.on('data', function (chunk) {
  console.log('单批数据流入:' + chunk.length);
  console.log(chunk);
});

```

要注意，`data`事件可能会有多次，每次传递的`chunk`是流的一部分数据。

**读取视频**

```js
const fs = require('fs');

//创建读取流
let rs = fs.createReadStream('video.mp4');

//每一批数据流入完成
rs.on('data', function (chunk) {
  console.log('单批数据流入:' + chunk.length);
  console.log(chunk);
});
```

![image-20220620103430784](https://tva1.sinaimg.cn/large/0074UQWJgy1h3eigfl898j31750iztjs.jpg)

**写入流**

要以流的形式写入文件，只需要不断调用`write()`方法，最后以`end()`结束：

```js
const fs = require('fs');

//创建写入流
let ws = fs.createWriteStream('hello.txt', 'utf-8');

//监听文件打开事件
ws.on('open', function () {
  console.log('文件打开');
});

//监听文件关闭事件
ws.on('close', function () {
  console.log('文件写入完成，关闭');
});

//文件流式写入
ws.write('helloworld1!', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('内容1流入完成');
  }
});
ws.write('helloworld2!', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('内容2流入完成');
  }
});

//文件写入完成
ws.end(function () {
  console.log('文件写入关闭');
});

```

`pipe` 就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个`Readable`流和一个`Writable`流串起来后，所有的数据自动从`Readable`流进入`Writable`流，这种操作叫`pipe`。

在Node.js中，`Readable`流有一个`pipe()`方法，就是用来干这件事的。

让我们用`pipe()`把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序：

```js
const fs = require('fs');

//创建读取流
let rs = fs.createReadStream('video.mp4');
let ws = fs.createWriteStream('b.mp4');

rs.on('close', function () {
  console.log('读取流结束');
});

rs.pipe(ws);

```

**pipe原理**

```js
const fs = require('fs');

//创建读取流
let rs = fs.createReadStream('video.mp4');
let ws = fs.createWriteStream('b.mp4');

rs.on('close', function () {
  ws.end();
  console.log('读取流结束');
});

//每一批数据流入完成
rs.on('data', function (chunk) {
  console.log('单批数据流入:' + chunk.length);
  ws.write(chunk, () => {
    console.log('单批输入流入完成');
  });
});

```

## 3.8zlib

![image-20220617143741347](https://tva1.sinaimg.cn/large/0074UQWJgy1h3eh62tqdqj30o70dodix.jpg)

```js
const fs = require('fs')
const zlib = require('zlib')

const gzip = zlib.createGzip()

const readstream = fs.createReadStream('./note.txt')
const writestream = fs.createWriteStream('./note2.txt')

readstream
  .pipe(gzip)
  .pipe(writestream)
```

**将大文件返回**

```js
const fs = require('fs');
const zlib = require('zlib');//这两个要写在fs模块后面
const gzip = zlib.createGzip();
const http = require('http');

http
  .createServer((req, res) => {
    let rs = fs.createReadStream('hello.js');
    res.writeHead(200, {
      'Content-Type': 'application/x-javascript;charset=utf-8',
      'Content-Encoding': 'gzip',
    });
    rs.pipe(gzip).pipe(res);
  })
  .listen(3000, () => {
    console.log('server start');
  });

```

## 3.9crypto

crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。

MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：

```js
const crypto = require('crypto');

const hash = crypto.createHash('md5');

// 可任意多次调用update():
//对字符串进行加密
hash.update('Hello, world!');
hash.update('Hello, nodejs!');
console.log(hash.digest('hex')); 
```

`update()`方法默认字符串编码为`UTF-8`，也可以传入Buffer。

Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：

```js
const crypto = require('crypto');

const hmac = crypto.createHmac('md5', 'secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex')); // 80f7e22570...

```

只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法。

# 4.爬虫

**puppeteer**

**文档:[puppeteer.js中文文档|puppeteerjs中文网|puppeteer爬虫教程](http://www.puppeteerjs.com/)**

Puppeteer本身依赖6.4以上的Node，但是为了异步超级好用的[async/await](http://es6.ruanyifeng.com/#docs/async)，推荐使用7.6版本以上的Node。另外headless Chrome本身对服务器依赖的库的版本要求比较高，centos服务器依赖偏稳定，v6很难使用headless Chrome，提升依赖版本可能出现各种服务器问题（包括且不限于无法使用ssh），最好使用高版本服务器。

Puppeteer因为是一个npm的包，所以安装很简单：

> pnpm i puppeteer-core

> puppeteer会自动安装一个谷歌浏览器的安装包，所以选择core版，但是得指定启动路径

**使用和例子**

Puppeteer类似其他框架，通过操作Browser实例来操作浏览器作出相应的反应。

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://rennaiqian.com');
  await page.screenshot({path: 'example.png'});
  await page.pdf({path: 'example.pdf', format: 'A4'});
  await browser.close();
})();
```

上述代码通过puppeteer的launch方法生成了一个browser的实例，对应于浏览器，launch方法可以传入配置项，比较有用的是在本地调试时传入{headless:false}可以关闭headless模式。

```js
const browser = await puppeteer.launch({headless:false})
```

browser.newPage方法可以打开一个新选项卡并返回选项卡的实例page，通过page上的各种方法可以对页面进行常用操作。上述代码就进行了截屏和打印pdf的操作。

一个很强大的方法是page.evaluate(pageFunction, ...args)，可以向页面注入我们的函数，这样就有了无限可能

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://rennaiqian.com');

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log('Dimensions:', dimensions);
  await browser.close();
})();
```

需要注意的是evaluate方法中是无法直接使用外部的变量的，需要作为参数传入，想要获得执行的结果也需要return出来。因为是一个开源一个多月的项目，现在项目很活跃，所以使用时自行查找[api](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)才能保证参数、使用方法不会错。

**调试技巧**

1. 关掉无界面模式，有时查看浏览器显示的内容是很有用的。使用以下命令可以启动完整版浏览器：

```js
const browser = await puppeteer.launch({headless: false})
```

1. 减慢速度，slowMo选项以指定的毫秒减慢Puppeteer的操作。这是另一个看到发生了什么的方法：

```js
const browser = await puppeteer.launch({
  headless:false,
  slowMo:250
});
```

3.捕获console的输出,通过监听console事件。在page.evaluate里调试代码时这也很方便：

```js
page.on('console', msg => console.log('PAGE LOG:', ...msg.args));
await page.evaluate(() => console.log(`url is ${location.href}`));
```

**爬虫实践**

很多网页通过user-agent来判断设备，可以通过page.emulate(options)来进行模拟。options有两个配置项，一个为userAgent，另一个为viewport可以设置宽度(width)、高度(height)、屏幕缩放(deviceScaleFactor)、是否是移动端(isMobile)、有无touch事件(hasTouch)。

```js
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://www.example.com');
  // other actions...
  await browser.close();
});
```

上述代码则模拟了iPhone6访问某网站，其中devices是puppeteer内置的一些常见设备的模拟参数。

很多网页需要登录，有两种解决方案：

> 1. 让puppeteer去输入账号密码 常用方法：点击可以使用page.click(selector[, options])方法，也可以选择聚焦page.focus(selector)。 输入可以使用page.type(selector, text[, options])输入指定的字符串，还可以在options中设置delay缓慢输入更像真人一些。也可以使用keyboard.down(key[, options])来一个字符一个字符的输入。
> 2. 如果是通过cookie判断登录状态的可以通过page.setCookie(...cookies)，想要维持cookie可以定时访问。

**Tip：有些网站需要扫码，但是相同域名的其他网页却有登录，就可以尝试去可以登录的网页登录完利用cookie访问跳过扫码。**

简单例子

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://baidu.com');
  await page.type('#kw', 'puppeteer', {delay: 100});
  page.click('#su')
  await page.waitFor(1000);
  const targetLink = await page.evaluate(() => {
    return [...document.querySelectorAll('.result a')].filter(item => {
      return item.innerText && item.innerText.includes('Puppeteer的入门和实践')
    }).toString()
  });
  await page.goto(targetLink);
  await page.waitFor(1000);
  browser.close();
})()
```

![爬虫](https://i0.hdslb.com/bfs/album/e70bfa89b435885a8705d32af28fa5123d4c38da.gif)

## 4.1多元素处理

```js
const puppeteer = require('puppeteer-core');

(async function () {
  //puppeteer.launch实例开启浏览器，
  //可以传入一个options对象，可以配置为无界面浏览器，也可以配置为有界面浏览器
  //无界面浏览器性能更高更快，有界面一般用于调试开式

  let options = {
    //设置视窗的宽高
    defaultViewport: {
      width: 1400,
      height: 800,
    },
    //设置为有界面，如果为true，即为无界面
    // headless: false,
    args: ['--window-size=1400,700'],
    //指定浏览器路径
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  };
  let browser = await puppeteer.launch(options);
  //打开新页面
  let page = await browser.newPage();
  //访问页面
  await page.goto('https://www.jd.com/');
  //截屏
  //   await page.screenshot({ path: 'example.png', fullPage: true });
  //获取页面内容
  // page.$eval相当于querySelector,然后在对这个元素进行dom操作
  // page.$$eval相当于querySelectorAll,然后在对这个元素进行dom操作
  let input = await page.$('#key');
  await input.type('手机');
  await page.keyboard.press('Enter');
  await page.waitForSelector('.gl-warp>.gl-item:last-child');
  const lis = await page.$$eval('.gl-warp>.gl-item', els =>
    //这个el就是获取到的对象
    //这里可以使用dom操作
    // console.log(el);
    els.map(item => item.innerText)
  );
  //这个lis就是上面回调函数的返回值
  console.log(lis);

  //关闭浏览器
  await browser.close();
})();

```

## 4.2输入文本与元素点击 

```js
const puppeteer = require('puppeteer-core');
(async function () {
  let options = {
    defaultViewport: {
      width: 1400,
      height: 800,
    },
    headless: false,
    args: ['--window-size=1400,700'],
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  };
  let browser = await puppeteer.launch(options);
  let page = await browser.newPage();
  await page.goto('https://www.ygdy8.com/index.html');
  //获取页面内容
  //  page.$相当于querySelector
  //  page.$$相当于querySelectorAll
  //这些返回的是一个elementHandle对象
  const input = await page.$('input[name="keyword"]'); // 定位输入框
  /*  1
  input.focus()
  page.keyboard.type("电影") */
  //2
  await input.type('电影');

  /* 1  
 elementHandle.click()
  const search = await page.$('input[name="Submit"]'); // 定位搜索按钮
  await search.click();  // 点击 */
  //2
  await page.click('input[name="Submit"]');
})();
```

4.3获取元素的文本值

```js
const puppeteer = require('puppeteer-core');
(async function () {
  let options = {
    defaultViewport: {
      width: 1400,
      height: 700,
    },
    args: ['--window-size=1400,700'],
    headless: false,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  };
  let browser = await puppeteer.launch(options);
  let page = await browser.newPage();
  await page.goto('https://www.baidu.com/');
  let input = await page.waitForSelector('#kw');
  await input.type('hello world');
  let btn = await page.$('#su');
  btn.click();
  /* 等待指定的选择器匹配的元素出现在页面中，如果调用此方法时已经有匹配的元素，
  那么此方法立即返回。如果指定的选择器在超时时间后扔不出现，此方法会报错。 
  返回: <Promise<ElementHandle>>*/
  await page.waitForSelector('div#content_left > div.result-op.c-container.xpath-log');
  let text = await page.$eval(
    'div#content_left > div.result-op.c-container.xpath-log',
    el => el.innerText
  );
  console.log(text);
})();
```

## 4.4处理js方法

```js
const puppeteer = require('puppeteer-core');
(async function () {
  let options = {
    defaultViewport: {
      width: 1400,
      height: 700,
    },
    args: ['--window-size=1400,700'],
    // headless: false,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  };
  let browser = await puppeteer.launch(options);
  let page = await browser.newPage();
  await page.goto('https://www.baidu.com/');
  let input = await page.waitForSelector('#kw');
  await input.type('hello world');
  let btn = await page.$('#su');
  btn.click();
  await page.waitForSelector('div#content_left > div.result-op.c-container.xpath-log');
  //里面可以直接写js代码
  let text = await page.evaluate(() => {
    let div = document.querySelector('div#content_left > div.result-op.c-container.xpath-log');
    return div.innerText;
  });
  console.log(text);
})();

```

# 5.路由

## 5.1路由

**index.js**

```js
// 启动服务
const server = require('./server.js');
//路由模块
const route = require('./route.js');
//api
const apiRouter = require('./api.js');

server.use(route);
server.use(apiRouter);
server.start();

```

**server.js**

```js
const http = require('http');

//创建一个大对象存储所有的路由和api
const route = {};

// 将所有路由和api合并的函数
function use(routeObj) {
  Object.assign(route, routeObj);
}

function start() {
  http
    .createServer(async (req, res) => {
      const url = new URL(req.url, 'http://127.0.0.1');
      route[url.pathname](res);
    })
    .listen(3000, () => {
      console.log('启动成功');
    });
}

module.exports = {
  use,
  start,
};

```

**route.js**

```js
const fs = require('fs');

function render(res, path, type = '') {
  res.writeHead(200, { 'Content-Type': `${type ? type : 'text/html'};charset=utf8` });
  res.write(fs.readFileSync(path), 'utf-8');
  res.end();
}

const route = {
  '/login'(res) {
    render(res, './static/login.html');
  },
  '/home'(res) {
    render(res, './static/home.html');
  },
  '/favicon.ico'(res) {
    render(res, './static/favicon.ico', 'image/x-icon');
  },
  '/404'(res) {
    res.writeHead(404, { 'Content-Type': 'text/html;charset=utf8' });
    res.write(fs.readFileSync('./static/404.html'), 'utf-8');
    res.end();
  },
};

module.exports = route;

```

**api.js**

```js
function render(res, data, type = '') {
  res.writeHead(200, { 'Content-Type': `${type ? type : 'application/json'};charset=utf8` });
  res.write(data);
  res.end();
}

const apiRouter = {
  '/api/login'(res) {
    render(res, '{ ok: 1 }');
  },
};

module.exports = apiRouter;

```

## 5.2获取参数

**api.js**

```js
function render(res, data, type = '') {
  res.writeHead(200, { 'Content-Type': `${type ? type : 'application/json'};charset=utf8` });
  res.write(data);
  res.end();
}

const apiRouter = {
    //get请求
  '/api/login'(req, res) {
    const url = new URL(req.url, 'http://127.0.0.1');
    const data = {};
    let username = url.searchParams.get('username');
    let password = url.searchParams.get('password');
    if (username === 'ds' && password === '123') {
      Object.assign(data, {
        ok: 1,
      });
    } else {
      Object.assign(data, {
        ok: 0,
      });
    }
    render(res, JSON.stringify(data));
  },
    //post请求
  '/api/loginpost'(req, res) {
    const url = new URL(req.url, 'http://127.0.0.1');
    let data = '';
      //这里使用最原始的方法获取post请求参数
      // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', chunk => {
      data += chunk;
    });
       // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', () => {
      data = JSON.parse(data);
      if (data.username === 'ds' && data.password === '123') {
        render(res, JSON.stringify({ ok: 1 }));
      } else {
        render(res, JSON.stringify({ ok: 0 }));
      }
    });
  },
};

module.exports = apiRouter;

```

**请求.js**

```js
 login.onclick = () => {
        //get请求
        fetch(`/api/login?username=${username.value}&password=${password.value}`)
          .then(res => res.text())
          .then(res => {
            console.log(res);
          });
      };
      loginpost.onclick = () => {
        //post请求
        fetch(`/api/loginpost`, {
          method: 'POST',
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.text())
          .then(res => {
            console.log(res);
          });
```

## 5.3静态目录

**server.js**

```js
const http = require('http');

const route = {};

function use(routeObj) {
  Object.assign(route, routeObj);
}

function start() {
  http
    .createServer(async (req, res) => {
      const url = new URL(req.url, 'http://127.0.0.1');
      try {
        route[url.pathname](req, res);
          //使所有匹配不到的路径走404网页
      } catch (err) {
        route['/404'](req, res);
      }
    })
    .listen(3000, () => {
      console.log('启动成功');
    });
}

module.exports = {
  use,
  start,
};

```

**route.js**

```js
const fs = require('fs');
const path = require('path');
//根据文件后缀名自动识别响应头中content-type
const mime = require('mime');

function render(res, path, type = '') {
  res.writeHead(200, { 'Content-Type': `${type ? type : 'text/html'};charset=utf8` });
  res.write(fs.readFileSync(path), 'utf-8');
  res.end();
}

const route = {
  '/login'(req, res) {
    render(res, './static/login.html');
  },
  '/home'(req, res) {
    render(res, './static/home.html');
  },
  '/404'(req, res) {
    const url = new URL(req.url, 'http://127.0.0.1');
     /*
     <link href='/css/index.css'></link>根路径访问，就等于127.0.0.1:3000/css/index.css。
     这里将项目文件夹F://项目+static+/css/index.css合并成文件路径，如果存在就读取该文件返回
     */
    let pathname = path.join(__dirname, 'static', url.pathname);
    if (readStaticFile(res, pathname)) {
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/html;charset=utf8' });
    res.write(fs.readFileSync('./static/404.html'), 'utf-8');
    res.end();
  },
};

function readStaticFile(res, pathname) {
  let houzhui = pathname.split('.');
    //如果存在这些静态资源就用fs的写入方法返回回去，不走404
  if (fs.existsSync(pathname)) {
      //mime.getType(css)
    render(res, pathname, mime.getType(houzhui[houzhui.length - 1]));
    return true;
  } else {
    return false;
  }
}

module.exports = route;

```

# 6.express

> https://www.expressjs.com.cn/

基于 Node.js 平台，快速、开放、极简的 web 开发框架。

## Express的安装方式

Express的安装可直接使用npm包管理器上的项目，在安装npm之前可先安装淘宝镜像：

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

这样我们使用cnpm的来代替npm，这使得下载速度提高很多；其次你需要在你项目目录下运行以下指令来初始化npm，期间所有提示按enter键即可，这会生成package.json，它是用于描述项目文件的。

```
cnpm init
```

再输入

```
cnpm install
```

这下项目目录中又会多出一个叫node_modules文件夹，里面是node.js为我们提供的模块，当然现在没有。接下来便是真正的安装express了，执行：

```
cnpm install express --save
```

这时，我们看到node_modules文件夹多了许多不同版本的应用文件夹，接下来执行

```
express --version
```

查看express是否安装成功，如果显示版本号，则安装正确。

## Express脚手架的安装

安装Express脚手架有两种方式：

### 1、使用express-generator安装

使用命令行进入项目目录，依次执行：

```
cnpm i -g express-generator
```

可通过express -h查看命令行的指令含义

```
express -h
```

```
Usage: express [options] [dir]
```

```
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

```
express --view=ejs app
```

进入app，并安装依赖

```
cd myapp
npm install
```

**在Windows 下，使用以下命令启Express应用：**

```
set DEBUG=app:* & npm start
```

**在 MacOS 或 Linux 下，使用以下命令启Express应用：**

```
DEBUG=app:* npm start
```

### 2、使用 express 命令 来快速从创建一个项目目录

express 项目文件夹的名字 -e 如 使用命令行进入项目目录，依次执行：

```
express app -e
cd app
cnpm install
```

这时，你也可以看到在app文件夹下的文件结构；

```
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

## 6.1路由

### **Express路由简介**

路由表示应用程序端点 (URI) 的定义以及响应客户端请求的方式。它包含一个请求方时（methods）、路径（path）和路由匹配时的函数（callback）;

```js
app.methods(path, callback);
```

### **Express路由方法**

Express方法源于 HTTP 方法之一，附加到 express 类的实例。它可请求的方法包括：

get、post、put、head、delete、options、trace、copy、lock、mkcol、move、purge、propfind、proppatch、unlock、report、mkactivity、checkout、merge、m-search、notify、subscribe、unsubscribe、patch、search 和 connect。

> 路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。
>
> 路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成，它的结构如下： app.METHOD(path, [callback...], callback)， app 是 express 对象的一个实例， METHOD 是一个 HTTP 请求方法， path 是服务器上的路径， callback 是当路由匹配时要执行的函数。

下面是一个基本的路由示例：

```js
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  //写完一个send，后面所有跟路由有关的都不会执行
  //会自动响应对应的数据类型
  //   res.send([1, 2, 3]);
  //   res.send({ ok: 1 });
  //   res.json({ ok: 1 });
   // 使用混合使用函数数组处理时如果前面有res.send();那么后面和路由处理相关代码都不生效
  res.send('hello world');
  res.send(`
        <html>
            <h1>hello world</h2>
        </html>
    `);
});
```

路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。

### 路径

#### 字符串路径

```js
// 匹配根路径的请求
app.get('/', function (req, res) {
  res.send('root');
});

// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
  res.send('about');
});

// 匹配 /random.text 路径的请求
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
```

#### 字符串模式路径

使用字符串模式的路由路径示例：

```js
// 匹配 acd 和 abcd
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
```

#### 正则表达式路径

使用正则表达式的路由路径示例：

```js
// 匹配任何路径中含有 a 的路径：
app.get(/a/, function(req, res) {
  res.send('/a/');
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
```

可以为请求处理提供多个回调函数，其行为类似 中间件。唯一的区别是这些回调函数有可能调用 next('route') 方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。

```js
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
```

使用多个回调函数处理路由（记得指定 next 对象）：

```js
app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
```

使用回调函数数组处理路由：

```js
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

### 动态路由

**路线参数**

路由参数被命名为URL段，用于捕获URL中在其位置处指定的值。捕获的值将填充到`req.params`对象中，并将路径中指定的route参数的名称作为其各自的键。

```js
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

要使用路由参数定义路由，只需在路由路径中指定路由参数，如下所示。

```js
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})
```

路径参数的名称必须由“文字字符”（[A-Za-z0-9_]）组成。

由于连字符（`-`）和点（`.`）是按字面解释的，因此可以将它们与路由参数一起使用，以实现有用的目的。

```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

要更好地控制可以由route参数匹配的确切字符串，可以在括号（`()`）后面附加一个正则表达式：

```
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```

由于正则表达式通常是文字字符串的一部分，因此请确保`\`使用其他反斜杠对所有字符进行转义，例如`\\d+`。

在Express 4.x中，[不以常规方式解释正则表达式中](https://github.com/expressjs/express/issues/2495)[的`*`字符](https://github.com/expressjs/express/issues/2495)。解决方法是使用`{0,}`代替`*`。这可能会在Express 5中修复。

### 路线处理程序

您可以提供行为类似于[中间件的](http://www.expressjs.com.cn/en/guide/using-middleware.html)多个回调函数来处理请求。唯一的例外是这些回调可能会调用`next('route')`以绕过其余的路由回调。您可以使用此机制在路由上施加先决条件，然后在没有理由继续使用当前路由的情况下将控制权传递给后续路由。

多个回调函数可以处理一条路由（确保指定了`next`对象）。例如：

```js
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})
```

混合使用函数和函数数组处理路由：

```js
const fun1 = (req, res, next) => {
  // 验证用户token过期, cookie过期
  console.log('token验证');
  let isValid = true;
  if (isValid) {
    next();
  } else {
    //将第一个中间件的数据传输到第二个中间件
    res.name = "dselegent";
    res.send('error');
  }
};
const fun2 = (req, res) => {
   console.log(res.name)
  res.send('home');
};
app.get('/home', [fun1, fun2]);

app.get('/list', fun1, (req, res) => {
  res.send('list');
});
```

### 应对方法

`res`下表中响应对象（）上的方法可以将响应发送到客户端，并终止请求-响应周期。如果从路由处理程序中未调用这些方法，则客户端请求将被挂起。

| 方法                                                         | 描述                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------ |
| [res.download()](http://www.expressjs.com.cn/en/4x/api.html#res.download) | 提示要下载的文件。                                     |
| [res.end（）](http://www.expressjs.com.cn/en/4x/api.html#res.end) | 结束响应过程。                                         |
| [res.json（）](http://www.expressjs.com.cn/en/4x/api.html#res.json) | 发送JSON响应。                                         |
| [res.jsonp（）](http://www.expressjs.com.cn/en/4x/api.html#res.jsonp) | 发送带有JSONP支持的JSON响应。                          |
| [res.redirect（）](http://www.expressjs.com.cn/en/4x/api.html#res.redirect) | 重定向请求。                                           |
| [res.render（）](http://www.expressjs.com.cn/en/4x/api.html#res.render) | 渲染视图模板。                                         |
| [res.send（）](http://www.expressjs.com.cn/en/4x/api.html#res.send) | 发送各种类型的响应。                                   |
| [res.sendFile（）](http://www.expressjs.com.cn/en/4x/api.html#res.sendFile) | 将文件作为八位字节流发送。                             |
| [res.sendStatus（）](http://www.expressjs.com.cn/en/4x/api.html#res.sendStatus) | 设置响应状态代码，并将其字符串表示形式发送为响应正文。 |

## 6.2中间件

Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。

中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。

中间件的功能包括：

- 执行任何代码。
- 修改请求和响应对象。
- 终结请求-响应循环。
- 调用堆栈中的下一个中间件。

如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。

Express 应用可使用如下几种中间件：

- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件

使用可选则挂载路径，可在应用级别或路由级别装载中间件。另外，你还可以同时装在一系列中间件函数，从而在一个挂载点上创建一个子中间件栈。

### （1）应用级中间件

应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()， 其中， METHOD 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写。例如：

```js
var app = express()
const indexRouter = require('./route/indexRouter');
const LoginRouter = require('./route/LoginRouter');

//应用级别(后面的路由都会执行此中间件)
app.use((req, res, next) => {
  // 验证用户token过期, cookie过期
  console.log('token验证');
  let isValid = true;
  if (isValid) {
    next();
  } else {
    res.send('error');
  }
});

//应用级别(这里不写路径默认/)
//这些use方法是每次访问都是从上往下执行
//如果是/login/a,会先找到/login开头的这个应用级中间件
//然后再进入这个中间件找/a
app.use(indexRouter);
app.use('/login', LoginRouter);

```

### （2）路由级中间件

#### **app.route()**

您可以使用来为路由路径创建可链接的路由处理程序`app.route()`。由于路径是在单个位置指定的，因此创建模块化路由非常有帮助，减少冗余和错别字也很有帮助。有关路由的更多信息，请参见：[Router（）文档](http://www.expressjs.com.cn/en/4x/api.html#router)。

这是使用定义的链式路由处理程序的示例`app.route()`。

```js
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```

#### **快速路由器**

路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。

使用`express.Router`该类创建模块化的，可安装的路由处理程序。一个`Router`实例是一个完整的中间件和路由系统; 因此，它通常被称为“迷你应用程序”。

以下示例将路由器创建为模块，在其中加载中间件功能，定义一些路由，并将路由器模块安装在主应用程序的路径上。

`home.js`在app目录中创建一个名为以下内容的路由器文件：

```js
var router = express.Router()
```

```js
var app = express()
var router = express.Router()

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route')
  // 负责将控制权交给栈中下一个中间件
  else next() //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular')
})

// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id)
  res.render('special')
})

module.exports=  router
```

然后，在应用程序中加载路由器模块：

```js
var indexRouter = require('./home')
// ...
app.use('/home', index)
```

该应用程序现在将能够处理对`/home`和的请求`/home/user/123456`

### （3）错误处理中间件

错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。

```js
//上面的中间件都没有匹配就会走这里
app.use(function(err, req, res, next) {
  console.error(err.stack)
     //send的状态码默认是200
  res.status(500).send('error')
})
```

### （4）内置的中间件

express.static 是 Express 唯一内置的中间件。它基于 serve-static，负责在 Express 应用中提托管静态资源。每个应用可有多个静态目录。

```js
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.static('files'))
```

### （5）第三方中间件

安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。

下面的例子安装并加载了一个解析 cookie 的中间件： cookie-parser

```js
$ npm install cookie-parser
```

```js
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')

// 加载用于解析 cookie 的中间件
app.use(cookieParser())
```

## 6.3获取请求参数

**url-ky格式**

**请求头content-type:application/x-www-form-urlencoded**

![屏幕截图 2022-06-16 211031.png](https://tva1.sinaimg.cn/large/0074UQWJgy1h3b9l4f5wxj314w0o2agl.jpg)

**json字符串**

**请求头content-type:application/json**

![屏幕截图 2022-06-16 212848.png](https://tva1.sinaimg.cn/large/0074UQWJgy1h3b9m1sctdj31f50mtn4q.jpg)

**index.js**

```js
const express = require('express');
const app = express();
const indexRouter = require('./route/indexRouter');
const LoginRouter = require('./route/LoginRouter');
//配置解析post参数的-不用下载第三方 ,内置
//post参数-(url-ky格式) username=kerwin&password=1234
app.use(express.urlencoded({ extended: false }));
//post参数-(json字符串) {name:"",age:100}
app.use(express.json());
```

**get**

```js
router.get('/', (req, res) => {
  console.log(req.query);
  res.send('/login/a');
});
```

**post**

```js
app.use(express.urlencoded({extended:false}))
app.use(express.json())
router.post('/', (req, res) => {
  console.log(req.body);
  res.send({
    ok: 1,
  });
});
```

## 6.4利用 Express 托管静态文件

通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。

将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：

```js
//直接将public里的index.html当成/的网页
app.use(express.static('public'))
```

现在，public 目录下面的文件就可以访问了。

```js
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

> 所有文件的路径都是相对于存放目录的，因此，存放静态文件的目录名不会出现在 URL 中。

如果你的静态资源存放在多个目录下面，你可以多次调用 express.static 中间件：

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

访问静态资源文件时，express.static 中间件会根据目录添加的顺序查找所需的文件。

如果你希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，如下所示：

```js
app.use('/static', express.static('public'))
```

现在，你就可以通过带有 “/static” 前缀的地址来访问 public 目录下面的文件了。

```tex
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

**总结**

```js
app.use(express.static('public'))
<link rel="stylesheet" href="/css/index.css" />
    
app.use('/static', express.static('public'))
<link rel="stylesheet" href="/static/css/index.css" />
```

## 6.5服务端渲染（模板引擎）

### 一、简介

相比于jade模板引擎，ejs对原HTML语言就未作出结构上的改变，只不过在其交互数据方面做出了些许修改，相比于jade更加简单易用。因此其学习成本是很低的。您也可参考ejs官网：https://ejs.bootcss.com/

![image-20220618170512237](https://tva1.sinaimg.cn/large/0074UQWJgy1h3eh73418lj30pf0ah0zy.jpg)

> 服务端渲染可以在源码中看到，客户端渲染不能再源码中看到

### 二、ejs基本使用

```js
npm i ejs
```

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



### 三、ejs标签各种含义

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

### 四、导入公共模板样式

**header.ejs**

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

index.ejs

```ejs
    <%- include("./header.ejs",{ isShowSchool:true }) %> index <%# 我的注释 %>
```

![image-20220618191129477](https://tva1.sinaimg.cn/large/0074UQWJgy1h3eh7cbp4jj31hc0rq7oj.jpg)

# 7.mongodb

## 7.1 简介

- 1.Mongoose是一个让我们可以通过Node来操作MongoDB的模块。
- 2.Mongoose是一个对象文档模型(ODM)库,它对Node原生的MongoDB模块进行了进一步的优化封装，并提供了更多的功能。在大多数情况下，它被用来把结构化的模式应用到一个MongoDB集合，并提供了验证和类型转换等好处
- 3.mongoose中的对象：
  - Schema  模式对象（Schema对象定义约束了数据库中的文档结构）
  - Model  模型对象（Model对象作为集合中的所有文档的表示，相当于MongoDB数据库中的集合collection）
  - Document  文档对象（Document表示集合中的具体文档，相当于集合中的一个具体的文档）

**mongoose的好处**

> 1. 可以为文档创建一个模式结构(Schema)
> 2. 可以对模型中的对象/文档进行验证
> 3. 数据可以通过类型转换转换为对象模型
> 4. 可以使用中间件来应用业务逻辑挂钩
> 5. 比Node原生的MongoDB驱动更容易

## 7.2 安装

```shell
pnpm i -s mongoose
```

## 7.3 连接数据库

**db.config.js**

```js
// 1.引入mongoose
const mongoose = require("mongoose");

// 2.连接mongodb数据库
// 指定连接数据库后不需要存在，当你插入第一条数据库后会自动创建数据库
/*
mongoose.connect('mongodb://数据库地址:端口号/数据库名',{useMongoClient:true})
如果端口号是默认端口号(27017)则可以省略不写
*/
mongoose.connect("mongodb://localhost:27017/ds2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 3.监听mongodb数据库的连接状态
// 绑定数据库连接成功事件
mongoose.connection.once("open", function () {
    console.log("连接成功");
});
// 绑定数据库连接失败事件
mongoose.connection.once("close", function () {
    console.log("数据库连接已经断开");
});

// 4.断开数据库连接(一般不用)
mongooes.disconnect();
```

> `注:MongoDB数据库，一般情况下，只需要连接一次，连接一次后，除非项目停止服务器关闭，否则连接一般不会断开`

**在bin目录下的www文件中上面直接require(“../config/db.config.js”)进行数据库连接的启动**

## 7.4 创建模式对象和模型对象

UserModel.js

```js
const mongoose = require("mongoose")
const Schema=mongooes.schema;
//创建模式对象
const UserType=new Schema({
    name:{
           type: 'string',
           //添加约束，保证数据的完整性，让数据按规矩统一
           require: true
        },
    age:Number,
    gender:{
        type:String,
                    default:'female'
    },
    address:String
})
//创建模型对象
//通过Schema来创建Model
//Model代表的是数据库中的集合，通过Model才能对数据库进行操作
//mongoose.model(modelName,schema)
//建立映射关系，students是集合,mongoose会自动将集合变成复数比如student会变成students
//大写也会被自动转换为小写，比如users会变成users
const UserModel=mongoose.model("user",UserType，"user"); 
//第一个参数表示创建的集合的名称，第二个参数表示利用的模式对象，第三个参数是强行指定集合名称

module.exports  = UserModel 
```

![image-20220619145550360](https://tva1.sinaimg.cn/large/0074UQWJgy1h3eh7qxqhkj307k03ywex.jpg)

## 7.5 利用模型对象进行增删查改操作

### 7.5.1 添加操作

```js
  //插入数据库
//Model.create(doc,[callback]);			创建一个或多个对象
//Model.createOne(doc, [callback]);		创建一个对象
//Model.createMany(doc, [callback]);		创建多个对象
//	-doc是需要插入的文档
//	-callback(err) 是回调函数，可以用来提示是否创建成功了
  const {username,password,age} = req.body
  UserModel.create({
    username,password,age
  }).then(data=>{
    console.log(data)
    res.send({
      ok:1
    })
  })

```

### 7.5.6 查询操作

```js
/* 
    查询:
- Model.find(conditions,[projection],[options],[callback])
 查询所有符合条件的文档
- Model.findById(id,[projection],[options],[callback])
  根据文档的id属性查询文档
- Model.findOne(conditions,[projection],[options],[callback])
 查询符合条件的第一个文档

  - conditions 查询的条件
  - projection 投影  projection:投影  { name: 1, gender: 1, _id: 0 } 或 'name gender -_id'
  - options 查询选项(skip limit)
  - callback 回调函数，查询结果会通过回调函数返回，回调函数必须传，如果不传回调函数压根不会查询
 
-Model.count(condition, [callback]);	 获取当前这个集合的符合条件的文档数量

 */

  const {page,limit} = req.query
  //投影可以通过空格来隔开,"username name  -_id"显示name, 不显示 _id
  UserModel.find({},"username age -_id").sort({age:-1}).skip((page-1)*limit).limit(limit).then(data=>{
    res.send(data)
  })


UserModel.find({}, function (err, data) {
  console.log(data);
});

//传统方式投影
UserModel.find(
  { name: /liu/i },
  {name:1,age:1,_id:0},
  { skip: 2, limit: 1 },
  function (err, data) {
    console.log(data); //返回的是一个文档对象数组
  }
);

UserModel.findById("5f9fbfba14319e492c0f5bc4", function (err, data) {
  console.log(data);
  console.log(data instanceof UserModel); //true 返回的文档对象属于模型对象（即集合）的实例对象
});

UserModel.countDocuments({}, function (err, data) {
  console.log(data);
});
```

### 7.5.7 修改操作

```js
/* 修改：
Model.updateMany(condition, doc, [options], [callback]);
Model.updateOne(condition, doc, [options], callback);
	** Model.update() 已经不适用了
-- condition 修改的条件
-- doc 修改后的内容/需要修改的内容

需要配合修改操作符来使用:
	$set		表示需要设置指定的属性
	$unset		表示需要删除指定的属性
	$push		表示给数组添加一个新元素，因为文档内也会有数组，数组便会有数组元素
	$addToset 	表示给数组添加一个新元素，和push的区别是，如果出现同名的数组元素，则不会再添加
	$gt			大于
	$gte		大于等于
	$lt			小于
	$lte		小于等于
	$or [{条件一,条件二}]		表示或的意思，符合条件一或者条件二	
	$inc		表示自增，用在在原来数据的基础上对数据加减，可用于加薪减薪的操作
*/
//这个不会用新对象直接覆盖就对象，而是直接找对应的值修改
  const {username,age,password} = req.body
  UserModel.updateOne({_id:req.params.myid},{
    username,age
  }).then(data=>{
    res.send({
      ok:1
    })
  })

```

### 7.5.8 删除操作

```js
/* 
删除：
model.remove(conditions,callback)
model.deleteOne(...)
model.deleteMany(...)
*/
  UserModel.deleteOne({
    _id:req.params.id
  }).then(data=>{
    res.send({
      ok:1
    })
  })

```

# 8.接口规范

## 8.1RESTful架构

![image-20220620210311187](https://i0.hdslb.com/bfs/album/24d16fba176db48019ac7f6af7f8e50d773ff071.png)



![image-20220620210318651](https://i0.hdslb.com/bfs/album/45fffaa11bf9a1e821f3415ef2f62d9915761c81.png)

# 9.业务分层

![image-20220620210337550](https://i0.hdslb.com/bfs/album/c94cdee3e81ad772ae369539d521741546e12fa3.png)

> M层可以替换为services文件夹，因为model文件夹存储数据库模型了

# 10.登录鉴权

## 10.1cookie

### 简介

- 在网站中，HTTP请求是无状态的。也就是说，即使第一次用户访问服务器并登录成功后，第二次请求服务器依然不知道当前发起请求的是哪个用户。
- cookie的执行原理：就是当客户端访问服务器的时候（服务器运用了cookie），服务器会生成一份cookie传输给客户端，客户端会自动把cookie保存起来，以后客户端每次访问服务器，都会自动的携带着这份cookie。

简单来说，就是当客户端访问服务器时，服务器会生成一个票据给客户端，当客户端收到票据的之后就保存起来，以后再访问服务器就会自动带着票据。

![image-20220620211048398](https://i0.hdslb.com/bfs/album/cf7c4b53699d8df9835b8334671615f774273b3d.png)

### **Cookie的特点**

1. cookie保存在浏览器本地，只要不过期关闭浏览器也会存在。
2. 正常情况下cookie不加密，用户可轻松看到
3. 用户可以删除或者禁用cookie
4. cookie可以被篡改
5. cookie可用于攻击
6. cookie存储量很小，大小一般是4k
7. 发送请求自动带上登录信息

### 安装及使用

#### 1.安装

```shell
pnpm install cookie-parser --save
```

#### 2.引入

```js
const cookieParser=require("cookie-parser");
```

#### 3.设置中间件

```js
app.use(cookieParser());
```

#### 4.设置cookie

```js
res.cookie("name",'zhangsan',{maxAge: 1000*60*60, httpOnly: true});
//res.cookie(名称,值,{配置信息})
```

关于设置cookie的参数说明：

1. domain: 域名  
2. name=value：键值对，可以设置要保存的 Key/Value，注意这里的 name 不能和其他属性项的名字一样 
3. Expires： 过期时间（秒），在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday, 09-Nov-99 23:12:40 GMT。
4. maxAge： 最大失效时间（毫秒），设置在多少后失效 。
5. secure： 当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效 。
6. Path： 表示 在那个路由下可以访问到cookie(默认为/，所有网页都能访问)。
7. httpOnly：是微软对 COOKIE 做的扩展。如果在 COOKIE 中设置了“httpOnly”属性，则通过程序（JS 脚本、applet 等）将无法读取到COOKIE 信息，防止 XSS 攻击的产生(通过js的代码document.cookie就无法查看了) 。
8. singed：表示是否签名cookie, 设为true 会对这个 cookie 签名，这样就需要用 res.signedCookies 而不是 res.cookies 访问它。被篡改的签名 cookie 会被服务器拒绝，并且 cookie 值会重置为它的原始值。

#### 5.获取cookie

```
req.cookies.name;
```


下面是一个基础实例：

```js
const express=require("express");
const cookieParser=require("cookie-parser");

var app=express();

//设置中间件
app.use(cookieParser());

app.get("/",function(req,res){
	res.send("首页");
});

//设置cookie
app.get("/set",function(req,res){
    //如果不进行任何设置,有效期默认为1个会话，浏览器关闭即失效
   // res.cookie('isLogin','true');
	res.cookie("userName",'张三',{maxAge: 1000*60*60, httpOnly: true});
	res.send("设置cookie成功");
});

//获取cookie
app.get("/get",function(req,res){
	console.log(req.cookies.userName);
	res.send("获取cookie成功，cookie为："+ req.cookies.userName);
});

app.listen(8080);
```


当访问set路由后会设置cookie，当访问get路由后会获取到设置的cookie值。当然你也可以在其他页面继续获取当前cookie，以实现cookie共享。cookie和session都可以在网页的响应头看到set-cookie

### 关于cookie加密

cookie加密是让客户端用户无法的获取cookie明文信息，是数据安全的重要部分；一般的我们可以在保存cookie时对cookie信息进行加密，或者在res.cookie中对option对象的signed属性设置设置成true即可。



```js
const express = require("express");
const cookieParser = require("cookie-parser");

var app = express();
app.use(cookieParser('secret'));//签名 （加密） 要指定秘钥 ，什么名字都星行，列如："xiaoxuesheng"

app.get("/",function(req,res){
	res.send("主页");
});

//获取cookie
app.use(function(req,res,next){
	console.log(req.signedCookies.name);
	next();
});

//设置cookie
app.use(function(req,res,next){
	console.log(res.cookie("name","zhangsan",{httpOnly: true,maxAge: 200000,signed: true}));
	res.end("cookie为："+req.signedCookies.name);
});

app.listen(8080);
```

## 10.2session

### 简介

- 什么session?
  Session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了session是一种特殊的cookie。cookie是保存在客户端的，而session是保存在服务端。
- 为什么要用session?
  由于cookie 是存在用户端，而且它本身存储的尺寸大小也有限，最关键是用户可以是可见的，并可以随意的修改，很不安全。那如何又要安全，又可以方便的全局读取信息呢？于是，这个时候，一种新的存储会话机制：session 诞生了。
- session原理
  通过cookie存储一个session_id，然后具体的数据则保存在session中。当用户已经登录时，会在浏览器的cookie中保存一个session_id，下次再次请求的时候，会把session_id携带上来，服务器根据session_id在session库中获取用户的session数据，从而能够辨别用户身份，以及得到之前保存的状态信息。

![image-20220620212335597](https://i0.hdslb.com/bfs/album/dacfa03c50bd2e7d2225a7cd3e61291d5da00f63.png)



### cookie和session区别

session与cookie的作用有点类似，都是为了存储用户相关的信息。不同的是，cookie是存储在本地浏览器，session存储在服务器。存储在服务器的数据会更加的安全，不容易被窃取。但存储在服务器也有一定的弊端，就是会占用服务器的资源。

- cookie就像去理发店办了张会员卡，下次去带会员卡（在响应头中设置cookie，以后改域名下每次请求的请求头都会附带cookie）
- session就像去理发店办了张卡，但卡留在了那，记住卡号就行



### 安装及应用

#### 1.安装express-session

```shell
pnpm install express-session --save
```

#### 2.引入express-session模块

```js
const session=require("express-session");
```

#### 3.设置session

```js
session(options);
```


如下列代码：

```js
const express=require("express");
const session=require("express-session");

var app=express();

//配置中间件
//session会自带一个httpOnly
app.use(
  session({
    secret: "this is session", // 服务器生成 session 的签名
    resave: true,     //每次是否都刷新到期时间
    saveUninitialized: true, //强制将为初始化的 session 存储(该session_id是没有用的)
    cookie: {
      maxAge: 1000 * 60 * 10,// 过期时间
      secure: false, // 为 true 时候表示只有 https 协议才能访问cookie
    },
	//自动在mongodb中创建一个数据库存储session，并且过期时间也会同步刷新
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/ds2_session',
      ttl: 1000 * 60 * 10 // 过期时间
  }),
  })
);

app.use((req, res, next) => {
  //排除login相关的路由和接口（因为login就不需要重定向到login了）
  if (req.url.includes("login")) {
    next()
    return
  }
  if (req.session.user) {
    //重新设置以下sesssion
    req.session.mydate = Date.now()//加这个设置才能访问刷新过期时间
    next()
  } else {
    //是接口 , 返回 错误码
    //不是接口，就重定向（因为ajax请求是不能重定向的，只能前端接收错误码做处理）
    req.url.includes("api")
      ? res.status(401).json({ ok: 0 }) : res.redirect("/login")
  }
})

app.use('/login',function(req,res){
	//设置session
	req.session.userinfo='张三';
	res.send("登陆成功！");
});

app.use('/',function(req,res){
	//获取session
	if(req.session.userinfo){
		res.send("hello "+req.session.userinfo+"，welcome");
	}else{
		res.send("未登陆");
	}
});

app.listen(8080);
```

在session(option)中对session进行设置

![image-20220620213936139](https://i0.hdslb.com/bfs/album/de942dfd4665152c07145436f8e1001c1ab6e286.png)

**前端错误处理**

```js
      update.onclick=  ()=>{
        fetch("/api/user/6257ad33341e112715f25cb5",{
          method:"PUT",
          body:JSON.stringify({
            username:"修改的名字",
            password:"修改的密码",
            age:1 
          }),
          headers:{
            "Content-Type":"application/json"
          }
        }).then(res=>res.json()).then(res=>{
          console.log(res)
           //session验证失败会返回ok:0
          if(res.ok===0){
            location.href="/login"
          }
        })
      }
```

#### 4.session的常用方法

```js
//设置session
//req.session就是个大对象
req.session.username="张三"

//获取session
req.session.username

//重新设置cookie的过期时间
req.session.cookie.maxAge=1000;

//销毁session
req.session.destroy(function(err){
	
})
```


以下演示通过销毁session的方式来退出登录

```js
app.use('/login',function(req,res){
	//设置session
	req.session.userinfo='张三';
	res.send("登陆成功！");
});

app.use('/loginOut',function(req,res){
	//注销session
	req.session.destroy(function(err){
		res.send("退出登录！"+err);
	});
});

app.use('/',function(req,res){
	//获取session
	if(req.session.userinfo){
		res.send("hello "+req.session.userinfo+"，welcome to index");
	}else{
		res.send("未登陆");
	}
});

app.listen(8080);
```

当我们进入到主页时，未显示任何信息，进入login路由后，自动设置session，这是回到主页则显示session信息，之后进入loginOut路由已注销session信息，再回到首页显示为`hello 张三, welcome to index`。

## 10.3jwt

**json wb token**

### 简介

##### 什么是JWT?

在介绍JWT之前，我们先来回顾一下利用token进行用户身份验证的流程：

客户端使用用户名和密码请求登录
服务端收到请求，验证用户名和密码
验证成功后，服务端会签发一个token，再把这个token返回给客户端
客户端收到token后可以把它存储起来，
客户端每次向服务端请求资源时需要携带服务端签发的token，可以在cookie或者header中携带
服务端收到请求，然后去验证客户端请求里面带着的token，如果验证成功，就向客户端返回请求数据
这种基于token的认证方式相比传统的session认证方式更节约服务器资源，并且对移动端和分布式更加友好。其优点如下：

支持跨域访问：cookie是无法跨域的，而token由于没有用到cookie(前提是将token放到请求头中)，所以跨域后不会存在信息丢失问题
无状态：token机制在服务端不需要存储session信息，因为token自身包含了所有登录用户的信息，所以可以减轻服务端压力
更适用CDN：可以通过内容分发网络请求服务端的所有资料
更适用于移动端：当客户端是非浏览器平台时，cookie是不被支持的，此时采用token认证方式会简单很多
无需考虑CSRF：由于不再依赖cookie，所以采用token认证方式不会发生CSRF，所以也就无需考虑CSRF的防御
而JWT就是上述流程当中token的一种具体实现方式，其全称是JSON Web Token，官网地址：https://jwt.io/

通俗地说，JWT的本质就是一个字符串，它是将用户信息保存到一个Json字符串中，然后进行编码后得到一个JWT token，并且这个JWT token带有签名信息，接收后可以校验是否被篡改，所以可以用于在各方之间安全地将信息作为Json对象传输。JWT的认证流程如下：

首先，前端通过Web表单将自己的用户名和密码发送到后端的接口，这个过程一般是一个POST请求。建议的方式是通过SSL加密的传输(HTTPS)，从而避免敏感信息被嗅探
后端核对用户名和密码成功后，将包含用户信息的数据作为JWT的Payload，将其与JWT Header分别进行Base64编码拼接后签名，形成一个JWT Token，形成的JWT Token就是一个如同lll.zzz.xxx的字符串
后端将JWT Token字符串作为登录成功的结果返回给前端。前端可以将返回的结果保存在浏览器中，退出登录时删除保存的JWT Token即可
前端在每次请求时将JWT Token放入HTTP请求头中的Authorization属性中(解决XSS和XSRF问题)
后端检查前端传过来的JWT Token，验证其有效性，比如检查签名是否正确、是否过期、token的接收方是否是自己等等
验证通过后，后端解析出JWT Token中包含的用户信息，进行其他逻辑操作(一般是根据用户信息得到权限等)，返回结果

![jwt](https://img-blog.csdnimg.cn/img_convert/900b3e81f832b2f08c2e8aabb540536a.png)

##### 为什么要用JWT?

**传统Session认证的弊端**

我们知道HTTP本身是一种无状态的协议，这就意味着如果用户向我们的应用提供了用户名和密码来进行用户认证，认证通过后HTTP协议不会记录下认证后的状态，那么下一次请求时，用户还要再一次进行认证，因为根据HTTP协议，我们并不知道是哪个用户发出的请求，所以为了让我们的应用能识别是哪个用户发出的请求，我们只能在用户首次登录成功后，在服务器存储一份用户登录的信息，这份登录信息会在响应时传递给浏览器，告诉其保存为cookie，以便下次请求时发送给我们的应用，这样我们的应用就能识别请求来自哪个用户了，这是传统的基于session认证的过程。

![session](https://img-blog.csdnimg.cn/img_convert/29cfe2cc7bd13bc659227e62c3e89063.png)

**然而，传统的session认证有如下的问题：**

- 每个用户的登录信息都会保存到服务器的session中，随着用户的增多，服务器开销会明显增大
- 由于session是存在与服务器的物理内存中，所以在分布式系统中，这种方式将会失效。虽然可以将session统一保存到Redis中，但是这样做无疑增加了系统的复杂性，对于不需要redis的应用也会白白多引入一个缓存中间件
- 对于非浏览器的客户端、手机移动端等不适用，因为session依赖于cookie，而移动端经常没有cookie
- 因为session认证本质基于cookie，所以如果cookie被截获，用户很容易收到跨站请求伪造攻击。并且如果浏览器禁用了cookie，这种方式也会失效
- 前后端分离系统中更加不适用，后端部署复杂，前端发送的请求往往经过多个中间件到达后端，cookie中关于session的信息会转发多次
- 由于基于Cookie，而cookie无法跨域，所以session的认证也无法跨域，对单点登录不适用

**JWT认证的优势**

对比传统的session认证方式，JWT的优势是：

- 简洁：JWT Token数据量小，传输速度也很快
- 因为JWT Token是以JSON加密形式保存在客户端的，所以JWT是跨语言的，原则上任何web形式都支持
- 不需要在服务端保存会话信息，也就是说不依赖于cookie和session，所以没有了传统session认证的弊端，特别适用于分布式微服务
- 单点登录友好：使用Session进行身份认证的话，由于cookie无法跨域，难以实现单点登录。但是，使用token进行认证的话， token可以被保存在客户端的任意位置的内存中，不一定是cookie，所以不依赖cookie，不会存在这些问题
- 适合移动端应用：使用Session进行身份认证的话，需要保存一份信息在服务器端，而且这种方式会依赖到Cookie（需要 Cookie 保存 SessionId），所以不适合移动端

> 因为这些优势，目前无论单体应用还是分布式应用，都更加推荐用JWT token的方式进行用户认证

### 应用

**封装方法**

![image-20220623101216020](https://i0.hdslb.com/bfs/album/b07414b5443ea2bf58e79e626686508cbd478f8e.png)

```js
//jsonwebtoken 封装
const jwt = require("jsonwebtoken")
const secret = "dselegent"

const JWT = {
    //生成签名
    //expiresIn是过期时间，例'24h'
	//value是要传入的数据
    generate(value,expiresIn){
        return jwt.sign(value,secret,{expiresIn})
    },
    verify(token){
        try{
            return jwt.verify(token,secret)//返回的是解析后的token，原始数据+自带的数据构成的对象
        }catch(e){
            return false//通过上面按个方法会自动解出是否过期，可是会报错，所以用try-catch
        }
    }
}

module.exports = JWT
```

**login.js**

```js
  async login(req, res, next) {
    const { username, password } = req.body;

    let data = await userService.login({ username, password });//存储数据库
     //因为存储成功返回的data对象并不是简单的对象，不能直接用，只能取出要用的值
    if (data) {
      const token = jwt.generate({
        id:data._id,
        username:data.username
      },"10s")
      res.header("Authorization",token)//将token设置到请求头
      res.send({ok: 1});
    }
  }
```

**login.html**

```html
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
       //拦截器，
       axios.interceptors.request.use(function (config) {
            // console.log("请求发出前，执行的方法")
            // Do something before request is sent
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
        axios.interceptors.response.use(function (response) {
          console.log(response);
            // console.log("请求成功后 ，第一个调用的方法")
            const {authorization } = response.headers
            authorization && localStorage.setItem("token",authorization)
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    </script>
        用户名:
        <input id="username" />
      <div>
        密码:
        <input type="password" id="password" />
      </div>
      <div><button id="login">登录</button></div>

    <script>
      var username = document.querySelector('#username');
      var password = document.querySelector('#password');
      var login = document.querySelector('#login');

      login.onclick = () => {
        axios.post("/users/login", {
                username: username.value,
                password: password.value,
            }).then(res => {
                console.log(res.data)
                if (res.data.ok === 1) {
                    //存储token
                    location.href = "/"
                } else {
                    alert("用户名密码不匹配")
                }
            })
      };
    </script>
```

**需要token才能进入的页面**

```ejs
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
      //拦截器，
      axios.interceptors.request.use(function (config) {
         //携带token
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config;
      }, function (error) {
        return Promise.reject(error);
      });
  
      axios.interceptors.response.use(function (response) {
        console.log(response);
        const {authorization} = response.headers
        //这里是如果有新的token返回（说明这次发请求的没有过期），就重新设置
        //如果过期了，后端会发错误码，前端处理重定向登录
        authorization && localStorage.setItem("token", authorization)
        return response;
      }, function (error) {
        if(error.response.status===401){
          localStorage.removeItem("token")
          location.href = "/login"
        }
        return Promise.reject(error);
      });
    </script>

  <body>
    <div>
      <div>
        用户名:
        <input id="username" />
      </div>
      <div>
        密码:
        <input type="password" id="password" />
      </div>
      <div>
        年龄:
        <input type="number" id="age" />
      </div>

      <div>
        <button id="loginpost">注册</button>
      </div>
      <div>
        <button id="update">更新</button>
      </div>
      <div>
        <button id="delete">删除</button>
      </div>
    </div>

    <table border="1">
      <thead>
        <tr>
          <th>名字</th>
          <th>年龄</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <script>
      var register = document.querySelector('#loginpost');
      var username = document.querySelector('#username');
      var password = document.querySelector('#password');
      var age = document.querySelector('#age');
      let tbody = document.querySelector('tbody');
      
      register.onclick = () => {
        axios.post("/users", {
        username: username.value,
        password: password.value,
        age: age.value
      }).then(res => {
        console.log(res.data)
      })
      };

        axios.get("/users?page=1&limit=10").then(res => {
      res = res.data
      var tbody = document.querySelector("tbody")
      tbody.innerHTML = res.map(item => `
      <tr>
          <td>${item.username}</td>
          <td>${item.age}</td>
        </tr>`).join("")
    })
		//退出登录
         exit.onclick = () => {
       localStorage.removeItem("token")
       location.href = "/login"
     }
    </script>
```

**token处理中间件**

```js
//node中间件校验
app.use((req,res,next)=>{
  // 如果token有效 ,next() 
  // 如果token过期了, 返回401错误
  if(req.url==="/login"){
    next()
    return;
  }
	//Authorization会变成authorization
    //链判断运算符如果？前面判断为真就会继续执行后面的，判断为假就不会执行后面
    //这里因为如果没有token，前面是undefined,去使用undefined是会报错的
    
    //如果有token就验证，没token就通过
    //(直接访问/能通过，但是有个那个页面自动获取数据的axios，在那里就会发送authorization请求头，进入token验证)
  const token = req.headers["authorization"]?.split(" ")[1]
  if(token){
    var payload = JWT.verify(token)
     //验证成功就生成一个新token重置有效时间，
    // 验证失败就返回错误码让前端跳到登录页
    if(payload){
      const newToken = JWT.generate({
        id:payload.id,
        username:payload.username
      },"1d")
      res.header("Authorization",newToken)
      next()
    }else{
      res.status(401).send({errCode:"-1",errorInfo:"token过期"})
    }
  }
})

```

# 11.文件上传和下载

## 11.1文件上传

**multer中间件**

Multer 是一个 node.js 中间件，用于处理 `multipart/form-data` 类型的表单数据，它主要用于上传文件。

**注意**: Multer 不会处理任何非 `multipart/form-data` 类型的表单数据。

```shell
pnpm add multer --save
```

### 11.1.1表单上传

**html**

```html
      <p>form上传</p>
      <form action="/uploads" method="post" enctype="multipart/form-data">
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="file" name="avatar" />
        <button>上传</button>
      </form>
```

**node代码**

```js
const multer = require('multer');
//要上传的目录
const upload = multer({
  dest: 'public/uploads/',
});
const rename = require('../utils/rename');
const userModel = require('../models/userModel');

router.get('/', function (req, res, next) {
  res.render('uploads', { title: 'Express' });
});

//这个中间件的值要和前端传过来的name值一样
router.post('/uploads', upload.single('avatar'), function (req, res, next) {
  const { username, password } = req.body;
  if (req.file) {
    let filePath = rename(req.file);
    if (filePath)
      userModel
        .create({
          username,
          password,
          avatar: filePath,
        })
        .then(data => {
          res.send({
            imgPath: data.avatar,
          });
        });
    else console.log('上传失败');
  } else {
    userModel
      .create({
        username,
        password,
      })
      .then(data => {
        res.send({
          imgPath: data.avatar,
        });
      });
  }
});

module.exports = router;

```

**数据库模型设置**

```js
const userType = new mongoose.Schema({
    username:{
        type:"string",
        require:true
    },
    password:{
        type:"number",
        require:true
    },
    avatar:{
        type:"string",
        default:"/images/uploads/default.png"
    },
})
```

**由于上传的文件没有后缀，所以封装一个函数修改它**

**rename.js**

```js
const fs = require('fs');

function rename(file) {
  try {
    /* {
        fieldname: 'avatar',
        originalname: 'purple.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: 'public/uploads/',
        filename: '5a56d983caed604ed62abfb8ac816307',
        path: 'public\\uploads\\5a56d983caed604ed62abfb8ac816307',
        size: 418912
    } */
    let { destination, filename, originalname } = file;
    let oldPath = destination + filename;
    let newName = filename + '.' + originalname.split('.')[1];
    let newPath = destination + newName;
    fs.renameSync(oldPath, newPath);
    return '/uploads/' + newName;
  } catch (error) {
    return false;
  }
}

module.exports = rename;

```

### 11.1.2ajax上传

**图片上传提交**

**html代码，node代码同上**

```html
    <div class="ajax">
      <p>ajax上传</p>
      <form>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="file" name="avatar" />
        <button type="button">上传</button>
      </form>
      <img />
    </div>
    <script>
      let btn = document.querySelector('.ajax [type=button]');
      var username = document.querySelector('.ajax [name=username]');
      var password = document.querySelector('.ajax [name=password]');
      var avatar = document.querySelector('.ajax [name=avatar');
      avatar.addEventListener('change', () => {
        // 创建预览地址
        let httpUrl = window.webkitURL.createObjectURL(new Blob(avatar.files));
        document.querySelector('img').src = httpUrl;
      });
      btn.addEventListener('click', () => {
        // 要处理成表单对象上传
        const formsdata = new FormData();
        formsdata.append('username', username.value);
        formsdata.append('password', password.value);
        // 追加name值，和文件对象
        formsdata.append('avatar', avatar.files[0]);

        axios
          .post('/uploads', formsdata, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            document.querySelector('img').src = res.data.imgPath;
          });
      });
    </script>

```

## 11.2文件的下载













