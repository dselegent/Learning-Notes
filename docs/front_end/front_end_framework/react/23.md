# 23 【UmiJS入门】

## 1.Umi 介绍

![Umi](https://img.alicdn.com/imgextra/i3/O1CN01eBiy611b67KLFOxi3_!!6000000003415-2-tps-200-200.png)

### 1.1 Umi 是什么？

Umi，中文发音为「乌米」，是可扩展的企业级前端应用框架。Umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。然后配以生命周期完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。

Umi 有很多非常有意思的特性，比如。

1、**企业级**，在安全性、稳定性、最佳实践、约束能力方面会考虑更多
2、**插件化**，啥都能改，Umi 本身也是由插件构成
3、**MFSU**，比 Vite 还快的 Webpack 打包方案
4、基于 React Router 6 的完备路由
5、默认最快的请求
6、SSR & SSG
7、稳定白盒性能好的 ESLint 和 Jest
8、React 18 的框架级接入
9、Monorepo 最佳实践
...

### 1.2 什么时候不用 Umi？

如果你的项目，

1、需要支持 IE 8 或更低版本的浏览器
2、需要支持 React 16.8.0 以下的 React
3、需要跑在 Node 14 以下的环境中
4、有很强的 webpack 自定义需求和主观意愿
5、需要选择不同的路由方案
...

Umi 可能不适合你。

### 1.3 为什么不是？

1. `create-react-app`

   create-react-app 是脚手架，和 Umi、next.js、remix、ice、modern.js 等元框架不是同一类型。脚手架可以让我们快速启动项目，对于单一的项目够用，但对于团队而言却不够。因为使用脚手架像泼出去的水，一旦启动，无法迭代。同时脚手架所能做的封装和抽象都非常有限。

2. `next.js`

   如果要做 SSR，next.js 是非常好的选择（当然，Umi 也支持 SSR）；而如果只做 CSR，Umi 会是更好的选择。相比之下，Umi 的扩展性会更好；并且 Umi 做了很多更贴地气的功能，比如配置式路由、补丁方案、antd 的接入、微前端、国际化、权限等；同时 Umi 会更稳定，因为他锁了能锁的全部依赖，定期主动更新，某一个子版本的 Umi，不会因为重装依赖之后而跑不起来。

3. `remix`

   Remix 是我非常喜欢的框架，Umi 4 从中~~抄~~（学）了不少东西。但 Remix 是 Server 框架，其内置的 loader 和 action 都是跑在 server 端的，所以会对部署环境会有一定要求。Umi 将 loader、action 以及 remix 的请求机制同时运用到 client 和 server 侧，不仅 server 请求快，纯 CSR 的项目请求也可达到理论的最快值。同时 Remix 基于 esbuild 做打包，可能不适用于对兼容性有要求或者依赖尺寸特别大的项目。

### 1.4 插件和插件集

Umi 通过提供插件和插件集的机制来满足不同场景和业务的需求。插件是为了扩展一个功能，而插件集是为了扩展一类业务。比如要支持 vue，我们可以有 `@umijs/preset-vue`，包含 vue 相关的构建和运行时；比如要支持 h5 的应用类型，可以有 `@umijs/preset-h5`，把 h5 相关的功能集合到一起。

如果要类比，插件集和 babel 的 preset，以及 eslint 的 config 都类似。

### 1.5 import all from umi

很多人可能都第一次听到。import all from umi 意思是所有 import 都来自 `umi`。比如 dva 不是 `import { connect } from 'dva'`，而是 `import { connect } from 'umi'`，从 umi 中导出。导出的方法不仅来自 umi 自身，还来自 umi 插件。

这是两年前 Umi 3 加的功能，最近发现 Remix、prisma、vitekit 等框架和工具都有类似实现。

```ts
// 大量插件为 umi 提供额外导出内容
import { connect, useModel, useIntl, useRequest, MicroApp, ... } from 'umi';
```

这带来的好处是。通过 Umi 将大量依赖管理起来，用户无需手动安装；同时开发者在代码中也会少很多 import 语句。

## 2.快速上手

### 2.1 环境准备

首先得有 node，并确保 node 版本是 14 或以上。（推荐用 [nvm](https://github.com/nvm-sh/nvm) 来管理 node 版本，windows 下推荐用 [nvm-windows](https://github.com/coreybutler/nvm-windows)）

然后需要包管理工具。node 默认包含 npm，但也可以选择其他方案，

- [pnpm](https://pnpm.io/installation), umi 团队推荐
- [Yarn](https://yarnpkg.com/getting-started/install)

### 2.2 创建项目

先找个地方建个空目录。

```bash
mkdir myapp && cd myapp
```

通过官方工具创建项目，

```bash
pnpm dlx create-umi@latest
✔ Install the following package: create-umi? (Y/n) · true
✔ Pick Npm Client › pnpm
✔ Pick Npm Registry › taobao
Write: .gitignore
Write: .npmrc
Write: .umirc.ts
Copy:  layouts/index.tsx
Write: package.json
Copy:  pages/index.tsx
Copy:  pages/users.tsx
Copy:  pages/users/foo.tsx
> @ postinstall /private/tmp/sorrycc-vylwuW
> umi setup
info  - generate files
```

也可以使用yarn和npm

```bash
$ npx create-umi@latest
$ yarn create umi
```

国内建议选 **pnpm + taobao 源**，速度提升明显。这一步会自动安装依赖，同时安装成功后会自动执行 `umi setup` 做一些文件预处理等工作。

选择后会自动生成一个最基本的 Umi 项目，并根据选中的客户端和镜像源安装依赖：

```bash
.
├── package.json
├── pnpm-lock.yaml
├── src
│   ├── assets
│   │   └── yay.jpg
│   ├── layouts
│   │   ├── index.less
│   │   └── index.tsx
│   └── pages
│       ├── docs.tsx
│       └── index.tsx
├── tsconfig.json
└── typings.d.ts
```

这样就一键完成 Umi 项目的初始化了。

### 2.3 参数选项

使用 `create-umi` 创建项目时，可用的参数如下：

| option         | description                |
| -------------- | -------------------------- |
| `--no-git`     | 创建项目，但不初始化 Git   |
| `--no-install` | 创建项目，但不自动安装依赖 |

## 3.运行时配置

运行时配置和配置的区别是他跑在浏览器端，基于此，我们可以在这里写函数、tsx、import 浏览器端依赖等等，注意不要引入 node 依赖。

### 3.1 配置方式

约定 `src/app.tsx` 为运行时配置。

### 3.2 配置

Umi 在 `.umirc.ts` 或 `config/config.ts` 中配置项目和插件，支持 es6。一份常见的配置如下，

```bash
export default {
  base: '/docs/',
  publicPath: '/public/',
  hash: true,
  history: {
    type: 'hash',
  },
}
```

### 3.3 配置文件

如果项目的配置不复杂，推荐在 `.umirc.ts` 中写配置； 如果项目的配置比较复杂，可以将配置写在 `config/config.ts` 中，并把配置的一部分拆分出去，比如路由配置可以拆分成单独的 `routes.ts`：

```typescript
// config/routes.ts

export default [
    { exact: true, path: '/', component: 'index' },
];
```

```ts
// config/config.ts

import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  routes: routes,
});
```

推荐两种配置方式二选一，`.umirc.ts` 优先级更高。

### 3.4 TypeScript 提示

如果你想在写配置时也有提示，可以通过 umi 的 `defineConfig` 方法定义配置，

```js
import { defineApp } from 'umi';
export default defineApp({
  layout: () => {
    return {
      title: 'umi',
    };
  },
});
 
// or
import { RuntimeConfig } from 'umi';
export const layout: RuntimeConfig['layout'] = () => {
  return {
    title: 'umi',
  };
};
```

### 3.5 本地临时配置

可以新建 `.umirc.local.ts`，这份配置会和 `.umirc.ts` 做 deep merge 后形成最终配置。

> 注：`.umirc.local.ts` 仅在 `umi dev` 时有效。`umi build` 时不会被加载。

比如，

```js
// .umirc.ts 或者 config/config.ts
export default { a: 1, b: 2 };

// .umirc.local.ts 或者 config/config.local.ts
export default { c: 'local' };
```

拿到的配置是：

```js
{
  a: 1,
  b: 2,
  c: 'local',
}
```

注意：

- `config/config.ts` 对应的是 `config/config.local.ts`
- `.local.ts` 是本地验证使用的临时配置，请将其添加到 `.gitignore`，**务必不要提交到 git 仓库中**
- `.local.ts` 配置的优先级最高，比 `UMI_ENV` 指定的配置更高

## 4.目录结构

这里罗列了 Umi 项目中约定(或推荐)的目录结构，在项目开发中，请遵照这个目录结构组织代码。

```bash
.
├── config
│   └── config.ts
├── dist
├── mock
│   └── app.ts｜tsx
├── src
│   ├── .umi
│   ├── .umi-production
│   ├── app.ts
│   ├── layouts
│   │   ├── BasicLayout.tsx
│   │   ├── index.less
│   ├── models
│   │   ├── global.ts
│   │   └── index.ts
│   ├── pages
│   │   ├── index.less
│   │   └── index.tsx
│   ├── utils // 推荐目录
│   │   └── index.ts
│   ├── services // 推荐目录
│   │   └── api.ts
│   ├── global.ts
│   ├── global.(css|less|sass|scss)
│   ├── overrides.(css|less|sass|scss)
│   ├── favicon.(ico|gif|png|jpg|jpeg|svg|avif|webp)
│   └── loading.tsx
├── node_modules
│   └── .cache
│       ├── bundler-webpack
│       ├── mfsu
│       └── mfsu-deps
├── .env
├── plugin.ts 
├── .umirc.ts // 与 config/config 文件 2 选一
├── package.json
├── tsconfig.json
└── typings.d.ts
```

### 4.1 package.json

包含插件和插件集，以 `@umijs/preset-`、`@umijs/plugin-`、`umi-preset-` 和 `umi-plugin-` 开头的依赖会被自动注册为插件或插件集。

### 4.2 .env

环境变量，比如：

```
PORT=8888
COMPRESS=none
```

### 4.3 .umirc.ts

> 与 `config/config.ts` 文件功能相同，2 选 1 。`.umirc.ts` 文件优先级较高

配置文件，包含 Umi 内置功能和插件的配置。

配置文件的优先级见：[UMI_ENV](https://umijs.org/docs/guides/env-variables#umi_env)

### 4.4 config/config.ts

> 与 `.umirc.ts` 文件功能相同，2 选 1 。`.umirc.ts` 文件优先级较高

配置文件，包含 Umi 内置功能和插件的配置。

### 4.5 dist 目录

执行 `umi build` 后，产物默认会存放在这里。可通过配置修改产物输出路径。

### 4.6 mock 目录

存储 mock 文件，此目录下所有 `js` 和 `ts` 文件会被解析为 mock 文件。用于本地的模拟数据服务。

### 4.7 public 目录

此目录下所有文件会被 copy 到输出路径。

### 4.8 `src` 目录

#### 4.8.1 .umi 目录

dev 时的临时文件目录，比如入口文件、路由等，都会被临时生成到这里。**不要提交 .umi 目录到 git 仓库，他们会在 `umi dev` 时被删除并重新生成。**

#### 4.8.2 .umi-production 目录

build 时的临时文件目录，比如入口文件、路由等，都会被临时生成到这里。**不要提交 .umi-production 目录到 git 仓库，他们会在 `umi build` 时被删除并重新生成。**

#### 4.8.3 app.[ts｜tsx]

运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等。运行时配置是跑在浏览器端，因此我们可以在这里写函数、jsx 语法，import 浏览器端依赖等等。

#### 4.8.4 layouts/index.tsx

约定式路由时的全局布局文件，实际上是在路由外面套了一层。比如，你的路由是：

```js
[
  { path: '/', component: './pages/index' },
  { path: '/users', component: './pages/users' },
]
```

从组件角度可以简单的理解为如下关系：

```jsx
<layout>
  <page>1</page>
  <page>2</page>
</layout>
```

#### 4.8.5 pages 目录

所有路由组件存放在这里。使用约定式路由时，约定 `pages` 下所有的 `(j|t)sx?` 文件即路由。使用约定式路由，意味着不需要维护可怕的路由配置文件。最常用的有基础路由和动态路由（用于详情页等，需要从 url 取参数的情况）

**1.基础路由**

假设 `pages` 目录结构如下：

```diff
+ pages/
  + users/
    - index.js
  - index.js
```

那么，会自动生成路由配置如下：

```js
[
  { path: '/', component: './pages/index.js' },
  { path: '/users/', component: './pages/users/index.js' },
];
```

**2.动态路由**

约定，带 `$` 前缀的目录或文件为动态路由。若 `$` 后不指定参数名，则代表 `*` 通配，比如以下目录结构：

```diff
+ pages/
  + foo/
    - $slug.js
  + $bar/
    - $.js
  - index.js
```

会生成路由配置如下：

```js
[
  { path: '/', component: './pages/index.js' },
  { path: '/foo/:slug', component: './pages/foo/$slug.js' },
  { path: '/:bar/*', component: './pages/$bar/$.js' },
];
```

**3../src/pages/404.js**

当访问的路由地址不存在时，会自动显示 404 页面。只有 build 之后生效。调试的时候可以访问 `/404` 。

#### 4.8.6 global.(j|t)sx?

在入口文件最前面被自动引入，可以考虑在此加入 polyfill。Umi 区别于其他前端框架，没有显式的程序主入口，如 `src/index.js`，所以在引用某些模块的时候，如果模块功能要求在程序主入口添加代码时，你就可以写到这个文件。

#### 4.8.7 global.(css|less|sass|scss)

这个文件不走 css modules，自动被引入，可以写一些全局样式，它的引入位置很靠前，所以优先级相对较低；如果想覆盖三方依赖样式，推荐使用 `overrides.(css|less|sass|scss)`。

#### 4.8.8 overrides.(css|less|sass|scss)

这个文件不走 css modules，自动被引入，专用于覆盖三方依赖的样式；该文件中所有的 CSS 选择器都会被自动加上 `body` 前缀以确保优先级始终高于原有选择器，这样一来在页面切换时有异步 chunk 动态插入的情况下样式覆盖也能生效。

#### 4.8.9 loading.(tsx|jsx)

定义懒加载过程中要显示的加载动画。Umi 4 默认按页拆包，所以这近似等价于 Umi 3 中的 `dynamicImport.loading` 选项。

### 4.8.10 plugin.ts

存在这个文件，会被当前项目加载为 Umi 插件，你可以在这里实现一些插件级的功能。

```ts
import type { IApi } from 'umi';
 
export default (api: IApi) => {
  api.onDevCompileDone((opts) => {
    opts;
    // console.log('> onDevCompileDone', opts.isFirstCompile);
  });
  api.onBuildComplete((opts) => {
    opts;
    // console.log('> onBuildComplete', opts.isFirstCompile);
  });
  api.chainWebpack((memo) => {
    memo;
  });
};
```

### 4.8.11 favicon

约定如果存在 `src/favicon.(ico|gif|png|jpg|jpeg|svg|avif|webp)` 文件，将会使用它作为构建网页的 `shortcut icon`，如存在 `src/favicon.png` 则构建时会生成：

```html
<link rel="shortcut icon" href="/favicon.png">
```

支持多种文件后缀，按以下优先级匹配：

```js
const FAVICON_FILES = [
  'favicon.ico',
  'favicon.gif',
  'favicon.png',
  'favicon.jpg',
  'favicon.jpeg',
  'favicon.svg',
  'favicon.avif',
  'favicon.webp',
];
```

如果约定方式不满足你的需求，可以使用 [favicons](https://umijs.org/docs/api/config#favicons) 配置。

> 配置优先级会大于约定