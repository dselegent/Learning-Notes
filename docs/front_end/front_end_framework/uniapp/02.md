# 02 【uni-app起步】

## 1.什么是uni-app

`uni-app` 是一个使用 [Vue.js (opens new window)](https://vuejs.org/)开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台。

> 翻译翻译就是：写一套代码就可以在多端运行

`DCloud`公司拥有900万开发者、数百万应用、12亿手机端月活用户、数千款uni-app插件、70+微信/qq群。阿里小程序工具官方内置uni-app（[详见 (opens new window)](https://opendocs.alipay.com/mini/ide/overview)），腾讯课堂官方为uni-app录制培训课程（[详见 (opens new window)](https://ask.dcloud.net.cn/article/35640)），开发者可以放心选择。

`uni-app`在手，做啥都不愁。即使不跨端，`uni-app`也是更好的小程序开发框架（[详见 (opens new window)](https://ask.dcloud.net.cn/article/35947)）、更好的App跨平台框架、更方便的H5开发框架。不管领导安排什么样的项目，你都可以快速交付，不需要转换开发思维、不需要更改开发习惯。

## 2.uni-app 环境搭建

> `uni-app`支持通过 可视化界面、[`vue-cli`命令行 (opens new window)](https://uniapp.dcloud.io/quickstart-cli)两种方式快速创建项目。

可视化的方式比较简单，HBuilderX内置相关环境，开箱即用，无需配置nodejs。

开始之前，开发者需先下载安装如下工具：

- HBuilderX：[官方IDE下载地址(opens new window)](https://www.dcloud.io/hbuilderx.html)

HBuilderX是通用的前端开发工具，但为`uni-app`做了特别强化。

### 2.1 创建uni-app

在点击工具栏里的文件 -> 新建 -> 项目（快捷键`Ctrl+N`）：

![image-20221012200152918](https://i0.hdslb.com/bfs/album/001a7e2797edb732ae2be49927272e8da7f4787d.png)

选择`uni-app`类型，输入工程名，选择模板，点击创建，即可成功创建。

uni-app自带的模板有 默认的空项目模板、Hello uni-app 官方组件和API示例，还有一个重要模板是 uni ui项目模板，日常开发推荐使用该模板，已内置大量常用组件。

![image-20221012200227087](https://i0.hdslb.com/bfs/album/fc1ff9bfcbe771013e62c53b182b3be27499cea3.png)

开发者也可以使用`cli`方式创建项目，另见[文档 (opens new window)](https://uniapp.dcloud.io/quickstart-cli.html)。

差别是：HBuilderX创建的项目根目录就是源码，可直接编辑。uni-app的编译器在HBuilderX的插件目录下，跟随HBuilderX升级而一起升级。

如果开发者习惯于node模式的项目，对HBuilderX可视化方式感到困惑，可另行参考文档：[## cli创建项目和HBuilderX可视化界面创建项目的区别](https://uniapp.dcloud.net.cn/quickstart-cli#clidiff)

### 2.2 运行uni-app

1. 浏览器运行：进入hello-uniapp项目，点击工具栏的运行 -> 运行到浏览器 -> 选择浏览器，即可体验 uni-app 的 web 版。

![image-20221012200308031](https://i0.hdslb.com/bfs/album/0cdaef87ed51ef3f21d25a4535ca3ac673b3ccb9.png)

2. 运行App到手机或模拟器：使用电压足够的usb端口连接手机，设置中开启USB调试，手机上允许电脑设备调试手机，进入hello-uniapp项目，点击工具栏的运行 -> 运行App到手机或模拟器，即可在该设备里面体验uni-app。

![image-20221012200359605](https://i0.hdslb.com/bfs/album/91430d87d04bd3020fce08cf6ffb89d455e5a6d4.png)

- 如手机或模拟器无法识别，请点击[常见故障排查指南 (opens new window)](https://uniapp.dcloud.net.cn/tutorial/run/run-app-faq.html)。

- 如需运行在苹果手机真机上，注意需使用自定义基座。[详见](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#customplayground)

3. 在微信开发者工具里运行：进入hello-uniapp项目，点击工具栏的运行 -> 运行到小程序模拟器 -> 微信开发者工具，即可在微信开发者工具里面体验uni-app。

![image-20221012200437511](https://i0.hdslb.com/bfs/album/a8df3bf4fb45c4fdf1dd121269a7951fbd2792a7.png)

**注意**：如果是第一次使用，需要先配置小程序ide的相关路径，才能运行成功。如下图，需在输入框输入微信开发者工具的安装路径。

![image-20221012200500652](https://i0.hdslb.com/bfs/album/6fcd39f14abdb550ac748127c668c0e10c8b513b.png)

**注意**：微信开发者工具需要开启服务端口 在微信工具的设置->安全中。

![image-20221012200517918](https://i0.hdslb.com/bfs/album/6e08a0e6959e795eba2019eea81839ab663b1130.png)

## 3.uni-app的开发目录结构

### 3.1 官方

一个uni-app工程，默认包含如下目录及文件：

```markdown
┌─uniCloud              云空间目录，阿里云为uniCloud-aliyun,腾讯云为uniCloud-tcb（详见uniCloud）
│─components            符合vue组件规范的uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─utssdk                存放uts文件
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用的本地静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
├─uni_modules           存放[uni_module](/uni_modules)。
├─platforms             存放各平台专用页面的目录，详见
├─nativeplugins         App原生语言插件 详见
├─nativeResources       App端原生资源目录
│  └─android            Android原生资源目录 详见
├─hybrid                App端存放本地html文件的目录，详见
├─wxcomponents          存放小程序组件的目录，详见
├─unpackage             非工程代码，一般存放运行或发行的编译结果
├─AndroidManifest.xml   Android原生应用清单文件 详见
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
├─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
└─uni.scss              这里是uni-app内置的常用样式变量 
```

**Tips**

- 编译到任意平台时，`static` 目录下的文件均会被完整打包进去，且不会编译。非 `static` 目录下的文件（vue、js、css 等）只有被引用到才会被打包编译进去。
- `static` 目录下的 `js` 文件不会被编译，如果里面有 `es6` 的代码，不经过转换直接运行，在手机设备上会报错。
- `css`、`less/scss` 等资源不要放在 `static` 目录下，建议这些公用的资源放在自建的 `common` 目录下。
- HbuilderX 1.9.0+ 支持在根目录创建 `ext.json`、`sitemap.json` 等小程序需要的文件。

### 3.2 基础项目

![image-20221012200922934](https://i0.hdslb.com/bfs/album/cdc77725add1d4fda236938df819eb6a4c60d10f.png)

pages目录： 存放页面的。

static目录：存放静态资源的。

unpackage目录：存放最终打包的存放位置。

App.vue文件：项目根组件。

main.js文件：项目的入口文件，也就是项目加载时，先加载main.js文件。

manifest.json文件：负责管理打包的一些配置，指定应用名称，图标，权限等。

pages.json文件：页面路由，负责设置整个项目的页面(pages)存放路径以及窗口外观(globalStyle)的。

uni.scss文件：配置一些颜色什么的。

**uni-app的开发规范：(看起来就是Vue和小程序混合起来了)**

为了实现多端兼容，综合考虑编译速度、运行性能等因素，`uni-app` 约定了如下开发规范：

- 页面文件遵循 [Vue 单文件组件 (SFC) 规范(opens new window)](https://vue-loader.vuejs.org/zh/spec.html)
- 组件标签靠近小程序规范，详见[uni-app 组件规范](https://uniapp.dcloud.net.cn/component/)
- 接口能力（JS API）靠近微信小程序规范，但需将前缀 `wx` 替换为 `uni`，详见[uni-app接口规范](https://uniapp.dcloud.net.cn/api/)
- 数据绑定及事件处理同 `Vue.js` 规范，同时补充了App及页面的生命周期
- 为兼容多端运行，建议使用flex布局进行开发

