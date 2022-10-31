# 10 【Sass语法介绍-继承】

## 1.前言

在我们编写样式的时候，很多情况下我们几个不同的类会有相同的样式代码，同时这几个类又有其自己的样式代码，这使我们就可以通过 Sass 提供的**继承** @extend 来实现。本节内容我们将讲解 Sass 继承的语法以及继承的多重延伸等等，在 Sass 中继承也是非常好用的功能之一，所以你要重点熟悉 @extend 的用法，下面我们一起来学习它。

## 2.什么是 Sass 继承

继承，我们也叫做代码重用，在 Sass 中支持对样式进行继承。

首先我们看一段代码，看看在 Sass 中的继承是长什么样子的：

```scss
.a {
  width: 10px;
}

.b {
  @extend .a;
  height: 10px;
  color: red;
}
```

从上面的代码中可以看见，我在 .b 的样式中使用 @extend 继承了 .a 的样式，那么这段代码转换为 CSS 如下：

```css
.a, .b {
  width: 10px;
}

.b {
  height: 10px;
  color: red;
}
```

上面的代码中我们看到了 Sass 中继承的样子，它的写法是 @extend selector 也就是**在 @extend 后面跟一个选择器**，表示**继承这个选择器的样式**，下面我们详细讲解下它的语法。

@extend 会包含包含扩展的样式规则，同时在 Sass 中它会**确保复杂的选择器是交错的**，这样无论你的 DOM 元素是如何嵌套的它都能保证正常工作。它还可以**根据实际情况将选择器组合在一起**，可以**更智能的处理选择器以及包含伪类的选择器**。我们举个稍复杂点的例子来看下：

```scss
.a {
  width: 100px;
  height: 200px;
  background-color: orange;
  &:hover {
    background-color: green;
  }
  .link {
    width: 50%;
    height: 50%;
    color: red;
    &:active {
      color: blue;
    }
    i {
      font-size: 18px;
      font-weight: 600;
    }
  }
}

.b {
  @extend .a;
  width: 400px;
  height: 200px;
}
```

我们仔细解读上面的代码，我为 .a 写了一大堆的样式，包括它的子元素以及它的伪类；而 .b 下面有同样的子元素，同样的伪类别，只是宽高不同，那么我直接在 .b 中继承 .a 的样式，它会转换为什么样子的代码呢？它转换为 CSS 的代码如下：

```css
.a, .b {
  width: 100px;
  height: 200px;
  background-color: orange;
}
.a:hover, .b:hover {
  background-color: green;
}
.a .link, .b .link {
  width: 50%;
  height: 50%;
  color: red;
}
.a .link:active, .b .link:active {
  color: blue;
}
.a .link i, .b .link i {
  font-size: 18px;
  font-weight: 600;
}

.b {
  width: 400px;
  height: 200px;
}
```

从上面转换成 CSS 的代码我们可以看出，引用相同样式的部分都以逗号做了分隔，在 CSS 中使用逗号的含义你应该很了解，继承 @extend 就可以为你自动创建这些组合，提取相同的样式，所以如果有选择器使用了相同的样式，请使用继承的方式来实现！

## 3.占位符选择器

在 Sass 中有一种特殊的选择器叫占位符选择器，它的写法像我们写的 id 或 class 选择器一样，只不过**占位符选择器是以 % 开头的**。在 Sass 中你单独使用这种选择器是不会转换为 CSS 的，只能是**通过 @extend 来使用**。

比如说有时候你想编写一个可扩展的样式，然后在各处继承它，你就可以使用占位符选择器，我们结合实际的例子来看下：

```scss
%placeholder {
  box-sizing: border-box;
  border-top: 1px #666666 solid;
  width: 100%;

  &:hover { border: 2px #999999 solid; }
  &:active {color: blue;}
}

.buttons {
  @extend %placeholder;
  color: #4285f4;
}
.btn {
  @extend %placeholder;
}
```

从上面的代码中看到，我通过占位符选择器 %placeholder 定义了一堆样式，然后在其他的样式表中继承它，这个告诉你一个简单的理解方式，占位符选择器你就理解为一个虚拟的选择器，这个名是不会编译到 CSS 中的，最终编译出的选择器名是根据你使用继承的选择器名来定的。上面这段代码会转化为如下的 CSS 代码：

```css
.btn, .buttons {
  box-sizing: border-box;
  border-top: 1px #666666 solid;
  width: 100%;
}
.btn:hover, .buttons:hover {
  border: 2px solid;
}
.btn:active, .buttons:active {
  color: blue;
}

.buttons {
  color: #4285f4;
}
```

从上面的代码中可以看到，编译成 CSS 后 %placeholder 这个选择器不见了，但它的样式被继承了，这就是**占位符选择器结合继承 @extend 的用法**。

## 4.在 @media 中使用 @extend

如果你需要在 @media 中使用继承，一定要注意使用方式！如果你**在外部定义样式**，然后**在 @media 内部继承外部的样式**，Sass 是**会报错**的。我们首先举个**错误的例子**看下：

```scss
.error {
  border: 1px red solid;
  background-color: red;
}

@media screen and (max-width: 600px) {
  .btn-error {
    @extend .error;
  }
}
```

如上面的代码所示，这样的写法在 Sass 中是会报错的，也不会编译成功。 Sass 规定继承只能在给定的媒体上下文中使用，所以**正确的写法**如下：

```scss
@media screen and (max-width: 600px) {
  .error {
    border: 1px red solid;
    background-color: red;
  }
  .btn-error {
    @extend .error;
  }
}
```

上面这个正确的写法将会被编译为如下的 CSS 代码：

```css
@media screen and (max-width: 600px) {
  .error, .btn-error {
    border: 1px red solid;
    background-color: red;
  }
}
```

> 在 @media 中使用继承，一定要注意写法！

## 5.实战经验

在实际的项目中，继承是非常好用的一个功能，不过这个就需要你自己根据需求来判断是否使用，因地制宜，而且尽量把公共的样式提取到一个单独的文件来维护。

还有一个需要注意的是除了继承 @mixin 也是可以封装和复用样式的，那么什么时候使用 @mixin 什么时候使用 @extend 呢？假如你需要使用参数来配置样式的时候，也就是**需要传参数**的时候毫无疑问**使用 @mixin** 。但如果你只是需要复用一部分样式那么还是使用继承会更方便些。

## 6.小结

![image-20220825230233770](https://i0.hdslb.com/bfs/album/cfde0cfe18268eff4c308f08af6ee83d2823bab1.png)

本节内容我们讲解了 Sass 中的继承 @extend 。我们可以使用继承很方便的**复用样式代码**，同时我们也可以使用**占位选择器**配合 @extend 来扩展和复用样式代码，还有一定要**注意在 @media 中使用继承的方式**。记住 Sass 中的 @extend ，它可以让你的样式代码写起来更高效！