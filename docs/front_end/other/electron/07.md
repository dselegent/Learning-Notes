# 07【electron菜单】

## 1.创建系统菜单

> 创建原生应用菜单和上下文菜单。

**进程**：[主进程](https://www.electronjs.org/zh/docs/latest/glossary#main-process)

`new Menu()`创建新菜单。

**静态方法**

- `Menu.setApplicationMenu(menu)`

  - `menu` Menu | null

    在macOS上将 `menu`设置成应用内菜单 在windows和Linux上，`menu` 将会被设置成窗口顶部菜单

    在Windows和Linux中，可以在菜单的顶层标签的某个字母前添加`&`以绑定快捷键。 例如，使用`&File`后可以使用`Alt-F`呼出File的子选项。 按钮标签中指定的字符会出现下划线， `&` 字符不会显示在按钮标签上。

    要转义并在项名中显示 `&` 字符, 可以添加字符 `&`. 比如, `&&File` 将在按钮标签上出现 `&File`

    传递 `null` 值可以禁用默认菜单。 在 Windows 和 Linux 上，使用此方法移除窗口上的菜单栏可能会有额外的效果。

    **注释:**如果应用没有设置菜单的话，系统会生成一个默认菜单。 默认生成的菜单中包含了一些初始选项，例如 `文件`,`编辑`, `视图`,`窗口`,`帮助`。

- `Menu.buildFromTemplate(template)`

  - `template` (MenuItemConstructorOptions | MenuItem)[]

    返回 `Menu`

    一般来说， `template`是一个`options`类型的数组，用于构建[MenuItem](https://www.electronjs.org/zh/docs/latest/api/menu-item)。 使用方法可参考前文。

    您还可以将其他字段附加到`template`，它们将成为菜单项的属性。

> 1.新建一个`menu.js`

```js
// 1.导入 electron 中的 Menu
const { Menu } = require('electron')

// 2.创建菜单模板,数组里的每一个对象都是一个菜单
const template = [
  {
    label: '菜单一',
    // submenu 代表下一级菜单
    submenu: [
      { 
          label: '子菜单一' ,
          // 添加快捷键
          accelerator: 'ctrl+n'
      },
      { label: '子菜单二' },
      { label: '子菜单三' },
      { label: '子菜单四' },
    ],
  },
  {
    label: '菜单二',
    // submenu 代表下一级菜单
    submenu: [
      { label: '子菜单一' },
      { label: '子菜单二' },
      { label: '子菜单三' },
      { label: '子菜单四' },
    ],
  },
]

// 3.从模板中创建菜单
const myMenu = Menu.buildFromTemplate(template)

// 4.设置为应用程序菜单
Menu.setApplicationMenu(myMenu)
```

`accelerator: 'ctrl+n'`可以指定菜单的快捷键

> 2.随便写个页面

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>自定义菜单</title>
  </head>
  <body>
    自定义菜单
  </body>
</html>
```

> 3.写 `main.js`

```js
const { app, BrowserWindow } = require('electron')
require('./menu')

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

> npm start启动

**效果图**

![image-20230109195411294](https://i0.hdslb.com/bfs/album/d26ec2e501266dbec24f8f918aba30b11af65980.png)

## 2.给菜单添加事件

> 比如给子菜单添加一个点击事件新建一个窗口

`menu.js`

```js
// 1.导入 electron 中的 Menu
const { Menu, BrowserWindow } = require('electron')

// 2.创建菜单模板,数组里的每一个对象都是一个菜单
const template = [
  {
    label: '菜单一',
    // submenu 代表下一级菜单
    submenu: [
      {
        label: '子菜单一',
        // 添加点击事件
        click: () => {
          // 创建一个新的窗口
          let sonWin = new BrowserWindow({
            width: 200,
            height: 200,
          })
          sonWin.loadFile('./index2.html')
          // 为关闭的时候进行清空
          sonWin.on('close', () => (sonWin = null)                                       
          )
        },
      },
      { label: '子菜单二' },
      { label: '子菜单三' },
      { label: '子菜单四' },
    ],
  },
  {
    label: '菜单二',
    // submenu 代表下一级菜单
    submenu: [
      { label: '子菜单一' },
      { label: '子菜单二' },
      { label: '子菜单三' },
      { label: '子菜单四' },
    ],
  },
]

// 3.从模板中创建菜单
const myMenu = Menu.buildFromTemplate(template)

// 4.设置为应用程序菜单
Menu.setApplicationMenu(myMenu)
```

**效果图**

![GIF 2023-1-9 下午 08-32-09](https://i0.hdslb.com/bfs/album/3120b0c28bd5e2ea18ce253a3d4e7d52b8303fc8.gif)

## 3.右键菜单-Context Menus

弹出此菜单作为上下文菜单在 [`BrowserWindow`](https://www.electronjs.org/zh/docs/latest/api/browser-window)。

`menu.popup([options])`

- `options` Object (可选)
  - `window` [BrowserWindow](https://www.electronjs.org/zh/docs/latest/api/browser-window) (可选) - 默认为选中窗口.
  - `x` number (可选) - 默认为当前鼠标的位置。 如果指定了`y`，则该选项必选。
  - `y` number (可选) - 默认为当前鼠标的位置。 如果指定了`x`，则该选项必选。
  - `positioningItem` number (可选) *macOS* - 在指定鼠标光标下定位的菜单项的索引。 默认值为 -1。
  - `callback` Function (optional) - 会在菜单关闭后被调用.

### 3.1 index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <textarea name="name" rows="8" cols="80"></textarea>

    <script src='./renderer.js'></script>
  </body>
</html>
```

### 3.2 main.js

```js
const {app, BrowserWindow, Menu} = require('electron')

let mainWindow

let contextMenu = Menu.buildFromTemplate([
  { label: 'Item 1' },
  { role: 'editMenu' }
])

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })

  mainWindow.loadFile('index.html')

  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('context-menu', e => {
    contextMenu.popup()
  })

  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
```

![image-20230112165552903](https://i0.hdslb.com/bfs/album/b3a354a31b17d1df4bd672127a0607aa4b9151cd.png)