# 04 【CSS选择器 】

## 1.CSS选择器的作用

选择器就是根据不同的需求把不同的标签选出来，这就是选择器的作用，简单来说，就是：选择标签用的。

```css
h1 {
	color: red;
	font-size: 25px;
}
```

以上 CSS 做了两件事：

- 找到所有的 h1 标签。（选对人）
- 设置这些标签的样式：颜色为红色、字体大小为 25 像素。（做对事）

## 2.选择器的分类

在 CSS 中，可以根据选择器的类型把选择器分为：`基础选择器` 和 `复合选择器`，复合选择器是建立在基础选择器之上，对基础选择器进行**组合形成**的。

- 基础选择器是由 `单个` 选择器组成的
- 基础选择器又包括：`标签选择器`、`类选择器`、`id 选择器`、`通配符选择器`
- 复合选择器可以更准确、更高效的选择目标元素（标签）
- 复合选择器是由两个或多个基础选择器，通过不同的方式组合而成的
- 常用的复合选择器包括：**后代选择器**、**子选择器**、**并集选择器**、**伪类选择器**等



## 3.标签选择器

`标签选择器`（元素选择器）是指用 HTML 标签名称作为选择器，按标签名称分类，为页面中某一类标签指定统一的 CSS 样式。

**语法：**

```css
标签名 {
	属性1: 属性值1;
	属性2: 属性值2;
	属性3: 属性值3;
	...
}
```

**作用：**

标签选择器可以把某一类标签全部选择出来，比如所有的 `<div>` 标签和所有的 `<span>` 标签。

**优点：**

能快速为页面中同类型的标签统一设置样式。

**缺点：**

不能设计差异化样式，只能选择全部的当前标签。

## 4.类选择器

如果想要差异化选择不同的标签，单独选一个或者某几个标签，可以使用 `类选择器` 。

**CSS 语法：**

```css
.类名 {
	属性1: 属性值1;
	...
}
```

例如：将所有拥有 red 类的 HTML 元素均设置为红色。

```css
.red {
	color: red;
}
```

**HTML 语法：**

```html
<div class="red">变红色</div>
```

类选择器在 HTML 中以 class 属性表示，在 CSS 中，类选择器以一个 `.` 号显示。

**注意：**

- 类选择器使用 `.`（英文点号）进行标识，后面紧跟类名（自定义，我们自己命名的）
- 可以理解为给这个标签起了一个别名来表示
- 长名称或词组可以使用**中横线** `-` 来为类命名
- 不能使用已有的关键字作为类名
- 不要使用纯数字、中文等命名，尽量使用英文字母来表示
- 命名要有意义，尽量使别人一眼就知道这个类名的目的（**可读性第一，长度第二，推荐使用英语，如果是使用拼音请使用全拼**）
- 命名规范：见附件（Web前端开发规范手册.pdf）

**类选择器——多类名**

我们可以给一个标签指定多个类名，从而达到更多的选择目的，这些类名都可以选出这个标签，简单理解就是一个标签有多个名字。

- 在标签 class 属性中写多个类名
- 多个类名中间必须用 `空格` 分开
- 这个标签就可以分别具有这些类名的样式

```html
    <style type="text/css">
        /* 一个标签可以运用多个类选择器，之间用空格隔开 */
        .red {
            color: red;
        }

        .font35 {
            font-size: 35px;
        }
    </style>
    <div class="red font35">dselegent</div>
```

**多类名开发中使用场景**

- 可以把一些标签元素相同的样式（共同的部分）放到一个类里面
- 这些标签都可以调用这个公共的类，然后再调用自己独有的类
- 从而节省 CSS 代码，统一修改也非常方便（**模块化、可重用化**）

```html
    <style type="text/css">
        /* 类选择器最大的优势在于：复用 */
        .box {
            width: 100px;
            height: 100px;
        }

        .red {
            background-color: red;
        }

        .green {
            background-color: green;
        }
    </style>
    <div class="box red"></div>
    <div class="box green"></div>
    <div class="box red"></div>
```

多类名选择器在后期布局比较复杂的情况下，是使用得较多的。

## 5.id选择器

id 选择器可以为标有特定 id 的 HTML 元素指定特定的样式。

HTML 元素以 id 属性来设置 id 选择器，CSS 中 id 选择器以 `#` 来定义。

**语法：**

```css
#id名 {
	属性1: 属性值1;
	...
}
```

**例如：**将 id 为 nav 元素中的内容设置为红色。

```css
#nav {
	color: red;
}
```

**注意：**id 属性只能在每个 HTML 文档中出现一次。

**口诀：**样式 `#` 定义，结构 `id` 调用，只能调用一次，别人切勿使用。

**id 选择器和类选择器的区别：**

- 类选择器 (class) 好比人的名字，一个人可以有多个名字，同时一个名字也可以被多个人使用
- id 选择器好比人的身份证号码，全中国是唯一的，不可重复（同一个 id 选择器只能调用一次）
- id 选择器和类选择器最大的不同在于使用次数上
- 类选择器在修改样式中用的最多，id 选择器一般用于页面唯一性的元素上，经常和 JavaScript 搭配使用

```html
    <style type="text/css">
        #pink {
            color: pink;
        }
    </style>
    <div id="pink">dselegent</div>
```

再次强调：**同一 id 只能定义一次，同一 id 选择器也只能调用一次！**（对于 CSS 修改样式来说，最好使用类选择器，id 选择器主要与后面的 JS 搭配使用）。

## 6.通配符选择器

在 CSS 中，通配符选择器使用 `*` 定义，它表示选取页面中**所有元素**（标签）。

**语法：**

```css
* {
	属性1: 属性值1;
	...
}
```

- 通配符选择器不需要调用，自动就给所有的元素使用样式
- 特殊情况才使用，后面讲解使用场景

```css
* {
	margin: 0;
	padding: 0;
}
```

## 7.基础选择器总结

| 基础选择器   | 作用                            | 特点                                                  | 使用情况       | 用法                 |
| ------------ | ------------------------------- | ----------------------------------------------------- | -------------- | -------------------- |
| 标签选择器   | 可以选出所有相同的标签，比如：p | 不能差异化选择                                        | 较多           | `p {color: red;}`    |
| 类选择器     | 可以选出 1 个或者 多个 标签     | 可以根据需求选择                                      | 非常多         | `.nav {color: red;}` |
| id 选择器    | 一次只能选择 1 个标签           | ID 属性只能在每个 HTML 文档中出现一次，也只能调用一次 | 一般和 js 搭配 | `#nav {color: red;}` |
| 通配符选择器 | 选择所有的标签                  | 选择的太多，有部分不需要                              | 特殊情况使用   | `* {color: red;}`    |

- 每个基础选择器都有使用场景，都需要掌握
- 如果是修改样式，类选择器是使用最多的

## 8.关系选择器

- 父元素：直接包含子元素的元素叫做父元素

- 子元素：直接被父元素包含的元素是子元素

- 祖先元素：直接或间接包含后代元素的元素叫做祖先元素；一个元素的父元素也是它的祖先元素

- 后代元素：直接或间接被祖先元素包含的元素叫做后代元素；子元素也是后代元素

- 兄弟元素：拥有相同父元素的元素是兄弟元素

### 8.1 后代选择器

`后代选择器` 又称为 `包含选择器`，可以选择父元素里面子元素。其写法就是把外层标签写在前面，内层标签写在后面，中间用空格分隔。当标签发生嵌套时，内层标签就成为外层标签的后代。

**语法：**

```css
元素1 元素2 { 样式声明 }
```

上述语法表示选择 元素 1 里面的**所有**元素 2 （后代元素）。 

**例如：**

```css
ul li { 样式声明 } 		/* 选择 ul 里面所有的 li 标签元素 */
```

- 元素1 和 元素2 中间用 **空格** 隔开
- 元素1 是父级，元素2 是子级，最终选择的是 元素2，即：元素1 是不会生效样式的
- 元素2 可以是儿子，也可以是孙子等，只要是 元素1 的后代即可
- 元素1 和 元素2 **可以是任意基础选择器**

```html
    <style>
        /* 把 ol 里面的小 li 选出来改为 pink */
        ol li {
            color: pink;
        }

        /* 把 ol 里面的小 a 选出来改为 red */
        ol a {
            color: red;
        }

        /* 把 ul 里面的小 li 选出来改为 green */
        ul li {
            color: green;
        }

        /* 把 nav 类中的 li 里面的 a 选出来改为 yellow */
        .nav li a {
            color: yellow;
        }
    </style>
    
    <ol>
        <li>我是 ol 的孩子</li>
        <li>我是 ol 的孩子</li>
        <li>我是 ol 的孩子</li>
        <li><a href="#">我是 ol 的孙子</a></li>
    </ol>
    <ul>
        <li>我是 ul 的孩子</li>
        <li>我是 ul 的孩子</li>
        <li>我是 ul 的孩子</li>
        <li><a href="#">我是 ul 的孙子，但是我不会变化</a></li>
    </ul>
    <ul class="nav">
        <li><a href="#">我偏要变色！并且只能我一个人色……</a></li>
    </ul>
```

### 8.2 子选择器

子元素选择器（子选择器）只能选择作为某元素的**最近一级子元素**，简单理解就是选亲儿子元素。

注意：是**最近一级而并非最近一个**！

**语法：**

```css
元素1>元素2 { 样式声明 }
```

上述语法表示选择元素1 里面的所有直接后代（子元素）元素2。

**例如：**

```css
div>p { 样式声明 } 	/* 选择 div 里面所有最近一级 p 标签元素 */
```

- 元素1 和 元素2 中间用 **大于号** 隔开
- 元素1 是父级，元素2 是子级，最终选择的是元素2，即元素1 是不会生效样式的
- 元素2 **必须是亲儿子，其孙子、重孙之类都不归他管**，你也可以叫：亲儿子选择器

```html
    <style>
        .nav>a {
            color: red;
        }
    </style>

    <div class="nav">
        <a href="#">我是儿子1</a>
        <p>
            <a href="#">我是孙子1</a>
            <a href="#">我是孙子2</a>
        </p>
        <a href="#">我是儿子2</a>
    </div>
```

### 8.3 兄弟元素选择器

- 作用：选择下一个兄弟

- 语法：`前一个 + 下一个` `前一个 + 下一组`

- 例子1：`A1 + A2`

- 例子2: `A1 ~ An`

```css
/* 选择下一个紧跟着的兄弟，中间不能有别的元素相隔 */
p + span{
    color: red;
}

/* 选择下边所有的兄弟*/
p ~ span{
    color: red;
}
```

## 9.复合选择器

### 9.1 并集选择器

`并集选择器` 可以选择多组标签，同时为他们定义相同的样式，通常用于**集体声明**。
`并集选择器` 是各选择器通过**英文逗号** `,` 连接而成，任何形式的选择器都可以作为并集选择器的一部分。

**语法：**

```css
元素1, 元素2, 元素3 { 样式声明 }
```

```css
元素1,
元素2,
元素3 {
    样式声明
}
/* 推荐写法，编码风格 */
```

上述语法表示选择元素1、元素2 和 元素3。

**例如：**

```css
ul, div { 样式声明 }		 /* 选择 ul 和 div标签元素 */
```

- 元素1 和 元素2 中间用逗号隔开（最后一个不加逗号）
- 逗号可以理解为和的意思
- 并集选择器通常用于集体声明

```html
    <style>
        /* 要求1：请把熊大和熊二改为粉色 */
        /* div,
        p {
            color: pink;
        } */

        /* 要求2：请把熊大和熊二改为红色，还有小猪一家改为粉色 */
        div,p,.pig li {
            color: pink;
        }
        /* 语法规范：并集选择器通常竖着写 */
    </style>

    <div>熊大</div>
    <p>熊二</p>
    <span>光头强</span>
    <ul class="pig">
        <li>小猪佩奇</li>
        <li>猪爸爸</li>
        <li>猪妈妈</li>
    </ul>
```

### 9.2 交集选择器

- 作用：选中同时复合多个条件的元素

- 语法：`选择器1选择器2选择器3选择器n{}`

- 注意点：交集选择器中如果有元素选择器，必须使用元素选择器开头

```css
div.red{
    font-size: 30px;
}

.a.b.c{
    color: blue;
}
```

## 10.属性选择器

属性选择器可以根据元素特定属性来选择元素。这样就可以不用借助于类或者 id 选择器。

- 作用：根据元素的属性值选中一组元素

- 语法1：`[属性名]` 选择含有指定属性的元素

- 语法2：`[属性名=属性值]` 选择含有指定属性和属性值的元素

- 语法3：`[属性名^=属性值]` 选择属性值以指定值开头的元素

- 语法4：`[属性名$=属性值]` 选择属性值以指定值结尾的元素

- 语法5：`[属性名*=属性值]` 选择属性值中含有某值的元素

- 例子：`p[title]{}` `p[title=e]{}` `p[title^=e]{}` `p[title$=e]{}` `p[title*=e]{}`

注意：类选择器、属性选择器、伪类选择器，权重为 10。

```css
p[title]{
    color: orange;
}
p[title=e]{
    color: orange;
}
p[title^=e]{
    color: orange;
}
p[title$=e]{
    color: orange;
}
p[title*=e]{
    color: orange;
}
```

## 11.伪类选择器

### 11.1 结构伪类选择器

`伪类选择器` 用于**向某些选择器添加特殊的效果**，比如：给链接添加特殊效果（链接伪类），或选择第 n 个元素（结构伪类）。
`伪类选择器` 书写最大的特点是用**冒号** `:` 表示，比如：`:hover`、`:first-child`。 
因为伪类选择器很多，比如：`链接伪类`、`结构伪类` 等，所以这里先讲解常用的链接伪类选择器。

> 伪类的由来：因为在页面中并没有这个真实存在的类，所以称为 “伪类”。
>
> 伪类（不存在的类，特殊的类）
>
> 伪类用来描述一个元素的特殊状态，比如：第一个子元素、被点击的元素、鼠标移入的元素.…

`nth-child(n)` 选择某个父元素的一个或多个特定的子元素（重点）。

- n 可以是数字，关键字和公式
- n 如果是数字，就是选择第 n 个子元素，里面数字从 1 开始……
- n 可以是关键字：even 偶数，odd 奇数
- n 可以是公式：常见的公式如下（如果 n 是公式，则从 n = 0 开始计算，但是第 0 个元素和超出了元素的个数会被忽略）

| 公式       | 取值                               |
| ---------- | ---------------------------------- |
| `n`        | 第n个，n的范围0到正无穷            |
| `2n/even`  | 偶数（2、4、6、……）                |
| `2n+1/odd` | 奇数（1、3、5、……）                |
| `5n`       | 5   10   15...                     |
| `n+5`      | 从第 5 个开始（包含第 5 个）到最后 |
| `-n+5`     | 前 5 个（包含第 5 个）             |

结构伪类选择器主要根据文档结构来选择元素，常用于根据父级来选择其子元素。


| 选择器             | 简介                                     |
| ------------------ | ---------------------------------------- |
| `E:first-child`    | 匹配父元素中的第一个子元素 E             |
| `E:last-child`     | 匹配父元素中最后一个 E 元素              |
| `E:nth-child(n)`   | 匹配父元素中的第 n 个子元素 E            |
| `E:first-of-type`  | 指定类型 E 的第一个                      |
| `E:last-of-type`   | 指定类型 E 的最后一个                    |
| `E:nth-of-type(n)` | 指定类型 E 的第 n 个                     |
| `:not()`           | 否定伪类，将符合条件的元素从选择器中去除 |

**区别：**

1. nth-child 对父元素里面所有孩子排序选择（序号是固定的） 先找到第 n 个孩子，然后看看是否和 E 匹配
2. nth-of-type 对父元素里面指定子元素进行排序选择。 先去匹配 E，然后再根据 E 找第 n 个孩子

**小结：**

- 结构伪类选择器一般用于选择父级里面的第几个孩子
- **nth-child 对父元素里面所有孩子排序选择（序号是固定的） 先找到第 n 个孩子，然后看看是否和 E 匹配**
- **nth-of-type 对父元素里面指定子元素进行排序选择。 先去匹配 E，然后再根据 E 找第 n 个孩子**
- **若父元素内都是同一种标签（如：列表），优先用 nth-child，否则就只能使用 nth-of-type**
- 类选择器、属性选择器、伪类选择器，权重为 10

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS3新增结构伪类选择器</title>
    <style>
        /* 1. 选择 ul 里面的第一个孩子 小 li */
        ul li:first-child {
            background-color: pink;
        }

        /* 2. 选择 ul 里面的最后一个孩子 小 li */
        ul li:last-child {
            background-color: pink;
        }

        /* 3. 选择 ul 里面的第 2 个孩子 小 li */
        ul li:nth-child(2) {
            background-color: skyblue;
        }

        /* 3. 选择 ul 里面的第 6 个孩子 小 li */
        ul li:nth-child(6) {
            background-color: skyblue;
        }
    </style>
</head>
<body>
<ul>
    <li>我是第1个孩子</li>
    <li>我是第2个孩子</li>
    <li>我是第3个孩子</li>
    <li>我是第4个孩子</li>
    <li>我是第5个孩子</li>
    <li>我是第6个孩子</li>
    <li>我是第7个孩子</li>
    <li>我是第8个孩子</li>
</ul>
</body>
</html>
```

![](https://i0.hdslb.com/bfs/album/5fea9d5123c08e3f5af49f384ca5e2fe605f7248.png)

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS3新增结构伪类选择器-nth-child</title>
    <style>
        /* 1.把所有的偶数 even 的孩子选出来 */
        ul li:nth-child(even) {
            background-color: #ccc;
        }

        /* 2.把所有的奇数 odd 的孩子选出来 */
        ul li:nth-child(odd) {
            background-color: gray;
        }

        /* 3.nth-child(n) 从 0 开始每次加 1 往后面计算，这里面必须是 n，不能是其他的字母，此处选择了所有的孩子 */
        /* ol li:nth-child(n) {*/
        /*    background-color: pink;*/
        /*}*/
        /* 4.nth-child(2n) 母选择了所有的偶数孩子 等价于 even */
        /*ol li:nth-child(2n) {*/
        /*    background-color: pink;*/
        /*}*/
        /* 5.nth-child(2n+1) 母选择了所有的奇数孩子 等价于 odd */
        /*ol li:nth-child(2n+1) {*/
        /*    background-color: skyblue;*/
        /*} */
        /* 6.从第 3 个开始（包含第 3 个）到最后 */
        /*ol li:nth-child(n+3) {*/
        /*    background-color: pink;*/
        /*} */
        /*7.前 3 个（包含第 3 个）*/
        ol li:nth-child(-n+3) {
            background-color: pink;
        }
    </style>
</head>

<body>
<ul>
    <li>我是第1个孩子</li>
    <li>我是第2个孩子</li>
    <li>我是第3个孩子</li>
    <li>我是第4个孩子</li>
    <li>我是第5个孩子</li>
    <li>我是第6个孩子</li>
    <li>我是第7个孩子</li>
    <li>我是第8个孩子</li>
</ul>
<ol>
    <li>我是第1个孩子</li>
    <li>我是第2个孩子</li>
    <li>我是第3个孩子</li>
    <li>我是第4个孩子</li>
    <li>我是第5个孩子</li>
    <li>我是第6个孩子</li>
    <li>我是第7个孩子</li>
    <li>我是第8个孩子</li>
</ol>
</body>

</html>
```

![](https://i0.hdslb.com/bfs/album/6174eac476411043231ada256b3ba0d40d08c084.png)

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS3新增选择器nth-type-of</title>
    <style>
        ul li:first-of-type {
            background-color: pink;
        }

        ul li:last-of-type {
            background-color: pink;
        }

        ul li:nth-of-type(even) {
            background-color: skyblue;
        }

        /* nth-child 会把所有的盒子都排列序号 */
        /* 执行的时候首先看 :nth-child(1) 之后回去看 前面 div */
        /* 所以此处先排序：*/
        /* 1号：<p>光头强</p> */
        /* 2号：<div>熊大</div> */
        /* 3号：<div>熊二</div> */
        /* 再回过头看，此时会发现，1号并不是 div，所以不生效！*/

        section div:nth-child(1) {
            background-color: red;	/* 不生效 */
        }

        /* nth-of-type 会把指定元素的盒子排列序号 */
        /* 执行的时候首先看 div 指定的元素 之后回去看 :nth-of-type(1) 第几个孩子 */
        section div:nth-of-type(1) {
            background-color: blue;
        }
    </style>
</head>

<body>
<ul>
    <li>我是第1个孩子</li>
    <li>我是第2个孩子</li>
    <li>我是第3个孩子</li>
    <li>我是第4个孩子</li>
    <li>我是第5个孩子</li>
    <li>我是第6个孩子</li>
    <li>我是第7个孩子</li>
    <li>我是第8个孩子</li>
</ul>
<!-- 区别 -->
<section>
    <p>光头强</p>
    <div>熊大</div>
    <div>熊二</div>
</section>
</body>

</html>
```

![](https://i0.hdslb.com/bfs/album/3d9e0ffc43df5d9a5357b11a247ced9734cc1d28.png)

### 11.2 链接的伪类

- :link 未访问的链接	
- :visited 已访问的链接 
  - 由于隐私的原因，所以visited这个伪类只能修改链接的颜色

- :hover 鼠标悬停的链接
- :active 鼠标点击的链接

**链接伪类选择器注意事项：**

- 为了确保生效且不冲突，请按照 `LVHA` 的顺序声明 `:link` `:visited` `:hover` `:active`

- 记忆法：love hate 或者 lv 包包 hao 

- 因为 a 链接在浏览器中具有默认样式，所以我们实际工作中都需要给链接单独指定样式

**链接伪类选择器实际工作开发中的写法：**

```html
    <style>
        /* 注意：要学会触类旁通，这里不只是可以改变颜色，当链接为图片时还可以改图片 */
        /* 1、a:link 把没有点击过的（访问过的）链接选出来 */
        a:link {
            color: #333;
            text-decoration: none;
        }

        /* 2、a:visited 选择点击过的（访问过的）链接选出来 */
        a:visited {
            color: orange;
        }

        /* 3、a:hover 选择鼠标经过（停留）的那个链接 */
        a:hover {
            color: skyblue;
        }

        /* 4、a:active 选择的是我们鼠标正在按下还没有弹起鼠标的那个链接 */
        a:active {
            color: green;
        }
    </style>

<body>
    <a href="#">小猪佩奇</a>
</body>
```

![](https://i0.hdslb.com/bfs/album/f8ace033ed9a4d8be7a5b41a8eb66ce0d04b6cd4.gif)

### 11.3 :focus伪类选择器

`:focus` 伪类选择器用于选取获得焦点的表单元素。

焦点就是光标，一般情况 `<input>` 类表单元素才能获取，因此这个选择器也主要针对于表单元素来说。

```css
input:focus {
	background-color: yellow;
}
```

```html
    <style>
        /* 把获得光标的 input 表单元素选区出来 */
        input:focus {
            background-color: pink;
            color: red;
        }
    </style>

<body>
    <input type="text">
    <input type="text">
    <input type="text">
</body>
```

![](https://i0.hdslb.com/bfs/album/bdbf8e6abaf7a91f2715dc0f07d22d2c4531aab8.gif)

## 12.伪元素选择器

伪元素，表示页面中一些特殊的并不真实的存在的元素（特殊的位置）

伪元素选择器可以帮助我们利用 CSS 创建新标签元素，而不需要 HTML 标签，从而简化 HTML 结构。

伪元素使用`::`开头

- `::first-letter` 表示第一个字母

- `::first-line` 表示第一行

- `::selection` 表示选中的内容

- `::before` 元素的开始

- `::after` 元素的最后

- `::before`和`::after` 必须结合`content`属性来使用

注意：

- before 和 after 创建一个元素，属于行内元素
- 新创建的这个元素在文档树中是找不到的，所以我们称为伪元素
- 语法：`element::before{}`
- before 和 after 必须有 content 属性
- before 在父元素内容的前面创建元素，after 在父元素内容的后面创建元素
- 伪元素选择器和标签选择器一样，权重为 1

```css
/* 段落首字母设置大小为30px */
p::first-letter{
    font-size: 30px;
}

/* 段落第一行设置为黄色背景 */
p::first-line{
    background-color: yellow;
}

/* 段落选中的部分变绿色 */
p::selection{
    background-color: green；
}

/* div前加上内容 */
div::before{
    content: 'BEFORE';
    color: red;
}

/* div后加上内容 */
div::after{
    content: 'AFTER';
    color: blue;
}
```

**（1）伪元素选择器使用场景1：伪元素字体图标**

```css
p::before {
	position: absolute;
	right: 20px;
	top: 10px;
	content: '\e91e';
	font-size: 20px;
}
```

**（2）伪元素选择器使用场景2：仿土豆效果**

```css
/* 当我们鼠标经过了 土豆这个盒子，就让里面 before 遮罩层显示出来 */
.tudou:hover::before {
	/* 而是显示元素 */
    display: block;
}
```

**（3）伪元素选择器使用场景3：伪元素清除浮动**

1. 额外标签法也称为隔墙法，是 W3C 推荐的做法
2. 父级添加 overflow 属性
3. 父级添加 after 伪元素
4. 父级添加双伪元素

额外标签法也称为隔墙法，是 W3C 推荐的做法。

![](https://i0.hdslb.com/bfs/album/09265720ac4e63c237e829ec42cbc1c119572db5.png)

注意：要求这个新的空标签必须是块级元素。

后面两种伪元素清除浮动算是第一种额外标签法的一个升级和优化。

```css
.clearfix:after {
	content: "";			/* 伪元素必须写的属性 */
	display: block;			/* 插入的元素必须是块级 */
	height: 0;				/* 不要看见这个元素 */
	clear: both;			/* 核心代码清除浮动 */
	visibility: hidden;		/* 不要看见这个元素 */
}
```

```css
.clearfix:before,
.clearfix:after {
	content: "";
	display: table;			/* 转换为块级元素并且一行显示 */
}

.clearfix:after {
	clear: both;
}
```

案例：

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>伪元素选择器before和after</title>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: salmon;
        }

        /* div::before 权重是 2 */
        div::before {
            /* 这个 content 是必须要写的 */
            /* display: inline-block; */
            content: '我';
            /* width: 30px;
            height: 40px;
            background-color: purple; */
        }

        div::after {
            content: '小猪佩奇';
        }
    </style>
</head>
<body>
<div>
    是
</div>
</body>
</html>
```

![](https://i0.hdslb.com/bfs/album/0cfc62bea5da97e9bafe09fbf9083900824305ab.gif)

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>伪元素选择器使用场景-字体图标</title>
    <style>
        @font-face {
            font-family: 'icomoon';
            src: url('fonts/icomoon.eot?1lv3na');
            src: url('fonts/icomoon.eot?1lv3na#iefix') format('embedded-opentype'),
            url('fonts/icomoon.ttf?1lv3na') format('truetype'),
            url('fonts/icomoon.woff?1lv3na') format('woff'),
            url('fonts/icomoon.svg?1lv3na#icomoon') format('svg');
            font-weight: normal;
            font-style: normal;
            font-display: block;
        }

        div {
            position: relative;
            width: 200px;
            height: 35px;
            border: 1px solid red;
        }

        div::after {
            position: absolute;
            top: 10px;
            right: 10px;
            font-family: 'icomoon';
            /* content: ''; */
            content: '\e91e';
            color: red;
            font-size: 18px;
        }
    </style>
</head>

<body>
<div></div>
</body>

</html>
```

![](https://i0.hdslb.com/bfs/album/c152c145b963d1c9acc6eacecb65f6f9092714ff.png)

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>伪元素选择器使用场景2-仿土豆网显示隐藏遮罩案例</title>
    <style>
        .tudou {
            position: relative;
            width: 444px;
            height: 320px;
            background-color: pink;
            margin: 30px auto;
        }

        .tudou img {
            width: 100%;
            height: 100%;
        }

        .tudou::before {
            content: '';
            /* 隐藏遮罩层 */
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .4) url(images/arr.png) no-repeat center;
        }

        /* 当我们鼠标经过了土豆这个盒子，就让里面 before 遮罩层显示出来 */
        .tudou:hover::before {
            /* 而是显示元素 */
            display: block;
        }
    </style>
</head>

<body>
<div class="tudou">
    <img src="images/tudou.jpg" alt="">
</div>
</body>

</html>
```

![](https://i0.hdslb.com/bfs/album/27481f549efbab612d3b823561b69e46deebc1c3.gif)

## 13.复合选择器总结

| 选择器          | 作用                   | 特征             | 使用情况 | 隔开符号及用法                             |
| --------------- | ---------------------- | ---------------- | -------- | ------------------------------------------ |
| 后代选择器      | 用来选择后代元素       | 可以是子孙后代   | 较多     | 符号是空格 `.nav a`                        |
| 子代选择器      | 选择最近一级元素       | 只选亲儿子       | 较少     | 符号是大于 `.nav>p`                        |
| 并集选择器      | 选择某些相同样式的元素 | 可以用于集体声明 | 较多     | 符号是逗号 `.nav`, `.header`               |
| 链接伪类选择器  | 选择不同状态的链接     | 跟链接相关       | 较多     | 重点记住 `a{}` 和 `a:hover` 实际开发的写法 |
| `:focus` 选择器 | 选择获得光标的表单     | 跟表单相关       | 较少     | `input:focus` 记住这个写法                 |

强调：复合选择器的层级写得越细越好（可读性，可维护性，安全性），同时将复合选择器的层级写得越细，可以提前避免大部分的选择器优先级混乱！

