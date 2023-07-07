---
description: '茂茂的 Visual Studio Code 配置，记录扩展插件、使用小技巧和个人配置'
---

# Visual Studio Code 配置

## 扩展插件推荐

### 主题相关

- `One Dark Pro`

  - 黑色主题
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme)

- `Shades of Purple`

  - 紫色主题（来自彤姐的推荐：没有什么比骚更重要）
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=ahmadawais.shades-of-purple)

- `Dracula Official`

  - 黑色主题
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula)

- `Bluloco Dark`

  - 黑色主题
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=uloco.theme-bluloco-dark)

- `Material Icon Theme`

  - 文件图标美化
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

- `background`
  - 自定义背景
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=shalldie.background)

### HTML 相关

- `Auto Close Tag`

  - 自动添加 HTML / XML 关闭标签
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

- `Auto Rename Tag`

  - 自动重命名配对的 HTML / XML 标签
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

- `Highlight Matching Tag`

  - Tag 高亮匹配标记
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag)

### React 相关

- `ES7 React/Redux/GraphQL/React-Native snippets`
  - 提供 ES7 中的 JavaScript 和 React / Redux 片段，以及针对 VS Code 的 Babel 插件功能
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

### Vue 相关

- `Vue 2 Snippets`

  - 基于最新的 Vue 2 的 API 添加了 Code Snippets
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=hollowtree.vue-snippets)

- `Vetur`
  - `Vue` 文件语法高亮、片段整理、错误检查、格式化
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

### CSS 相关

- `Easy LESS`

  - 保存时自动将 `less` 自动编译为 `css`
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=mrcrowl.easy-less)

- `language-stylus`

  - 增加对 `stylus` 的支持
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=sysoev.language-stylus)

- `px to rem`
  - `px` 和 `rem` 互相转换
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=sainoba.px-to-rem)

### AI 代码提示和生成

- `GitHub Copilot`

  - [插件地址](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

- `Tabnine`
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode)

### Markdown 相关

- `markdownlint`

  - Markdown / CommonMark 标记和样式检查
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

- `Markdown Preview Enhanced`

  - 为 Markdown 增加大纲、导出 PDF PNG JPEG HTML、自定义预览样式
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
  - [官网](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/)

### Git 相关

- `GitLens — Git supercharged`
  - 增强构建在 VS Code 中的 `Git` 功能
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

### 格式和代码检查相关

- `ESLint`

  - 将 ESLint JavaScript 集成到 VS Code 中
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- `Prettier - Code formatter`

  - 代码格式化
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

- `Code Spell Checker`

  - 代码拼写检查
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

- `Error Lens`

  - 突出显示代码错误和警告
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

- `Sort package.json`

  - 对 `package.json` 文件进行排序
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=unional.vscode-sort-package-json)

### 调试相关

- `Live Server`
  - 启动具有实时重新加载功能的本地开发服务，以处理静态和动态页面
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### 语法支持

- `EditorConfig for VS Code`

  - 增加对 `.editorconfig` 的支持
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

- `ENV`

  - .env 文件键值字符串高亮和格式化
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=IronGeek.vscode-env)

### 开发体验提升

- `Auto Import`

  - 自动查找，解析并提供所有可用导入的代码操作和代码完成。
    与 `Typescript` 和 `TSX` 一起使用
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)

- `Import Cost`

  - 在编辑器中显示导入/需要包的大小（PS：小内存用户不建议使用，说的就是你这个用 8G 的）
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)

- `Image preview`

  - 在行号边上、悬停时显示图像预览
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)

- `Path Intellisense`

  - 自动补全文件名
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

- `npm Intellisense`

  - 可自动完成导入语句中的 npm 模块
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)

- `Chinese (Simplified) Language Pack for Visual Studio Code`

  - 适用于 VS Code 的中文（简体）语言包
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans)

- `es6-string-html`

  - ES6 模板字符串高亮
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)

- `Todo Tree`

  - 在树视图中显示 TODO FIXME 等注释标记
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

### 微信小程序相关

- `WXML - Language Service`
  - 微信小程序标签、属性的智能补全（同时支持原生小程序、`mpvue` 和 `wepy` 框架，并提供 snippets）
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=qiu8310.minapp-vscode)

### 其他

- `韭菜盒子`
  - 看股票、基金实时数据
  - [插件地址](https://marketplace.visualstudio.com/items?itemName=giscafer.leek-fund)

## 使用小技巧

### 删除空行

1. 打开替换 `Alt + ⌘ + F`
2. 输入 `^\s*(?=\r?$)\n`
3. 勾选使用正则表达式 `Alt + ⌘ + R`
4. 全部替换 `⌘ + Enter`

## 安装 code 命令

`code` 命令可以直接打开一个文件或者文件目录

1. 使用 `shift + command + p` 打开命令面板
2. 输入 `shell command` 进行搜索
3. 点击 `Shell 命令：在 PATH 中安装 “code” 命令`

```sh
# 在 vscode 中编辑当前目录下的文件
code .

# 在 vscode 中编辑该文件（当文件不存在时会先创建该文件）
code [文件名]
```

## webpack 项目识别 alias

1. 在项目根目录新建 `jsconfig.json` 或 `tsconfig.json`
2. 添加以下代码，其中 `paths` 字段的值要与你项目配置的 `alias` 一致

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

## 推荐配置

```json
// 将设置放入此文件中以覆盖默认设置
{
  /** 编辑器相关配置 */
  "editor.fontSize": 13.5,
  "editor.fontFamily": "Input Mono, Fira Code, monospace",
  "editor.fontLigatures": "'ss01', 'ss02', 'ss03', 'ss06', 'zero'",
  "editor.tabSize": 2,
  // 关闭快速预览
  "editor.minimap.enabled": true,
  "editor.wordWrap": "on",
  "editor.lineNumbers": "on",
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },
  // bug控制缩进不关tabSize修改无用
  "editor.detectIndentation": false,
  "editor.inlineSuggest.enabled": true,
  "editor.cursorSmoothCaretAnimation": true,
  "editor.multiCursorModifier": "ctrlCmd",
  "editor.renderWhitespace": "boundary",
  "editor.glyphMargin": true,
  "editor.accessibilitySupport": "off",
  // 保存格式化
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
    // "source.organizeImports": true,
  },
  "editor.unicodeHighlight.allowedLocales": {
    "zh-hans": true
  },
  /** 工作台配置 */
  "workbench.colorTheme": "Bluloco Dark",
  "workbench.iconTheme": "material-icon-theme",
  // 新开标签页查看文件而不是覆盖当前标签页
  "workbench.editor.enablePreview": false,
  "workbench.editor.closeOnFileDelete": true,
  "workbench.editor.highlightModifiedTabs": true,
  "workbench.tree.indent": 14,
  "workbench.list.smoothScrolling": true,
  "workbench.activityBar.visible": true,
  "workbench.startupEditor": "newUntitledFile",
  "workbench.fontAliasing": "antialiased",
  /** 终端配置 */
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.persistentSessionReviveProcess": "never",
  "terminal.integrated.tabs.enabled": true,
  "terminal.integrated.cursorStyle": "line",
  "extensions.autoUpdate": "onlyEnabledExtensions",
  "extensions.ignoreRecommendations": true,
  // 如需要开发微信小程序，需要注释这段代码，不然会和 minapp-vscode 插件冲突
  // "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  // 有注释的 json
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[wxml]": {
    "editor.defaultFormatter": "qiu8310.minapp-vscode"
  },
  // 文件配置
  "files.associations": {
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript",
    "*.vue": "vue",
    "*.env.*": "env"
  },
  "files.exclude": {
    "**/.idea": true
  },
  "files.insertFinalNewline": true,
  "files.simpleDialog.enable": true,
  /** 文件搜索配置 */
  "search.exclude": {
    // 配置文件
    "**/.vscode": true,
    "**/.git": true,
    "**/.github": true,
    // 依赖文件
    "**/node_modules": true,
    "**/bower_components": true,
    "**/miniprogram_npm": true,
    // lock 文件
    "**/package-lock.json": true,
    "**/yarn.lock": true,
    "**/pnpm-lock.yaml": true,
    // 打包文件
    "**/dist": true,
    "**/.umi": true
  },
  "scm.defaultViewMode": "tree",
  /** git 相关 */
  "git.ignoreMissingGitWarning": true,
  "git.autofetch": true,
  "git.untrackedChanges": "separate",
  /** 资源管理器配置 */
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  /*** 第三方扩展配置 ***/
  /** eslint 配置 */
  "eslint.format.enable": true,
  "eslint.options": {
    "extensions": [".js", ".jsx", ".ts", ".tsx", ".vue"]
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html",
    "vue",
    "markdown",
    "json",
    "jsonc",
    "json5"
  ],
  /** prettier 配置 */
  // 是否每行末尾添加分号
  "prettier.semi": false,
  // 是否使用单引号
  "prettier.singleQuote": true,
  "prettier.printWidth": 100,
  "prettier.trailingComma": "none",
  /** errorLens 配置 */
  "errorLens.enabledDiagnosticLevels": ["warning", "error"],
  "errorLens.excludeBySource": ["cSpell", "Grammarly", "eslint"],
  /** Code Spell Checker 配置 */
  "cSpell.allowCompoundWords": true,
  "cSpell.language": "en,en-US",
  "cSpell.ignoreWords": [
    /** 库相关 */
    "yalc",
    "vetur",
    "vuex",
    "vuepress",
    "vite",
    "antd",
    "ahooks",
    "weui",
    "weapp",
    "craco",
    "execa",
    /** 文件后缀 */
    "wxml",
    "xmind",
    /** 常用简写 */
    "btns"
  ],
  /** emmet 配置 */
  "emmet.showSuggestionsAsSnippets": true,
  "emmet.triggerExpansionOnTab": true,
  "emmet.includeLanguages": {
    "vue-html": "html",
    "javascript": "javascriptreact",
    "wxml": "html"
  },
  /** vetur 配置 */
  "vetur.format.defaultFormatter.html": "prettyhtml",
  "vetur.format.defaultFormatter.js": "prettier-eslint",
  "vetur.format.defaultFormatterOptions": {
    "prettyhtml": {
      "printWidth": 80, // No line exceeds 100 characters
      "singleQuote": false // Prefer double quotes over single quotes
    },
    "prettier": {
      // 是否添加分号
      "semi": false,
      // 是否使用单引号
      "singleQuote": true,
      "eslintIntegration": true,
      "parser": "babylon"
    }
  },
  "gitlens.keymap": "alternate",
  "tabnine.experimentalAutoImports": true,
  // 标签高亮
  "highlight-matching-tag.styles": {
    "opening": {
      "left": {
        "custom": {
          "borderWidth": "0 0 0 4px",
          "borderStyle": "solid",
          "borderColor": "LightSkyBlue",
          "borderRadius": "5px"
        }
      },
      "right": {
        "custom": {
          "borderWidth": "0 4px 0 0",
          "borderStyle": "solid",
          "borderColor": "LightSkyBlue",
          "borderRadius": "5px"
        }
      }
    }
  },
  /** markdown 配置 */
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.quickSuggestions": {
      "comments": "on",
      "strings": "on",
      "other": "on"
    }
  },
  "markdown-preview-enhanced.codeBlockTheme": "one-dark.css",
  "markdown-preview-enhanced.previewTheme": "one-dark.css",
  "markdownlint.config": {
    "MD001": false,
    "MD024": false,
    // 内联 HTML
    "MD033": false
  },
  /** 微信小程序配置 */
  "minapp-vscode.disableAutoConfig": true
}
```

## 代码片段

````json
{
  /********** markdown 相关 **********/
  "markdown code block": {
    "scope": "markdown",
    "prefix": "code",
    "body": ["```${1:js}", "$2", "```"],
    "description": "markdown 块级代码"
  },
  "markdown code inline": {
    "scope": "markdown",
    "prefix": "code",
    "body": ["`$1`"],
    "description": "markdown 行内代码"
  }
}
````

## 其他

- [emmet 语法说明](https://docs.emmet.io/abbreviations/syntax/)

### 扩展插件开发

- [VS Code 插件开发文档-中文版](https://github.com/Liiked/VS-Code-Extension-Doc-ZH)
- [VSCode 插件开发全攻略配套 demo](https://github.com/sxei/vscode-plugin-demo)

### 下载小技巧

1. 打开 [Visual Studio Code](https://code.visualstudio.com/Download) 官网进行下载
2. 打开下载管理，复制下载链接
3. 将链接中的域名 `az764295.vo.msecnd.net` 替换为 `vscode.cdn.azure.cn`

```sh
# 示例
https://az764295.vo.msecnd.net/stable/74b1f979648cc44d385a2286793c226e611f59e7/VSCode-darwin-universal.zip
# 替换如下
https://vscode.cdn.azure.cn/stable/74b1f979648cc44d385a2286793c226e611f59e7/VSCode-darwin-universal.zip
```
