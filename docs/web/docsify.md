---
article: false
title: docsify
icon: edit
order: 2
---

[docsify](https://docsify.js.org/#/zh-cn/) 是一个神奇的文档网站生成器，可以快速帮你将 .md 文档生成为网站。docsify 入门简单且无需服务器，非常适合个人笔记的简单整理分享。

本页集中了我使用 docsify 中遇到的问题，新手先看 [docsify 入门文档](https://docsify.js.org/#/zh-cn/)。

## 插件

[docsify 插件列表](https://github.com/docsifyjs/awesome-docsify#plugins)：

- [x] [docsify 笔记类参考](https://notebook.js.org/#/README)：看板娘，多级页面，页面点击效果，网站运行时间。
- [x] [docsify-count](https://github.com/827652549/docsify-count)：docsify 的字数和阅读时长插件。
- [x] [docsify-waline](https://github.com/cxcn/docsify-waline/blob/main/README.zh-CN.md)：提供评论功能的同时，借用 docsify-count 接口展示阅读量。暂时停止 1300 宽度的 waline 显示，避免页面显示异常。
- [x] [docsify-toc](https://github.com/mrpotatoes/docsify-toc)：给笔记页内部添加目录。不过本插件与 gitalk、waline 冲突，页面宽于 1300px 时出现 toc 目录，评论区位置也跟着挤到页面顶部，需手动修改。参考链接：[Tainacan Wiki](https://tainacan.github.io/tainacan-wiki/#/general-concepts)，[Sureness](https://github.com/dromara/sureness/blob/master/docs/index.html)，[lifeupapp](https://wiki.lifeupapp.fun/zh-cn/#/features/174)。
- [x] [docsify-pdf-converter](https://github.com/meff34/docsify-to-pdf-converter)：将 docsify 转为 pdf，不带书签目录。
  - `illegal operation on a directory` 报错：sidebar 中不要使用简写地址，将 `main/` 改为 `main/README.md`，否则将读取到目录而报错。
  - `'node_modules' 不是内部或外部命令` 报错：将 package.json 的设置修改为 `"convert": "node_modules\\.bin\\docsify-pdf-converter"`。这问题多发生在 Windows，是由 Windows 与 Linux 路径规则不同而引起的。

## 配置

### docsify emoji

[emoji 插件](https://docsify.js.org/#/zh-cn/plugins?id=emoji)在标题中使用容易出错，建议使用 `&#58;`。例如，原本是 `:100:`，替换为 `&#58;100:`。

实际使用中，我直接复制 emoji，都能正常显示。

## 本地命令

[docsify 本地命令](https://github.com/docsifyjs/docsify-cli):

`<path>` 默认为当前路径，可使用子文件夹指定路径，如 `./docs` 或 `docs`。

`[]` 为可省略命令区，无实际作用，输出时需要去除。

### Serve 启动

若要在电脑上查看 docsify 页面，可执行 serve 架构命令，在本地主机上运行服务。默认本地端口为 3000，可以指定端口。

```shell
docsify serve <path> [--open false] [--port 3000]
```

使用时不要关闭命令终端，否则 serve 也会停止。

### 生成侧边栏

```shell
docsify generate <path> [--sidebar _sidebar.md]
```

generate 命令会遍历指定目录及其子目录的所有 markdown 文件，并生成全路径的 \_sidebar.md。`<path>` 不能省略，需指定子文件夹路径。

如果路径中存在 \_sidebar.md，则会报错。

## 常见问题

### 引用路径

docsify 引用内部文件时，路径会自带添加域名。

例如：指向子文档时，链接是 `子文件夹/文档名.md`；指向子文档的小标题时，链接是 `子文件夹/文档名？id=小标题`。

### 页面未同步更新

> CDN 默认是有缓存的，如果文件更新，访问的可能不是最新的文件。
>
> 我设置了 routerMode 为 history，使用 CDN 访问非首页，再次刷新会找不到文件。
>
> 如果开启了 `relativePath: true`，文件可以找到，但是侧栏上边的标题点击又有点问题。

### GitHub Pages 报错

如果 SSL 链接 404 报错，显示「There isn't a GitHub Pages site here」，则目录中加入 `CNAME` 文件。
