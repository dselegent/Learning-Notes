# 09 【Attributes继承 provide与inject】

## 1.继承 Attributes

### 1.1 Attributes 继承

#### 1.1.1 Attributes 继承的基本概念

“透传 attribute”指的是传递给一个组件，却没有被该组件声明为 [props](https://staging-cn.vuejs.org/guide/components/props.html) 或 [emits](https://staging-cn.vuejs.org/guide/components/events.html#defining-custom-events) 的 attribute 或者 `v-on` 事件监听器。最常见的例子就是 `class`、`style` 和 `id`。

当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上。举例来说，假如我们有一个 `<MyButton>` 的子组件，它的模板长这样：

```vue
<!-- <MyButton> 的模板 -->
<button>click me</button>
```

一个**父组件**使用了这个组件，并且传入了 `class`：

```vue
<MyButton class="large" />
```

最后渲染出的 DOM 结果是：

```html
<button class="large">click me</button>
```

这里，`<MyButton>` 并没有将 `class` 声明为一个它所接受的 prop，所以 `class` 被视作`透传 attribute`，自动透传到了 `<MyButton>` 的根元素上。

#### 1.1.2 对 `class` 和 `style` 的合并

如果一个子组件的根元素已经有了 `class` 或 `style` attribute，它会和从父组件上继承的值合并。如果我们将之前的 `<MyButton>` 组件的模板改成这样：

```html
<!-- <MyButton> 的模板 -->
<button class="btn">click me</button>
```

**父组件**

```vue
<MyButton class="large" />
```

则最后渲染出的 DOM 结果会变成：

```html
<button class="btn large">click me</button>
```

#### 1.1.3 `v-on` 监听器继承

同样的规则也适用于 `v-on` 事件监听器：

```vue
<MyButton @click="onClick" />
```

`click` 监听器会被添加到 `<MyButton>` 的根元素，即那个原生的 `<button>` 元素之上。当原生的 `<button>` 被点击，会触发父组件的 `onClick` 方法。同样的，如果原生 `button` 元素自身也通过 `v-on` 绑定了一个事件监听器，则这个监听器和从父组件继承的监听器都会被触发。

#### 1.1.4 深层组件继承

有些情况下一个组件会在根节点上渲染另一个组件。例如，我们重构一下 `<MyButton>`，让它在根节点上渲染 `<BaseButton>`：

`MyButton.vue`

```vue
<template>
	<!-- <MyButton/> 的模板，只是渲染另一个组件 -->
	<BaseButton />
</template>
```

此时 `<MyButton>` 接收的透传 attribute 会直接继续传给 `<BaseButton>`。

请注意：

1. 透传的 attribute 不会包含 `<MyButton>` 上声明过的 props 或是针对 `emits` 声明事件的 `v-on` 侦听函数，换句话说，声明过的 props 和侦听函数被 `<MyButton>`“消费”了。
2. 透传的 attribute 若符合声明，也可以作为 props 传入 `<BaseButton>`。

### 1.2 禁用 Attributes 继承

如果你**不想要**一个组件自动地继承 attribute，你可以在组件选项中设置 `inheritAttrs: false`。

如果你使用了 `<script setup>`，你需要一个额外的 `<script>` 块来书写这个选项声明：

```vue
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup 部分逻辑
</script>
```

最常见的需要禁用 attribute 继承的场景就是 attribute 需要应用在根节点以外的其他元素上。通过设置 `inheritAttrs` 选项为 `false`，你可以完全控制透传进来的 attribute 被如何使用。

这些透传进来的 attribute 可以在模板的表达式中直接用 `$attrs` 访问到。

```js
<span>Fallthrough attribute: {{ $attrs }}</span>
```

这个 `$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 attribute，例如 `class`，`style`，`v-on` 监听器等等。

有几点需要注意：

- 和 props 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 `foo-bar` 这样的一个 attribute 需要通过 `$attrs['foo-bar']` 来访问。
- 像 `@click` 这样的一个 `v-on` 事件监听器将在此对象下被暴露为一个函数 `$attrs.onClick`。

现在我们要再次使用一下[之前小节](https://staging-cn.vuejs.org/guide/components/attrs.html#attribute-inheritance)中的 `<MyButton>` 组件例子。有时候我们可能为了样式，需要在 `<button>` 元素外包装一层 `<div>`：

```vue
<div class="btn-wrapper">
  <button class="btn">click me</button>
</div>
```

我们想要所有像 `class` 和 `v-on` 监听器这样的透传 attribute 都应用在内部的 `<button>` 上而不是外层的 `<div>` 上。我们可以通过设定 `inheritAttrs: false` 和使用 `v-bind="$attrs"` 来实现：

```vue
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

小提示：[没有参数的 `v-bind`](https://staging-cn.vuejs.org/guide/essentials/template-syntax.html#dynamically-binding-multiple-attributes) 会将一个对象的所有属性都作为 attribute 应用到目标元素上。

**完整版**

`App.vue`

```vue
<script setup>
import { ref } from 'vue'
import MyButton from './MyButton.vue'
const msg = ref('Hello World!')
</script>

<template>
  <MyButton class="btn"></MyButton>
</template>
<style>
  .btn{
    background-color:red;
  }
</style>
```

`MyButton.vue`

```vue
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup 部分逻辑
</script>

<template>
<!--<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
-->
  <div class="btn-wrapper">
  		<button :class="$attrs['class']">click me</button>
		</div>
</template>
```

![image-20220808231521594](https://i0.hdslb.com/bfs/album/733219e50d6f149ddec431eca8b24c48f359e36c.png)

### 1.3 多根节点的 Attributes 继承

和单根节点组件有所不同，有着多个根节点的组件没有自动 attribute 透传行为。如果 `$attrs` 没有被显式绑定，将会抛出一个运行时警告。

```vue
<MyButton id="custom-layout" @click="changeValue" />
```

如果 `<MyButton>` 有下面这样的多根节点模板，由于 Vue 不知道要将 attribute 透传到哪里，所以会抛出一个警告。

```vue
  <div class="btn-wrapper">
  		<button >click me</button>
   </div>
  <div class="btn-wrapper">
  		<button >click me</button>
   </div>
  <div class="btn-wrapper">
  		<button >click me</button>
   </div>
```

![image-20220808232142732](https://i0.hdslb.com/bfs/album/abedff9e473e94ee838ea51b25935ab6dae0aa9c.png)

如果 `$attrs` 被显式绑定，则不会有警告：

```vue
  <div class="btn-wrapper">
  		<button >click me</button>
   </div>
  <div class="btn-wrapper">
  		<button v-bind="$attrs">click me</button>
   </div>
  <div class="btn-wrapper">
  		<button >click me</button>
   </div>
```

![image-20220808232242645](https://i0.hdslb.com/bfs/album/868f6a56087bf52386b73dfcd668a5df7618a9df.png)

### 1.4 在 js 中访问透传 Attributes

如果需要，你可以在 `<script setup>` 中使用 `useAttrs()` API 来访问一个组件的所有透传 attribute：

```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
alert(JSON.stringify(attrs))
</script>
```

![image-20220808232504160](https://i0.hdslb.com/bfs/album/53d05b7bd3075f45a3318281b6a390d9f88418e9.png)

如果没有使用 `<script setup>`，`attrs` 会作为 `setup()` 上下文对象的一个属性暴露：

```js
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
```

需要注意的是，虽然这里的 `attrs` 对象总是反映为最新的透传 attribute，但它并不是响应式的 (考虑到性能因素)。你不能通过侦听器去监听它的变化。如果你需要响应性，可以使用 prop。或者你也可以使用 `onUpdated()` 使得在每次更新时结合最新的 `attrs` 执行副作用。

## 2.提供注入（provide 与 inject）

### 2.1 Prop 逐级透传问题

通常情况下，当我们需要从父组件向子组件传递数据时，会使用 [props](https://staging-cn.vuejs.org/guide/components/props.html)。想象一下这样的结构：有一些多层级嵌套的组件，形成了一颗巨大的组件树，而某个深层的子组件需要一个较远的祖先组件中的部分数据。在这种情况下，如果仅使用 props 则必须将其沿着组件链逐级传递下去，这会非常麻烦：

![image-20220808140700781](https://i0.hdslb.com/bfs/album/5174ce7ec770df63fd92eb3560c924883ac4b949.png)

注意，虽然这里的 `<Footer>` 组件可能根本不关心这些 props，但为了使 `<DeepChild>` 能访问到它们，仍然需要定义并向下传递。如果组件链路非常长，可能会影响到更多这条路上的组件。这一问题被称为“prop 逐级透传”，显然是我们希望尽量避免的情况。

`provide` 和 `inject` 可以帮助我们解决这一问题。 [[1\]](https://staging-cn.vuejs.org/guide/components/provide-inject.html#footnote-1) 一个父组件相对于其所有的后代组件，会作为**依赖提供者**。任何后代的组件树，无论层级有多深，都可以**注入**由父组件提供给整条链路的依赖。

![image-20220808140729471](https://i0.hdslb.com/bfs/album/320789c4ef9b80c19e5d7dfc3f86d768fc7c550a.png)

- 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信
- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

### 2.2 Provide (提供)

要为组件后代提供数据，需要使用到 [`provide()`](https://staging-cn.vuejs.org/api/composition-api-dependency-injection.html#provide) 函数：

- **详细信息**

  `provide()` 接受两个参数：第一个参数是要注入的 key，可以是一个字符串或者一个 symbol，第二个参数是要注入的值。

  当使用 TypeScript 时，key 可以是一个被类型断言为 `InjectionKey` 的 symbol。`InjectionKey` 是一个 Vue 提供的工具类型，继承自 `Symbol`，可以用来同步 `provide()` 和 `inject()` 之间值的类型。

  与注册生命周期钩子的 API 类似，`provide()` 必须在组件的 `setup()` 阶段同步调用。

- 应用API的 provide
  - 作用范围：实例内的所有组件
- 组件上下级关系的 provide
  - 父级组件声明的 provide，所有子孙组件皆可拿到；
  - 声明 provide 的组件该同级和父级无法 inject 获取到
- 关联链上 provide 声明的同名内容
- 采取就近原则，最近一级父级有就引用最近一级的，没有就接着往上找，直到根实例的 provide 声明 

```js
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
```

如果不使用 `<script setup>`，请确保 `provide()` 是在 `setup()` 同步调用的：

```js
import { provide } from 'vue'

export default {
  setup() {
    provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
  }
}
```

`provide()` 函数接收两个参数。第一个参数被称为**注入名**，可以是一个字符串或是一个 `Symbol`。后代组件会用注入名来查找期望注入的值。一个组件可以多次调用 `provide()`，使用不同的注入名，注入不同的依赖值。

第二个参数是提供的值，值可以是任意类型，包括响应式的状态，比如一个 ref：

```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

提供的响应式状态使后代组件可以由此和提供者建立响应式的联系。

### 2.3 应用层使用Provide

除了在一个组件中提供依赖，我们还可以在整个应用层面提供依赖：

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```

在应用级别提供的数据在该应用内的所有组件中都可以注入。这在你编写[插件](https://staging-cn.vuejs.org/guide/reusability/plugins.html)时会特别有用，因为插件一般都不会使用组件形式来提供值。

### 2.4 Inject (注入)

要注入上层组件提供的数据，需使用 [`inject()`](https://staging-cn.vuejs.org/api/composition-api-dependency-injection.html#inject) 函数：

- **详细信息**

  第一个参数是注入的 key。Vue 会遍历父组件链，通过匹配 key 来确定所提供的值。如果父组件链上多个组件对同一个 key 提供了值，那么离得更近的组件将会“覆盖”链上更远的组件所提供的值。如果没有能通过 key 匹配到值，`inject()` 将返回 `undefined`，除非提供了一个默认值。

  第二个参数是可选的，即在没有匹配到 key 时使用的默认值。它也可以是一个工厂函数，用来返回某些创建起来比较复杂的值。如果默认值本身就是一个函数，那么你必须将 `false` 作为第三个参数传入，表明这个函数就是默认值，而不是一个工厂函数。

  与注册生命周期钩子的 API 类似，`inject()` 必须在组件的 `setup()` 阶段同步调用。

  当使用 TypeScript 时，key 可以是一个类型为 `InjectionKey` 的 symbol。`InjectionKey` 是一个 Vue 提供的工具类型，继承自 `Symbol`，可以用来同步 `provide()` 和 `inject()` 之间值的类型。

```js
<script setup>
import { inject } from 'vue'

const message = inject('message')
alert(message.value);
</script>
```

如果提供的值是一个 ref，注入进来的会是该 ref 对象，而**不会**自动解包为其内部的值。这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接。

[带有响应性的 provide + inject 完整示例](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgcHJvdmlkZSB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBDaGlsZCBmcm9tICcuL0NoaWxkLnZ1ZSdcblxuLy8gYnkgcHJvdmlkaW5nIGEgcmVmLCB0aGUgR3JhbmRDaGlsZFxuLy8gY2FuIHJlYWN0IHRvIGNoYW5nZXMgaGFwcGVuaW5nIGhlcmUuXG5jb25zdCBtZXNzYWdlID0gcmVmKCdoZWxsbycpXG5wcm92aWRlKCdtZXNzYWdlJywgbWVzc2FnZSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxpbnB1dCB2LW1vZGVsPVwibWVzc2FnZVwiPlxuICA8Q2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkNoaWxkLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgR3JhbmRDaGlsZCBmcm9tICcuL0dyYW5kQ2hpbGQudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEdyYW5kQ2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiR3JhbmRDaGlsZC52dWUiOiI8c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5jb25zdCBtZXNzYWdlID0gaW5qZWN0KCdtZXNzYWdlJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPlxuICAgIE1lc3NhZ2UgdG8gZ3JhbmQgY2hpbGQ6IHt7IG1lc3NhZ2UgfX1cbiAgPC9wPlxuPC90ZW1wbGF0ZT4ifQ==)

同样的，如果没有使用 `<script setup>`，`inject()` 需要在 `setup()` 内同步调用：

```js
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
```

### 2.5 注入默认值[#](https://staging-cn.vuejs.org/guide/components/provide-inject.html#injection-default-values)

默认情况下，`inject` 假设传入的注入名会被某个祖先链上的组件提供。如果该注入名的确没有任何组件提供，则会抛出一个运行时警告。

如果在注入一个值时不要求必须有提供者，那么我们应该声明一个默认值，和 props 类似：

```js
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')
```

在一些场景中，默认值可能需要通过调用一个函数或初始化一个类来取得。为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建默认值：

```js
// 注入一个值，若为空则使用提供的工厂函数
const baz = inject('foo', () => new Map())
```

如果默认值本身就是一个函数，那么你必须将 `false` 作为第三个参数传入，表明这个函数就是默认值，而不是一个工厂函数。

```js
<script setup>
import { inject } from 'vue'

// 注入时为了表明提供的默认值是个函数，需要传入第三个参数
const fn = inject('function', () => {}, false)
</script>
```

### 2.6 和响应式数据配合使用

当提供 / 注入响应式的数据时，**建议尽可能将任何对响应式状态的变更都保持在供给方组件中**。这样可以确保所提供状态的声明和变更操作都内聚在同一个组件内，使其更容易维护。

有的时候，我们可能需要在注入方组件中更改数据。在这种情况下，我们推荐在供给方组件内声明并提供一个更改数据的方法函数：

```js
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

<!-- start -->
function updateLocation() {
  location.value = 'South Pole'
}
<!-- end -->

provide('location', {
  location,
  updateLocation
})
</script>
```

```js
<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'
    
<!-- start -->
const { location, updateLocation } = inject('location')
<!-- end -->
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

最后，如果你想确保提供的数据不能被注入方的组件更改，你可以使用[`readonly()`](https://staging-cn.vuejs.org/api/reactivity-core.html#readonly) 来包装提供的值。

```js
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

### 2.7 综合使用

父组件：

```javascript
<script lang='ts' setup>
import { provide,ref,rective } from 'vue'

let year = ref(2020)
let book = rective({title:'命运石之门'})

provide('year',year)
provide('yearValue',year.value) 
// 子组件inject('yearValue') ，获取到的是静态的，子组件不会获取到最新数据

provide('book',book)
provide('changeFn',changeFn) // 有时候可能需要在子组件修改响应式的数据，此时provide一个方法给子组件调用

setTimeout(()=>{
  year.value = 2022
},1000*2)
function changeFn (){
  book.title = '弧光计划'
  year.value = 2036
}
</script>
```

子组件：

```javascript
<template>
  <div>{{year}}</div>
  <div>{{yearValue}}</div>
  <div>{{book.title}}</div>
  <button @click='changeFn'>命运探知</button>
</template>
<script lang='ts' setup>
import { inject } from 'vue'
// 讲解1
interface Book {
  title: string
}
let year = inject('year')
let yearValue = inject('yearValue') // 如上所述，一直都是不变的数据
let book = inject<Book>('book')
let changeFn:()=>void = inject('changeFn')
 
 
// 讲解2
// 即使在子组件可以直接修改，但最好不要这么做，将会影响到provide的父组件以及其他所有inject的子组件。
// 这会导致 溯源 非常麻烦，所以修改方式统一为在父组件provide一个方法，子组件调用进行修改！
// book.title = '不要这么做'
 
 
// 讲解3
// 无默认值的injcet :当任意父级没有声明时，则为 undefined
let static = inject('static') // undefined
 
// 有默认值的injcet :当任意父级没有声明时，则使用默认值
let static2 = inject('static2','????') // ????
 
// 默认值是函数的injcet :当任意父级没有声明时，则使用函数return的值
let defaultFn = inject('ab12',()=>'雏见泽'+'棉流',true) // 固定为 true
console.log(defaultFn) // '雏见泽棉流'
 
</script>
```
