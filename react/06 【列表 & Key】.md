# 06 【列表 & Key】

首先，让我们看下在 Javascript 中如何转化列表。

如下代码，我们使用 [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 函数让数组中的每一项变双倍，然后我们得到了一个新的列表 `doubled` 并打印出来：

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);console.log(doubled);
```

代码打印出 `[2, 4, 6, 8, 10]`。

在 React 中，把数组转化为[元素](https://zh-hans.reactjs.org/docs/rendering-elements.html)列表的过程是相似的。

## 1.列表

### 1.1 渲染多个组件

你可以通过使用 `{}` 在 JSX 内构建一个[元素集合](https://zh-hans.reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)。

下面，我们使用 Javascript 中的 [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 方法来遍历 `numbers` 数组。将数组中的每个元素变成 `<li>` 标签，最后我们将得到的数组赋值给 `listItems`：

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>  <li>{number}</li>);
```

然后，我们可以将整个 `listItems` 插入到 `<ul>` 元素中：

```js
<ul>{listItems}</ul>
```

[**在 CodePen 上尝试**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

````js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((numbers) =>
  <li>{numbers}</li>
);

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<ul>{listItems}</ul>);
````

这段代码生成了一个 1 到 5 的项目符号列表。

![image-20221024211657792](https://i0.hdslb.com/bfs/album/79b008abbd0b656cb0b29631f175dfcb936cacc0.png)

### 1.2 基础列表组件

通常你需要在一个[组件](https://zh-hans.reactjs.org/docs/components-and-props.html)中渲染列表。

我们可以把前面的例子重构成一个组件，这个组件接收 `numbers` 数组作为参数并输出一个元素列表。

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NumberList numbers={numbers} />);
```

当我们运行这段代码，将会看到一个警告 `a key should be provided for list items`，意思是当你创建一个元素时，必须包括一个特殊的 `key` 属性。我们将在下一节讨论这是为什么。

让我们来给每个列表元素分配一个 `key` 属性来解决上面的那个警告：

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render( <NumberList numbers={numbers} />);
```

[**在 CodePen 上尝试**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

![image-20221024211835947](https://i0.hdslb.com/bfs/album/7d1bee8ee7ee79bb7991b83694bd6161da4a9c3d.png)

## 2.key

### 2.1 基本使用

key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key：

```js
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key：

```js
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。可以看看 Robin Pokorny 的[深度解析使用索引作为 key 的负面影响](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/)这一篇文章。如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。

要是你有兴趣了解更多的话，这里有一篇文章[深入解析为什么 key 是必须的](https://zh-hans.reactjs.org/docs/reconciliation.html#recursing-on-children)可以参考。

### 2.2 用 key 提取组件

元素的 key 只有放在就近的数组上下文中才有意义。

比方说，如果你[提取](https://zh-hans.reactjs.org/docs/components-and-props.html#extracting-components)出一个 `ListItem` 组件，你应该把 key 保留在数组中的这个 `<ListItem />` 元素上，而不是放在 `ListItem` 组件中的 `<li>` 元素上。

**例子：不正确的使用 key 的方式**

```js
function ListItem(props) {
  const value = props.value;
  return (
    // 错误！你不需要在这里指定 key：
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 错误！元素的 key 应该在这里指定：
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

**例子：正确的使用 key 的方式**

```js
function ListItem(props) {
  // 正确！这里不需要指定 key：
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 正确！key 应该在数组的上下文中被指定
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

[**在 CodePen 上尝试**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

一个好的经验法则是：在 `map()` 方法中的元素需要设置 key 属性。

### 2.3 key 值在兄弟节点之间必须唯一

数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值：

```js
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Blog posts={posts} />);
```

[**在 CodePen 上尝试**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 `key` 属性的值，请用其他属性名显式传递这个值：

```js
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

上面例子中，`Post` 组件可以读出 `props.id`，但是不能读出 `props.key`。

### 2.4 在 JSX 中嵌入 map()

在上面的例子中，我们声明了一个单独的 `listItems` 变量并将其包含在 JSX 中：

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX 允许在大括号中[嵌入任何表达式](https://zh-hans.reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)，所以我们可以内联 `map()` 返回的结果：

```js
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**在 CodePen 上尝试**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

这么做有时可以使你的代码更清晰，但有时这种风格也会被滥用。就像在 JavaScript 中一样，何时需要为了可读性提取出一个变量，这完全取决于你。但请记住，如果一个 `map()` 嵌套了太多层级，那可能就是你[提取组件](https://zh-hans.reactjs.org/docs/components-and-props.html#extracting-components)的一个好时机。

## 3.diff算法

### 3.1 什么是虚拟 DOM ？

在谈 diff 算法之前，我们需要先了解虚拟 DOM 。它是一种编程概念，在这个概念里，以一种虚拟的表现形式被保存在内存中。在 React 中，render 执行的结果得到的并不是真正的 DOM 节点，而是 JavaScript 对象

> 虚拟 DOM 只保留了真实 DOM 节点的一些**基本属性，和节点之间的层次关系**，它相当于建立在 JavaScript 和 DOM 之间的一层“缓存”

```js
<div class="hello">
    <span>hello world!</span>
</div>
```

上面的这段代码会转化可以转化为虚拟 DOM 结构

```js
{
    tag: "div",
    props: {
        class: "hello"
    },
    children: [{
        tag: "span",
        props: {},
        children: ["hello world!"]
    }]
}
```

其中对于一个节点必备的三个属性 `tag，props，children`

- tag 指定元素的**标签**类型，如“`li`，`div`”
- props 指定元素身上的属性，如 `class` ，`style`，自定义属性
- children 指定元素是否有**子节点**，参数以**数组**形式传入

而我们在 render 中编写的 JSX 代码就是一种虚拟 DOM 结构。

### 3.2 diff 算法

每个组件中的每个标签都会有一个key,不过有的必须显示的指定，有的可以隐藏。

如果生成的render出来后就不会改变里面的内容，那么你不需要指定key（不指定key时，React也会生成一个默认的标识）,或者将index作为key，只要key不重复即可。

但是如果你的标签是动态的，是有可能刷新的，就必须显示的指定key。使用map进行遍历的时候就必须指定Key:

```js
this.state.num.map((n,index)=>{
	return <div className="news" key={index} >新闻{n}</div>
})
```

这个地方虽然显示的指定了key，但是**官网并不推荐使用Index作为Key去使用**；

这样会很有可能会有效率上的问题

举个例子：

在一个组件中，我们先创建了两个对象，通过循环的方式放入< li>标签中，此时key使用的是index。

```js
person:[
    {id:1,name:"张三",age:18},
    {id:2,name:"李四",age:19}
]

this.state.person.map((preson,index)=>{
  return  <li key = {index}>{preson.name}</li>
})
```

如下图展现在页面中：

![image-20221024225054061](https://i0.hdslb.com/bfs/album/ad5611b1f134b0a842dd2365db974714c98f6a9c.png)

此时，我们想在点击按钮之后动态的添加一个对象，并且放入到li标签中，在重新渲染到页面中。

我们通过修改State来控制对象的添加。

```js
<button onClick={this.addObject}>点击增加对象</button>
addObject = () =>{
    let {person} = this.state;
    const p = {id:(person.length+1),name:"王五",age:20};
    this.setState({person:[p,...person]});
}
```

如下动图所示：

![addObject](https://i0.hdslb.com/bfs/album/ff6d81e4297b4798020721e60df525a2036f796e.gif)

这样看，虽然完成了功能。但是其实存在效率上的问题， 我们先来看一下两个前后组件状态的变化：

![image-20221024225208300](https://i0.hdslb.com/bfs/album/21767b62ed6cd7f93b146dccdbe4b7007ab00c14.png)

我们发现，组件第一个变成了王五，张三和李四都移下去了。因为我们使用Index作为Key，这三个标签的key也就发生了改变【张三原本的key是0，现在变成了1，李四的key原本是1，现在变成了2，王五变成了0】

在组件更新状态重新渲染的时候，就出现了问题：

因为react是通过key来比较组件标签是否一致的，拿这个案例来说：

首先，状态更新导致组件标签更新，react根据Key，判断旧的虚拟DOM和新的虚拟DOM是否一致

key = 0 的时候 旧的虚拟DOM 内容是张三 新的虚拟DOM为王五 ，react认为内容改变，从而重新创建新的真实DOM.

key = 1 的时候 旧的虚拟DOM 内容是李四，新的虚拟DOM为张三，react认为内容改变，从而重新创建新的真实DOM

key = 2 的时候 旧的虚拟DOM没有，创建新的真实DOM

这样原本有两个虚拟DOM可以复用，但都没有进行复用，完完全全的都是新创建的；这就导致效率极大的降低。

其实这是因为我们将新创建的对象放在了首位，如果放在最后其实是没有问题的，但是因为官方并不推荐使用Index作为key值，我们推荐使用id作为key值。从而完全避免这样的情况。

### 3.3 用index作为key可能会引发的问题

key不需要全局唯一，只需在当前列表中唯一即可。元素的key最好是固定的，这里直接举个反例，有些场景我们会使用元素的索引为key像这种：

```jsx
const students = ['孙悟空', '猪八戒', '沙和尚'];
const ele = <ul>{students.map((item, index) => <li key={index}>{item}</li>)}</ul>
```

上例中，我使用了元素的索引（index）作为key来使用，但这有什么用吗？没用！因为index是根据元素位置的改变而改变的，当我们在前边插入一个新元素时，所有元素的顺序都会一起改变，那么它和React中按顺序比较有什么区别吗？没有区别！而且还麻烦了，唯一的作用就是去除了警告。所以我们开发的时候偶尔也会使用索引作为key，但前提是元素的顺序不会发生变化，除此之外不要用索引做key。

1. 若对数据进行:逆序添加、逆序删除等破坏
   顺序操作:会产生没有必要的真实DOM更新 界面效果没问题,但效率低。

2. 如果结构中还包含输入类的DOM:会产生错误DOM更新 界面有问题。

3. 注意! 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。

**开发如何选择key?**

最好使用每一条数据的唯一标识作为key 比如id，手机号，身份证号

如果确定只是简单的展示数据，用Index也是可以的

**而这个判断key的比较规则就是Diff算法**

Diff算法其实就是react生成的新虚拟DOM和以前的旧虚拟DOM的比较规则：

- 如果旧的虚拟DOM中找到了与新虚拟DOM相同的key:
  - 如果内容没有变化，就直接只用之前旧的真实DOM
  - 如果内容发生了变化，就生成新的真实DOM
- 如果旧的虚拟DOM中没有找到了与新虚拟DOM相同的key:
  - 根据数据创建新的真实的DOM,随后渲染到页面上

### 3.4 李立超老师对于虚拟DOM的解释

当我们通过 React 操作DOM时，比如通过 `React.createElement()` 创建元素时。我们所创建的元素并不是真正的DOM对象而是React元素。这一点可以通过在控制台中打印对象来查看。React元素是React应用的最小组成部分，通过JSX也就是`React.createElement()`所创建的元素都属于React元素。与浏览器的 DOM 元素不同，React 元素就是一个普通的JS对象，且创建的开销极小。

React元素不是DOM对象，那为什么可以被添加到页面中去呢？实际上每个React元素都会有一个对应的DOM元素，对React元素的所有操作，最终都会转换为对DOM元素操作，也就是所谓的虚拟DOM。要理解虚拟DOM，我们需要先了解它的作用。虚拟DOM就好像我们和真实DOM之间的一个桥梁。有了虚拟DOM，使得我们无需去操作真实的DOM元素，只需要对React元素进行操作，所有操作最终都会映射到真实的DOM元素上。

这不是有点多余吗？直接操作DOM不好吗？为什么要多此一举呢？原因其实很多，这里简单举几个出来。

首先，虚拟DOM简化了DOM操作。凡是用过DOM的都知道Web API到底有多复杂，各种方法，各种属性，数不胜数。查询的、修改的、删除的、添加的等等等等。然而在虚拟DOM将所有的操作都简化为了一种，那就是创建！React元素是不可变对象，一旦创建就不可更改。要修改元素的唯一方式就是创建一个新的元素去替换旧的元素，看起来虽然简单粗暴，实则却是简化了DOM的操作。

其次，解决DOM的兼容性问题。DOM的兼容性是一个历史悠久的问题，如果使用原生DOM，总有一些API会遇到兼容性的问题。使用虚拟DOM就完美的避开了这些问题，所有的操作都是在虚拟DOM上进行的，而虚拟DOM是没有兼容问题的，至于原生DOM是否兼容就不需要我们操心了，全都交给React吧！

最后，我们手动操作DOM时，由于无法完全掌握全局DOM情况，经常会出现不必要的DOM操作，比如，本来只需要修改一个子节点，但却不小心修改了父节点，导致所有的子节点都被修改。效果呈现上可能没有什么问题，但是性能上确实千差万别，修改一个节点和修改多个节点对于系统的消耗可是完全不同的。然而在虚拟DOM中，引入了diff算法，React元素在更新时会通过diff算法和之前的元素进行比较，然后只会对DOM做必要的更新来呈现结果。简单来说，就是拿新建的元素和旧的元素进行比较，只对发生变化的部分对DOM进行更新，减少DOM的操作，从而提升了性能。
