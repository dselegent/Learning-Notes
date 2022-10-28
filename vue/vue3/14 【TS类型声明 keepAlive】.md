# 14 【TS类型声明 keepAlive】

## 1.Ts 类型声明使用 & 讲解

> 该文章未归纳完，那么多API肯定也说不完。。不过也涵盖了主要的组合式 API 的 TS类型。
>
> 核心：大部分都是运用API函数泛型来定义类型。

### 1.1 父组件相关的

```vue
<template>
  <el-button @click="onsub">测试</el-button>
  <input type="text" @change="handleChange" />
  <child ref='childRef' :child='2' :strData='"1"' :arrFor="[]" @elPsyKongroo='onsub'></child>
</template>
<script lang='ts' setup>
import child from './child.vue'
import { ref,Ref,reactive,computed,customRef,watch,provide } from "vue";
 
//> ref
// interface Ref<T> {
//   value: T
// }
// function ref<T>(value: T): Ref<T>
const year = ref<string | number>('2020')
// 如果泛型的类型未知，则建议将 ref 转换为 Ref<T>：
function useState<State extends string>(initial: State) {
  const state = ref(initial) as Ref<State> // state.value -> State extends string
  return state
}
 
//> reactive
interface Book {
  title: string
  year?: number
}
const book = reactive<Book>({title:'唉，真有氏的怀表怎么停了!'})
// function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
 
//> customRef
// function customRef<T>(factory: CustomRefFactory<T>): Ref<T>
// type CustomRefFactory<T> = (
//   track: () => void,
//   trigger: () => void
// ) => {
//   get: () => T
//   set: (value: T) => void
// }
function useDebouncedRef(value:string, delay = 200) {
  return customRef<string>((track, trigger) => {
    return {
      get() {
        return value
      },
      set(newValue) {
        value = newValue
      }
    }
  })
}
let a23 = useDebouncedRef('heelo1')
a23.value = '123'
 
 
//> provide 与 inject   // inject示例在同级child.vue里
// interface InjectionKey<T> extends Symbol {}
// function provide<T>(key: InjectionKey<T> | string, value: T): void
provide('static',year)
provide('pbook',book)
provide('changeFn',onsub)
//! 有时候可能需要在子组件修改响应式的数据，此时provide一个方法给子组件调用
 
 
 
//> computed
let count = ref(0)
const doubleCount = computed<number>(() => count.value + 2)
 
//> watch
watch<number>(count,()=>{})
// watch<Ref<number>>(count,()=>{}) // 也可以
interface ReactiveData2{
  content2: {
    count2: number
  }
}
let refData = ref(1)
let reactiveData = reactive({content:{count:110}})
let reactiveData2 = reactive<ReactiveData2>({content2:{count2:1}})
watch<[Ref<number>,() => number,ReactiveData2]>([refData, ()=>reactiveData.content.count,reactiveData2], ([a,b,c], oldValue) => {
  console.log(a,b,c, oldValue)
})
 
 
// defineExpose 暴露的内容
// let childRef = ref()
// setTimeout(() => {
//   console.log(childRef.value.ex1); // 如果是子组件的ref对象数据，会自动解包 .value
// }, 1000);
 
function handleChange(el) {
  console.log((el.target as HTMLInputElement).value)
  console.log(el.target.value)
}
function onsub(val) {
  console.log(val);
  year.value = 2036
  book.title = '掌管未来女神的作战计划 El psy kongroo'
}
</script>
```

### 1.2 子组件相关的

```vue
<template>
  <div class="studyContent">
    <div>{{a}}</div>
    <div>{{a2}}</div>
    <div>{{pbook.title}}</div>
  </div>
</template>
<script lang='ts' setup>
import { inject,ref,Ref } from "vue";
 
//! defineProps 或 defineEmits 只能是要么使用`运行时声明`，要么使用`类型声明`。同时使用两种声明方式会导致编译报错。
 
//> defineProps
// 仅限类型的 defineProps 声明的不足之处在于，它没有可以给 props 提供默认值的方式。为了解决这个问题，提供了 withDefaults 编译器宏：
//? 运行时声明 的方式只能限制参数类型，无法限制是否必传、和默认值
// const props = defineProps({
//   child: String,
//   sda: String, //undefined
//   strData: String,
//   arrFor: Array
// })
 
//? 类型声明 的方式1：能限制是否必传 > defineProps 单独使用该api
// interface arrfor {
//   name:string,
//   children?:Array<arrfor>
// }
// const props = defineProps<{
//   child?: string|number,
//   sda?: string, //undefined
//   strData?: string,
//   arrFor: []
// }>();
// console.log(props);
 
//? 类型声明 的方式2：能限制是否必传，以及默认值
interface Props {
  child: string|number,
  sda?: string, // 未设置默认值，为 undefined
  strData: string,
  msg?: string
  labels?: string[],
  obj?:{a:number}
}
const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two'],
  obj: () => { return {a:2} }
})
console.log(props,props.msg);
 
 
//> defineEmits
// // 等效this.$emit('eventName','data')
// const emits = defineEmits(['update', 'delete'])
// emits('delete','测试')
 
// emits的类型声明写法，()的e id只是形参名字，不影响其他。
const emit = defineEmits<{
  (e: 'elPsyKongroo', id: number): void
  (e: 'update', value: string): void
}>()
setTimeout(() => {
  // emit('elPsyKongroo', 2)
}, 1000*2);
 
//> defineExpose
interface exFace {
  ex1:Ref<string>,
  ex2?:number
}
let ex1 = ref('1')
let exObj:exFace = {
  ex1,
}
// 源码类型: const defineExpose: (exposed?: Record<string, any>) => void
defineExpose(exObj)
 
 
//> inject
// interface InjectionKey<T> extends Symbol {}
// // 没有默认值
// function inject<T>(key: InjectionKey<T> | string): T | undefined
// // 有默认值
// function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T
 
// // 有工厂函数
// function inject<T>(
//   key: InjectionKey<T> | string,
//   defaultValue: () => T,
//   treatDefaultAsFactory: true
// ): T
let defaultFn = inject('ab12',()=>'雏见泽'+'棉流',true) 
console.log(defaultFn);
 
 
interface Book {
  title: string
  year?: number
}
let a = inject<Ref>('static') // 无默认值
  //! 即使在子组件可以直接修改，但最好不要这么做，将会影响到provide的父组件以及其他所有inject的子组件。
  //! 这会导致 溯源 非常麻烦，所以修改方式统一为在父组件provide一个方法，子组件调用进行修改！
  // a.value = '直接作死修改'
let pbook = inject<Book>('pbook') // 无默认值
let changeFn:(val:string)=>void = inject('changeFn') // 无默认值
let a2 = inject('static2','????') // 有默认值
let a3 = inject('static3') // 无默认值且未找到则为 undefined
let globalGuide = inject('guide') // 访问全局的
 
setTimeout(() => {
  changeFn('injectFn传参')
}, 5000);
</script>
```

## 2.keep-alive

### 2.1 基本介绍

有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。这时候就需要用到keep-alive组件。

开启keep-alive 生命周期的变化

- 初次进入时： onMounted> onActivated
- 退出后触发 `deactivated`
- 再次进入：
- 只会触发 onActivated
- 事件挂载的方法等，只执行一次的放在 onMounted中；组件每次进去执行的方法放在 onActivated中

```vue
 <keep-alive :include="" :exclude="" :max=""></keep-alive>
```

Props：

- include - string | RegExp | Array。只有名称匹配的组件会被缓存。
- exclude - string | RegExp | Array。任何名称匹配的组件都不会被缓存。
- max - number | string。最多可以缓存多少组件实例。

**用法：**

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。

**主要用于保留组件状态或避免重新渲染。**

> 注意事项：
>
> 1. 优先级: 如果 `exclude` 和 `include` 内都有同个组件名， `exclude` 优先级高于 `include`  
>
> 2. 缓存销毁: `max` 当已缓存的组件数量超过 `max` 值，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。  
>
> 3. 生命周期: 被缓存的组件才会调用 `activated` 这些缓存相关的生命周期 ,换句话说就是 `exclude` 内的组件不会触发 activated！！  
>
> 4. 离开组件、再度激活: 当组件在 `<keep-alive>` 内被切换时，它的 mounted 和 unmounted 生命周期钩子不会被调用，取而代之的是 activated 和 deactivated。(这会运用在 `<keep-alive>` 的直接子节点及其所有子孙节点。)

### 2.2 使用案例

```html
<template>
  <keep-alive :exclude="['test1']" :include="['test1','test2']" max='1'>
    <component :is='dynamic'></component>
  </keep-alive>
  <el-button @click='changeComponent'>更改组件</el-button>
</template>
<script setup lang="ts">
import test1 from './test-components/test1.vue'
import test2 from './test-components/test2.vue'
import { ref,shallowRef } from 'vue'
let dynamic:any = shallowRef(test1)
let state = ref(true)
function changeComponent() {
  if (state.value) {
    dynamic.value = test2
  }else{
    dynamic.value = test1
  }
  state.value = !state.value
}
</script>
```

- **`include` 和 `exclude`**

  `include` 和 `exclude` prop 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

```vue
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>
 
<!-- regex (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>
 
<!-- Array (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

**使用了 include / exclude 后，必须显式声明组件的 name !!!**
**这样才能与缓存组件匹配、生效。**

> **提示**
>
> 在 3.2.34 或以上的版本中, 使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 `name` 选项，无需再手动声明。

注意，`<keep-alive>` 是用在其一个直属的子组件被切换的情形。如果你在其中有 `v-for` 则不会工作。如果有上述的多个条件性的子元素，`<keep-alive>` 要求同时只有一个子元素被渲染。

### 2.3 缓存实例的生命周期

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为**不活跃**状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新**被激活**。

一个持续存在的组件可以通过 [`onActivated()`](https://staging-cn.vuejs.org/api/composition-api-lifecycle.html#onactivated) 和 [`onDeactivated()`](https://staging-cn.vuejs.org/api/composition-api-lifecycle.html#ondeactivated) 注册相应的两个状态的生命周期钩子：

```js
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>
```

请注意：

- `onActivated` 在组件挂载时也会调用，并且 `onDeactivated` 在组件卸载时也会调用。
- 这两个钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件。