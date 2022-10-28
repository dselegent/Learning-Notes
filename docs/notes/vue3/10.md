# 10 【异步组件 组合式函数(hooks)】

## 1.异步组件

### 1.1 为什么要有异步组件

首先来看这样一段代码

父组件`App.vue`

```vue
<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Child></Child>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<script setup>
import Child from './components/Child.vue';
</script>
```

子组件`Child.vue`

```vue
<template>
  <div class="child">
    <h3>我是Child组件</h3>
    {{ sum }}
  </div>
</template>

<script>
export default {
  name: 'Child',
};
</script>

<script setup>
let sum = $ref(1);
</script>
```

![image-20220809174007084](https://i0.hdslb.com/bfs/album/4996cd02d6218ffb28b50b2ec2840146e1e3db4b.png)

把网络切换到慢一点的速度，你会发现这两个组件时同时出来的，所以父组件是会要等子组件加载成功的。如果`Child`组件一直没加载成功，那么父组件会一直等着他。

所以引出了异步组件，他可以无需让父组件等待子组件。

### 1.2 基础用法

在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件。Vue 提供了 [`defineAsyncComponent`](https://staging-cn.vuejs.org/api/general.html#defineasynccomponent) 方法来实现此功能

`defineAsyncComponent` 方法接收一个返回 Promise 的加载函数。这个 Promise 的 `resolve` 回调方法应该在从服务器获得组件定义时调用。你也可以调用 `reject(reason)` 表明加载失败。

[ES 模块动态导入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports)也会返回一个 Promise，所以多数情况下我们会将它和 `defineAsyncComponent` 搭配使用。类似 Vite 和 Webpack 这样的构建工具也支持此语法（并且会将它们作为打包时的代码分割点），因此我们也可以用它来导入 Vue 单文件组件：

父组件`App.vue`

```vue
<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Child></Child>
  </div>
</template>

<script setup>
// import Child from './components/Child.vue';
import { defineAsyncComponent } from 'vue';
const Child = defineAsyncComponent(() => import('./components/Child.vue'));
</script>
```

![image-20220809174530192](https://i0.hdslb.com/bfs/album/5b63169ca48efebcd67ddb9036c7a504ac3de64d.png)

这个时候父组件已经能不用等子组件了，但是，这样还有一个问题：

子组件是占用了父组件的空间的，闪一下突然加载出来很不友好，所以引出了内置组件`Suspense `。

### 1.3 加载与错误状态

异步操作不可避免地会涉及到加载和错误状态，因此 `defineAsyncComponent()` 也支持在高级选项中处理这些状态：

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```

如果提供了一个加载组件，它将在内部组件加载时先行显示。在加载组件显示之前有一个默认的 200ms 延迟——这是因为在网络状况较好时，加载完成得很快，加载组件和最终组件之间的替换太快可能产生闪烁，反而影响用户感受。

如果提供了一个报错组件，则它会在加载器函数返回的 Promise 抛错时被渲染。你还可以指定一个超时时间，在请求耗时超过指定时间时也会渲染报错组件。

### 1.4 搭配 Suspense 使用（实验性）

异步组件可以搭配内置的 `<Suspense>` 组件一起使用，若想了解 `<Suspense>` 和异步组件之间交互，请参阅 [``](https://staging-cn.vuejs.org/guide/built-ins/suspense.html) 章节。

`<Suspense>` 是一个内置组件，用来在组件树中协调对异步依赖的处理。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。

#### 1.4.1 异步依赖

要了解 `<Suspense>` 所解决的问题和它是如何与异步依赖进行交互的，我们需要想象这样一种组件层级结构：

```
<Suspense>
└─ <Dashboard>
   ├─ <Profile>
   │  └─ <FriendStatus>（组件有异步的 setup()）
   └─ <Content>
      ├─ <ActivityFeed> （异步组件）
      └─ <Stats>（异步组件）
```

在这个组件树中有多个嵌套组件，要渲染出它们，首先得解析一些异步资源。如果没有 `<Suspense>`，则它们每个都需要处理自己的加载、报错和完成状态。在最坏的情况下，我们可能会在页面上看到三个旋转的加载态，在不同的时间显示出内容。

有了 `<Suspense>` 组件后，我们就可以在等待整个多层级组件树中的各个异步依赖获取结果时，在顶层展示出加载中或加载失败的状态。

`<Suspense>` 可以等待的异步依赖有两种：

1. 带有异步 `setup()` 钩子的组件。这也包含了使用 `<script setup>` 时有顶层 `await` 表达式的组件。
2. [异步组件](https://staging-cn.vuejs.org/guide/components/async.html)。

`async setup()`[#](https://staging-cn.vuejs.org/guide/built-ins/suspense.html#async-setup)

组合式 API 中组件的 `setup()` 钩子可以是异步的：

```js
export default {
  async setup() {
    const res = await fetch(...)
    const posts = await res.json()
    return {
      posts
    }
  }
}
```

如果使用 `<script setup>`，那么顶层 `await` 表达式会自动让该组件成为一个异步依赖：

```js
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

> **注意**
>
> 异步组件默认就是 **“suspensible”** 的。这意味着如果组件关系链上有一个 `<Suspense>`，那么这个异步组件就会被当作这个 `<Suspense>` 的一个异步依赖。在这种情况下，加载状态是由 `<Suspense>` 控制，而该组件自己的加载、报错、延时和超时等选项都将被忽略。
>
> 异步组件也可以通过在选项中指定 `suspensible: false` 表明不用 `Suspense` 控制，并让组件始终自己控制其加载状态。

#### 1.4.2 加载中状态

`<Suspense>` 组件有两个插槽：`#default` 和 `#fallback`。两个插槽都只允许**一个**直接子节点。在可能的时候都将显示默认槽中的节点。否则将显示后备槽中的节点。

```vue
<Suspense>
  <!-- 具有深层异步依赖的组件 -->
  <Dashboard />

  <!-- 在 #fallback 插槽中显示 “正在加载中” -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

在初始渲染时，`<Suspense>` 将在内存中渲染其默认的插槽内容。如果在这个过程中遇到任何异步依赖，则会进入**挂起**状态。在挂起状态期间，展示的是后备内容。当所有遇到的异步依赖都完成后，`<Suspense>` 会进入**完成**状态，并将展示出默认插槽的内容。

如果在初次渲染时没有遇到异步依赖，`<Suspense>` 会直接进入完成状态。

进入完成状态后，只有当默认插槽的根节点被替换时，`<Suspense>` 才会回到挂起状态。组件树中新的更深层次的异步依赖**不会**造成 `<Suspense>` 回退到挂起状态。

发生回退时，后备内容不会立即展示出来。相反，`<Suspense>` 在等待新内容和异步依赖完成时，会展示之前 `#default` 插槽的内容。这个行为可以通过一个 `timeout` prop 进行配置：在等待渲染新内容耗时超过 `timeout` 之后，`<Suspense>` 将会切换为展示后备内容。若 `timeout` 值为 `0` 将导致在替换默认内容时立即显示后备内容。

#### 1.4.3 解决上面遗留的问题

父组件`App.vue`

```vue
<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Suspense>
      <template #default>
        <Child></Child>
      </template>
      <template #fallback>
        <h3>稍等，加载中...</h3>
      </template>
    </Suspense>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<script setup>
// import Child from './components/Child.vue';
import { defineAsyncComponent } from 'vue';
const Child = defineAsyncComponent(() => import('./components/Child.vue'));
</script>
```

子组件`Child.vue`

```vue
<template>
  <div class="child">
    <h3>我是Child组件</h3>
    {{ sum }}
  </div>
</template>

<script>
export default {
  name: 'Child',
};
</script>

<script setup>
let sum = $ref(
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 4000);
  })
);
</script>
```

**加载时**

![image-20220809180418781](https://i0.hdslb.com/bfs/album/081847b37f38a3c17aa89b300364961df05bad7c.png)

**加载完成**

![image-20220809180430412](https://i0.hdslb.com/bfs/album/94478819d69f20e253caa6437c11d377ac669ad0.png)

## 2.组合式函数(hooks)

### 2.1 什么是“组合式函数”？

在 Vue 应用的概念中，“组合式函数” (Composables) 是一个利用 Vue 组合式 API 来封装和复用**有状态逻辑**的函数。

当构建前端应用时，我们常常需要复用公共任务的逻辑。例如为了在不同地方格式化时间，我们可能会抽取一个可复用的日期格式化函数。这个函数封装了**无状态的逻辑**：它在接收一些输入后立刻返回所期望的输出。复用无状态逻辑的库有很多，比如你可能已经用过的 [lodash](https://lodash.com/) 或是 [date-fns](https://date-fns.org/)。

相比之下，有状态逻辑负责管理会随时间而变化的状态。一个简单的例子是跟踪当前鼠标在页面中的位置。在实际应用中，也可能是像触摸手势或与数据库的连接状态这样的更复杂的逻辑。

### 2.2 鼠标跟踪器示例

如果我们要直接在组件中使用组合式 API 实现鼠标跟踪功能，它会是这样的：

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

![image-20220809190244670](https://i0.hdslb.com/bfs/album/39f70b7b2e52cb51ceb6f53716458658214e2521.png)

但是，如果我们想在多个组件中复用这个相同的逻辑呢？我们可以把这个逻辑以一个组合式函数的形式提取到外部文件中：

`hooks/mouse.js`

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // 通过返回值暴露所管理的状态
  return { x, y }
}
```

下面是它在组件中使用的方式：

```vue
<script setup>
import { useMouse } from '@/hooks/mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

[在演练场中尝试一下](https://sfc.vuejs.org/#eNqNkk1vgzAMhv+KxQUm0bBz1VbaYbftOGmTuDAwHVVxoiRQKsR/nw2Udh+adoHYcZ74fZ0+eDBGtQ0G62DjclsZDw59Y3YpVbXR1kMPjcNnzR8YoLS6hlAltcTq4MKUUso1OanrYjhzzXY5EN2ltEkmLAM58FibY+aRI4AJarSrfKUJKgeZX0PPIBiGWBaMGwSxHAviYGprVWeG79fEjfcCS+cNlwbMkIzkWJnEafDhvXHrJHFlLnIPTmm7T3ilbEO+qlGhq1fvVp8cWganQXzDSDjZol1ZpAIt2r+Y30p/cAXLogaWcnGRNSxmWyxj0MTekMdCli/EdRIs/vNlo/HYjYfKhvLRwavvkwPTYDqeCFOje57GJXe+yUn2ijAF+xxhi+RnCkCn2uzYIJ8Z88pke3ydts6/bL3NEuW3KIm4qe0OThUV+qSyoniU+qfKeSS0UTh6UesWw3hu4m7s90b/V4Qdq/9FEY7lV21peaUygOETZrwKDw==)

如你所见，核心逻辑完全没变，我们做的只是把它移到一个外部函数中去，并返回需要暴露的状态。和在组件中一样，你也可以在组合式函数中使用所有的[组合式 API](https://staging-cn.vuejs.org/api/#composition-api)。现在，`useMouse()` 的功能可以在任何组件中轻易复用了。

更酷的是，你还可以嵌套多个组合式函数：一个组合式函数可以调用一个或多个其他的组合式函数。这使得我们可以像使用多个组件组合成整个应用一样，用多个较小且逻辑独立的单元来组合形成复杂的逻辑。实际上，这正是为什么我们决定将实现了这一设计模式的 API 集合命名为组合式 API。

举例来说，我们可以将添加和清除 DOM 事件监听器的逻辑也封装进一个组合式函数中：

```js
// hooks/event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // 如果你想的话，
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

有了它，之前的 `useMouse()` 可以被简化为：

```js
// hooks/mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', event => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

> **提示**
>
> 每一个调用 `useMouse()` 的组件实例会创建其独有的 `x`、`y` 状态拷贝，因此他们不会互相影响。如果你想要在组件之间共享状态，请阅读[状态管理](https://staging-cn.vuejs.org/guide/scaling-up/state-management.html)这一章。

### 2.3 异步状态示例

以后用到再补充

### 2.4 约定和最佳实践

#### 2.4.1 命名[#](https://staging-cn.vuejs.org/guide/reusability/composables.html#naming)

组合式函数约定用驼峰命名法命名，并以“use”作为开头。

#### 2.4.2 输入参数[#](https://staging-cn.vuejs.org/guide/reusability/composables.html#input-arguments)

尽管其响应性不依赖 ref，组合式函数仍可接收 ref 参数。如果编写的组合式函数会被其他开发者使用，你最好在处理输入参数时兼容 ref 而不只是原始的值。[`unref()`](https://staging-cn.vuejs.org/api/reactivity-utilities.html#unref) 工具函数会对此非常有帮助：

```js
import { unref } from 'vue'

function useFeature(maybeRef) {
  // 若 maybeRef 确实是一个 ref，它的 .value 会被返回
  // 否则，maybeRef 会被原样返回
  const value = unref(maybeRef)
}
```

如果你的组合式函数在接收 ref 为参数时会产生响应式 effect，请确保使用 `watch()` 显式地监听此 ref，或者在 `watchEffect()` 中调用 `unref()` 来进行正确的追踪。

#### 2.4.3 返回值[#](https://staging-cn.vuejs.org/guide/reusability/composables.html#return-values)

你可能已经注意到了，我们一直在组合式函数中使用 `ref()` 而不是 `reactive()`。我们推荐的约定是组合式函数始终返回一个包含多个 ref 的普通的非响应式对象，这样该对象在组件中被解构为 ref 之后仍可以保持响应性：

```js
// x 和 y 是两个 ref
const { x, y } = useMouse()
```

从组合式函数返回一个响应式对象会导致在对象解构过程中丢失与组合式函数内状态的响应性连接。与之相反，ref 则可以维持这一响应性连接。

如果你更希望以对象属性的形式来使用组合式函数中返回的状态，你可以将返回的对象用 `reactive()` 包装一次，这样其中的 ref 会被自动解包，例如：

```js
const mouse = reactive(useMouse())
// mouse.x 链接到了原来的 x ref
console.log(mouse.x)
Mouse position is at: {{ mouse.x }}, {{ mouse.y }}
```

#### 2.4.4 副作用[#](https://staging-cn.vuejs.org/guide/reusability/composables.html#side-effects)

在组合式函数中的确可以执行副作用 (例如：添加 DOM 事件监听器或者请求数据)，但请注意以下规则：

- 如果你的应用用到了[服务端渲染](https://staging-cn.vuejs.org/guide/scaling-up/ssr.html) (SSR)，请确保在组件挂载后才调用的生命周期钩子中执行 DOM 相关的副作用，例如：`onMounted()`。这些钩子仅会在浏览器中被调用，因此可以确保能访问到 DOM。
- 确保在 `onUnmounted()` 时清理副作用。举例来说，如果一个组合式函数设置了一个事件监听器，它就应该在 `onUnmounted()` 中被移除 (就像我们在 `useMouse()` 示例中看到的一样)。当然也可以像之前的 `useEventListener()` 示例那样，使用一个组合式函数来自动帮你做这些事。

#### 2.4.5 使用限制[#](https://staging-cn.vuejs.org/guide/reusability/composables.html#usage-restrictions)

组合式函数在 `<script setup>` 或 `setup()` 钩子中，应始终被**同步地**调用。在某些场景下，你也可以在像 `onMounted()` 这样的生命周期钩子中使用他们。

这个限制是为了让 Vue 能够确定当前正在被执行的到底是哪个组件实例，只有能确认当前组件实例，才能够：

1. 将生命周期钩子注册到该组件实例上
2. 将计算属性和监听器注册到该组件实例上，以便在该组件被卸载时停止监听，避免内存泄漏。

> **提示**
>
> `<script setup>`是唯一在调用 await 之后仍可调用组合式函数的地方。编译器会在异步操作之后自动为你恢复当前的组件实例。

### 2.5 通过抽取组合式函数改善代码结构[#](https://staging-cn.vuejs.org/guide/reusability/composables.html#extracting-composables-for-code-organization)

抽取组合式函数不仅是为了复用，也是为了代码组织。随着组件复杂度的增高，你可能会最终发现组件多得难以查询和理解。组合式 API 会给予你足够的灵活性，让你可以基于逻辑问题将组件代码拆分成更小的函数：

```js
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

在某种程度上，你可以将这些提取出的组合式函数看作是可以相互通信的组件范围内的服务。

