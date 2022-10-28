# 12 【其它组合式API】

ref、unref、toRef、toRefs、isRef、customRef、shallowRef、triggerRef

refs api中的重点为：ref、toRefs、shallowRef、customRef，其次是 isRef 等。

## 1.toRef 与 toRefs

### 1.1 toRef

- 作用：可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。

- 语法 (源对象 , 源对象属性)````const name = toRef(person,'name')```

- 应用: 源响应式对象(toRef的第一个参数) 上的某个 property 新创建一个 ref  

- **toRef示例**

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })
  
  const fooRef = toRef(state, 'foo')
  
  // 更改该 ref 会更新源属性
  fooRef.value++
  console.log(state.foo) // 2
  
  // 更改源属性也会更新该 ref
  state.foo++
  console.log(fooRef.value) // 3
  ```

  请注意，这不同于：

  ```js
  const fooRef = ref(state.foo)
  ```

  上面这个 ref **不会**和 `state.foo` 保持同步，因为这个 `ref()` 接收到的是一个纯数值。

  `toRef()` 这个函数在你想把一个 prop 的 ref 传递给一个组合式函数时会很有用：

  ```js
  <script setup>
  import { toRef } from 'vue'
  
  const props = defineProps(/* ... */)
  
  // 将 `props.foo` 转换为 ref，然后传入
  // 一个组合式函数
  useSomeFeature(toRef(props, 'foo'))
  </script>
  ```

  当 `toRef` 与组件 props 结合使用时，关于禁止对 props 做出更改的限制依然有效。尝试将新的值传递给 ref 等效于尝试直接更改 props，这是不允许的。在这种场景下，你可能可以考虑使用带有 `get` 和 `set` 的 [`computed`](https://staging-cn.vuejs.org/api/reactivity-core.html#computed) 替代。详情请见[在组件上使用 `v-model`](https://staging-cn.vuejs.org/guide/components/events.html#usage-with-v-model) 指南。

  即使源属性当前不存在，`toRef()` 也会返回一个可用的 ref。这让它在处理可选 props 的时候格外实用，相比之下 [`toRefs`](https://staging-cn.vuejs.org/api/reactivity-utilities.html#torefs) 就不会为可选 props 创建对应的 refs。

### 1.2 toRefs

- 作用：

  - 将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 ref。
  - 主要功能：当从组合式函数 (.js) 返回响应式对象时，用toRefs就可以在不丢失响应性的情况下对返回的对象进行解构/展开。
  - toRef 是转单个， toRefs全转。  

- 语法：```toRefs(person)```

- 原理：toRefs 会将 reactive 生成的对象的根级属性全都用 ref 转成 ref 对象，然后解构出来的都是 ref 对象，从而不丢失响应式

- **示例**

  ```js
  <script lang='ts' setup>
  import { reactive,toRef } from 'vue';
  const state = reactive({
    foo: 1,
    bar: 2
  })
  let a = {...state}
  const stateAsRefs = toRefs(state)
  // stateAsRefs 是一个普通对象，stateAsRefs.foo则是响应式对象，因此{...}解构才不会丢失响应式
  let {bar} = stateAsRefs 
  console.log(stateAsRefs)
  console.log(stateAsRefs.foo.value) // 因为使用了 ref ，理所应当 .value。
  console.log(a)
  </script>
  ```

  当从组合式函数中返回响应式对象时，`toRefs` 相当有用。使用它，消费者组件可以解构/展开返回的对象而不会失去响应性：

  ```js
  function useFeatureX() {
    const state = reactive({
      foo: 1,
      bar: 2
    })
  
    // ...基于状态的操作逻辑
  
    // 在返回时都转为 ref
    return toRefs(state)
  }
  
  // 可以解构而不会失去响应性
  const { foo, bar } = useFeatureX()
  ```

  `toRefs` 在调用时只会为源对象上可以枚举的属性创建 ref。如果要为可能还不存在的属性创建 ref，请改用 [`toRef`](https://staging-cn.vuejs.org/api/reactivity-utilities.html#toref) 。

### 1.3 总结

```vue
<template>
  <h2>
    {{ name }}
  </h2>
  <button @click="name += '~'">按钮</button>
</template>

<script setup>
import { reactive, toRef, toRefs } from 'vue';
//数据
let person = reactive({
  name: '张三',
  age: 18,
  job: {
    j1: {
      salary: 20,
    },
  },
});
let { name } = toRefs(person);


</script>
```

> 关于toRef和toRefs
>
> toRef就是把对象里面的那个属性新生成一个Ref类型，但是是引用了之前那个对象里面的属性
>
> toRefs就是把对象第一层的属性生成一个Ref类型，然后全放到一个对象里面

```js
 let name = toRef(person, 'name');
 let person1 = toRefs(person);
 console.log(name);
console.log(person1);
```

![image-20220706153437228](https://i0.hdslb.com/bfs/album/27d752c042cf0dba1e479333b43824325938d8c9.png)

> 注意直接从reactive中解构出来的就没有响应式了，只是一个单纯的数值。
>
> 所以有了toRefs,可以把第一层结构解构出来还是有响应式。

> 这两个函数主要是为了简便我们使用对象内部数据的步骤。

## 2.shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
  和 `reactive()` 不同，这里没有深层级的转换：一个浅层响应式对象里只有根级别的属性是响应式的。属性的值会被原样存储和暴露，这也意味着值为 ref 的属性 **不会**被自动解包了。

  > **谨慎使用**
  >
  > 浅层数据结构应该只用于组件中的根级状态。请避免将其嵌套在深层次的响应式对象中，因为它创建的树具有不一致的响应行为，这可能很难理解和调试。

- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

  1. 如字面意思，浅响应式，如果传入的是基本类型跟 ref 没区别。
  2. 如果传入的是引用类型，.value值将不会是响应式的数据，ref的 value 属性则会是响应式的。
  
- 什么时候使用?

  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

**shallowReactive**

```js
setup() {
        let person = shallowReactive({
              name: '张三',
              age: 18,
              job: {
                j1: {
                  salary: 20,
                },
  			},
        });
		console.log('******', person);
		console.log('******', person.job);
        return {
            person,
            ...toRefs(person)
        };
    },

```

`name`,`age,job`都是响应式数据，但是深层次的`j1和salary`则没有响应式。

![image-20220808121112135](https://i0.hdslb.com/bfs/album/58c0804fa87fee0e177ed5a97fe9d39ba8f06f21.png)

**shallowRef**

```js
setup() {
        let refX = ref({
            x:0
        })
        let shallowRefX = shallowRef({
            x:0
        })
        console.log('ref',refX);
        console.log('shallowRef',shallowRefX);
    },

```

![image-20220808113902628](https://i0.hdslb.com/bfs/album/d236d8fb7f5c7cabd4b807bdb00c3ceab00c7146.png)

> 但是这个shallowRef定义的数据本身还是响应式，比如定义一个函数，内部写上`shallowRefX.value = {x:888}`,用一个事件触发后，页面也会更新的。

> 备注: `<script setup>`语法糖时，动态组件最好就是用 shallowRef

## 3.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。

  只读代理是深层的：对任何嵌套属性的访问都将是只读的。它的 ref 解包行为与 `reactive()` 相同，但解包得到的值是只读的。

  要避免深层级的转换行为，请使用 [shallowReadonly()](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly) 作替代。

- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
  和 `readonly()` 不同，这里没有深层级的转换：只有根层级的属性变为了只读。属性的值都会被原样存储和暴露，这也意味着值为 ref 的属性 **不会**被自动解包了。

  > **谨慎使用**
  >
  > 浅层数据结构应该只用于组件中的根级状态。请避免将其嵌套在深层次的响应式对象中，因为它创建的树具有不一致的响应行为，这可能很难理解和调试。

- 应用场景: 不希望数据被修改时。

**readonly**

```vue
<template>
	<h4>当前求和为：{{sum}}</h4>
	<button @click="sum++">点我++</button>
	<hr>
	<h2>姓名：{{name}}</h2>
	<h2>年龄：{{age}}</h2>
	<h2>薪资：{{job.j1.salary}}K</h2>
	<button @click="name+='~'">修改姓名</button>
	<button @click="age++">增长年龄</button>
	<button @click="job.j1.salary++">涨薪</button>
</template>

<script>
	import {ref,reactive,toRefs,readonly,shallowReadonly} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let sum = ref(0)
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})

			person = readonly(person)
			//返回一个对象（常用）
			return {
				sum,
				...toRefs(person)
			}
		}
	}
</script>
```

使用readonly之后，无论是浅层次的，还是深层次的的数据都不能被修改。

如下图，点击了下面一排的三个按钮都被警告是不能被修改的

![image-20220808121742457](https://i0.hdslb.com/bfs/album/93c0880b93ac89b097f157a55226e63987a41ddf.png)

**shallowReadonly**

```vue
<script>
	import {ref,reactive,toRefs,readonly,shallowReadonly} from 'vue'
	export default {
		name: 'Demo',
			...
        	// 将readonly改成shallowReadonly
			person = shallowReadonly(person)
			//返回一个对象（常用）
			return {
				...toRefs(person)
			}
		}
	}
</script>


```

使用readonly之后，第一层次的数据不能被修改，但是深层次的的数据时可以被修改的。

如下图，点击了下面一排的三个按钮，前两个修改第一层数据被警告是不能被修改的，第三个修改工资是可以修改的。

![image-20220808122216340](https://i0.hdslb.com/bfs/album/df9d0294661e3a28de513102ac4889083b2beabe.png)

## 4.toRaw 与 markRaw

- toRaw：

  - 作用：可以返回由 [`reactive()`](https://staging-cn.vuejs.org/api/reactivity-core.html#reactive)、[`readonly()`](https://staging-cn.vuejs.org/api/reactivity-core.html#readonly)、[`shallowReactive()`](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 或者 [`shallowReadonly()`](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly) 创建的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>。

  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。

  - 这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。

  - **示例**

    ```js
    const foo = {}
    const reactiveFoo = reactive(foo)
    
    console.log(toRaw(reactiveFoo) === foo) // true
    ```

- markRaw：

  - 作用：

    - <原则>：1、markRaw 标记一个对象，使其永远不会转换为 proxy。
    - <原则>：2、返回对象本身。
    - markRaw 只作用于根级别，因此内部的子级对象会被转为响应式
    - markRaw() 虽然会使普通对象永远不会转换为 proxy ，但是如果传入的本身就是proxy ，那返回的也是proxy。

  - 应用场景:

    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。
  
  - **示例**
  
    ```js
    const foo = markRaw({})
    console.log(isReactive(reactive(foo))) // false
    
    // 也适用于嵌套在其他响应性对象
    const bar = reactive({ foo })
    console.log(isReactive(bar.foo)) // false
    ```

**toRaw**

```vue
<template>
  <h2>年龄：{{ age }}</h2>
  <h3 v-show="person.car">座驾信息：{{ person.car }}</h3>
  <button @click="showRawPerson">输出最原始的person</button>
</template>

<script>
import { ref, reactive, toRefs, toRaw } from 'vue';
export default {
  name: 'Demo',
  setup() {
    //数据
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20,
        },
      },
    });

    function showRawPerson() {
      const p = toRaw(person);
      p.age++;
      console.log(p);
    }

    //返回一个对象（常用）
    return {
      person,
      ...toRefs(person),
      showRawPerson,
    };
  },
};
</script>

```

点击了输出最原始的person，但是页面的数据并没有改变，而且从输出结果来看这个并不是响应式的。

![image-20220808134046196](https://i0.hdslb.com/bfs/album/4c362973c9c57aa0f5a750cf0aa6d43ef5967a6b.png)

**markRaw**

```vue
<script lang='ts' setup>
import { markRaw } from 'vue';
// markRaw 标记一个对象，使其永远不会转换为 proxy。返回对象本身。嵌套多深都不会转 proxy

const foo = markRaw({
  nested: {}
})
// markRaw 只作用于根级别，因此内部的子级对象会被转为响应式
// bar.nested是响应式的
const bar = reactive({
  // 虽然 `foo` 被标记为原始，但 foo.nested 不是。
  nested: foo.nested
})
 
let asx:any = reactive({a:123})
let as1 = markRaw({}) // 普通对象
let as2 = markRaw(asx) // 原始 asx; as2 === asx > true
 
</script>
```

> 谨慎使用
>
> `markRaw()` 和类似 `shallowReactive()` 这样的浅层式 API 使你可以有选择地避开默认的深度响应/只读转换，并在状态关系谱中嵌入原始的、非代理的对象。它们可能出于各种各样的原因被使用：
>
> - 有些值不应该是响应式的，例如复杂的第三方类实例或 Vue 组件对象。
> - 当呈现带有不可变数据源的大型列表时，跳过代理转换可以提高性能。
>
> 这应该是一种进阶需求，因为只在根层访问能到原始值，所以如果把一个嵌套的、没有标记的原始对象设置成一个响应式对象，然后再次访问它，你获取到的是代理的版本。这可能会导致**对象身份风险**，即执行一个依赖于对象身份的操作，但却同时使用了同一对象的原始版本和代理版本：
>
> ```js
> const foo = markRaw({
>   nested: {}
> })
> 
> const bar = reactive({
>   // 尽管 `foo` 被标记为了原始对象，但 foo.nested 却没有
>   nested: foo.nested
> })
> 
> console.log(foo.nested === bar.nested) // false
> ```
>
> 识别风险一般是很罕见的。然而，要正确使用这些 API，同时安全地避免这样的风险，需要你对响应性系统的工作方式有充分的了解。

## 5.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。它需要一个工厂函数，该函数接收 track 和 trigger 函数作为参数，并且应该返回一个带有 get 和 set 的对象。  

自定义 ref 的get set，用于某些数据变更操作的额外功能封装，可以理解为computed 指令类似的功能之类的

```vue
<script lang='ts' setup>
import { useDebouncedRef } from 'vue';
function useDebouncedRef(value, delay = 200) {
  let timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        return value
      },
      set(newValue) {
        // 此处可以做一系列操作进行数据处理。
        // 例子1：使用自定义 ref 通过 v-model 实现 debounce 的示例：
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
let a23 = useDebouncedRef('hello')
</script>
```

## 6.unref

1. 如果参数是 ref，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 计算的一个语法糖。
2. 基于 ref 一个 {} ， {} 会被 reactive 二次处理，unref(ref({})) 返回的是响应式的 {}

```js
<script lang='ts' setup>
import { ref } from 'vue';
let Redf = ref('南中乱党')
let un1 = unref({})
let un2 = unref(Redf)
let un3 = unref(ref({})) // un3 > proxy {}
</script>
```

## 7.triggerRef

1. 手强制触发依赖于一个[浅层 ref](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowref) 的副作用，这通常在对浅引用的内部值进行深度变更后使用。
2. 简单讲就是配合 shallowRef 用的，并且 shallowRef 传入的是个引用类型。

```js
<script lang='ts' setup>
import { shallowRef,watchEffect,triggerRef } from 'vue';
const shallow = shallowRef({
  greet: 'Hello, world'
})
watchEffect(() => {
  // 第一次运行时记录一次 "Hello, world"
  console.log(shallow.value.greet)
})
shallow.value.greet = 'Hello, universe'
 
// 首先 watchEffect 追踪的是响应式数据，shallowRef 是浅层的，  
// 所以当是{}的时候，无法触发 effect ，每次操作 shallow.value 的时候，则需要 triggerRef(shallow) 主动触发执行。  
// 记住，是每次操作，都需要 triggerRef() 一下
triggerRef(shallow)
</script>
```

## 8.响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
  ```js
  <script lang='ts' setup>
  import { isRef } from 'vue';
  // ()内例子是上面的。
  console.log(isRef(Redf));
  console.log(isRef(stateAsRefs.foo));
  </script>
  ```

- isReactive: 检查一个对象是否是由 [`reactive()`](https://staging-cn.vuejs.org/api/reactivity-core.html#reactive) 或 [`shallowReactive()`](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 创建的代理。

- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理

- isProxy: 检查一个对象是否是由 [`reactive()`](https://staging-cn.vuejs.org/api/reactivity-core.html#reactive)、[`readonly()`](https://staging-cn.vuejs.org/api/reactivity-core.html#readonly)、[`shallowReactive()`](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 或 [`shallowReadonly()`](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly) 创建的代理。
  只要对象是Proxy类型就会返回true

  