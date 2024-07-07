# 06 【canvas图像合成】

在默认情况之下，如果在Canvas之中将某个物体（源）绘制在另一个物体（目标）之上，那么浏览器就会简单地把源特体的图像叠放在目标物体图像上面。

简单点讲，在Canvas中，把图像源和目标图像，通过Canvas中的`globalCompositeOperation`操作，可以得到不同的效果，比如下图：

![image-20221228191528802](https://i0.hdslb.com/bfs/album/fd3f83bf4a90d6cfedb3aaac93c3a7285895d784.png)

正如上图，红苹果和黑色的圆，通过`globalCompositeOperation`的`destination-out`就变成了被咬了一口的红苹果。也就是说，在Canvas中通过图像的合成，我们可以实现一些与众不同的效果，比如我们要制作一个刮刮卡抽奖的效果。 今天我们就来了解Canvas中的图像合成怎么使用。

在Canvas中`globalCompositeOperation`属性的值总共有**26**种类型，每种类型都将前生不一样的效果，当然你可能看到效果都将不样，甚至有一些效果在浏览器中并不能正常的渲染。不过不要紧，我们简单的了解这26种类型其代表的含意以及产生的效果。

```js
ctx.beginPath()
ctx.fillStyle = 'red'
ctx.arc(40, 100, 80, 0, Math.PI * 2, true)
ctx.fill()
ctx.closePath()
```

上面的代码将在Canvas画布上绘制一个半径为`80px`的红色圆形，在这里把它称为图像源。

```js
ctx.beginPath()
ctx.fillStyle = 'orange'
ctx.arc(120, 100, 80, 0, Math.PI * 2, true)
ctx.fill()
ctx.closePath()
```

这段代码将在Canvas画布上绘制一个半径为`80px`的橙色圆形，在这里把它称为图像目标。在图像源和目标图像之间设置`globalCompositeOperation`的值，就可以完成图像的合成操作：

```js
ctx.beginPath()
ctx.fillStyle = 'red'
ctx.arc(40, 100, 80, 0, Math.PI * 2, true)
ctx.fill()
ctx.closePath()

ctx.globalCompositeOperation = 'source-in'

ctx.beginPath()
ctx.fillStyle = 'orange'
ctx.arc(120, 100, 80, 0, Math.PI * 2, true)
ctx.fill()
ctx.closePath()
```

此时得到的效果如下：

![image-20221228193200050](https://i0.hdslb.com/bfs/album/6d94e108c2c70a9b99bbf17c1b72f4645b34e498.png)

1. source-over

`source-over`是`globalCompositeOperation`属性的默认值。源图形覆盖目标图形，源图形不透明的地方显示源图形，其余显示目标图形

![image-20221228193248059](https://i0.hdslb.com/bfs/album/c8e4faee164f776c2b77518e3ff37301e5b4bf64.png)

2. source-in

`source-in`：目标图形和源图形重叠且都不透明的部分才被绘制

![image-20221228193301630](https://i0.hdslb.com/bfs/album/47ff3f1b1e99a8b50953dac148a4ca332bccb1b3.png)

3. source-out

`source-out`：目标图形和源图形不重叠的部分会被绘制

![image-20221228193324939](https://i0.hdslb.com/bfs/album/66382da50127d988404df05ac3a02f6c06801835.png)

4. source-atop

`source-atop`：目标图形和源图形内容重叠的部分的目标图形会被绘制

![image-20221228193349396](https://i0.hdslb.com/bfs/album/f8e24bc8f441fdb8062d78864d19a77250611272.png)

5. destination-over

`destination-over`：目标图形和源图形内容后面的目标图形会被绘制

![image-20221228194821738](https://i0.hdslb.com/bfs/album/2df58462d4499c88c3d573fcf4cbc095ce7194ea.png)

| source-over      | 默认。在目标图像上显示源图像。                               |
| ---------------- | ------------------------------------------------------------ |
| source-atop      | 在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。 |
| source-in        | 在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。 |
| source-out       | 在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。 |
| destination-over | 在源图像上方显示目标图像。                                   |
| destination-atop | 在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。 |
| destination-in   | 在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。 |
| destination-out  | 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。 |
| lighter          | 显示源图像 + 目标图像。                                      |
| copy             | 显示源图像。忽略目标图像。                                   |
| xor              | 使用异或操作对源图像与目标图像进行组合。                     |

具体每个值对应的描述，可以[点击这里查阅](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)。

具体效果可以看下面的实现效果：

https://jsrun.net/tw3Kp/edit

刮刮卡练习:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      #card {
        position: absolute;
        width: 400px;
        height: 250px;
        text-align: center;
        line-height: 250px;
      }

      #myCanvas {
        position: relative;
      }
    </style>
  </head>
  <body>
    <div id="card">谢谢惠顾</div>
    <canvas id="myCanvas" width="400" height="250"> 您的浏览器不支持 Canvas</canvas>

    <script>
      /** @type {HTMLCanvasElement} */
      var canvas = document.getElementById('myCanvas')
      var card = document.getElementById('card')
      var isDraw = false
      var ctx = canvas.getContext('2d')

      ctx.beginPath()
      ctx.fillStyle = '#ccc'
      ctx.fillRect(0, 0, 400, 250)
      ctx.closePath()

      ctx.globalCompositeOperation = 'destination-out'

      canvas.addEventListener('mousedown', () => (isDraw = true))
      canvas.addEventListener('mouseup', () => (isDraw = false))
      canvas.addEventListener('mousemove', e => {
        if (!isDraw) return
        ctx.beginPath()
        ctx.arc(e.pageX, e.pageY, 20, 0, 2 * Math.PI, true)
        ctx.fill()
        ctx.closePath()
      })

      if (Math.random() < 0.1) card.textContent = '一等奖'
    </script>
  </body>
</html>
```

