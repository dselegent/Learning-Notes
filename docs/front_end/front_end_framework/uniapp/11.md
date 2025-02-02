# 11 【App升级中心 uni-upgrade-center】

## 1.概述

App升级中心 uni-upgrade-center，提供了 App 的版本更新服务。包括

- Android、iOS的完整App安装包升级和wgt资源包增量更新
- 后台管理系统，用于发布新版、设置升级策略

> 如果需要初次发布，而不是升级，另见产品 [uni-portal 统一发布页](https://doc.dcloud.net.cn/uniCloud/uni-portal.html)

本产品具有如下特征：

- 开源、免费。uniCloud阿里云版和支付宝云版都有免费空间。
- 云端基于 [uniCloud](https://uniapp.dcloud.net.cn/uniCloud/) 实现。后台管理是 [uni-admin](https://uniapp.dcloud.net.cn/uniCloud/admin.html) 框架的插件。
- 数据库遵循 [opendb](https://uniapp.dcloud.net.cn/uniCloud/opendb.html) 规范
- **关于应用转让后升级中心（uni-upgrade-center）的使用问题** [详情](https://ask.dcloud.net.cn/article/40112)

为了一套代码同时兼容uni-app和uni-app x，升级中心原本的 js 文件改为了 ts 文件。如果开发者的项目下未使用ts，那么需要增加ts编译。HBuilderX项目会自动加载ts编译器，cli项目则需要自己手动配置。

## 2.为什么需要升级中心？

每个App开发者都要开发升级功能，这是巨大的社会资料浪费。DCloud推出 uni-upgrade-center，让应用开发更轻松、高效，让开发者专注于自己的业务。

> 升级中心分为两个部分：[uni-upgrade-center Admin管理后台](https://ext.dcloud.net.cn/plugin?id=4470) 和 [uni-upgrade-center-app前台检测更新](https://ext.dcloud.net.cn/plugin?id=4542)。

## 3.uni-upgrade-center-app 前台检测更新

升级中心的客户端负责前台检查升级更新，弹出提示框，下载和安装新版。

![image-20250201193628129](https://i0.hdslb.com/bfs/article/f9dac0ed178f56181b9ef65242534b6995443509.png)

![image-20250201193639876](https://i0.hdslb.com/bfs/article/ef62ed88a4962bde46a1d3606bfbc26b95443509.png)

![image-20250201193648488](https://i0.hdslb.com/bfs/article/9fae98e83ed176e41aabbc77075e2c0995443509.png)

### 3.2 目录结构

```markdown
┌─uniCloud                            云空间目录，在 uni-upgrade-center-app 组件中为空，占位使用
│─components(0.9.0 版本起删除，请使用 `pages/uni-app-x/upgrade-popup.vue`)
│  └─uni-upgrade-center-app(0.9.0 版本起删除，请使用 `pages/uni-app-x/upgrade-popup.vue`)
│     └─uni-upgrade-center-app.uvue(0.9.0 版本起删除，请使用 `pages/uni-app-x/upgrade-popup.vue`)
├─pages                               页面文件存放的目录
│  ├─uni-app-x
│  │  └─upgrade-popup.vue              uni-app x 项目中要使用到的升级中心弹窗页面，如果需要自定义弹窗样式，可以修改此页面，使用请看dialogPage
│  └─upgrade-popup.vue                uni-app 项目中要使用到的升级中心页面，如果需要自定义样式，可以修改此页面
├─static                              存放升级中心引用的静态资源（图片）的目录，如需自定义样式，可以替换此目录下的图片
├─utils                               存放升级中心引用的工具函数的目录
│  ├─call-check-version.ts            升级中心请求云端函数方法，调用 uni-upgrade-center 云函数，获取 App 版本信息
│  ├─check-update.ts                  调用升级中心方法，检查更新，并根据结果判断是否显示更新弹框
│  └─check-update-nvue.js             由于 uni-app 项目 `nvue` 页面不支持 ts ，因此调用检查更新函数在这里导出
├─changelog.md                        uni-upgrade-center-app 更新日志
├─package.json                        uni-upgrade-center-app 插件信息日志
└─readme.md                           uni-upgrade-center-app 说明文档
```

- upgrade-popup.vue更新应用：

  - 如果云函数`uni-upgrade-center`返回的参数表明需要更新，则将参数保存在localStorage中，带着键值跳转该页面

  - 进入时会先从localStorage中尝试取出之前存的安装包路径（此包不会是强制安装类型的包）

  - 如果有已经保存的包，则和传进来的 `version` 进行比较，如果相等则安装。大于和小于都不进行安装，因为admin端可能会调整包的版本。不符合更新会将此包删除

  - 如果本地没有包或者包不符合安装条件，则进行下载安装包

  - 点击下载会有进度条、已下载大小和下载包的大小
    - 下载完成会提示安装：
      - 如果是 wgt 包，安装时则会提示 正在安装…… 和 安装完成。安装完成会提示是否重启
      - 如果是 原生安装包，则直接跳出去覆盖安装

  - 下载过程中，如果退出会提示是否取消下载。如果是强制更新，则只会提示正在下载请稍后，此时不可退出

  - 如果是下载完成了没有安装就退出，则会将下载完成的包保存在本地。将包的本地路径和包version保存在localStorage中

### 3.2 在 uni-app 中使用升级中心

1. 在插件市场打开本插件页面，在右侧点击`使用 HBuilderX 导入插件`，选择要导入的项目点击确定 [插件地址](https://ext.dcloud.net.cn/plugin?id=4542)

2. 创建 uniCloud 云开发环境

3. 绑定服务空间：

   - 插件版本 `>= 0.6.0`，依赖 `uni-admin 1.9.3+` 的 `uni-upgrade-center 云函数`，请和 uni-admin 项目关联同一个服务空间
   - 插件版本 `<= 0.6.0`，请绑定到一个已有的服务空间或者新建一个服务空间进行绑定

4. 上传云函数：

   - 插件版本 `>= 0.6.0`，依赖 `uni-admin 1.9.3+` 的 `uni-upgrade-center 云函数`，插件不再单独提供云函数，可以跳过此步骤
   - 插件版本 `<= 0.6.0`，找到`/uni_modules/uni-upgrade-center-app/uniCloud/cloudfunctions/check-version`，右键上传部署

5. 如果是uni-app，需在`pages.json`中添加页面路径。**注：请不要设置为pages.json中第一项**。(在 uni-app 上，为了盖住 tabbar、导航栏以及 vue 页面上的原生元素，使用了背景透明的独立页面)
   ```js
   "pages": [
       // ……其他页面配置
       {
           "path": "uni_modules/uni-upgrade-center-app/pages/upgrade-popup",
           "style": {
               "disableScroll": true,
               "app-plus": {
                   "backgroundColorTop": "transparent",
                   "background": "transparent",
                   "titleNView": false,
                   "scrollIndicator": false,
                   "popGesture": "none",
                   "animationType": "fade-in",
                   "animationDuration": 200
   
               }
           }
       }
   ]
   ```

6. 将`@/uni_modules/uni-upgrade-center-app/utils/check-update` 使用 import 导入到需要用到的地方调用一下即可（一般在首页调用或设置页面检查更新按钮调用）：

   1. 使用方式：`import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update'`，然后在需要的执行的地方调用 `checkUpdate` 方法即可
   2. 默认使用当前绑定的服务空间，如果要请求其他服务空间，可以使用其他服务空间的 `callFunction`。[详情](https://uniapp.dcloud.io/uniCloud/cf-functions.html#call-by-function-cross-space)
   3. **注：** uni-app 的 vue2 模式不支持在 nvue 页面中使用 ts，请引入用插件根目录 `utils/check-update-nvue.js` 文件

   ```js
   import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
   ```

7. 在需要调用的 **页面** 中（一般在首页加载完成后调用或设置页面检查更新按钮调用）执行 `checkUpdate` 方法，比如在 `onReady` 生命周期中（ **注：** 因为是组件所以一定要保证组件加载完毕），以下为完整使用示例：

   ```js
   import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
   // ...
   export default {
       // ...
       onReady() {
           checkUpdate()
       }
       // ...
   }
   ```

8. 升级弹框可自行编写，也可以使用`uni.showModal`，或使用现有的升级弹框样式，如果不满足UI需求请自行替换 `static` 目录下的资源文件。在`utils/check-update.ts`中都有实例。

   **注意** 使用wgt更新，打包前请务必将 manifest.json 中的版本名称修改为更高版本。（请使用类似 1.0.0 以 `.` 分隔的多段式格式）

## 4.uni-upgrade-center Admin 管理后台

负责发布新版和管理历史版本的上下线。提供了如下功能：

- 云储存安装包CDN加速，使安装包下载的更快、更稳定
- 应用管理，对 App 的信息记录和应用版本管理
- 版本管理，可以发布新版，也可方便直观的对当前 App 历史版本以及线上发行版本进行查看、编辑和删除操作
- 版本发布信息管理，包括 更新标题，更新内容，版本号，静默更新，强制更新，灵活上线发行 的设置和修改
- 原生 App 安装包，发布 Apk 更新，用于 App 的整包更新，可设置是否强制更新
- wgt 资源包，发布 wgt 更新，用于 App 的热更新，可设置是否强制更新，静默更新（uni-app x的app-Android由于编译为纯原生，没有wgt包，无法热更新）
- App 管理列表及 App 版本记录列表搜索

### 4.1 新建 uni-admin 项目

1. 新建项目：`打开HBuilderX` -> `文件` -> `新建` -> `项目` -> `uni-app` 选择 `uniCloud admin`模板，键入一个名字，确定
2. 鼠标右键 `uniCloud 文件夹` 选择`关联云服务空间`和`运行云服务空间初始化向导`

**添加应用**

> 运行 uni-admin 到浏览器，在左侧菜单 `系统管理 -> 应用管理` 中新增应用后，即可在 `App升级中心` 发布该应用的版本 [详情](https://uniapp.dcloud.net.cn/uniCloud/admin.html#app-manager)

添加应用后，即可在应用管理列表中跳转至版本管理页面：

![image-20250201190212010](https://i0.hdslb.com/bfs/article/b42f121f7dd49b8df8797690db2a5d7695443509.png)

### 4.2 版本管理

在版本管理列表页面右上角点击`发布新版`，可以发布`原生App安装包`和`wgt资源包`。在左上角点击`下拉列表`，可以切换展示应用。
![image-20250201190245023](https://i0.hdslb.com/bfs/article/f2f55f0587202e0f843d57aac2ff081795443509.png)

获取当前App版本号：

```js
this.version = plus.runtime.version;
```

![image-20250201194425330](https://i0.hdslb.com/bfs/article/98acb7a5b3432676cac968c68c171f2d95443509.png)

#### 4.2.1 发布原生App安装包：

1. 在`manifest.json`修改应用版本号：
   ![image-20250201194510672](https://i0.hdslb.com/bfs/article/c2dafa251612a322483f2390d2db371195443509.png)
2. 打包App：
   ![image-20250201200533543](https://i0.hdslb.com/bfs/article/b66bcc123490c0dd23a1f55f521bcd8495443509.png)
3. 在上传安装包界面填写此次发版信息：
   ![image-20250201195502639](https://i0.hdslb.com/bfs/article/dedbbfa0749b8d2e74141c025cfa54f595443509.png)
4. `版本号`：请填写以`.`分隔字符串，例如：`0.0.1`。在构建应用安装包时，`manifest.json` 中的 `应用版本名称` 也要是该格式。
5. `存储选择`：
   1. `内置存储`：内置存储是服务空间开通后自带的云存储，不支持自定义域名，不支持阶梯计费
   2. `扩展存储`：扩展存储支持自定义域名、阶梯计费，越用越便宜、功能更强大 [扩展存储开通文档](https://doc.dcloud.net.cn/uniCloud/ext-storage/service.html)
6. `Android应用市场`
   - 此处会与 `新增应用` 时填写的 `Android应用市场` 信息保持同步。当在应用管理修改应用信息时，这里也会修改
   - 启用商店：当勾选某一商店启用时，在`upgrade-center-app`端会检测手机上是否有该应用市场
     - 如果有，则会跳转至该应用商店进行 App 升级
     - 如果都跳转失败，最后会使用填写的 `下载链接` 下载 apk 安装包升级
   - 优先级：检查更新时，按照优先级从大到小依次尝试跳转商店
7. `下载链接/AppStore`
   - 可以选择手动上传一个文件到 `云存储`，会自动将地址填入该项
   - 也可以手动填写一个地址，就可以不用再上传文件
   - 如果是发布 `苹果` 版本，包地址则为应用的 `AppStore 链接`
8. `强制更新`
   - 如果使用强制更新，App端的升级弹框将不可被关闭
9. `上线发行`
   - 可设置当前包是否上线发行，只有已上线才会进行更新检测
   - 同时只可有一个线上发行版，线上发行不可更设为下线。未上线可以设为上线发行并自动替换当前线上发行版
   - 修改当前包为上线发行，自动替换当前线上发行版
10. 发布成功后，版本管理显示如下：
    ![image-20250201195520444](https://i0.hdslb.com/bfs/article/4c24bb50890e4bec0441b048bf4b4e0c95443509.png)
11. 发布成功后，重启App显示如下：
    ![image-20250201195536003](https://i0.hdslb.com/bfs/article/8a390d2857a40c635e7b002e9f65d37a95443509.png)
12. 下载更新后重新打开可以看到最新版本的内容：
    ![image-20250201195632155](https://i0.hdslb.com/bfs/article/6fd85a7aba3bd3d591f3be2a1815c0da95443509.png)

####  4.2.2 发布wgt资源包

1. 大部分配置与发布 `原生App安装包` 一致：
   ![image-20250201195908795](https://i0.hdslb.com/bfs/article/a8e9d134d99f9223ddcd034af698d6ac95443509.png)
   ![image-20250201200956793](https://i0.hdslb.com/bfs/article/29a5a7016bbc86c53701377120145d2195443509.png)

   ![image-20250201200628435](https://i0.hdslb.com/bfs/article/061538cf1b94567e70420858e427a19c95443509.png)
   ![image-20250201200725341](https://i0.hdslb.com/bfs/article/e4bca5ddecb79b99f784d6aa8b8067df95443509.png)

   1. 原生App最低版本

   - 上次使用新api或打包新模块的pp版本

   - 如果此次打包的wgt使用了 `新的 api` 或者打包了 `新的模块` ，则在发布 `wgt资源包` 的时候，要将 `原生App最低版本` 填写为本次版本

   - 如果已有正式版 `wgt资源包` ，则会自动带出

   3. 静默更新

   - App升级时会在后台下载wgt包并自行安装。新功能在下次启动App时生效

   - **静默更新后不重启应用，可能会导致正在访问的应用的页面数据错乱，请谨慎使用！**

2. 发布成功后，版本管理显示如下：
   ![image-20250201200739970](https://i0.hdslb.com/bfs/article/178136966a57c8cf60a5c0861dd9d80f95443509.png)

3. 重启App后可以看到最新的内容：
   ![image-20250201200853046](https://i0.hdslb.com/bfs/article/eb8451af14f02ec906e8dcc1377c09b295443509.png)

4. `uni-upgrade-center 云函数` - 检查应用更新：

   - 根据传参，先检测传参是否完整，appid appVersion wgtVersion 必传，is_uniapp_x 选传，默认 false

   - 先从数据库取出所有该平台（会从上下文读取平台信息）的所有线上发行更新

   - 再从所有线上发行更新中取出版本最大的一版。如果可以，尽量先检测wgt的线上发行版更新

   - 使用上一步取出的版本包的版本号 和传参 appVersion、wgtVersion 来检测是否有更新。必须同时大于这两项，因为上一次可能是wgt热更新，否则返回暂无更新

   - 如果库中 wgt包 版本大于传参 appVersion，但是不满足 min_uni_version < appVersion，则不会使用wgt更新，会接着判断库中 app包version 是否大于 appVersion

   - 返回结果：

     | code |             message              |
     | :--: | :------------------------------: |
     |  0   | 当前版本已经是最新的，不需要更新 |
     | 101  |             wgt更新              |
     | 102  |             整包更新             |
     | -101 | 暂无更新或检查appid是否填写正确  |
     | -102 |      请检查传参是否填写正确      |