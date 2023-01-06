# 27 【三大家族scroll、offset、client】

JS的三大家族主要是Offset、Scroll、Client，通过对三大家族不同属性的灵活使用，我们可以模拟出很多炫酷的JS动画，增强界面的视觉感染力！让静态页面活起来！

注意以下的值全是不带px的，单纯的数字

![image-20220825182901210](https://i0.hdslb.com/bfs/album/a363913f6564155d01e6a619e0689d5fc5d355b0.png)

> 对于clientX、clientY、offsetX、offsetY已在鼠标事件记录过

## 1.scroll家族

### 1.1 scrollHeight和scrollWidth（只读）

> 获取元素整个**内容**的高度和宽度 （包含看不见的）  ，如果有滚动条（滚动条会占用部分宽高），不计算滚动条的宽高

`Element.scrollHeight`属性返回一个整数值（小数会四舍五入），表示当前元素的总高度（单位像素），包括溢出容器、当前不可见的部分。它包括`padding`，但是不包括`border`、`margin`以及水平滚动条的高度（如果有水平滚动条的话），还包括伪元素（`::before`或`::after`）的高度。

`Element.scrollWidth`属性表示当前元素的总宽度（单位像素），其他地方都与`scrollHeight`属性类似。这两个属性只读。

整张网页的总高度可以从`document.documentElement`或`document.body`上读取。

```js
// 返回网页的总高度
document.documentElement.scrollHeight
document.body.scrollHeight
```

注意，如果元素节点的内容出现溢出，即使溢出的内容是隐藏的，`scrollHeight`属性仍然返回元素的总高度。

```js
// HTML 代码如下
// <div id="myDiv" style="height: 200px; overflow: hidden;">...<div>
document.getElementById('myDiv').scrollHeight // 356
```

上面代码中，即使`myDiv`元素的 CSS 高度只有200像素，且溢出部分不可见，但是`scrollHeight`仍然会返回该元素的原始高度。

![image-20220825183304333](https://i0.hdslb.com/bfs/album/ce777bd4a059a1af22115b6fb92fca524287855f.png)



### 1.2 scrollTop和scrollLeft（可修改）

> 获取元素垂直和水平滚动条滚动的距离(被卷去的头部和左侧)

`Element.scrollLeft`属性表示当前元素的水平滚动条向右侧滚动的像素数量，`Element.scrollTop`属性表示当前元素的垂直滚动条向下滚动的像素数量。对于那些没有滚动条的网页元素，这两个属性总是等于0。

如果要查看整张网页的水平的和垂直的滚动距离，要从`document.documentElement`元素上读取。

```js
document.documentElement.scrollLeft
document.documentElement.scrollTop
```

这两个属性都可读写，设置该属性的值（不需要单位），会导致浏览器将当前元素自动滚动到相应的位置。

## 2.offset家族

![image-20220825183858516](https://i0.hdslb.com/bfs/album/416c7cae6c2abeee8358e955de8f31c792bb7259.png)

### 2.1 offsetHeight和offsetWidth

> 获取盒子的高度宽度，包括内容区、内边距、边框（这里就是css设置的那些样式组合）

`Element.offsetHeight`属性返回一个整数，表示元素的 CSS 垂直高度（单位像素），包括元素本身的高度、padding 和 border，以及水平滚动条的高度（如果存在滚动条）。

`Element.offsetWidth`属性表示元素的 CSS 水平宽度（单位像素），其他都与`Element.offsetHeight`一致。

这两个属性都是只读属性，只比`Element.clientHeight`和`Element.clientWidth`多了边框的高度或宽度。如果元素的 CSS 设为不可见（比如`display: none;`），则返回`0`。

### 2.2 offsetParent

`Element.offsetParent`属性返回最靠近当前元素的、并且 CSS 的`position`属性不等于`static`的上层元素。

```js
<div style="position: absolute;">
  <p>
    <span>Hello</span>
  </p>
</div>
```

上面代码中，`span`元素的`offsetParent`属性就是`div`元素。

该属性主要用于确定子元素位置偏移的计算基准，`Element.offsetTop`和`Element.offsetLeft`就是`offsetParent`元素计算的。

如果该元素是不可见的（`display`属性为`none`），或者位置是固定的（`position`属性为`fixed`），则`offsetParent`属性返回`null`。

```js
<div style="position: absolute;">
  <p>
    <span style="display: none;">Hello</span>
  </p>
</div>
```

上面代码中，`span`元素的`offsetParent`属性是`null`。

如果某个元素的所有上层节点的`position`属性都是`static`，则`Element.offsetParent`属性指向`<body>`元素。

### 2.3 offsetLeft和offsetTop（只读）

> 当前元素和定位父元素之间的偏移量（如果没有设置定位父元素，就是相对于左上角的位置,top是距离顶部的距离,left是最左边的距离）
> offsetLeft水平偏移量 offsetTop垂直偏移量

`Element.offsetLeft`返回当前元素左上角相对于最近的开启了定位的节点的水平位移，`Element.offsetTop`返回垂直位移，单位为像素。通常，这两个值是指相对于父节点的位移。

下面的代码可以算出元素左上角相对于整张网页的坐标。

```js
function getElementPosition(e) {
  var x = 0;
  var y = 0;
  while (e !== null)  {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent;
  }
  return {x: x, y: y};
}
```

## 3.client家族

### 3.1 clientHeight和clientWidth(不包含滚动条)

> 元素的**可见**高度，包括元素的内容区和内边距的高度
> 元素的**可见**宽度，包括元素的内容区和内边距的宽度

`Element.clientHeight`属性返回一个整数值，表示元素节点的 CSS 高度（单位像素），只对块级元素生效，对于行内元素返回`0`。如果块级元素没有设置 CSS 高度，则返回实际高度。

除了元素本身的高度，它还包括`padding`部分，但是不包括`border`、`margin`。如果有水平滚动条，还要减去水平滚动条的高度。注意，这个值始终是整数，如果是小数会被四舍五入。

`Element.clientWidth`属性返回元素节点的 CSS 宽度，同样只对块级元素有效，也是只包括元素本身的宽度和`padding`，如果有垂直滚动条，还要减去垂直滚动条的宽度。

`document.documentElement`的`clientHeight`属性，返回当前视口的高度（即浏览器窗口的高度），等同于`window.innerHeight`属性减去水平滚动条的高度（如果有的话）。`document.body`的高度则是网页的实际高度。一般来说，`document.body.clientHeight`大于`document.documentElement.clientHeight`。

```js
// 视口高度
document.documentElement.clientHeight

// 网页总高度
document.body.clientHeight
```

### 3.2 clientLeft和ClientTop

> 边框宽度和边框的高度

`Element.clientLeft`属性等于元素节点左边框（left border）的宽度（单位像素），不包括左侧的`padding`和`margin`。如果没有设置左边框，或者是行内元素（`display: inline`），该属性返回`0`。该属性总是返回整数值，如果是小数，会四舍五入。

`Element.clientTop`属性等于网页元素顶部边框的宽度（单位像素），其他特点都与`clientLeft`相同。

**判断滚动条是否滚动到底**
垂直滚动条 `scrollHeight -scrollTop = clientHeight`

水平滚动 `scrollWidth -scrollLeft = clientWidth`

**检查浏览器宽高（可视区域）兼容性写法**

```js
 //获取屏幕可视区域的宽高
    function client(){
        if(window.innerHeight !== undefined){
            return {
                "width": window.innerWidth,
                "height": window.innerHeight
            }
        }else if(document.compatMode === "CSS1Compat"){
            return {
                "width": document.documentElement.clientWidth,
                "height": document.documentElement.clientHeight
            }
        }else{
            return {
                "width": document.body.clientWidth,
                "height": document.body.clientHeight
            }
        }
    }

      //需求：浏览器每次更改大小，判断是否符合某一标准然后给背景上色。
        //  // >960红色，大于640小于960蓝色，小于640绿色。
        //步骤：
        //1.老三步
        //2.判断。
        //3.上色

        //1.老三步
        window.onresize = fn;
        //页面加载的时候直接执行一次函数，确定浏览器可视区域的宽，给背景上色
        fn();

        //封装成函数，然后指定的时候去调用和绑定函数名
        function fn() {
            //2.判断。
            //3.上色
            if(client().width>960){
                document.body.style.backgroundColor = "red";
            }else if(client().width>640){
                document.body.style.backgroundColor = "blue";
            }else{
                document.body.style.backgroundColor = "green";
            }
        }
```

## 4.getBoundingClientRect()方法

getBoundingClientRect()获取元素位置，这个方法没有参数

getBoundingClientRect()用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。 

getBoundingClientRect()是DOM元素到浏览器可视范围的距离（不包含文档卷起的部分）。 

```js
var rect = obj.getBoundingClientRect();
```

上面代码中，`getBoundingClientRect`方法返回的`rect`对象，具有以下属性（全部为只读）。

- `x`：元素左上角相对于视口的横坐标
- `y`：元素左上角相对于视口的纵坐标
- `height`：元素高度
- `width`：元素宽度
- `left`：元素左上角相对于视口的横坐标，与`x`属性相等
- `right`：元素右边界相对于左边视口的横坐标（等于`x + width`）
- `top`：元素顶部相对于视口的纵坐标，与`y`属性相等
- `bottom`：元素底部相对于上边视口的纵坐标（等于`y + height`）

![image-20220825185128644](https://i0.hdslb.com/bfs/album/01fad9d5c8543c2643870c8d444c9405bdc4d2e3.png)

由于元素相对于视口（viewport）的位置，会随着页面滚动变化，因此表示位置的四个属性值，都不是固定不变的。如果想得到绝对位置，可以将`left`属性加上`window.scrollX`，`top`属性加上`window.scrollY`。

注意，`getBoundingClientRect`方法的所有属性，都把边框（`border`属性）算作元素的一部分。也就是说，都是从边框外缘的各个点来计算。因此，`width`和`height`包括了元素本身 + `padding` + `border`。

​	

## 5.总结

![image-20220620111553872](https://tva1.sinaimg.cn/large/0074UQWJgy1h3ejhem2rlj30ow07uq7a.jpg)

**三大家族区别**

- offset家族
   offsetHeight:   元素高，height+border+padding
   offsetWidth:    元素宽，width+border+padding
   offsetTop:      上边距离带有定位的父盒子的距离（重要）
   offsetLeft: 左边距离带有定位的父盒子的距离（重要）
   offsetParent:   最近的带有定位的父盒子
- scroll家族
   scrollHeight:   内容高，不含border
   scrollWidth:    内容宽，不含border
   scrollTop:      document.documentELement.scrollTop || document.body.scrollTop; （重要）window.pageXOffset;
   浏览器页面被卷去的头部
   元素调用.必须具有滚动条的盒子调用。盒子本身遮挡住的子盒子内容。
   子盒子被遮挡住的头部
   scrollLeft:     document.documentELement.scrollLeft:  || document.body.scrollLeft: ; （重要）window.pageYOffset;
   浏览器页面被卷去的左侧
   元素调用.必须具有滚动条的盒子调用。盒子本身遮挡住的子盒子内容。
   子盒子被遮挡住的左侧
- client家族
   clientHeight:   元素高，height+padding;
   window.innerHeight; document.body.clientHeight     可视区域的高
   clientWidth:    元素宽，width+padding;
   window.innerWidth;  document.documentElementWidth; 可视区域的宽
   clientTop:      元素的上border宽
   clientLeft:     元素的左border宽
   clientY     调用者：event.clientY(event)（重要）
   作用：鼠标距离浏览器可视区域的距离，上
   clientX     调用者：event.clientX(event)（重要）
   作用：鼠标距离浏览器可视区域的距离，左



