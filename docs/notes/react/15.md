# 15【react-Hook （下）】

## 1.React.memo

### 1.1 基本介绍

> 这是一个高阶组件，用来做性能优化的，这个本来应该是写在`React高级指引`中的，但是这个案例会和后面的`useCallback`联合起来，所以就写在这里了

*   React.memo() 是一个高阶组件，如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 `React.memo` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。
    *   它接收另一个组件作为参数，并且会返回一个包装过的新组件
    *   包装过的新组件就会具有缓存功能，这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。
    *   包装过后，只有组件的props发生变化，才会触发组件的重新的渲染，否则总是返回缓存中结果。如果函数组件被 `React.memo` 包裹，且其实现中拥有 [`useState`](https://zh-hans.reactjs.org/docs/hooks-state.html)，[`useReducer`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer) 或 [`useContext`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext) 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染。

### 1.2 问题的引出

React组件会在两种情况下发生重新渲染。第一种，当组件自身的state发生变化时。第二种，当组件的父组件重新渲染时。第一种情况下的重新渲染无可厚非，state都变了，组件自然应该重新进行渲染。但是第二种情况似乎并不是总那么的必要。

`App.jsx`

```jsx
import React, { useState } from 'react'

export default function App() {
  console.log('App渲染')

  const [count, setCount] = useState(1)

  const clickHandler = () => {
    setCount(prevState => prevState + 1)
  }

  return (
    <div>
      <h2>App -- {count}</h2>
      <button onClick={clickHandler}>增加</button>
      <A />
    </div>
  )
}

function A() {
  console.log('A渲染')
  return <div>我是A组件</div>
}
```

在点击增加后，我们发现`App`和`A`都重新渲染了。

当APP组件重新渲染时，A组件也会重新渲染。A组件中没有state，甚至连props都没有设置。换言之，A组件无论如何渲染，每次渲染的结果都是相同的，虽然重渲染并不会应用到真实DOM上，但很显然这种渲染是完全没有必要的。

![image-20221030172720453](https://i0.hdslb.com/bfs/album/86fdfde2cc02ab0826730bc14eefc637c2696ecd.png)

为了减少像A组件这样组件的渲染，React为我们提供了一个方法`React.memo()`。该方法是一个高阶函数，可以用来根据组件的props对组件进行缓存，当一个组件的父组件发生重新渲染，而子组件的props没有发生变化时，它会直接将缓存中的组件渲染结果返回而不是再次触发子组件的重新渲染，这样一来就大大的降低了子组件重新渲染的次数。

### 1.3 使用React.memo

使用`React.memo`包裹`A组件`

> 这里只是为了演示方便，把所有组件写一个文件，就用这种方式包裹`A组件`,平时单文件组件的时候我们这样使用,`export default React.memo(A)`

```jsx
import React, { useState } from 'react'

export default function App() {
  console.log('App渲染')

  const [count, setCount] = useState(1)

  const clickHandler = () => {
    setCount(prevState => prevState + 1)
  }

  return (
    <div>
      <h2>App -- {count}</h2>
      <button onClick={clickHandler}>增加</button>
      <A />
    </div>
  )
}

const A = React.memo(() => {
  console.log('A渲染')
  return <div>我是A组件</div>
})
```

修改后的代码中，并没有直接使用A组件，而是在A组件外层套了一层函数`React.memo()`，这样一来，返回的A组件就增加了缓存功能，只有当A组件的props属性发生变化时，才会触发组件的重新渲染。memo只会根据props判断是否需要重新渲染，和state和context无关，state或context发生变化时，组件依然会正常的进行重新渲染

在点击增加后，我们发现只有`App`重新渲染了。

![image-20221030173239606](https://i0.hdslb.com/bfs/album/0a613f29500b63ae26e2db2870ef9c18f3e7815f.png)

这时我们改下代码

```jsx
export default function App() {
  console.log('App渲染')

  const [count, setCount] = useState(1)

  const clickHandler = () => {
    setCount(prevState => prevState + 1)
  }
	
  // 增加
  const test = count % 4 === 0

  return (
    <div>
      <h2>App -- {count}</h2>
      <button onClick={clickHandler}>增加</button>
  	  {/* 改动 */}
      <A test={test} />
    </div>
  )
}

const A = React.memo(props => {
  console.log('A渲染')
  return (
    <div>
      我是A组件
      {/* 增加 */}
      <p>{props.test && 'props.test 为 true'}</p>
    </div>
  )
})
```

这次加了个表达式的结果传给`A`组件，一开始是`false`，只有为`true`的时候，`A`组件才会重新渲染

这时界面是这样的

![image-20221030174105525](https://i0.hdslb.com/bfs/album/9ddba53bea0c611e1c3e2837761f2b60f2f29322.png)

点击3次后，表达式为`true`，A组件的`props`发生改变，所以重新渲染了。

![image-20221030173754653](https://i0.hdslb.com/bfs/album/0f5ff4c127b4d404f1207ccbf497a5cd271d4651.png)

### 1.4 使用注意

1. 此方法仅作为**[性能优化](https://zh-hans.reactjs.org/docs/optimizing-performance.html)**的方式而存在。但请不要依赖它来“阻止”渲染，因为这会产生 bug。
2. 与 class 组件中 [`shouldComponentUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate) 方法不同的是，如果 props 相等，`areEqual` 会返回 `true`；如果 props 不相等，则返回 `false`。这与 `shouldComponentUpdate` 方法的返回值相反。

### 1.5 容易出错的情况

先回到这个案例的初始代码，在这之上进行修改

我们把`App组件`的`clickHandler`方法传递给`A组件`，让`A组件`也能够改变`App组件`的`state`

```jsx
import React, { useState } from 'react'

export default function App() {
  console.log('App渲染')

  const [count, setCount] = useState(1)

  const clickHandler = () => {
    setCount(prevState => prevState + 1)
  }

  return (
    <div>
      <h2>App -- {count}</h2>
      <button onClick={clickHandler}>增加</button>
      <A clickHandler={clickHandler} />
    </div>
  )
}

const A = React.memo(props => {
  console.log('A渲染')
  return (
    <div>
      我是A组件
      <button onClick={props.clickHandler}>A组件的增加</button>
    </div>
  )
})
```

点击`A组件的增加`,发现`A组件`也重新渲染了

![image-20221030175830062](https://i0.hdslb.com/bfs/album/3e8995b7352d72b47e772ea6c7fed94ef1531267.png)

这是因为`App组件`重新渲染的时候，`clickHandler`也重新创建了，这时传递给子组件的`clickHandler`和上一次不一样，所以`react.memo`失效了。

这个问题可以用`useCallback`解决。

## 2.useCallback

### 2.1 基本介绍

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

`useCallback`和`useMemo`设计的初衷是用来做性能优化的。在`Class Component`中考虑以下的场景：

```javascript
class Foo extends Component {
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <Button onClick={() => this.handleClick()}>Click Me</Button>;
  }
}
```

传给 Button 的 onClick 方法每次都是重新创建的，这会导致每次 Foo render 的时候，Button 也跟着 render。优化方法有 2 种，箭头函数和 bind。下面以 bind 为例子：

```javascript
class Foo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <Button onClick={this.handleClick}>Click Me</Button>;
  }
}
```

同样的，`Function Component`也有这个问题：

```javascript
function Foo() {
  const [count, setCount] = useState(0);

  const handleClick() {
    console.log(`Click happened with dependency: ${count}`)
  }
  return <Button onClick={handleClick}>Click Me</Button>;
}
```

而 React 给出的方案是`useCallback` Hook。在依赖不变的情况下 (在我们的例子中是 count )，它会返回相同的引用，避免子组件进行无意义的重复渲染

### 2.2 解决1.5遗留的问题

```javascript
/*
*   useCallback()
*		这个hook会缓存方法的引用
*       参数：
*           1. 回调函数
*           2. 依赖数组
*               - 当依赖数组中的变量发生变化时，回调函数才会重新创建
*               - 如果不指定依赖数组，回调函数每次都会重新创建
*               - 一定要将回调函数中使用到的所有变量都设置到依赖数组中
*                   除了（setState）
* */
```

我们将`clickHandler`方法改造一下

```js
  const clickHandler = useCallback(() => {
    setCount(prevState => prevState + 1)
  }, [])
```

> 第二个参数一定要加，不然和平常写没有区别
>
> 依赖项`[]`的意思是只有第一次渲染时才会创建，之后都不会重新创建了

点击`A组件的增加`,发现只有`App组件`重新渲染了。因为`clickHandler`没有重新创建，传给子组件的没有变化，所以子组件这次没有重新渲染。

![image-20221030180349406](https://i0.hdslb.com/bfs/album/2e7d34de3518ecb98ac3433cae205a4683a069f5.png)

**完整代码**

```jsx
import React, { useState, useCallback } from 'react'

export default function App() {
  console.log('App渲染')

  const [count, setCount] = useState(1)

  const clickHandler = useCallback(() => {
    setCount(prevState => prevState + 1)
  }, [])

  return (
    <div>
      <h2>App -- {count}</h2>
      <button onClick={clickHandler}>增加</button>
      <A clickHandler={clickHandler} />
    </div>
  )
}

const A = React.memo(props => {
  console.log('A渲染')
  return (
    <div>
      我是A组件
      <button onClick={props.clickHandler}>A组件的增加</button>
    </div>
  )
})
```

### 2.3 第二个参数的使用

继续改造上面的代码

```jsx
import React, { useState, useCallback } from 'react'

export default function App() {
  console.log('App渲染')

  const [count, setCount] = useState(1)
  // 增加
  const [num, setNum] = useState(1)

  const clickHandler = useCallback(() => {
    setCount(prevState => prevState + num)
  // 增加
    setNum(prevState => prevState + 1)
  }, [])

  return (
    <div>
      <h2>App -- {count}</h2>
      <button onClick={clickHandler}>增加</button>
      <A clickHandler={clickHandler} />
    </div>
  )
}

const A = React.memo(props => {
  console.log('A渲染')
  return (
    <div>
      我是A组件
      <button onClick={props.clickHandler}>A组件的增加</button>
    </div>
  )
})
```

增加了一个`num`，让每一次`count`的增加比上次多1，现在这样写是有问题的。

![image-20221030181249832](https://i0.hdslb.com/bfs/album/2e04eb7727a7b875a3b771761c4c4d2ac9e30b04.png)

点击了两次增加后，预期值应该是4，但是显示的是3，是为什么呢？

因为`clickHandler`只在初次渲染的时候创建，当时`num`的值是1，这个函数一直没有重新创建，内部用的`num`一直是1

这时我们可以加一个依赖项

```js
const clickHandler = useCallback(() => {
    setCount(prevState => prevState + num)
    setNum(prevState => prevState + 1)
  }, [num])
```

这样`num`变化了，这个函数也会重新创建。

![image-20221030181534667](https://i0.hdslb.com/bfs/album/d1f9956dac9668ab3c7af6dc5f093f1155f39d6b.png)

点击了两次增加后，count变成了预期值4。

