# 07 【uniCloud】

## 1.开发自己的第一个uniCloud项目

1. 创建uniCloud项目

HBuilderX中新建项目，选择uni-app项目，并勾选`启用uniCloud`，在右侧选择服务供应商（腾讯云或阿里云）

项目名称随意，比如 firstunicloud

2. 关联服务空间

一个开发者可以拥有多个服务空间，每个服务空间都是一个独立的serverless云环境，不同服务空间之间的云函数、数据库、存储都是隔离的。

对项目根目录`uniCloud`点右键选择`关联云服务空间`，绑定之前创建的服务空间，或者新建一个服务空间。

3. 创建云函数/云对象

`uniCloud`项目创建并绑定服务空间后，开发者可以创建云函数（云对象是云函数的一种，云函数可泛指普通云函数和云对象）。

在`uniCloud/cloudfunctions`目录右键创建云函数/云对象

![image-20221014204232191](https://i0.hdslb.com/bfs/album/d1dca73d93851b3fcc5713717024edd605713eb8.png)

- 创建云函数后，生成一个目录，该目录下自动生成index.js，是该云函数的入口文件，不可改名。
- 创建云对象后，生成一个目录，该目录下自动生成index.obj.js，是该云对象的入口文件，不可改名。

如果该云函数/云对象还需要引入其他js，可在index.js入口文件中引用。

4. 给云对象编写方法

打开helloco.obj.js，我们为它添加一个 sum 方法，逻辑就是接收传入a和b2个参数，返回求和结果。

```js
module.exports = {
	sum(a, b) {
		// 此处省略a和b的有效性校验
		return a + b
	}
}
```

5. 在前端调用云对象

在项目首页，pages/index/index.vue 里，添加一个按钮，点击后执行异步方法sum。

js 中 import 这个 helloco 对象，调用它的 sum 方法

```html
<template>
	<view class="content">
		<button @click="testco()">请求云对象的方法</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			async testco() { // 注意异步
				const helloco = uniCloud.importObject('helloco') // 导入云对象
				try {
					const res = await helloco.sum(1,2) //导入云对象后就可以直接调用该对象的sum方法了，注意使用异步await
					console.log(res) // 结果是3
				} catch (e) {
					console.log(e)
				}
			}
		}
	}
</script>
```

6. 运行

将项目运行到浏览器或其他平台，点页面上的按钮，控制台会打印结果：3

HBuilderX自带一个云函数本地运行环境，运行项目时也默认选择 连接本地云函数。可以在底部控制台中的前端控制台右上角进行切换。

可以对helloco云对象点右键上传到uniCloud服务空间，然后在前端控制台右上角切换为 连接云端云函数，那么此时客户端连接的就是真正的现网uniCloud服务器了。

关于运行调试，有单独文档，[详见](https://uniapp.dcloud.net.cn/uniCloud/rundebug)

7. 小结

到此为止，你已经开发了第一个 first uniCloud 项目，完成了客户端和服务器的第一次交互。

这个云对象只做了一个求和运算，实际开发中不需要在服务器求和，前端就可以求和。服务器应该做更复杂的事情。

但你可以通过这个示例感知uniCloud的开发，其实非常简单。尤其是云对象，打破了服务器做接口传json给前端的传统，让云端服务对象化，让服务器代码像写前端js一样、清晰。

接下来，建议通读文档，进一步学习掌握uniCloud。

## 2.云函数/云对象

### 2.1 简介

云函数是运行在云端的 `JavaScript` 代码，是基于 `Node.js` 的扩展。

在常规的 `Node API` 基础上，uniCloud的云函数环境内置了`uniCloud`对象，这个对象内置了网络、数据库等各种API。开发者未学习过 `Node.js` 也没有关系，只需要看uniCloud的文档，掌握这个`uniCloud`对象的API即可。

每个云函数是一个js包，在云函数被调用时，由 serverless 调度系统分配硬件资源启动一个 node 环境来运行这个云函数。

在HBuilderX中可以新建云函数（HBuilderX 3.4 同时可以新建云对象）。

![image-20221014221332868](https://i0.hdslb.com/bfs/album/abff2b7db1436a59e85edced074e8116e44907ed.png)

每个云函数是一个目录，其中普通云函数有`index.js`入口文件，云对象的入口文件则是`index.obj.js`。

一个最简单的云函数只需要这个入口js文件，在里面编写代码即可。当然也可以在这个js中require该云函数目录下的其他js、json文件。

云函数的配置文件和 npm规范 相同，在云函数目录下可新建一个 package.json 来存放配置。uniCloud云函数扩展了 package.json，增加了一些特有的配置项。[详见](https://uniapp.dcloud.net.cn/uniCloud/cf-functions#packagejson)

云函数启动后实例会保留一段时间（如15分钟），超过保留期后若该云函数一直没有被再调用，那这个实例会被释放。所以云函数有冷启动的概念。不过由于js实例的启动要比php和java更快，所以js更适合serverless方式。

**注意事项**

- 云函数内使用commonjs规范，不可使用import、export，参考：[commonjs模块(opens new window)](http://nodejs.cn/api/modules.html#modules_modules_commonjs_modules)
- 不同项目使用同一个服务空间时，不可使用同名云函数。同名云函数会相互覆盖。
- 在HBuilderX创建云函数时，如果新云函数与服务器上已存在同名云函数，会用新函数覆盖。所以应先选择从服务空间下载云函数。
- uniCloud的阿里云版，暂不可使用相对路径读取文件（比如`fs.readFileSync('./info.txt')`），可以使用绝对路径`fs.readFileSync(path.resolve(__dirname,'./info.txt'))`

### 2.2 云函数的分类

云函数有若干子概念，包括 普通云函数、云对象、公共模块、clientDB的action云函数、uniCloud扩展库。

- 云函数：通过传统json接口方式和客户端通信，客户端使用`uniCloud.callfunction("")`调用云函数
- 云对象：是通过前端导入对象来操作的，客户端使用`uniCloud.importObject("")`导入云对象。详见[云对象](https://uniapp.dcloud.net.cn/uniCloud/cloud-obj)
- 公共模块：用于不同的云函数/云对象，抽取和共享相同代码，详见[公共模块文档](https://uniapp.dcloud.net.cn/uniCloud/cf-functions#公共模块)
- action云函数：为了弥补clientDB客户端直接操作数据库的局限而设计的，详见[clientDB action文档](https://uniapp.dcloud.net.cn/uniCloud/clientdb#action)
- uniCloud扩展库：为了裁剪和控制云函数体积而设计的，一些不太常用的功能比如Redis，独立为可选扩展库，避免增大每个云函数的体积，详见[uniCloud扩展库](https://uniapp.dcloud.net.cn/uniCloud/cf-functions#扩展库)

HBuilderX中uniCloud项目的云函数均在项目的`uniCloud/cloudfunctions`目录下，目录结构如下：

```markdown
|——— cloudfunctions               云函数目录
|   │───common                    云函数公用模块目录 
|   |   └──hello-common           云函数公用模块
|   |      │──index.js            公用模块代码
|   |      └──package.json        公用模块package.json
|   │───uni-clientDB-actions
|   │      └──new_action.js       clientDB action代码 
|   │───function-name             云函数目录
|   │     │──index.js             云函数代码
|   │     └──package.json         包含云函数的配置信息，如url化、定时设置、可用内存等内容 
|   └───object-name               云对象目录
|         │──index.obj.js         云对象代码
|         └──package.json         包含云对象的配置信息，可用内存等内容 
```

### 2.3 uniCloud响应体规范

`uniCloud响应体规范`（uniCloud response format），是DCloud制定的、服务器给客户端返回json数据的一种建议格式。

云对象、clientDB、uni-id公共模块均支持此规范。

**由来**

uniCloud服务器给客户端返回的数据格式一般是json，但json的格式具体是什么没有约定。比如返回错误码，是叫`code`还是叫`errCode`？错误内容是`message`还是`errMsg`？内容的国际化如何处理？

如果没有一套统一的格式，在客户端将无法编写有效的网络拦截器，无法统一处理错误。

另外，如果不同的插件，云端返回的数据格式千差万别，那使用者整合这些插件也会非常麻烦。国际化更无法落地。

为此DCloud推出了`uniCloud响应体规范`。

为了与uni-app前端的API错误回调风格统一，uniCloud响应体规范定义的云端返回信息（尤其是报错时）应包含`errCode`和`errMsg`。

除此之外响应体规范还包含`newToken`字段，用于token的自动续期（云对象接收含有newToken的响应后会自动更新storage内存储的`uni_id_token`及`uni_id_token_expired`，此行为新增于`HBuilderX 3.4.13`）。开发者一般无需关心此数据，uni-app客户端和云端uni-id之间会自动管理token及续期。

`uniCloud响应体`示例如下：

```json
// 失败返回值
{
  "errCode": 'uni-id-account-banned',
  "errMsg": '账号被禁用'
}
```

```json
// 成功返回值
{
  "errCode": 0,
  "errMsg": '登录成功',
  "uid": 'xxx', // 其他信息
  "newToken": { // 用于下发新token给客户端
	  "token": 'xxx',
	  "tokenExpired": 'xxx'
  }
}
```

HBuilderX内使用代码块`returnu`可以快速输入以下代码（`HBuilderX 3.4.0`及以上版本）:

```js
return {
	errCode: 0,
	errMsg: ''
}
```

- errCode

errCode在成功时应返回数字`0`,失败时应返回一个以插件id开头的“字符串”，每个单词以连字符（`-`）分割。做出这样的规定是为了防止不同插件之间出现重复错误码

以`'uni-id-account-banned'`错误码为例，`uni-id`为插件id，`account-banned`为错误缩写。

如果业务开发的代码并不发布插件市场，那么为了避免下载了一个市场的插件产生冲突，推荐使用不包含“-”的字符串来做errCode（插件市场的所有插件ID必须包含“-”）。

后续uniCloud会提供自动根据errCode对errMsg进行国际化处理的功能，开发者仅需保证云函数返回值满足`uniCloud响应体规范`即可。

- errMsg

errMsg用于存放具体错误信息，包括展示给开发者、终端用户的错误信息

## 3.云对象



## 4.普通云函数

callFunction方式云函数，也称之为普通云函数。

uni-app的前端代码，不再执行`uni.request`联网，而是通过`uniCloud.callFunction`调用云函数。

callFunction方式避免了服务器提供域名，不暴露固定ip，减少被攻击的风险。

- 对于uni-app前端而言，使用云对象会比使用callFunction云函数方式更为简单清晰。
- 但对于非uni-app前端调用的场景，比如5+App、外部应用、服务器要调用云函数，或者uniCloud定时任务，此时不适合使用云对象，还是需要云函数。

`uniCloud.callFunction`可以在uni-app前端执行，也可以在uniCloud云函数中执行。也就是前端和云端都可以调用另一个云函数。

`callFunction`方法的参数和返回值如下：

### 4.1 callFunction方法

`uniCloud.callFunction`需要一个json对象作为参数，其中包含2个字段

| 字段 |  类型  | 必填 |         说明         |
| :--: | :----: | :--: | :------------------: |
| name | String |  是  |      云函数名称      |
| data | Object |  否  | 客户端需要传递的参数 |

**返回json**

|   字段    |      类型      |                             说明                             |
| :-------: | :------------: | :----------------------------------------------------------: |
|  result   |     Object     |                 云函数中代码return的返回结果                 |
| requestId |     String     | 云函数请求序列号，用于错误排查，可以在uniCloud web控制台的云函数日志中查到 |
|  header   |     Object     |                       服务器header信息                       |
|  errCode  | Number或String |                         服务器错误码                         |
|  success  |      bool      |                         执行是否成功                         |

**前端示例代码**

假使云服务空间有一个云函数名为“hellocf”，那么前端可以通过如下方式调用这个云函数

```javascript
// promise方式
uniCloud.callFunction({
    name: 'hellocf',
    data: { a: 1 }
  })
  .then(res => {});

// callback方式
uniCloud.callFunction({
	name: 'hellocf',
	data: { a: 1 },
	success(){},
	fail(){},
	complete(){}
});
```

### 4.2 云函数的入参

客户端callFunction调用云函数时，云函数通过入参接收客户端数据，通过头信息上下文获取客户端信息，经过业务逻辑处理后给客户端返回结果。

假使客户端代码调用云函数`hellocf`，并传递了`{a:1,b:2}`的数据，

```js
// 客户端调用云函数并传递参数
uniCloud.callFunction({
    name: 'hellocf',
    data: {a:1,b:2}
  })
  .then(res => {});
```

那么云函数侧的代码如下，将传入的两个参数求和并返回客户端：

```js
// hellocf云函数index.js入口文件代码
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let c = event.a + event.b
	return {
		sum: c
	} // 通过return返回结果给客户端
}
```

云函数的传入参数有两个，一个是`event`对象，一个是`context`对象。

- `event`指的是触发云函数的事件。当客户端调用云函数时，`event`就是客户端调用云函数时传入的参数。
- `context` 对象包含了本次请求的上下文，包括客户端的ip、ua、appId等信息，以及云函数的环境情况、调用来源source等信息。

#### 4.2.1 event对象

event对象，可以理解为客户端上行参数中的json对象。在使用`uni-id`且登录成功后，会自动多添加了一个`uniIdToken`属性。

可以通过 `event.uniIdToken` 获取 uni-id 的 token，如下：

```js
'use strict';
exports.main = async (event, context) => {
  let token = event.uniIdToken // 客户端uni-id token
}
```

所以开发者需注意，自己上行的参数对象不要包含uniIdToken属性，避免同名冲突。

**入参的体积限制**

云函数上行的参数内容不能传太大。

- 阿里云event大小不可超过1MB
- 腾讯云event大小不可超过5MB

#### 4.2.2 context对象

- `context` 对象包含了本次请求的上下文，包括客户端的ip、ua、appId等信息，以及云函数的环境情况、调用来源source等信息。

context对象的属性清单如下：

| 属性名称      | 类型   | 说明                                                         |
| ------------- | ------ | ------------------------------------------------------------ |
| SPACEINFO     | object | 服务空间信息                                                 |
| \|- spaceId   | string | 服务空间id                                                   |
| \|- provider  | string | 服务空间供应商：aliyun\|tencent                              |
| SOURCE        | string | 云函数调用来源 [详见](https://uniapp.dcloud.net.cn/uniCloud/cf-callfunction.html#context-source) |
| FUNCTION_NAME | string | 获取云函数名称                                               |
| FUNCTION_TYPE | string | 获取云函数类型，对于云函数来说，这里一定会返回`cloudfunction`，新增于HBuilderX 3.5.1。 |
| CLIENTIP      | string | 客户端IP。如果调用来源是其他服务器，会返回调用方的ip         |
| CLIENTUA      | string | 客户端userAgent。注意非本地运行环境下客户端getSystemInfoSync也会获取ua参数并上传给云函数，但是云函数会从http请求头里面获取ua而不是clientInfo里面的ua |
| uniIdToken    | string | 客户端uni-id token字符串，新增于HBuilderX 3.5.1。            |
| requestId     | string | 当前请求id，新增于HBuilderX 3.5.5。                          |

除了上述属性，如果是uni-app客户端通过callfunction访问云函数，那么context还会追加一批客户端信息。

- HBuilderX 3.4.9前，context 添加了一批大写属性，如APPID、OS。
- HBuilderX 3.4.9起，context 的属性包括前端API `uni.getSystemInfo` 的所有属性。比如appId、osName，均以驼峰方式命名。这些属性较多，且可能跟随前端API更新而变化，具体详见 [uni.getSystemInfo](https://uniapp.dcloud.net.cn/api/system/info.html#getsysteminfo)

为了保持向下兼容，新版并没有去掉老版那些大写属性的客户端信息，但文档标注为以废弃。对于新版HBuilderX用户而言，请使用 `uni.getSystemInfo` 返回的驼峰属性。

HBuilderX 3.4.9起，context 的属性还可以打印出`channel`和`scene`，即App的渠道包标记和小程序场景值。但这个功能属于未完成功能，开发者暂不使用这2个属性，后续会升级完善。目前如开发者需要这2个属性，请自行在客户端使用[uni.getLaunchOptionsSync](https://uniapp.dcloud.net.cn/api/plugins/getLaunchOptionsSync.html#getlaunchoptionssync)上传。

示例：

```js
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
  //...
  //context中可获取客户端调用的上下文
  let clientIP = context.CLIENTIP // 客户端ip信息
  let spaceInfo = context.SPACEINFO // 当前环境信息 {spaceId:'xxx',provider:'tencent'}
  let source = context.SOURCE // 云函数调用来源
  // 以下属性只有使用uni-app以callFunction方式调用才能获取，即context.SOURCE=="client"，调用方不是uni-app客户端则没有相应数据
  let appid = context.appId // manifest.json中配置的appid
  let deviceId = context.deviceId // 客户端标识，新增于HBuilderX 3.1.0，同uni-app客户端getSystemInfo接口获取的deviceId
	//... //其它业务代码
}
```

### 4.3 云函数的返回格式

普通云函数返回给客户端的是json格式数据。返回结果包裹在result下。

前端发起callFunction到云端接收参数并响应，然后反馈前端，前端接收，完整流程代码如下：

```js
// 客户端发起调用云函数hellocf，并传入data数据
uniCloud.callFunction({
	name: 'hellocf',
	data: {a:1,b:2}
}).then((res) => {
	console.log(res.result) // 结果是 {sum: 3}
}).catch((err) => {
	console.error(err)
})
```

```js
// 云函数hellocf的代码，接收到客户端传递的data，并对其中a和b相加返回给客户端
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	//返回数据给客户端
	return {sum : event.a + event.b}
};
```

那么客户端得到的res结构如下

```json
{
	"errCode": 0,
	"errMsg": "",
	"header": {
		"access-control-expose-headers": "Date,x-fc-request-id,x-fc-error-type,x-fc-code-checksum,x-fc-invocation-duration,x-fc-max-memory-usage,x-fc-log-result,x-fc-invocation-code-version"
		"content-disposition": "attachment"
		"content-length": "38"
		"content-type": "application/json"
		"date": "Sat, 25 Jun 2022 19:28:34 GMT"
		"x-fc-code-checksum": "92066386860027743"
		"x-fc-instance-id": "c-62b761c4-5a85e238b3ce404c817d"
		"x-fc-invocation-duration": "23"
		"x-fc-invocation-service-version": "LATEST"
		"x-fc-max-memory-usage": "66.61"
		"x-fc-request-id": "80854b93-b0c7-43ab-ab16-9ee9f77ff41e"
		"x-serverless-request-id": "ac1403831656185314624173902"
		"x-serverless-runtime-version": "1.3.2"
	}
	"requestId": "ac1403831656185314624173902"
	"result": {sum: 3}
	"success": true
}
```

其中`result`是开发者云函数代码返回的数据，其余是云平台返回的。

注意：HBuilderX本地运行云函数时，如果没有系统错误，则只返回`result`，其他需要在云端运行云函数才会返回。

- errCode为0时，success也是true。
  - 表示云函数在系统层面没有运行错误。可以正常返回result。前端callFunction会进入success回调
  - 如果开发者的业务有报错，可以在 result 里返回 errCode 和 errMsg。
- errCode不为0时，success为false。
  - 表示云函数在系统层面报错了，比如联网失败、云函数超时、内存超限等错误。前端callFunction会进入fail回调
  - 发生系统错误时 result 里无法正常返回业务错误。errCode不为0时，还会返回errMsg。
- requestId是云函数的请求id，线上运行时，可以在uniCloud web控制台的云函数日志中查看运行日志。
- header是云厂商的一些信息，阿里云和腾讯云不同，上面示例代码是阿里云的header。