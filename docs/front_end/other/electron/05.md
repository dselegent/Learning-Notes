# 05 【electron的一些渲染进程Api】

## 1.clipboard

> 在系统剪贴板上进行复制和粘贴操作。
>
> 在主进程（main process）和渲染进程（renderer process）上均可用。

### 1.1 `readText()`

返回字符串 - 剪贴板中的内容为纯文本。

```js
const { clipboard } = require('electron')

clipboard.writeText('千锋教育HTML5大前端!')

const text = clipboard.readText()
console.log(text)
// hello i am a bit of text!'
```

### 1.2 `writeText(text)`

将文本作为纯文本写进剪贴板。

## 2.contextBridge

> 创建一个安全的、双向的、跨越隔离情境的同步桥梁。
>
> 只在渲染进程（renderer pocess）中可用。

## 3.desktopCapturer

>使用 navigator.mediaDevices.getUserMedia API 访问可用于从桌面捕获音频和视频的媒体源信息。
>
>只在主进程（main process）可用。

下面的例子显示了如何从一个标题为Electron的桌面窗口捕捉图像：

- 在主进程里

```js
// ./controller/getSource.js
const { desktopCapturer, ipcMain } = require('electron')

const getSource = (mainWindow) => {
  ipcMain.handle('desktop-capturer', async (event) => {
    desktopCapturer.getSources({ 
      types: ['window', 'screen'],
      thumbnailSize: {
        width: 1728,
        height: 1117
      }
    }).then(async sources => {
      for (const source of sources) {
        if (source.name === 'Entire Screen') {
          mainWindow.webContents.send('SET_SOURCE', source)
          return
        }
      }
    })
  })
}

module.exports = getSource

// ./main.js
getSource(win)
```

- 在预处理JS里

```js
// ./preload-js/setSource.js
const { ipcRenderer } = require('electron')

const setSource = () => {
  return new Promise((resolve) => {
    ipcRenderer.on('SET_SOURCE', async (event, source) => {
      let str = source.thumbnail.crop({ x: 0, y: 30, width: 1200, height: 1170 })
      resolve(str.toDataURL())
    })
  })
}

const invokeCaptureEvent = async () => {
  const result = await ipcRenderer.invoke('desktop-capturer')
  return result
}

module.exports = {
  setSource,
  invokeCaptureEvent
}

// ./preload-js/index.js
const { setSource, invokeCaptureEvent } = require('./setSource')
contextBridge.exposeInMainWorld('myAPI', {
  setSource,
  invokeCaptureEvent
})
```

- 在渲染进程页面里

```js
const app = Vue.createApp({
  template: `
    <div>
      <button @click="captureDesk">抓取桌面</button>
    </div>
    <div>
      <img :src="imgSrc" alt="" />
    </div>
  `,

  data() {
    return {
      imgSrc: ''
    }
  },

  methods: {
    async captureDesk() {
      const result = await myAPI.invokeCaptureEvent()
    }
  },

  async beforeCreate() {
    let imgDataUrl = await myAPI.setSource()
    this.imgSrc = imgDataUrl
  },
})

app.mount('#root')
```

## 4.ipcRenderer

>从一个渲染器进程到主进程的异步通信。
>
>只在渲染进程（renderer pocess）中可用。

`详情见 09 【进程间通信】`

## 5.nativeImage

>使用PNG或JPG文件创建托盘、停靠区和应用程序图标。
>
>在主进程（main process）和渲染进程（renderer process）上均可用。

在Electron中，对于接受图像的API，你可以传递文件路径或NativeImage实例。当传递null时，将使用一个空的图像。

例如，在创建一个托盘或设置一个窗口的图标时，你可以把图像文件路径作为一个字符串传递。

```js
const { BrowserWindow, Tray } = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
const win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
```

或者从剪贴板上读取图像，返回一个NativeImage。

```js
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

### 5.1 支持的格式

目前支持PNG和JPEG图像格式。建议使用PNG，因为它支持透明度和无损压缩。

在Windows上，你也可以从文件路径加载ICO图标。为了获得最佳的视觉质量，建议至少包括以下尺寸的文件。

- Small icon
  - 16x16 (100% DPI scale)
  - 20x20 (125% DPI scale)
  - 24x24 (150% DPI scale)
  - 32x32 (200% DPI scale)
- Large icon
  - 32x32 (100% DPI scale)
  - 40x40 (125% DPI scale)
  - 48x48 (150% DPI scale)
  - 64x64 (200% DPI scale)
  - 256x256

### 5.2 高分辨率图像

在支持高DPI的平台上，如苹果Retina显示器，你可以在图像的基本文件名后附加@2x来标记它为高分辨率的图像。

例如，如果icon.png是一个具有标准分辨率的普通图像，那么icon@2x.png，将被视为具有双倍DPI密度的高分辨率图像。

如果你想同时支持不同DPI密度的显示器，你可以把不同尺寸的图像放在同一个文件夹里，使用不带DPI后缀的文件名。例如：

```js
images/
├── icon.png
├── icon@2x.png
└── icon@3x.png
```

```js
const { Tray } = require('electron')
const appIcon = new Tray('/Users/somebody/images/icon.png')
console.log(appIcon)
```

还支持以下DPI的后缀：

```js
@1x
@1.25x
@1.33x
@1.4x
@1.5x
@1.8x
@2x
@2.5x
@3x
@4x
@5x
```

### 5.3 方法

- ## `nativeImage.createEmpty()`

- ## `nativeImage.createFromPath(path)`

返回 `NativeImage`

从位于路径的文件中创建一个新的NativeImage实例。如果路径不存在，不能被读取，或者不是一个有效的图像，该方法将返回一个空图像。

```js
const nativeImage = require('electron').nativeImage

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

- ## `nativeImage.createFromDataURL(dataURL)`

### 5.4 Class: NativeImage

自然地包裹图像，如托盘、停靠区和应用程序图标。


在主进程（main process）和渲染进程（renderer process）上均可用。

实例方法：

- ### `image.toPNG([options])`

- ### `image.toJPEG(quality)`

- ### `image.toDataURL([options])`

- ### `image.getSize([scaleFactor])`

- ### `image.crop(rect)`