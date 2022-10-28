# 12 【react高级指引】

## 1.setState 扩展

### 1.1 对象式 setState

首先在我们以前的认知中，`setState` 是用来更新状态的，我们一般给它传递一个对象，就像这样

```js
this.setState({
    count: count + 1
})
```

这样每次更新都会让 `count` 的值加 1。这也是我们最常做的东西

这里我们做一个案例，点我加 1，一个按钮一个值，我要在控制台输出每次的 `count` 的值

![image-20221027095114944](https://i0.hdslb.com/bfs/album/b1ad03d5936d35f609b52f853a640e207e6a0048.png)

那我们需要在控制台输出，要如何实现呢？

我们会考虑在 `setState` 更新之后 `log` 一下

```js
add = () => {
    const { count } = this.state
    this.setState({
        count: count + 1
    })
    console.log(this.state.count);
}
```

因此可能会写出这样的代码，看起来很合理，在调用完 `setState` 之后，输出 `count`

![image-20221027095134650](https://i0.hdslb.com/bfs/album/a4746c99b4345fa4e08eec081fcc0d9fb7a7553b.png)

我们发现显示的 `count` 和我们控制台输出的 `count` 值是不一样的

这是因为，我们调用的 `setState` 是同步事件，但是它的作用是让 React 去更新数据，而 React 不会立即的去更新数据，这是一个异步的任务，因此我们输出的 `count` 值会是状态更新之前的数据。“React **状态更新是异步的**”

那我们要如何实现同步呢？

其实在 `setState` 调用的第二个参数，我们可以接收一个函数，这个函数会在状态更新完毕并且界面更新之后调用，我们可以试试

> setState(stateChange, [callback])------对象式的setState
>         1.stateChange为状态改变对象(该对象可以体现出状态的更改)
>         2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用

```js
add = () => {
    const { count } = this.state
    this.setState(
      {
        count: count + 1,
      },
      () => {
        document.title = `当前值是${this.state.count}`
      },
    )
}
```

我们将 `setState` 填上第二个参数，输出更新后的 `count` 值

![image-20221027173513180](https://i0.hdslb.com/bfs/album/1c7c4bf62e9cbb2e581f9e5ff2552901cde64074.png)

这样我们就能成功的获取到最新的数据了，如果有这个需求我们可以在第二个参数输出噢~

### 1.2 函数式 setState

，函数式的 `setState` 也是接收两个参数

第一个参数是 `updater` ，它是一个能够返回 `stateChange` 对象的函数

第二个参数是一个回调函数，用于在状态更新完毕，界面也更新之后调用

与对象式 `setState` 不同的是，我们传递的第一个参数 `updater` 可以接收到2个参数 `state` 和 `props`

我们尝试一下

> setState(updater, [callback])------函数式的setState
>             1.updater为返回stateChange对象的函数。
>             2.updater可以接收到state和props。
>             4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。

```js
add = () => {
    this.setState(
      (state, props) => ({ count: state.count + 1 }),
      () => {
        document.title = `当前值是${this.state.count}`
      },
    )
}
```

![image-20221027173515460](https://i0.hdslb.com/bfs/album/1c7c4bf62e9cbb2e581f9e5ff2552901cde64074.png)

我们也成功的实现了

我们在第一个参数中传入了一个函数，这个函数可以接收到 `state` ，我们通过更新 `state` 中的 `count` 值，来驱动页面的更新

利用函数式 `setState` 的优势还是很不错的，可以直接获得 `state` 和 `props`

> 可以理解为对象式的 `setState` 是函数式 `setState` 的语法糖

### 1.3 总结

```css
(1). setState(stateChange, [callback])------对象式的setState
        1.stateChange为状态改变对象(该对象可以体现出状态的更改)
        2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用

(2). setState(updater, [callback])------函数式的setState
        1.updater为返回stateChange对象的函数。
        2.updater可以接收到state和props。
        4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
    1.对象式的setState是函数式的setState的简写方式(语法糖)
    2.使用原则：
            (1).如果新状态不依赖于原状态 ===> 使用对象方式
            (2).如果新状态依赖于原状态 ===> 使用函数方式
            (3).如果需要在setState()执行后获取最新的状态数据, 
                要在第二个callback函数中读取
```


## 2.Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

### 2.1 何时使用 Context

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。举个例子，在下面的代码中，我们通过一个 “theme” 属性手动调整一个按钮组件的样式：

```js
class A extends React.Component {
  render() {
    return <B theme="dark" />;
  }
}

function B(props) {
  // B 组件接受一个额外的“theme”属性，然后传递给 C 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  return (
    <div>
      <C theme={props.theme} />
    </div>
  );
}

class C extends React.Component {
  render() {
    return h4>我从A组件接收到的主题模式:{this.props.theme}</h4>
  }
}
```

使用 context, 我们可以避免通过中间元素传递 props。

### 2.2 类式组件

当我们想要给子类的子类传递数据时，前面我们讲过了 redux 的做法，这里介绍的 Context 我觉得也类似于 Redux

```js
// React.createContext
const MyContext = React.createContext(defaultValue);
```

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的 context 值。

**只有**当组件所处的树中没有匹配到 Provider 时，其 `defaultValue` 参数才会生效。此默认值有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 `undefined` 传递给 Provider 的 value 时，消费组件的 `defaultValue` 不会生效。

首先我们需要引入一个 `ThemeContext ` 组件，我们需要引用`ThemeContext ` 下的 `Provider`

```js
const ThemeContext  = React.createContext();
const { Provider } = ThemeContext ;
```

用 `Provider` 标签包裹 A组件内的 B 组件，并通过 `value` 值，将数据传递给子组件，这样以 A 组件为父代组件的所有子组件都能够接受到数据

```js
<Provider value={{ theme }}>
    <B />
</Provider>
/* 
每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。从 Provider 到其内部 consumer 组件（包括 .contextType 和 useContext）的传播不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件跳过更新的情况下也能更新。
*/
```

但是我们需要在使用数据的组件中引入 `ThemeContext `

```js
static contextType = ThemeContext ;
```

在使用时，直接从 `this.context` 上取值即可

```js
const {theme} = this.context
```

**完整版**

```js
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext  = React.createContext('light')
const {Provider} = ThemeContext 
export default class A extends Component {

	state = {theme:'dark'}

	render() {
		const {theme} = this.state
        // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    	// 无论多深，任何组件都能读取这个值。
    	// 在这个例子中，我们将 “dark” 作为当前的值传递下去。
		return (
				<Provider value={theme}>
					<B/>
				</Provider>
		)
	}
}

// 中间的组件再也不必指明往下传递 theme 了。
class B extends Component {
	render() {
		return (
				<>
            		<h3>我是B组件</h3>
				   <C/>
            	 </>
		)
	}
}

class C extends Component {
	//声明接收context
    // 指定 contextType 读取当前的 theme context。
    // React 会往上找到最近的 theme Provider，然后使用它的值。
    // 在这个例子中，当前的 theme 值为 “dark”。
	static contextType = ThemeContext 
	render() {
		const {theme} = this.context
		return (
				<>
            		<h3>我是C组件</h3>
            		<h4>我从A组件接收到的主题模式:{theme}</h4>
            	 </>
		)
	}
} 
```

> 挂载在 class 上的 `contextType` 属性可以赋值为由 [`React.createContext()`](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext) 创建的 Context 对象。此属性可以让你使用 `this.context` 来获取最近 Context 上的值。你可以在任何生命周期中访问到它，包括 render 函数中。

### 2.3 函数组件

函数组件和类式组件只有一点点小差别

```js
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext  = React.createContext('light')
const {Provider,Consumer} = ThemeContext 
export default class A extends Component {

	state = {theme:'dark'}

	render() {
		const {theme} = this.state
        // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    	// 无论多深，任何组件都能读取这个值。
    	// 在这个例子中，我们将 “dark” 作为当前的值传递下去。
		return (
				<Provider value={theme}>
					<B/>
				</Provider>
		)
	}
}

// 中间的组件再也不必指明往下传递 theme 了。
class B extends Component {
	render() {
		return (
				<>
            		<h3>我是B组件</h3>
				   <C/>
            	 </>
		)
	}
}


function C(){
	return (
			<h3>我是C组件</h3>
			<h4>我从A组件接收到的用户名:
			<Consumer>
				{value => value}
			</Consumer>
			</h4>
		</div>
	)
}
```

一个 React 组件可以订阅 context 的变更，此组件可以让你在[函数式组件](https://zh-hans.reactjs.org/docs/components-and-props.html#function-and-class-components)中可以订阅 context。

这种方法需要一个[函数作为子元素（function as a child）](https://zh-hans.reactjs.org/docs/render-props.html#using-props-other-than-render)。这个函数接收当前的 context 值，并返回一个 React 节点。传递给函数的 `value` 值等价于组件树上方离这个 context 最近的 Provider 提供的 `value` 值。如果没有对应的 Provider，`value` 参数等同于传递给 `createContext()` 的 `defaultValue`。

## 3.错误边界

### 3.1 基本使用

当不可控因素导致数据不正常时，我们不能直接将报错页面呈现在用户的面前，由于我们没有办法给每一个组件、每一个文件添加判断，来确保正常运行，这样很不现实，因此我们要用到**错误边界**技术

错误边界是一种 `React` 组件，这种组件**可以捕获发生在其子组件树任何位置的** **JavaScript** **错误，并打印这些错误，同时展示降级** **UI**，而并不会渲染那些发生崩溃的子组件树。**错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误**

**错误边界就是让这块组件报错的影响降到最小，不要影响到其他组件或者全局的正常运行**

> 例如 A 组件报错了，我们可以在 A 组件内添加一小段的提示，并把错误控制在 A 组件内，不影响其他组件

- 我们要对容易出错的组件的父组件做手脚，而不是组件本身

我们在父组件中通过 `getDerivedStateFromError` 来配置**子组件**出错时的处理函数

> ###  **编写生命周期函数 getDerivedStateFromError**
>
> 1. 静态函数
> 2. 运行时间点：渲染子组件的过程中，发生错误之后，在更新页面之前
> 3. **注意：只有子组件发生错误，才会运行该函数**
> 4. 该函数返回一个对象，React会将该对象的属性覆盖掉当前组件的state（必须返回 **`null`** 或者**状态对象**（State Obect））
> 5. 参数：错误对象
> 6. 通常，该函数用于改变状态

```js
state={
    hasError:false,
}

static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: error }
}
```

我们可以将 `hasError` 配置到状态当中，当 `hasError` 状态改变成 `error` 时，表明有错误发生，我们需要在组件中通过判断 `hasError` 值，来指定是否显示子组件

```js
{this.state.hasError ? <h2>Child出错啦</h2> : <Child />}
```

但是我们会发现这个效果过了几秒之后自动又出现报错页面了，那是因为**开发环境还是会报错**，**生产环境不会报错** 直接显示 要显示的文字，白话一些就是这个适用于生产环境，为了生产环境不报错。
开发中我们可以将`Child出错啦`这种错误提示换成一个错误组件。

### 3.2 综合案例

按照React官方的约定，一个类组件定义了**static getDerivedStateFromError()** 或**componentDidCatch()** 这两个生命周期函数中的任意一个（或两个），即可被称作ErrorBoundary组件，实现错误边界的功能。

其中，getDerivedStateFromError方法被约定为渲染备用UI，componentDidCatch方法被约定为捕获打印错误信息。

> ###  **编写生命周期函数 componentDidCatch**
>
> 1. 实例方法
> 2. 运行时间点：渲染子组件的过程中，发生错误，更新页面之后，由于其运行时间点比较靠后，因此不太会在该函数中改变状态
> 3. 通常，该函数用于记录错误消息

```jsx
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            Error: null,
            ErrorInfo: null
        };
    }
    //控制渲染降级UI
    static getDerivedStateFromError(error,info) {
        return {hasError: error};
    }
    //捕获抛出异常
    componentDidCatch(error, errorInfo) {
         // 1、错误信息（error）
        // 2、错误堆栈（errorInfo)
        //传递异常信息
        this.setState((preState) => 
            ({hasError: preState.hasError, Error: error, ErrorInfo: errorInfo})
        );
                //可以将异常信息抛出给日志系统等等
                //do something....
    }
    render() {
        //如果捕获到异常，渲染降级UI
        if (this.state.hasError) {
            return <div>
                <h1>{`Error:${this.state.Error?.message}`}</h1>
                    {this.state.ErrorInfo?.componentStack}
            </div>;
        }
        return this.props.children;
    }
}
```

> 虽然函数式组件无法定义 `Error Boundary`，但 `Error Boundary` 可以捕获函数式组件的异常错误

实现ErrorBoundary组件后，我们只需要将其当作常规组件使用，将其需要捕获的组件放入其中即可。

使用方式如下：

```js
//main.js
import ReactDOM from 'react-dom/client';
import {ErrorBoundary} from './ErrorBoundary.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
        <App/>
    </ErrorBoundary>
);
```

```js
//app.js
import React from 'react';
function App() {
    const [count, setCount] = useState(0);
    if (count>0){
        throw new Error('count>0!');
    }
    return (
        <div>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
        </div>
    );
}
export default App;
```

点击按钮后即可展示抛出异常时，应该渲染的降级UI：

![image-20221027094444543](https://i0.hdslb.com/bfs/album/3269915e4f64c035ae9e3ce91a8bc1af11881fbd.png)

### 3.3 让子组件不影响父组件正常显示案例

假设B组件（子组件）的出错：users不是一个数组，却是一个字符串。此时，会触发调用`getDerivedStateFromError`，并返回状态数据`{hasError:error}`。A组件（父组件）将根据hasError值判断是渲染备用的错误页面还是B组件。

```jsx
import React, { Component } from 'react'

export default class A extends Component {
  state = { hasError: '' }
  static getDerivedStateFromError(error) {
    return {
      hasError: error,
    }
  }

  componentDidCatch(error, info) {
    console.log('error:', error)
    console.log('info:', info)
    console.log('用于统计错误信息并反馈给后台,将通知开发人员进行bug修复')
  }

  render() {
    const { hasError } = this.state
    return (
      <div className="a">
        <div>我是组件A</div>
        {hasError ? '当前网络不稳定,请稍候再试!' : <B />}
      </div>
    )
  }
}

class B extends Component {
  state = {
    users: '',
  }
  render() {
    const { users } = this.state
    return (
      <div className="b">
        <div>我是组件B</div>
        {users.map(userObj => (
          <li key={userObj.id}>
            {userObj.name}，{userObj.age}
          </li>
        ))}
      </div>
    )
  }
}
```

<img src="https://i0.hdslb.com/bfs/album/b79f78aeb57461debfea87d644ea5c8e4baec625.png" alt="image-20221027190233518"  />

### 3.4 使用错误边界需要注意什么

没有什么技术栈或者技术思维是银弹，错误边界看起来用得很爽，但是需要注意以下几点：

- 错误边界实际上是用来捕获render阶段时抛出的异常，而React事件处理器中的错误并不会渲染过程中被触发，所以**错误边界捕获不到事件处理器中的错误**。
- React官方推荐使用try/catch来自行处理事件处理器中的异常。
- 错误边界无法捕获异步代码中的错误（例如 `setTimeout`或 `requestAnimationFrame`回调函数），这两个函数中的代码通常不在当前任务队列内执行。
- 目前错误边界只能在类组件中实现，也只能捕获**其子组件树**的错误信息。错误边界无法捕获自身的错误，如果一个错误边界无法渲染错误信息，则错误会冒泡至最近的上层错误边界，类似于JavaScript中的cantch的工作机制。
- 错误边界无法在服务端渲染中生效，因为根本的渲染方法已经`ReactDOM.createRoot().render()`修改为了`ReactDOM.hydrateRoot()`， 而上面也提到了，错误边界捕获的是render阶段时抛出的异常。

**总结：仅处理渲染子组件期间的同步错误**

## 4.路由组件的lazyLoad

懒加载在 React 中用的最多的就是路由组件了，页面刷新时，所有的页面都会重新加载，这并不是我们想要的，我们想要实现点击哪个路由链接再加载即可，这样避免了不必要的加载

![image-20221027095740307](https://i0.hdslb.com/bfs/album/ab202fe40dbd0d4437efa829614f5f366d1da52b.png)

我们可以发现，我们页面一加载时，所有的路由组件都会被加载

如果我们有 100 个路由组件，但是用户只点击了几个，这就会有很大的消耗，因此我们需要做懒加载处理，**我们点击哪个时，才去加载哪一个**

首先我们需要从 `react` 库中暴露一个 `lazy` 函数

> `React.lazy()` 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。

```js
import React, { Component ,lazy} from 'react';
```

然后我们需要更改引入组件的方式

```js
// 这个组件是动态加载的
const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))
```

采用 `lazy` 函数包裹

![image-20221027095800440](https://i0.hdslb.com/bfs/album/956ae433c7a0f17a76ea7e5665e8f2e94ab3b925.png)

我们会遇到这样的错误，提示我们用一个标签包裹

这里是因为，当我们网速慢的时候，路由组件就会有可能加载不出来，页面就会白屏，它需要我们来指定一个路由组件加载的东西，相对于 loading

> `React.Suspense` 可以指定加载指示器（loading indicator），以防其组件树中的某些子组件尚未具备渲染条件。在未来，我们计划让 `Suspense` 处理更多的场景，如数据获取等。你可以在 [我们的路线图](https://zh-hans.reactjs.org/blog/2018/11/27/react-16-roadmap.html) 了解这一点。

```jsx
<Suspense fallback={<h1>loading</h1>}>
     <Routes>
        <Route path="/home" component={Home}></Route>
        <Route path="/about" component={About}></Route>
	</Routes>
</Suspense>
```

初次登录页面的时候

![image-20221027100147592](https://i0.hdslb.com/bfs/album/97dbf644b51f4a7e39ea6b28f99dc498ec08ecb1.png)

注意噢，这些文件都不是路由组件，当我们点击了对应组件之后才会加载

![68747470733a2f2f6c6a63696d672e6f73732d636e2d6265696a696e672e616c6979756e63732e636f6d2f696d672f72656163742d657874656e73696f6e2d6c617a796c6f61642d332e676966](https://i0.hdslb.com/bfs/album/b03697901855aaabe2ca5aab01a20dfcbead7cd5.gif)

从上图我们可以看出，每次点击时，才会去请求 `chunk` 文件

那我们更改写的 `fallback` 有什么用呢？它会在页面还没有加载出来的时候显示

> 注意：因为 loading 是作为一个兜底的存在，因此 loading 是 必须提前引入的，不能懒加载

## 5.Fragment

我们编写组件的时候每次都需要采用一个 `div` 标签包裹，才能让它正常的编译，但是这样会引发什么问题呢？我们打开控制台看看它的层级

![image-20221027100328758](https://i0.hdslb.com/bfs/album/2971587bd1dbd9d07893218a1c5a86381692b3bf.png)

它包裹了几层无意义的 div 标签，我们可以采用 `Fragment` 来解决这个问题

React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

首先，我们需要从 react 中暴露出 `Fragment` ，将我们所写的内容采用 `Fragment` 标签进行包裹，当它解析到 `Fragment` 标签的时候，就会把它去掉

这样我们的内容就直接挂在了 `root` 标签下

> 同时采用空标签，也能实现，但是它不能接收任何值，而 `Fragment` 能够接收 1 个值`key`

```jsx
render() {
  return (
    <React.Fragment 可选 key={xxx.id}>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}

/*
<>
  <ChildA />
  <ChildB />
  <ChildC />
</>
*/
```

## 6.组件优化

### 6.1 shouldComponentUpdate 优化

在我们之前一直写的代码中，我们一直使用的`Component` 是有问题存在的

1. 只要执行 `setState` ，即使不改变状态数据，组件也会调用 `render`
2. 当前组件状态更新，也会引起子组件 `render`

而我们想要的是只有组件的 `state` 或者 `props` 数据发生改变的时候，再调用 `render`

我们可以采用重写 `shouldComponentUpdate` 的方法，但是这个方法不能根治这个问题，当状态很多时，我们没有办法增加判断

看个案例来了解下原理：

如果你的组件只有当 `props.color` 或者 `state.count` 的值改变才需要更新时，你可以使用 `shouldComponentUpdate` 来进行检查：

````jsx
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
````

在这段代码中，`shouldComponentUpdate` 仅检查了 `props.color` 或 `state.count` 是否改变。如果这些值没有改变，那么这个组件不会更新。如果你的组件更复杂一些，你可以使用类似“浅比较”的模式来检查 `props` 和 `state` 中所有的字段，以此来决定是否组件需要更新。React 已经提供了一位好帮手来帮你实现这种常见的模式 - 你只要继承 `React.PureComponent` 就行了。

### 6.2 PureComponent 优化

这段代码可以改成以下这种更简洁的形式：

```jsx
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
```

大部分情况下，你可以使用 `React.PureComponent` 来代替手写 `shouldComponentUpdate`。但它只进行浅比较，所以当 props 或者 state 某种程度是可变的话，浅比较会有遗漏，那你就不能使用它了。当数据结构很复杂时，情况会变得麻烦。

> `PureComponent` 会对比当前对象和下一个状态的 `prop` 和 `state` ，而这个比较属于浅比较，比较基本数据类型是否相同，而对于引用数据类型，**比较的是它的引用地址是否相同，这个比较与内容无关**

```js
state = {stus:['小张','小李','小王']}

addStu = ()=>{
    /* const {stus} = this.state
    stus.unshift('小刘')
    this.setState({stus}) */

    const {stus} = this.state
    this.setState({stus:['小刘',...stus]})
}
```

注释掉的那部分，我们是用`unshift`方法为`stus`数组添加了一项，它本身的地址是不变的，这样的话会被当做没有产生变化(因为引用数据类型比较的是地址)，所以我们平时都是采用合并数组的方式去更新数组。

### 6.3 案例

```jsx
import React, { PureComponent } from 'react'
import "./index.css";

export default class A extends PureComponent {
  state = {
    username:"张三"
  }

  handleClick = () => {
    this.setState({})
  }

  render() {
    console.log("A:enter render()")
    const {username} = this.state;
    const {handleClick} = this;

    return (
      <div className="a">
        <div>我是组件A</div>
        <span>我的username是{username}</span>&nbsp;&nbsp;
        <button onClick={handleClick}>执行setState且不改变状态数据</button>
        <B/>
      </div>
    )
  }
}

class B extends PureComponent{
  render(){
    console.log("B:enter render()")
    return (
      <div className="b">
        <div>我是组件B</div>
      </div>
    )
  }
}

```

点击按钮后不会有任何变化，render函数也没有调用

![image-20221027191454468](https://i0.hdslb.com/bfs/album/fb16728a87c04da136da2a965d4980bd70580234.png)

修改代码

```js
handleClick = () => {
    this.setState({
      username: '李四',
    })
}
```

点击按钮后只有`A`组件的`render`函数会调用

![image-20221027192124322](https://i0.hdslb.com/bfs/album/f0022ed007d420efc7b284799314e5f2bfa944db.png)

修改代码

```js
handleClick = () => {
    const { state } = this
    state.username = '李四'
    this.setState(state)
}
```

![image-20221027192253591](https://i0.hdslb.com/bfs/album/8cb94c97d7c461cc870ad0e5cb3a1e370d33f95c.png)

点击后不会有任何变化，`render`函数没有调用，这个时候其实是`shouldComponentUpdate`返回的`false`。

## 7.Render Props

**如何向组件内部动态传入带内容的结构(标签)?**

```css
Vue中: 
	使用slot技术, 也就是通过组件标签体传入结构  <AA><BB/></AA>
React中:
	使用children props: 通过组件标签体传入结构
	使用render props: 通过组件标签属性传入结构, 一般用render函数属性
```

**children props**

```jsx
render() {
    return (
            <A>
              <B>xxxx</B>
            </A>
    )
}


问题: 如果B组件需要A组件内的数据, ==> 做不到 
```

术语 [“render prop”](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

采用 render props 技术，我们可以像组件内部动态传入带有内容的结构

> 当我们在一个组件标签中填写内容时，这个内容会被定义为 children props，我们可以通过 `this.props.children` 来获取

例如：

```html
<A>hello</A>
```

这个 hello 我们就可以通过 children 来获取

而我们所说的 render props 就是在组件标签中传入一个 render 方法(名字可以自己定义，这个名字更语义化)，又因为属于 props ，因而被叫做了 render props

```jsx
<A render={(name) => <B name={name} />} />
A组件: {this.props.render(内部state数据)}
B组件: 读取A组件传入的数据显示 {this.props.data} 
```

你可以把 `render` 看作是 `props`，只是它有特殊作用，当然它也可以用其他名字来命名

在上面的代码中，我们需要在 A 组件中预留出 B 组件渲染的位置 在需要的位置上加上`{this.props.render(name)}`

那我们在 B 组件中，如何接收 A 组件传递的 `name` 值呢？通过 `this.props.name` 的方式

```jsx
export default class Parent extends Component {
	render() {
		return (
			<div className="parent">
				<h3>我是Parent组件</h3>
				<A render={ name => (<B name={name}/>) }/>
			</div>
		)
	}
}

class A extends Component {
	state = {name:'tom'}
	render() {
		console.log(this.props);
		const {name} = this.state
		return (
			<div className="a">
				<h3>我是A组件</h3>
				{this.props.render(name)}
			</div>
		)
	}
}

class B extends Component {
	render() {
		console.log('B--render');
		return (
			<div className="b">
				<h3>我是B组件,{this.props.name}</h3>
			</div>
		)
	}
}

```

## 8.使用 PropTypes 进行类型检查

**已在 `02 【面向组件编程】`中 `3.props `进行说明**

## 9.静态类型检查