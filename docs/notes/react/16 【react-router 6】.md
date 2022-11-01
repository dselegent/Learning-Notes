# 16 【react-router 6】

> 关于路由的知识已在`11 【react-router 5】`中进行说明，这里主要是对于5版本的api的变换说明

## 1.概述

官方文档：[Home v6.4.1 | React Router](https://reactrouter.com/en/main)React Router 以三个不同的包发布到 npm 上，它们分别为：

1. 1. react-router: 路由的核心库，提供了很多的：组件、钩子。
   2. <strong style="color:#dd4d40">**react-router-dom:**</strong > <strong style="color:#dd4d40">包含react-router所有内容，并添加一些专门用于 DOM 的组件，例如 `<BrowserRouter>`等 </strong>。
   3. react-router-native: 包括react-router所有内容，并添加一些专门用于ReactNative的API，例如:`<NativeRouter>`等。
   
2. 与React Router 5.x 版本相比，改变了什么？

   1. 内置组件的变化：移除`<Switch/>` ，新增 `<Routes/>`等。

   2. 语法的变化：`component={About}` 变为 `element={<About/>}`等。

   3. 新增多个hook：`useParams`、`useNavigate`、`useMatch`等。

   4. <strong style="color:#dd4d40">官方明确推荐函数式组件了！！！</strong>

      ......

安装

```bash
npm install react-router-dom@6
```

## 2.BrowserRouter和HashRouter

在 React Router 中，最外层的 API 通常就是用 BrowserRouter。BrowserRouter 的内部实现是用了 `history` 这个库和 React Context 来实现的，所以当你的用户前进后退时，`history` 这个库会记住用户的历史记录，这样需要跳转时可以直接操作。

BrowserRouter 使用时，通常用来包住其它需要路由的组件，所以通常会需要在你的应用的最外层用它，比如如下

```javascript
import ReactDOM from 'react-dom'
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App`

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
, document.getElementById('app))
```

`<HashRouter>`

1. 说明：作用与`<BrowserRouter>`一样，但`<HashRouter>`修改的是地址栏的hash值。
2. 备注：6.x版本中`<HashRouter>`、`<BrowserRouter> ` 的用法与 5.x 相同。

## 3.Routes 与 Route

1. v6版本中移出了先前的`<Switch>`，引入了新的替代者：`<Routes>`。

2. `<Routes>` 和 `<Route>`要配合使用，且必须要用`<Routes>`包裹`<Route>`。

3. `<Route>` 相当于一个 if 语句，如果其路径与当前 URL 匹配，则呈现其对应的组件。

4. `<Route caseSensitive>` 属性用于指定：匹配时是否区分大小写（默认为 false）。

5. 当URL发生变化时，`<Routes> `都会查看其所有子` <Route>` 元素以找到最佳匹配并呈现组件 。

6. `<Route>` 也可以嵌套使用，且可配合`useRoutes()`配置 “路由表” ，但需要通过 `<Outlet>` 组件来渲染其子路由。

**Route**

Route 用来定义一个访问路径与 React 组件之间的关系。比如说，如果你希望用户访问 `https://your_site.com/about` 的时候加载 `<About />` 这个 React 页面，那么你就需要用 Route:

```jsx
<Route path="/about" element={<About />} />
```

**Routes**

Routes 是用来包住路由访问路径(Route)的。它决定用户在浏览器中输入的路径到对应加载什么 React 组件，因此绝大多数情况下，Routes 的唯一作用是用来包住一系列的 `Route`，比如如下

```jsx
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
```

在这里，Routes 告诉了 React Router 每当用户访问根地址时，加载 `Home` 这个页面，而当用户访问 `/about` 时，就加载 `<About />` 页面。

**完整代码**

```jsx
<Routes>
    /*path属性用于定义路径，element属性用于定义当前路径所对应的组件*/
    <Route path="/login" element={<Login />}></Route>

		/*用于定义嵌套路由，home是一级路由，对应的路径/home*/
    <Route path="home" element={<Home />}>
       /*test1 和 test2 是二级路由,对应的路径是/home/test1 或 /home/test2*/
      <Route path="test1" element={<Test/>}></Route>
      <Route path="test2" element={<Test2/>}></Route>
	</Route>
	
		//Route也可以不写element属性, 这时就是用于展示嵌套的路由 .所对应的路径是/users/xxx
    <Route path="users">
       <Route path="xxx" element={<Demo />} />
    </Route>
</Routes>
```

## 4.React Router 实操案例

首先我们建起几个页面

```html
<Home />

<About />

<Dashboard />
```

`Home` 用于展示一个简单的导航列表，`About`用于展示关于页，而 `Dashboard` 则需要用户登录以后才可以访问。

```jsx
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
         <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
         </BrowserRouter>
  )
}


const Home = () => {
  return <div>hello world</div>
}

export default App;
```

这里我们直接在 `App.js` 中加上一个叫 Home 的组件，里面只是单纯地展示 `hello wolrd` 而已。接下来，我们再把另外两个路径写好，加入 About 和 Dashboard 两个组件

```jsx
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
  	<BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
  )
}


const Home = () => {
  return <div>hello world</div>
}

const About = () => {
  return <div>这里是卡拉云的主页</div>
}

const Dashboard = () => {
  return <div>今日活跃用户: 42</div>
}

export default App;
```

此时，当我们在浏览器中切换到 `/` 或 `/about` 或 `/dashboard` 时，就会显示对应的组件了。注意，在上面每个 `Route` 中，用 `element` 项将组件传下去，同时在 `path` 项中指定路径。在 `Route` 外，用 `Routes` 包裹起整路由列表。

## 5.如何设置默认页路径(如 404 页)

在上文的路由列表 `Routes` 中，我们可以加入一个 `catch all` 的默认页面，比如用来作 404 页面。

我们只要在最后加入 `path` 为 `*` 的一个路径，意为匹配所有路径，即可

```jsx
function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
}

// 用来作为 404 页面的组件
const NotFound = () => {
  return <div>你来到了没有知识的荒原</div>
}
```

## 6.Link

1. 作用: 修改URL，且不发送网络请求（路由链接）。
2. 注意: 外侧需要用`<BrowserRouter>`或`<HashRouter>`包裹。

```jsx
import { Link } from "react-router-dom";

function Test() {
  return (
    <div>
    	<Link to="/路径">按钮</Link>
    </div>
  );
}
```

## 7.NavLink

作用: 与`<Link>`组件类似，且可实现导航的“高亮”效果。

````jsx
// 注意: NavLink默认类名是active，下面是指定自定义的class

//自定义样式
// 这里的isActive是个boolean值，如果你激活了对应路由就会返回true
<NavLink
    to="login"
    className={({ isActive }) => {
        console.log('home', isActive)
        return isActive ? 'list-group-item myActive' : 'list-group-item'
    }}
>login</NavLink>

/*
	默认情况下，当Home的子组件匹配成功，Home的导航也会高亮，
	当NavLink上添加了end属性后，若Home的子组件匹配成功，则Home的导航没有高亮效果。
	可以说没有用
*/
<NavLink to="home" end >home</NavLink>
````

我们可以把这个逻辑抽离出来

```jsx
function computeClassName({isActive}){
    return isActive?"list-group-item myActive":"list-group-item";
 }

<NavLink className={computeClassName} to="/about">About</NavLink>
<NavLink className={computeClassName} to="/home">Home</NavLink>
```

## 8.Navigate

1. 作用：只要`<Navigate>`组件被渲染，就会修改路径，切换视图。

2. `replace`属性用于控制跳转模式（push 或 replace，默认是push）。

> 相当于5版本的Redirect，对于我来说Redirect语义化会更好的

http://localhost:3000/home时，展示Home组件；
http://localhost:3000/about时，展示About组件。
http://localhost:3000/时，既不展示Home组件，也不展示About组件。
现在，我们使用Redirect Navigate组件实现重定向：`<Route path="/" element={<Navigate to="/about"/>}></Route>`。因此，当访问http://localhost:3000/时，重定向至http://localhost:3000/about，即默认展示About组件。

```jsx
import React from 'react'
import About from "./pages/About";
import Home from "./pages/Home";
import {Route,Routes,Navigate} from "react-router-dom";

<Routes>
    <Route path="/about" element={<About/>}></Route>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/" element={<Navigate to="/about"/>}></Route>
</Routes>
```

跳转模式的使用:

```jsx
import React,{useState} from 'react'
import {Navigate} from 'react-router-dom'

export default function Home() {
	const [sum,setSum] = useState(1)
	return (
		<div>
			<h3>我是Home的内容</h3>
			{/* 根据sum的值决定是否切换视图 */}
			{sum === 1 ? <h4>sum的值为{sum}</h4> : <Navigate to="/about" replace={true}/>}
			<button onClick={()=>setSum(2)}>点我将sum变为2</button>
		</div>
	)
}
```

## 9.使用useRoutes注册路由

### 9.1 使用useRoutes注册路由表-第一次改进

 `useRoutes()`

- 作用：根据路由表，动态创建`<Routes>`和`<Route>`。

```jsx
import React from 'react'
import {NavLink,Navigate,useRoutes} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

export default function App() {
  const element = useRoutes([
    {
      path:"home",
      element:<Home/>
    },
    {
      path:"about",
      element:<About/>
    },
    {
      path:"/",
      element:<Navigate to="/about"/>
    },
  ])
  return (
    <div>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/home">Home</NavLink>
        <div className="content">
        {element}
        </div>
    </div>
  )
}
```

注意点：**`useRoutes([])`**，useRoutes根据路由表生成对应的路由规则。

### 9.2 第二次改进

src文件夹下新建子文件夹：`routes`，`routes`下新建文件：`index.js`
路由表独立成js文件`：src/routes/index.js`

`routes/index.js`

```jsx
import { Navigate } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";

const routes = [
    {
        path:"/about",
        element:<About/>
    },
    {
        path:"/home",
        element:<Home/>
    },
    {
        path:"/",
        element:<Navigate to="/about"/>
    }
]

export default routes;
```

`App.js`

```jsx
import React from 'react'
import {NavLink,useRoutes} from "react-router-dom";
import routes from "./routes";

export default function App() {
  const element = useRoutes(routes);
  return (
    <div>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/home">Home</NavLink>
        <div className="content">
        {element}
        </div>
    </div>
  )
}
```

## 10.嵌套路由的实现

路由结构如下：

- /about，About组件
- /home，Home组件
  - /home/news，News组件
  - /home/message，Message组件

> 在pages文件夹下新建文件夹：News，News下新建文件：index.jsx，即News组件；
> 在pages文件夹下新建文件夹：Message，Message下新建文件：index.jsx，即Message组件。
>
> 路由表文件routes/index.js
> pages/Home/index.jsx，即Home组件
> pages/News/index.jsx，即News组件
> pages/Message/index.jsx，即Message组件

![image-20221027122205526](https://i0.hdslb.com/bfs/album/8a6da962aea796cb490cb74582edd7e18dab8a65.png)

`routes/index.js`

用 **`children`** 来嵌套路由。

```jsx
import { Navigate } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import News from "../pages/News";
import Message from "../pages/Message";

const routes = [
    {
        path:"/about",
        element:<About/>
    },
    {
        path:"/home",
        element:<Home/>,
        children:[
            {
                path:"news",
                element:<News/>
            },
            {
                path:"message",
                element:<Message/>
            },
        ]
    },
    {
        path:"/",
        element:<Navigate to="/about"/>
    }
]

export default routes;
```

`Home/index.js`

> `<Outlet>`
>
> 作用：当`<Route>`产生嵌套时，渲染其对应的后续子路由。

```jsx
import React from 'react';
import { NavLink,Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h2>Home组件内容</h2>
      <div>
        <ul className="nav nav-tabs">
          <li>
            {/* <NavLink to="/home/news" className="list-group-item">News</NavLink> */}
            {/* <NavLink to="./news" className="list-group-item">News</NavLink> */}
            <NavLink to="news" className="list-group-item">News</NavLink>
          </li>
          <li>
            <NavLink to="/home/message" className="list-group-item">Message</NavLink>
          </li>
        </ul>
        <Outlet/>
      </div>
    </div>
  )
}
```

- 路由链接中的 **`to`** 属性值，可以是
  - **`to="/home/news"`**，即全路径(推荐这样写，不然直接看不知道是不是子路由)
  - **`to="./news"`**，即相对路径
  - **`to="news"`**

## 11.路由传递参数

### 11.1 传递 params 参数

需求描述：点击“消息1”，显示其id、title和content。

> pages下新建子文件夹：Detail，Detail下新建文件：index.jsx。pages/Detail/index.jsx即Detail组件。
>
> routes/index.js
> pages/Message/index.jsx，即Message组件
> pages/Detail/index.jsx，即Detail组件

![371844431d4c4553a1fbfd9d01fb140a](https://i0.hdslb.com/bfs/album/cd93da0f0a1b8cb3c10a95316774424e8a90c2a3.gif)

`routes/index.js`

```jsx
import { Navigate } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import News from "../pages/News";
import Message from "../pages/Message";
import Detail from "../pages/Detail";

const routes = [
    {
        path:"/about",
        element:<About/>
    },
    {
        path:"/home",
        element:<Home/>,
        children:[
            {
                path:"news",
                element:<News/>
            },
            {
                path:"message",
                element:<Message/>,
                children:[
                    {
                        path:"detail/:id/:title/:content",
                        element:<Detail/>
                    }
                ]
            },
        ]
    },
    {
        path:"/",
        element:<Navigate to="/about"/>
    }
]

export default routes;
```

`Message/index.jsx`（Message组件）

```jsx
import React,{useState} from 'react'
import { NavLink,Outlet } from 'react-router-dom'

export default function Message() {
    const [message] = useState([
        {id:"001",title:"消息1",content:"窗前明月光"},
        {id:"002",title:"消息2",content:"疑是地上霜"},
        {id:"003",title:"消息3",content:"举头望明月"},
        {id:"004",title:"消息4",content:"低头思故乡"}
    ])

    return (
        <div>
            <ul>
            {
                message.map(msgObj => {
                    return (
                        <li key={msgObj.id}>
                            <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}/${msgObj.content}`}>{msgObj.title}</Link>
                        </li>
                    )
                })
            }
            </ul>
            <hr />
            <Outlet/>
        </div>
    )
}
```

`Detail/index.jsx`（Detail组件）

> `useParams()`
>
> 作用：回当前匹配路由的`params`参数，类似于5.x中的`match.params`。
>
> `useMatch()`
>
> 作用：返回当前匹配信息，对标5.x中的路由组件的`match`属性。

```jsx
import React from 'react'
import { useParams } from 'react-router-dom'
// import { useMatch } from 'react-router-dom'

export default function Detail() {
  const {id,title,content} = useParams();
  // const {params:{id,title,content}}= useMatch("/home/message/detail/:id/:title/:content");

  return (
    <ul>
      <li>消息编号：{id}</li>
      <li>消息标题：{title}</li>
      <li>消息内容：{content}</li>
    </ul>
  )
}
```

![image-20221027221627763](https://i0.hdslb.com/bfs/album/a48329c789ca77c001be90191437f51399cc7ff0.png)

获取params参数有两种方式：

1. 使用 **useParams**
   **`const {id,title,content} = useParams();`**
2. 使用 **useMatch**
   **`const {params:{id,title,content}}= useMatch("/home/message/detail/:id/:title/:content");`**

![image-20221027221736759](https://i0.hdslb.com/bfs/album/3d4eb676c19c7cf4962b27e7bfedff9da5afe804.png)

### 11.2 传递 search 参数

演示的需求和上面`params`参数一样，所以只修改关键部分

`routes/index.js`

```jsx
const routes = [
    {
        path:"/home",
        element:<Home/>,
        children:[
            {
                path:"news",
                element:<News/>
            },
            {
                path:"message",
                element:<Message/>,
                children:[
                    {
                        path:"detail",
                        element:<Detail/>
                    }
                ]
            },
        ]
    },
]

export default routes;
```

`Message/index.jsx`（Message组件）

```jsx
export default function Message() {
    return (
        <div>
            <ul>
            {
                message.map(msgObj => {
                    return (
                        <li key={msgObj.id}>
                            <Link to={`detail?id=${msgObj.id}&title=${msgObj.title}&content=${msgObj.content}`}>{msgObj.title}</Link>
                        </li>
                    )
                })
            }
            </ul>
            <hr />
            <Outlet/>
        </div>
    )
}

```

`Detail/index.jsx`（Detail组件）

> `useSearchParams()`
>
> 作用：用于读取和修改当前位置的 URL 中的查询字符串。
> 返回一个包含两个值的数组，内容分别为：当前的seaech参数、更新search的函数。
>
> `useLocation()`
>
> 作用：获取当前 location 信息，对标5.x中的路由组件的`location`属性。

**使用useSearchParams**

```jsx
import { useSearchParams } from 'react-router-dom'

export default function Detail() {
  const [search,setSearch] = useSearchParams();
  const id = search.get("id");
  const title = search.get("title");
  const content = search.get("content");

  return (
    <ul>
      <li>
        <button onClick={()=>setSearch('id=008&title=哈哈&content=嘻嘻')}>点我更新一下收到的search参数</button>
      </li>
      <li>消息编号：{id}</li>
      <li>消息标题：{title}</li>
      <li>消息内容：{content}</li>
    </ul>
  )
}
```

![image-20221027222023399](https://i0.hdslb.com/bfs/album/a858b197e7ebe8e56f378dd04606f409d4a30eb4.png)

点击按钮后

![image-20221027222047406](https://i0.hdslb.com/bfs/album/7cec34a9494d46fcdcfe7cb6e90d80504c34ca85.png)

**使用useLocation**

记得下载安装qs：`npm install --save qs`。

> `nodejs`官方说明`querystring`这个模块即将被废弃，推荐我们使用`qs`模块

```jsx
import { useLocation } from 'react-router-dom'
import qs from "qs";

export default function Detail() {
  const {search} = useLocation();
  const {id,title,content} = qs.parse(search.slice(1));

  return (
    <ul>
      <li>消息编号：{id}</li>
      <li>消息标题：{title}</li>
      <li>消息内容：{content}</li>
    </ul>
  )
}
```

获取search参数，有两种写法：

1. 使用useSearchParams
2. 使用useLocation

### 11.3 传递 state 参数

演示的需求和上面``参数一样，所以只修改关键部分

`routes/index.js`

```jsx
const routes = [
    {
        path:"/home",
        element:<Home/>,
        children:[
            {
                path:"news",
                element:<News/>
            },
            {
                path:"message",
                element:<Message/>,
                children:[
                    {
                        path:"detail",
                        element:<Detail/>
                    }
                ]
            },
        ]
    },
]

export default routes;
```

`Message/index.jsx`（Message组件）

```jsx
import React,{useState} from 'react'
import { NavLink,Outlet } from 'react-router-dom'

export default function Message() {

    return (
        <div>
            <ul>
            {
                message.map(msgObj => {
                    return (
                        <li key={msgObj.id}>
                            <Link to="detail" state={{ id: msgObj.id, title: msgObj.title, content: msgObj.content }} >{msgObj.title}</Link>
                        </li>
                    )
                })
            }
            </ul>
            <hr />
            <Outlet/>
        </div>
    )
}
```

`Detail/index.jsx`（Detail组件）

```jsx
import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Detail() {
  const {state:{id,title,content}} = useLocation();

  return (
    <ul>
      <li>消息编号：{id}</li>
      <li>消息标题：{title}</li>
      <li>消息内容：{content}</li>
    </ul>
  )
}
```

> **刷新页面后对路由state参数的影响**
> 在以前版本中，BrowserRouter没有任何影响，因为state保存在history对象中；HashRouter刷新后会导致路由state参数的丢失
> 但在V6版本中，HashRouter在页面刷新后不会导致路由state参数的丢失
>
> 但是现在网站基本也没看过路径有个`#`，所以我们使用`BrowserRouter`就行了。

## 12.编程式路由导航

案例还是和`11.路由传递参数`一样，只是换了种方式传参数

### 12.1 编程式导航下，路由传递params参数

`pages/Message/index.jsx`

```jsx
import React,{useState} from 'react'
import { NavLink,Outlet,useNavigate } from 'react-router-dom'

export default function Message() {
    const [message] = useState([
        {id:"001",title:"消息1",content:"窗前明月光"},
        {id:"002",title:"消息2",content:"疑是地上霜"},
        {id:"003",title:"消息3",content:"举头望明月"},
        {id:"004",title:"消息4",content:"低头思故乡"}
    ])

    const navigate = useNavigate();

    function handleClick(msgObj){
        const {id,title,content} = msgObj
        navigate(`detail/${id}/${title}/${content}`,{replace:false})
    }

    return (
        <div>
            <ul>
            {
                message.map(msgObj => {
                    return (
                        <li key={msgObj.id}>
                            <NavLink to={`detail/${msgObj.id}/${msgObj.title}/${msgObj.content}`} >{msgObj.title}</NavLink>
                            <button onClick={() => handleClick(msgObj)}>查看消息详情</button>
                        </li>
                    )
                })
            }
            </ul>
            <hr />
            <Outlet/>
        </div>
    )
}
```

### 12.2 编程式导航下，路由传递search参数

`pages/Message/index.jsx`

```jsx
export default function Message() {

    const navigate = useNavigate();

    function handleClick(msgObj){
        const {id,title,content} = msgObj
        navigate(`detail?id=${id}&title=${title}&content=${content}`,{replace:false})
    }

    return (
        <div>
            <ul>
            {
                message.map(msgObj => {
                    return (
                        <li key={msgObj.id}>
                            <NavLink to={`detail?id=${msgObj.id}&title=${msgObj.title}&content=${msgObj.content}`} >{msgObj.title}</NavLink>
                            <button onClick={() => handleClick(msgObj)}>查看消息详情</button>
                        </li>
                    )
                })
            }
            </ul>
            <hr />
            <Outlet/>
        </div>
    )
}
```

### 12.3 编程式导航下，路由传递state参数

`pages/Message/index.jsx`

```jsx
export default function Message() {

    const navigate = useNavigate();

    function handleClick(msgObj){
        const {id,title,content} = msgObj
        navigate("detail",{
            replace:false,
            state:{
                id,
                title,
                content
            }
        })
    }

    return (
        <div>
            <ul>
            {
                message.map(msgObj => {
                    return (
                        <li key={msgObj.id}>
                            <NavLink to="detail" state={{ id: msgObj.id, title: msgObj.title, content: msgObj.content }} >{msgObj.title}</NavLink>
                            <button onClick={() => handleClick(msgObj)}>查看消息详情</button>
                        </li>
                    )
                })
            }
            </ul>
            <hr />
            <Outlet/>
        </div>
    )
}
```

### 12.4 withRouter的替换者

这是5版本的时候

```js
借助this.prosp.history对象上的API对操作路由跳转、前进、后退
        -this.prosp.history.goBack()
        -this.prosp.history.goForward()
        -this.prosp.history.go(1)
```

我们可以利用 `react-router-dom` 对象下的 `withRouter` 函数来对我们导出的 `Header` 组件进行包装，这样我们就能获得一个拥有 `history` 对象的一般组件

withRouter可以加工一般组件(即非路由组件)，让一般组件具备路由组件所持有的API。但v6版本中已废除，可以直接用useNavigate实现。

````jsx
import React from 'react';
import {useNavigate} from 'react-router-dom'

function Header(props) {

    const navigate = new useNavigate()

    const back = ()=>{
        navigate(-1)
    }

    const forward = ()=>{
        navigate(1)
    }

    const go = ()=>{
        navigate(2)
    }
    
    return (
        <div className="page-header">
            <h2>React Router Demo</h2>
            <button onClick={back}>回退</button>
            <button onClick={forward}>前进</button>
            <button onClick={go}>go</button>
        </div>
    );

}

export default Header;
````

