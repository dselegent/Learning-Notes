# 03 【Sass语法介绍-嵌套】

## 1.前言

在企业的实际项目开发中，Sass 的嵌套可以说是非常非常有用的，它可以让你的 CSS 代码易于管理和维护，看起来也比较清晰，这也是 Sass 中很基础的一个知识点，首先掌握这个至关重要！在此章节我们将学习 Sass 嵌套中的嵌套规则、属性嵌套、父选择器和占位符选择器。Sass 嵌套式一个很基础也很简单的语法，关键在于要多多练习使用！

## 2.什么是嵌套？

在一般编写 CSS 的时候呢，我们一遍一遍的编写相同的选择器去处理深层级的样式，而 Sass 给你一种轻松的方式，你可以在一个样式规则中直接编写另一个样式规则，而不是重复相同的选择器，Sass 将自动组合内外部的选择器。

通俗点说就是：你可以在父选择器的样式中直接编写子元素的样式，同理你可以在一个子元素的样式中再去编写孙元素的样式，可以一层一层的嵌套着去写样式。

一般来说 Sass 中的嵌套应用于以下几种场景：

- 样式的嵌套
- 父选择器
- 占位符选择器
- 属性嵌套

## 3.样式的嵌套

### 3.1 基本使用

**父选择器里可以嵌套子选择器**

如：有以下标签

```html
 <div>
        <ul>
            <li></li>
        </ul>     
    </div>
```

可以直接这样写：

```scss
div{
    height: 100px;
    ul{
        height: 80px;
        li{
           height: 50px;
        }
    }
}
```

相当于：

```scss
div {
  height: 100px;
}
div ul {
  height: 80px;
}
div ul li {
  height: 50px;
}
```

scss嵌套打开(解析)的规则是：**从外层到内层，将嵌套规则块打开，父级的选择器放在子级选择的前面组成一个新的选择器，然后再循环打开内部的嵌套块处理。**

写起来是不是方便很多，但使用嵌套的时候同时需要注意：

嵌套规则很有用很方便，但是你很难想象它实际会生成多少 CSS 语句，嵌套的越深，那么编译为 CSS 的语句就越多，同时消耗的资源也会越多，所以开发者尽量不要嵌套特别深的层级！

### 3.2 嵌套选择器列表 (Selector Lists)

css中，使用`,`分割的群组选择器可以同时应用样式在多个选择器上，如：

```css
h1, h2 {
  margin: 0;
}
```

但是，如果想对一个特定的容器元素内的多个元素，使用群组选择器时，就会有很多重复性工作。

```css
.container h1, .container h2, .container h3 { margin-bottom: .8em }
```

而，sass的嵌套特性，在解开一个内嵌的群组选择器时，会把每一个内嵌选择器正确的结合起来：

```scss
.container{
  h1,h2,h3{
    margin-bottom:.8em;
  }
}
```

sass会组合成 `.container h1`、 `.container h2`、`.container h3` 三者的群组选择器：`.container h1, .container h2, .container h3{ xxx }`。

同样，群组选择器内的嵌套也会以这种方式解析：

```scss
nav, aside {
  a {color: blue}
}

// nav a, aside a {color: blue}
```

### 3.3 嵌套组合符选择器 (Selector Combinators)

这三种选择器必须和其他选择器配合使用。

```css
/* 子组合选择器> */
article > section { border: 1px solid #ccc }

/* 相邻组合选择器+  选择 元素后紧跟的指定元素 */
header + p { font-size: 1.1em }

/* 同层全体组合选择器~，选择所有跟在article后的同层article元素 */
article ~ article { border-top: 1px dashed #ccc }
```

在sass中使用时，可以通过嵌套直接生成正确的结果（位于外层选择器的后面，或内层选择器的前面均可！），而不需要使用`&`。

```scss
article {
  /* 放在 里层选择器前边 */
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  /* 放在 外层选择器后边 */
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
```

解开后的css为：

```css
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```

> 最后一句，`nav + &` **使用父选择器&后，原本默认的嵌套规则不再适用，而是直接应用 & 组合的结果**。

## 4.父选择器 (Parent Selector)

### 4.1 基本使用

父选择器是 Sass 中一种特殊的选择器，用于嵌套选择器中，用来引用外部的选择器；通俗的讲就是，当你使用嵌套的时候，可能你会需要使用到嵌套外层的父选择器，比如为一个元素 **添加伪类** (hover、active、before、after) 的时候，可以用 **&** 代表嵌套规则外层的父选择器，我们举个例子来更直观的感受下：

```scss
a {
  &:hover {
    color:red;
  }
  &:active {
    color:blue;
  }
  &:before {
    content:'';
  }
  &:after {
    content:'';
  }
  span {
    &:hover {
      color:green;
    }
  }
}
```

在上面的 Sass 代码中我们编写了几个伪类，在编译的时候 & 将会被替换为嵌套外层的父选择器，有多层嵌套的话将会把父选择器一级一级的传递下去，最终转换为如下的 CSS 代码：

```css
a:hover {
  color: red;
}
a:active {
  color: blue;
}
a:before {
  content: "";
}
a:after {
  content: "";
}
a span:hover {
  color: green;
}
```

### 4.2 添加后缀 (Adding Suffixes)

可以使用 & 向外部选择器添加后缀，举个例子看下：

```scss
.box {
  width:100px;
  &-head {
    width:100%;
    &-title {
      color:red;
    }
  }
  &-body {
    width:100%;
  }
  &-footer {
    width:100%;
  }
}
```

上面这个例子将会转换为如下的 CSS 代码：

```css
.box {
  width: 100px;
}
.box-head {
  width: 100%;
}
.box-head-title {
  color: red;
}
.box-body {
  width: 100%;
}
.box-footer {
  width: 100%;
}
```

## 5.占位符选择器 (Placeholder Selectors)

在 Sass 中这是一种特殊的选择器，称为 "占位符"；它以 % 开头，必须通过 @extend 指令调用，如果单独使用的话是不会编译到 CSS 中的，后面会讲到 @extend 指令，这里我们先举个简单的例子感受一下：

```css
%placeholder {
  width:100px;
  height:100px;
  color:red;
  &:hover {
    color:blue;
  }
}

.btn {
  @extend %placeholder;
  font-size: 18px;
}

.btn2 {
  @extend %placeholder;
  font-size: 16px;
}
```

请记住，占位符必须**通过 @extend 指令调用**才会转换为如下的 CSS 代码：

```css
.btn2, .btn {
  width: 100px;
  height: 100px;
  color: red;
}
.btn2:hover, .btn:hover {
  color: blue;
}

.btn {
  font-size: 18px;
}

.btn2 {
  font-size: 16px;
}
```

## 6.属性嵌套

当我们在写 CSS 样式的时候，有些 CSS 属性具有相同的**命名空间 (namespace)**，比如定义字体样式的属性： font-size ; font-weight ; font-family ; 它们具有相同的命名空间 font 。再比如定义边框样式的属性：border-radius ; border-color ; 它们具有相同的命名空间 border 。当然还有很多其他这种的属性，为了方便管理和避免重复输入，Sass 允许将属性嵌套在命名空间中，同时命名空间也可以具有自己的属性值，我们举例看一下：

> **把属性名从中划线-的地方断开，在该属性后边添加一个冒号:，紧跟一个{ }块，把子属性部分写在这个{ }块中**。这样就可以实现属性的嵌套。

```scss
.box {
  border: {
    radius: 5px;
    color:red;
  }
  font: {
   family:'YaHei';
   size:18px;
   weight:600;
  }
  margin: auto {
    bottom: 10px;
    top: 10px;
  };
}
```

上面这种写法将会被转换为如下的 CSS 代码：

```css
.box {
  border-radius: 5px;
  border-color: red;
  font-family: "YaHei";
  font-size: 18px;
  font-weight: 600;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
}
```

## 7.小结

本节内容我们主要讲了 Sass 中的嵌套规则，Sass 的嵌套是最基本也是最常用的功能，主要包括如下几个重点：

- 样式的嵌套
  - 基本的样式嵌套
  - 嵌套选择器列表 (Selector Lists)
  - 嵌套组合符选择器 (Selector Combinators)
- 父选择器
  - 添加后缀 (Adding Suffixes)
- 占位符选择器
- 属性嵌套

你来根据下面这张图来复习一下本节的内容：

![image-20220823190110782](https://i0.hdslb.com/bfs/album/55f989eb4bd4508c846a4c1e446c3f8e549631ee.png)

学会了 Sass 中的嵌套规则，快使用这种方式来改造一下你的 CSS 代码吧～