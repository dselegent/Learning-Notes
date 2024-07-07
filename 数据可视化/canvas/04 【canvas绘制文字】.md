# 04 【canvas绘制文字】

以下方法和属性用于绘制文本。

- `CanvasRenderingContext2D.fillText()`：在指定位置绘制实心字符。
- `CanvasRenderingContext2D.strokeText()`：在指定位置绘制空心字符。
- `CanvasRenderingContext2D.measureText()`：返回一个 TextMetrics 对象。
- `CanvasRenderingContext2D.font`：指定字型大小和字体，默认值为`10px sans-serif`。
- `CanvasRenderingContext2D.textAlign`：文本的对齐方式，默认值为`start`。
- `CanvasRenderingContext2D.direction`：文本的方向，默认值为`inherit`。
- `CanvasRenderingContext2D.textBaseline`：文本的垂直位置，默认值为`alphabetic`。

`fillText()`方法用来在指定位置绘制实心字符。

```
CanvasRenderingContext2D.fillText(text, x, y [, maxWidth])
```

该方法接受四个参数。

- `text`：所要填充的字符串。
- `x`：文字起点的横坐标，单位像素。
- `y`：文字起点的纵坐标，单位像素。
- `maxWidth`：文本的最大像素宽度。该参数可选，如果省略，则表示宽度没有限制。如果文本实际长度超过这个参数指定的值，那么浏览器将尝试用较小的字体填充。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.fillText('Hello world', 50, 50);
```

![image-20221228155435605](https://i0.hdslb.com/bfs/album/d92318af6e1885ef7f8da3531d85acc9955654c9.png)

上面代码在`(50, 50)`位置写入字符串`Hello world`。

注意，`fillText()`方法不支持文本断行，所有文本一定出现在一行内。如果要生成多行文本，只有调用多次`fillText()`方法。

`strokeText()`方法用来添加空心字符，它的参数与`fillText()`一致。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.font = 'Bold Arial'
ctx.strokeText('Hello world', 50, 50);
```

上面这两种方法绘制的文本，默认都是`10px`大小、`sans-serif`字体，`font`属性可以改变字体设置。该属性的值是一个字符串，使用 CSS 的`font`属性即可。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.font = 'Bold 20px Arial';
ctx.fillText('Hello world', 50, 50);
```

![image-20221228155524549](https://i0.hdslb.com/bfs/album/f74c05ca48173ac9cd42702d303ae271eeed7dc8.png)

`textAlign`属性用来指定文本的对齐方式。它可以取以下几个值。

- `left`：左对齐
- `right`：右对齐
- `center`：居中
- `start`：默认值，起点对齐（从左到右的文本为左对齐，从右到左的文本为右对齐）。
- `end`：结尾对齐（从左到右的文本为右对齐，从右到左的文本为左对齐）。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.font = 'Bold 20px Arial';
ctx.textAlign = 'center';
ctx.fillText('Hello world', 50, 50);
```

![image-20221228155708069](https://i0.hdslb.com/bfs/album/e165cae68a59a00378c9f4ec51bf71a21195503c.png)

`direction`属性指定文本的方向，默认值为`inherit`，表示继承`<canvas>`或`document`的设置。其他值包括`ltr`（从左到右）和`rtl`（从右到左）。

`textBaseline`属性指定文本的垂直位置，可以取以下值。

- `top`：上部对齐（字母的基线是整体上移）。
- `hanging`：悬挂对齐（字母的上沿在一根直线上），适用于印度文和藏文。
- `middle`：中部对齐（字母的中线在一根直线上）。
- `alphabetic`：默认值，表示字母位于字母表的正常位置（四线格的第三根线）。
- `ideographic`：下沿对齐（字母的下沿在一根直线上），使用于东亚文字。
- `bottom`：底部对齐（字母的基线下移）。对于英文字母，这个设置与`ideographic`没有差异。

`measureText()`方法接受一个字符串作为参数，返回一个 TextMetrics 对象，可以从这个对象上面获取参数字符串的信息，目前主要是文本渲染后的宽度（`width`）。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var text1 = ctx.measureText('Hello world');
text1.width // 55.14

ctx.font = 'Bold 20px Arial';
var text2 = ctx.measureText('Hello world');
text2.width // 107.78
```

上面代码中，`10px`大小的字符串`Hello world`，渲染后宽度为`49.46`。放大到`20px`以后，宽度为`107.78`。