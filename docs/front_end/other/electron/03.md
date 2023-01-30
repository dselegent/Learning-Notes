# 03 【electron的Remote模块】

在渲染进程里（比如`index.html`里面加载了一些**js文件**，那里面的**js**如果要使用到 **BrowserWindow** 这些属性的话就必须使用 `remote`）

使用 `remote` 模块, 你可以调用 `main` **进程对象的方法**

## 1.electron14.0之前版本使用

> 在主进程的窗口中加入`enableRemoteModule: true`参数才能够调用remote模块

```js
const { app, BrowserWindow } = require('electron')
app.on('ready', function () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //这里进行加入
      enableRemoteModule: true,
      // 在主线程创建窗口的时候,一定在加上下面这两个配置, 这样在渲染进程才能使用node 的一些语法
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  win.loadFile('index.html')
  // 监听所有的窗口都关闭了
  app.on('window-all-closed', () => {
    //释放win
    win = null
    console.log('窗口全部都关闭了')
  })
})
```

> 然后在渲染进程里写，这里我直接内嵌js了

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>electron test</title>
  </head>
  <body>
    electron demo
    <button id="btn">添加新的窗口</button>
    <script>
      const { log } = console
      // 导入 remote 中的  BrowserWindow
      const { BrowserWindow } = require('electron').remote

      const btn = document.getElementById('btn')
      btn.onclick = () => {
        let newWin = new BrowserWindow({
          width: 800,
          height: 600,
        })
        // newWin.loadURL('www.baidu.com')
        win.loadFile('index2.html')

        newWin.on('close', () => {
          newWin = null
        })
      }
    </script>
  </body>
</html>
```

这里点击按钮，就又可以创建一个新的窗口了

## 2.electron14.0版本API修改

![image-20230109191550834](https://i0.hdslb.com/bfs/album/f3e24468d08568375545e2735c7b7dff08e47edf.png)

> 1.还得自行安装 `remote`

```bash
npm i -D @electron/remote
```

> 2.主进程中导入

```js
app.on('ready',function(){
	require('@electron/remote/main').initialize()
})
```

> 3.渲染进程中

```js
//这样来引入remote
const { BrowserWindow, app } = require('@electron/remote') 
```

**完整代码：**

`main.js`

```js
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()

  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(win.webContents)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

```

`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
    <title>Hello from Electron renderer!</title>
  </head>
  <body>
    <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
    <button id="btn">添加新的窗口</button>
    <script src="./render.js"></script>
  </body>
</html>

```

`render.js`

```js
const { BrowserWindow } = require('@electron/remote')

document.querySelector('#btn').addEventListener('click', () => {
  let newWin = new BrowserWindow({
    width: 300,
    height: 200,
  })

  newWin.loadFile('index2.html')

  newWin.on('closed', () => (newWin = null))
})
```

效果图：

![image-20230109193710284](https://i0.hdslb.com/bfs/album/8d42b1db9c154a94c7204d91708d35a9bbddf824.png)