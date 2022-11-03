# 19 【RTK Query】

## 1.目前前端常见的发起 ajax 请求的方式

- 1、使用原生的`ajax`请求
- 2、使用`jquery`封装好的`ajax`请求
- 3、使用`fetch`发起请求
- 4、第三方的比如`axios`请求
- 5、`angular`中自带的`HttpClient`

就目前前端框架开发中来说我们在开发`vue`、`react`的时候一般都是使用`fetch`或`axios`自己封装一层来与后端数据交互，至于`angular`肯定是用自带的`HttpClient`请求方式，但是依然存在几个致命的弱点，

- 1、对当前请求数据不能缓存，
- 2、一个页面上由多个组件组成，但是刚好有遇到复用相同组件的时候，那么就会发起多次`ajax`请求

> 📢 针对同一个接口发起多次请求的解决方法，目前常见的解决方案

- 1、使用`axios`的取消发起请求，[参考文档](http://www.axios-js.com/zh-cn/docs/#取消)
- 2、`vue`中还没看到比较好的方法
- 3、在`rect`中可以借用类似[react-query](https://react-query.tanstack.com/)工具对请求包装一层
- 4、对于`angular`中直接使用`rxjs`的操作符`shareReplay`

## 2.RTK Query 概述

RTK不仅帮助我们解决了state的问题，同时，它还为我们提供了RTK Query用来帮助我们处理数据加载的问题。RTK Query是一个强大的数据获取和缓存工具。在它的帮助下，Web应用中的加载变得十分简单，它使我们不再需要自己编写获取数据和缓存数据的逻辑。

`rtk-query`是[`redux-toolkit`](https://redux-toolkit.js.org/)里面的一个分之，专门用来优化前端接口请求，目前也只支持在`react`中使用。

**RTK Query** 是一个强大的数据获取和缓存工具。它旨在简化在 Web 应用程序中加载数据的常见情况，**无需自己手动编写数据获取和缓存逻辑**。

RTK Query 是**一个包含在 Redux Toolkit 包中的可选插件**，其功能构建在 Redux Toolkit 中的其他 API 之上。

**Web应用中加载数据时需要处理的问题：**

1. 根据不同的加载状态显示不同UI组件
2. 减少对相同数据重复发送请求
3. 使用乐观更新，提升用户体验
4. 在用户与UI交互时，管理缓存的生命周期

这些问题，RTKQ都可以帮助我们处理。首先，可以直接通过RTKQ向服务器发送请求加载数据，并且RTKQ会自动对数据进行缓存，避免重复发送不必要的请求。其次，RTKQ在发送请求时会根据请求不同的状态返回不同的值，我们可以通过这些值来监视请求发送的过程并随时中止。

我们将 `createAsyncThunk` 与 `createSlice` 一起使用，在发出请求和管理加载状态方面仍然需要进行大量手动工作。我们必须创建异步 thunk，发出实际请求，从响应中提取相关字段，添加加载状态字段，在 `extraReducers` 中添加处理程序以处理 `pending/fulfilled/rejected` 情况，并实际编写正确的状态更新。

在过去的几年里，React 社区已经意识到 **“数据获取和缓存” 实际上是一组不同于 “状态管理” 的关注点**。虽然你可以使用 Redux 之类的状态管理库来缓存数据，但用例差异较大，因此值得使用专门为数据获取用例构建的工具。

RTK Query 在其 API 设计中添加了独特的方法：

- 数据获取和缓存逻辑构建在 Redux Toolkit 的 `createSlice` 和 `createAsyncThunk` API 之上
- 由于 Redux Toolkit 与 UI 无关，因此 RTK Query 的功能可以与任何 UI 层一起使用
- API 请求接口是提前定义的，包括如何从参数生成查询参数和转换响应以进行缓存
- RTK Query 还可以生成封装整个数据获取过程的 React hooks ，为组件提供 `data` 和 `isFetching` 字段，并在组件挂载和卸载时管理缓存数据的生命周期
- RTK Query 提供“缓存数据项生命周期函数”选项，支持在获取初始数据后通过 websocket 消息流式传输缓存更新等用例
- 我们有从 OpenAPI 和 GraphQL 模式生成 API slice 代码的早期工作示例
- 最后，RTK Query 完全用 TypeScript 编写，旨在提供出色的 TS 使用体验

> 📢 `rtk-query`的使用环境，必须是`react`版本大于 17,可以使用`hooks`的版本，因为使用`rtk-query`的查询都是`hooks`的方式，如果你项目简单`redux`都未使用到，本人不建议你用`rtk-query`，可能直接使用`axios`请求更加的简单方便。