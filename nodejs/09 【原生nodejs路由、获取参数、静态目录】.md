# 09 【原生nodejs路由、获取参数、静态目录】

## 1.路由

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

## 2.获取参数

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

## 3.静态目录

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
//根据文件后缀名自动获取响应头中content-type
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

