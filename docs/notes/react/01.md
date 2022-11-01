# 01 【react入门】

## 1.React简介

**react是什么？**

**React** 是一个用于构建用户界面的 JavaScript 库。

- 是一个将数据渲染为 HTML 视图的开源 JS 库
- 它遵循基于组件的方法，有助于构建可重用的 UI 组件
- 它用于开发复杂的交互式的 web 和移动 UI

> React 有什么特点？

1. 使用虚拟 DOM 而不是真正的 DOM
2. 它可以用服务器渲染
3. 它遵循单向数据流或数据绑定
4. 高效
5. 声明式编码，组件化编码

> React 的一些主要优点？

1. 它提高了应用的性能
2. 可以方便在客户端和服务器端使用
3. 由于使用 JSX，代码的可读性更好
4. 使用React，编写 UI 测试用例变得非常容易

**为什么学？**

1.原生JS操作DOM繁琐，效率低

2.使用JS直接操作DOM,浏览器会进行大量的重绘重排

3.原生JS没有组件化编码方案，代码复用低

> 在学习之前最好看一下关于npm的知识：下面是我在网上看见的一个写的还不错的npm的文章
>
> [npm](https://blog.csdn.net/qq_25502269/article/details/79346545)

## 2.React 基础案例

首先需要引入几个 react 包

- React 核心库、操作 DOM 的 react 扩展库、将 jsx 转为 js 的 babel 库

【先引入react.development.js，后引入react-dom.development.js】

> `react.development.js`
>
> - react 是react核心库，只要使用react就必须要引入
> - 下载地址：https://unpkg.com/react@18.0.0/umd/react.development.js
>
> `react-dom.development.js`
>
> - react-dom 是react的dom包，使用react开发web应用时必须引入
> - 下载地址：https://unpkg.com/react-dom@18.0.0/umd/react-dom.development.js
>
> `babel.min.js `
>
> - 由于JSX最终需要转换为JS代码执行，所以浏览器并不能正常识别JSX，所以当我们在浏览器中直接使用JSX时，还必须引入babel来完成对代码的编译。
>
> - babel下载地址：https://unpkg.com/babel-standalone@6/babel.min.js

![image-20221022171647360](https://i0.hdslb.com/bfs/album/514c5df0f5f8e7242ca17e1c939b4822b716315f.png)

```
react.development.js
react-dom.development.js
babel.min.js 
```

2.创建一个容器

3.创建虚拟DOM，渲染到容器中

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>hello_react</title>
  </head>
  <body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库 -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
      /* 此处一定要写babel */
      //1.创建虚拟DOM
      const VDOM = <h1>Hello</h1> /* 此处一定不要写引号，因为不是字符串 */
      //2.渲染虚拟DOM到页面
	const root = ReactDOM.createRoot(document.querySelector('#test'));
      root.render(VDOM);
    </script>
  </body>
</html>
```

> 后面很多地方没有用`createRoot`这种方式是因为一开始学的课程是2020年的，这是现在新的创建方式。
>
> 这里我就只把第一个案例改成新方式了

这样，就会在页面中的这个div容器上添加这个h1.

![image-20221022171539523](https://i0.hdslb.com/bfs/album/7c5713f248cc28bcb531d2eda325e56789df4286.png)

> *   React.createElement()
>     - `React.createElement(type, [props], [...children])`
>     - 用来创建React元素
>     - React元素无法修改
> *   ReactDOM.createRoot()
>     - `createRoot(container[, options])`
>     - 用来创建React的根容器，容器用来放置React元素
> *   ReactDOM.render()
>     *   `root.render(element)`
>     *   用来将React元素渲染到根元素中
>     *   根元素中所有的内容都会被删除，被React元素所替换
>     *   当重复调用render()时，React会将两次的渲染结果进行比较，
>     *   它会确保只修改那些发生变化的元素，对DOM做最少的修改

## 3.jsx 语法

JSX 是 JavaScript 的语法扩展，JSX 使得我们可以以类似于 HTML 的形式去使用 JS。JSX便是React中声明式编程的体现方式。声明式编程，简单理解就是以结果为导向的编程。使用JSX将我们所期望的网页结构编写出来，然后React再根据JSX自动生成JS代码。所以我们所编写的JSX代码，最终都会转换为以调用`React.createElement()`创建元素的代码。

1. 定义虚拟DOM，JSX不是字符串，不要加引号
2. 标签中混入JS表达式的时候使用`{}`

```js
id = {myId.toUpperCase()}
```

3. 样式的类名指定不能使用class，使用`className`

4. 内敛样式要使用`{{}}`包裹

```js
style={{color:'skyblue',fontSize:'24px'}}
```

5. 不能有多个根标签，只能有一个根标签

6.  JSX的标签必须正确结束（自结束标签必须写/）

7. JSX中html标签应该小写，React组件应该大写开头。如果小写字母开头，就将标签转化为 html 同名元素，如果 html 中无该标签对应的元素，就报错；如果是大写字母开头，react 就去渲染对应的组件，如果没有就报错

8. 如果表达式是空值、布尔值、undefined，将不会显示

> 关于JS表达式和JS语句：
>
> - JS表达式：返回一个值，可以放在任何一个需要值的地方 a a+b demo(a) arr.map() function text(){} 
>
> - JS语句：if(){} for(){} while(){} swith(){} 不会返回一个值

**其它**

1. 注释

写在花括号里

```js
ReactDOM.render(
    <div>
    <h1>小丞</h1>
    {/*注释...*/}
     </div>,
    document.getElementById('example')
);
```

2. `class`需要使用`className`代替
3. `style`中必须使用对象设置` style={{background:'red'}}`

```js
<style>
	.title{
		background-color: orange;
		width: 200px;
	}
</style>

<!-- 准备好一个“容器” -->
<div id="test"></div>

<script type="text/babel" >
	const myId = 'aTgUiGu'
	const myData = 'HeLlo,rEaCt'

	//1.创建虚拟DOM
	const VDOM = (
		<div>
			<h2 className="title" id={myId.toLowerCase()}>
				<span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
			</h2>
			<h2 className="title" id={myId.toLowerCase()}>
				<span style={{color:'white',fontSize:'29px'}}>{myData.toUpperCase()}</span>
			</h2>
			<input type="text"/>
		</div>
	)
	//2.渲染虚拟DOM到页面
	ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```

![image-20221022204158589](https://i0.hdslb.com/bfs/album/9d4bafde75cb82f79b17a91491c46eb8576b784a.png)

4. 数组

JSX 允许在模板中插入数组，数组自动展开全部成员

> {} 只能用来放js表达式，而不能放语句（if for）
> 在语句中是可以去操作JSX

```js
var arr = [
  <h1>小丞</h1>,
  <h2>同学</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

**tip: JSX 小练习**

根据动态数据生成 `li`

```js
const data = ['A','B','C']
const VDOM = (
    <div>
        <ul>
            {
                data.map((item,index)=>{
                    return <li key={index}>{item}</li>
                })
            }
        </ul>
    </div>
)
ReactDOM.render(VDOM,document.querySelector('.test'))
```

<img src="https://i0.hdslb.com/bfs/album/09241923178d7fdca14d087e6f1a9627dc3b7081.png" alt="image-20221022204645014"  />



## 4.两种创建虚拟DOM的方式

**使用JSX创建虚拟DOM**

```js
//1.创建虚拟DOM
	const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
    	<h1 id="title">
			<span>Hello,React</span>
		</h1>
	)
//2.渲染虚拟DOM到页面
	ReactDOM.render(VDOM,document.querySelector('.test'))
```

这个在上面的案例中已经演示过了 ，下面看看另外一种创建虚拟DOM的方式

**2.使用JS创建虚拟DOM**

````js
/*
* React.createElement()
*   - 用来创建一个React元素
*   - 参数：
*        1.元素的名称（html标签必须小写）
*        2.标签中的属性
*           - class属性需要使用className来设置
*           - 在设置事件时，属性名需要修改为驼峰命名法
*       3.元素的内容（子元素）
*   - 注意点：
*       React元素最终会通过虚拟DOM转换为真实的DOM元素
*       React元素一旦创建就无法修改，只能通过新创建的元素进行替换
* */
````

```js
//1.创建虚拟DOM,创建嵌套格式的dom
const VDOM=React.createElement('h1',{id:'title'},React.createElement('span',{},'hello,React'))
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM,document.querySelector('.test'))
```

使用JS和JSX都可以创建虚拟DOM，但是可以看出JS创建虚拟DOM比较繁琐，尤其是标签如果很多的情况下，所以还是比较推荐使用JSX来创建。

## 5.两种DOM的区别

````js
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <script type="text/babel">
      /* 此处一定要写babel */
      //1.创建虚拟DOM
      const VDOM = <h1>Hello,React</h1> /* 此处一定不要写引号，因为不是字符串 */
      //2.渲染虚拟DOM到页面
      ReactDOM.render(VDOM, document.getElementById('test'))
      const TDOM = document.querySelector('#test')
      console.log('虚拟DOM', VDOM)
      console.dir('真实DOM')
      console.dir(TDOM)
      //   debugger
      console.log(typeof VDOM)
      console.log(VDOM instanceof Object)
````

![image-20221022194600803](https://i0.hdslb.com/bfs/album/3c9c35333c0883a1057bd4c82be8bfbf9b69f04b.png)

 **关于虚拟DOM：**

​          1. 本质是Object类型的对象（一般对象）

​          2. 虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性。

​          3. 虚拟DOM最终会被React转化为真实DOM，呈现在页面上。

