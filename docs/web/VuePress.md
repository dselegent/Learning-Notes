---
article: false
title: VuePress
icon: vue
order: 1
---

[VuePress](https://v2.vuepress.vuejs.org/zh/guide/getting-started.html) 是一个以 Markdown 为中心的静态网站生成器。你可以使用 Markdown 来书写内容（如文档、博客等），然后 VuePress 会帮助你生成一个静态网站来展示它们。如果你已经有了 docsify/Hexo 等 Markdown 架构网站，简单就能切换到 VuePress。

不过，VuePress 网站需要依赖包环境，生成的静态文件在本地运行会缺少组件，需要服务器或其他云服务上运行。如果本地部署中出现未知 bug，推荐使用 [StackBlitz](https://stackblitz.com/) 在线 IDE 工具测试，打开 `https://stackblitz.com/github/用户名/仓库名` 即可将对应 GitHub 仓库导入 StackBlitz。开发时，建议用 dev 命令测试，这样可以查看打包前的动态代码，发现组件间的内部链接。

LearnData 的主题为 [vuepress-theme-hope](https://theme-hope.vuejs.press/zh/guide/)，图标为 [Iconfont 精选图标](https://theme-hope.vuejs.press/zh/guide/interface/icon.html#iconfont-%E7%B2%BE%E9%80%89%E5%9B%BE%E6%A0%87)，页面修改查看 [样式配置](https://theme-hope.vuejs.press/zh/config/style.html)，其他主题和插件参考 [Awesome VuePress V2](https://github.com/vuepress/awesome-vuepress/blob/main/v2.md) 和 [看板娘](https://www.npmjs.com/package/vuepress-plugin-helper-live2d)。

## 初始配置

1. 环境配置：安装 pnpm，也支持 npm 和 yarn，可参考[环境部署教程](../deploy/VPS.html#环境部署)。
2. 新建文件夹，然后在该路径下运行命令 `pnpm create vuepress-theme-hope@next docs`。vuepress-theme-hope 主题的样例文件会存储在该路径下。有时因版本问题，样例运行会报错，此时须用固定版本号来安装依赖环境，终端中输入 `pnpm add vuepress@2.0.0-beta.60 @vuepress/client@2.0.0-beta.60 vuepress-theme-hope@2.0.0-beta.155 && pnpm docs:dev`。
3. 执行命令 `pnpm docs:dev` 启动样例网站。
4. `docs\.vuepress` 路径下的 config.ts，navbar.ts，sidebar.ts，theme.ts 可以修改页面属性，设置方法参考 [官方案例](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/docs/theme/src/.vuepress)。
   - config.ts：配置网站环境依赖和网站属性。
   - sidebar.ts：侧边栏，集合所有文档的目录。
   - navbar.ts：导航栏，放最常用的文档链接。
   - theme.ts：对主题和插件进行设置。
5. 如果遇到报错，执行命令 `pnpm add vuepress@next vuepress-theme-hope@next && pnpm i && pnpm up` 修复并升级相关依赖包。如果依然有问题，则删除 node_modules 和 lock 文件，执行 `npm install && pnpm i && pnpm up` 重置依赖包文件。

如果遇到错误 `[ERR_MODULE_NOT_FOUND]: Cannot find package`，则将 package.json 放在 demo project 中生成 lock 文件，比对 lock 文件是否为正确生成依赖树，将正确的 lock 文件复制到项目下。

每个插件和主题版本只支持一个 VuePress 版本，因此要稳定的话，需用固定版本号的环境依赖才可以，比如主题 `vuepress-theme-hope@2.0.0-beta.155` 仅支持 `vuepress@2.0.0-beta.60`。如果要测试最新的环境配置，可使用 `pnpm add vuepress@next vuepress-theme-hope@next @vuepress/plugin-google-analytics@next @vuepress/plugin-search@next @vuepress/plugin-docsearch@next && pnpm i && pnpm up`。

## 搜索插件

本地搜索插件：[search](https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html) 根据你的页面，在本地生成搜索索引，然后在用户访问站点时加载搜索索引文件。默认情况下，该插件会将页面标题和小标题作为搜索索引。

在线搜索插件：[algolia DocSearch](https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html) 使用在线爬虫抓取全站，并提供网站搜索索引，抓取周期为一周。开源文档可以申请官方爬虫支持，商业化内容需要自己设置爬虫。

在 [algolia 爬虫管理页](https://crawler.algolia.com/admin/crawlers/bd9cfb06-0346-4a64-9a1a-8a513f0b7fce/overview) 修改爬虫抓取规则，然后手动触发爬虫进行全站搜索。之后，[algolia 搜索数据库](https://www.algolia.com/apps/M4EXXEZIEG/dashboard) 可以查看搜索次数与数据。

## Webpack 打包

VuePress v2 默认使用 Vite，打包时会引入时间戳和 hash 对文件重命名，导致网站大部分的文件发生更改。即使你并没有更新文章，生成的静态文件也会改变。比如我的笔记网站用的 VuePress 默认配置，每次服务器部署需要 10 分钟，期间打开网站就会出错。可这是我知识记录的阵地，一天要最少更新 3 次。

如果不想每次架构都重命名文件，可以复制「[nohashname](https://github.com/rockbenben/LearnData/tree/nohashname)」branch。我把 nohashname 分支的打包工具换成了 [Webpack](https://v2.vuepress.vuejs.org/zh/guide/bundler.html)，并用 chainWebpack 设置文件命名规则，避免文件非必要重命名。

1. 修改 config.ts 的导入设置，将 `import { defineUserConfig } from "vuepress"` 替换为 `import { defineUserConfig } from "@vuepress/cli"`，将 `import { viteBundler } from "@vuepress/bundler-vite"` 替换为 `import { webpackBundler } from "@vuepress/bundler-webpack"`。

2. Webpack 环境依赖包安装，并运行服务。

   ```bash
   #组合命令，打包使用 Webpack
   pnpm add vuepress@next vuepress-theme-hope@next && pnpm remove vuepress && pnpm add vuepress-webpack@next sass-loader && pnpm i && pnpm up

   #运行在本地服务器
   yarn docs:dev
   ```

   组合命令也能**解决报错**，升级相关依赖包。相关命令的分步解释见下方。

   ```bash
   #确保你正在使用最新的 vuepress 和 vuepress-theme-hope 版本
   pnpm add vuepress@next vuepress-theme-hope@next

   #更换打包工具，Webpack 需手动下载 sass-loader
   pnpm remove vuepress
   pnpm add -D vuepress-webpack@next sass-loader

   #常用插件：google-analytics，search
   pnpm add @vuepress/plugin-google-analytics@next @vuepress/plugin-search@next

   #升级当前目录的依赖以确保你的项目只包含单个版本的相关包
   pnpm i && pnpm up
   ```

3. 修改文件命名规则：打开 config.ts，使用 [webpack-chain](https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans) 修改 webpack 输出文件名规则，停止对 js 文件 hashname。^[[chainWebpack 常用配置方式](https://blog.csdn.net/song854601134/article/details/121340077)] `.filename` 加路径容易报错，这里只把 chunk 文件放入子文件夹。

   ```ts
   export default defineUserConfig({
     bundler: webpackBundler({
       chainWebpack(config) {
         // do not use chunk hash in js
         //参照案例：https://github.com/vuepress/vuepress-plugin-named-chunks/blob/b9fb5a1d3475530b1d74b6616f92a6e3bf14a7ed/__tests__/docs/.vuepress/config.js
         config.output
           .filename(`[name].js`)
           .chunkFilename("assets/chunks/[name].js");
       },
     }),
   });
   ```

   在找到 chainWebpack 配置前，我依照 [vue.config.js](https://cli.vuejs.org/config/#vue-config-js) 添加了 `filenameHashing: false`，但 VuePress 并未停止 hashname。

## 关闭 prefetch

preload 是一种声明式的资源获取请求方式，用于提前加载一些需要的依赖，并且不会影响页面的 onload 事件。prefetch 是一种利用浏览器的空闲时间加载页面将来可能用到的资源的一种机制；通常可以用于加载非首页的其他页面所需要的资源，以便加快后续页面的首屏速度。preload 主要用于预加载当前页面需要的资源；而 prefetch 主要用于加载将来页面可能需要的资源。

VuePress [Build 配置项](https://vuepress.github.io/zh/reference/config.html#build-%E9%85%8D%E7%BD%AE%E9%A1%B9) 默认开启了 preload 和 prefetch。但是，开启了 prefetch，所有其它页面所需的文件都会被预拉取。页面较多或服务器宽带后付费的话，建议关闭 prefetch。

`docs\.vuepress` 路径下的 config.ts 配置中插入 `shouldPrefetch: false,`，即可关闭 prefetch。

## 页面模板

VuePress 页面生成规则基于主题模板，如果修改全站 html 内容，最简单的方式就是修改模板。

我的主题是 `@vuepress-theme-hope/templates/index.build.html`，将其下载到本地后，修改为你想要的样式，放入 .vuepress 文件夹内。最后在 config.ts 中添加代码，即可启用修改模板。

```ts
import { path } from "@vuepress/utils";
export default defineUserConfig({
  ...
  templateBuild: path.resolve(__dirname, "index.build.html"),
});
```

除修改页面模板外，也可以通过修改 config.ts 配置来添加自定义标签。插入下方代码后，网站所有页面都会在 header 前添入对应代码，其效用等同于 `<meta name="keywords" content="关键词，内容标签，相关词">` 和 `<img referrerpolicy="no-referrer-when-downgrade" src="https://tongji.newzone.top/matomo.php?idsite=7&amp;rec=1" style="border:0" alt="" />`。

```ts
head: [
  [
    "meta",
    {
      name: "keywords",
      content: "关键词，内容标签，相关词",
    },
  ],
  [
    "img",
    {
      referrerpolicy: "no-referrer-when-downgrade",
      src: "https://tongji.newzone.top/matomo.php?idsite=7&amp;rec=1",
      style: "border:0",
      alt: "",
    },
  ],
],
```

## 时间参数

[vuepress-plugin-seo2](https://vuepress-theme-hope.github.io/v2/seo/zh/guide.html) 在网页中插入 `og:updated_time` 和 `article:modified_time`，这两个参数都引用自 `page.git.updatedTime`。打开 config.ts，使用 vuepress-plugin-seo2 的 ogp 参数对 meta 重新设置，删除不想要的参数。不过这会导致博客的自动摘要功能失效，而且 git 后参数并没发生变化。在 theme.ts 设置 ogp 直接为无效。

```ts
import { seoPlugin } from "vuepress-plugin-seo2";
export default defineUserConfig({
  ...
  plugins: [
    seoPlugin({
      hostname: "https://vuepress-theme-hope.github.io",
      ogp: (ogp, page) => ({
        ...ogp,
        "og:updated_time": "",
        "og:modified_time": "",
      }),
  ],
});
```

另外，如果想停止向页面导入 lastUpdated 参数，在 `theme.ts` 中插入 `lastUpdated: false` 即可。

```ts
export default hopeTheme({
  lastUpdated: false,
});
```

## 自定义主题

- [x] ~~插入 Bilibili 或第三方视频，可使用专用 [组件库](https://vuepress-theme-hope.github.io/v2/components/zh/guide/)，配置参考 [组件案例 config.ts](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/demo/components/src/.vuepress/config.ts).~~
- [x] ~~插件[docsearch](https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html)：将 Algolia DocSearch 集成到 VuePress 中，为你的文档网站提供搜索功能。~~
- [x] ~~README 页面如何隐藏，使用 index: false，参考[主题设置](https://theme-hope.vuejs.press/zh/guide/layout/sidebar.html#%E9%80%9A%E8%BF%87%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90)~~
- [x] ~~去 meta 标签，测试并未成功，不再尝试~~
- [x] ~~[waline](https://theme-hope.vuejs.press/zh/guide/feature/comment.html#waline) 评论插件，无需账户，更适合大众。~~
- [x] ~~google analytics 没反应，实际已经包含在 js 中了~~
- [x] ~~不用自动开启一堆的网站，关闭 prefetch~~
- [x] ~~生成文件名固定化，chainWebpack~~
- [x] ~~网页更新时，有时会打不开链接，需要使用缓存。~~
- [x] ~~VuePress 博客页面：frontmatter 中添加 order 参数让最新的文章往上排，无法按文件名倒序排列~~
- [x] 全局路径需要给子目录添加 README.md，没那么多内容填，暂时放弃。
- [x] 独立设置页面标题。未成功，所有页面都会加入默认标题。
- [x] 侧边栏显示客服图片。icon 位置直接放链接也没用。
- [x] 指定页面子标题不被目录页识别。但页面中取消 toc 的话，网页位置会出现偏移。
- [x] [修改导航栏 brand 链接](https://theme-hope.vuejs.press/zh/cookbook/advanced/replace.html#%E6%8F%92%E6%A7%BD%E5%88%A9%E7%94%A8)，需用本地文件替代 [主题默认设置](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/theme/src/client/module/navbar/components/NavbarBrand.ts)。设置的 ts 未生效，暂时放弃。
- [x] ~~子域名中部署 blog 和 note，分别使用不同路径。这方案可以与 WordPress 共存，但未了避免后续出错，还是取消了。~~
- [x] ~~Giscus 评论区设置~~
- [x] ~~导航栏添加 repo 位置~~
- [x] ~~页面统计，插件只支持 Google、百度，然后用图片标签方式植入统计。直接修改页面模板，放入统计链接。备用方法：将统计代码直接放在侧边栏。~~
- [x] ~~定制页面标签：config.ts 中添加全局 [head 标签](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/docs/theme/src/.vuepress/config.ts)，或在页面中添加 [独立 head 标签](https://vuepress-theme-hope.github.io/v2/seo/zh/guide.html#%E7%9B%B4%E6%8E%A5%E6%B7%BB%E5%8A%A0-head-%E6%A0%87%E7%AD%BE)，支持图片统计代码。~~
- [x] ~~将 docs 里的 README.md 转移到主目录中，保持 github 项目页的同步。~~
- [x] ~~打开页面链接，侧边栏焦点能不能也移动过去。侧边栏标题需要能在首屏出现，才能激活焦点。~~
- [x] ~~默认主题颜色为白天，虽然不能切换，但发稿用白色就行。~~
- [x] ~~设置导航栏自动隐藏~~
- [x] ~~隐藏编辑时间和贡献者~~
- [x] ~~用 md 控制图片是，图片不能显示。这可能是因为主题默认的 lazy 加载，改用七牛云的图片属性控制尺寸。~~
