# 04 【electron的一些主进程Api】

## 1.App

### 1.1 事件

#### 1.1.1 before-quit

> 在应用程序开始关闭窗口之前触发。

```js
app.on('before-quit', (e) => {
  console.log('App is quiting')
  e.preventDefault()
})
```

#### 1.1.2 browser-window-blur

> 在 browserWindow 失去焦点时发出

```js
app.on('browser-window-blur', (e) => {
  console.log('App unfocused')
})
```

#### 1.1.3 browser-window-focus

> 在 browserWindow 获得焦点时发出

```js
app.on('browser-window-focus', (e) => {
  console.log('App focused')
})
```

### 1.2 方法

#### 1.2.1 app.quit()

尝试关闭所有窗口 将首先发出 `before-quit` 事件。 如果所有窗口都已成功关闭, 则将发出 `will-quit` 事件, 并且默认情况下应用程序将终止。

此方法会确保执行所有`beforeunload` 和 `unload`事件处理程序。 可以在退出窗口之前的`beforeunload`事件处理程序中返回`false`取消退出。

```js
app.on('browser-window-blur', (e) => {
  setTimeout(() => {
    app.quit()
  }, 3000)
})

app.on('browser-window-blur', (e) => {
  setTimeout(app.quit, 3000)
})
```

#### 1.2.2 app.getPath(name)

- `name` string - 您可以通过名称请求以下路径：
  - `home` 用户的 home 文件夹（主目录）
  - `appData` 每个用户的应用程序数据目录，默认情况下指向：
    - `%APPDATA%` Windows 中
    - `$XDG_CONFIG_HOME` or `~/.config` Linux 中
    - `~/Library/Application Support` macOS 中
  - `userData` 储存你应用程序配置文件的文件夹，默认是 `appData` 文件夹附加应用的名称 按照习惯用户存储的数据文件应该写在此目录，同时不建议在这写大文件，因为某些环境会备份此目录到云端存储。
  - `sessionData` 此目录存储由 `Session` 生成的数据，例如 localStorage，cookies，磁盘缓存，下载的字典，网络 状态，开发者工具文件等。 默认为 `userData` 目录。 Chromium 可能在此处写入非常大的磁盘缓存，因此，如果您的应用不依赖于浏览器存储（如 localStorage 或 cookie）来保存用户数据，建议将此目录设置为其他位置，以避免污染 `userData` 目录。
  - `temp` 临时文件夹
  - `exe`当前的可执行文件
  - `module` The `libchromiumcontent` 库
  - `desktop` 当前用户的桌面文件夹
  - `documents` 用户文档目录的路径
  - `downloads` 用户下载目录的路径
  - `music` 用户音乐目录的路径
  - `pictures` 用户图片目录的路径
  - `videos` 用户视频目录的路径
  - `recent` 用户最近文件的目录 (仅限 Windows)。
  - `logs`应用程序的日志文件夹
  - `crashDumps` 崩溃转储文件存储的目录。

返回 `string` - 与 `name` 关联的目录或文件的路径。 失败会抛出一个`Error`。

如果 `app.getPath('logs')` 被调用前没有先调用 `app.setAppLogsPath()` ，将创建一个相当于调用 `app.setAppLogsPath()` 却没有 `path` 参数的默认日志目录。

```js
app.whenReady().then(() => {
  console.log(app.getPath('desktop'))
  console.log(app.getPath('music'))
  console.log(app.getPath('temp'))
  console.log(app.getPath('userData'))

  createWindow()
})
```

![image-20230112141852989](https://i0.hdslb.com/bfs/album/7b5a8b4982dfa260063bd717be6662c776b995cb.png)

## 2.BrowserWindow

> electron.BrowserWindow: 创建和控制浏览器窗口

### 2.1 实例方法

`win.loadURL(url[, options])`

- `url` string

  `options` Object (可选)

  - `httpReferrer` (string | [Referrer](https://www.electronjs.org/zh/docs/latest/api/structures/referrer)) (可选) - HTTP 引用 url。
  - `userAgent` string (可选) - 发起请求的 userAgent.
  - `extraHeaders` string (可选) - 用 "\n" 分割的额外标题
  - `postData` ([UploadRawData](https://www.electronjs.org/zh/docs/latest/api/structures/upload-raw-data) | [UploadFile](https://www.electronjs.org/zh/docs/latest/api/structures/upload-file))[] (可选)
  - `baseURLForDataURL` string (可选) - 要由数据URL加载的文件基本URL(末尾带有路径分隔符)。 仅当指定的`url`是数据url并且需要加载其他文件时，才需要此选项。

返回 `Promise<void>` - 当页面完成加载后 promise 将会resolve (见 [`did-finish-load`](https://www.electronjs.org/zh/docs/latest/api/web-contents#event-did-finish-load))，如果页面加载失败，则 reject (见 [`did-fail-load`](https://www.electronjs.org/zh/docs/latest/api/web-contents#event-did-fail-load))。

`win.loadFile(filePath[, options])`

- `filePath` string
- `options` Object (可选)
  - `query` Record<string, string> (可选) - 传递给 `url.format()`.
  - `search` string (可选) - 传递给 `url.format()`.
  - `hash` string (可选) - 传递给 `url.format()`.

返回 `Promise<void>` - 当页面完成加载后 promise 将会resolve (见 [`did-finish-load`](https://www.electronjs.org/zh/docs/latest/api/web-contents#event-did-finish-load))，如果页面加载失败，则 reject (见 [`did-fail-load`](https://www.electronjs.org/zh/docs/latest/api/web-contents#event-did-fail-load))。

与 `webContents.loadFile`相同， `filePath` 应该是一个与你的应用程序的根路径相关的HTML文件路径。 有关更多信息，请参阅`webContents` 文档。

`loadURL` 和 ` loadFile` 互斥

```js
mainWindow.loadURL('https://www.baidu.com')

mainWindow.loadFile('index.html')
```

### 2.2 优雅的显示窗口

- 使用ready-to-show事件

  - 在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，渲染进程会发出 `ready-to-show` 事件 。 在此事件后显示窗口将没有视觉闪烁。

  - 请注意，使用此事件意味着渲染器会被认为是"可见的"并绘制，即使 `show` 是false。 如果您使用 `paintWhenInitiallyHidden: false`，此事件将永远不会被触发。

```js
let mainWindow = new BrowserWindow({ show: false })
mainWindow.once('ready-to-show', () => {
  mainWindow.show()
})
```

这个事件通常在 `did-finish-load` 事件之后发出，但是页面有许多远程资源时，它可能会在 `did-finish-load`之前发出事件。

请注意，使用此事件意味着渲染器会被认为是"可见的"并绘制，即使 `show` 是false。 如果您使用 `paintWhenInitiallyHidden: false`，此事件将永远不会被触发。

- 设置 backgroundColor
  - 对于一个复杂的应用，`ready-to-show` 可能发出的太晚，会让应用感觉缓慢。 在这种情况下，建议立刻显示窗口，并使用接近应用程序背景的 `backgroundColor`

```js
let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
```

请注意，即使对于使用 `ready-to-show` 事件的应用，仍建议 设置 `backgroundColor`，以使应用感觉更接近原生。

一些包括 `backgroundColor` 的有效值的例子：

```js
const win = new BrowserWindow()
win.setBackgroundColor('hsl(230, 100%, 50%)')
win.setBackgroundColor('rgb(255, 145, 145)')
win.setBackgroundColor('#ff00a3')
win.setBackgroundColor('blueviolet')
```

有关这些颜色类型的有效选项，请参阅 [win.setBackgroundColor](https://www.electronjs.org/zh/docs/latest/api/browser-window#winsetbackgroundcolorbackgroundcolor)。

### 2.3 父子窗口

- 窗口定义

```js
secondaryWindow = new BrowserWindow({
  width: 600,
  height: 600,
  webPreferences: { nodeIntegration: true }
})

secondaryWindow.loadFile('index.html')

secondaryWindow.on('closed',  () => {
   mainWindow = null
})
```

- 窗口关系

```js
secondaryWindow = new BrowserWindow({
  parent: mainWindon, // 定义父窗口
  modal: true // 锁定在主窗口
})
```

- 子窗口显示和隐藏

```js
secondaryWindow = new BrowserWindow({
  show: false
})

setTimeout(() => {
  secondaryWindow.show()
  setTimeout(() => {
    secondaryWindow.hide()
  }, 3000)
}, 2000)
```

### 2.4 无边框窗口

> Frameless Window

```js
mainWindow = new BrowserWindow({
  frame: false
})
```

让页面可拖拽

```html
<body style="user-select: none; -webkit-app-region:drag;">
```

no-drag 修复下面控件的bug

```html
<input style="-webkit-app-region: no-drag;" type="range" name="range" min="0" max="10">
```

 窗口标题栏样式

- `titleBarStyle` string (可选)` macOS` \ `Windows`\- 窗口标题栏样式。 默认值为default。可能的值有
  - `default` - 分别返回 macOS 或者 Windows 的标准标题栏
  - `hidden` - 在一个隐藏的标题栏和一个全尺寸大小的内容窗口中取得结果。 在 macOS 内, 窗口将一直拥有位于左上的标准窗口控制器 (“traffic lights”)。 在 Windows上，当与 `titleBarOverlay: true` 合并时，它将激活窗口控件叠加(详情请参阅 `titleBarOverlay`)，否则将不会显示窗口控件。
  - `hiddenInset` *macOS* - 仅 macOS，隐藏标题栏，使用窗口边缘稍微小的红绿灯按钮替代。
  - `customButtonsOnHover` *macOS* - 仅 macOS，隐藏的标题栏的全尺寸的内容窗口， 红绿灯按钮在鼠标悬停在窗口左上方时显示。 **注意:** 此选项目前是实验性的。

```js
mainWindow = new BrowserWindow({
  titleBarStyle: 'hidden'
})
```

### 2.5 属性与方法

#### 2.5.1 minWidth`/`maxWidth`/`minHeight`/`maxHeight

- `minWidth` Integer(可选) - 窗口的最小宽度。 默认值为 `0`.
- `minHeight` Integer(可选) - 窗口的最小高度。 默认值为 `0`.
- `maxWidth `Integer(可选)-窗口的最大宽度。 默认值不限
- `maxHeight `Integer (可选) - 窗口的最大高度。 默认值不限

当使用 `minWidth`/`maxWidth`/`minHeight`/`maxHeight` 设置最小或最大窗口大小时, 它只限制用户。 它不会阻止您将不符合大小限制的值传递给 `setBounds`/`setSize` 或 `BrowserWindow` 的构造函数。

```js
mainWindow = new BrowserWindow({
  minWidth: 300,
  minHeight: 300
})
```

更多详见：https://electronjs.org/docs/api/browser-window#new-browserwindowoptions

#### 2.5.2 窗口焦点事件

```js
secWindow = new BrowserWindow({
  width: 400, height: 300,
  webPreferences: { nodeIntegration: true },
})

mainWindow.on('focus', () => {
  console.log('mainWindow focused')
})

secWindow.on('focus', () => {
  console.log('secWindow focused')
})

app.on('browser-window-focus', () => {
  console.log('App focused')
})
```

#### 2.5.3 静态方法

- getAllWindows()
  - 返回 `BrowserWindow[]` - 所有打开的窗口的数组


```js
let allWindows = BrowserWindow.getAllWindows()
console.log(allWindows)
```

更多详见: https://electronjs.org/docs/api/browser-window#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95

#### 2.5.4 实例方法

- maximize()
  - 最大化窗口。 如果窗口尚未显示，该方法也会将其显示 (但不会聚焦)。


```js
secWindow.on('closed', () => {
  mainWindow.maximize()
})
```

更多详见：https://electronjs.org/docs/api/browser-window#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95

### 2.6 state

> electron-win-state 保存窗口的状态
> `npm install electron-win-state`

```js
const windowStateKeeper = require('electron-window-state');
let win;

app.on('ready', function () {
  // 加载前一状态并回退到默认值
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });

  // 使用状态信息创建窗口
  win = new BrowserWindow({
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height
  });

  // 让我们在窗口上注册侦听器，以便更新状态
  // 自动（关闭窗口时将删除侦听器）
  // 并恢复最大化或全屏状态
  mainWindowState.manage(win);
});
```

> **配置项必须写一样的，否则不生效。**

请不要在创建`BrowserWindow`实例时将`useContentSize`设置为`true`，因为它会更改窗口大小的计算方式。

### 2.7 webContents

> webContents 是 EventEmitter 的实例， 负责渲染和控制网页, 是 BrowserWindow 对象的一个属性。

```js
const contents = win.webContents
console.log(contents)
```

#### 2.7.1 方法 getAllWebContents(）*

- 返回 `WebContents[]` - 所有 `WebContents` 实例的数组。 包含所有Windows，webviews，opened devtools 和 devtools 扩展背景页的 web 内容

```js
const {app, BrowserWindow, webContents} = require('electron')
console.log(webContents.getAllWebContents())
```

#### 2.7.2 实例事件

- did-finish-load
  - 导航完成时触发，即选项卡的旋转器将停止旋转，并指派`onload`事件后。

- dom-ready
  - 当顶级 frame 的 document 被加载完时触发。


```html
<div>
   <img src="https://placekitten.com/500/500" alt="">
</div>
<script>
let wc = mainWindow.webContents
wc.on('did-finish-load', () => {
  console.log('Conent fully loaded')
})
wc.on('dom-ready', () => {
  console.log('DOM Ready')
})
</script>
```

- new-window

```html
<div>
  <a target="_blank" href="https://placekitten.com/500/500"><h3>Kitten</h3></a>
</div>

<script>
wc.on('new-window', (e, url) => {
  e.preventDefault()
  console.log('DOM Ready')
})
</script>
```

- context-menu : 右键上下文信息
  - https://www.electronjs.org/zh/docs/latest/api/web-contents#event-context-menu


```js
wc.on('context-menu', (e, params) => {
  console.log(`Context menu opened on: ${params.mediaType} at x:${params.x}, y:${params.y}`)
})

wc.on('context-menu', (e, params) => {
  console.log(`User seleted text: ${params.selectionText}`)
  console.log(`Selection can be copied: ${params.editFlags.canCopy}`)
})
```

#### 2.7.3 实例方法

- executeJavaScript()

```js
wc.on('context-menu', (e, params) => {
  wc.executeJavaScript(`alert('${params.selectionText}')`)
})
```

## 3.快捷键+系统快捷键

> **快捷键**：定义键盘快捷键。
> **系统快捷键**：在应用程序没有键盘焦点时，监听键盘事件。

快捷键可以包含多个功能键和一个键码的字符串，由符号+结合，用来定义你应用中的键盘快捷键

示例：

+ ctrl+A
+ ctrl+Shift+Z

快捷方式使用 register 方法在 globalShortcut 模块中注册。

globalShortcut 模块可以在操作系统中注册/注销全局快捷键, 以便可以为操作定制各种快捷键。

注意: 快捷方式是全局的; 即使应用程序没有键盘焦点, 它也仍然在持续监听键盘事件。 在应用程序模块发出 ready 事件之前, 不应使用此模块。

```js
const {app, BrowserWindow, globalShortcut} = require('electron')

globalShortcut.register('G', () => {
  console.log('User pressed G')
})
```

```js
globalShortcut.register('ctrl+y', () => {
  console.log('User pressed G with a combination key')
  globalShortcut.unregister('ctrl+y')
})
```

## 4.Menu

`详情见 07 【electron菜单】`

## 5.Tray (托盘)

`详情见 08 【electron系统托盘 】`
