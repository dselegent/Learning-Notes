# 03 【语义标签(下) CSS简介】

## 1.语义标签(下)

### 1.1 表格

#### 1.1.1 表格的主要作用

表格主要用于显示、展示数据。因为它可以让数据显示得非常的规整，可读性非常好。特别是后台展示数据的时候，能够熟练运用表格就显得很重要。一个清爽简约的表格能够把繁杂的数据表现得很有条理（合理的使用表格也能够有效提高 SEO）。

**注意：**表格不是用来布局页面的，而是用来展示数据的。**表格常用于表单数据的 “布局”**。

> 特别强调，表格是用于表单数据的 “布局”，而不是页面的布局！

#### 1.1.2 表格的基本语法

```html
<table>
    <tr>
        <td>单元格</td>
        ...
    </tr>
    ...
</table>
```

- `<table>` `</table>` 是用于定义表格的标签
- `<tr>` `</tr>` 用于定义表格中的行，必须嵌套在 `<table>` `</table>` 标签中
- `<td>` `</td>` 用于定义表格中的单元格，必须嵌套在 `<tr>` `</tr>` 标签中
- 字母 td 指表格数据（table data），即：数据单元格的内容
- 单元格 td 里面可以放任何的元素

#### 1.1.3 表头单元格标签

一般表头单元格位于表格的第一行或第一列，作用是：突出重要性，表头单元格里面的文本内容**默认加粗居中**显示。

`<th>` 标签表示 HTML 表格的表头部分（table head 的缩写）。

```html
<table>
    <tr>
    	<th>姓名</th>
        <th>性别</th>
        <th>年龄</th>
        ...
    </tr>
    ...
</table>
```

#### 1.1.4 表格属性

**注意：**表格标签的属性在实际开发中并不常用，而是通过后面的 CSS 来设置，这里了解即可。

以下属性都写在 table 开始标签内，多个属性之间用空格隔开。

```html
<table align="center" border="1" cellpadding="0" cellspacing="0" width="500" height="240">
    ...
</table>
```

| 属性名        | 属性值                    | 描述                                                         |
| :------------ | :------------------------ | :----------------------------------------------------------- |
| `align`       | `left`、`center`、`right` | 规定表格相对周围元素的对齐方式（默认 left），注意指的是整个表格的对齐方式（表格是在父盒子中默认往左靠，还是居中或是往右靠），而不是指单元格内容的对齐方式（单元格内容对齐可以通过：`style="text-align: center;"` 设置）（了解） |
| `border`      | `1` 或 `""`               | 规定表格单元是否拥有边框，默认为 ""，表示没有边框（了解）    |
| `cellpadding` | 像素值                    | 规定单元边沿与其内容之间的空白，默认 1 像素（了解）          |
| `cellspacing` | 像素值                    | 规定单元格之间的空白，默认 2 像素（了解）                    |
| `width`       | 像素值 或 百分比          | 规定表格的宽度（了解）                                       |
| `height`      | 像素值 或 百分比          | 规定表格的高度（了解）                                       |

但是一般是通过css去控制

```css
table {
    width: 50%;
    margin: 0 auto;
    border: 1px black solid;

    /* border-spacing：指定边框之间的距离；边框之间虽然没有距离了，但是实际上是两条边框的和，看起来是变粗了 */
    /* border-spacing: 0; */

    /*border-collapse:collapse；设置边框的合并；真正的将两条边框合并成一条边框 */
    border-collapse: collapse;
    
    /* 默认情况下元素在td中是垂直居中的，可以通过vectical-align来修改 */
    vertical-align: middle;
    text-align: center;
}

/* 如果表格中没有使用tbody而是直接使用tr，那么浏览器会自动创建一个tbody，并且将tr全都放到tbody中
   所以说，tr不是table的子元素 */
tbody tr:nth-child(odd) {
    background-color: rgb(211, 216, 188);
}

td {
    border: 1px black solid;
}
```

#### 1.1.5 表格结构标签

**使用场景：**因为表格可能很长，为了更好的表示表格的语义，可以将表格分割成：`表格头部` 和 `表格主体` 两大部分。

在表格标签中，分别用：`<thead>` 标签表示表格的头部区域，`<tbody>` 标签表示表格的主体区域，这样可以更好的分清表格结构。

- `<thead>` `</thead>`：用于定义表格的头部，`<thead>` 内部必须拥有 `<tr>` 标签，一般是位于第一行，且一般 `<tr>` 标签中推荐放置 `<th>` 标签
- `<tbody>` `</tbody>`：用于定义表格的主体，主要用于放数据本体
- 以上标签都是放在 `<table>` `</table>` 标签中

```html
<table>
    <!-- 头部区域 -->
    <thead>
    	<tr>
    		<th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
        	...
    	</tr>
    </thead>
    <!-- 主体区域 -->
    <tbody>
        <tr>
            <td>周吉瑞</td>
            <td>男</td>
            <td>18</td>
            ...
        </tr>
        ...
    </tbody>
</table>
```

#### 1.1.6 合并单元格

特殊情况下，可以把多个单元格合并为一个单元格，这里会最简单的合并单元格即可。

**合并单元格的方式：**

- 跨行合并（上下合并）：`rowspan="合并单元格的个数"`
- 跨列合并（左右合并）：`colspan="合并单元格的个数"`

**目标单元格：（写合并代码）**

- 跨行：最上侧单元格为目标单元格，与下侧的合并
- 跨列：最左侧单元格为目标单元格，与右侧的合并

**合并单元格三步曲：**

- 先确定是跨行还是跨列合并
- 找到目标单元格，写上 `合并方式=合并的单元格数量`，比如：`<td colspan="2">` `</td>`
- 删除多余单元格

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <table width="500" height="249" border="1" cellspacing="0">
        <tr>
            <td></td>
            <td colspan="2"></td>
            <!-- <td></td> -->
        </tr>
        <tr>
            <td rowspan="2"></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <!-- <td></td> -->
            <td></td>
            <td></td>
        </tr>
    </table>
</body>

</html>
```

![image-20220701142701509](https://i0.hdslb.com/bfs/album/1161632280111b537d2aa02f44a2c733f71ea7c0.png)

### 1.2 表单

#### 1.2.1 为什么需要表单

使用表单的目的是收集用户信息。

在网页中，需要跟用户进行交互，收集用户资料，此时就需要表单。

#### 1.2.2 表单的组成

在 HTML 中，一个完整的表单通常由 `表单域`、`表单控件`（也称为表单元素）和 `提示信息`  3 个部分构成。

#### 1.2.3 表单域

**表单域是一个包含表单元素的区域。**

在 HTML 标签中，`<form>` 标签用于定义表单域，以实现用户信息的收集和传递。

`<form>` 会把它范围内的表单元素信息提交给服务器。

```html
<form action="url地址" method="提交方式" name="表单域名称">
    <!-- 各种表单元素控件 -->
</form>
```

**常用属性：**

| 属性名   | 属性值         | 作用                                               |
| -------- | -------------- | -------------------------------------------------- |
| `action` | `url` 地址     | 用于指定接收并处理表单数据的服务器程序的 url 地址  |
| `method` | `get` / `post` | 用于设置表单数据的提交方式，其取值为 get 或 post   |
| `name`   | 名称           | 用于指定表单的名称，以区分同一个页面中的多个表单域 |

注意：对于 HTML 基础的学习来说，暂时不用考虑提交数据，只需写上 form 标签即可，后面学习服务端编程阶段会重新讲解。

**form 表单中 method 的 get 和 post 区别：**

> method 方法规定如何发送表单数据（form-data）（表单数据会被发送到在 action 属性中规定的页面中）。
>
> 表单数据可被作为 URL 变量的形式来发送（method="get"）或者作为 HTTP post 事务的形式来发送（method="post"）。
>
> **关于 GET 的注释：**
>
> - 将表单数据以名称/值对的形式附加到 URL 中
> - URL 的长度是有限的（大约 3000 字符）
> - 绝不要使用 GET 来发送敏感数据！（在 URL 中是可见的，且浏览器会记录 URL）
> - 对于用户希望加入书签的表单提交很有用（因为信息记录在 URL 中，直接保存 URL 即可）
> - GET 更适用于非安全数据，比如在 Google 中查询字符串
>
> **关于 POST 的注释：**
>
> - 将表单数据附加到 HTTP 请求的 body 内（数据不显示在 URL 中）
> - 没有长度限制
> - 通过 POST 提交的表单不能加入书签

#### 1.2.4 表单控件（表单元素）

在表单域中可以定义各种表单元素，这些表单元素就是允许用户在表单中输入或者选择的内容控件。

**（1）\<input>  表单元素**

在英文单词中，input 是输入的意思，而在表单元素中 `<input>` 标签用于收集用户信息。

在 `<input>` 标签中，包含一个 type 属性，根据不同的 type 属性值，输入字段拥有很多种形式（可以是文本、字段、复选框、掩码后的文本控件、单选按钮、按钮等）。

```html
<input type="属性值" />
```

- `<input />` 标签为单标签

- type 属性设置不同的属性值用来指定不同的控件类型

**type 属性的属性值及其描述如下：**

| 属性值     | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| `button`   | 定义可点击按钮（多数情况下，用于通过 JavaScript 启动脚本）   |
| `checkbox` | 定义复选框，即：多选框，在一组多选中，要求它们必须拥有相同的 name |
| `file`     | 定义输入字段和 “浏览” 按钮，供文件上传                       |
| `hidden`   | 定义隐藏的输入字段                                           |
| `image`    | 定义图像形式的提交按钮                                       |
| `password` | 定义密码字段，该字段中的字符被掩码                           |
| `radio`    | 定义单选按钮，在一组单选按钮中，要求它们必须拥有相同的 name  |
| `reset`    | 定义重置按钮，重置按钮会清除表单中的所有数据                 |
| `submit`   | 定义提交按钮，提交按钮会把表单数据发送到服务器               |
| `text`     | 定义单行的输入字段，用户可在其中输入文本，默认宽度为 20 个字符 |

【hidden解释】

> `<input type="hidden" name="..." value="...">`
> 上面是 html 中的隐藏域。主要作用为：
>
> 1. 隐藏域在页面中对于用户是不可见的，在表单中插入隐藏域的目的在于收集或发送信息，以利于被处理表单的程序所使用。浏览者单击发送按钮发送表单的时候，隐藏域的信息也被一起发送到服务器。
> 2. 有些时候我们要给用户一信息，让他在提交表单时提交上来以确定用户身份，如 sessionkey，等等。当然这些东西也能用 cookie 实现，但使用隐藏域就简单的多了。而且不会有浏览器不支持，也避免了用户禁用 cookie 后的烦恼。
> 3. 有些时候一个 form 里有多个提交按钮，怎样使程序能够分清楚到底用户是按那一个按钮提交上来的呢？我们就可以写一个隐藏域，然后在每一个按钮处加上   onclick="document.form.command.value="xx"" 然后我们接到数据后先检查 command 的值就会知道用户是按的那个按钮提交上来的。
> 4. 有时候一个网页中有多个 form，我们知道多个 form 是不能同时提交的，但有时这些 form 确实相互作用，我们就可以在 form 中添加隐藏域来使它们联系起来。
> 5. javascript 不支持全局变量，但有时我们必须用全局变量，我们就可以把值先存在隐藏域里，它的值就不会丢失了。
> 6. 定义隐藏输入字段，隐藏字段对于用户是不可见的。隐藏字段常常存储默认值。
> 7. 通常是提交一些表格的时候，有些变量是预先定了其值的，而且不想客户再改变其值，所以用 hidden 隐藏，但提交表单的时候还是会把其值上交上去的。
>
> 以上为基本用法，其实和文本框差不多的作用，唯一的区别就是用户界面是不可见的。
>
> 在使有中要注意，不要将敏感信息存放在隐藏域里！尽管一般用户看不到它。
>
> 【案例】
>
> ```html
> <!doctype html>
> <html lang="en">
> 
> <head>
>     <meta charset="UTF-8">
>     <meta http-equiv="X-UA-Compatible" content="IE=edge">
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
>     <title>Document</title>
> </head>
> 
> <body>
> <form action="http://127.0.0.1:8080/" method="get">
>     <input type="hidden" name="name" value="dselegent">
>     <input type="submit">
> </form>
> 
> </body>
> 
> </html>
> ```
>
> 

**除 type 属性外，`<input>` 标签还有很多其他属性，其常用属性如下：**

| 属性名      | 属性值       | 描述                                        |
| ----------- | ------------ | ------------------------------------------- |
| `name`      | 由用户自定义 | 定义 input 元素的名称                       |
| `value`     | 由用户自定义 | 规定 input 元素的值，也就是提交到服务器的值 |
| `checked`   | checked      | 规定此 input 元素首次加载时应当被选中       |
| `maxlength` | 正整数       | 规定输入字段中的字符的最大长度              |

- `name` 和 `value` 是每个表单元素都有的属性值，主要给后台人员使用
- `name` 表单元素的名字，要求：单选按钮和复选框要有相同的 name 值
- `checked` 属性主要针对于单选按钮和复选框，主要作用：打开页面时默认选中某个表单元素
- `maxlength` 是用户可以在表单元素输入的最大字符数，一般很少使用

**<1>、有些表单元素刚打开页面就须要默认显示几个文字怎么做？**

答：可以给这些表单元素设置 `value属性="值"`。

```html
用户名：<iuput type="text" value="请输入用户名" />
```

**<2>、页面中的表单元素很多，如何区别不同的表单元素？**

答：name 属性：当前 input 表单的名字，后台可以通过这个 name 属性找到这个表单，页面中的表单很多，name 的主要作用就是用于区别不同的表单。

```html
用户名：<input type="text" value="请输入用户名" name="username" />
```

- name 属性后面的值是自定义的
- radio（或者 checkbox）如果是一组，我们必须给他们命名相同的名字

```html
<input type="radio" name="sex" />男
<input type="radio" name="sex" />女
```

**<3>、如果页面一打开就让某个单选按钮或者复选框是选中状态？**

答：checked 属性：表示默认选中状态，用于单选按钮和复选按钮。

```html
性 别：
<input type="radio" name="sex" value="男" checked="checked" />男
<input type="radio" name="sex" value="女" >女
```

- \<label\> 标签

`<label>` 标签为 input 元素定义标注（标签）。

`<label>` 标签用于绑定一个表单元素，当点击 `<label>` 标签内的文本时，浏览器就会自动将焦点（光标）转到或者选择对应的表单元素上，用来增加用户体验。

**语法：**

```html
<label for="sex">男</label>
<input type="radio" name="sex" id="sex" />
<label>
    男<input type="radio" value="男" name="sex" />
</label>
```

**核心：** `<label>` 标签的 for 属性应当与相关元素的 id 属性相同。

<img src="https://i0.hdslb.com/bfs/album/baa64549a4f08eb1a67a102974962c084e30200d.gif" style="zoom:50%;" />

**（2）\<select> 表单元素**

**使用场景：**在页面中，如果有多个选项让用户选择，并且想要节约页面空间时，我们可以使用 `<select>` 标签控件定义下拉列表。

**语法：**

```html
<select>
    <option>选项1</option>
    <option>选项2</option>
    <option>选项3</option>
    ...
</select>
```

- `<select>` 中至少包含一对 `<option>`
- 在 `<option>` 中定义 `selected="selected"` 时，当前项即为默认选中项

每个 `<option>` 元素都应该有一个 value 属性，其中包含选择该选项时要提交给服务器的数据值。如果不包含 value 属性，则 value 默认为元素内包含的文本。可以在 `<option>` 元素上包含 selected 属性，以使其在页面首次加载时默认选中。

**（3）\<textarea> 表单元素**

**使用场景：**当用户输入内容较多的情况下，我们就不能使用文本框表单了，此时我们可以使用 `<textarea>` 标签

在表单元素中，`<textarea>` 标签是用于定义多行文本输入的控件。

使用多行文本输入控件，可以输入更多的文字，该控件常用于留言板、评论。

**语法：**

```html
<textarea rows="3" cols="20">
	文本内容
</textarea>
```

- 通过 `<textarea>` 标签可以轻松地创建多行文本输入框
- `cols="每行中的字符数"`，`rows="显示的行数"`，我们在实际开发中不会使用，都是用 CSS 来改变大小

- 如果要禁止拉伸文本框大小，则：`style="resize: none" `

#### 1.2.5按钮

```html
<!-- 提交按钮 -->
<input type="submit">
<!-- 重置按钮 -->
<input type="reset">
<!-- 普通按钮 -->
<input type="button" value="按钮">
<br><br>
<button type="submit">提交</button>
<button type="reset">重置</button>
<button type="button">按钮</button>
```

![image-20220701144214407](https://i0.hdslb.com/bfs/album/30309de4d744e4c1f0a15040483cb16ec1234cdb.png)

上面两种写法实际上效果是一致的，区别在于：

- `input`是自闭合标签，不需要`</input>`就能结束；`button`不是自闭合标签，跟一般标签一样是成对出现的

- `button`因为不是自闭合标签，所以使用起来更灵活，可以嵌套其他的标签

> 除了type=button，都会跳转页面

#### 1.2.6表单的css

某些表单元素激活时会有`outline`默认样式

![image-20220731132608369](https://i0.hdslb.com/bfs/album/98a48b2524e89aea42318662ee210ad0bc7510d1.png)

```html
    <form action="target.html">
<!-- 
    autocomplete="off" 关闭自动记录
    readonly 将表单项设置为只读，数据会提交
    disabled 将表单项设置为禁用，数据不会提交
    autofocus 设置表单项自动获取焦点（自动激活那个输入框）
 -->
        <input type="text" name="username" value="hello" readonly>
        <br><br>
        <input type="text" name="username" autofocus>
        <br><br>
        <input type="text" name="b">

        <input type="submit">
        <!-- 重置按钮 -->
        <input type="reset">
        <!-- 普通的按钮 -->
        <input type="button" value="按钮">

        <br><br>
        

        <button type="submit">提交</button>
        <button type="reset">重置</button>
        <!-- 普通的按钮(仅仅是能够按，没有别的作用) -->
        <button type="button">按钮</button>
    </form>
```

**多文件演示**

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML5新增表单属性</title>
    <style>
        input::placeholder {
            color: hotpink;
        }
    </style>
</head>
<body>
<form action="">
    <input type="search" name="sear" id="one" required="required" placeholder="pink老师" autofocus="autofocus"
           autocomplete="off">
    <input type="file" name="" id="two" multiple="multiple">
    <input type="submit" value="提交">
</form>

</body>
</html>
```

![](https://i0.hdslb.com/bfs/album/d1708262711144e74f8b392c9033e5d586ce8c85.gif)

**快捷输入**

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML5新增表单属性</title>
    <style>
        input::placeholder {
            color: hotpink;
        }
    </style>
</head>

<body>
    <form action="">
        <input type="search" name="sear" id="one" required="required" placeholder="pink老师" autofocus="autofocus"
            autocomplete="on">
        <input type="submit" value="提交">
    </form>

</body>

</html>
```

![](https://i0.hdslb.com/bfs/album/3f2743928ba6dfb8fcd41d4f6392044a79cacd06.gif)

**自动聚焦**

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML5新增表单属性</title>
    <style>
        input::placeholder {
            color: hotpink;
        }
    </style>
</head>

<body>
    <form action="">
        <input type="search" name="sear" id="one" required="required" placeholder="pink老师" autofocus="autofocus"
            autofocus="autofocus">
        <input type="submit" value="提交">
    </form>

</body>

</html>
```

![](https://i0.hdslb.com/bfs/album/838c5b90439d63d2a18d1551bd54ad1d3ccd4b6f.gif)

#### 1.2.7HTML5新增的input类型

![image-20220731133234163](https://i0.hdslb.com/bfs/album/2e6552c3c48a889a6030bfe2f02232e9f0422749.png)

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
<!-- 我们验证的时候必须添加form表单域 -->
<form action="">
    <ul>
        <li>邮箱: <input type="email"/></li>
        <li>网址: <input type="url"/></li>
        <li>日期: <input type="date"/></li>
        <li>时间: <input type="time"/></li>
        <li>数量: <input type="number"/></li>
        <li>手机号码: <input type="tel"/></li>
        <li>搜索: <input type="search"/></li>
        <li>颜色: <input type="color"/></li>
        <!-- 当我们点击提交按钮就可以验证表单了 -->
        <li><input type="submit" value="提交"></li>
    </ul>
</form>
</body>

</html>
```

<img src="https://i0.hdslb.com/bfs/album/94f0953cb3562eac99ca94deb2906ad94b581b10.png" style="zoom:50%;" />

<img src="https://i0.hdslb.com/bfs/album/5b12c3d4e61c9de83d59344d25b08030fe84a14b.png" style="zoom:50%;" />

<img src="https://i0.hdslb.com/bfs/album/4610b30c1d477d5bd8c4ba4f58e1b1b80ac70535.png" style="zoom:50%;" />

<img src="https://i0.hdslb.com/bfs/album/7aeeb0ce7dde42580b063bbabfe18faff11d0c0e.png" style="zoom:50%;" />

注意：HTML5 所提供的 input 类型可以依据具体的系统环境适配界面样式。

<img src="https://i0.hdslb.com/bfs/album/49c3b15368ca138333b3b930fc6e7515ccb6729d.jpg" style="zoom:33%;" />

<img src="https://i0.hdslb.com/bfs/album/6f23b8838314c903be49d7069283a47b9ac437e5.jpg" style="zoom:33%;" />

<img src="https://i0.hdslb.com/bfs/album/6af31795253bc6175bd6226d418dd5d413045abb.jpg" style="zoom:33%;" />

<img src="https://i0.hdslb.com/bfs/album/3f4964b3a2a70c3c0ae3655dc0516e7834c47ce4.jpg" style="zoom:33%;" />

<img src="https://i0.hdslb.com/bfs/album/838f2805c1ad71646fbc31500681a421f22e91e0.jpg" style="zoom:33%;" />

当为数值框时，输入法自动打开数字键盘！

<img src="https://i0.hdslb.com/bfs/album/1a0b2a65d0249f3225e3c300b2ec7cc1df1aedb7.jpg" style="zoom:33%;" />

#### 1.2.8表单元素几个总结

（1）表单元素我们学习了三大组 `input 输入表单元素`、`select 下拉表单元素`、`textarea 文本域表单元素`

（2）这三组表单元素都应该包含在 `form 表单域` 里面，并且应该有 `name 属性`

```html
<form>
    <input type="text" name="username">
    <select name="jiguan">
        <option>北京</option>
    </select>
    <textarea name="message"></textarea>
</form>
```

（3）有三个名字非常相似的标签：

- 表单域 form 使用场景：提交区域内表单元素给后台服务器
- 文件域 file 是 input type 属性值 使用场景：上传文件
- 文本域 textarea 使用场景：可以输入多行文字，比如：留言板、网站介绍等……

> 表单中 name 属性的重要性：
>
> name 属性用于对提交到服务器后的表单数据进行标识。注意：只有设置了 name 属性的表单元素才能在提交表单时传递它们的值。简单来说，name 就是提交到后台的索引，比如在复选框中都要设置成name="hobby" 说明几个复选框都在 ”爱好“ 下。
>
> 即：表单想要把数据提交到指定的位置，表单控件必须要有 name 属性。

##  2.CSS简介

###  2.1 什么是CSS

CSS 是 `层叠样式表` 的简称。

有时我们也会称之为 `CSS样式表` 或 `级联样式表`。

CSS 也是一种 `标记语言`。

CSS 主要用于设置 HTML 页面中的文本样式（字体、大小、颜色、对齐方式……）、图片样式（宽高、边框样式、边距……）以及版面的布局和外观显示样式。

CSS 让我们的网页更加丰富多彩，布局更加灵活自如，简单理解：CSS 可以美化 HTML，让 HTML 更漂亮，同时让页面布局更简单。

**层叠样式表**

网页实际上是一个多层的结构，通过CSS可以分别为网页的每一个层来设置样式，而最终我们能看到只是网页的最上边一层

总之一句话，CSS用来设置网页中元素的样式

**总结：**

- HTML 搭建结构，填入元素内容
- CSS 美化 HTML，布局网页元素
- CSS 最大价值：由 HTML 专注去做结构呈现，样式交给 CSS，即：**结构 与 样式 分离**



###  2.2 CSS语法规范

使用 HTML 时，需要遵从一定的规范，CSS 也是如此，要想熟练地使用 CSS 对网页进行修饰，首先需要了解 CSS 样式规则。

CSS 规则由两个主要的部分构成：`选择器` 以及 `一条或多条声明`。

- `选择器` 是用于选出需要设置 CSS 样式的 HTML 标签，**花括号**内是对该对象设置的具体样式
- `属性` 和 `属性值` 以 `“键值对”` 的形式出现 `属性: 属性值;`
- 属性是对指定的对象设置的样式属性，例如：字体大小、文本颜色等
- 属性和属性值之间用英文 `:` 分开
- 多个 “键值对” 之间用英文 `;` 进行区分（末尾的键值对可以不加 `;`）

所有的样式，都包含在 `<style>` 标签内，表示是样式表。

`<style>` 一般写到 `</head>` 里。

```html
<head>
    <style type="text/css">
        h4 {
            color: bule;
            font-size: 100px;
        }
    </style>
</head>
```

注意：`<style>` 标签可以写到其他标签内部并作用与该标签区域内，但是强烈不推荐这种写法！

> `type="text/css"` 可以省略。

###  2.3 CSS代码风格

####  2.3.1 样式格式书写

- 紧凑格式（不推荐）

```css
h3 { color: deeppink; font-size: 20px; }
```

- 展开格式（**推荐**）

```css
h3 {
	color: deeppink;
	font-size: 20px;
}
```

强烈推荐第二种格式，因为更直观！不用担心占用空间，因为后期可以通过代码压缩工具来压缩代码。

####  2.3.2 样式大小书写

- 大写（不推荐）

```css
H3 {
	COLOR: PINK;
}
```

- 小写（**推荐**）

```css
h3 {
	color: pink;
}
```

强烈推荐样式选择器，属性名，属性值关键字**全部使用小写字母**，特殊情况除外。

> 凡是你不确定是否用大写的都一律用小写就对了！

####  2.3.3 空格规范

```css
h3 {
	color: pink;
}
```

- **属性值前面**，**冒号后面**，保留一个空格
- **选择器（标签）和前花括号中间**，保留一个空格

###  2.4 注释

####  2.4.1 css中的注释

只能使用`/*`和`*/`包裹。即不管是单行注释，还是多行注释，都是以`/*`开头，以`*/`结尾

```css
/* css中的单行注释 */

/* 
css中的多行注释
css中的多行注释
css中的多行注释
*/
```

####  2.4.2 html中的注释

只能使用`<!--`和`-->`包裹。即不管是单行注释，还是多行注释，都是以`<!--`开头，以`-->`结尾

```html
<!-- html中的单行注释 -->

<!-- 
html中的多行注释
html中的多行注释
html中的多行注释
-->
```

####  4.3JS(JavaScript)中的注释

单行注释使用`//`。多行注释使用`/*`和`*/`包裹，以`<!--开头，以-->`结尾

```js
/* JS(JavaScript)中的单行注释*/

/*
JS(JavaScript)中的多行注释
JS(JavaScript)中的多行注释
JS(JavaScript)中的多行注释
*/
```

###  2.5 基本语法

```
选择器 声明块
```

**选择器**

通过选择器可以选中页面中的指定元素

- 比如`p`的作用就是选中页面中所有的`p`元素声明块

**声明块**

通过声明块来指定要为元素设置的样式

-  声明块由一个一个的声明组成，声明是一个名值对结构 

-  一个样式名对应一个样式值，名和值之间以`:`连接，以`;`结尾 

```css
h1{
    color: green;
}
```

###  2.6 CSS 命名规范

页面外围控制整体布局宽度：`wrapper`、页头：`header`、页面主体：`main`、内容：`content`、页脚：`footer`、导航：`nav`、主导航：`mainbav`、子导航：`subnav`、顶导航：`topnav`、边导航：`sidebar`、左导航：`leftsidebar`、右导航：`rightsidebar`、菜单：`menu`、子菜单：`submenu`、搜索：`search`、栏目：`column`、侧栏：`sidebar`、功能区（商品模块）：`shop`、左右中：`left` `right` `center`、登录：`login`、登录条：`loginbar`、注册：`regsiter`、标志：`logo`、横幅广告：`banner`、热点：`hot`、新闻：`news`、按钮：`btn`、滚动：`scroll`、标签页：`tab`、文章列表：`list`、 标题：`title`、摘要：`summary`、提示信息：`msg`、小技巧：`tips`、图标：`icon`、下载：`download`、加入我们：`joinus`、注释：`note`、指南：`guild`、服务：`service`、状态：`status`、投票：`vote`、合作伙伴：`partner`、链接：`link`、友情链接：`friendlink`、版权：`copyright`

###  2.7 CSS属性书写顺序

**建议遵循以下顺序：**

1. 布局定位属性：`display / position / float / clear / visibility / overflow`（建议 `display` 第一个写，毕竟关系到模式）

2. 自身属性：`width / height / margin / padding / border / background`

3. 文本属性：`color / font / text-decoration / text-align / vertical-align / white- space / break-word`

4. 其他属性（CSS3）：`content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …`

```css
.jdc {
	display: block;
	position: relative;
	float: left;
	width: 100px;
	height: 100px;
	margin: 0 10px;
	padding: 20px 0;
	font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
	color: #333;
	background: rgba(0,0,0,.5);
	border-radius: 10px;
}
```

###  2.8 SEO优化

> SEO 优化是个复杂长期的过程，此处只是简单的介绍 SEO 优化，目的是提高前端开发者的认知。

SEO（Search Engine Optimization）：汉译为**搜索引擎优化**。是一种方式：利用[搜索引擎](https://baike.baidu.com/item/搜索引擎/104812)的规则提高网站在有关搜索引擎内的[自然排名](https://baike.baidu.com/item/自然排名/2092669)。目的是让其在行业内占据领先地位，获得[品牌](https://baike.baidu.com/item/品牌/235720)收益。很大程度上是网站经营者的一种商业行为，将自己或自己公司的排名前移。（百度百科）

![](https://i0.hdslb.com/bfs/album/2beaeeacc3cd18e244c3d36c73f0a380de0db3a7.png)

> 外链：链接到外部网页的链接，外链不是越多越好，而是外链的质量越高、越合理、越方便越好。
>
> 反链：被其他页面链接，反链的源头质量越高、链接次数越高越好。

- [Google PageRank算法 - 黄规速博客：学如逆水行舟，不进则退-CSDN博客](https://blog.csdn.net/hguisu/article/details/7996185)

- [Google 段落排名算法（Passage Ranking）全解读 - 阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/782412)

**【用户体验优化】**

网站体验也可称为网站用户体验，如何做好这一步优化！ 首先得确定你的目标用户群体，了解他们的上网习惯，分析他们的心理。然后顺着用户的特征来一步步优化网站，从而获得用户的青睐，通过用户体验优化来提高转换率。

**UEO（用户体验优化）=PV/OR**

- PV：即页面浏览量或点击量

- OR：跳出率，跳出率指那些访问该网站，仅浏览了一个页面就离开的用户所占的比例

**从上述可以看出，用户跳出率低，页面浏览量就越高，用户体验就越好！**

###  2.9 狭义的 HTML5 CSS3

1. HTML5 结构本身

   ![](https://i0.hdslb.com/bfs/album/502508e02ec9f736df2c96e8bd8aef6e7849bfa8.png)

2. CSS3 相关样式

   ![](https://i0.hdslb.com/bfs/album/fe1ab562812a9d70863c317bee62da172687e23f.png)

###  2.10 广义的 HTML5

1. 广义的 HTML5 是 HTML5 + CSS3 + JavaScript
2. 这个集合有时称为 H5
3. 虽然 HTML5 的一些特性仍然不被某些浏览器支持，但是它是一种发展趋势
