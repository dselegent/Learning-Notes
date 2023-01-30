# 03 【npm的使用】

## 1.包和npm

### 1.1 什么是包

由于 Node 是一套轻内核的平台，虽然提供了一系列的内置模块，但是不足以满足开发者的需求，于是乎出现了包（package）的概念： 与核心模块类似，就是将一些预先设计好的功能或者说 API 封装到一个文件夹，提供给开发者使用。

Node 本身并没有太多的功能性 API，所以市面上涌现出大量的第三方人员开发出来的 Package。

### 1.2 包的加载机制

Node.js中使用`CommonJs`模块化机制，通过`npm`下载的第三方包，我们在项目中引入第三方包都是：`let xx = require('第三方包名')`，究竟`require`方法加载第三方包的原理机制是什么，今天我们来探讨下。

1. `require('第三方包名')`优先在加载该包的模块的同级目录`node_modules`中查找第三方包。
2. 找到该第三方包中的`package.json`文件，并且找到里面的`main`属性对应的入口模块，该入口模块即为加载的第三方模块。
3. 如果在要加载的第三方包中没有找到`package.json`文件或者是`package.json`文件中没有`main`属性，则默认加载第三方包中的`index.js`文件。
4. 如果在加载第三方模块的文件的同级目录没有找到`node_modules`文件夹，或者以上所有情况都没有找到，则会向上一级父级目录下查找`node_modules`文件夹，查找规则如上一致。
5. 如果一直找到该模块的磁盘根路径都没有找到，则会报错：`can not find module xxx`。

比如说：

```javascript
requiere(`fs`);
```

那加载的肯定是系统的包。所以，我们尽量不要创建一些和现有的包重名的包。

### 1.3 npm 的概念

**NPM**：Node Package Manager。官方链接： https://www.npmjs.com/

Node.js 发展到现在，已经形成了一个非常庞大的生态圈。包的生态圈一旦繁荣起来，就必须有工具去来管理这些包。NPM 应运而生。

举个例子，当我们在使用 Java 语言做开发时，需要用到 JDK 提供的内置库，以及第三方库。同样，在使用 JS 做开发时，我们可以使用 NPM 包管理器，方便地使用成熟的、优秀的第三方框架，融合到我们自己的项目中，极大地加速日常开发的构建过程。

随着时间的发展，NPM 出现了两层概念：

- 一层含义是 Node 的开放式模块登记和管理系统，亦可以说是一个生态圈，一个社区。
- 另一层含义是 Node 默认的模块管理器，是一个命令行下的软件，用来安装和管理 Node 模块。

### 1.4 npm 的安装（不需要单独安装）

NPM 不需要单独安装。默认在安装 Node 的时候，会连带一起安装 NPM

NVM、Node、NPM 安装之后，目录分布如下：

![image-20221102143348894](https://i0.hdslb.com/bfs/album/9d95a2589e45d1d9eaf6fc481335363b9490ec24.png)

![image-20221102143357922](https://i0.hdslb.com/bfs/album/11a2587512af408095fe6f2786c596b7ee5e6dbf.png)

![image-20221102143410471](https://i0.hdslb.com/bfs/album/137d79fa1ea96221bf9f4baa465ebe7080b500ca.png)

输入 `npm -v`，查看 npm 的版本

如果上方命令无效，可能是之前的 node 并没有完全安装成功。解决办法：https://segmentfault.com/a/1190000011114680

另外，Node 附带的 NPM 可能不是最新版本，可以用下面的命令，更新到最新版本：

```bash
$ npm install npm -g
```

### 1.5 配置 NPM 的全局目录

NPM 默认安装到当前正在使用 Node 版本所在目录下。我们建议重新配置 NPM 的全局目录。

输入`npm config ls`，查看

https://blog.csdn.net/smalCat/article/details/79505441

## 2.NPM 的常用命令

查看 npm 当前版本：

```bash
npm -v
```

更新 npm：

```bash
npm install npm@latest -g
```

项目初始化：（执行完成后，会生成`package.json`文件）

```bash
npm init

# 快速跳过问答式界面，选择默认配置
npm init --yes
```

只在当前工程下安装指定的包：

```bash
npm install [package]
```

在全局安装指定的包：

```text
npm install -g [package]
```

安装的包只用于开发环境，不用于生产环境：（会出现在 package.json 文件中的 devDependencies 属性中）

```bash
npm install [package] --save-dev

# 或者
npm install [package] -D
```

安装的包需要发布到生产环境：（会出现在 package.json 文件中的 dependencies 属性中）

```bash
npm install [package] --save

# 或者
npm install [package] -S
```

查看当前目录下已安装的 node 包：

```bash
npm list
```

查看全局已经安装的 node 包：

```bash
npm list -g
```

查看 npm 帮助命令：

```bash
npm --help
```

查看指定命令的帮助：

```bash
npm [指定命令] --help
```

更新指定的包：

```bash
npm update [package]
```

卸载指定的包：

```bash
npm uninstall [package]
```

查看配置信息：

```bash
npm config list
```

查看本地安装的指定包的信息，没有则显示 empty：

```bash
npm ls [package]
```

查看全局安装的指定包的信息，没有则显示 empty：

```bash
npm ls [package] -g
```

查看远程 npm 上指定包的所有版本信息：

```bash
npm info [package] versions
```

查看当前包的安装路径：

```bash
npm root
```

查看全局包的安装路径：

```bash
npm root -g
```

## 3.配置 npm 镜像源

由于 npm 默认的下载地址在国外（npmjs.com），有时候会被墙，导致无法下载或者下载很慢。因此，我们可以尝试切换成，从其他的镜像源下载 npm 包。

切换镜像源，有下面这几种方式：

- 方式 1：临时切换镜像源。
- 方式 2：切换镜像源
- 方式 3：通过 NRM 切换镜像源（最为推荐的方式）。
- 方式 4：cnpm。

### 3.1 方式 1：临时切换镜像源

安装指定包的时候，通过追加 `--registry`参数即可。格式如下：

```bash
# 格式
npm install [package] --registry [https://xxx]

# 举例：在下载安装 express 这个包的时候，临时指定镜像源为 https://registry.npm.taobao.org
npm install express --registry https://registry.npmmirror.com/
```

### 3.2 方式 2：切换镜像源

```bash
npm config set registry https://registry.npmmirror.com/
```

执行上述命令后，以后下载所有 npm 包的时候，都会改为使用淘宝的镜像源。

### 3.3 方式 3：通过 NRM 切换镜像源（推荐）

**NRM**：Node Registry Manager。作用是：**切换和管理 npm 包的镜像源**。

- 项目地址：https://www.npmjs.com/package/nrm
- GitHub 地址： https://github.com/Pana/nrm

**安装 NRM**：

```bash
npm install -g nrm
```

> 执行命令`nrm ls`查看可选的源。

```bash
npm ---------- https://registry.npmjs.org/
yarn --------- https://registry.yarnpkg.com/
tencent ------ https://mirrors.cloud.tencent.com/npm/
cnpm --------- https://r.cnpmjs.org/
taobao ------- https://registry.npmmirror.com/
npmMirror ---- https://skimdb.npmjs.com/registry/
```

1. 切换

如果要切换到`taobao`源，执行命令 `nrm use taobao`。

2. 增加

你可以增加定制的源，特别适用于添加企业内部的私有源，执行命令 `nrm add <registry> <url>`，其中`reigstry`为源名，`url`为源的路径。

```bash
nrm add registry http://registry.npm.frp.trmap.cn/
```

3. 删除

执行命令`nrm del <registry>`删除对应的源。

4. 测试速度

你还可以通过 `nrm test` 测试相应源的响应时间。

```bash
nrm test npm  
```

### 3.4 方式 4：安装 cnpm

- 项目地址：[npmmirror 中国镜像站](https://npmmirror.com/)

安装`cnpm`替换 npm（npm 由于源服务器在国外，下载包的速度较慢，cnpm 会使用国内镜像）：

```bash
$ npm install -g cnpm --registry=https://registry.npmmirror.com
```

以后我们就可以通过 cnpm 命令去安装一个包。举例如下：

```bash
# 安装 vue 这个包
cnpm install vue
```

这里的单词 `install` 可以简写成 `i`。

## 4.什么是 npm 脚本

> npm 允许在`package.json`文件里面，使用`scripts`字段定义脚本命令。`package.json` 里面的`scripts` 字段是一个对象。它的每一个属性，对应一段脚本。定义在`package.json`里面的脚本，就称为 `npm` 脚本。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的`npm run`命令。

### 4.1 使用

- `npm run` 脚本名称
- 如果是并行执行（即同时的平行执行），可以使用&符号。 `npm run script1.js & npm run script2.js`
- 如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。`npm run script1.js && npm run script2.js`

### 4.2 简写形式

- `npm start` 即 `npm run start`
- `npm stop` 即 `npm run stop`
- `npm test` 即 `npm run test`
- `npm restart` 即 `npm run stop && npm run restart && npm run start`

## 5.pnpm

### 5.1 pnpm 是什么

> pnpm是 Node.js 的替代包管理器。它是 npm 的直接替代品，但速度更快、效率更高。

> 为什么效率更高？当您安装软件包时，我们会将其保存在您机器上的全局存储中，然后我们会从中创建一个硬链接，而不是进行复制。对于模块的每个版本，磁盘上只保留一个副本。例如，当使用 npm 或 yarn 时，如果您有 100 个使用 lodash 的包，则磁盘上将有 100 个 lodash 副本。pnpm 可让您节省数 GB 的磁盘空间！

pnpm优势
pnpm 拥有 Yarn 超过 npm 的所有附加功能：

- **安全**: 与 yarn 一样，pnpm 有一个包含所有已安装包校验和的特殊文件，用于在执行代码之前验证每个已安装包的完整性。
- **离线模式**: pnpm 将所有下载的包 tarball 保存在本地注册表镜像中。当包在本地可用时，它从不发出请求。使用该--offline参数可以完全禁止 HTTP 请求。
- **速度**: pnpm 不仅比 npm 快，而且比 yarn 快。无论是冷缓存还是热缓存，它都比 yarn 快。yarn 从缓存中复制文件，而 pnpm 只是从全局存储中链接它们。

### 5.2 pnpm 的使用

**官网**： `https://pnpm.js.org/installation/`

**全局安装**

```bash
npm install pnpm -g
```

**设置源**

```bash
//查看源
pnpm config get registry 
//切换淘宝源
pnpm config set registry https://registry.npmmirror.com/
```

**使用**

```bash
//可以和npm一样使用方式

pnpm init //直接初始化
pnpm install 包  // 
pnpm i 包
pnpm add 包    // -S  默认写入dependencies
pnpm add -D    // -D devDependencies
pnpm add -g    // 全局安装
```

**移除**

```bash
pnpm remove(uninstall) 包                            //移除包
pnpm remove 包 --global                   //移除全局包
```

**更新**

```bash
pnpm up                //更新所有依赖项
pnpm upgrade 包        //更新包
pnpm upgrade 包 --global   //更新全局包
pnpm up --latest //最新更新所有依赖项，忽略package.json中指定的范围
```

## 6.npm命令总结

```bash
1.npm init -y 添加初始化文件记录安装信息，如果在后面加-S或者-D会自动创建该文件

2.npm install 包名 –g  （uninstall,update）

3.npm install 包名 --save（-S） --dev(-D)  (uninstall,update)
如果不写后缀默认是安装到生产环境
如果先装到了开发环境，那么后面覆盖安装不写后缀也是本身的环境下
一个包只能存在在一种环境，得先卸载才能换环境

4.npm list -g (不加-g，列举当前目录下的安装包)

5.npm info 包名（详细信息） npm info 包名 version (获取最新版本)

6.npm install md5@1.8.0（安装指定版本）

7.npm outdated(检查包是否已经过时)
如果版本比较新就不会有输出

8.pwd输出当前目录的绝对路径

9.npm view 包名 version查看当前版本   npm view 包名 versions查看该包所有版本

10.npm update 包名 更新指定包 npm update 更新所有的包（pnpm up）

11.npm config list  查看npm配置信息

12.npm 指定命令 --help 查看指定命令的帮助。

13.npm root：查看当前包的安装路径。  npm root -g：查看全局的包的安装路径。

14.npm ls 包名：查看本地安装的指定包及版本信息，没有显示empty。 npm ls 包名 -g：查看全局安装的指定包及版本信息

15.npm cache clean --force 清除缓存

16.npm -v查看npm的版本


"dependencies": {    "md5": "^2.1.0"  }  ^ 表示 如果 直接npm install 将会 安md5@2.*.*  	最新版本

"dependencies": {    "md5": "~2.1.0"  }  ~ 表示 如果 直接npm install 将会 安装md5 2.1.*  最新版本

"dependencies": {    "md5": "*"  }  * 表示 如果 直接npm install 将会 安装 md5  最新版本
```

## 7.使用 nodemon 自动重启服务

我们在开发的过程中，每次改完代码之后都必须重启服务器，显然这样的操作效率是比较低，这里给大家推荐个工具，`nodemon`,`nodemon`可以帮我们实时监听项目中代码的变化，并且自动重启服务，而且配置简单。

1. 安装：`npm install -g nodemon`

   > 如果无法使用nodemon，那么要去环境变量中进行配置

2. 使用`nodemon`运行项目，取代之前的`node app.js`。

```
nodemon  app.js
```

项目运行之后，`nodemon`会自动监听代码的改动，并且重新启动服务，大大增加我们开发效率。

3. `nodemon`常见配置

- 在命令行指定应用的端口号：`nodemon ./server.js localhost 8080`
- 查看帮助，帮助里面有很多选项都是一目了然：`nodemon -h 或者 nodemon --help`
- 运行 debug 模式：`nodemon --debug ./server.js 80`
- 手动重启项目： `Nodemon` 命令运行的终端 窗口中输入 `rs` 两个字符，然后再按下回车键，就能手动重启 `Nodemon`了。
