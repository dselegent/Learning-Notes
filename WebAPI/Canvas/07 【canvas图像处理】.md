# 07 【canvas图像处理】

## 1.绘制图片

Canvas API 允许将图像文件写入画布，做法是读取图片后，使用`drawImage()`方法将这张图片放上画布。

`CanvasRenderingContext2D.drawImage()`有三种使用格式。

```js
ctx.drawImage(image, dx, dy);
ctx.drawImage(image, dx, dy, dWidth, dHeight);
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

各个参数的含义如下。

- image：图像元素
- sx：图像内部的横坐标，用于映射到画布的放置点上。
- sy：图像内部的纵坐标，用于映射到画布的放置点上。
- sWidth：图像在画布上的宽度，会产生缩放效果。如果未指定，则图像不会缩放，按照实际大小占据画布的宽度。
- sHeight：图像在画布上的高度，会产生缩放效果。如果未指定，则图像不会缩放，按照实际大小占据画布的高度。
- dx：画布内部的横坐标，用于放置图像的左上角
- dy：画布内部的纵坐标，用于放置图像的右上角
- dWidth：图像在画布内部的宽度，会产生缩放效果。
- dHeight：图像在画布内部的高度，会产生缩放效果。

下面是最简单的使用场景，将图像放在画布上，两者左上角对齐。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var img = new Image();
img.src = 'image.png';
img.onload = function () {
  ctx.drawImage(img, 0, 0);
};
```

上面代码将一个 PNG 图像放入画布。这时，图像将是原始大小，如果画布小于图像，就会只显示出图像左上角，正好等于画布大小的那一块。

![image-20221228202847847](https://i0.hdslb.com/bfs/album/0f983a145fb173667f276ee2d5a96134aa30e0d6.png)

如果要显示完整的图片，可以用图像的宽和高，设置成画布的宽和高。

```js
var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d')
var img = new Image()
img.src = './images/girl.webp'

img.onload = function () {
  ctx.drawImage(this, 0, 0, 400, 250)
}
```

![image-20221228203055093](https://i0.hdslb.com/bfs/album/f1c65117f6a589b7237bfa8aaa7d88cf2c8c5055.png)

## 2.图片裁剪

```js
ctx.drawImage(this, 640, 0, 1280, 720, 0, 0, 400, 250)
```

![image-20221228204259329](C:\Users\DS\AppData\Roaming\Typora\typora-user-images\image-20221228204259329.png)