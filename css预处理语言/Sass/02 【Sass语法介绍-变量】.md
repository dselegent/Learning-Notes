# 02 【Sass语法介绍-变量】

sass有两种语法格式Sass(早期的缩进格式：Indented Sass)和SCSS(Sassy CSS)

目前最常用的是SCSS，任何css文件将后缀改为scss，都可以直接使用`Sassy CSS`语法编写。

**所有有效的 CSS 也同样都是有效的 SCSS。**

# Sass语法介绍-变量

## 1.前言

Sass 为 CSS 引入了变量这一功能，在实际项目中使用最普遍的除了 Sass 嵌套 就是 Sass 变量了，你可以把 CSS 的某个**属性值**定义为变量，然后在项目中任何需要它的地方来使用它。本节主要讲解 Sass 变量的主要语法：变量的声明、引用、作用域等，同时还会讲解在实际项目中一般是如何来维护 Sass 变量的。

## 2.什么是 Sass 变量 ?

Sass 简介中提到 Sass是 CSS的扩展语言，变量是 CSS的扩展功能。
举个例子，假如我们项目中很多地方要设置一个字体颜色为红色，那么我们完全可以把这个颜色抽出来作为一个**变量**，然后在需要设置字体颜色的地方引用这个变量。这样有一个好处就是，假如产品大大说要修改所有字体颜色的时候，我们就不需要每处都去修改了，直接更改变量的值就 OK 了，我们用 Sass 代码来直观的感受下：

```scss
$variable: red;

.title {
  color: $variable;
}
h1 {
  color: $variable;
}
```

可以看到上面的代码，我们定义了 $variable 这个变量，然后在多个元素的样式中使用它，那么变量的值都可以是什么呢？这个一定要记住，变量的值可以是：

- 字符串
- 数字
- 颜色值
- 布尔值
- 列表
- Null 值

下面我们将详细的讲解 Sass 变量的语法。

## 3.使用变量

sass使用`$`符号来标识变量。

变量的作用就是，让你在整个样式表中保存并重用一些信息或数据。

比如存储颜色(color)、字体集，或任何你想重用的CSS值。

### 3.1 变量声明

和css属性的声明（`property declaration`）很像！

如，声明值为 `#F90` 的变量 `$highlight-color`，字体集变量：

```scss
$highlight-color: #F90;
$font-stack: Helvetica, sans-serif;

body {
    font: 100% $font-stack;
    color: $highlight-color;
}
```

输出结果为：

```css
body {
    font: 100% Helvetica, sans-serif;
    color: #F90;
}
```

**变量有作用域，当变量定义在css规则块内，则该变量只能在此规则块内使用。**

### 3.2 变量引用

凡是css属性的标准值（比如说1px或者bold）可存在的地方，就可以使用变量。

css生成时，变量会被它们的值所替代。

```scss
$color:#A34554;

.box {
  width: 300px;
  height: 400px;
  &-left{
    width: 30%;
    color: $color;
  }
}
```

生成css为：

```css
.box {
    width: 300px;
    height: 400px;
}
.box-left{
    width: 30%;
    color: #A34554;
}
```

声明变量时，变量的值也可以引用其他变量，如下 `$highlight-border` 变量中使用了 `$highlight-color` 变量：

```scss
$highlight-color: #F90;
$highlight-border: 1px solid $highlight-color;
.selected {
  border: $highlight-border;
}

//编译后

.selected {
  border: 1px solid #F90;
}
```

### 3.3 变量名中的中横线(`hyphen`)和下划线(`underscore`)

sass的变量名可以使用中划线和下划线，用中划线声明的变量可以使用下划线的方式引用，反之亦然。

也就是，变量名中的中横线和下划线没有区别，两者互通。

比如下面的示例，中横线的`$link-color`，可以通过下划线的`$link_color`引用。

```scss
$link-color: blue;
a {
  color: $link_color;
}

//编译后

a {
  color: blue;
}
```

> 相对，使用中横线更普遍些！

## 4.变量的作用域

从 Sass 3.4.x 版本开始，Sass 中开始有作用域的概念。和 javascript 中的变量类似，Sass 的变量也是有作用域这个概念的，也有全局作用域和局部作用域之分，我们举个例子来看下：

```scss
$main-color: red;
h1 {
  $main-color: green; // 局部变量
  color:$main-color;
}
h2 {
  color:$main-color;
}
```

我们看到在第一行代码我们声明了一个全局变量 $main-color ，在 h1 的样式中我们又声明了一个和全局变量同名的 $main-color ，在 h1 样式中声明的这个 $main-color 就是局部变量，在 h1 的样式中会引用局部变量而不是全局变量，最终转换为 CSS 的代码如下：

```css
h1 {
  color: green;
}

h2 {
  color: red;
}
```

### 4.1 !global 标识符

上面我们讲解了局部变量和全局变量，那么如果我想用局部变量去改变全局变量呢？ Sass 允许使用 **!global** 标识符来设置局部变量为全局，以此来改变局部变量的作用范围，我们还是用上面的代码，来改变局部变量的作用域为全局：

```scss
$main-color: red;
h1 {
  $main-color: green!global;
  color:$main-color;
}
h2 {
  color:$main-color;
}
```

我们来看下，上面这段转换为 CSS 是这样的：

```css
h1 {
  color: green;
}

h2 {
  color: green;
}
```

可以看到我们覆盖掉了全局变量 $main-color 的值 red ，不过请你记住，在大型项目中尽量不要使用这种方式去改变全局变量，这可能会影响到其他页面的样式改变！

### 4.2 !default标识符

一般来说我们反复的声明一个重名变量，那么最后一个声明的变量值会覆盖上面所有的，比如像下面这样：

```scss
$main-color: red;
$main-color: green;
h1 {
  color:$main-color;
}
```

那么最后编译的时候会使用最后一次声明的变量值，也就是 green ，我们看下编译后的代码：

```css
h1 {
  color: green;
}
```

这样就有一个问题，在实际的项目开发中，假如需要你来写一段公共的 Sass 代码给其他开发者使用，那么如果你的代码中声明了 $main-color 这个变量，那么其他开发者在自己页面也声明了 $main-color 这个变量，并且他是在导入你的这段代码之前声明的，那么他的就会被覆盖掉，这是不行的！

所以这里你需要使用 **!default** 标识符，顾名思义，就是默认值，如果这个变量被声明并赋值了，那么就使用声明的值，否则就使用默认值。我们还是用上面的例子来看下：

```scss
$main-color: red; // 假如这个是其他开发者自己声明的
$main-color: green!default; // 假如这个是你的代码片段声明的
h1 {
  color:$main-color;
}
```

那么在最后编译的时候会使用 red 这个变量值，如果其他开发者没有声明这个变量，就会使用 green 这个变量值，我们来看下编译后的效果：

```css
h1 {
  color: red;
}
```

上面我们演示了 !default 标识符的作用，这个在你使用 Sass 开发一个独立的模块的时候，或者使用 Sass 开发一个库来供他人使用的时候，!default 标识符石非常有用的！

## 5.实战经验

上面我们已经讲解了 Sass 变量的语法和使用，那在企业的实际项目中是怎么应用 Sass 变量的呢？这里以一个使用 webpack 搭建的前端项目为例，一般我们都会抽离出 1～n 个文件来专门声明 Sass 变量(抽离出几个文件视项目大小而定)，如下图所示：

![image-20220823183201014](https://i0.hdslb.com/bfs/album/bd416afc39899b1f9c4cee4f63433c1e3fe1ee6d.png)

如上图所示，我们一般会在 styles 目录下新建一个 variables.scss 文件来管理声明的全局变量，我们接着来看下在这个文件中是怎么写的：

![image-20220823183220638](https://i0.hdslb.com/bfs/album/7dae9a402ae3b6eed35a652b1e68bd04da921fb8.png)

我们可以看到，在这个文件中不但声明了很多变量，还对其做了注释，这样就很易于后期的管理，尤其是在多人开发的大型项目中，对整个项目的样式提取出一些全局变量是很有必要的！

## 6.小结

 Sass 变量的使用及语法，主要包括：

- 变量的声明
- 变量的引用
- 变量的作用域

我们还是通过下图来回忆一下本节的内容：

![image-20220823183316776](https://i0.hdslb.com/bfs/album/1cafa46bfec00abd4c1dfd2d5c86ac8bf960bad8.png)

在实际的项目中，Sass 变量的使用频率也是非常高的，不亚于 Sass 嵌套，所以一定要好好掌握这一节的内容，变量的应用会让你更加顺手的去管理项目中的样式！
