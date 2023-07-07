# 01 【TailWind CSS 安装使用】

> **简介：**Tailwind CSS 是一个功能类优先的 CSS 框架，它集成了诸如 flex, pt-4, text-center 和 rotate-90 这样的的类，它们能直接在脚本标记语言中组合起来，构建出任何设计。

## 1.使用 CDN 快速体验 Tailwind CSS

> 使用 Play CDN 直接在浏览器中试用 Tailwind，无需任何构建步骤。Play CDN 仅用于开发目的，不是生产的最佳选择。

将 Play CDN 脚本标记添加到 HTML 文件的 ，然后开始使用 Tailwind 的实用工具类来设置内容的样式。`<head>`

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="flex">
        <div class="flex-none w-14 h-14 bg-pink-500">1</div>
        <div class="flex-initial w-64 bg-red-700">2</div>
        <div class="flex-initial w-32 bg-green-50">3</div>
    </div>
</body>
</html>
```

## 2.使用 npm 安装 Tailwind CSS

**第一步：安装 Tailwind CSS**

安装 `Tailwind CSS` 并创建 `tailwind.config.js` 配置文件

```shell
mkdir demo
cd demo

# 安装 tailwindcss
npm install -D tailwindcss
# 初始化会生成 tailwind.config.js 配置文件
npx tailwindcss init
```

> 1）npm install -D tailwindcss 会生成文件及目录
>
> node_modules package-lock.json package.json
>
> 
>
> 2）npx tailwindcss init 生成如下配置文件
>
> tailwind.config.js

**第二步：编辑 tailwind.config.js 配置文件**

添加文件到配置文件中

```js
module.exports = {
 content: ["./src/**/*.{html,js}"],
 theme: {
   extend: {},
 },
 plugins: [],
}
```

**第三步：添加 Tailwind 样式指令到 CSS文件中**

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

> 有警告的在vscode中安装`PostCSS Language Support`插件

**第四步：使用 Tailwind Cli 构建 CSS样式**

```shell
npx tailwindcss -i ./src/style.css -o ./dist/mystyle.css --watch
```

该命令会将 `src/style.css` 中 `Tailwind CSS` 编译到 `demo/dist/mystyle.css` 文件中，`mystyle.css` 就是编译后样式，项目中引入的就是它。

现在打开 `package.json` 文件，添加以下运行脚本：

```json
"scripts": {
  "build": "tailwindcss -i ./src/style.css -o ./dist/output.css --watch"
}
```

这时候只要运行`npm run build`就可以自动监听你的页面改动并且实时编译了。

**第五步：小试牛刀**

经过上面 4 个小步骤，`Tailwind CSS` 就已经安装好，下面就来瞅瞅。

```html
<!doctype html>
<html>
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <link href="../dist/output.css" rel="stylesheet">
</head>
<body>
 <h1 class="text-3xl font-bold underline text-yellow-100">
   Hello world!
 </h1>
</body>
</html>
```

> ### 自动刷新HTML文件
>
> 这是个题外话，不属于Tailwind CSS的范畴，如果你在写静态页面的时候，需要每次修改html页面，浏览器就自动刷新这个页面，那么只需要在vscode内搜索`Live Preview`并且安装，之后在你需要预览的页面，右键，选择`Live Preview：Show Preview`即可。