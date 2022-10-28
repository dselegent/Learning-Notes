# 02 【setup reactive ref】

## 1.拉开序幕的setup

### 1.1 为什么使用 setup ？

- 大型组件中选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块。 如果能够将同一个逻辑关注点相关代码收集在一起会更好。而这正是组合式 API 使我们能够做到的。

- 通过创建 Vue 组件，我们可以将界面中重复的部分连同其功能一起提取为可重用的代码段。然而，光靠这一点可能并不够，尤其是当你的应用变得非常大的时候，共享和重用代码变得尤为重要。

- 为了开始使用 组合式 API，我们首先需要一个可以实际使用它的地方。在 Vue 组件中，我们将此位置称为 setup。

> **简单举例：**
> 角色权限页面功能：新增/删除角色、获取角色列表、获取角色对应的权限信息、编辑角色权限信息。
>
> - 通常以前会将这些功能写在一个sfc组件（.vue），当需要修改其中1处功能逻辑时，我们就需要跳转对应的各个options api选项进行操作。当有些业务组件复杂时，代码量上去了，浏览起来会更吃力。
> - 而有了setup、composition api后，我们可以将这例子中的4个功能逻辑拆分到对应的.js文件文件，使用composition api编写业务代码，然后引入到sfc组件的setup里使用。此时我们修改其中1处功能逻辑，只需要去对应的.js文件进行修改即可，而不必被其他的功能逻辑代码干扰。

> **错误用法：**
>
> **有些人写setup，以为是将vue2的写法，挪到setup内声明、return出去，导致setup内代码特别长，并且比options api写法更难以阅读！（当然代码量少的情况下，不影响阅读 也可不拆分）**

### 1.2 基本使用



1. 理解：Vue1.0中一个新的配置项，值为一个函数。
2. setup 函数是一个新的组件选项。它是组件内部使用组合式 API 的入口点。
3. 组件中所用到的：数据、方法等等，均要配置在setup中。
4. 调用时间：在创建组件实例时，在初始 prop 解析之后立即调用 setup。在生命周期方面，它是在 beforeCreate 钩子之前调用的。
5. setup函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
   2. <span style="color:#aad">若返回一个渲染函数：则可以自定义渲染内容。（了解）</span>
6. 注意点：
   1. 尽量不要与Vue2.x配置混用
      - Vue2.x配置（data、methos、computed...）中<strong style="color:#DD5145">可以访问到</strong>setup中的属性、方法。
      - 但在setup中<strong style="color:#DD5145">不能访问到</strong>Vue2.x配置（data、methos、computed...）。
      - 如果有重名, setup优先。
   2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

> `setup()` 钩子是在组件中使用组合式 API 的入口，通常只在以下情况下使用：
>
> 1. 需要在非单文件组件中使用组合式 API 时。
> 2. 需要在基于选项式 API 的组件中集成基于组合式 API 的代码时。
>
> **其他情况下，都应优先使用 [`script setup`](https://staging-cn.vuejs.org/api/sfc-script-setup.html) 语法。**

```vue
<template>
	<h1>一个人的信息</h1>
	<h2>姓名：{{name}}</h2>
	<h2>年龄：{{age}}</h2>
	<h2>性别：{{sex}}</h2>
	<h2>a的值是：{{a}}</h2>
	<button @click="sayHello">说话(Vue3所配置的——sayHello)</button>
	<br>
	<br>
	<button @click="sayWelcome">说话(Vue2所配置的——sayWelcome)</button>
	<br>
	<br>
	<button @click="test1">测试一下在Vue2的配置中去读取Vue3中的数据、方法</button>
	<br>
	<br>
	<button @click="test2">测试一下在Vue3的setup配置中去读取Vue2中的数据、方法</button>

</template>

<script>
	// import {h} from 'vue'
	export default {
		name: 'App',
		data() {
			return {
				sex:'男',
				a:100
			}
		},
		methods: {
			sayWelcome(){
				alert('欢迎来到尚硅谷学习')
			},
			test1(){
				console.log(this.sex)
				console.log(this.name)
				console.log(this.age)
				console.log(this.sayHello)
			}
		},
		//此处只是测试一下setup，暂时不考虑响应式的问题。
		 setup(props, { attrs, slots, emit, expose }){
		// console.log({ attrs, slots, emit, expose });
    	// attrs、slots 和 emit 分别等同于 $attrs、$slots、$emit 实例 property。
    	// expose 等同于 options api 的expose
			
             //数据
			let name = '张三'
			let age = 18
			let a = 200

			//方法
			function sayHello(){
				alert(`我叫${name}，我${age}岁了，你好啊！`)
			}
			function test2(){
				console.log(name)
				console.log(age)
				console.log(sayHello)
				console.log(this.sex)
				console.log(this.sayWelcome)
			}

			//返回一个对象（常用）
			return {
				name,
				age,
				sayHello,
				test2,
				a
			}

			//返回一个函数（渲染函数）
			// return ()=> h('h1','尚硅谷')
		}
	}
</script>

```

> **注意事项：**
>
> - setup 内的 this 是不指向组件实例的！ this > undefined
>
> - props 对象是响应式的——即在传入新的 props 时会对其进行更新，通过使用 watchEffect 或 watch 进行观测和响应；
>
> - 但是，请不要解构 props 对象，因为它会失去响应式；

### 1.3`<script setup>` 语法糖

- `<script setup>`是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。相比于普通的 `<script>` 语法，它具有更多优势：
  - 更少的样板内容，更简洁的代码。
  - 能够使用纯 Typescript 声明 props 和抛出事件。
  - 更好的运行时性能 (其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理)。
  - 更好的 IDE 类型推断性能 (减少语言服务器从代码中抽离类型的工作)。
- 功能：
  - 顶层的绑定会被暴露给模板 （在 template 模板中直接使用）
  - 递归组件：由于没有 options api 的 name ，如果需要使用递归组件，则使用文件名。或者再写个普通script 标签，照旧 name:"xx"。
    - 如果有2个script标签，设置为Ts的时候，2个都必须加上lang='ts'
  - 动态组件
  - `<script setup>`: 使用 `<script setup>` 的组件是默认关闭的，也即通过模板 ref 或者 $parent 链获取到的组件的公开实例，不会暴露任何在` <script setup> `中声明的绑定。
    - 需要使用 defineExpose() 声明需要暴露的内容。
  - 模板引用 ref  （这个ref不是ref()响应性函数的ref）
    - 变量名为模板 ref 值
  - 组件通信的部分选项API 如 props emits expose ，在 setup 中由 编译器宏 (setup语法糖的内置方法) 提供。

## 2.reactive函数

- 作用: 定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据（基本类型不要用它，要用```ref```函数）
- 语法：```const 代理对象= reactive(源对象)```接收一个对象（或数组），返回一个<strong style="color:#DD5145">代理对象（Proxy的实例对象，简称proxy对象）</strong>
- reactive定义的响应式数据是“深层次的”。若要避免深层响应式转换，只想保留对这个对象顶层次访问的响应性，请使用 [shallowReactive()](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 作替代。
- 只能传入引用类型，否则抛出警告。 ***reactive 将解包所有深层的 refs，同时维持 ref 的响应性。******正确的讲应该是：当它通过代理访问时，会被自动解包：***
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

```vue
<script lang='ts' setup>
import { ref,reactive } from 'vue';
let rea1 = reactive({ count: 0 }) // Proxy
 
let refData = ref('1') // RedfImpl 构造函数的对象
 
//! ***reactive 将解包所有深层的 refs，同时维持 ref 的响应性。***  
//! ***正确的讲应该是：当它通过代理访问时，会被自动解包：***  
let rea2 = reactive<any>({refData})
 
//! 当将 ref 分配给 reactive property 时，效果同上
rea2.re2_1 = refData // console.log(rea2.re2_1)  > 打印 '1'
 
// 因为访问 reactive 内的 ref 会自动解包，所以不需要 .value
rea2.re2_1 = '测试'
 
// 任何类型的新属性都是 proxy 类型
rea2.newObj = {data1:'同样是响应式的'}
</script>
```

```js
    let person = reactive({
      name: 'dselegent',
      age: 21,
    });
    console.log(person);
```

![image-20220704224406322](https://img-blog.csdnimg.cn/img_convert/2f9f2f715d352a0c449201c640958c10.png)

> 通过reactive创建的其实就是ref创建的value属性内容

> 注意：比如reactive中的数据是个对象，我们正常情况只能把整个对象导出去，如果只是想用某个属性，直接导出去的话不是响应式的，后面可以用toRef或者toRefs解决这种需求。

##  3.ref函数

### 3.1 基本使用

`reactive()` 的种种限制归根结底是因为 JavaScript 没有可以作用于所有值类型的 “引用” 机制。为此，Vue 提供了一个 [`ref()`](https://staging-cn.vuejs.org/api/reactivity-core.html#ref) 方法来允许我们创建可以使用任何值类型的响应式 **ref**

- 作用: 定义一个响应式的数据

- 语法: ```const xxx = ref(initValue)``` 
  - 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference对象，简称ref对象）</strong>。
  - JS中操作数据： ```xxx.value```
  - 模板中作为顶层属性被访问: 它们会被自动“解包”，所以不需要使用 `.value`，直接：```<div>{{xxx}}</div>```

- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的。
  - 对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了Vue1.0中的一个新函数—— ```reactive```函数。

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()` 将传入参数的值包装为一个带 `.value` 属性的 ref 对象：

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

TypeScript 用户请参阅：[为 ref 标注类型](https://staging-cn.vuejs.org/guide/typescript/composition-api.html#typing-ref) 

和响应式对象的属性类似，ref 的 `.value` 属性也是响应式的。

如果将一个对象赋值给 ref，那么这个对象将通过 [reactive()](https://staging-cn.vuejs.org/api/reactivity-core.html#reactive) 转为具有深层次响应式的对象。这也意味着如果对象中包含了嵌套的 ref，它们将被深层地解包。

>  若要避免这种深层次的转换，请使用 [`shallowRef()`](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowref) 来替代。

**初体验**

```vue
<template>
  <h2>name:{{ name }}</h2>
  <h3>{{ person.name }}</h3>
  <button @click="updateName">修改name值为ds2</button>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    let name = ref('ds');
    console.log(name);
      
    let person = ref({
      name: 'dselegent',
      age: 21,
    });
    console.log(person);
      
    function updateName() {
      name.value = 'ds2';
      person.value.name = 'ds3';
    }
    return {
      name,
      updateName,
      person,
    };
  },
};
</script>
```

> ref输出

```js
    let name = ref('ds');
    console.log(name);
```

![image-20220704224049809](https://i0.hdslb.com/bfs/album/b7cd7f8dba6acb7fd080a992668d1e9b5430aff8.png)

```js
    let person = ref({
      name: 'dselegent',
      age: 21,
    });
    console.log(person);
```

![image-20220704224110322](https://i0.hdslb.com/bfs/album/a2f588db0d130c522a91497b02db073c8875a5cd.png)

### 3.2 ref的响应式

一个包含对象类型值的 ref 可以响应式地替换整个对象：

```js
const objectRef = ref({ count: 0 })

// 这是响应式的替换
objectRef.value = { count: 1 }
```

ref 被传递给函数或是从一般对象上被解构时，不会丢失响应性：

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// 该函数接收一个 ref
// 需要通过 .value 取值
// 但它会保持响应性
callSomeFunction(obj.foo)

// 仍然是响应式的
const { foo, bar } = obj
```

简言之，`ref()` 让我们能创造一种对任意值的 “引用”，并能够在不丢失响应性的前提下传递这些引用。这个功能很重要，因为它经常用于将逻辑提取到 [组合函数](https://staging-cn.vuejs.org/guide/reusability/composables.html) 中。

### 3.3ref 在模板中的解包[#](https://staging-cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#ref-unwrapping-in-templates)

当 ref 在模板中作为顶层属性被访问时，它们会被自动“解包”，所以不需要使用 `.value`。下面是之前的计数器例子，用 `ref()` 代替：

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- 无需 .value -->
  </button>
</template>
```

[在演练场中尝试一下](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBjb3VudC52YWx1ZSsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

请注意，仅当 ref 是模板渲染上下文的顶层属性时才适用自动“解包”。 例如， foo 是顶层属性，但 object.foo 不是。

所以我们给出以下 object：

```js
const object = { foo: ref(1) }
```

下面的表达式将**不会**像预期的那样工作：

```vue
{{ object.foo + 1 }}
```

渲染的结果会是一个 `[object Object]`，因为 `object.foo` 是一个 ref 对象。我们可以通过将 `foo` 改成顶层属性来解决这个问题：

```vue
const { foo } = object
{{ foo + 1 }}
```

现在渲染结果将是 `2`。

需要注意的是，如果一个 ref 是文本插值（即一个 `{{ }}` 符号）计算的最终值，它也将被解包。因此下面的渲染结果将为 `1`：

```vue
{{ object.foo }}
```

这只是文本插值的一个方便功能，相当于 `{{ object.foo.value }}`。

### 3.4 ref的解包

#### 3.4.1 ref 在响应式对象中的解包

当一个 `ref` 被嵌套在一个响应式对象中，作为属性被访问或更改时，它会自动解包，因此会表现得和一般的属性一样：

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

如果将一个新的 ref 赋值给一个关联了已有 ref 的属性，那么它会替换掉旧的 ref：

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// 原始 ref 现在已经和 state.count 失去联系
console.log(count.value) // 1
```

只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包。当其作为[浅层响应式对象](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)的属性被访问时不会解包。

#### 3.4.2 数组和集合类型的 ref 解包[#](https://staging-cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#ref-unwrapping-in-arrays-and-collections)

跟响应式对象不同，当 ref 作为响应式数组或像 `Map` 这种原生集合类型的元素被访问时，不会进行解包。

```js
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)
```

### 3.5 响应性语法糖 (实验性功能)

> 响应性语法糖目前是一个实验性功能，默认是禁用的，需要[显式选择使用](https://staging-cn.vuejs.org/guide/extras/reactivity-transform.html#explicit-opt-in)。

相对于普通的 JavaScript 变量，我们不得不用相对繁琐的 `.value` 来获取 ref 的值。这是一个受限于 JavaScript 语言限制的缺点。然而，通过编译时转换，我们可以让编译器帮我们省去使用 `.value` 的麻烦。Vue 提供了一种编译时转换，使得我们可以像这样书写之前的“计数器”示例：

```vue
<script setup>
let count = $ref(0)

function increment() {
  // 无需 .value
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

你可以在 [响应性语法糖](https://staging-cn.vuejs.org/guide/extras/reactivity-transform.html) 章节中了解更多细节。请注意它仍处于实验性阶段，在最终提案落地前仍可能发生改动。