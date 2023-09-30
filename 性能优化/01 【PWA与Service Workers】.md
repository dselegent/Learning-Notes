# 01 【PWA与Service Workers】

## 1.前期介绍

### 1.1 渐进式 Web 应用（PWA）

PWA的中文名叫做**渐进式网页应用**，早在2014年， W3C 公布过 `Service Worker` 的相关草案，但是其在生产环境被 `Chrome` 支持是在 2015 年。因此，如果我们把 PWA 的关键技术之一 `Service Worker` 的出现作为 `PWA` 的诞生时间，那就应该是 2015 年。

自 2015 年以来，`PWA` 相关的技术不断升级优化，在用户体验和用户留存两方面都提供了非常好的解决方案。`PWA` 可以将 `Web` 和 `App` 各自的优势融合在一起：渐进式、可响应、可离线、实现类似 `App` 的交互、即时更新、安全、可以被搜索引擎检索、可推送、可安装、可链接。

**需要特别说明的是，`PWA` 不是特指某一项技术，而是应用了多项技术的 `Web App`。其核心技术包括 `App Manifest`、`Service Worker`、`Web Push`，等等。**

### 1.2 为什么W3C和谷歌在推广这项技术

这就要从前端的现状说起：

Native APP 用起来很流畅，但是也有其天然的基因缺陷：

> - 由于其天生封闭的基因，内容无法被索引
> - 用户 80% 的时间被 Top3 的超级 App 占据，对于站点来说，应用分发的性价比也越来越不划算
> - 要使用它，首先还需要下载几十兆上百着兆的安装包

WEB前端虽然天生具有开放的基因，但是很多时候页面会卡顿，用户体验不佳。虽然社区之前也做过很多努力，例如`virtual dom`、`spa`、混合编程、用`canvas`将整个页面画出来，用户体验也有了很大的改善，但是仍然无法解决几个重要的问题：

> - 离线时用户无法使用
> - 无法接收消息推送
> - 移动端没有一级入口

W3C和谷歌看到了这些问题，于是推出了`PWA`。

### 1.3 PWA的核心目标

`PWA`的核心目标就是提升 Web App 的性能，改善 Web App 的用户体验。媲美native的流畅体验，将网络之长与应用之长相结合。

## 2.特点

### 2.1 特点

![image-20230627140352400](https://article.biliimg.com/bfs/article/a42e32b94caafab73155ae12bf16e0af0dc6c853.png)

这边有一个关于PWA特点的[列表清单](https://web.dev/pwa-checklist/#exemplary)，有兴趣的同学可以点进去看看.

### 2.2 特点详解

#### 可安装

1. 可安装指的是可以像原生APP在主屏幕上留有图标。

2. 但是这需要我们提供 `Web app manifest`，`manifest.json` 是一个简单的JSON文件，我们在 `html` 页面如下引用他：

   它描述了我们的图标在主屏幕上如何显示，以及图标点击进去的启动页是什么，它的JSON格式如下所示：
   ![image-20230627140602933](https://article.biliimg.com/bfs/article/488722e9661d15e8ebacc0f1d13fa72b5005daba.png)

   其中：

   > - `start_url` 可以设置启动网址
   > - `icons` 会帮我们设置各个分辨率下页面的图标
   > - `background_color` 会设置背景颜色， Chrome 在网络应用启动后会立即使用此颜色，这一颜色将保留在屏幕上，直至网络应用首次呈现为止。
   > - `theme_color` 会设置主题颜色
   > - `display` 设置启动样式

​		关于`manifest.json`里字段更加具体的含义，感兴趣的同学可以参考[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/Manifest)

#### 离线使用

1. `PWA` 另一项令人兴奋的特性就是可以离线使用,其背后用到的技术是 `Service worker` ;
2. `Service worker`实际上是一段脚本，在后台运行。作为一个独立的线程，运行环境与普通脚本不同，所以不能直接参与 Web 交互行为。`Service Worker` 的出现是正是为了使得 `Web App` 也可以做到像 `Native App` 那样可以离线使用、消息推送的功能。
   我们可以把`Service worker`当做是一种客户端代理。
3.  当然 `Service Worker` 也有生命周期，参考下图：
   ![image-20230627141945275](https://article.biliimg.com/bfs/article/f63e2809f1bbcd918f5c1fe8174662242e25b8d0.png)

#### 消息推送

消息推送具体可以参考谷歌的官方教程[Your First Web Push Notification](https://codelabs.developers.google.com/codelabs/push-notifications),里面有详细的代码Demo和说明，以及相应的后台配置（带好梯子）。

## 3.vue3中对pwa的使用

> 1. 安装vite-plugin-pwa插件 pnpm add -D vite-plugin-pwa
> 2. 在vite.config.ts里导入 
> 3. 在plugins里配置 
> 4. 在main.js注册sw告诉浏览器开辟一块缓存区域 
> 5. 在src下新建service-worker.js文件

### 3.1 `vite.config.ts`

```ts
import { VitePWA } from 'vite-plugin-pwa'

plugins:[VitePWA({
      strategies: 'injectManifest',
      injectRegister: false,
      srcDir: 'src',
      filename: 'service-worker.js',
      devOptions: {
        enabled: true,
        /* other options */
      },
      injectManifest: {
        injectionPoint: undefined,
      },
      // workbox: {
      //   globPatterns: ['**/*.{js,css,ico,png,svg}'],
      // },
      manifest: {
        name: 'chatGPTdemo',
        short_name: 'chatGPTdemo',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    })]
```

### 3.2 `main.ts`

```ts
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    import.meta.env.MODE === 'production' ? '/service-worker.js' : '/dev-sw.js?dev-sw',
  )
}
```

### 3.3 `service-worker.js`

完整配置如下（拿来即用）

```js
/* eslint-disable no-undef*/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}

workbox.core.setCacheNameDetails({
  prefix: 'ochase-search',
  suffix: 'v1.0.0'
})
workbox.core.skipWaiting() // 强制等待中的 Service Worker 被激活
workbox.core.clientsClaim() // Service Worker 被激活后使其立即获得页面控制权
workbox.precaching.precacheAndRoute(self.__precacheManifest || []) // 设置预加载

// 缓存web的css资源
workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // 使用缓存，但尽快在后台更新
  new workbox.strategies.StaleWhileRevalidate({
    // 使用自定义缓存名称
    cacheName: 'css-cache'
  })
)

// 缓存web的js资源
workbox.routing.registerRoute(
  // 缓存JS文件
  /.*\.js/,
  // 使用缓存，但尽快在后台更新
  new workbox.strategies.StaleWhileRevalidate({
    // 使用自定义缓存名称
    cacheName: 'js-cache'
  })
)

// 缓存web的图片资源
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 设置缓存有效期为30天
      })
    ]
  })
)

// 如果有资源在其他域名上，比如cdn、oss等，这里做单独处理，需要支持跨域
workbox.routing.registerRoute(
  /^https:\/\/cdn\.ochase\.com\/.*\.(jpe?g|png|gif|svg)/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'cdn-images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 5 * 24 * 60 * 60 // 设置缓存有效期为5天
      })
    ],
    fetchOptions: {
      credentials: 'include' // 支持跨域
    }
  })
)
```

### 3.4 效果查看

再次提醒注意***注意⚠️⚠️⚠️PWA是基于Service Worker，由于Service Worker权限很高，所以只支持https协议或者localhost⚠️⚠️⚠️**所以线上的域名一定要是https协议才行；可以在控制台查看请求相关的缓存状态

再次刷新后就可以看到直接从serviceWorker里面读取里

![image-20230627145312637](https://article.biliimg.com/bfs/article/4ebe2d38e3b36d2d007fb93d203f676624da6316.png)

也可以在Application里查看serviceWorker的状态

![image-20230627145419434](https://article.biliimg.com/bfs/article/73452d7925df0510641b8c67780ad1de00dd84a0.png)