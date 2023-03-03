# 19 【flex布局】

## 1.flex布局体验

### 1.1 传统布局与flex布局

【传统布局】

- 兼容性好
- 布局繁琐

- 局限性，不能在移动端很好的布局

【flex布局】

- 操作方便，布局极为简单，移动端应用很广泛
- PC 端浏览器支持情况较差
- IE11 或更低版本不支持或仅部分支持

建议：

1. 如果是 PC 端页面布局，我们还是建议使用传统布局
2. 如果是移动端或者不考虑兼容性问题的 PC 端页面布局，推荐使用 flex 弹性布局

### 1.2 初体验

**弹性盒**

`flex`（弹性盒、伸缩盒）

- 是`css`中的又一种布局手段，它主要用来代替浮动来完成页面的布局

- `flex`可以使元素具有弹性，让元素可以跟随页面的大小的改变而改变

**弹性容器**

要使用弹性盒，必须先将一个元素设置为弹性容器

我们通过`display` 来设置弹性容器

- `display:flex` 设置为块级弹性容器

- `display:inline-flex` 设置为行内的弹性容器

**弹性元素**

- 弹性容器的子元素是弹性元素（弹性项）

- 弹性元素可以同时是弹性容器

```html
    <style>
        div {
            display: flex;
            width: 80%;
            height: 300px;
            background-color: pink;
        }

        div span {
            /* 弹性布局中：行内盒子的宽高可直接设置了，这也是优于百分比布局的地方之一 */
            /* 免去了浮动的设置，以及对父盒子清除浮动的麻烦 */
            width: 150px;
            height: 100px;
            background-color: black;
            margin-right: 5px;
        }
    </style>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
```

![](https://i0.hdslb.com/bfs/album/35b96b04d3f1a95d5f84db0144a8ed972463d672.png)

**等间距分布**

```css
        div {
            width: 80%;
            justify-content: space-around;
        }
```

![](https://i0.hdslb.com/bfs/album/6d70e5725dcb049a630bd6fbe386fda63e9c53b4.gif)

**平均分为三等分**

```css
        div {
            display: flex;
            width: 80%;
            justify-content: space-around;
        }

        div span {
            /* 弹性布局中：行内盒子的宽高可直接设置了 */
            /* width: 150px; */
            flex: 1;
        }
```

![](https://i0.hdslb.com/bfs/album/d7a57c689b9692c5dccc4131f7c9e105ca63ef0f.gif)

## 2.flex布局原理

flex 是 flexible Box 的缩写，意为 “弹性布局”，用来为盒状模型**提供最大的灵活性**，**任何一个容器都可以指定为 flex 布局**。

- 当我们为父盒子设为 flex 布局以后，子元素的 float（浮动功能）、clear（清除浮动功能）和 vertical-align（垂直居中功能）属性将失效。
- 伸缩布局 = 弹性布局 = 伸缩盒布局 = 弹性盒布局 = flex 布局

采用 flex 布局的元素，称为 flex 容器（flex container），简称 “容器”。它的所有子元素自动成为容器成员，称为 flex 项目（flex item），简称 “项目”。

- 上面的体验中 div 就是 flex 父容器
- 上面的体验中 span 就是子容器 flex 项目
- 子容器可以横向排列也可以纵向排列

【子容器横向排列时的图示】

![](https://i0.hdslb.com/bfs/album/897c0e795aeb8f5d8b881d3dafc7ad954a5a9b97.png)

【总结 flex 布局原理】

**就是通过给父盒子添加 flex 属性，来控制子盒子的位置和排列方式。**

## 3.常见弹性容器属性

以下由 6 个属性是对父元素设置的

- `flex-direction`：设置主轴的方向
- `justify-content`：设置主轴上的子元素排列方式
- `flex-wrap`：设置子元素是否换行
- `flex-flow`：复合属性，相当于同时设置了 flex-direction 和 flex-wrap
- `align-content`：设置侧轴上的子元素的排列方式（多行）
- `align-items`：设置侧轴上的子元素排列方式（单行）

## 4.flex-direction设置主轴的方向

`flex-direction` 指定容器中弹性元素的排列方式

**（1）主轴与侧轴**

在 flex 布局中，是分为主轴和侧轴两个方向，同样的叫法有：行 和 列、x轴 和 y轴

- 默认主轴方向就是 x轴 方向，水平向右
- 默认侧轴方向就是 y轴 方向，水平向下

![](https://i0.hdslb.com/bfs/album/f2d2c9fb7956df15da4cea034930fcc113048e7a.png)

**（2）属性值**

`flex-direction` 属性决定主轴的方向（即：项目的排列方向）

注意：主轴和侧轴是会变化的，就看 flex-direction 设置谁为主轴，剩下的就是侧轴。而我们的子元素是跟着主轴来排列的。

- `row`默认值，弹性元素在容器中水平排列（自左向右）

- `row-reverse` 弹性元素在容器中反向水平排列（自右向左）

- `column` 弹性元素纵向排列（自上向下）

- `column-reverse` 弹性元素反向纵向排列（自下向上）

【案例】

```html
    <style>
        div {
            /* 给父级添加flex属性 */
            display: flex;
            width: 800px;
            height: 300px;
            background-color: pink;
            /* 默认的主轴是 x 轴,那么 y 轴就是侧轴喽 */
            /* 我们的元素是跟着主轴来排列的 */
            flex-direction: row;
            /* 简单了解翻转即可 */
            /* flex-direction: row-reverse; */
            /* 我们可以把我们的主轴设置为 y 轴 那么 x 轴就成了侧轴 */
            /* flex-direction: column; */
        }

        div span {
            width: 150px;
            height: 100px;
            background-color: purple;
        }
    </style>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
```

![](https://i0.hdslb.com/bfs/album/1bff4d080d7437c8bb2dc17c6a38f35df217ca0e.png)

```css
            flex-direction: row-reverse;
```

![](https://i0.hdslb.com/bfs/album/e897fad7623720ddc687c091739aa2d4fee74352.png)

```css
            flex-direction: column;
```

![](https://i0.hdslb.com/bfs/album/8c13a430cea233f2c574e7f49ef3a08339850144.png)

## 5.justify-content设置主轴上的子元素排列方式

`justify-content` 属性定义了项目在主轴上的对齐方式

注意：使用这个属性之前一定要确定好主轴是哪个！

| 属性值          | 说明                                                       |
| --------------- | ---------------------------------------------------------- |
| `flex-start`    | 元素沿着主轴起边排列，如果主轴是 x轴，则从左到右（默认值） |
| `flex-end`      | 元素沿着主轴终边排列                                       |
| `center`        | 在主轴居中对齐（如果主轴是 x轴 则 水平居中）               |
| `space-around`  | 空白分布到元素两侧                                         |
| `space-between` | 先两边贴边再平方剩余空间（重要）                           |
| `space-evenly`  | 空白分布到元素的单侧                                       |

【案例】

 `flex-start` 元素沿着主轴起边排列

```html
    <style>
        div {
            display: flex;
            width: 800px;
            height: 300px;
            background-color: pink;
            /* 默认的主轴是 x轴 row */
            flex-direction: row;
            /* justify-content: 是设置主轴上子元素的排列方式 */
            /* 从头部开始，如果主轴是 x轴，则从左到右（默认值） */
            justify-content: flex-start;
            /* 从尾部开始排列 */
            /* justify-content: flex-end; */
            /* 让我们子元素居中对齐 */
            /* justify-content: center; */
            /* 平分剩余空间 */
            /* justify-content: space-around; */
            /* 先两边贴边，在分配剩余的空间 */
            /* justify-content: space-between; */
        }

        div span {
            width: 150px;
            height: 100px;
            background-color: gray;
        }
    </style>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
    </div>
```

![](https://i0.hdslb.com/bfs/album/ef3457bfc8477bc5b825bb7272ba46fdc7f7b14e.png)

 `flex-end` 元素沿着主轴终边排列

![](https://i0.hdslb.com/bfs/album/51e7f397043eef3e0b4282aecc3bafd7492ad708.png)

 `center` 元素居中排列

![image-20220812122252100](https://i0.hdslb.com/bfs/album/e5abc3d231d6dabd682c4777fc69951cf5729ed7.png) `space-around`  空白分布到元素两侧

![](https://i0.hdslb.com/bfs/album/90eaec58b3e2f2b6a56c6314f4440cc6aec0914d.png)

 `space-between` 先两边贴边再平方剩余空间

![](https://i0.hdslb.com/bfs/album/b7dd454e231a2627f0d7a3beed2ef8b8b1227d86.png)

> **补充**
>
>  `space-evenly` 空白分布到元素的单侧
>
> ![image-20220812105356829](https://i0.hdslb.com/bfs/album/008889e323285a5a8bd055f8c9bc7e17beb6c3d3.png)

> 注意：以上例子并不能根据浏览器窗口大小自动调整子项之间的间距，因为父盒子的宽度是固定死 800px 的，假如我们把父盒子宽度设为 80%，那么就可以有效果了。

`div {width: 800px;}`

![](https://i0.hdslb.com/bfs/album/4c7a2bfc919c4dc0f6113ef7838c97a02153e693.gif)

`div {width: 80%;}`

![](https://i0.hdslb.com/bfs/album/e81b12ef6c8b3c12325ba377894a17f1b3c43173.gif)

`div {width: 80%;}`

`div span {width: 80%;}`

![](https://i0.hdslb.com/bfs/album/186275c836d91572211f12780a4f154ae3145d77.gif)

【以上到下为主轴的案例】

```css
         /* 我们现在的主轴是 y轴 */
         flex-direction: column;
        /* justify-content: 是设置主轴上子元素的排列方式 */
        /* 从头部开始，则从上到下（默认值） */
        justify-content: flex-start;
```

![image-20220812122358520](https://i0.hdslb.com/bfs/album/0b6afe1d08a543f4e61c585b207e527f41d1c584.png)

```css
            /* 我们现在的主轴是 y轴 */
            flex-direction: column;
            /* justify-content: 是设置主轴上子元素的排列方式 */
            /* 从下开始排列 */
            justify-content: flex-end;
```

![](https://i0.hdslb.com/bfs/album/1b3ddbaf1f0d608ddb08ec78acf8116b0ceb8606.png)

```css
            /* 我们现在的主轴是 y轴 */
            flex-direction: column;
            /* justify-content: 是设置主轴上子元素的排列方式 */
            /* 让我们子元素垂直居中对齐 */
            justify-content: center;
```

盒子自动垂直居中的困扰终于解决啦！！！

![](https://i0.hdslb.com/bfs/album/bb005e50536217371f764154f55e6e77aa39426d.png)

```css
            /* 我们现在的主轴是 y轴 */
            flex-direction: column;
            /* justify-content: 是设置主轴上子元素的排列方式 */
            /* 平分剩余空间 */
            justify-content: space-around;
```

![](https://i0.hdslb.com/bfs/album/d567cb6e04e12144a77be96b0b4c5c1aea15038e.png)

```css
            /* 我们现在的主轴是 y轴 */
            flex-direction: column;
            /* justify-content: 是设置主轴上子元素的排列方式 */
            /* 先上下两边贴边，在分配剩余的空间 */
            justify-content: space-between;
```

![](https://i0.hdslb.com/bfs/album/d2cb207e29718ed796592a033c3a65fab834161c.png)

## 6.flex-wrap设置子元素是否换行

`flex-wrap` 设置弹性元素是否在弹性容器中自动换行

| 属性值   | 说明                     |
| -------- | ------------------------ |
| `nowrap` | 默认值，元素不会自动换行 |
| `wrap`   | 元素沿着辅轴方向自动换行 |

【案例】

```html
    <style>
        div {
            display: flex;
            width: 600px;
            height: 400px;
            background-color: pink;
            /* flex布局中，默认的子元素是不换行的， 如果装不开，会缩小子元素的宽度，放到父元素里面  */
            /* flex-wrap: nowrap; */
            /* 自动换行 */
            /* flex-wrap: wrap; */
        }

        div span {
            width: 150px;
            height: 100px;
            background-color: gray;
            color: #fff;
            margin: 10px;
        }
    </style>

    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
    </div>
```

<img src="https://i0.hdslb.com/bfs/album/d37358b55053592cf3ceb174c37e7f72c76854fd.png" alt="image-20220119004923437" style="zoom:50%;" />

```css
            flex-wrap: wrap;
```

<img src="https://i0.hdslb.com/bfs/album/1825de48955b6e4cf496224fa41d0b4a6ddc6969.png" style="zoom:50%;" />

## 7.flex-flow复合属性

`flex-flow` 属性是 flex-direction 和 flex-wrap 属性的复合属性

`flex-flow: row wrap;`

【案例】

```html
    <style>
        div {
            display: flex;
            width: 600px;
            height: 300px;
            background-color: pink;
            /* flex-direction: column;
            flex-wrap: wrap; */
            /* 把设置主轴方向和是否换行（换列）简写 */
            flex-flow: column wrap;
        }

        div span {
            width: 150px;
            height: 100px;
            background-color: gray;
        }
    </style>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
    </div>
```

![](https://i0.hdslb.com/bfs/album/df1cb1d2aeddf3d0d561d4da400d324065127d13.png)

## 8.align-items设置侧轴上的子元素排列方式（单行）

该属性是控制子项在侧轴（默认是 y轴）上的排列方式，在子项为单项（单行）的时候使用。

| 属性值       | 说明                                                       |
| ------------ | ---------------------------------------------------------- |
| `flex-start` | 从上到下                                                   |
| `flex-end`   | 从下到上                                                   |
| `center`     | 挤在一起居中                                               |
| `stretch`    | 拉伸（默认值）注：前提是子盒子没有指定高度，否则没有效果！ |

【案例】

 `flex-start` 元素不会拉伸，沿着辅轴起边对齐

```html
    <style>
        div {
            display: flex;
            width: 800px;
            height: 400px;
            background-color: pink;
            /* 默认的主轴是 x轴 row */
            flex-direction: row;
            justify-content: center;
            /* 设置侧轴：从上到下 */
            align-items: flex-start;
        }

        div span {
            width: 150px;
            height: 100px;
            background-color: gray;
            color: #fff;
            margin: 10px;
        }
    </style>

    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
```

![](https://i0.hdslb.com/bfs/album/2e605b349e3285d7168dd125aba27cea6b530849.png)

 `flex-end` 沿着辅轴的终边对齐

![](https://i0.hdslb.com/bfs/album/0f1b2a03959a9cc2906249c368d29c73197b6db2.png)

 `center` 居中对齐

![](https://i0.hdslb.com/bfs/album/3170da9ea015bcd564d892ef095b877b6bbe9fb8.png)

```html
    <style>
        div {
            display: flex;
            width: 800px;
            height: 400px;
            background-color: pink;
            /* 默认的主轴是 x轴 row */
            flex-direction: row;
            justify-content: center;
            /* 设置侧轴：拉伸（默认） */
            align-items: stretch;
        }

        div span {
            width: 150px;
            /* 拉伸的前提是没有指定高度 */
            /* height: 100px; */
            background-color: gray;
            color: #fff;
            margin: 10px;
        }
    </style>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
```

![](https://i0.hdslb.com/bfs/album/d6c0c1eba75c109f71322feeae31bc8e74b646f1.png)

> align-items 只能统一对侧轴上的子元素排列方式，假如有多行子元素，要分别对不同的行设置不同的排列方式，那么此种方式就无法做了。

## 9.align-content 设置侧轴上的子元素的排列方式（多行）

设置子项在侧轴上的排列方式并且只能用于子项出现 **换行** 的情况（多行），在单行下是没有效果的。

| 属性值          | 说明                                   |
| --------------- | -------------------------------------- |
| `flex-start`    | 在侧轴的头部开始排列                   |
| `flex-end`      | 在侧轴的尾部开始排列                   |
| `center`        | 在侧轴中间显示                         |
| `space-around`  | 子项在侧轴平方剩余空间                 |
| `space-between` | 子项在侧轴先分布在两头，再平分剩余空间 |
| `stretch`       | 行拉伸以占据剩余空间（默认值）         |

【案例】

```html
    <style>
        div {
            display: flex;
            width: 800px;
            height: 400px;
            background-color: pink;
            /* 换行 */
            flex-wrap: wrap;
            /* 因为有了换行，此时我们侧轴上控制子元素的对齐方式我们用 align-content */
            align-content: flex-start;
            /* align-content: center; */
            /* align-content: space-around; */
            /* align-content: space-between; */
            /* align-content: stretch; */
        }

        div span {
            width: 150px;
            height: 100px;
            background-color: gray;
            color: #fff;
            margin: 10px;
        }
    </style>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
    </div>
```

![](https://i0.hdslb.com/bfs/album/64a0439d75ab20ba3028cadf6a202dbfeacf12d5.png)

```css
            align-content: center;
```

![](https://i0.hdslb.com/bfs/album/236869854dc0b30199fbcd3bedd39a7513763483.png)

```css
            align-content: space-around;
```

![](https://i0.hdslb.com/bfs/album/d5ebb96dd5a524a86cf430ee8e16f0e8a80ee90b.png)

```css
            align-content: space-between;
```

![](https://i0.hdslb.com/bfs/album/ebf1d9360330231869e358f269165f2a198436b8.png)

```html
    <style>
        div {
            display: flex;
            width: 800px;
            height: 400px;
            /* 换行 */
            flex-wrap: wrap;
            /* 因为有了换行，此时我们侧轴上控制子元素的对齐方式我们用 align-content */
            align-content: stretch;
        }

        div span {
            width: 150px;
            height: 100px;
            margin: 10px;
        }
    </style>
```

![](https://i0.hdslb.com/bfs/album/183a552be79119aaa913ae68fd3e46546ec5b873.png)

**弹性居中**

```css
justify-content: center;
align-items: center;
```

利用弹性盒对元素进行水平垂直双方向居中

![image-20220812111500820](https://i0.hdslb.com/bfs/album/91bff2646ecca85d0a785579f731df13ac287138.png)

## 10.align-content和align-items区别

- align-items 适用于单行情况下，只有上对齐、下对齐、居中和拉伸
- align-content 适应于换行（多行）的情况下（单行情况下无效），可以设置上对齐、下对齐、居中、拉伸以及平均分配剩余空间等属性值
- 总结就是单行找 align-items 多行找 align-content

![](https://i0.hdslb.com/bfs/album/ff9d3a127b6b9fad056166008f9eb5420eddd506.png)

## 11.常见弹性元素属性

- `flex-grow` 指定弹性元素的伸展系数，默认值为0
- `flex-shrink` 指定弹性元素的收缩系数，默认值为1
- `flex-basis` 指定的是元素在主轴上的基础长度
- `flex` flex-grow、flex-shrink、flex-basis 三个属性的合集
- `order` 决定弹性元素的排列顺序（前后顺序）
- `align-self` 控制子项自己在侧轴的排列方式

## 12.伸展系数

`flex-grow` 指定弹性元素的伸展系数，默认值为0

- 当父元素有多余空间的时，子元素如何伸展

- 父元素的剩余空间，会按照比例进行分配

### 12.1 flex-grow基础

flex-grow 属性定义项目的扩大系数，用于**分配容器的剩余空间**，那么什么是剩余空间呢？

其实非常简单，剩余空间计算方式就是：

```tex
容器大小 - 所有项目的总大小
```

参考如下示例：

![image-20220812112444197](https://i0.hdslb.com/bfs/album/ee070dc47a9c470bf70bd549156266726be8f07d.png)

其中：

```css
1. 每个项目的宽度为50px，3个为150px。
2. 剩余空间为 450px - 150px = 300px。
```

```css
1. 默认为 0 ，即如果容器存在剩余空间，也不放大。
2. flex-grow只能为>=0的数字，项目根据设置的系数进行放大。
```

那么问题就来了：

```tex
项目是如何根据设置的系数分配剩余空间呢？
```

这边涉及到**两个关键公式：**

1）计算将多少剩余空间拿来分配。

```css
公式：剩余空间 * ( 所有项目的flex-grow之和 >= 1 ? 1 : 所有项目的flex-grow之和 ) 。
```

这边用了一个三元表达式，理解不难，公式的意思就是说：

如果 所有项目的flex-grow之和 大于等于1，那么就是所有的剩余空间都拿来分配，否则乘以系数即为要分配的剩余空间。

2）计算每个项目分配到多少剩余空间。

```css
公式：要分配的剩余空间 * ( 单个项目flex-grow / 所有项目的flex-grow之和 )
```

简单的说，就是按照 flex-grow 占比进行分配。

下面我们结合例子进行说明，对这边的计算公式进行理解。

**示例1**，设置项目的flex-grow为1：

有一个div（容器，450px），容器内包含3个div（项目，各50px）。

```css
.item {
	/* 	flex-basis属性定义了项目占据主轴空间（main size）大小。 */
	/* 	这边设置为50px */
	flex-basis: 50px;
	/* flex-grow 属性定义项目的扩大系数 */
	/* 这边设置为1 */
	flex-grow: 1;
}
```

运行效果：

![image-20220812112908755](https://i0.hdslb.com/bfs/album/76811f822d60894dfeee25d9efc74dc4a3e8af89.png)

我们观察到3个项目的宽度都变成了150px，可以看到项目被进行了扩大。

现在套公式看下情况：

1）计算总共要分配多少剩余空间。

```css
要分配的剩余空间
 = 剩余空间 * ( 所有项目的flex-grow之和 >= 1 ? 1 : 所有项目的flex-grow之和 ) 
 = 300px * (3 >= 1 ? 1 : 3)
 = 300px * 1
 = 300px
```

2）计算每个项目分配到多少剩余空间。

因为每个项目flex-grow都为1，所以每个项目分配的剩余空间都一样。

```css
每个项目分配的剩余空间
 = 要分配的剩余空间 * ( 单个项目flex-grow / 所有项目的flex-grow之和 )
 = 300px * ( 1 / 3)
 = 100px
```

每个项目多分配100px，加上自身设置的flex-basis，最终每个项目宽度就为150px了。

**示例2**，设置项目1的flex-grow为1，项目2的flex-grow为2，项目3的flex-grow为3：

我们直接套公式计算：

1）计算总共要分配多少剩余空间。	

```css
要分配的剩余空间
 = 剩余空间 * ( 所有项目的flex-grow之和 >= 1 ? 1 : 所有项目的flex-grow之和 ) 
 = 300px * (6 >= 1 ? 1 : 6)
 = 300px * 1
 = 300px
```

2）计算每个项目分配到多少剩余空间。

因为每个项目flex-grow都不一样，所以每个项目分配的剩余空间要分开计算。

```css
项目1分配的剩余空间
 = 要分配的剩余空间 * ( 项目1flex-grow / 所有项目的flex-grow之和 )
 = 300px * ( 1 / 6)
 = 50px

项目2分配的剩余空间
 = 要分配的剩余空间 * ( 项目2flex-grow / 所有项目的flex-grow之和 )
 = 300px * ( 2 / 6)
 = 100px

项目3分配的剩余空间
 = 要分配的剩余空间 * ( 项目3flex-grow / 所有项目的flex-grow之和 )
 = 300px * ( 3 / 6)
 = 150px 

```

所以最终：项目1宽为100px、项目2宽为150px、项目3宽为200px。

写上代码看看效果：

```css
.item {
	/* 	flex-basis属性定义了项目占据主轴空间（main size）大小。 */
	/* 	这边设置为50px */
	flex-basis: 50px;
}
.item1 {
	flex-grow: 1;
}

.item2 {
	flex-grow: 2;
}

.item3 {
	flex-grow: 3;
}
```

运行效果：

![](https://i0.hdslb.com/bfs/album/345481371c7123424e4403043fcd2d308801d9d2.gif)

观察运行效果，符合预期。

**示例3**：设置项目1的 flex-grow 为 0.1，项目2的 flex-grow 为0.2，项目3的 flex-grow 为 0.3：

这个示例和上例差不多，只是数字变成了小数，并且总和不大于1。

先套公式来计算一下：

1）计算总共要分配多少剩余空间。

```css
要分配的剩余空间
 = 剩余空间 * ( 所有项目的flex-grow之和 >= 1 ? 1 : 所有项目的flex-grow之和 ) 
 = 300px * (0.6 >= 1 ? 1 : 0.6)
 = 300px * 0.6
 = 180px
```

2）计算每个项目分配到多少剩余空间。因为每个项目flex-grow都不一样，所以每个项目分配的剩余空间要分开计算。

```css
项目1分配的剩余空间
 = 要分配的剩余空间 * ( 项目1flex-grow / 所有项目的flex-grow之和 )
 = 180px * ( 0.1 / 0.6)
 = 30px

项目2分配的剩余空间
 = 要分配的剩余空间 * ( 项目2flex-grow / 所有项目的flex-grow之和 )
 = 180px * ( 0.2 / 0.6)
 = 60px

项目3分配的剩余空间
 = 要分配的剩余空间 * ( 项目3flex-grow / 所有项目的flex-grow之和 )
 = 180px * ( 0.3 / 0.6)
 = 90px
```

所以最终：项目1宽为80px、项目2宽为110px、项目3宽为140px。

样式代码如下：

```css
.item {
	/* flex-basis属性定义了项目占据主轴空间（main size）大小。 */
	flex-basis: 50px;
}

.item1 {
	/* flex-grow属性定义项目的放大比例 */
	flex-grow: 0.1;
}

.item2 {
	/* flex-grow属性定义项目的放大比例 */
	flex-grow: 0.2;
}

.item3 {
	/* flex-grow属性定义项目的放大比例 */
	flex-grow: 0.3;
}
```

运行效果如下：

![image-20220812113709146](https://i0.hdslb.com/bfs/album/70cdc6617eeca2b5d9aeea5e96f97c28116d19d8.png)

符合计算预期。

### 12.2 flow-grow应用

flow-grow属性在项目中运用很多，比如页面布局、导航条、分页等。

**实例1**：使用 flex 弹性布局实现如下效果：

![image-20220812113818509](https://i0.hdslb.com/bfs/album/12890ae3e4fe65753139c6c56a63b9b64caa308f.png)

这个其实就是腾讯首页的导航条了，我们模拟实现一下，步骤分为4步：

1）首先先写html标签，标签很简单一个 nav 包含若干 a 标签：

```html
<nav class="container">
	<a class="item" href="#">新闻</a>
	<a class="item" href="#">视频</a>
	<a class="item" href="#">图片</a>
	<a class="item" href="#">军事</a>
	<a class="item" href="#">体育</a>
	<a class="item" href="#">NBA</a>
	<a class="item" href="#">娱乐</a>
	<a class="item" href="#">财经</a>
	<a class="item" href="#">科技</a>
</nav>
```

2）设置基本样式，背景、颜色、边框圆角等：

```css
.container {
	height: 44px;
	background-color: #1479d7;
	border-radius: 3px;
}

.item {
	color: white;
	text-align: center;
	text-decoration: none;
}
```

运行效果：

![image-20220812114128188](https://i0.hdslb.com/bfs/album/434734b1dedd911e790f580db33c20692198d684.png)

3）设置容器为 flex 布局，项目 flex-grow 为1 平分剩余空间：

```css
.container {
	/* 设置子元素的布局为flex布局 */
	display: flex;
}

.item {
	/* 设置项目放大系数 */
	flex-grow: 1;
}
```

运行效果：

![image-20220812114149809](https://i0.hdslb.com/bfs/album/26aa97391cc163a66e6fe14c0d2128f81b56b43b.png)

4）再来一个上下居中即可，flex 弹性布局将容器属性 align-items 设置为 center 即可：

```css
.container {
	/* 设置辅轴上项目居中排列 */
	align-items: center;
}
```

运行效果：

![image-20220812114302213](https://i0.hdslb.com/bfs/album/4647d0bc6d55bac2696290e774e95375980d0c27.png)

至此这个例子就完成了。

和之前使用float相比，**我们尝试改变容器大小，会发现项目也跟着变化，这个就是弹性的意思了**。如下图所示：

![](https://i0.hdslb.com/bfs/album/b1c6285d6655afa9b670eb425c3ec7318aebc31d.gif)

### 3.12.3 总结

1. 容器内未被占用的空间称为剩余空间。
2. flex-grow用于设置项目的放大系数。
3. 项目放大尺寸计算包含两个公式：

1）计算将多少剩余空间拿来分配。

```css
公式：剩余空间 * ( 所有项目的flex-grow之和 >= 1 ? 1 : 所有项目的flex-grow之和 ) 。
```

2）计算每个项目分配到多少剩余空间。

```css
公式：要分配的剩余空间 * ( 单个项目flex-grow / 所有项目的flex-grow之和 )
```

4. flex-grow不是设置具体的尺寸，在弹性布局中应用广泛。

## 13.缩减系数

`flex-shrink` 指定弹性元素的收缩系数，默认值为1

- 当父元素中的空间不足以容纳所有的子元素时，如何对子元素进行收缩

- 缩减系数的计算方式比较复杂，缩减多少是根据 *缩减系数* 和 *元素大小* 来计算

简单的说 flex-grow 用于放大，那么 flex-shrink 就是用于缩小了，两个属性就是反过来，计算方式都类似。放大是因为有剩余空间，缩小就是因为项目的宽度超过容器了，有一个**超出空间**，所以就要进行缩小。

### 13.1 flex-shrink基础

超出空间计算方式：

```
所有项目的总大小 - 容器大小
```

参考如下示例：	

![image-20220812114904538](https://i0.hdslb.com/bfs/album/bf356ffc1aefa7b89271239e21dea1f15cd02dfd.png)

容器宽度为450px，三个项目各为200px，总宽超过容器了，就自动缩小了。不难计算，这里超出的空间就是 **200px \* 3 - 450px = 150px**。

其中：

```css
1. 默认值为1，表示所有项目等比例缩小。
2. 如果为0，那么表示不缩小。
```

缩小的尺寸计算方式和flew-grow类似，涉及到**两个公式：**

1）计算超出空间中多少用来压缩。

```css
公式：超出空间 * ( 所有项目的flex-shrink之和 >= 1 ? 1 : 所有项目的flex-shrink之和 ) 。
```

如果没有超出空间，那么就用压缩了；如果超出空间为150px，所有项目的flex-shrink之和为0.6，那么90px用来压缩。

2）计算每个项目缩小多少空间。

```css
公式：要压缩的空间 * ( 单个项目flex-shrink / 所有项目的flex-shrink之和 )
```

简单的说，就是按照 flex-shrink 占比进行缩小。

下面我们结合例子进行说明，对这边的计算公式进行理解。

示例1，设置项目的 flex-shrink 为0：

接上一篇例子，有一个div（容器，450px），容器内包含3个div（项目，flex-basis 为200px）。

```css
.item {
	/* flex-basis属性定义了项目占据主轴空间（main size）大小。 */
	flex-basis: 200px;
	/* flex-shrink 属性定义项目的缩小系数 */
	flex-shrink: 0;
}
```

> flex-shrink 为0表示不压缩项目。 

![](https://i0.hdslb.com/bfs/album/d1441e028eab5b0b2058baa141d9dc7d17739726.gif)

可以看到item3项目那边超出了容器一截。

**示例2**，接上例，设置项目1、2、3的 flex-shrink 分别为0、1、2：

套公式计算：

1）计算超出空间中多少用来压缩。

```css
要压缩的空间
 = 总超出空间 * ( 所有项目的flex-shrink之和 >= 1 ? 1 : 所有项目的flex-shrink之和 ) 。
 = 150px * ( 3 >= 1 ? 1 : 3)
 = 150px
```

2）计算每个项目缩小多少空间。

```css
项目1压缩的空间
 = 150px * ( 0 / 3 )
 = 0

项目2压缩的空间
 = 150px * ( 1 / 3 )
 = 50px

项目3压缩的空间
 = 150px * ( 2 / 3 )
 = 100px
```

所以最终：项目1宽为200px、项目2宽为150px、项目3宽为100px。

写上代码看看效果：

```css
.item {
	/* flex-basis属性定义了项目占据主轴空间（main size）大小。 */
	flex-basis: 200px;
}
		
.item1 {
	flex-shrink: 0;
}

.item2 {
	flex-shrink: 1;
}

.item3 {
	flex-shrink: 2;
}
```

运行效果：

![](https://i0.hdslb.com/bfs/album/1f278a5da9bb333386bc447a518c094bbe802b2d.gif)

观察运行效果，符合预期。

**示例3**：设置项目1、2、3的 flex-shrink 分别为 0.1、0.2、0.3：

这个示例和上例差不多，只是数字变成了小数，并且总和不大于1。

先套公式来计算一下：

1）计算超出空间中多少用来压缩

```css
要压缩的空间
 = 总超出空间 * ( 所有项目的flex-shrink之和 >= 1 ? 1 : 所有项目的flex-shrink之和 ) 。
 = 150px * ( 0.6 >= 1 ? 1 : 0.6)
 = 90px
```

2）计算每个项目缩小多少空间。

```css
项目1压缩的空间
 = 90px * ( 0.1 / 0.6 )
 = 15px

项目2压缩的空间
 = 90px * ( 0.2 / 0.6 )
 = 30px

项目3压缩的空间
 = 90px * ( 0.3 / 0.6 )
 = 45px
```

所以最终：项目1宽为185x、项目2宽为170px、项目3宽为155px。

样式代码如下：

```css
.item {
	/* flex-basis属性定义了项目占据主轴空间（main size）大小。 */
	flex-basis: 200px;
}

.item1 {
	flex-shrink: .1;
}

.item2 {
	flex-shrink: .2;
}

.item3 {
	flex-shrink: .3;
}
```

运行效果如下：

![](https://i0.hdslb.com/bfs/album/d480f8736cda00b4007bb0317b88db63caaead1e.gif)

符合计算预期。

### 13.2 总结

1. 项目的总大小超出容器部分成为超出空间。
2. flex-shrink用于设置项目的缩小系数。
3. 项目缩小尺寸计算包含两个公式：

1）计算超出空间中多少用来压缩。

```css
公式：总超出空间 * ( 所有项目的flex-shrink之和 >= 1 ? 1 : 所有项目的flex-shrink之和 ) 。
```

2）计算每个项目缩小多少空间。

```css
公式：要压缩的空间 * ( 单个项目flex-shrink / 所有项目的flex-shrink之和 )
```

## 14.基础长度

### 14.1 flex-basis基础

`flex-basis` 指定的是元素在主轴上的基础长度	

- 如果主轴是横向的，则该值指定的就是元素的宽度

- 如果主轴是纵向的，则该值指定的就是元素的高度

- 默认值是`auto`，表示参考元素自身的高度或宽度

- 如果传递了一个具体的数值，则以该值为准

> 在这里可以先理解成 宽（width）属性，用法和 width 的一致，只是优先级比 width 更高。

**示例1** 有一个div（容器），容器内包含3个div（项目），容器设置为 flex 弹性布局。

![image-20220812120114551](https://i0.hdslb.com/bfs/album/c5c50c20f8e56b0c60e27cf55f48898b4fc3e8c1.png)

容器内项目的宽度是根据内容自适应的，这个也就是 flex-basis 默认值为 auto 的含义了。

下面设置项目的宽度为120px：

```css
.item {
	/* flex-basis属性定义了项目占据主轴空间（main size）大小。 */
	flex-basis: 120px;
}
```

运行效果：

![image-20220812120209155](https://i0.hdslb.com/bfs/album/41fd1d59969a50e741dd50a6fa060167d567dbcf.png)

可以看到3个项目的宽度都为120px了，这个就是 flex-basis 的含义了。

**思考：**

```css
如果设置 width: 100px，那么项目实际为多宽呢？
```

解答：因为 flex-basis 属性的优先级比 width 高，所以项目的宽度还是120px。

**思考：**

```css
设置宽度为什么不直接用 width 属性？还要再多一个 flex-basis 属性，不是多此一举吗？
```

**解答（难点）：**

```css
flex-basis 这边并没有说是定义项目的宽度，而是说：占据主轴空间的大小。
因为设置容器属性 flex-direction 为 column或者column-reverse 的时候主轴会变成纵向的（可以想象成数学坐标轴的Y轴）。
在这种情况下，flex-basis 就是设置高，可以理解成 height 属性。
从这个意义上来讲，flex-basis 不全等于 width。
```

### 3.14.2 总结

1. flex-basis 属性设置在项目上的。
2. flex-basis 是设置项目 占据主轴空间的大小、不全等于width。
3. flex-basis 优先级比 width 更高。

## 15.flex属性

前面三节讲了 flex-grow、flex-shrink、flex-basis 三个项目属性。

1. flex-grow 用于设置项目的放大系数。
2. flex-shrink 用于设置项目的缩小系数。
3. flex-basis 用于设置项目在主轴上的空间。

那么项目属性 flex 就很简单了，他其实是3个属性的集中而已，语法格式如下：

```css
.item {
	flex: flex-grow flex-shrink flex-basis | auto | none;
}
```

其中：

```css
1. 这个属性可以独立设置 flex-grow flex-shrink flex-basis 的值，如：1 0 120px。
2. auto 表示：1 1 auto，即等比例扩大或者压缩。
3. none 表示：0 0 auto，即不扩大，也不压缩。
```

> `initial`：`flex: 0 1 auto` 默认值

实务中经常会看到如下样式代码：

```css
.item {
	flex: 1;
}
```

这个其实就是表示 flex-grow 设置为1，各项目等比例放大。

经常用作自适应布局，内容区会自动放大或缩小占满剩余空间。在chrome浏览器上也可以将flex: 1; 

![image-20220812121004252](https://i0.hdslb.com/bfs/album/fa56d10c1397c95cd0311f904e0311cddd0f8fc2.png)

flex: 2;

![image-20220812121016075](https://i0.hdslb.com/bfs/album/83f04bf46dd3e74e8d143e40b2a484680b5880c1.png)

下面有几个flex布局的常用场景：
1、一个元素宽度（或高度）固定，另一个元素宽度（或高度）自适应。

```css
.parent {
	display: flex;
}
// 高度/宽度固定
.son1 {
	width: 200px; //或者 height: 200px;
	flex: none; // 加不加都可 相当于flex: 0 0 auto;
}
// 高度/宽度自适应
.son2 {
	flex: 1;  // flex: 1 1 0%;
}
```

2、子元素都设置flex: 1; 子元素盒子会平分并占满父盒子；

```css
<div class="container">
  <div class="div">我是一个div</div>
  <div class="div">我是一个很多字div</div>
  <div class="div">我是一个更多字而且第三个div</div>
</div>
<style>
.container{
  display: flex;
}
.div{
  border: 1px solid red;
  flex: 1;
}
</style>

```

![image-20220812121143203](https://i0.hdslb.com/bfs/album/ccc36c52a6e507043f403f9e0f2b7999d1f4ea1a.png)

3、那么如果设置 flex: 1 1 auto;呢？ 子元素盒子会根据自己的内容来适配并一起占满整个空间；

```css
<div class="container">
  <div class="div">我是一个div</div>
  <div class="div">我是一个很多字div</div>
  <div class="div">我是一个更多字而且第三个div</div>
</div>
<style>
.container{
  display: flex;
}
.div{
  border: 1px solid red;
  flex: 1 1 auto;
}
</style>
```

![image-20220812121218240](https://i0.hdslb.com/bfs/album/430479d8da8e7d6c5d4b7f43409ec183dbb8cd22.png)

## 16.order属性定义项目的排列顺序

order 用于是设置项目的排序顺序，从小到大排列。

项目的排序默认会按照html的结构进行排序，如果需要定义排序顺序，可以通过order属性定义项目的排序顺序，语法格式如下：

```css
.item {
	/* 整数，默认值为 0，可以为负数 */
	order: <integer>; 
}
```

其中：

```css
order 为整数，可以为负数。
order 默认值为 0。
项目按照 order 值从小到大排列。
```

如果之前有学习过sql，那么对 order 就很熟悉了。因为sql中排序的关键词就是 order by。

**示例1**：有一个div（容器，450px），容器内包含5个div（项目，flex-grow 为1）。

1）和前面章节相比多两个项目，方便看出排序效果。

未设置排序前的效果：

![image-20220812121521482](https://i0.hdslb.com/bfs/album/5854f585e0eec3c54caaff56d26f0fb252203619.png)

2）默认所有的项目 order 值都为0，设置项目1为99，项目3为-1，项目4为-2：

因为项目是按照order从小到大排列，那么正常显示的顺序应该是：

```css
项目4、项目3、项目2、项目5、项目1。
```

写上代码：

```css
.item1 {
	order: 99;
}

.item3 {
	order: -1;
}

.item4 {
	order: -2;
}
```

运行效果：

![image-20220812121638855](https://i0.hdslb.com/bfs/album/c1de61e6423afeceac2cd21cec17dd825ff825fd.png)

## 17.align-self属性

项目属性 align-self，和 align-items 类似。align-items设置在容器上，作用所有的项目。align-self 设置在项目上，作用单个项目

align-self 属性用来设置项目在辅轴方向上的对齐方式，设置在项目上，作用单个项目。
而 align-items 设置在容器上，作用所有的项目。

语法格式如下：

```css
.item {
	align-self: auto(默认值) | flex-start | flex-end | center | baseline | stretch;
}
```

其中：

```css
1. auto 表示继承容器的 align-items 属性。（默认值）
2. flex-start 沿着辅轴方向 起点 对齐（默认值）。
3. flex-end 沿着辅轴方向 结尾 对齐。
4. center 沿着辅轴方向 居中 对齐。
5. baseline 沿着辅轴方向，按照项目内的文字对齐。
6. stretch 沿着辅轴方向自动进行拉升到最大。
```

**示例1**，有一个div（容器，450px），容器内包含3个div（项目，flex-basis 为50px），设置 align-items 为 flex-start，项目1的align-self设置为 flex-end：

```css
.container {
	/* 设置子元素的布局为flex布局 */
	display: flex;
	/* 设置项目交叉轴方向上的对齐方式 */
	/* 作用于所有项目 */
	align-items: flex-start;
}

.item1 {
	/* 设置单个项目交叉轴方向上的对齐方式 */
	/* 作用于单个项目 */
	align-self: flex-end;
}
```

运行效果：

![image-20220812122009637](https://i0.hdslb.com/bfs/album/44d9c79b1f90bba0f99b21d4b5c9cf1654b691d1.png)

**本节总结**

1. align-self 和 align-items 类似，默认值为auto，表示继承 align-items 的属性。
2. align-self 设置在项目上，作用单个项目。align-items设置在容器上，作用所有的项目。