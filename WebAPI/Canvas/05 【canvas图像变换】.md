# 05 【canvas图像变换】

以下方法用于图像变换。

- `CanvasRenderingContext2D.rotate()`：图像旋转
- `CanvasRenderingContext2D.scale()`：图像缩放
- `CanvasRenderingContext2D.translate()`：图像平移
- `CanvasRenderingContext2D.transform()`：通过一个变换矩阵完成图像变换
- `CanvasRenderingContext2D.setTransform()`：取消前面的图像变换

## 1.rotate()

`CanvasRenderingContext2D.rotate()`方法用于图像旋转。它接受一个弧度值作为参数，表示顺时针旋转的度数。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.rotate(45 * Math.PI / 180);
ctx.fillRect(70, 0, 100, 30);
```

![image-20221228162422216](https://i0.hdslb.com/bfs/album/557d88c5087f696881cbb34af25455af5a20f749.png)

上面代码会显示一个顺时针倾斜45度的矩形。注意，`rotate()`方法必须在`fillRect()`方法之前调用，否则是不起作用的。

旋转中心点始终是画布左上角的原点。如果要更改中心点，需要使用`translate()`方法移动画布。

## 2.scale()

`CanvasRenderingContext2D.scale()`方法用于缩放图像。它接受两个参数，分别是`x`轴方向的缩放因子和`y`轴方向的缩放因子。默认情况下，一个单位就是一个像素，缩放因子可以缩放单位，比如缩放因子`0.5`表示将大小缩小为原来的50%，缩放因子`10`表示放大十倍。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.scale(10, 3);
ctx.fillRect(10, 10, 10, 10);
```

![image-20221228162708177](https://i0.hdslb.com/bfs/album/e82f3daef1d46790ab2d557977d9a05c9a7fed38.png)

上面代码中，原来的矩形是 10 x 10，缩放后展示出来是 100 x 30。

如果缩放因子为1，就表示图像没有任何缩放。如果为-1，则表示方向翻转。`ctx.scale(-1, 1)`为水平翻转，`ctx.scale(1, -1)`表示垂直翻转。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.scale(1, -2);
ctx.font = "16px serif";
ctx.fillText('Hello world!', 20, -20);
```

![image-20221228163052256](https://i0.hdslb.com/bfs/album/ca61eb7ef60d689aeb41d99e94599b6cd2cbbb52.png)

上面代码会显示一个水平倒转的、高度放大2倍的`Hello World!`。

注意，负向缩放本质是坐标翻转，所针对的坐标轴就是画布左上角原点的坐标轴。

## 3.translate()

`CanvasRenderingContext2D.translate()`方法用于平移图像。它接受两个参数，分别是 x 轴和 y 轴移动的距离（单位像素）。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.fillRect(0, 0, 100, 100)

ctx.translate(50, 50)
ctx.fillStyle = 'red'
ctx.fillRect(0, 0, 100, 100)
```

![image-20221228163516530](https://i0.hdslb.com/bfs/album/453036a7a401c798442e33c8c200b80c2b3fb85e.png)

## 4.transform()

`CanvasRenderingContext2D.transform()`方法接受一个变换矩阵的六个元素作为参数，完成缩放、旋转、移动和倾斜等变形。

它的使用格式如下。

```js
ctx.transform(a, b, c, d, e, f);
/*
a:水平缩放(默认值1，单位倍数)
b:水平倾斜(默认值0，单位弧度)
c:垂直倾斜(默认值0，单位弧度)
d:垂直缩放(默认值1，单位倍数)
e:水平位移(默认值0，单位像素)
f:垂直位移(默认值0，单位像素)
*/
```

下面是一个例子。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.transform(2, 0, 0, 1, 50, 50);
ctx.fillRect(0, 0, 100, 100);
```

上面代码中，原始图形是 100 x 100 的矩形，结果缩放成 200 x 100 的矩形，并且左上角从`(0, 0)`移动到`(50, 50)`。

注意，多个`transform()`方法具有叠加效果。

## 5.setTransform()

`CanvasRenderingContext2D.setTransform()`方法取消前面的图形变换，将画布恢复到该方法指定的状态。该方法的参数与`transform()`方法完全一致。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.translate(50, 50);
ctx.fillRect(0, 0, 100, 100);

ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.fillRect(0, 0, 100, 100);
```

上面代码中，第一个`fillRect()`方法绘制的矩形，左上角从`(0, 0)`平移到`(50, 50)`。`setTransform()`方法取消了这个变换（已绘制的图形不受影响），将画布恢复到默认状态（变换矩形`1, 0, 0, 1, 0, 0`），所以第二个矩形的左上角回到`(0, 0)`。

