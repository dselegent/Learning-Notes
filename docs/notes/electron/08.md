# 08 【electron系统托盘 】

当我们关闭一个应用程序的时候，它其实关闭了，但是没有完全关闭，只是隐藏了，有的就存在系统托盘中，那么如何在`electron` 设置系统托盘呢

[官方文档：Tray](https://link.juejin.cn/?target=https%3A%2F%2Fwww.electronjs.org%2Fdocs%2Ftutorial%2Ftray)

## 1.概览

当前指南将带领你创建 [Tray](https://www.electronjs.org/docs/api/tray) 图标, 并且其拥有系统通知区域的独立上下文菜单

在 MacOS 和 Ubuntu, 托盘将位于屏幕右上角上，靠近你的电池和 wifi 图标。 在 Windows 上，托盘通常位于右下角。

## 2.示例

首先，我们需要从 `electron` 导入 `app`, `Tray`, `Menu`, `nativeImage`

```js
const { app, Tray, Menu, nativeImage } = require('electron')
```

下一步我们将创建托盘。 要做到这一点，我们将使用一个 [`NativeImage`](https://www.electronjs.org/docs/api/native-image) 图标， 可以通过其中任一方法创建 [methods](https://www.electronjs.org/docs/api/native-image#methods)。 请注意，我们将托盘创建代码包装在一个 [`app.whenReady`](https://www.electronjs.org/docs/api/app#appwhenready) ，因为我们需要等待 electron 应用完成初始化

`main.js`

```js
let tray

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('path/to/asset.png')
  tray = new Tray(icon)

  // 注意: 你的 contextMenu, Tooltip 和 Title 代码需要写在这里!
})
```

 现在我们可以开始将上下文菜单附加到我们的托盘上，就像这样：

```js
const contextMenu = Menu.buildFromTemplate([
  { label: 'Item1', type: 'radio' },
  { label: 'Item2', type: 'radio' },
  { label: 'Item3', type: 'radio', checked: true },
  { label: 'Item4', type: 'radio' },
  {
    label: '退出',
    click: app.quit,
  },
])

tray.setContextMenu(contextMenu)
```

上面的代码将在上下文菜单中创建4个单独的 radio-type 单选类型项。 要阅读更多关于构建原生菜单的信息，请点击 [这里](https://www.electronjs.org/docs/api/menu#menubuildfromtemplatetemplate)

最后，让我们给我们的托盘一个工具提示和标题。

```js
// 移动到托盘上的提示
tray.setToolTip('electron demo is running')
// 还可以设置 titlle
tray.setTitle('electron demo')
```

## 3.完整代码

```js
// 引入托盘 Tray,和 Menu 等下要创建菜单,nativeImage创建 icon图标
const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron')

let win, tray
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  // 创建图片图标
  const icon = nativeImage.createFromPath('icon.ico')
  // 实例化一个 托盘对象，传入的是托盘的图标
  tray = new Tray(icon)
  // 移动到托盘上的提示
  tray.setToolTip('electron demo is running')
  // 还可以设置 titlle
  tray.setTitle('electron demo')

  // 监听托盘右键事件
  tray.on('right-click', () => {
    // 右键菜单模板
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Item1', type: 'radio' },
      { label: 'Item2', type: 'radio' },
      { label: 'Item3', type: 'radio', checked: true },
      { label: 'Item4', type: 'radio' },
      {
        label: '退出',
        click: app.quit,
      },
    ])
    // 让我们的写的托盘右键的菜单替代原来的
    tray.setContextMenu(contextMenu)
  })

  //监听点击托盘的事件
  tray.on('click', () => {
    // 这里来控制窗口的显示和隐藏
    if (win.isVisible()) {
      win.hide()
    } else {
      win.show()
    }
  })

  createWindow()
})

// 监听所有的窗口都关闭了
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

**效果图**

![image-20230109213555028](https://i0.hdslb.com/bfs/album/35ed3a71aa95ba3f0c511bfca3f9cdf49a15191b.png)