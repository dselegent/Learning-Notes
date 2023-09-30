# 08 【Props 组件事件】

## 1.Props

### 1.1 Props 声明[#](https://staging-cn.vuejs.org/guide/components/props.html#props-declaration)

Props 是一种特别的 attributes，你可以在组件上声明注册。要传递给子组件内容，我们必须在组件的 props 列表上声明它。

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

`defineProps` 是一个仅 `<script setup>` 中可用的编译宏命令，并不需要显式地导入。声明的 props 会自动暴露给模板。`defineProps` 会返回一个对象，其中包含了可以传递给组件的所有 props：

```js
const props = defineProps(['title'])
console.log(props.title)
```

TypeScript 用户请参考：[为组件 props 标注类型](https://staging-cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props)

在没有使用 `<script setup>` 的组件中，props 必须以 `props` 选项的方式声明，props 对象会作为 `setup()` 函数的第一个参数被传入：

```js
export default {
  props: ['title'],
  setup(props) {
    // setup() 接收 props 作为第一个参数
    console.log(props.title)
  }
}
```

注意传递给 `defineProps()` 的参数和提供给 `props` 选项的值是相同的，两种声明方式背后其实使用的都是 prop 选项。

除了使用字符串数组来声明 prop 外，还可以使用对象的形式：

```js
// 使用 <script setup>
defineProps({
  title: String,
  likes: Number
})
// 非 <script setup>
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

对于以对象形式声明中的每个属性，key 是 prop 的名称，而值则是该 prop 预期类型的构造函数。比如，如果要求一个 prop 的值是 `number` 类型，则可使用 `Number` 构造函数作为其声明的值。

对象形式的 props 声明不仅可以一定程度上作为组件的文档，而且如果其他开发者在使用你的组件时传递了错误的类型，也会在浏览器控制台中抛出警告。我们将在本章节稍后进一步讨论有关 [prop 校验](https://staging-cn.vuejs.org/guide/components/props.html#prop-validation)的更多细节。

> 校验选项中的 `type` 可以是下列这些原生构造函数：
>
> - `String`
> - `Number`
> - `Boolean`
> - `Array`
> - `Object`
> - `Date`
> - `Function`
> - `Symbol`
>
> 另外，`type` 也可以是自定义的类或构造函数，Vue 将会通过 `instanceof` 来检查类型是否匹配。

如果你正在搭配 TypeScript 使用 `<script setup>`，也可以使用类型标注来声明 props：

```js
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

更多关于基于类型的声明的细节请参考[组件 props 类型标注](https://staging-cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props)。

### 1.2 Prop 名字格式[#](https://staging-cn.vuejs.org/guide/components/props.html#prop-name-casing)

如果一个 prop 的名字很长，应使用 camelCase 形式，因为它们是合法的 JavaScript 标识符，可以直接在模板的表达式中使用，也可以避免在作为属性 key 名时必须加上引号。

```js
defineProps({
  greetingMessage: String
})
<span>{{ greetingMessage }}</span>
```

虽然理论上你也可以在向子组件传递 props 时使用 camelCase 形式 (使用 [DOM 模板](https://staging-cn.vuejs.org/guide/essentials/component-basics.html#dom-template-parsing-caveats)时例外)，但实际上为了和 HTML attribute 对齐，我们通常会将其写为 kebab-case 形式：

```js
<MyComponent greeting-message="hello" />
```

对于组件名我们推荐使用 [PascalCase](https://staging-cn.vuejs.org/guide/components/registration.html#component-name-casing)，因为这提高了模板的可读性，能帮助我们区分 Vue 组件和原生 HTML 元素。然而对于传递 props 来说，使用 camelCase 并没有太多优势，因此我们推荐更贴近 HTML 的书写风格。

### 1.3 使用一个对象绑定多个 prop[#](https://staging-cn.vuejs.org/guide/components/props.html#binding-multiple-properties-using-an-object)

如果你想要将一个对象的所有属性都当作 props 传入，你可以使用[没有参数的 `v-bind`](https://staging-cn.vuejs.org/guide/essentials/template-syntax.html#dynamically-binding-multiple-attributes)，即只使用 `v-bind` 而非 `:prop-name`。例如，这里有一个 `post` 对象：

```js
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
```

以及下面的模板：

```vue
<BlogPost v-bind="post" />
```

而这实际上等价于：

```vue
<BlogPost :id="post.id" :title="post.title" />
```

### 1.4 Prop 校验[#](https://staging-cn.vuejs.org/guide/components/props.html#prop-validation)

Vue 组件可以更细致地声明对传入的 props 的校验要求。比如我们上面已经看到过的类型声明，如果传入的值不满足类型要求，Vue 会在浏览器控制台中抛出警告来提醒使用者。这在开发给其他开发者使用的组件时非常有用。

要声明对 props 的校验，你可以向 `defineProps()` 宏提供一个带有 props 校验选项的对象，例如：

```js
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
})
```

**提示：**

`defineProps()` 宏中的参数**不可以访问 `<script setup>` 中定义的其他变量**，因为在编译时整个表达式都会被移到外部的函数中。

一些补充细节：

- 所有 prop 默认都是可选的，除非声明了 `required: true`。
- 除 `Boolean` 外的未传递的可选 prop 将会有一个默认值 `undefined`。
- `Boolean` 类型的未传递 prop 将被转换为 `false`。你应该为它设置一个 `default` 值来确保行为符合预期。
- 如果声明了 `default` 值，那么在 prop 的值被解析为 `undefined` 时，无论 prop 是未被传递还是显式指明的 `undefined`，都会改为 `default` 值。

当 prop 的校验失败后，Vue 会抛出一个控制台警告 (在开发模式下)。

如果使用了[基于类型的 prop 声明](https://staging-cn.vuejs.org/api/sfc-script-setup.html#typescript-only-features) ，Vue 会尽最大努力在运行时按照 prop 的类型标注进行编译。举例来说，`defineProps<{ msg: string }>` 会被编译为 `{ msg: { type: String, required: true }}`。

### 1.5 Boolean 类型转换[#](https://staging-cn.vuejs.org/guide/components/props.html#boolean-casting)

为了更贴近原生 boolean attributes 的行为，声明为 `Boolean` 类型的 props 有特别的类型转换规则。以带有如下声明的 `<MyComponent>` 组件为例：

```js
defineProps({
  disabled: Boolean
})
```

该组件可以被这样使用：

```vue
<!-- 等同于传入 :disabled="true" -->
<MyComponent disabled />

<!-- 等同于传入 :disabled="false" -->
<MyComponent />
```

当一个 prop 被声明为允许多种类型时，例如：

```js
defineProps({
  disabled: [Boolean, Number]
})
```

无论声明类型的顺序如何，`Boolean` 类型的特殊转换规则都会被应用。

### 1.6 单向数据流

所有的 props 都遵循着**单向绑定**原则，props 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。这避免了子组件意外修改父组件的状态的情况，不然应用的数据流将很容易变得混乱而难以理解。

另外，每次父组件更新后，所有的子组件中的 props 都会被更新到最新值，这意味着你**不应该**在子组件中去更改一个 prop。若你这么做了，Vue 会在控制台上向你抛出警告：

```js
const props = defineProps(['foo'])

// ❌ 警告！prop 是只读的！
props.foo = 'bar'
```

导致你想要更改一个 prop 的需求通常来源于以下两种场景：

1. **prop 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性**。在这种情况下，最好是新定义一个局部数据属性，从 props 上获取初始值即可：

   ```js
   const props = defineProps(['initialCounter'])
   
   // 计数器只是将 props.initialCounter 作为初始值
   // 像下面这样做就使 prop 和后续更新无关了
   const counter = ref(props.initialCounter)
   ```

2. **需要对传入的 prop 值做进一步的转换**。在这种情况中，最好是基于该 prop 值定义一个计算属性：

   ```js
   const props = defineProps(['size'])
   
   // 该 prop 变更时计算属性也会自动更新
   const normalizedSize = computed(() => props.size.trim().toLowerCase())
   ```

**更改对象 / 数组类型的 props[#](https://staging-cn.vuejs.org/guide/components/props.html#mutating-object-array-props)**

当对象或数组作为 props 被传入时，虽然子组件无法更改 props 绑定，但仍然**可以**更改对象或数组内部的值。这是因为 JavaScript 的对象和数组是按引用传递，而对 Vue 来说，禁止这样的改动虽然可能，但有很大的性能损耗，比较得不偿失。

这种更改的主要缺陷是它允许了子组件以某种不明显的方式影响父组件的状态，可能会使数据流在将来变得更难以理解。在最佳实践中，你应该尽可能避免这样的更改，除非父子组件在设计上本来就需要紧密耦合。在大多数场景下，子组件应该[抛出一个事件](https://staging-cn.vuejs.org/guide/components/events.html)来通知父组件做出改变。

### 1.7 defineProps 总结

- defineProps  只能是要么使用`运行时声明`，要么使用`typescript类型声明`。同时使用两种声明方式会导致编译报错。；
- defineProps、withDefaults 是只在 `<script setup>` 语法糖中才能使用的编译器宏。他不需要导入且会随着` <script setup> `处理过程一同被编译掉。

- withDefaults 只能与基于类型的defineProps声明一起使用；

> 例子1 > 运行时声明 的方式只能设置参数类型、默认值、是否必传、自定义验证。报错为控制台warn警告。
>
> 若想设置[ 编辑器报错、编辑器语法提示 ]则需要使用类型声明的方式。
>
> ```js
> <script lang='ts' setup>
> const props = defineProps({
> child: {
>  type:String, // 参数类型
>  default: 1, //默认值
>  required: true, //是否必传
>  validator: value => {
>    return value >= 0 // 除了验证是否符合type的类型，此处再判断该值结果是否符合验证
>  }
> },
> sda: String, //undefined
> strData: String,
> arrFor: Array
> })
> </script>
> ```

>  例子2 > 类型声明的方式1：defineProps 单独使用该api，只能设置是否必传和参数类型。（利用TS特性）
>
>  ```typescript
>  <script lang='ts' setup>
>  const props = defineProps<{
>      either: '必传且限定'|'其中一个'|'值', // 利用TS：限定父组件传 either 的值
>      child?: string|number,
>      strData?: string,
>      arrFor: any[]
>  }>();
>  console.log(props);
>  </script>
>  ```
>
>  相较于例子1，该写法只能设置参数类型、父组件对应 prop 是否该必传的功能。 
>
>  传值有误时，控制台报warn警告，还提供编辑器报错功能。
>
>  提供编辑器代码提示的功能。

>  例子3 > 类型声明的方式2：针对类型的 `defineProps` 声明的不足之处在于，它没有可以给 props 提供默认值的方式。为了解决这个问题，我们还提供了 `withDefaults` 编译器宏：
>
>  ```typescript
>  <script lang='ts' setup>
>  interface Props {
>      either: '必传且限定'|'其中一个'|'值', // 利用TS：限定父组件传 either 的值
>      child: string|number,
>      sda?: string, // 未设置默认值，为 undefined
>      strData: string,
>      msg?: string
>      labels?: string[],
>      obj?:{a:number}
>  }
>  const props = withDefaults(defineProps<Props>(), {
>  msg: 'hello',
>  labels: () => ['one', 'two'],
>  obj: () =>  {a:2} 
>  })
>  </script>
>  ```
>
>  上面代码会被编译为等价的运行时 props 的 `default` 选项。此外，`withDefaults` 辅助函数提供了对默认值的类型检查，并确保返回的 `props` 的类型删除了已声明默认值的属性的可选标志。
>




## 2.组件事件

> 基础使用和vue2一样

> 场景说明：
>
> 组件功能封装：
>  组件封装了一系列 emit 事件，并返回数据、回调函数等，或单纯执行某个操作后，触发父组件的事件响应。
>  外部要用时，使用 @xxxx 来接收使用、响应。

> 详细：
>
> defineEmits可以是数组或对象，从组件触发自定义事件，defineEmits可以是简单的数组，也可以是对象，后者允许配置事件验证。
>
> 在对象语法中，每个 `property` 的值可以为 null 或验证函数。验证函数将接收传递给 `$emit` 调用的其他参数。如果 $emit('foo',1) 被调用，foo 的相应验证函数将接收参数 1。验证函数应返回布尔值，以表示事件参数是否有效。
>
> 数组写法：` defineEmits:['emitEvnentName']`
>
> 对象写法：` defineEmits:{}
>  { eventName:null }
>  { eventName:()=>{} }`

> #### 细节说明：
>
> 1、数组形式和对象形式的值为null，表示该emit事件无验证函数。
> 2、对象形式且值为函数表示该 emit 配置了事件验证
>      验证函数必须有 return 真假值，真值表示通过验证，假值则 vue 会自动抛出 warn 警告！不 return 值默认当做失败，抛出 warn 警告！
>      **验证函数主要就是验证参数是否正确，并不会在 return false 时中断 emit() 事件！**

### 2.1 触发与监听事件

在组件的模板表达式中，可以直接使用 `$emit` 方法触发自定义事件 (例如：在 `v-on` 的处理函数中)：

```vue
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```

父组件可以通过 `v-on` (缩写为 `@`) 来监听事件：

```vue
<MyComponent @some-event="callback" />
```

同样，组件的事件监听器也支持 `.once` 修饰符：

```vue
<MyComponent @some-event.once="callback" />
```

像组件与 prop 一样，事件的名字也提供了自动的格式转换。注意这里我们触发了一个以 camelCase 形式命名的事件，但在父组件中可以使用 kebab-case 形式来监听。与 [prop 大小写格式](https://staging-cn.vuejs.org/guide/components/props.html#prop-name-casing)一样，在模板中我们也推荐使用 kebab-case 形式来编写监听器。

> **提示**
>
> 和原生 DOM 事件不一样，组件触发的事件**没有冒泡机制**。你只能监听直接子组件触发的事件。平级组件或是跨越多层嵌套的组件间通信，应使用一个外部的事件总线，或是使用一个[全局状态管理方案](https://staging-cn.vuejs.org/guide/scaling-up/state-management.html)。

### 2.2 事件参数[#](https://staging-cn.vuejs.org/guide/components/events.html#event-arguments)

有时候我们会需要在触发事件时附带一个特定的值。举例来说，我们想要 `<BlogPost>` 组件来管理文本会缩放得多大。在这个场景下，我们可以给 `$emit` 提供一个额外的参数：

```vue
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

然后我们在父组件中监听事件，我们可以先简单写一个内联的箭头函数作为监听器，此函数会接收到事件附带的参数：

```vue
<MyButton @increase-by="(n) => count += n" />
```

或者，也可以用一个组件方法来作为事件处理函数：

```vue
<MyButton @increase-by="increaseCount" />
```

该方法也会接收到事件所传递的参数：

```js
function increaseCount(n) {
  count.value += n
}
```

> **提示**
>
> 所有传入 `$emit()` 的额外参数都会被直接传向监听器。举例来说，`$emit('foo', 1, 2, 3)` 触发后，监听器函数将会收到这三个参数值。

### 2.3 声明触发的事件

组件要触发的事件可以显式地通过 [`defineEmits()`](https://staging-cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits) 宏来声明：

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

这声明了一个组件可能触发的所有事件，还可以对事件的参数进行[验证](https://staging-cn.vuejs.org/guide/components/events.html#validate-emitted-events)。同时，这还可以让 Vue 避免将它们作为原生事件监听器隐式地应用于子组件的根元素。

和 `defineProps` 类似，`defineEmits` 仅可用于 `<script setup>` 之中，并且不需要导入，它返回一个等同于 `$emit` 方法的 `emit` 函数。它可以被用于在组件的 `<script setup>` 中抛出事件，因为此处无法直接访问 `$emit`:

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

`defineEmits()` 宏**不能**在子函数中使用。如上所示，它必须直接放置在 `<script setup>` 的顶级作用域下。

TypeScript 用户请参考：[为组件 emits 标注类型](https://staging-cn.vuejs.org/guide/typescript/composition-api.html#typing-component-emits)

如果你显式地使用了 `setup` 函数而不是 `<script setup>`，则事件需要通过 [`emits`](https://staging-cn.vuejs.org/api/options-state.html#emits) 选项来定义，`emit` 函数也被暴露在 `setup()` 的上下文对象上：

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

与 `setup()` 上下文对象中的其他属性一样，`emit` 可以安全地被解构：

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

这个 `emits` 选项还支持对象语法，它允许我们对触发事件的参数进行验证：

```vue
<script setup>
const emit = defineEmits({
  submit(payload) {
    // 通过返回值为 `true` 还是为 `false` 来判断
    // 验证是否通过
  }
})
</script>
```

如果你正在搭配 TypeScript 使用 `<script setup>`，也可以使用纯类型标注来声明触发的事件：

> defineProps 或 defineEmits 只能是要么使用运行时声明，要么使用类型声明。同时使用两种声明方式会导致编译报错。
>
> 讲解：左边的相当于函数参数名，第一个参数的值就是emit事件名，后面的任意多个参数都是emit事件的传递参数内容。剩下的就是TS相关内容，此处不对TS进行深入讲解，不懂的自己去学。
>
>
> 这里函数的参数名叫什么不重要，重要的是`ts类型`！第一个参数的ts类型值是`emit 事件名`，后面的参数 ts类型 则是emit传递的参数类型验证！提供编辑器报错功能。

```typescript
<script setup lang='ts'>
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'delete', value: string, vlaue2:number ,value3?:boolean): void
}>()
 
setTimeout(() => {
  emit('delete', '123', 5666)
}, 1000*4);
</script>
```

使用类型声明的时候，静态分析会自动生成等效的运行时声明，以消除双重声明的需要并仍然确保正确的运行时行为。

TypeScript 用户请参考：[如何为组件所抛出事件标注类型](https://staging-cn.vuejs.org/guide/typescript/composition-api.html#typing-component-emits) 

尽管事件声明是可选的，我们还是推荐你完整地声明所有要触发的事件，以此在代码中作为文档记录组件的用法。同时，事件声明能让 Vue 更好地将事件和[透传 attribute](https://staging-cn.vuejs.org/guide/components/attrs.html#v-on-listener-inheritance) 作出区分，从而避免一些由第三方代码触发的自定义 DOM 事件所导致的边界情况。

### 2.4 事件校验

和对 props 添加类型校验的方式类似，所有触发的事件也可以使用对象形式来描述。

要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 `emit` 的内容，返回一个布尔值来表明事件是否合法。

```js
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

### 2.5 配合 `v-model` 使用

> - 使用限制：
>
> 1. `<input>`
> 2. `<select>`
> 3. `<textarea>`
> 4. `components`
>
> - 修饰符:
>
> 1. `.lazy` - 监听 `change` 而不是 `input` 事件
> 2. `.number` - 输入字符串转为有效的数字
> 3. `.trim` - 输入首尾空格过滤  

自定义事件可以用于开发支持 `v-model` 的自定义表单组件。回忆一下 `v-model` 的用法：

```vue
<input v-model="searchText" />
```

上面的代码其实等价于下面这段（编译器会对 `v-model` 进行展开）：

```vue
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

而当使用在一个组件上时，`v-model` 会被展开为如下的形式：

```vue
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

要让这个例子实际工作起来，`<CustomInput>` 组件内部需要做两件事：

1. 将内部原生 `input` 元素的 `value` attribute 绑定到 `modelValue` prop
2. 输入新的值时在 `input` 元素上触发 `update:modelValue` 事件

这里是相应的代码：

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

现在 `v-model` 也可以在这个组件上正常工作了：

```vue
<CustomInput v-model="searchText" />
```

[在演练场中尝试一下](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBDdXN0b21JbnB1dCBmcm9tICcuL0N1c3RvbUlucHV0LnZ1ZSdcbiAgXG5jb25zdCBtZXNzYWdlID0gcmVmKCdoZWxsbycpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8Q3VzdG9tSW5wdXQgdi1tb2RlbD1cIm1lc3NhZ2VcIiAvPiB7eyBtZXNzYWdlIH19XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJDdXN0b21JbnB1dC52dWUiOiI8c2NyaXB0IHNldHVwPlxuZGVmaW5lUHJvcHMoWydtb2RlbFZhbHVlJ10pXG5kZWZpbmVFbWl0cyhbJ3VwZGF0ZTptb2RlbFZhbHVlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXRcbiAgICA6dmFsdWU9XCJtb2RlbFZhbHVlXCJcbiAgICBAaW5wdXQ9XCIkZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gIC8+XG48L3RlbXBsYXRlPiJ9)

`v-model` 的参数[#](https://staging-cn.vuejs.org/guide/components/events.html#v-model-arguments)

默认情况下，`v-model` 在组件上都是使用 `modelValue` 作为 prop，并以 `update:modelValue` 作为对应的事件。我们可以通过给 `v-model` 指定一个参数来更改这些名字：

```vue
<MyComponent v-model:title="bookTitle" />
```

在这个例子中，子组件应声明一个 `title` prop，并通过触发 `update:title` 事件更新父组件值：

```vue
<!-- MyComponent.vue -->
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

[在演练场中尝试一下](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBNeUNvbXBvbmVudCBmcm9tICcuL015Q29tcG9uZW50LnZ1ZSdcbiAgXG5jb25zdCB0aXRsZSA9IHJlZigndi1tb2RlbCBhcmd1bWVudCBleGFtcGxlJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxoMT57eyB0aXRsZSB9fTwvaDE+XG4gIDxNeUNvbXBvbmVudCB2LW1vZGVsOnRpdGxlPVwidGl0bGVcIiAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiTXlDb21wb25lbnQudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmRlZmluZVByb3BzKFsndGl0bGUnXSlcbmRlZmluZUVtaXRzKFsndXBkYXRlOnRpdGxlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgOnZhbHVlPVwidGl0bGVcIlxuICAgIEBpbnB1dD1cIiRlbWl0KCd1cGRhdGU6dGl0bGUnLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gIC8+XG48L3RlbXBsYXRlPiJ9)

### 2.6 关于组件使用原生事件

> 这是我目前想到的，如果有错误，请指出

<strong style="color:#DD5145">Vue3移除</strong>```v-on.native```修饰符，那如何在组件上触发原生事件呢？

其实可以利用属性继承，详细可以看`17.1 Attributes 继承`

**注意要写根标签，因为这个事件只会继承在根标签**，**因为Vue3不强制写根标签**，所以会出现多个标签，这时这个事件找不到根标签会发出警告，解决的方法在`Attributes 继承`里面说了

父组件`App.vue`

```vue
<template>
  <span>父组件</span>
  <br />
  <Son @click="test"></Son>
</template>

<script setup>
import Son from './components/Son.vue';
function test() {
  console.log('test');
}
</script>
```

子组件`Son.vue`

```vue
<template>
  <div>
    <span>子组件</span>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </div>
</template>
```

![image-20220809130712485](https://i0.hdslb.com/bfs/album/b923af6cbf3547f18b1800321b6c53ce7bbfca71.png)
