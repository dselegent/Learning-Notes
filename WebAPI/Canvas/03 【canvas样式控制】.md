# 03 【canvas样式控制】

## 1.线性

以下的方法和属性控制线条的视觉特征。

- `CanvasRenderingContext2D.lineWidth`：指定线条的宽度，默认为1.0。
- `CanvasRenderingContext2D.lineCap`：指定线条末端的样式，有三个可能的值：`butt`（默认值，末端为矩形）、`round`（末端为圆形）、`square`（末端为突出的矩形，矩形宽度不变，高度为线条宽度的一半）。
- `CanvasRenderingContext2D.lineJoin`：指定线段交点的样式，有三个可能的值：`round`（交点为扇形）、`bevel`（交点为三角形底边）、`miter`（默认值，交点为菱形)。
- `CanvasRenderingContext2D.miterLimit`：指定交点菱形的长度，默认为10。该属性只在`lineJoin`属性的值等于`miter`时有效。
- `CanvasRenderingContext2D.getLineDash()`：返回一个数组，表示虚线里面线段和间距的长度。
- `CanvasRenderingContext2D.setLineDash()`：数组，用于指定虚线里面线段和间距的长度。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(200, 200);
ctx.lineTo(100, 200);

ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.setLineDash([15, 5]);
ctx.stroke();
```

![image-20221227210236975](https://i0.hdslb.com/bfs/album/5e4b689b205057c7862a7669f9ff7fb47cba3fbb.png)

上面代码中，线条的宽度为3，线条的末端和交点都改成圆角，并且设置为虚线。

## 2.渐变色

以下方法用于设置渐变效果和图像填充效果。

- `CanvasRenderingContext2D.createLinearGradient()`：定义线性渐变样式。
- `CanvasRenderingContext2D.createRadialGradient()`：定义辐射渐变样式。
- `CanvasRenderingContext2D.createPattern()`：定义图像填充样式。

`createLinearGradient()`方法按照给定直线，生成线性渐变的样式。

```js
ctx.createLinearGradient(x0, y0, x1, y1)
```

`ctx.createLinearGradient(x0, y0, x1, y1)`方法接受四个参数：`x0`和`y0`是起点的横坐标和纵坐标，`x1`和`y1`是终点的横坐标和纵坐标。通过不同的坐标值，可以生成从上至下、从左到右的渐变等等。

该方法的返回值是一个`CanvasGradient`对象，该对象只有一个`addColorStop()`方向，用来指定渐变点的颜色。`addColorStop()`方法接受两个参数，第一个参数是0到1之间的一个位置量，0表示起点，1表示终点，第二个参数是一个字符串，表示 `CSS `颜色。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var gradient = ctx.createLinearGradient(0, 0, 200, 0)
gradient.addColorStop(0, 'pink')
gradient.addColorStop(1, 'skyblue')
ctx.fillStyle = gradient
ctx.fillRect(10, 10, 200, 100)
```

![image-20221227211353828](https://i0.hdslb.com/bfs/album/7a85732903d6ac4f53974a67a6a31f4cf93eb749.png)

上面代码中，定义了渐变样式`gradient`以后，将这个样式指定给`fillStyle`属性，然后`fillRect()`就会生成以这个样式填充的矩形区域。

`createRadialGradient()`方法定义一个辐射渐变，需要指定两个圆。

```js
ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)
```

`createRadialGradient()`方法接受六个参数，`x0`和`y0`是辐射起始的圆的圆心坐标，`r0`是起始圆的半径，`x1`和`y1`是辐射终止的圆的圆心坐标，`r1`是终止圆的半径。

该方法的返回值也是一个`CanvasGradient`对象。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var gradient = ctx.createRadialGradient(100, 100, 50, 100, 100, 100);
gradient.addColorStop(0, 'white');
gradient.addColorStop(1, 'green');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 200, 200);
```

上面代码中，生成辐射样式以后，用这个样式填充一个矩形。

## 3.图像填充

`createPattern()`方法定义一个图像填充样式，在指定方向上不断重复该图像，填充指定的区域。

```js
ctx.createPattern(image, repetition)
```

该方法接受两个参数，第一个参数是图像数据，它可以是`<img>`元素，也可以是另一个`<canvas>`元素，或者一个表示图像的 Blob 对象。第二个参数是一个字符串，有四个可能的值，分别是`repeat`（双向重复）、`repeat-x`(水平重复)、`repeat-y`(垂直重复)、`no-repeat`(不重复)。如果第二个参数是空字符串或`null`，则等同于`null`。

该方法的返回值是一个`CanvasPattern`对象。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var img = new Image();
img.src = 'https://example.com/pattern.png';
img.onload = function( ) {
  var pattern = ctx.createPattern(img, 'repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 400, 400);
};
```

上面代码中，图像加载成功以后，使用`createPattern()`生成图像样式，然后使用这个样式填充指定区域。

## 4.阴影

以下属性用于设置阴影。

- `CanvasRenderingContext2D.shadowBlur`：阴影的模糊程度，默认为`0`。
- `CanvasRenderingContext2D.shadowColor`：阴影的颜色，默认为`black`。
- `CanvasRenderingContext2D.shadowOffsetX`：阴影的水平位移，默认为`0`。
- `CanvasRenderingContext2D.shadowOffsetY`：阴影的垂直位移，默认为`0`。

下面是一个例子。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 5;
ctx.shadowColor = 'rgba(0,0,0,0.5)';

ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);
```

![image-20221227212053929](https://i0.hdslb.com/bfs/album/2c6b0da81372983e58b9f224067cd2ba309e3792.png)