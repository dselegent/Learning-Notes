# 07 【Sass语法介绍-控制指令】

## 1.前言

Sass 为我们提供了很多控制指令，使得我们可以更高效的来控制样式的输出，或者在函数中进行逻辑控制。本节内容我们就来讲解什么是 Sass 控制指令？它能用来做什么？它将使你更方便的编写 Sass 。

## 2.什么是 Sass 控制指令

控制指令，故名思义它是通过条件来控制某些逻辑的，提到条件你首先肯定想到了 if ，没错这是 Sass 控制指令的一种，除了这个还有循环，所以 Sass 一共为我们提供了 4 种控制指令，它们分别是：

- @if 指令
- @each 指令
- @for 指令
- @while 指令

如果你熟悉其他的编程语言或者你熟悉 javascript ，看见上面这四种是不是很熟悉，它们在 Sass 中也是用来做条件判断和循环的，下面我们就看一下它们如何在 Sass 中应用。

## 3.@if 指令

### 3.1 基本使用

@if 指令是在 @if 后跟一个表达式，然后再接 {} ，如果表达式为 true 则执行 {} 里的代码逻辑，写为 @if { … } ，我们来举例看下：

```scss
@mixin avatar($size, $circle: false) {
  height: $size;

  @if $circle {
    width: $size / 2;
  }
}

.square { @include avatar(100px, $circle: true); }
```

上面我们在 @mixin 中使用了 @if 指令，**如果 @if 后面的表达式或变量为 true ，它将执行 {} 里的代码**。上面的代码在 .square 的样式中使用了 @mixin ，它将会生成如下的 CSS 代码：

```css
.square {
  height: 100px;
  width: 50px;
}
```

从上面两段代码的对比中我们看到，我们为 @mixin 传入了 $size 并且 @if 后面的变量为 true，所以它执行了 width: $size / 2 生成的 CSS 就是 width: 50px ，在这里你要重点关注 @if 指令的用法，关于 @mixin 在后面的章节我们会详细讲到，这里你可以先认识下就好。

### 3.2 @else 和 @else if 指令

如果你了解任何的编程语言，那么你一定知道有 if 就会有 else 和 else if ，**如果 @if 后面的表达式为 false ，就会判断 @else if 后面的表达式，如果还是 false 则会继续往后走，如果所有表达式都为 false 则最终会执行 @else 后面的 {} 中的代码逻辑**。

当然 @else if 和 @else是在你需要多条逻辑判断的时候写的，也可以不写，就像上面的代码一样。说了这么多可能你不是很理解，一码胜千言，我们直接将上面的代码段改造下，实际体会一下：

```scss
@mixin avatar($size, $circle: 1) {
  height: $size;

  @if $circle == 1 {
    width: $size / 2;
  } @else if $circle == 2 {
    width: $size / 5;
  } @else {
    width: $size;
  }
}


.a { @include avatar(100px); }
.b { @include avatar(100px, $circle: 2); }
.c { @include avatar(100px, $circle: 3); }
```

上面的代码中我有 3 条判断逻辑对应不同的代码块，然后我在 .a .b .c 中分别调用 @mixin 并传入不同的参数，转换后的 CSS 代码如下：

```css
.a {
  height: 100px;
  width: 50px;
}

.b {
  height: 100px;
  width: 20px;
}

.c {
  height: 100px;
  width: 100px;
}
```

通过上面的讲解可以看到 @if 指令还是非常实用的，在你写函数的时候很多地方会用到，所以这块要好好记住。

## 4.@each 指令

@each 指令一般用来循环一个列表或 Map ，它的写法是这样的 @each in { … } ，这其中 expression 表达式返回一个列表或者直接就是一个列表，variable 是列表中的每一项，{} 中是每次循环都会执行的代码，我们举例来看下:

```scss
$borders: 2px, 3px, 5px;

@each $bor in $borders {
  .border-#{$bor} {
    border:$bor solid;
  }
}
```

上面的代码中我们通过 @each 循环一个 $borders 列表，来生成不同的 class 的 border 样式，上面这段代码转换为 CSS 如下：

```css
.border-2px {
  border: 2px solid;
}

.border-3px {
  border: 3px solid;
}

.border-5px {
  border: 5px solid;
}
```

可以看到上面的写法是不是很方便，这样就直接生成了不用的类名并且对应不同的样式，在 Sass 编程中 @each 也是很常用的指令，所以这个你是一定要会用的，尤其是在写函数的时候！

## 5.@for 指令

@for 指令很有意思，它可以**设定一个范围然后在这个范围内循环**，比如说在 1 ～ 5 这个范围内，或者在 3 ~ 6 这个范围内等等。

它有两种写法 @for from to { … } 或者 @for from through { … }，这两种写法中variable 都是每次循环时候的数值，start 都表示开始的边界，end 都表示结束的边界；

这两种写法不同的是 **through 包含 start 与 en** ，而 **to 包含 start 但不包含 end**。文字描述难免有些抽象，我们直接举例看下：

```scss
$base-color: #036;

// 范围是 1 ~ 3
@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
// 范围是 4 ~ 6
@for $i from 4 through 6 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```

上面的代码我们用的是 **through** 写法，分别写了 1 ~ 3 范围的循环和 4 ~ 6范围的循环，也就是说循环体中的代码块会分别被计算 3 次，它最终会转换为如下的 CSS 代码：

```css
// 1 ~ 3 范围生成的
ul:nth-child(3n+1) {
  background-color: #004080;
}

ul:nth-child(3n+2) {
  background-color: #004d99;
}

ul:nth-child(3n+3) {
  background-color: #0059b3;
}
// 4 ~ 6 范围生成的
ul:nth-child(3n+4) {
  background-color: #0066cc;
}

ul:nth-child(3n+5) {
  background-color: #0073e6;
}

ul:nth-child(3n+6) {
  background-color: #0080ff;
}
```

看到转换后的 CSS 是不是感觉使用 @for 指令写起来简直飞快，下面我们在使用 **to** 写法来举个例子看下：

```scss
$base-color: #036;

@for $i from 1 to 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```

上面使用 **to** 写法的代码将会转换为如下的 CSS 代码：

```css
ul:nth-child(3n+1) {
  background-color: #004080;
}

ul:nth-child(3n+2) {
  background-color: #004d99;
}
```

好了，通过上面的代码可以看出使用 to 写法是不包含 end 边界的。从上面我们举的两个例子不难看出，@for 指令可以极大的简化我们编写冗余繁琐的 CSS ，你自己需要多尝试这个指令来实际感受下。

## 6.@while 指令

@while 指令很像 javascript 中的 while 循环，在 Sass 中 @while 指令的写法是 @while { … } ，当表达式 expression 结果为 true 时就执行 {} 里的代码，直到表达式 expression 结果为 false 。我们举例来看下：

```scss
$num: 4;
@while $num >= 1 {
  .box-#{$num} {
    font-weight: 100 * $num;
  }
  $num: $num - 1;
}
```

从上面的代码可以看出我设定了一个变量 $num 为 4 ，然后每次循环将这个变量 -1 ，知道 $num < 1 的时候会停止循环，也就是说会循环 4 次，我们看下下面转换为 CSS 的代码：

```css
.box-4 {
  font-weight: 400;
}

.box-3 {
  font-weight: 300;
}

.box-2 {
  font-weight: 200;
}

.box-1 {
  font-weight: 100;
}
```

@while 指令可以让你很方便的控制循环次数，在实际应用中也是非常有用的！

## 7.实战经验

在实际项目中应用 Sass 控制指令的地方还是蛮多的，这里我说一个在我的项目中的应用。我的项目中有个需求是将视口分为 12 等份，然后根据不同的 class 类名来为其宽度设置不同的百分比，这很像其他 UI 库中的栅格系统，我们是这样在项目中实现的：

```scss
@for $i from 0 through 12 {
  .width-#{$i} {
    width: (1 / 12 * $i) * 100%;
  }
}
```

上面这几行代码就实现了我的需求，我需要有 .width-0 到 .width-12 的选择器，同时它们的样式分别是对应的百分比，我直接做了一个从 0 到 12 的循环，然后在其循环体中动态生成 class 和样式，它转换为 CSS 代码如下：

```css
.width-0 {
  width: 0%;
}

.width-1 {
  width: 8.3333333333%;
}

.width-2 {
  width: 16.6666666667%;
}

.width-3 {
  width: 25%;
}

.width-4 {
  width: 33.3333333333%;
}

.width-5 {
  width: 41.6666666667%;
}

.width-6 {
  width: 50%;
}

.width-7 {
  width: 58.3333333333%;
}

.width-8 {
  width: 66.6666666667%;
}

.width-9 {
  width: 75%;
}

.width-10 {
  width: 83.3333333333%;
}

.width-11 {
  width: 91.6666666667%;
}

.width-12 {
  width: 100%;
}
```

从上面这个示例中是不是可以看出使用控制指令来实现一些需求很方便，这样可以省去你编写大量 CSS 代码的工作，而且计算宽度也仅仅需要设置好公式即可，在我们的项目中有很多类似的用法，至于 @if 指令一般会在函数中做判断来使用。

## 8.小结

本节内容我们讲解了 Sass 控制指令，它是非常常用的，在 Sass 中有四种控制指令，它们分别是：

- @if 指令
- @each 指令
- @for 指令
- @while 指令

趁热打铁，快来回忆一下这几个指令都是干嘛的：

![image-20220824230811481](https://i0.hdslb.com/bfs/album/ab11f4161886f8473f13b11d13628494a01a6e13.png)

记住它们并多加练习，控制指令是非常好用的，它可以让你避免编写过多冗余的 CSS 代码，在项目中也很方便维护。控制指令是在 Sass 进阶中必不可少的知识！