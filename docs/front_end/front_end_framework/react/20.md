# 20 【react中使用ts】

官方文档：[React TypeScript Cheatsheets | React TypeScript Cheatsheets (react-typescript-cheatsheet.netlify.app)](https://react-typescript-cheatsheet.netlify.app/)

> 找了好久才找到

## 1.创建一个组件

下面我们将要创建一个`Hello`组件。 这个组件接收任意一个我们想对之打招呼的名字（我们把它叫做`name`），并且有一个可选数量的感叹号做为结尾（通过`enthusiasmLevel`）。

若我们这样写`<Hello name="Daniel" enthusiasmLevel={3} />`，这个组件大至会渲染成`<div>Hello Daniel!!!</div>`。 如果没指定`enthusiasmLevel`，组件将默认显示一个感叹号。 若`enthusiasmLevel`为`0`或负值将抛出一个错误。

下面来写一下`Hello.tsx`：

```tsx
// src/components/Hello.tsx

import * as React from 'react';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

function Hello({ name, enthusiasmLevel = 1 }: Props) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
      </div>
    </div>
  );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
```

注意我们定义了一个类型`Props`，它指定了我们组件要用到的属性。 `name`是必需的且为`string`类型，同时`enthusiasmLevel`是可选的且为`number`类型（你可以通过名字后面加`?`为指定可选参数）。

我们创建了一个无状态的函数式组件（Stateless Functional Components，SFC）`Hello`。 具体来讲，`Hello`是一个函数，接收一个`Props`对象并拆解它。 如果`Props`对象里没有设置`enthusiasmLevel`，默认值为`1`。

使用函数是React中定义组件的[两种方式](https://facebook.github.io/react/docs/components-and-props.html#functional-and-class-components)之一。 如果你喜欢的话，也*可以*通过类的方式定义：

```tsx
class Hello extends React.Component<Props, object> {
  render() {
    const { name, enthusiasmLevel = 1 } = this.props;

    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(enthusiasmLevel)}
        </div>
      </div>
    );
  }
}
```

当我们的[组件具有某些状态](https://facebook.github.io/react/docs/state-and-lifecycle.html)的时候，使用类的方式是很有用处的。 但在这个例子里我们不需要考虑状态 - 事实上，在`React.Component<Props, object>`我们把状态指定为了`object`，因此使用SFC更简洁。 当在创建可重用的通用UI组件的时候，在表现层使用组件局部状态比较适合。 针对我们应用的生命周期，我们会审视应用是如何通过Redux轻松地管理普通状态的。

现在我们已经写好了组件，让我们仔细看看`index.tsx`，把`<App />`替换成`<Hello ... />`。

首先我们在文件头部导入它：

```js
import Hello from './components/Hello.tsx';
```

然后修改`render`调用：

```tsx
ReactDOM.render(
  <Hello name="TypeScript" enthusiasmLevel={10} />,
  document.getElementById('root') as HTMLElement
);
```

这里还有一点要指出，就是最后一行`document.getElementById('root') as HTMLElement`。 这个语法叫做*类型断言*，有时也叫做*转换*。 当你比类型检查器更清楚一个表达式的类型的时候，你可以通过这种方式通知TypeScript。

这里，我们之所以这么做是因为`getElementById`的返回值类型是`HTMLElement | null`。 简单地说，`getElementById`返回`null`是当无法找对对应`id`元素的时候。 我们假设`getElementById`总是成功的，因此我们要使用`as`语法告诉TypeScript这点。

TypeScript还有一种感叹号（`!`）结尾的语法，它会从前面的表达式里移除`null`和`undefined`。 所以我们也*可以*写成`document.getElementById('root')!`，但在这里我们想写的更清楚些。

## 2.React中内置函数

> React中内置函数由很多，我们就挑几个常用的来学习一下。

### 2.1 React.FC< P >

> React.FC<>是函数式组件在TypeScript使用的一个泛型，FC就是FunctionComponent的缩写，事实上React.FC可以写成React.FunctionComponent。

```tsx
import React from 'react';
 
interface demo1PropsInterface {
    attr1: string,
    attr2 ?: string,
    attr3 ?: 'w' | 'ww' | 'ww'
};
 
// 函数组件，其也是类型别名
// type FC<P = {}> = FunctionComponent<P>;
// FunctionComponent<T>是一个接口，里面包含其函数定义和对应返回的属性
// interface FunctionComponent<P = {}> {
//      // 接口可以表示函数类型，通过给接口定义一个调用签名实现
//      (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
//      propTypes?: WeakValidationMap<P> | undefined;
//      contextTypes?: ValidationMap<any> | undefined;
//      defaultProps?: Partial<P> | undefined;
//      displayName?: string | undefined;
// }
const Demo1: React.FC<demo1PropsInterface> = ({
    attr1,
    attr2,
    attr3
}) => {
    return (
        <div>hello demo1 {attr1}</div>
    );
};
 
export default Demo1;
```

### 2.2 React.Component< P, S >

> React.Component< P, S > 是定义class组件的一个泛型，第一个参数是props、第二个参数是state。

```tsx
import React from "react";
 
// props的接口
interface demo2PropsInterface {
    props1: string
};
 
// state的接口
interface demo2StateInterface {
    state1: string
};
 
class Demo2 extends React.Component<demo2PropsInterface, demo2StateInterface> {
    constructor(props: demo2PropsInterface) {
        super(props);
        this.state = {
            state1: 'state1'
        }
    }
 
    render() {
        return (
            <div>{this.state.state1 + this.props.props1}</div>
        );
    }
}
 
export default Demo2;
```

### 2.3 React.Reducer<S, A>

> useState的替代方案，接收一个形如（state, action) => newState的reducer，并返回当前state以及其配套的dispatch方法。语法如下所示：`const [state, dispatch] = useReducer(reducer, initialArg, init);`

```tsx
import React, {useReducer, useContext} from "react";
 
interface stateInterface {
    count: number
};

interface actionInterface {
    type: string,
    data: {
        [propName: string]: any
    }
};
 
const initialState = {
    count: 0
};
 
// React.Reducer其实是类型别名，其实质上是type Reducer<S, A> = (prevState: S, action: A) => S;
// 因为reducer是一个函数，其接受两个泛型参数S和A，返回S类型
const reducer: React.Reducer<stateInterface, actionInterface> = (state, action) => {
    const {type, data} = action;
    switch (type) {
        case 'increment': {
            return {
                ...state,
                count: state.count + data.count
            };
        }
        case 'decrement': {
            return {
                ...state,
                count: state.count - data.count
            };
        }
        default: {
            return state;
        }
    }
}
```

### 2.4 `React.Context<T>`

1. React.createContext

> 其会创建一个Context对象，当React渲染一个订阅了这个Context对象的组件，这个组件会从组件树中离自身最近的那个匹配的Provider中读取到当前的context值。【注：只要当组件所处的树没有匹配到Provider时，其defaultValue参数参会生效】

```jsx

const MyContext = React.createContext(defaultValue);
 
const Demo = () => {
  return (
      // 注：每个Context对象都会返回一个Provider React组件，它允许消费组件订阅context的变化。
    <MyContext.Provider value={xxxxxx}>
      // ……
    </MyContext.Provider>
  );
```

2. useContext

> 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。语法如下所示：`const value = useContext(MyContext);`

```jsx
import React, {useContext} from "react";
const MyContext = React.createContext('');
 
const Demo3Child: React.FC<{}> = () => {
    const context = useContext(MyContext);
    return (
        <div>
            {context}
        </div>
    );
}
 
const Demo3: React.FC<{}> = () => {
 
    return (
        <MyContext.Provider value={'222222'}>
            <MyContext.Provider value={'33333'}>
                <Demo3Child />
            </MyContext.Provider>
        </MyContext.Provider>
    );
};
```

3. 使用

```tsx
import React, {useReducer, useContext} from "react";
 
interface stateInterface {
    count: number
};

interface actionInterface {
    type: string,
    data: {
        [propName: string]: any
    }
};
 
const initialState = {
    count: 0
};
 
const reducer: React.Reducer<stateInterface, actionInterface> = (state, action) => {
    const {type, data} = action;
    switch (type) {
        case 'increment': {
            return {
                ...state,
                count: state.count + data.count
            };
        }
        case 'decrement': {
            return {
                ...state,
                count: state.count - data.count
            };
        }
        default: {
            return state;
        }
    }
}
 
// React.createContext返回的是一个对象，对象接口用接口表示
// 传入的为泛型参数，作为整个接口的一个参数
// interface Context<T> {
//      Provider: Provider<T>;
//      Consumer: Consumer<T>;
//      displayName?: string | undefined;
// }
const MyContext: React.Context<{
    state: stateInterface,
    dispatch ?: React.Dispatch<actionInterface>
}> = React.createContext({
    state: initialState
});
 
const Demo3Child: React.FC<{}> = () => {
    const {state, dispatch} = useContext(MyContext);
    const handleClick = () => {
        if (dispatch) {
            dispatch({
                type: 'increment',
                data: {
                    count: 10
                }
            })
        }
    };
    return (
        <div>
            {state.count}
            <button onClick={handleClick}>增加</button>
        </div>
    );
}
 
const Demo3: React.FC<{}> = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
 
    return (
        <MyContext.Provider value={{state, dispatch}}>
            <Demo3Child />
        </MyContext.Provider>
    );
};
 
export default Demo3;
```

## 3.React中事件处理函数

> React中的事件是我们在编码中经常用的，例如onClick、onChange、onMouseMove等，那么应该如何用呢？

### 3.1 不带event参数

> 当对应的事件处理函数不带event参数时，这个时候用起来很简单，如下所示：

```jsx
const Test: React.FC<{}> = () => {
    const handleClick = () => {
        // 做一系列处理
    };
    return (
        <div>
            <button onClick={handleClick}>按钮</button>
        </div>
    );
};
```

### 3.2 带event参数

1. 带上event参数，报错

```jsx
const Test: React.FC<{}> = () => {
    // 报错了，注意不要这么写……
    const handleClick = event => {
        // 做一系列处理
        event.preventDefault();
    };
    return (
        <div>
            <button onClick={handleClick}>按钮</button>
        </div>
    );
};
```

2. 点击onClick参数，跳转到index.d.ts文件

```ts
// onClick是MouseEventHandler类型
onClick?: MouseEventHandler<T> | undefined;
 
// 那MouseEventHandler<T>又是啥？原来是个类型别名，泛型是Element类型
type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
 
// 那么泛型Element又是什么呢？其是一个接口，通过继承该接口实现了很多其它接口
interface Element { }
interface HTMLElement extends Element { }
interface HTMLButtonElement extends HTMLElement { }
interface HTMLInputElement extends HTMLElement { }
// ……
```

至此，就知道该位置应该怎么实现了

```tsx
const Test: React.FC<{}> = () => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = event => {
        // 做一系列处理
        event.preventDefault();
    };
    return (
        <div>
            <button onClick={handleClick}>按钮</button>
        </div>
    );
};
```

### 3.3 表单事件

```tsx
// 如果不考虑性能的话，可以使用内联处理，注解将自动正确生成
const el = (
    <button onClick=(e=>{
        //...
    })/>
)
// 如果需要在外部定义类型
handlerChange = (e: React.FormEvent<HTMLInputElement>): void => {
    //
}
// 如果在=号的左边进行注解
handlerChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    //
}
// 如果在form里onSubmit的事件,React.SyntheticEvent,如果有自定义类型，可以使用类型断言
<form
  ref={formRef}
  onSubmit={(e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    // etc...
  }}
>
  <div>
    <label>
      Email:
      <input type="email" name="email" />
    </label>
  </div>
  <div>
    <input type="submit" value="Log in" />
  </div>
</form>
```

### 3.4 事件类型列表

```css
AnimationEvent ： css动画事件
ChangeEvent：<input>， <select>和<textarea>元素的change事件
ClipboardEvent： 复制，粘贴，剪切事件
CompositionEvent：由于用户间接输入文本而发生的事件(例如，根据浏览器和PC的设置，如果你想在美国键盘上输入日文，可能会出现一个带有额外字符的弹出窗口)
DragEvent：在设备上拖放和交互的事件
FocusEvent: 元素获得焦点的事件
FormEvent: 当表单元素得失焦点/value改变/表单提交的事件
InvalidEvent: 当输入的有效性限制失败时触发(例如<input type="number" max="10">，有人将插入数字20)
KeyboardEvent: 键盘键入事件
MouseEvent： 鼠标移动事件
PointerEvent： 鼠标、笔/触控笔、触摸屏)的交互而发生的事件
TouchEvent： 用户与触摸设备交互而发生的事件
TransitionEvent： CSS Transition，浏览器支持度不高
UIEvent：鼠标、触摸和指针事件的基础事件。
WheelEvent: 在鼠标滚轮或类似的输入设备上滚动
SyntheticEvent：所有上述事件的基础事件。是否应该在不确定事件类型时使用
// 因为InputEvent在各个浏览器支持度不一样，所以可以使用KeyboardEvent代替
```

## 4.普通函数

1. 一个具体类型的输入输出函数

```ts
// 参数输入为number类型，通过类型判断直接知道输出也为number
function testFun1 (count: number) {
    return count * 2;
}
```

2. 一个不确定类型的输入、输出函数，但是输入、输出函数类型一致

```ts
// 用泛型
function testFun2<T> (arg: T): T {
    return arg;
}
```

3. async函数，返回的为Promise对象，可以使用then方法添加回调函数，Promise是一个泛型函数，T泛型变量用于确定then方法时接收的第一个回调函数的参数类型。

```tsx
// 用接口
interface PResponse<T> {
    result: T,
    status: string
};
 
// 除了用接口外，还可以用对象
// type PResponse<T> = {
//   	result: T,
//    status: string
// };
 
async function testFun3(): Promise<PResponse<number>> {
    return {
        status: 'success',
        result: 10
    }
}
```

## 5.React Prop 类型

- 如果你有配置 `Eslint` 等一些代码检查时，一般函数组件需要你定义返回的类型，或传入一些 `React` 相关的类型属性。
  这时了解一些 `React` 自定义暴露出的类型就很有必要了。例如常用的 `React.ReactNode`。

```tsx
export declare interface AppProps {
    children1: JSX.Element; // ❌ bad, 没有考虑数组类型
    children2: JSX.Element | JSX.Element[]; // ❌ 没考虑字符类型
    children3: React.ReactChildren; // ❌ 名字唬人，工具类型，慎用
    children4: React.ReactChild[]; // better, 但没考虑 null
    children: React.ReactNode; // ✅ best, 最佳接收所有 children 类型
    functionChildren: (name: string) => React.ReactNode; // ✅ 返回 React 节点

    style?: React.CSSProperties; // React style

    onChange?: React.FormEventHandler<HTMLInputElement>; // 表单事件! 泛型参数即 `event.target` 的类型
}
```

`defaultProps` 默认值问题。

```typescript
type GreetProps = { age: number } & typeof defaultProps;
const defaultProps = {
    age: 21,
};

const Greet = (props: GreetProps) => {
    // etc
};
Greet.defaultProps = defaultProps;
```

- 你可能不需要 defaultProps

```typescript
type GreetProps = { age?: number };

const Greet = ({ age = 21 }: GreetProps) => { 
    // etc 
};
```

## 6.Hooks

项目基本上都是使用函数式组件和 `React Hooks`。
接下来介绍常用的用 TS 编写 Hooks 的方法。

### 6.1 useState

- 给定初始化值情况下可以直接使用

```tsx
import { useState } from 'react';
// ...
const [val, toggle] = useState(false);
// val 被推断为 boolean 类型
// toggle 只能处理 boolean 类型
```

- 没有初始值（undefined）或初始 null

```tsx
type AppProps = { message: string };
const App = () => {
    const [data] = useState<AppProps | null>(null);
    // const [data] = useState<AppProps | undefined>();
    return <div>{data && data.message}</div>;
};
```

- 更优雅，链式判断

```typescript
// data && data.message
data?.message
```

### 6.2 useEffect

- 使用 `useEffect` 时传入的函数简写要小心，它接收一个无返回值函数或一个清除函数。

```tsx
function DelayedEffect(props: { timerMs: number }) {
    const { timerMs } = props;

    useEffect(
        () =>
            setTimeout(() => {
                /* do stuff */
            }, timerMs),
        [timerMs]
    );
    // ❌ bad example! setTimeout 会返回一个记录定时器的 number 类型
    // 因为简写，箭头函数的主体没有用大括号括起来。
    return null;
}
```

- 看看 `useEffect`接收的第一个参数的类型定义。

```tsx
// 1. 是一个函数
// 2. 无参数
// 3. 无返回值 或 返回一个清理函数，该函数类型无参数、无返回值 。
type EffectCallback = () => (void | (() => void | undefined));
```

- 了解了定义后，只需注意加层大括号。

```tsx
function DelayedEffect(props: { timerMs: number }) {
    const { timerMs } = props;

    useEffect(() => {
        const timer = setTimeout(() => {
            /* do stuff */
        }, timerMs);

        // 可选
        return () => clearTimeout(timer);
    }, [timerMs]);
    // ✅ 确保函数返回 void 或一个返回 void|undefined 的清理函数
    return null;
}
```

- 同理，async 处理异步请求，类似传入一个 `() => Promise<void>` 与 `EffectCallback` 不匹配。

```tsx
// ❌ bad
useEffect(async () => {
    const { data } = await ajax(params);
    // todo
}, [params]);
```

- 异步请求，处理方式：

```tsx
// ✅ better
useEffect(() => {
    (async () => {
        const { data } = await ajax(params);
        // todo
    })();
}, [params]);

// 或者 then 也是可以的
useEffect(() => {
    ajax(params).then(({ data }) => {
        // todo
    });
}, [params]);
```

### 6.3 useRef

`useRef` 一般用于两种场景

1. 引用 `DOM` 元素；
2. 不想作为其他 `hooks` 的依赖项，因为 `ref` 的值引用是不会变的，变的只是 `ref.current`。

- 使用 `useRef` ，可能会有两种方式。

```tsx
const ref1 = useRef<HTMLElement>(null!);
const ref2 = useRef<HTMLElement | null>(null);
```

- 非 null 断言 `null!`。断言之后的表达式非 null、undefined

```tsx
function MyComponent() {
    const ref1 = useRef<HTMLElement>(null!);
    useEffect(() => {
        doSomethingWith(ref1.current);
        // 跳过 TS null 检查。e.g. ref1 && ref1.current
    });
    return <div ref={ref1}> etc </div>;
}
```

- 不建议使用 `!`，存在隐患，Eslint 默认禁掉。

```tsx
function TextInputWithFocusButton() {
    // 初始化为 null, 但告知 TS 是希望 HTMLInputElement 类型
    // inputEl 只能用于 input elements
    const inputEl = React.useRef<HTMLInputElement>(null);
    const onButtonClick = () => {
        // TS 会检查 inputEl 类型，初始化 null 是没有 current 上是没有 focus 属性的
        // 你需要自定义判断! 
        if (inputEl && inputEl.current) {
            inputEl.current.focus();
        }
        // ✅ best
        inputEl.current?.focus();
    };
    return (
        <>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}
```

### 6.4 useReducer

使用 `useReducer` 时，多多利用 Discriminated Unions 来精确辨识、收窄确定的 `type` 的 `payload` 类型。
一般也需要定义 `reducer` 的返回类型，不然 TS 会自动推导。

- 又是一个联合类型收窄和避免拼写错误的精妙例子。

```tsx
const initialState = { count: 0 };

// ❌ bad，可能传入未定义的 type 类型，或码错单词，而且还需要针对不同的 type 来兼容 payload
// type ACTIONTYPE = { type: string; payload?: number | string };

// ✅ good
type ACTIONTYPE =
    | { type: 'increment'; payload: number }
    | { type: 'decrement'; payload: string }
    | { type: 'initial' };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + action.payload };
        case 'decrement':
            return { count: state.count - Number(action.payload) };
        case 'initial':
            return { count: initialState.count };
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            Count: {state.count}            
		   <button onClick={() => dispatch({ type: 'decrement', payload: '5' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>+</button>
        </>
    );
}
```

### 6.5 useContext

一般 `useContext` 和 `useReducer` 结合使用，来管理全局的数据流。

- 例子

```tsx
interface AppContextInterface {
    state: typeof initialState;
    dispatch: React.Dispatch<ACTIONTYPE>;
}

const AppCtx = React.createContext<AppContextInterface>({
    state: initialState,
    dispatch: (action) => action,
});
const App = (): React.ReactNode => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppCtx.Provider value={{ state, dispatch }}>
            <Counter />
        </AppCtx.Provider>
    );
};

// 消费 context
function Counter() {
    const { state, dispatch } = React.useContext(AppCtx);
    return (
        <>
            Count: {state.count}            
		   <button onClick={() => dispatch({ type: 'decrement', payload: '5' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>+</button>
        </>
    );
}
```

### 6.6 useImperativeHandle, forwardRef

推荐使用一个自定义的 `innerRef` 来代替原生的 `ref`，否则要用到 `forwardRef` 会搞的类型很复杂。

```tsx
type ListProps = {
  innerRef?: React.Ref<{ scrollToTop(): void }>
}

function List(props: ListProps) {
  useImperativeHandle(props.innerRef, () => ({
    scrollToTop() { }
  }))
  return null
}
```

结合刚刚 useRef 的知识，使用是这样的：

```tsx
function Use() {
  const listRef = useRef<{ scrollToTop(): void }>(null!)

  useEffect(() => {
    listRef.current.scrollToTop()
  }, [])

  return (
    <List innerRef={listRef} />
  )
}
```

很完美，是不是？

可以在线调试 [useImperativeHandle 的例子](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQNwCwAUKJLHAN5wCuqWAyjMhhYANFx4BRAgSz5R3LNgJyeASXBYog4ADcsACWQA7ACYAbLHAC+cIiXKU8MWo0YwAnmAsAZYKhgAFYjB0AF52Rjg4YENDDUUAfgAuTCoYADpFAB4OVFxiU1MAFQhisAAKAEpk7QhgYysAPkZLFwYCTkN8YAhDOB8-MrAg1GT+gOGK8IZI+TVPTRgdfSMzLEHhtOjYqEVRSrgQhrgytgjIuFz8opKIcsmOFumrCoqzyhhOKF7DTgLm1vanUWPTgAFUePtTk9cD0-HBTL4YIoDmIFFgCNkLnkIAViqVKtVavVLA0yj8CgBCV4MM7ySTSfBlfaHKbneGIxRpXCfSiGdKXHHXfHUyKWUQAbQAutS3lgPl9jmdIpkxlEYnF0SE2Ai-IprAB6JpPamWIA)。

### 6.6 自定义 Hooks

`Hooks` 的美妙之处不只有减小代码行的功效，重点在于能够做到逻辑与 UI 分离。做纯粹的逻辑层复用。

- 例子：当你自定义 Hooks 时，返回的数组中的元素是确定的类型，而不是联合类型。可以使用 const-assertions 。

```typescript
export function useLoading() {
    const [isLoading, setState] = React.useState(false);
    const load = (aPromise: Promise<any>) => {
        setState(true);
        return aPromise.finally(() => setState(false));
    };
    return [isLoading, load] as const; // 推断出 [boolean, typeof load]，而不是联合类型 (boolean | typeof load)[]
}
```

- 也可以断言成 `tuple type` 元组类型。

```typescript
export function useLoading() {
    const [isLoading, setState] = React.useState(false);
    const load = (aPromise: Promise<any>) => {
        setState(true);
        return aPromise.finally(() => setState(false));
    };
    return [isLoading, load] as [
        boolean, 
        (aPromise: Promise<any>) => Promise<any>
    ];
}
```

- 如果对这种需求比较多，每个都写一遍比较麻烦，可以利用泛型定义一个辅助函数，且利用 TS 自动推断能力。

```typescript
function tuplify<T extends any[]>(...elements: T) {
    return elements;
}

function useArray() {
    const numberValue = useRef(3).current;
    const functionValue = useRef(() => {}).current;
    return [numberValue, functionValue]; // type is (number | (() => void))[]
}

function useTuple() {
    const numberValue = useRef(3).current;
    const functionValue = useRef(() => {
    }).current;
    return tuplify(numberValue, functionValue); // type is [number, () => void]
}
```