# 02 【canvas绘制基本图形】

Canvas 画布提供了一个作图的平面空间，该空间的每个点都有自己的坐标。原点`(0, 0)`位于图像左上角，`x`轴的正向是原点向右，`y`轴的正向是原点向下。

## 1.绘制三角形

以下方法和属性用来绘制路径。

- `CanvasRenderingContext2D.beginPath()`：开始绘制路径。
- `CanvasRenderingContext2D.closePath()`：结束路径，返回到当前路径的起始点，会从当前点到起始点绘制一条直线。如果图形已经封闭，或者只有一个点，那么此方法不会产生任何效果。
- `CanvasRenderingContext2D.moveTo()`：设置路径的起点，即将一个新路径的起始点移动到`(x，y)`坐标。
- `CanvasRenderingContext2D.lineTo()`：使用直线从当前点连接到`(x, y)`坐标。
- `CanvasRenderingContext2D.fill()`：在路径内部填充颜色（默认为黑色）。
- `CanvasRenderingContext2D.stroke()`：路径线条着色（默认为黑色）。
- `CanvasRenderingContext2D.fillStyle`：指定路径填充的颜色和样式（默认为黑色）。
- `CanvasRenderingContext2D.strokeStyle`：指定路径线条的颜色和样式（默认为黑色）。

```js
/** @type {HTMLCanvasElement} */
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(200, 200);
ctx.lineTo(100, 200);
```

上面代码只是确定了路径的形状，画布上还看不出来，因为没有颜色。所以还需要着色。

```js
ctx.fill()
// 或者
ctx.stroke()
```

上面代码中，这两个方法都可以使得路径可见。

`fill()`在路径内部填充颜色，使之变成一个实心的图形；

<img src="https://i0.hdslb.com/bfs/album/2b85eafa550940c03b03a0c1ff2fedac2d5fe190.png" alt="image-20221227185426891"  />

`stroke()`只对路径线条着色。

![image-20221227190156581](https://i0.hdslb.com/bfs/album/1f38102add1d4e96e769584142358cd40df024f7.png)

这两个方法默认都是使用黑色，可以使用`fillStyle`和`strokeStyle`属性指定其他颜色。

```js
ctx.fillStyle = 'red';
ctx.fill();
// 或者
ctx.strokeStyle = 'red';
ctx.stroke();
```

上面代码将填充和线条的颜色指定为红色。

![image-20221227190233092](https://i0.hdslb.com/bfs/album/25df00e5a0f410791154408a1bd4cd8348fa360d.png)

## 2.绘制弧线

以下方法用于绘制弧形。

- `CanvasRenderingContext2D.arc()`：通过指定圆心和半径绘制弧形。
- `CanvasRenderingContext2D.arcTo()`：通过指定两根切线和半径绘制弧形。

`CanvasRenderingContext2D.arc()`主要用来绘制圆形或扇形。

```js
// 格式
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)

// 实例
ctx.arc(50, 50, 30, 0, 2 * Math.PI, true)
```

`arc()`方法的`x`和`y`参数是圆心坐标，`radius`是半径，`startAngle`和`endAngle`则是扇形的起始角度和终止角度（以弧度表示），`anticlockwise`表示做图时应该逆时针画（`true`）还是顺时针画（`false`），这个参数用来控制扇形的方向（比如上半圆还是下半圆）。

![image-20221227193323852](https://i0.hdslb.com/bfs/album/747f68e53ce578c0c9043a939e4daa88be7bb613.png)

上面代码绘制了一个半径30，起始角度为0，终止角度为 2 * PI 的完整的圆。

绘制空心半圆的例子。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.moveTo(50, 100)
ctx.arc(100, 100, 50, 0, Math.PI, false)
ctx.stroke()
```

![image-20221227194258658](https://i0.hdslb.com/bfs/album/d00e1b61af28fecf4a52b27b58a1fb066d2fa8e6.png)

`CanvasRenderingContext2D.arcTo()`方法主要用来绘制圆弧，需要给出两个点的坐标，当前点与第一个点形成一条直线，第一个点与第二个点形成另一条直线，然后画出与这两根直线相切的弧线。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.arcTo(50, 50, 100, 0, 25);
ctx.lineTo(100, 0);
ctx.stroke();
```

上面代码中，`arcTo()`有5个参数，前两个参数是第一个点的坐标，第三个参数和第四个参数是第二个点的坐标，第五个参数是半径。然后，`(0, 0)`与`(50, 50)`形成一条直线，然后`(50, 50)`与`(100, 0)`形成第二条直线。弧线就是与这两根直线相切的部分。

绘制一个笑脸

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.beginPath()
ctx.arc(150, 140, 100, 0, 2 * Math.PI, false)
ctx.stroke()
ctx.closePath()

ctx.beginPath()
ctx.arc(100, 100, 10, 0, 2 * Math.PI, false)
ctx.stroke()
ctx.closePath()

ctx.beginPath()
ctx.arc(200, 100, 10, 0, 2 * Math.PI, false)
ctx.stroke()
ctx.closePath()

ctx.beginPath()
ctx.arc(150, 140, 70, 0, Math.PI, false)
ctx.stroke()
ctx.closePath()
```

![image-20221227202144199](https://i0.hdslb.com/bfs/album/5e047282d40998988c9f69d3fab6c0eb9a16f1ce.png)

## 3.绘制矩形

以下方法用来绘制矩形。

- `CanvasRenderingContext2D.rect()`：绘制矩形路径。
- `CanvasRenderingContext2D.fillRect()`：填充一个矩形。
- `CanvasRenderingContext2D.strokeRect()`：绘制矩形边框。
- `CanvasRenderingContext2D.clearRect()`：指定矩形区域的像素都变成透明。

上面四个方法的格式都一样，都接受四个参数，分别是矩形左上角的横坐标和纵坐标、矩形的宽和高。

`CanvasRenderingContext2D.rect()`方法用于绘制矩形路径。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.rect(10, 10, 100, 100);
ctx.fill();
```

![image-20221227202533630](https://i0.hdslb.com/bfs/album/9c4582aebee82798a4073cbfd385c69c6b431e8c.png)

上面代码绘制一个正方形，左上角坐标为`(10, 10)`，宽和高都为100。

`CanvasRenderingContext2D.fillRect()`用来向一个矩形区域填充颜色。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = '#bfa';
ctx.fillRect(10, 10, 100, 100);
```

![image-20221227202811172](https://i0.hdslb.com/bfs/album/4ea1f25905bb3aadfc42b8aef2567a99dea49f0e.png)

上面代码绘制一个绿色的正方形，左上角坐标为`(10, 10)`，宽和高都为100。

`CanvasRenderingContext2D.strokeRect()`用来绘制一个矩形区域的边框。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.strokeStyle = 'green';
ctx.strokeRect(10, 10, 100, 100);
```

上面代码绘制一个绿色的空心正方形，左上角坐标为`(10, 10)`，宽和高都为100。

![image-20221227202908811](https://i0.hdslb.com/bfs/album/36bc6b2b09901c19a6af9d687bfc98fe972bb9fd.png)

`CanvasRenderingContext2D.clearRect()`用于擦除指定矩形区域的像素颜色，等同于把早先的绘制效果都去除。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.fillRect(10, 10, 100, 100);
ctx.clearRect(15, 15, 90, 90);
```

![image-20221227203628451](https://i0.hdslb.com/bfs/album/3106a07088526540d31c72384aaaf23ed5b4f5cf.png)

上面代码先绘制一个 100 x 100 的正方形，然后在它的内部擦除 90 x 90 的区域，等同于形成了一个5像素宽度的边框。