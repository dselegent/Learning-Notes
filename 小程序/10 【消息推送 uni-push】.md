# 10 【消息推送 uni-push】

## 1.概述

- `uni-push`是DCloud推出的、全端的、云端一体的统一推送服务。

  1. 客户端方面，`uni-push2`支持App、web、小程序。

  - App端，内置了苹果、华为、小米、OPPO、VIVO、魅族、谷歌FCM等手机厂商的系统推送和个推第三方推送
  - 小程序端，内置了socket在线推送。如需模板消息/订阅消息，另见[uni-subscribemsg](https://doc.dcloud.net.cn/uniCloud/uni-subscribemsg.html)
  - web端，内置了socket在线推送 （uni-push1仅支持app，且app必须包含个推原生sdk。uni-push2在app端如不需要厂商推送，只需在线推送，无需集成个推原生sdk）

  1. 服务端方面，`uni-push2`支持uniCloud云端一体，无需再编写复杂代码轻松完成push。 （uni-push1.0仅支持使用传统服务器开发语言如php，未和客户端有效协同，流程比uni-push2.0繁琐）
  2. uni-push还自带一个web控制台。不写代码也可以在web页面发推送。uni-push1.0的web控制台在[dev.dcloud.net.cn](https://dev.dcloud.net.cn/)。uni-push2.0的web控制台是开源的，属于uni-admin插件[详见](https://ext.dcloud.net.cn/plugin?name=uni-push-admin)。
  3. 如果你的项目由于特殊原因不能通过uniCloud的云函数使用uni-push2.0，你希望直接通过调用个推服务器推送消息。在这种情况下：

  - uni-app项目，需要使用老版的 [uni-push1.0](https://uniapp.dcloud.net.cn/unipush-v1.html) 。相关密钥获取方式：登录[开发者中心](https://dev.dcloud.net.cn/)左侧菜单->`uni-push`->`uni-push 2.0（支持全端推送）`->`消息推送`->`应用配置`->`应用信息`
  - uni-app-x 项目，虽然只能使用 uni-push2.0，但支持在[开发者中心](https://dev.dcloud.net.cn/)左侧菜单-`uni-push`->`uni-push 2.0（支持全端推送）`-> `厂商推送设置` 在顶端注意事项中，点击获取个推的MasterSecret

  请注意，直接调用个推服务器进行推送可能需要更多的配置和操作步骤，具体请参考[调用个推服务器](https://uniapp.dcloud.net.cn/unipush-v1.html#request-getui)的相关文档。

## 2.什么是push？

push，指服务器主动向客户端发送消息的技术。无需客户端持续轮询服务器，即可获得即时数据。

轮询有很多弊端：1) 客户端应用必须实时在线；2) 手机端耗电严重；3) 服务器负载高且浪费资源

手机的通知栏、小程序的订阅消息都是一种push，由手机操作系统或微信在底层提供了push通道，屏蔽了轮询的各种弊端。你的应用可以被关闭，只要手机有网，操作系统提供的push通道即是实时在线的。

提醒：web浏览器的webnotification其实是一个本地通知栏功能，浏览器厂商没有提供push通道。

当客户端在线时，push通过socket协议实现。当客户端离线时，服务器找不到客户端，开发者无法自己实现推送，只能依托手机操作系统、小程序底层提供的离线消息推送，调用指定的手机厂商或小程序厂商的服务器接口来发送消息。

所以一个push系统需要3部分协作：开发者的业务服务器 + 专业push服务器 + 开发者的客户端应用。

其主要流程是：

1. 开发者的业务服务器向专业push服务器发送指令，告知需要向哪些客户端发送什么样的消息
2. 专业push服务器再向客户端发送消息
3. 若手机应用在线，直接收到push；若不在线，手机用户在操作系统的通知栏中看到push消息，点击后呼起客户端应用，客户端代码可以接收响应获得消息；如果是小程序的话，则是在微信消息里看到订阅消息，点击后呼起小程序并拿到启动参数。

由于手机厂商众多，他们各自都有不同的推送服务，包括Apple、google（仅能在海外使用）、华为、小米、oppo、vivo、魅族，以及还有一些没有专业推送服务的中小手机品牌。他们对App后台耗电都有查杀机制，除了微信等大应用，普通应用很难常驻后台。

如果开发者把上述每个平台的客户端和服务器的SDK都对接一遍，还自己处理没有push服务的中小品牌手机，那过于困难了。所以业内有专业的推送服务厂商把各种手机厂商的通道封装成一套统一的API，如个推（属于上市公司每日互动）；同时这些三方专业推送厂商还提供了高速socket通道。当应用在线时，也可以直接通过socket下发消息。否则开发者需要写很多判断代码、搭建socket服务器、处理在线时和离线时各种差异。

如下图所示： 首先开发者的uniCloud应用服务器向uni-push服务器发送push消息，然后

- 如果客户端应用在线，客户端通过socket直接收到push在线消息；
- 客户端应用不联网时，`uni-push`服务器根据客户端类型，把push消息发给某个手机厂商的push服务器或小程序的订阅消息服务器；然后厂商push通道会把这条消息发到手机的通知栏或微信的订阅消息里；手机用户点击通知栏消息或小程序订阅消息后，启动App或小程序，客户端才能收到离线消息。

![image-20241229152759305](https://i0.hdslb.com/bfs/article/8e1c0ccc1c97909945a9c0ef1be23a6b95443509.png)

总结下`uni-push`提供的功能：

1. 一个在线的socket下行服务，无论app、小程序、web，只要在线，都可以从服务器推送消息。尤其对于uniCloud用户，这个免费socket下行服务用途很多。
2. app平台，提供app离线时的推送，聚合了所有已知手机厂商的push通道；对于未提供push通道的小手机厂商，提供后台常驻进程接收push消息（受手机rom节电设置约束）
3. 小程序平台，目前提供了下行socket通道，后续会整合小程序离线时的订阅消息
4. web平台，目前提供了下行socket通道，后续会提供webnotification的封装。当标签卡在后台时（注意不是关闭时），仍然可以在屏幕上弹出通知栏。
5. 快应用平台，目前提供了下行socket通道，后续会提供离线push的封装
6. 一个[uni-admin](https://doc.dcloud.net.cn/uniCloud/admin)插件，开源的web控制台，无需编程，可视化界面发送push消息 [详见](https://ext.dcloud.net.cn/plugin?name=uni-push-admin)

在[uni-starter](https://doc.dcloud.net.cn/uniCloud/uni-starter)里，还提供了app push权限判断、申请、开关设置，搭配使用可以大量降低开发工作量。

注意：app申请创建通知栏消息、web申请弹出通知，均会由操作系统或浏览器自动弹窗询问用户是否同意。小程序下需要手机用户主动发起订阅行为，才能送达消息。

`uni-push`即降低了开发成本，又提高了push送达率，还支持全平台，并且免费，是当前推送的最佳解决方案。

## 3.自定义基座

如果要自定义原生层，则需要走一遍iOS或Android的打包流程，由XCode或Android studio编译打包生成ipa或apk安装包。

但打包后无法方便调试，不能热重载和显示控制台日志。所以HBuilder在打包时提供了一个特殊选项，打包“自定义运行基座”。

### 3.1 项目设置

首先需要将`uni-app`的项目进行一些设置：

1. 菜单栏工具 -> 设置 -> 运行配置，这里需要配置`adb`路径，以便打包之后能够正常启动app。同时需要检查该路径下是否只有一个`adb`版本。
   ![image-20241229154113485](https://i0.hdslb.com/bfs/article/3505cf296a99eb539a174b18c52d50cd95443509.png)
   ![image-20241229154216388](https://i0.hdslb.com/bfs/article/405c9c16c80f06487ae8f231bac5afe695443509.png)
2. 项目`manifest.json` -> 安卓/IOS常用其它设置，这里需要设置安卓的`minSdkVersion`和`支持CPU类型`。详见[安卓/IOS专题-其它配置](https://uniapp.dcloud.net.cn/tutorial/app-android-minsdkversion.html)。
   ![image-20241229154337298](https://i0.hdslb.com/bfs/article/2f17b104982e52a9fc65da59ecae4f1f95443509.png)

### 3.2 自定义基座设置

以上设置完成后就可以开始自定义基座的配置：

1. 入口：
   ![image-20241229153741788](https://i0.hdslb.com/bfs/article/ed612b65c59211b7fe74648a7479287d95443509.png)
2. 按照框住的部分配置即可：
   ![image-20241229154713071](https://i0.hdslb.com/bfs/article/fbafa62047aaf555765f7f004782f2a195443509.png)
   ![image-20241229154726917](https://i0.hdslb.com/bfs/article/538a188d4cef48817c4f43e6c2cdc82295443509.png)
3. 点击打包即可开始创建自定义基座。
4. 打包完成后，可以在[开发者中心](https://dev.dcloud.net.cn/)左侧菜单栏应用管理 -> 我的应用 -> 应用详情 -> Android云端证书中看到生成的云端证书。
   ![image-20241229155159277](https://i0.hdslb.com/bfs/article/a67a5d46f5638dddfb03c35e4df70ca495443509.png)

### 3.3 使用自定义基座启动项目

1. 首先打开一个手机模拟器，我使用的是`雷电模拟器v5.0.82`。
2. 运行入口：
   ![image-20241229155313582](https://i0.hdslb.com/bfs/article/6ee12fea4f863b2179619b9b00448bef95443509.png)
3. 点击运行即可。
   ![image-20241229155849663](https://i0.hdslb.com/bfs/article/bbbf0286ab53b9bf84d178b1da16658a95443509.png)

## 4.开通 uni-push

### 4.1 初始化应用

- 使用 HBuilder 账号登录 [开发者中心](https://dev.dcloud.net.cn/)
- 在左侧菜单栏找到`uni-push`-`uni-push 2.0（支持全端推送）`-`应用信息`，点击“当前应用”选择要操作的应用。 可进入uni-push 应用开通界面。

### 4.2 填写应用信息

应用开通 uni-push 功能时，需要提交应用相关信息，若完成了上一章自定义基座的制作，选择`Android 包名`会自动带出证书相关信息。

![image-20241229160026027](https://i0.hdslb.com/bfs/article/a051a56da4bf9638e63fe21f5961224595443509.png)

### 4.3 项目配置 uni-push

1. 项目`manifest.json` -> 安卓/IOS模块配置 -> 打包模块配置。

   注意这里需要勾选`离线推送`，否则后续在管理后台测试消息时可以能无法识别在线人数。
   ![image-20241229160425610](https://i0.hdslb.com/bfs/article/7dae100e695b1860a669830602a1d4ff95443509.png)

2. 配置完成后需要重新制作自定义基座。

## 5.开始使用

### 5.1 客户端监听推送消息

监听推送消息的代码，需要在收到推送消息之前被执行。所以应当写在应用一启动就会触发的[应用生命周期](https://uniapp.dcloud.io/collocation/App.html#applifecycle)`onLaunch`中。

示例代码：

```js
// 文件路径：项目根目录App.vue/uvue
export default {
    onLaunch: function() {
        console.log('App Launch')
        uni.onPushMessage((res) => {
            console.log("收到推送消息：",res) //监听推送消息
        })
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    }
}
```

复制代码

> 先跟着示例代码简单体验，详细的uni.onPushMessage API介绍：uni-app 框架[详情参考](https://uniapp.dcloud.net.cn/api/plugins/push.html#onpushmessage)，uni-app x 框架[详情参考](https://doc.dcloud.net.cn/uni-app-x/api/push.html#onpushmessage)

**APP端真机运行注意:**

- 如果启用了离线推送，必须：经过发行原生app云打包后，客户端才能监听到推送消息。标准HBuilder运行基座无法使用。
- 如果Android应用进入后台后（App未销毁），点击通知消息无法拉起App，请检查设备是否有禁止后台弹出界面，路径>>设置-应用管理-测试应用-权限管理-后台弹出界面，(一般是小米、oppo、 vivo设备)。

### 5.2 获取客户端推送标识

假如我要给“张三”打电话，那就需要知道对方的电话标识，即电话号码是多少。 同理，要给某个客户端推送消息，也需要知道该设备的客户端推送标识。

> 先跟着示例代码简单体验，详细的uni.getPushClientId API介绍：uni-app 框架[详情参考](https://uniapp.dcloud.net.cn/api/plugins/push.html#getpushclientid)，uni-app x 框架[详情参考](https://doc.dcloud.net.cn/uni-app-x/api/push.html#getpushclientid) 代码示例：

```js
// uni-app客户端获取push客户端标记
uni.getPushClientId({
    success: (res) => {
        let push_clientid = res.cid
        console.log('客户端推送标识:',push_clientid)
    },
    fail(err) {
        console.log(err)
    }
})
```

### 5.3 使用开发者后台进行透传消息推送

1. 入口：[开发者中心](https://dev.dcloud.net.cn/)  ->  `uni-push` -> `uni-push 2.0（支持全端推送）` -> 消息推送：
   ![image-20241229162744143](https://i0.hdslb.com/bfs/article/83df7a7497d800fb918f0203e6ef1c0595443509.png)
2. 设置描述和内容：
   ![image-20241229163117184](https://i0.hdslb.com/bfs/article/586a81600e393d599711482a5fd97d0495443509.png)
3. 发送消息：
   ![image-20241229163148724](https://i0.hdslb.com/bfs/article/9e9d2435cfd24afc5877511a313fca9095443509.png)
   ![image-20241229163158121](https://i0.hdslb.com/bfs/article/aa308ca8565999bda2ac37079ecef1b595443509.png)
4. 发送成功后，可以在项目的控制看到接收到的消息内容：
   ![image-20241229163508131](https://i0.hdslb.com/bfs/article/40492ab4451e36768c7d13fdb08c8bcf95443509.png)
   ![image-20241229163528947](https://i0.hdslb.com/bfs/article/a837249e1fed25324dd1904080106ac595443509.png)

### 5.4 创建本地通知栏消息

[uni.createPushMessage](https://uniapp.dcloud.net.cn/api/plugins/push.html#createpushmessage )

```js
uni.onPushMessage((res) => {
    uni.createPushMessage({
        title: '测试标题2',
        content: '测试内容2',
        payload: {
            id: '1',
            name: '管理员'
        },
    });
});
```

在后台推送透传消息，模拟器通知显示如下：

![image-20241229165102299](https://i0.hdslb.com/bfs/article/0d5d0b90145cceace22b27c31e9199f995443509.png)

点击消息跳转到对应页面：

> 事件类型，"click"-从系统推送服务点击消息启动应用事件；"receive"-应用从推送服务器接收到推送消息事件。

```js
uni.onPushMessage((res) => {
    if (res.type === 'receive') {
        uni.createPushMessage({
            title: '测试标题3',
            content: res.data.content,
            payload: res.data.payload,
        });
    } else if(res.type === 'click') {
        uni.navigateTo({
            url: '/pages/demo/demo?id=' + res.data.payload.id
        })
    }
});
```

## 6.引导用户开启手机通知

默认情况下，新安装的app的通知权限是关闭，如下图所示：

![image-20250130235003158](https://i0.hdslb.com/bfs/article/6e3922fe7b6126881a9e1256594044c995443509.png)

所以需要在打开app的时候提示让用户去打开消息权限。提示消息封装代码如下：

`@/utils/setPermissions.js`

```js
/**
 * 设置手机通知权限
 */
export function setPermissions() {
    // #ifdef APP-PLUS  
    if (plus.os.name == 'Android') { // 判断是Android
        var main = plus.android.runtimeMainActivity();
        var pkName = main.getPackageName();
        var uid = main.getApplicationInfo().plusGetAttribute("uid");
        var NotificationManagerCompat = plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
        //android.support.v4升级为androidx
        if (NotificationManagerCompat == null) {
            NotificationManagerCompat = plus.android.importClass("androidx.core.app.NotificationManagerCompat");
        }
        var areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();
        // 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置  
        if (!areNotificationsEnabled) {
            uni.showModal({
                title: '通知权限开启提醒',
                content: '您还没有开启通知权限，无法接受到消息通知，请前往设置！',
                showCancel: false,
                confirmText: '去设置',
                success: function(res) {
                    if (res.confirm) {
                        var Intent = plus.android.importClass('android.content.Intent');
                        var Build = plus.android.importClass("android.os.Build");
                        //android 8.0引导  
                        if (Build.VERSION.SDK_INT >= 26) {
                            var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
                            intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
                        } else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
                            var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
                            intent.putExtra("app_package", pkName);
                            intent.putExtra("app_uid", uid);
                        } else { //(<21)其他--跳转到该应用管理的详情页  
                            intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                            var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
                            intent.setData(uri);
                        }
                        // 跳转到该应用的系统通知设置页  
                        main.startActivity(intent);
                    }
                }
            });
        }
    } else if (plus.os.name == 'iOS') { // 判断是ISO
        var isOn = undefined;
        var types = 0;
        var app = plus.ios.invoke('UIApplication', 'sharedApplication');
        var settings = plus.ios.invoke(app, 'currentUserNotificationSettings');
        if (settings) {
            types = settings.plusGetAttribute('types');
            plus.ios.deleteObject(settings);
        } else {
            types = plus.ios.invoke(app, 'enabledRemoteNotificationTypes');
        }
        plus.ios.deleteObject(app);
        isOn = (0 != types);
        if (isOn == false) {
            uni.showModal({
                title: '通知权限开启提醒',
                content: '您还没有开启通知权限，无法接受到消息通知，请前往设置！',
                showCancel: false,
                confirmText: '去设置',
                success: function(res) {
                    if (res.confirm) {
                        var app = plus.ios.invoke('UIApplication', 'sharedApplication');
                        var setting = plus.ios.invoke('NSURL', 'URLWithString:', 'app-settings:');
                        plus.ios.invoke(app, 'openURL:', setting);
                        plus.ios.deleteObject(setting);
                        plus.ios.deleteObject(app);
                    }
                }
            });
        }
    }
    // #endif  
}

```

在启动的时候调用该函数即可：

`App.vue`

```js
  import { setPermissions } from '@/utils/setPermissions.js';

  export default {
    onLaunch() {
       //  提示用户开启手机通知
      setPermissions();

      uni.getPushClientId({
        success(res) {
          console.log(res.cid);
        },
      });

      uni.onPushMessage(res => {
        console.log(res);

        if (res.type === 'receive') {
          uni.createPushMessage({
            content: res.data.content,
            payload: res.data.payload,
          });
        }
      });
    },
  };
```

效果如下：

![image-20250130235727174](https://i0.hdslb.com/bfs/article/505f2cf37964ec188631d47e4e41791395443509.png)

## 7.使用uni-admin-push推送消息

### 7.1 初始化uni-admin项目

1. 使用`uni-app`提供的`uni-admin`模板创建项目：
   ![image-20250131233338144](https://i0.hdslb.com/bfs/article/cb80bf9355642bdfd70f88c1220be4d795443509.png)
2. 初始化云空间：
   1. 关联云空间：
      ![image-20250131233526663](https://i0.hdslb.com/bfs/article/8908212eed3d990fd9fe8adaeb1a9a4f95443509.png)
   2. 上传所有云函数至云端：
      ![image-20250131233546209](https://i0.hdslb.com/bfs/article/293cfbe489580b44b4c1927b069c259995443509.png)
   3. 初始化云数据库：
      ![image-20250131233601657](https://i0.hdslb.com/bfs/article/4b025eed286af74de33944fc0f5a57d595443509.png)
3. 启动项目：
   ![image-20250131233753554](https://i0.hdslb.com/bfs/article/9ad6e782b3eb280aa55e46f415269e5895443509.png)

### 7.2 新增uni-push-admin插件

1. 在dcloud插件市场搜索`uni-push-admin`插件安装：
   ![image-20250131234001265](https://i0.hdslb.com/bfs/article/8be99e37472b53c3c365376e15a4850595443509.png)

2. 上传云函数和云数据库的`db schema`。

3. 重启admin项目，在`系统管理` -> `菜单管理 `-> `待添加菜单` 会出现推送管理相关菜单，添加即可：
   ![image-20250131234859056](https://i0.hdslb.com/bfs/article/4c09bfe57290cb53cdeffcf1e2c28e0795443509.png)

4. 项目的 `pages.json` 文件 `pages` 节点新增相关菜单：
   ```json
   {
       "path": "uni_modules/uni-push-admin/pages/extra/extra",
       "style": {
           "navigationBarTitleText": "push-admin"
           /* #ifndef H5 */
           ,"navigationStyle": "default"
           /* #endif */
       }
   }, {
       "path": "uni_modules/uni-push-admin/pages/log/list",
       "style": {
           "navigationBarTitleText": "推送记录"
           /* #ifndef H5 */
           ,"navigationStyle": "default"
           /* #endif */
       }
   }, {
       "path": "uni_modules/uni-push-admin/pages/log/detail",
       "style": {
           "navigationBarTitleText": "推送详情",
           "navigationStyle": "default"
       }
   }, {
       "path": "uni_modules/uni-push-admin/pages/sendMessage/sendMessage",
       "style": {
           "navigationBarTitleText": "消息推送"
           /* #ifndef H5 */
           ,"navigationStyle": "default"
           /* #endif */
       }
   }
   ```

5. 重启项目，展示如下：
   ![image-20250131235832939](https://i0.hdslb.com/bfs/article/05352b5b57bd1ff172d46ca415fa567c95443509.png)

## 8.使用云函数url化生成消息推送接口

### 8.1 服务端API

以下为uni-cloud-push扩展库的api文档；关于uni-cloud-push扩展库的详细介绍，以及如何在需要操作uni-push的云函数里，手动配置uni-cloud-push扩展库[详情参考](https://uniapp.dcloud.io/unipush-v2.html#第四步-服务端推送消息)

#### 8.1.1 推送消息

##### 推送目标选择

发送push可以基于如下维度选择目标设备：

- 不指定，所有启动过应用的设备
- user_id，指定的用户id，基于uni-id账户体系
- user_tag，指定用户标签，基于uni-id账户体系
- device_id，指定的设备id，基于opendb表的device设备（未开通uni统计的应用，必须基于uni-id-co登录后才可使用）
- push_clientid，个推客户端id（也会存在opendb表中）。
- getui_alias，个推自定义客户端别名。
- getui_custom_tag，由用户自定义的个推客户端标签。该功能需要申请相关套餐，请点击右侧“技术咨询”了解详情
- getui_big_data_tag，个推大数据标签。

**注意**：`user_id`、`user_tag`、`device_id`、`push_clientid`、`getui_custom_tag`、`getui_big_data_tag`、`getui_alias`不可多选。全为空表示向所有启动过应用的设备推送。

如果用户处于未登录状态，你可以基于`device_id`向用户推送消息，但是推送服务器底层只识别`push_clientid`，需要通过查数据库获得`push_clientid`。而`device_id`与`push_clientid`的映射关系不由`uni-push`提供，而是由[uni统计](https://uniapp.dcloud.io/uni-stat-v2.html)模块内置的功能实现。如果你不使用uni统计，则需要在应用启动时调用[getPushClientId](https://uniapp.dcloud.net.cn/api/plugins/push)获取`push_clientid`，获取成功后（应用未在manifest中启用uni-push2.0则会获取失败）调用服务端云对象的某个方法（参数：`push_clientid`）执行向`opendb-device`表写入或更新（存在时）：[设备信息](https://uniapp.dcloud.io/uniCloud/cloud-obj.html#get-client-info)和`push_clientid`。

同理基于`user_id`向用户推送消息，需要`user_id`与`push_clientid`的映射关系，可以直接使用[uni-id-pages](https://ext.dcloud.net.cn/plugin?id=8577)插件内置的功能实现。如果你不使用`uni-id-pages`需要在`App.vue`调用[uniCloud.onRefreshToken](https://uniapp.dcloud.io/uniCloud/client-sdk.html#on-refresh-token) 监听token发生变化（即：用户登录和token续期时），调用服务端云对象的某个方法（参数：`push_clientid`）操作`uni-id-device`表，记录`device_id` 与 `user_id`（防客户端伪造，需校验`token`）的映射关系；完整字段包含`user_id`、`device_id`、`token_expired`、`push_clientid`、`appid`。同时再向`opendb-device`表写入或更新（存在时）：[设备信息](https://uniapp.dcloud.io/uniCloud/cloud-obj.html#get-client-info)和`push_clientid`。

**注意：** 客户端上报的信息在理论上存在被篡改可能，基于`device_id`向用户推送消息有被窃听的风险（营销类消息不用太关心这个）。 例如：张三使用李四的`device_id`+张三的`push_clientid`。上报数据；服务器会认为李四的`push_clientid`更新了，从而将李四的`device_id`与`push_clientid`的映射关系，指向张三的`push_clientid`;张三从而窃听到，其他人发给李四的消息。 而基于`user_id`或者`user_tag`推送消息，是基于`uni-id-device`表，在新增/更新操作时：会校验当前用户的`user_id`，不会被其他用户篡改，即没有被他人窃听消息的风险。

##### 接口形式

可以向设定的（单个、群组、全体）设备，即时或定时推送消息。支持设置：通知栏消息内容、控制响铃，震动，浮动，闪灯；手机桌面应用右上角的角标等。

```js
await uniPush.sendMessage(OBJECT)
```

##### 入参说明

| 名称               | 类型           | 必填 | 默认值 | 描述                                                         | 平台特性                                               |
| ------------------ | -------------- | ---- | ------ | ------------------------------------------------------------ | ------------------------------------------------------ |
| user_id            | String、Array  | 否   | 无     | 基于uni-id的_id，指定接收消息的用户id。 支持多个以数组的形式指定多个用户id，如["user_id-1","user_id-2"]，数组长度不大于500 |                                                        |
| user_tag           | String、Array  | 否   | 无     | 指定接收消息的用户标签，基于uni-id账户体系。 支持多个以数组的形式指定多个标签，如["user_tag-1","user_tag-2"]，数组长度不大于500 |                                                        |
| device_id          | String、Array  | 否   | 无     | 指定接收消息的设备id，基于opendb表的device设备（未开通uni统计或基于uni-id-pages开发的应用，必须基于uni-id-co登录后才可使用） |                                                        |
| push_clientid      | String、Array  | 否   | 无     | 基于[uni.getPushClientId](https://uniapp.dcloud.net.cn/api/plugins/push)获取的客户端推送标识，指定接收消息的设备。 支持多个以数组的形式指定多个设备，如["cid-1","cid-2"]，数组长度不大于1000 |                                                        |
| getui_custom_tag   | String         | 否   | 无     | 基于个推`getui_custom_tag`，指定接收消息接设备; 注：该功能需要申请相关套餐，请点击右侧“技术咨询”了解详情 。 |                                                        |
| getui_big_data_tag | Object Array   | 否   | 无     | 对指定应用的符合筛选条件的设备群发推送消息。支持定时、定速功能。详见下方[getui-big-data-tag 说明](https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/api.html#getui-big-data-tag) |                                                        |
| getui_alias        | String、Array  | 否   | 无     | 个推自定义客户端别名，指定消息接收者。 支持多个以数组的形式指定多个设备，如["getui_alias-1","getui_alias-2"]，数组长度不大于1000 |                                                        |
| platform           | String、Array  | 否   | "ALL"  | 指定接收消息的平台，"ALL"表示所有平台。 支持用数组枚举支持的平台，如：["web","app-ios","app-android","mp-weixin"],详情见下方[platform 说明](https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/api.html#platform-说明) 仅通过`user_id`、`user_tag`指定消息接收者时有效 |                                                        |
| check_token        | Boolean        | 否   | true   | 校验客户端登陆状态是否有效（含token过期） 仅通过`user_id`、`user_tag`指定消息接收者时有效 |                                                        |
| title              | String         | 是   | 无     | 通知栏标题，长度小于20                                       | APP                                                    |
| content            | String         | 是   | 无     | 通知栏内容，长度小于50                                       | APP                                                    |
| payload            | String、Object | 是   | 无     | 推送透传数据，app程序接受的数据，长度小于800字符; 注意：为了确保离线厂商通道，可以获得payload的值，请用Object格式如：`{"text":"xxx"}` |                                                        |
| category           | Object         | 否   | 无     | 消息类别，鸿蒙通道为必填项，其他通道若未进行配置，会被认定为营销类别，从而受到限量推送。 当前仅有鸿蒙、华为以及 vivo 厂商支持此项配置。 例如：{"harmony":"EXPRESS", "huawei":"EXPRESS", "vivo":"ORDER"}。 其中，harmony 与 huawei 的取值相同[详情查看](https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/message-classification-0000001149358835#section1085395991513) vivo 的取值[详情查看](https://dev.vivo.com.cn/documentCenter/doc/359#s-o2cg9ph0) | Android、harmony 注意：仅HBuilderX4.31及其以上版本支持 |
| force_notification | Boolean        | 否   | false  | 无论是离线推送还是在线推送，都自创建通知栏消息。HBuilderX 3.5.2 及其以上版本的客户端支持 | ios、android                                           |
| badge              | Number、String | 否   | +1     | 设置应用右上角数字，用于提醒用户未阅读消息数量，支持在原有数字上的+、-操作; 例如：badge=+1，表示当前角标+1； badge=-1，(仅iOS支持)表示当前角标-1(角标>=0)； badge=1，(仅iOS和华为EMUI版本10.0.0+支持)表示当前角标置成1。 | ios、android-huawei、harmony-huawei                    |
| channel            | Object         | 否   | 无     | 已不推荐使用，请通过category和[options](https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/options)配置。 | android                                                |
| request_id         | String         | 否   | 无     | 请求唯一标识号，10-32位之间；如果`request_id`重复，会导致消息丢失 |                                                        |
| group_name         | String         | 否   | 无     | 任务组名。多个消息任务可以用同一个任务组名，后续可根据任务组名查询推送情况（长度限制100字符，且不能含有特殊符号）； 仅基于user_id、push_clientid、getui_custom_tag指定消息接收者，或对应用的所有用户群发推送消息时有效。 |                                                        |
| sound              | String         | 否   | 无     | 消息提醒铃声设置，常见的离线语音播报功能就是用它实现。详见下方[实现推送铃声](https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/api.html#sound) | APP                                                    |
| content_available  | Number         | 否   | 0      | 0表示普通通知消息(默认为0)； 1表示静默推送(无通知栏消息)，静默推送时不需要填写其他参数。 苹果官方建议1小时最多推送3条静默消息 | ios                                                    |
| open_url           | string         | 否   | 无     | 填写该值将:强制push类型为“通知栏消息”，点击后系统浏览器将打开此链接。以`http(s)://`开头的有效可访问链接,华为通道必须使用https。长度小于300 | android                                                |
| settings           | Object         | 否   | 无     | 推送条件设置，详细解释见下方[settings](https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/api.html#settings)说明 |                                                        |
| options            | Object         | 否   | 无     | 实现部分厂商特定功能，包括仅部分厂商支持、不常用或厂商临时新增的功能（不依赖 uni-push，厂商文档支持的参数可直接使用）。例如：推送渠道 ID、消息分类（部分厂商未配置时可能被限量推送或静默推送，即静音且需下拉系统通知栏才可见通知内容）、通知栏富文本[更多关于options的说明](https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/options) | APP                                                    |

注意事项

HBuilderX 4.31 内置的uni-push-cloud扩展库存在options参数丢失的问题，不能连接本地云函数调试，只能连接云端云函数才能正常使用；下个版本会修复此问题。

**频次限制说明：**

- 多客户端接收消息推送API，频次限制200万次/天，申请修改请点击右侧“技术咨询”了解详情。
- 通过getui_big_data_tag（根据条件筛选设备推送）指定消息接收者推送API，频次限制100次/天，每分钟不能超过5次(推送限制和接口执行群推共享限制)，定时推送功能需要申请开通才可以使用，申请修改请点击右侧“技术咨询”了解详情。
- 对指定应用的所有用户群发推送消息API，频次限制100次/天，每分钟不能超过5次(推送限制和接口根据条件筛选用户推送共享限制)

**注意：**

- 调用一次sendMessage，最大推送设备数是500，超过将直接忽略。有超过500台以上设备接收消息的应用场景，应当分批（递归）调用，可以参考[uni-push-admin插件](https://ext.dcloud.net.cn/plugin?name=uni-push-admin) 中的云对象uni-push-co
- `push_clientid`如果3个月未登陆会失效，所以uni-id的token过期时间不能超过3个月，否则push模块会有意想不到的故障。
- harmony 平台的api，本地调试仅 HBuilderX 4.31及其以上版本支持

**getui_big_data_tag 说明**

| 名称     | 类型         | 是否必需 | 默认值 | 描述                                                         |
| -------- | ------------ | -------- | ------ | ------------------------------------------------------------ |
| key      | String       | 是       | 无     | 查询条件(phone_type 手机类型; region 省市; custom_tag 客户端标签; portrait，个推用户画像使用编码，[点击下载文件portrait.data](https://docs.getui.com/files/portrait.data)。 |
| values   | String Array | 是       | 无     | 查询条件值列表，其中 **手机型号**使用如下参数`android`和`ios`； **省市**使用编号，[点击下载文件region_code.data](https://docs.getui.com/files/region_code.data)； |
| opt_type | String       | 是       | 无     | or(或),and(与),not(非)，`values`间的交并补操作               |

- 不同key之间是交集，同一个key之间是根据`opt_type`操作
- eg. 需要发送给城市在A,B,C里面，没有设置tagtest标签，手机型号为android的设备，用条件交并补功能可以实现，city(A|B|C) && !tag(tagtest) && phonetype(android)

**platform 说明**

| 值                      | 解释                       |
| :---------------------- | :------------------------- |
| app-ios                 | iOS App                    |
| app-android             | Android App                |
| web                     | 网页                       |
| mp-weixin               | 微信小程序                 |
| mp-alipay               | 支付宝小程序               |
| mp-baidu                | 百度小程序                 |
| mp-toutiao              | 抖音小程序                 |
| mp-lark                 | 飞书小程序                 |
| mp-qq                   | QQ小程序                   |
| mp-kuaishou             | 快手小程序                 |
| mp-jd                   | 京东小程序                 |
| mp-360                  | 360小程序                  |
| quickapp-webview        | 快应用通用(包含联盟、华为) |
| quickapp-webview-union  | 快应用联盟                 |
| quickapp-webview-huawei | 快应用华为                 |

**settings 说明**

| 名称          | 类型   | 必填 | 默认值        | 描述                                                         |
| ------------- | ------ | ---- | ------------- | ------------------------------------------------------------ |
| ttl           | Number | 否   | 1小时         | 消息离线时间设置，单位毫秒，-1表示不设离线，-1 ～ 3 * 24 * 3600 * 1000(3天)之间 |
| strategy      | Object | 否   | {"default":1} | 厂商通道策略，详细内容见strategy                             |
| speed         | Number | 否   | 0             | 定速推送，例如100，个推控制下发速度在100条/秒左右，0表示不限速 |
| schedule_time | Number | 否   | 无            | 设置定时推送时间（仅向所有启动过应用的设备群发时有效），必须是7天内的时间，格式：毫秒时间戳，此功能需要单独申请开通，如需开通请点击右侧“技术咨询”了解详情 |

**strategy 厂商下发策略选择**

> 注意此功能需要单独申请开通，若有需要，请点击右侧“技术咨询”了解详情

| 名称    | 类型   | 必填 | 默认值 | 描述                                                         |
| ------- | ------ | ---- | ------ | ------------------------------------------------------------ |
| default | Number | 否   | 1      | 默认所有通道的策略选择1-4 1: 表示该消息在设备在线时推送个推通道，设备离线时推送厂商通道; 2: 表示该消息只通过厂商通道策略下发，不考虑设备是否在线; 3: 表示该消息只通过个推通道下发，不考虑设备是否在线； 4: 表示该消息优先从厂商通道下发，若消息内容在厂商通道代发失败后会从个推通道下发。 其中名称可填写: ios、st、hw、xm、vv、mz、op，如有疑问请点击右侧“技术咨询”了解详情。 |
| ios     | Number | 否   | 无     | ios通道策略1-4，表示含义同上，要推送ios通道，需要在个推开发者中心上传ios证书，建议填写2或4，否则可能会有消息不展示的问题 |
| st      | Number | 否   | 无     | 通道策略1-4，表示含义同上，需要开通st厂商使用该通道推送消息  |
| ...     | Number | 否   | 无     | 通道策略1-4，表示含义同上                                    |

**实现推送铃声**

1. 本功能App客户端依赖uni原生插件[自定义推送铃声和渠道](https://ext.dcloud.net.cn/plugin?id=7482)，注意需要打包后生效。铃声文件建议iOS和Android铃声使用一致的文件名称，直接填写文件名，不含扩展名；如：pushsound.caf或pushsound.mp3，直接填写pushsound即可。
2. Android平台需要在options参数中根据厂商规范配置相关参数，详情参考[options示例](https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/options)

**响应体说明**

多个别名推送返回值示例：

```js
{
    "errMsg":"success",
    "errCode":0,
    "data":{
        "$taskid":{
            "$alias1":{
                "$cid1":"$status",
                "$cid2":"$status"
            },
            "$alias2":{
                "$cid3":"$status",
                "$cid4":"$status"
            }
        }
    }
}
```

> 返回结构说明请参考[公共返回结构](https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/api.html#公共返回结构)

- 返回参数`data`说明

| 名称    | 类型   | 描述                                                         |
| ------- | ------ | ------------------------------------------------------------ |
| $taskid | Object | 任务编号                                                     |
| $alias  | String | 设备别名                                                     |
| $cid    | String | 个推客户端id                                                 |
| $status | Object | 推送结果 successed_offline: 离线下发(包含厂商通道下发)， successed_online: 在线下发， successed_ignore: 最近90天内不活跃设备不下发 |

群发返回值示例：

```js
{
    "errCode": 0,
        "errMsg": "",
            "data": {
                "$taskid": "RASA_123_12469008ac33dd02815014631c00000f"
            }
}
```

其他推送返回值示例：

```js
{
    "errCode": 0,
        "errMsg": "",
            "data": {
                "$taskid": {
                    "$cid":"$status"
                }
            }
}
```

> 返回结构说明请参考[公共返回结构](https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/api.html#公共返回结构)

- 返回参数`data`说明

| 名称    | 类型   | 描述                                                         |
| ------- | ------ | ------------------------------------------------------------ |
| $taskid | Object | 任务编号                                                     |
| $cid    | String | 个推客户端id                                                 |
| $status | Object | 推送结果 successed_offline: 离线下发(包含厂商通道下发)， successed_online: 在线下发， successed_ignore: 最近90天内不活跃设备不下发 |

##### 实操说明

1. 首先新建一个云对象，并且添加公共依赖`uni-cloud-push`
   ![image-20250202193608885](https://i0.hdslb.com/bfs/article/1bc1ffb31875552f6ef3a7705ceb649495443509.png)

2. 在云对象中写法如下：
   ```js
   // 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
   // jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
   const uniPush = uniCloud.getPushManager({
       appId: "__UNI__"
   }) //注意这里需要传入你的应用appId
   
   module.exports = {
       _before: function() { // 通用预处理器
   
       },
       async sendMessage() {
           const httpInfo = this.getHttpInfo();
           console.log('请求体内容 ===>', httpInfo.body)
           return await uniPush.sendMessage(JSON.parse(httpInfo.body));
       },
   }
   ```

3. 然后在开发者后台开启云函数url化：
   ![image-20250202193800112](https://i0.hdslb.com/bfs/article/a9e13aa13ad4b3ad811db38716f8d7c795443509.png)

4. 使用接口调试工具调用接口：
   ![image-20250202201659190](https://i0.hdslb.com/bfs/article/9e3161ba4b909e901b1073d0987563ed95443509.png)
