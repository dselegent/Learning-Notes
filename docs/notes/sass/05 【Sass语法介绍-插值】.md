# 05 【Sass语法介绍-插值】

## 1.前言

在很多编程器语言中都有插值这个概念，在 Sass 样式表的任何地方几乎都可以使用插值，你可以将这些包裹在 #{} 中来使用，所以记住在 Sass 中使用插值的方式是 **#{}** ，本节我们一起来看一下插值在 Sass 中的使用场景以及它的语法

## 2.什么是插值？

插值也就是可以在**特定的区域**插入一段表达式或者插入一个变量，以此来实现内容动态变换的需求。

> 类似 es6 中的插值表达，插值几乎可以用在任何地方。
> 
> Sass的插值写法为：`#{$variable_name}`。

应用于以下的一些场景：

- 在选择器中使用
- 在属性名中使用
- 在属性值中使用
- 在注释中使用

这里我们暂且详细讲解这五种使用场景，在 Sass 指令和在 Sass 函数中也是可以使用的，不过我们会在其对应的章节再去做讲解。下面我们先看下这四种使用场景。

## 3.在选择器中使用

我们一般在写页面的时候会为 DOM 元素定义一些 class 或 id ，当我们为其写样式的时候会用不同的选择器，那么在选择器中我们可以湿用插值来拼接一些类名等等，我们举个例子来看下：

```scss
$name: item;
.ul-#{$name} { // 使用插值
  width: 200px;
  .li-#{$name} { // 使用插值
    width: 100%;
  }
}
.box-#{$name} { // 使用插值
  height:100px;
  .#{$name} { // 使用插值
    height:100%;
  }
}
```

可以看到上面的代码，我制定了一个 DOM 层级结构，这种结构也是很常见的，可能很多子元素的类名我们都带有 item ，那么我们就可以把它提取为一个变量然后通过在选择器中应用插值来拼接，这样就很方便我们维护，我们想改子元素类名的时候就不需要逐一的去更改了。上面这段 Sasd 代码转换为 CSS 如下：

```css
.ul-item {
  width: 200px;
}
.ul-item .li-item {
  width: 100%;
}

.box-item {
  height: 100px;
}
.box-item .item {
  height: 100%;
}
```

## 4.在属性名中使用

除了在选择器中使用，在 Sass 属性名上也是可以使用插值的，也就是说你在写 CSS 属性名的时候你也是可以使用插值来拼接的，我们举个例子来看下：

```scss
$name: color;
$position: top;
body {
  background-#{$name}: red;
  border-#{$name}: blue;
  padding-#{$position}: 5px;
  margin-#{$position}: 10px;
  #{$position}: 20px;
}
```

可以看到上面的代码中我对 CSS 的属性名使用了插值，可以用这种方式来拼接属性名，不过在实际项目中不是很常用，一般都是在指令里这么运用，就像在前面语法示例中举的例子一样。上面这段代码转换成 CSS 为：

```css
body {
  background-color: red;
  border-color: blue;
  padding-top: 5px;
  margin-top: 10px;
  top: 20px;
}
```

## 5.在属性值中使用

在属性值中使用插值应该算是比较常用的，插值使你在属性值中不仅可以插入值，还可以插入表达式来计算。除此之外我们在前面的运算章节中，不知道你是否还记得，我们对两个变量使用 / 标识符的时候，如果你不想对这两个变量进行除法运算而是进行分隔，那么就可以**使用插值避免运算**。

可以说插值在属性值中的应用很广泛也很实用，我们来举例看下：

```scss
$one: 20px;
$two: 2;
$family: "UaTy";
div {
  margin: $one / $two; // 除法运算
  margin: #{$one} / #{$two}; // 分隔
  font-family: "MyFo #{$family}"; // 带引号的字符串会转换为不带引号
  width: calc(100% - $one * 2 *$two); // calc函数中内容会被当作字符串处理
  width: calc(100% - #{$one * 2 *$two}); // calc函数中插值的内容会进行运算
}
```

上面的代码中我对每一行都进行了标注，你要仔细看下，在属性值中你可以用这些方式来使用插值，上面的代码将会被转换为如下的 CSS 代码：

```css
div {
  margin: 10px;
  margin: 20px/2;
  font-family: "MyFo UaTy";
  background-image: url(http://xxx.xxx.xxx/a.jpg);
  width: calc(100% - $one * 2 *$two);
  width: calc(100% - 80px);
}
```

在属性值中应用插值的场景还蛮多的，你可以这么来使用以提高你的开发效率～

## 6.在注释中使用

在 Sass 中的注释里也是可以使用插值的，而且如果插值中的内容是一段表达式，将会返回表达式的结果，举个例子来看下：

```scss
/* 在注释中使用插值:
 * 2 + 2 = #{2 + 2} */
/* #{9 + 8 * 2} */
```

我们可以在注释中可以这么使用插值，具体什么时候需要使用看你的需求，你需要知道插值的这种使用方式，上面的代码将会被转换为如下的 CSS 代码：

```css
/* 在注释中使用插值:
 * 2 + 2 = 4 */
/* 25 */
```

## 7.实战经验

在我的实际项目中，在函数和指令中使用插值比较多，在后面函数和指令的章节你会看到插值的更多运用，这里我列出在属性值以及选择器中的使用。在我项目中专门维护变量的文件中，定义了如下的几个变量：

```scss
$primary-dom-name: "box"; // 主要父级元素类名
$primary-child-name: "item"; // 主要子元素类名
$public-top: 10px;
$public-bottom: 10px;
$public-margin: 12px;
$public-padding: 14px;
```

在我项目中的导航样式中我使用了上面的这些变量，代码如下：

```scss
.menu-#{$primary-dom-name} {
  width: 200px;
  height: calc(100% - #{40px - $public-bottom});
  background: #cccccc;
  overflow-x:hidden;
  overflow-y: auto;
  padding: $public-padding;
  .li-#{$primary-child-name} {
    width:100%;
    height: 40px;
    margin-bottom: $public-margin;
    text-align:center;
    line-height:40px;
    color: blue;
    .txt-#{$primary-dom-name} {
      border-bottom: 2px solid #999999;
    }
    &:hover {
      background: #999999;
    }
  }
  .logo-#{$primary-dom-name} {
    width: 50px;
  }
}
```

可以看到，当有一天我们因为业务或者什么其他的需要，我们需要**更换类名或者调整间距**的时候，我们直接更改变量值就 ok 了，这样维护起来方便的多！不过一般在公司的项目中，这种公共的样式代码维护一般是由架构组或者专门的人来维护的，如果你不负责维护这些，你一定不要轻易去改动这些代码！

## 8.小结

本节内容我们讲解了 Sass 中的插值以及它的使用场景，一般我们会在如下的场景使用：

- 在函数和指令中使用
- 在选择器中使用
- 在属性名中使用
- 在属性值中使用
- 在注释中使用

我们通过下图来更深地回忆下本节插值的使用场景：

![image-20220823192137071](https://i0.hdslb.com/bfs/album/d6890af7337563009618bc694bf160e233eb9c7a.png)

总体来说插值在 Sass 中用的还是比较多的，使用也比较简单不是那么复杂，后面在函数或指令中、在你项目的 Sass 中看见 **#{}** 要知道这是 Sass 的插值！