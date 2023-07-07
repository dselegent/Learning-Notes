# 03 【布局之Aspect-Ratio Container Box-Decoration-Break Object-Fit Object-Position】

## 1.布局-纵横比（Aspect Ratio）

### 1.1 快速参考

用于控制元素纵横比的实用程序。

| class         | Properties            |
| ------------- | --------------------- |
| aspect-auto   | aspect-ratio: auto;   |
| aspect-square | aspect-ratio: 1 / 1;  |
| aspect-video  | aspect-ratio: 16 / 9; |

### 1.2 基本用法

#### 设置纵横比

使用实用程序设置元素的所需纵横比。`aspect-{ratio}`

```html
    <iframe
      class="w-full aspect-video"
      src="https://player.bilibili.com/player.html?aid=814174829&bvid=BV1qG4y1v7R9&cid=794450776&page=1"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    ></iframe>
```

![image-20220817122611195](https://i0.hdslb.com/bfs/album/578d4ecc4911d01226d372cc2ec2b5a3036e5629.png)

**可以发现宽高比是16:9**

#### 浏览器支持

这些实用程序使用本机 CSS 属性，直到版本 15 才在 Safari 中支持该属性。在Safari 15普及之前，Tailwind的[宽高比](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)插件是一个不错的选择。`aspect-{ratio}``aspect-ratio`

### 1.3 有条件地应用

#### 悬停、焦点和其他状态

Tailwind 允许您使用变体修饰符在不同状态下有条件地应用效用类。例如，使用 仅在悬停时应用该实用程序。`hover:aspect-square``aspect-square`

```html
    <iframe
      class="w-full aspect-video hover:aspect-square"
      src="https://player.bilibili.com/player.html?aid=814174829&bvid=BV1qG4y1v7R9&cid=794450776&page=1"
    ></iframe>
```

有关所有可用状态修饰符的完整列表，请查看 [Hover、Focus 和 Other State](https://tailwind.wyz.xyz/docs/hover-focus-and-other-states) 文档。

**移入后**

![image-20220817122809569](https://i0.hdslb.com/bfs/album/4256d6dd6f4059d8c68f03b983bea56d175b4369.png)

**移入后宽高比变成1:1**

#### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，如响应式断点、深色模式、首选减少运动等。例如，用于仅在中等屏幕尺寸及以上位置应用该实用工具。`md:aspect-square``aspect-square`

```html
    <iframe
      class="w-full aspect-video md:aspect-square"
      src="https://player.bilibili.com/player.html?aid=814174829&bvid=BV1qG4y1v7R9&cid=794450776&page=1"
      scrolling="no"
    ></iframe>
```

**这时在md屏幕以上宽高比为1:1**

![image-20220817122910405](https://i0.hdslb.com/bfs/album/ffa56851b5a4d75c443b1232c27fbe86de65477f.png)

**这时在md屏幕以下宽高比变为我们设置的16:9**

![image-20220817122953088](https://i0.hdslb.com/bfs/album/9c0b47b996148cd2162662ed5c0e0d4dc3339640.png)

若要了解详细信息，请查看有关[响应式设计](https://tailwind.wyz.xyz/docs/responsive-design)、[深色模式](https://tailwind.wyz.xyz/docs/dark-mode)[和其他媒体查询修饰符](https://tailwind.wyz.xyz/docs/hover-focus-and-other-states#media-queries)的文档。

### 1.4 使用自定义值

#### 自定义主题

默认情况下，Tailwind 提供最少的一组实用程序。您可以通过编辑或在文件中自定义这些值。`aspect-ratio``theme.aspectRatio``theme.extend.aspectRatio``tailwind.config.js`

tailwind.config.js

```js
module.exports = {
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
    }
  }
}
```

有关自定义默认主题的详细信息，请参阅[主题自定义](https://tailwind.wyz.xyz/docs/theme#customizing-the-default-theme)文档。

#### 任意值

如果需要使用一次性值，而该值在主题中没有意义，请使用方括号使用任意值动态生成属性。`aspect-ratio`

```html
    <iframe
      class="w-full aspect-[4/3]"
      src="https://player.bilibili.com/player.html?aid=814174829&bvid=BV1qG4y1v7R9&cid=794450776&page=1"
    ></iframe>
```

有关任意值支持的详细信息，请参阅[任意值](https://tailwind.wyz.xyz/docs/adding-custom-styles#using-arbitrary-values)文档。

![image-20220817123524249](https://i0.hdslb.com/bfs/album/e08e1d7871de76f53c36f125d6024003416eef6b.png)

**这时宽高比变成了我们设置的4:3**

## 2.布局-容器（Container）

### 2.1 快速参考

`容器`根据当前断点固定元素宽度的组件。

`container`类设置一个元素的 `max-width` 来匹配当前断点的 `min-width`。`container`对应的尺寸如下：

| 断点           | 属性               |
| -------------- | ------------------ |
| None           | width: 100%;       |
| sm *(640px)*   | max-width: 640px;  |
| md *(768px)*   | max-width: 768px;  |
| lg *(1024px)*  | max-width: 1024px; |
| xl *(1280px)*  | max-width: 1280px; |
| 2xl *(1536px)* | max-width: 1536px; |

> 举个例子：如果现在屏幕宽度是800px（768px-1024px），这时设置了container元素的宽度为768px

### 2.2  使用方法

`container` 类设置一个元素的 `max-width` 来匹配当前断点的 `min-width`。如果您想为一组固定的屏幕尺寸设计，而不是试图适应一个完全流动的视窗，这很有用。

> 注意：Tailwind CSS容器不会自动居中，居中需要使用 `mx-auto` 类

要使一个容器居中，使用 `mx-auto` 功能类：

```html
<div class="container mx-auto bg-pink-500">容器</div>
```

> `mx-auto`其实就是`margin:0 auto;`

要添加水平内边距，请使用 `px-{size}` 功能类：

```html
<div class="container mx-auto px-20 bg-pink-500">容器</div>
```

> `px-20` 实际是添加了 `padding-left:5rem; padding-right:5rem` 这两个样式。也就是说，`px-size`实际添加的 `x` 轴上左右的内边距。

如果您想让您的容器默认居中或包含默认的水平内边距，请看下面的 [自定义选项](https://www.tailwindcss.cn/docs/container#-2)。

### 2.3 响应式变体

该类还包括响应式变体，例如默认情况下，允许您使某些内容仅在某个断点及以上处表现得像容器：`container``md:container`

```html
<!-- Full-width fluid until the `md` breakpoint, then lock to container -->
<div class="md:container md:mx-auto">
  <!-- ... -->
</div>
```

> 意思就是在md屏幕以上才会触发后面的内容

### 2.4 定制

#### 默认居中

默认情况下，要将容器居中，请在配置文件的部分中设置选项：`center``true``theme.container`

`tailwind.config.js`

```js
module.exports = {
  theme: {
    container: {
       // 默认居中，其实就是给个margin:0 auto;
      center: true,
    },
  },
}
```

> 这时设置container类的元素不用写mx-auto也会水平居中了

#### 默认添加水平填充

要默认添加水平填充，请使用配置文件部分中的选项指定所需的填充量：`padding``theme.container`

`tailwind.config.js`

```js
module.exports = {
  theme: {
    container: {
      padding: '2rem',
    },
  },
}
```

如果要为每个断点指定不同的填充量，请使用对象提供值和任何特定于断点的覆盖：`default`

`tailwind.config.js`

```js
module.exports = {
  theme: {
    container: {
      // 设置容器在不同断点的水平内边距，其中DEFAULT其实是宽度小于sm的情况
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
};
```

> 这时设置container类的元素不用写内边距也会有水平内边距了

最后来张效果图：

![image-20220817124518180](https://i0.hdslb.com/bfs/album/dedf508b39c9adf75df0b3e497da3f7815ad6b28.png)

## 3.布局-中断行为样式（Box Decoration Break）

### 3.1 快速参考

- box -- 盒，可以理解为元素盒模型
- decoration -- 装饰，理解为元素样式
- break -- 断行，参考`word-break` ，理解为断行时候的表现

那么，这个属性可以理解为，元素在发生断行时其样式的表现形式。

>  那么，这个属性可以先理解为，元素在发生断行时其样式的表现形式。

可选取值只有两个：

```css
{
    box-decoration-break: slice;   // 默认取值
    box-decoration-break: clone;
}
```

### 3.2 基本用法

使用 和 实用程序可以控制背景、边框、边框图像、框阴影、剪辑页、边距和填充等属性是否应呈现为元素是一个连续片段或不同的块。`box-decoration-slice``box-decoration-clone`

```html
    <span
      class="box-decoration-slice bg-gradient-to-r from-red-500 to-blue-500 text-white px-2 ..."
    >
      Hello
      <br />
      World
    </span>
    <br />
    <span
      class="box-decoration-clone bg-gradient-to-r from-red-500 to-blue-500 text-white px-2 ..."
    >
      Hello
      <br />
      World
    </span>
```

![image-20220817201250976](https://i0.hdslb.com/bfs/album/9e812700a4b6fae4f1cfd5130b3b3daa1911f1ec.png)

分割线上面就是默认值（这里采用强制换行），可以看到我们本来设置的左往右的红蓝渐变，但是因为换行上面变成了红色，下面变成了蓝色，失去了我们的本意。

下面是使用了`box-decoration-clone`后，可以发现尽管换行，我们的渐变色效果依然显示完整。

### 3.3 有条件地应用

#### 悬停、焦点和其他状态

Tailwind 允许您使用变体修饰符在不同状态下有条件地应用效用类。例如，使用 仅在悬停时应用该实用程序。`hover:box-decoration-slice``box-decoration-slice`

```html
<div class="box-decoration-clone hover:box-decoration-slice">
  <!-- ... -->
</div>
```

有关所有可用状态修饰符的完整列表，请查看 [Hover、Focus 和 Other State](https://tailwind.wyz.xyz/docs/hover-focus-and-other-states) 文档。

#### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，如响应式断点、深色模式、首选减少运动等。例如，用于仅在中等屏幕尺寸及以上位置应用该实用工具。`md:box-decoration-slice``box-decoration-slice`

```html
<div class="box-decoration-clone md:box-decoration-slice">
  <!-- ... -->
</div>
```

若要了解详细信息，请查看有关[响应式设计](https://tailwind.wyz.xyz/docs/responsive-design)、[深色模式](https://tailwind.wyz.xyz/docs/dark-mode)[和其他媒体查询修饰符](https://tailwind.wyz.xyz/docs/hover-focus-and-other-states#media-queries)的文档。

## 4.对象拟合(object-fit)

### 4.1 快速参考

`object fit` 类用于调整指定图片或视频大小以适应容器框。用于控制可替换元素的内容如何调整大小的功能类。

| Class             | Properties              |
| ----------------- | ----------------------- |
| object-contain    | object-fit: contain;    |
| object-cover      | object-fit: cover;      |
| object-fill       | object-fit: fill;       |
| object-none       | object-fit: none;       |
| object-scale-down | object-fit: scale-down; |

> 替换元素
> 不是所有元素都叫“替换元素”。在CSS中，“替换元素”指的是：
> 其内容不受CSS视觉格式化模型控制的元素，比如image, 嵌入的文档(iframe之类)或者applet。比如，img元素的内容通常会被其src属性指定的图像替换掉。替换元素通常有其固有的尺寸：一个固有的宽度，一个固有的高度和一个固有的比率。比如一幅位图有固有用绝对单位指定的宽度和高度，从而也有固有的宽高比率。另一方面，其他文档也可能没有固有的尺寸，比如一个空白的html文档。
>
> CSS渲染模型不考虑替换元素内容的渲染。这些替换元素的展现独立于CSS。object, video, textarea, input也是替换元素，audio和canvas在某些特定情形下为替换元素。
>
> 使用CSS的content属性插入的对象是匿名替换元素。
>
> 也就是说，本文的object-position和object-fit只针对替换元素有作用，也就是form表单家族控件系列，老牌劲旅img图片，HTML5新贵video视频等元素（SVG元素不支持，但可以作为src替换内容出现）。

- fill: 中文释义“填充”。默认值。替换内容拉伸填满整个content box, 不保证保持原有的比例。
- contain: 中文释义“包含”。保持原有尺寸比例。保证替换内容尺寸一定可以在容器里面放得下。因此，此参数可能会在容器内留下空白。
- cover: 中文释义“覆盖”。保持原有尺寸比例。保证替换内容尺寸一定大于容器尺寸，宽度和高度至少有一个和容器一致。因此，此参数可能会让替换内容（如图片）部分区域不可见。
- none: 中文释义“无”。保持原有尺寸比例。同时保持替换内容原始尺寸大小。

- scale-down: 中文释义“降低”。就好像依次设置了none或contain, 最终呈现的是尺寸比较小的那个。

> 如果容器不足以完全显示出图片，那么默认会显示中间，下一节对象位置有解释

### 4.2 基本用法

```html
<!DOCTYPE html>
<html lang="en">
  <head>
  </head>
  <body class="text-center">
    <h1 class="text-green-500 text-5xl font-bold">Tailwind CSS Object Fit</h1>
    <b>Tailwind CSS object-contain Class</b>
    <div class="bg-green-700 w-full h-full">
      <img
        class="w-full h-48 object-contain"
        src="https://www.ziruchu.com/uploads/article/20220709/2022070933462.png"
        alt=""
      />
    </div>
    <b>Tailwind CSS object-cover Class</b>
    <div class="bg-green-700 w-full h-full">
      <img
        class="w-full h-48 object-cover"
        src="https://www.ziruchu.com/uploads/article/20220709/2022070933462.png"
        alt=""
      />
    </div>
    <b>Tailwind CSS object-fill Class</b>

    <div class="bg-green-700 w-full h-full">
      <img
        class="w-full h-48 object-fill"
        src="https://www.ziruchu.com/uploads/article/20220709/2022070933462.png"
        alt=""
      />
    </div>
    <b>Tailwind CSS object-none Class</b>

    <div class="bg-green-700 w-full h-full">
      <img
        class="w-full h-48 object-none"
        src="https://www.ziruchu.com/uploads/article/20220709/2022070933462.png"
        alt=""
      />
    </div>
    <b>Tailwind CSS object-scale-down Class</b>

    <div class="bg-green-700 w-full h-full">
      <img
        class="w-full h-48 object-scale-down"
        src="https://www.ziruchu.com/uploads/article/20220709/2022070933462.png"
        alt=""
      />
    </div>
  </body>
</html>
```

**原图**

![image-20220817202138542](https://i0.hdslb.com/bfs/album/54aef9ae10c5146aeaa43aa05da0363a072b7de7.png)

**object-contain**

![image-20220817202205082](https://i0.hdslb.com/bfs/album/b469bd0153fd8047998651b365de3d2734c94907.png)

**object-cover**

![image-20220817202220824](https://i0.hdslb.com/bfs/album/014df2cee86593e7347905346b75b6e7452ce081.png)

**object-fill**

![image-20220817202235113](https://i0.hdslb.com/bfs/album/5a4659010986bb91f24ee92a334ab7f8bb6c30ee.png)

**object-none**

![image-20220817202302432](https://i0.hdslb.com/bfs/album/96dd9b40959a12efa178000481a07850bf75d070.png)

**object-scale-down**

![image-20220817202319287](https://i0.hdslb.com/bfs/album/2acf709ad822e5d6d8f83b7f5b68753d20dd0cae.png)

### 4.3 有条件地应用

#### 悬停、焦点和其他状态

Tailwind 允许您使用变体修饰符在不同状态下有条件地应用效用类。例如，使用 仅在悬停时应用该实用程序。`hover:object-scale-down``object-scale-down`

```html
<img class="object-contain hover:object-scale-down">
```

有关所有可用状态修饰符的完整列表，请查看 [Hover、Focus 和 Other State](https://tailwind.wyz.xyz/docs/hover-focus-and-other-states) 文档。

#### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，如响应式断点、深色模式、首选减少运动等。例如，用于仅在中等屏幕尺寸及以上位置应用该实用工具。`md:object-scale-down``object-scale-down`

```html
<img class="object-contain md:object-scale-down">
```

若要了解详细信息，请查看有关[响应式设计](https://tailwind.wyz.xyz/docs/responsive-design)、[深色模式](https://tailwind.wyz.xyz/docs/dark-mode)[和其他媒体查询修饰符](https://tailwind.wyz.xyz/docs/hover-focus-and-other-states#media-queries)的文档。

## 5.对象位置(object-position)

### 5.1 快速参考

object-position要比object-fit单纯的多，就是控制替换内容位置的。默认值是50% 50%，也就是居中效果，所以，无论上一节object-fit值为那般，图片都是水平垂直居中的。因此，下次要实现尺寸大小不固定图片的垂直居中效果，可以试试object-fit.

与background-position类似，object-position的值类型为`position`类型值。也就是说，CSS3的相对坐标设定样式支持的。

| Class               | Properties                     |
| ------------------- | ------------------------------ |
| object-bottom       | object-position: bottom;       |
| object-center       | object-position: center;       |
| object-left         | object-position: left;         |
| object-left-bottom  | object-position: left bottom;  |
| object-left-top     | object-position: left top;     |
| object-right        | object-position: right;        |
| object-right-bottom | object-position: right bottom; |
| object-right-top    | object-position: right top;    |
| object-top          | object-position: top;          |

- `object-left-top`  定位于左上角
- `object-top` 定位于顶部
- `object-right-top` 定位于右上角
- `object-left` 定位于左边
- `object-center` 居中定位
- `object-right` 定位于右边
- `object-left-bottom` 定位于左下角
- `object-bottom` 底部定位
- `object-right-bottom` 右下角定位

### 5.2 基本用法

```html
<!DOCTYPE html>
<html lang="en">
  <head>
  </head>
  <body>
    <div class="flex max-w-[1184px] mx-auto flex-shrink-0 flex-wrap mt-1 bg-green-500">
      <img
        class="w-96 h-54 object-none object-left-top m-1"
        src="https://www.ziruchu.com/uploads/article/20200910/2020091084447.jpg"
        alt=""
      />
      <img
        class="w-96 h-54 object-none object-top m-1"
        src="https://www.ziruchu.com/uploads/article/20200910/2020091084447.jpg"
        alt=""
      />
      <img
        class="w-96 h-54 object-none object-right-top m-1"
        src="https://www.ziruchu.com/uploads/article/20200910/2020091084447.jpg"
        alt=""
      />
      <img
        class="w-96 h-54 object-none object-left m-1"
        src="https://www.ziruchu.com/uploads/article/20200910/2020091084447.jpg"
        alt=""
      />
      <img
        class="w-96 h-54 object-none object-center m-1"
        src="https://www.ziruchu.com/uploads/article/20200910/2020091084447.jpg"
        alt=""
      />
      <img
        class="w-96 h-54 object-none object-right m-1"
        src="https://www.ziruchu.com/uploads/article/20200910/2020091084447.jpg"
        alt=""
      />

      <img
        class="w-96 h-54 object-none object-left-bottom m-1"
        src="https://www.ziruchu.com/uploads/article/20200910/2020091084447.jpg"
        alt=""
      />
      <img
        class="w-96 h-54 object-none object-bottom m-1"
        src="https://www.ziruchu.com/uploads/article/20200910/2020091084447.jpg"
        alt=""
      />
      <img
        class="w-96 h-54 object-none object-right-bottom m-1"
        src="https://www.ziruchu.com/uploads/article/20200910/2020091084447.jpg"
        alt=""
      />
    </div>
  </body>
</html>
```

![image-20220817202813966](https://i0.hdslb.com/bfs/album/982abb89830005dc4d99349b6651009cb62f2291.png)

这里采用九宫格的方式，应该是比较好理解的。

### 5.3 有条件地应用

#### 悬停、焦点和其他状态

Tailwind 允许您使用变体修饰符在不同状态下有条件地应用效用类。例如，使用 仅在悬停时应用该实用程序。`hover:object-top``object-top`

```html
<img class="object-center hover:object-top" src="...">
```

有关所有可用状态修饰符的完整列表，请查看 [Hover、Focus 和 Other State](https://tailwind.wyz.xyz/docs/hover-focus-and-other-states) 文档。

#### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，如响应式断点、深色模式、首选减少运动等。例如，用于仅在中等屏幕尺寸及以上位置应用该实用工具。`md:object-top``object-top`

```html
<img class="object-center md:object-top" src="...">
```

若要了解详细信息，请查看有关[响应式设计](https://tailwind.wyz.xyz/docs/responsive-design)、[深色模式](https://tailwind.wyz.xyz/docs/dark-mode)[和其他媒体查询修饰符](https://tailwind.wyz.xyz/docs/hover-focus-and-other-states#media-queries)的文档。

