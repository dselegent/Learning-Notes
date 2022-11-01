# Less基础

## 1.维护CSS的弊端

CSS 是一门非程序式语言，没有变量、函数、SCOPE（作用域）等概念。

- CSS 需要书写大量看似没有逻辑的代码，CSS 冗余度是比较高的
- 不方便维护及扩展，不利于复用
- CSS 没有很好的计算能力
- 非前端开发工程师来讲，往往会因为缺少 CSS 编写经验而很难写出组织良好且易于维护的 CSS 代码项目

## 2.Less介绍

Less（Leaner Style Sheets 的缩写）是一门 CSS 扩展语言，也称为 CSS 预处理器。

做为 CSS 的一种形式的扩展，它并没有减少 CSS 的功能，而是在现有的 CSS 语法上，为 CSS 加入程序式语言的特性。

它在 CSS 的语法基础上，引入了变量，Mixin（混入），运算以及函数等功能，大大简化了 CSS 的编写，并且降低了 CSS 的维护成本，就像它的名称所说的那样，Less 可以让我们用更少的代码做更多的事情。

Less 中文网址：[Less 快速入门 | Less.js 中文文档 - Less 中文网 (bootcss.com)](https://less.bootcss.com/)

常见的 CSS 预处理器：Sass、Less、Stylus

一句话：Less 是一门 CSS 预处理语言，它扩展了 CSS 的动态特性。

## 3.Less安装（注意如果使用VSCode无需安装Less）

**用node运行Less**

1. 安装 node.js，可选择版本（8.0），网址：http://nodejs.cn/download/
2. 检查是否安装成功，使用 cmd 命令输入 `node -v` 查看版本即可
3. 基于 node.js 在线安装 Less，使用 cmd 命令输入 `npm install -g less` 即可
4. 检查是否安装成功，使用 cmd 命令 `lessc -v` 查看版本即可

**vscode使用Less**

本质上，Less 包含一套自定义的语法及一个解析器，用户根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的 CSS 文件。

所以，我们需要把我们的 Less 文件，编译生成为 CSS 文件，这样我们的 HTML 页面才能使用。

【VSCode Less 插件】

vscode 的 Easy LESS 插件

这个插件可以自动将`less`文件转义成`css`文件
**关于配置**

![image-20220820200608896](https://i0.hdslb.com/bfs/album/414fbd1d48b8bce8313ae5ddc66469d7b3548974.png)

**settings.json配置如下**

```json
"less.compile": {
        "compress": true, // true => remove surplus whitespace
        "sourceMap": true, // true => generate source maps (.css.map files)将浏览器审查元素中css代码在css文件中的位置改成对应的less文件中的位置
        "out": true // false => DON'T output .css files (overridable per-file, see below)生成对应的css文件
    }
```

只要保存一下 less 文件，会自动生成 CSS 文件。

## 4.注释(Comments)

- 多行注释保留
- 单行注释不被保留在编译生成的 CSS 中

```less
/* 
 * 一个块注释
 * style comment! 
*/

// 这一行被注释掉了！
div {
  color: red;
}
```

## 5.变量(Variables)

变量是指没有固定值，可以改变的。因为我们 CSS 中的一些颜色和数值等经常使用。

`@变量名: 值;`

变量是指没有固定值，可以改变的。因为我们 CSS 中的一些颜色和数值等经常使用。

`@变量名: 值;`

### 5.1 变量命名规范

- 必须有 `@` 为前缀
- 不能包含特殊字符
- 不能以数字开头
- 大小写敏感

`@color: pink;`

### 5.2 基本使用

```less
// 直接使用
body {
    color: @color;
}

a:hover {
    color: @color;
}
```

### 5.3 变量插值(Variable Interpolation)

变量用于选择器名、属性名、URL、`@import`语句

```less
@my-selector: banner;

// 需要添加 {}
.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```

```less
@property: color;

.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
```

```less
// Variables
@images: '../img';

// Usage
body {
  color: #444;
  background: url('@{images}/white-sand.png');
}
```

```less
// Variables
@themes: '../../src/themes';

// Usage
@import '@{themes}/tidal-wave.less';
```

### 5.4 延迟加载(Lazy Evaluation)

当一个变量被声明多次，会取最后一次的值，并从当前作用域往外寻找变量。

```less
@var: 0;
.class {
  @var: 1;
  .brass {
    @var: 2;
    three: @var;
    @var: 3;
  }
  one: @var;
}
```

**编译后**

```css
.class {
  one: 1;
}
.class .brass {
  three: 3;
}
```

### 5.5 属性名变量(Properties as Variables)

```less
.widget {
  color: #efefef;
  background-color: $color;
}
```

**编译后**

```css
.widget {
  color: #efefef;
  background-color: #efefef;
}
```

## 6.嵌套(Nesting)

### 6.1 基本使用

Less 提供了使用嵌套(nesting)代替层叠或与层叠结合使用的能力

【我们经常用到选择器的嵌套】

```css
#header .logo {
    width: 300px;
}
```

【less 嵌套写法】

```less
#header {
    .logo {
        width: 300px;
    }
}
```

> 用 Less 书写的代码更加简洁，并且模仿了 HTML 的组织结构。

### 6.2 父选择器 (Parent Selectors)

在嵌套规则中， `&` 表示父选择器，常用于给现有选择器添加伪类。

```less
.header {
  a {
    color: blue;
    &:hover {
      color: green;
    }
  }
}
```

**编译后**

```css
.header a {
  color: blue;
}
.header a:hover {
  color: green;
}
```

你还可以使用此方法将伪选择器（pseudo-selectors）与混合（mixins）一同使用。下面是一个经典的 clearfix 技巧，重写为一个混合（mixin） (& 表示当前选择器的父级）：

```less
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```

## 7.混合(Mixins)

混合(Mixin)是一种将一组属性从一个规则集包含(或混入)到另一个规则集的方式，可理解为复制粘贴。

### 7.1 普通混合

1. 定义了一个bordered类
2. 如果希望在其它规则集中使用这些属性，只需像下面这样输入所需属性的类（class）名称即可

```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```

```css
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
#menu a {
  color: #111;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
.post a {
  color: red;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

```less
// 使用类选择器时可以在选择器后边添加一个括号，这时我们实际上就创建了一个mixins
// 这种是不会被识别进css
.myMixin() {
  width: 400px;
  height: 400px;
}

.p4 {
  .myMixin; //.myMixin();都可以
}
```

### 7.2 带参数的混合(Parametric Mixins)

1. 混合带参数，参数需要按顺序传递

```less
.border(@width, @style, @color) {
  border: @width @style @color;
}
div {
  .border(1px, solid, #ccc);
}
```

```css
div {
  border: 1px solid #ccc;
}
```

2. 混合带参数并有默认值

需注意的是，就算有默认值，也要按顺序传递

```less
.border(@width, @style, @color: #ccc) {
  border: @width @style @color;
}
div {
  .border(1px, solid);
}

// 会出错
.border(@width: 1px, @style, @color) {
  border: @width @style @color;
}
div {
  .border(solid, #ccc);
}
```

### 7.3 命名参数

可以在向混合传参是指定参数名称，从而不需要按顺序传入

```less
.border(@width, @style, @color: #ccc) {
  border: @width @style @color;
}
div {
  .border(@style: solid, @color: red, @width: 100px);
}
```

### 7.4 @arguments 变量

`@arguments` 变量包含了传入的所有参数

```less
.box-shadow(@x: 0, @y: 0, @blur: 1px, @color: #000) {
  -webkit-box-shadow: @arguments;
  -moz-box-shadow: @arguments;
  box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px, 5px);
}
```

```css
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
  -moz-box-shadow: 2px 5px 1px #000;
  box-shadow: 2px 5px 1px #000;
}
```

### 7.5 匹配模式(Pattern-matching)

在多个相同的混合中(参数个数必须相同)，匹配特定的混合。

```less
.mixin(dark, @color) {
  color: darken(@color, 10%);
}
.mixin(light, @color) {
  color: lighten(@color, 10%);
}
// @_ 表示匹配所有
.mixin(@_, @color) {
  display: block;
}

@switch: light;

.class {
  .mixin(@switch, #888);
}
```

```css
.class {
  color: #a2a2a2;
  display: block;
}
```

### 7.6 运算(Operations)

任何数字、颜色或者变量都可以参与运算。就是 Less 提供了加（+）、减（-）、乘（*）、除（/）算术运算。

```less
/* Less 里面写 */
@width: 10px + 5;

div {
    border: @width solid red;
}

/* Less 甚至还可以这样 */
width: (@width + 5) * 2;
```

【生成的 css】

```css
div {
    border: 15px solid red;
}
```

注意：

- 乘号（*）和除号（/）的写法要牢记
- 运算符中间左右必须有个空格隔开 `1px + 5`
- 在新版本的 Less 中，除法有变动，应将 `100px / 10` 改为 `(100px / 10)`，否则没有效果
- 对于两个不同的单位的值之间的运算，运算结果的值取第一个值的单位
- 如果两个值之间只有一个值有单位，则运算结果就取该单位

计算结果以操作数最左侧的单位类型为准

```less
@conversion-1: 5cm + 10mm; // 6cm
@conversion-2: 2 - 3cm - 5mm; // -1.5cm
@conversion-3: 3.1 * 2cm; // 6.2cm
@conversion-4: 4px / 2; // 4px / 2

// conversion is impossible
@incompatible-units: 1cm - 1px; // 0.97354167cm

// example with variables
@base: 5%;
@filler: @base * 2; // 10%
@other: @base + @filler; // 15%

@color: #224488 / 2; // #112244
background-color: #112244 + #111; // #223355
```

## 8.继承(Extend)

Extend Syntax

- 继承可让多个选择器应用同一组属性，最终编译为并集选择器
- 其性能比混合高，但灵活性比混合低

```less
nav ul {
  &:extend(.inline);
  background: blue;
}
.inline {
  color: red;
}
```

```css
nav ul {
  background: blue;
}
.inline,
nav ul {
  color: red;
}
```

### 9.避免编译

通过加引号可以避免 Less 编译，直接把内容输出到 CSS 中

```less
.banner .inline .header {
  width: '100px + 100px';
  height: 100px + 100px;
}
```

```css
.banner .inline .header {
  width: '100px + 100px';
  height: 200px;
}
```

## 10.函数（Functions）

Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。这些函数在Less 函数手册中有详细介绍。

函数的用法非常简单。下面这个例子将介绍如何利用 percentage 函数将 0.5 转换为 50%，将颜色饱和度增加 5%，以及颜色亮度降低 25% 并且色相值增加 8 等用法：

```less
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```

## 11.导入（Importing）

你可以导入一个 .less 文件，此文件中的所有变量就可以全部使用了。如果导入的文件是 .less 扩展名，则可以将扩展名省略掉：

```less
@import url("syntax.less");//url可以不加但是可能会有问题
@import "library"; // library.less
@import "typo.css";
```

## 12.导出

**手动给每个less文件指定导出**

导出必须写到第一行

```less
// out: 路径/文件名
// out: ./mycss/pink.css
```

设置导出：  当面目录下，创建一个 mycss 文件夹， 生成 一个 pink.css （做了改名）

------

```less
// out: ./mycss/
```

设置导出：  当面目录下，创建一个 mycss 文件夹， 生成 一个 跟less一样的文件名（原名）

**less 禁止导出**

```less
// out: false
```
