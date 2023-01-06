# 17 【Document 节点】

## 1.Document 节点的概述

`document`节点对象代表整个文档，每张网页都有自己的`document`对象。`window.document`属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用。

`document`对象有不同的办法可以获取。

- 正常的网页，直接使用`document`或`window.document`。
- `iframe`框架里面的网页，使用`iframe`节点的`contentDocument`属性。
- Ajax 操作返回的文档，使用`XMLHttpRequest`对象的`responseXML`属性。
- 内部节点的`ownerDocument`属性。

`document`对象继承了`EventTarget`接口和`Node`接口，并且混入（mixin）了`ParentNode`接口。这意味着，这些接口的方法都可以在`document`对象上调用。除此之外，`document`对象还有很多自己的属性和方法。

## 2.Document 节点的属性

### 2.1 快捷方式属性

以下属性是指向文档内部的某个节点的快捷方式。

**（1）document.defaultView**

`document.defaultView`属性返回`document`对象所属的`window`对象。如果当前文档不属于`window`对象，该属性返回`null`。

```
document.defaultView === window // true
```

**（2）document.doctype**

对于 HTML 文档来说，`document`对象一般有两个子节点。第一个子节点是`document.doctype`，指向`<DOCTYPE>`节点，即文档类型（Document Type Declaration，简写DTD）节点。HTML 的文档类型节点，一般写成`<!DOCTYPE html>`。如果网页没有声明 DTD，该属性返回`null`。

```
var doctype = document.doctype;
doctype // "<!DOCTYPE html>"
doctype.name // "html"
```

`document.firstChild`通常就返回这个节点。

**（3）document.documentElement**

`document.documentElement`属性返回当前文档的根元素节点（root）。它通常是`document`节点的第二个子节点，紧跟在`document.doctype`节点后面。HTML网页的该属性，一般是`<html>`节点。

**（4）document.body，document.head**

`document.body`属性指向`<body>`节点，`document.head`属性指向`<head>`节点。

这两个属性总是存在的，如果网页源码里面省略了`<head>`或`<body>`，浏览器会自动创建。另外，这两个属性是可写的，如果改写它们的值，相当于移除所有子节点。

**（5）document.scrollingElement**

`document.scrollingElement`属性返回文档的滚动元素。也就是说，当文档整体滚动时，到底是哪个元素在滚动。

标准模式下，这个属性返回的文档的根元素`document.documentElement`（即`<html>`）。兼容（quirk）模式下，返回的是`<body>`元素，如果该元素不存在，返回`null`。

```js
// 页面滚动到浏览器顶部
document.scrollingElement.scrollTop = 0;
```

**（6）document.activeElement**

`document.activeElement`属性返回获得当前焦点（focus）的 DOM 元素。通常，这个属性返回的是`<input>`、`<textarea>`、`<select>`等表单元素，如果当前没有焦点元素，返回`<body>`元素或`null`。

**（7）document.fullscreenElement**

`document.fullscreenElement`属性返回当前以全屏状态展示的 DOM 元素。如果不是全屏状态，该属性返回`null`。

```js
if (document.fullscreenElement.nodeName == 'VIDEO') {
  console.log('全屏播放视频');
}
```

上面代码中，通过`document.fullscreenElement`可以知道`<video>`元素有没有处在全屏状态，从而判断用户行为。

### 2.2 节点集合属性

以下属性返回一个`HTMLCollection`实例，表示文档内部特定元素的集合。这些集合都是动态的，原节点有任何变化，立刻会反映在集合中。

**（1）document.links**

`document.links`属性返回当前文档所有设定了`href`属性的`<a>`及`<area>`节点。

```js
// 打印文档所有的链接
var links = document.links;
for(var i = 0; i < links.length; i++) {
  console.log(links[i]);
}
```

**（2）document.forms**

`document.forms`属性返回所有`<form>`表单节点。

```js
var selectForm = document.forms[0];
```

上面代码获取文档第一个表单。

除了使用位置序号，`id`属性和`name`属性也可以用来引用表单。

```js
/* HTML 代码如下
  <form name="foo" id="bar"></form>
*/
document.forms[0] === document.forms.foo // true
document.forms.bar === document.forms.foo // true
```

**（3）document.images**

`document.images`属性返回页面所有`<img>`图片节点。

```js
var imglist = document.images;

for(var i = 0; i < imglist.length; i++) {
  if (imglist[i].src === 'banner.gif') {
    // ...
  }
}
```

上面代码在所有`img`标签中，寻找某张图片。

**（4）document.embeds，document.plugins**

`document.embeds`属性和`document.plugins`属性，都返回所有`<embed>`节点。

**（5）document.scripts**

`document.scripts`属性返回所有`<script>`节点。

```js
var scripts = document.scripts;
if (scripts.length !== 0 ) {
  console.log('当前网页有脚本');
}
```

**（6）document.styleSheets**

`document.styleSheets`属性返回网页内嵌或引入的 CSS 样式表集合。

**（7）小结**

除了`document.styleSheets`属性，以上的其他集合属性返回的都是`HTMLCollection`实例。`document.styleSheets`属性返回的是`StyleSheetList`实例。

```js
document.links instanceof HTMLCollection // true
document.images instanceof HTMLCollection // true
document.forms instanceof HTMLCollection // true
document.embeds instanceof HTMLCollection // true
document.scripts instanceof HTMLCollection // true
```

`HTMLCollection`实例是类似数组的对象，所以上面这些属性都有`length`属性，都可以使用方括号运算符引用成员。如果成员有`id`或`name`属性，还可以用这两个属性的值，在`HTMLCollection`实例上引用到这个成员。

```js
// HTML 代码如下
// <form name="myForm">
document.myForm === document.forms.myForm // true
```

### 2.3 文档静态信息属性

以下属性返回文档信息。

**（1）document.documentURI，document.URL**

`document.documentURI`属性和`document.URL`属性都返回一个字符串，表示当前文档的网址。不同之处是它们继承自不同的接口，`documentURI`继承自`Document`接口，可用于所有文档；`URL`继承自`HTMLDocument`接口，只能用于 HTML 文档。

```js
document.URL
// http://www.example.com/about

document.documentURI === document.URL
// true
```

如果文档的锚点（`#anchor`）变化，这两个属性都会跟着变化。

**（2）document.domain**

`document.domain`属性返回当前文档的域名，不包含协议和端口。比如，网页的网址是`http://www.example.com:80/hello.html`，那么`document.domain`属性就等于`www.example.com`。如果无法获取域名，该属性返回`null`。

`document.domain`基本上是一个只读属性，只有一种情况除外。次级域名的网页，可以把`document.domain`设为对应的上级域名。比如，当前域名是`a.sub.example.com`，则`document.domain`属性可以设置为`sub.example.com`，也可以设为`example.com`。修改后，`document.domain`相同的两个网页，可以读取对方的资源，比如设置的 Cookie。

另外，设置`document.domain`会导致端口被改成`null`。因此，如果通过设置`document.domain`来进行通信，双方网页都必须设置这个值，才能保证端口相同。

**（3）document.location**

`Location`对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过`window.location`和`document.location`属性，可以拿到这个对象。

**（4）document.lastModified**

`document.lastModified`属性返回一个字符串，表示当前文档最后修改的时间。不同浏览器的返回值，日期格式是不一样的。

```js
document.lastModified
// "03/07/2018 11:18:27"
```

注意，`document.lastModified`属性的值是字符串，所以不能直接用来比较。`Date.parse`方法将其转为`Date`实例，才能比较两个网页。

```js
var lastVisitedDate = Date.parse('01/01/2018');
if (Date.parse(document.lastModified) > lastVisitedDate) {
  console.log('网页已经变更');
}
```

如果页面上有 JavaScript 生成的内容，`document.lastModified`属性返回的总是当前时间。

**（5）document.title**

`document.title`属性返回当前文档的标题。默认情况下，返回`<title>`节点的值。但是该属性是可写的，一旦被修改，就返回修改后的值。

```js
document.title = '新标题';
document.title // "新标题"
```

**（6）document.characterSet**

`document.characterSet`属性返回当前文档的编码，比如`UTF-8`、`ISO-8859-1`等等。

**（7）document.referrer**

`document.referrer`属性返回一个字符串，表示当前文档的访问者来自哪里。

```js
document.referrer
// "https://example.com/path"
```

如果无法获取来源，或者用户直接键入网址而不是从其他网页点击进入，`document.referrer`返回一个空字符串。

`document.referrer`的值，总是与 HTTP 头信息的`Referer`字段保持一致。但是，`document.referrer`的拼写有两个`r`，而头信息的`Referer`字段只有一个`r`。

**（8）document.dir**

`document.dir`返回一个字符串，表示文字方向。它只有两个可能的值：`rtl`表示文字从右到左，阿拉伯文是这种方式；`ltr`表示文字从左到右，包括英语和汉语在内的大多数文字采用这种方式。

**（9）document.compatMode**

`compatMode`属性返回浏览器处理文档的模式，可能的值为`BackCompat`（向后兼容模式）和`CSS1Compat`（严格模式）。

一般来说，如果网页代码的第一行设置了明确的`DOCTYPE`（比如`<!doctype html>`），`document.compatMode`的值都为`CSS1Compat`。

## 3.Document 节点的方法

### 3.1 访问元素节点

所谓 “访问” 元素节点，就是指 “得到”、“获取” 页面上的元素节点。

对节点进行操作，第一步就是要得到它。

访问元素节点主要依靠 document 对象。

### 3.2 认识 document 对象

document 对象是 DOM 中最重要的东西，几乎所有 DOM 的功能都封装在了 document 对象中。

document 对象也表示整个 HTML 文档，它是 DOM 节点树的根。

document 对象的 nodeType 属性值是 9。

```javascript
typeof document;	// object
document.nodeType;	// 9
```

### 3.3 访问元素节点的常用方法

注意：以下方法的参数都是字符串值 `''`。

| 方法                                | 功能                       | 兼容性                       |
| ----------------------------------- | -------------------------- | ---------------------------- |
| `document.getElementById()`         | 通过 id 得到**元素**       | IE 6                         |
| `document.getElementsByTagName()`   | 通过标签名得到**元素数组** | IE 6                         |
| `document.getElementsByClassName()` | 通过类名得到**元素数组**   | IE 9                         |
| `document.querySelector()`          | 通过选择器得到**元素**     | IE 8 部分兼容、IE 9 完全兼容 |
| `document.querySelectorAll()`       | 通过选择器得到**元素数组** | IE 8 部分兼容、IE 9 完全兼容 |

> Element：元素。
>
> query：查询。
>
> Selector：选择器。

### 3.4 getElementById()

`document.getElementById()` 功能是通过 id 得到元素节点。

- HTML

```html
<div id="box">我是一个盒子</div>
<p id="para">我是一个段落</p>
```

- JS

```javascript
var box = document.getElementById('box');
var para = document.getElementById('para');
```

【注意事项】

> 如果页面上有相同 id 的元素，则只能得到第一个。
>
> 原则上，html 中同一名称的 id 也只能出现一次。

### 3.5 延迟运行

在测试 DOM 代码时，通常 JS 代码要写到 HTML 节点的后面，否则 JS 无法找到相应的 HTML 节点。

当然，可以使用 `window.onload = function(){}` 事件，使页面加载完毕后，再执行指定的代码。

> 一般 script 标签会被放在头部或尾部。头部就是 `<head></head>` 里面，尾部一般指 `<body></body>` 里，但也有放在 `</body>` 闭合标签之后的（最好不要这样）。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="box">我是一个盒子</div>
    <p id="para">我是一个段落</p>
    <script>
        var box = document.getElementById('box');
        var para = document.getElementById('para');
        console.log(box);	// <div id="box">我是一个盒子</div>
        console.log(para);	// <p id="para">我是一个段落</p>
    </script>
</body>

</html>
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        var box = document.getElementById('box');
        var para = document.getElementById('para');
        console.log(box);	// null
        console.log(para);	// null
    </script>
</head>

<body>
    <div id="box">我是一个盒子</div>
    <p id="para">我是一个段落</p>
</body>

</html>
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        window.onload = function () {
            var box = document.getElementById('box');
            var para = document.getElementById('para');
            console.log(box);	// <div id="box">我是一个盒子</div>
            console.log(para);	// <p id="para">我是一个段落</p>
        }
    </script>
</head>

<body>
    <div id="box">我是一个盒子</div>
    <p id="para">我是一个段落</p>
</body>

</html>
```

### 3.6 getElementsByTagName()

`getElementsByTagName()` 方法的功能是通过标签名得到节点数组。

> 注意：得到的是一个数组！

```html
<p>我是段落</p>
<p>我是段落</p>
<p>我是段落</p>
<p>我是段落</p>
```

```javascript
var ps = document.getElementsByTagName('p');
```

【注意事项】

数组方便遍历，从而可以批量操控元素节点。

即使页面上只有一个指定标签名的节点，也将得到长度为 1 的数组。

任何一个节点元素也可以调用 getElementsByTagName() 方法，从而得到其内部的某种标签名的元素节点。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        window.onload = function () {
            var ps = document.getElementsByTagName('p');
            console.log(ps);	// HTMLCollection(6) [p, p, p, p, p, p]
        }
    </script>
</head>

<body>
    <div id="box1">
        <p>我是段落</p>
        <p>我是段落</p>
        <p>我是段落</p>
    </div>
    <div id="box2">
        <p>我是段落</p>
        <p>我是段落</p>
        <p>我是段落</p>
    </div>
</body>

</html>
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        window.onload = function () {
            // 先得到 box1
            var box1 = document.getElementById('box1');
            // 得到 box1 中的 p 标签的数组
            var ps_inbox1 = box1.getElementsByTagName('p');
            console.log(ps_inbox1);	// HTMLCollection(3) [p, p, p]
        }
    </script>
</head>

<body>
    <div id="box1">
        <p>我是段落</p>
        <p>我是段落</p>
        <p>我是段落</p>
    </div>
    <div id="box2">
        <p>我是段落</p>
        <p>我是段落</p>
        <p>我是段落</p>
    </div>
</body>

</html>
```

### 3.7 getElementsByClassName()

`getElementsByClassName()` 方法的功能是通过类名得到节点数组。

- HTML

```html
<div class="spec">我是盒子</div>
<div>我是盒子</div>
<div class="spec">我是盒子</div>
<div class="spec">我是盒子</div>
```

- JS

```javascript
var spec_divs = document.getElementsByClassName('spec');
```

【注意事项】

`getElementsByClassName()` 方法从 IE9 开始兼容。

某个节点元素也可以调用 getElementsByClassName() 方法，从而得到其内部的某类名的元素节点。

### 3.8 querySelector()

`querySelector()` 方法的功能是通过选择器得到元素。

- HTML

```html
<div id="box1">
	<p>我是段落</p>
    <p class="spec">我是段落</p>
    <p>我是段落</p>
</div>
```

- JS

```javascript
var the_p = document.querySelector('#box1 .spec');
```

【注意事项】

querySelector() 方法只能得到页面上一个元素，如果有多个元素符合条件，则只能得到第一个元素。

querySelector() 方法从 IE8 开始兼容，但从 IE9 开始支持 CSS3 的选择器，如：`nth-child()`、`:[src^='dog']` 等 CSS3 选择器形式都支持良好。

> 注意：不能选择伪类！

### 3.9 querySelectorAll()

`querySelectorAll()` 方法的功能是通过选择器得到元素数组。

即使页面上只有一个符合选择器的节点，也将得到长度为 1 的数组。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul id="list1">
        <li>我是li</li>
        <li>我是li</li>
        <li>我是li</li>
        <li>我是li</li>
        <li>我是li</li>
    </ul>
    <ul id="list2">
        <li>我是li</li>
        <li>我是li</li>
        <li>我是li</li>
        <li>我是li</li>
        <li>我是li</li>
    </ul>
    <script>
        var lis_inlist1 = document.querySelectorAll('#list1 li');

        console.log(lis_inlist1);	// NodeList(5) [li, li, li, li, li]
    </script>
</body>

</html>
```

### 3.10 document.open()，document.close()

`document.open`方法清除当前文档所有内容，使得文档处于可写状态，供`document.write`方法写入内容。

`document.close`方法用来关闭`document.open()`打开的文档。

```js
document.open();
document.write('hello world');
document.close();
```

### 3.11 document.write()

`document.write`方法用于向当前文档写入内容。

在网页的首次渲染阶段，只要页面没有关闭写入（即没有执行`document.close()`），`document.write`写入的内容就会追加在已有内容的后面。

```js
// 页面显示“helloworld”
document.open();
document.write('hello');
document.write('world');
document.close();
```

注意，`document.write`会当作 HTML 代码解析，不会转义。

```js
document.write('<p>hello world</p>');
```

上面代码中，`document.write`会将`<p>`当作 HTML 标签解释。

### 3.12 剩下的方法将在后续章节讲解