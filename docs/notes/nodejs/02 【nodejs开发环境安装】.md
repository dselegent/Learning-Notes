# 02 【nodejs开发环境安装】

## 1.版本介绍

- 在命令窗口中输入 node -v 可以查看版本
- 0.x 完全不技术 ES6
- 4.x 部分支持 ES6 特性
- 5.x 部分支持ES6特性（比4.x多些），属于过渡产品，现在来说应该没有什么理由去用这个了
- 6.x 支持98%的 ES6 特性
- 8.x 支持 ES6 特性

## 2.Node.js 运行环境配置：通过 Node.js 安装包（不推荐）

去 Node.js 的[官网](https://nodejs.org/en/)下载安装包：

![image-20221102141924455](https://i0.hdslb.com/bfs/album/baa4a48fa8ff1f6e0c463671d144ae9c1111e60c.png)

我们也可以在https://nodejs.org/en/download/releases/ 里下载历史版本。

![image-20221102142121523](https://i0.hdslb.com/bfs/album/ae6cded001336936a7580bbdff40d77214b0799c.png)

后续如果需要安装其他版本，可以这样做：重新下载最新的安装包，覆盖安装即可。

但我们并不推荐直接采用 Node.js.msi（windows）或者 Node.js.pkg（Mac） 安装包进行安装，因为会产生如下问题。

**通过 Node.js 安装包产生的问题**：

- 安装新版本时，需要覆盖就版本；而且以前版本安装的很多全局工具包，需要重新安装。
- 无法回滚到之前的旧版本。
- 无法在多个版本之间切换（很多时候，不同的项目需要使用特定版本。或者，我想临时尝鲜一下新版本的特性）

因此，我们暂时先不用安装 Node.js，稍后用 NVM 的方式来安装 Node.js。通过 NVM 的方式，可以让多个版本的 Node.js 共存，并灵活切换。

> ### Node.js 版本常识
>
> - 偶数版本为稳定版（0.6.x ，0.8.x ，8.10.x）
> - 奇数版本为非稳定版（0.7.x ，0.9.x ，9.11.x）
> - LTS（Long Term Support）
>
> 参考链接：[node.js 中 LTS 和 Current 的区别](https://blog.csdn.net/u012532033/article/details/73332099)

## 3.Node.js 运行环境安装：通过 NVM（推荐）

**[NVM](https://github.com/nvm-sh/nvm)**：node.js version manager，用来管理 node 的版本。

**我们可以先安装 NVM，然后通过 NVM 安装 Node.js**。这是官方推荐的做法。

Windows 安装的 Node.js 的步骤如下。

### 3.1 安装 NVM：

（1）我们去 https://github.com/coreybutler/nvm-windows/releases 下载 NVM 的安装包：

![image-20221102142420968](https://i0.hdslb.com/bfs/album/57f120a95801261ccefa395f7ed3f766fadb5332.png)

下载下来后，直接解压到 `D:\web`目录下：

![image-20221102143322915](https://i0.hdslb.com/bfs/album/9052989c7c1c99956b5ed5caafa46964867d0733.png)

（2）在上面的目录中，新建一个`settings.txt`文件，里面的内容填充如下：

```sh
root: D:\web\nvm
path: D:\web\nodejs
arch: 64
proxy
```

上方内容的解释：

- root 配置为：当前 nvm.exe 所在的目录
- path 配置为：node 快捷方式所在的目录
- arch 配置为：当前操作系统的位数（32/64）
- proxy 不用配置

（3）配置环境变量：

- `NVM_HOME` = `D:\web\nvm`（当前 nvm.exe 所在目录）
- `NVM_SYMLINK` = `D:\web\nodejs` （node 快捷方式所在的目录）
- PATH += `;%NVM_HOME%;%NVM_SYMLINK%`

配置成功后，重启资源管理器。

### 3.2 验证

（1）输入`nvm`命令查看环境变量是否配置成功

（2）输入 `nvm ls`，查看已安装的所有 node 版本。

（3）输入 `nvm -v`，查看 已安装的 nvm 版本。

（4）输入 `node -v`，查看正在使用的 node 版本。

如果 Node 安装失败，可以参考上面这个链接。

### 3.3 安装指定版本的 Node.js

```shell
nvm install 版本号

# 举例
nvm install 8.10.0
```

输入 `node -v`，查看当前使用的 node 版本。

关于 NVM 的常用命令，详见下一段。

补充：

如果 Node 安装失败，可以在上方的 `settings.txt`文件中，新增如下两行，修改镜像源：

```text
node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://npmmirror.com/mirrors/npm/
```

- 参考链接：[安装 npm，nvm，node](https://segmentfault.com/a/1190000011114680)

## 4.NVM 的常用命令

> 注意，这一段说的是 NVM 的常用命令，不是 Node 的常用命令。

查看当前使用的 nvm 版本：

```bash
nvm --version
```

查看本地安装的所有的 Node.js 版本：

```bash
# 方式1
nvm ls

# 方式2
nvm list
```

**安装指定版本的 Node.js：**

```bash
nvm install 版本号

# 举例
nvm install 8.10.0
```

卸载指定版本 Node.js：

```bash
nvm uninstall 版本号
```

**切换使用指定版本的 node**：

```bash
nvm use 版本号
```

**设置node的默认版本**：

```bash
nvm alias default 版本号
```

**查看全局npm包的安装路径**：

```text
npm root -g
```

查看远程服务器端的所有 Node 版本：

```bash
nvm ls-remote
```

执行上面的命令后，在列出的版本清单中，凡是用 `Latest LTS`标注的版本，则表明是**长期维护**的版本。我们在安装时，建议安装这些版本。当然，我们也可以在网址 https://nodejs.org/en/download/releases/ 查看 LTS 的历史版本。

## 5.Node.js 的常用命令

查看 node 的版本：

```bash
$ node -v
```

执行脚本字符串：

```bash
$ node -e 'console.log("Hello World")'
```

运行脚本文件：

```bash
$ node index.js

$ node path/index.js

$ node path/index
```

查看帮助：

```bash
$ node --help
```