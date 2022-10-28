# 03 【响应式原理 ref和reactive总结 setup注意点】

## 1.Vue3.0中的响应式原理

### 1.1 vue2.x的响应式

- 实现原理：

  - 对象类型：通过```Object.defineProperty()```对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

- 存在问题：

  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

```js
      const person = {
        name: 'ds',
        age: 18,
      };

      // vue2
       let p = {};
      Object.defineProperty(p, 'name', {
        get() {
          console.log('有人读取了name');
          return person.name;
        },
        set(value) {
          console.log('有人修改了name');
          person.name = value;
        },
      }); 
```

### 1.2 Vue3.0的响应式

- 实现原理: 

  - 通过Proxy（代理）:  拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。

  - 通过Reflect（反射）:  对源对象的属性进行操作。

  - MDN文档中描述的Proxy与Reflect：

    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

      ```js
            //源数据
      	const person = {
              name: 'ds',
              age: 18,
            };
      
            //代理数据
      	  //target就是目标对象person，propName就是操作的属性
            const p = new Proxy(person, {
                //有人读取p的某个属性时调用
              get(target, propName) {
                console.log(`有人读取了p的${propName}`);
                console.log(target, propName);
                return target[propName];
              },
                //有人修改p的某个属性、或给p追加某个属性时调用
              set(target, propName, value) {
                console.log(`有人修改了p身上的${propName}`);
                target[propName] = value;
              },
                //有人删除p的某个属性时调用
              deleteProperty(target, propName) {
                console.log(`有人删除了p身上的${propName}`);
                 //这个函数需要一个结果来判断成功与否所以return
                return delete target[propName];
              },
            });
      ```

      ![image-20220705120849166](https://i0.hdslb.com/bfs/album/5ee7fa21dea8a952a76ba8342b02918ee943fa43.png)

    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

      ```js
      			//源数据
      			let person = {
      				name:'张三',
      				age:18
      			}
      			//模拟Vue3中实现响应式
      			const p = new Proxy(person,{
      				//有人读取p的某个属性时调用
      				get(target,propName){
      					console.log(`有人读取了p身上的${propName}属性`)
      					return Reflect.get(target,propName)
      				},
      				//有人修改p的某个属性、或给p追加某个属性时调用
      				set(target,propName,value){
      					console.log(`有人修改了p身上的${propName}属性，我要去更新界面了！`)
      					Reflect.set(target,propName,value)
      				},
      				//有人删除p的某个属性时调用
      				deleteProperty(target,propName){
      					console.log(`有人删除了p身上的${propName}属性，我要去更新界面了！`)
      					return Reflect.deleteProperty(target,propName)
      				}
      			})
      ```

> 通过Reflect操作的属性，报错时会返回false，这样就不要try-catch捕获异常了。

## 2.ref和reactive总结

### 2.1 reactive对比ref

-  从定义数据角度对比：
   -  ref用来定义：<strong style="color:#DD5145">基本类型数据</strong>。
   -  reactive用来定义：<strong style="color:#DD5145">对象（或数组）类型数据</strong>。
   -  备注：ref也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过```reactive```转为<strong style="color:#DD5145">代理对象</strong>。
-  从原理角度对比：
   -  ref通过``Object.defineProperty()``的```get```与```set```来实现响应式（数据劫持）。
   -  reactive通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）, 并通过<strong style="color:#DD5145">Reflect</strong>操作<strong style="color:orange">源对象</strong>内部的数据。
-  从使用角度对比：
   -  ref定义的数据：操作数据<strong style="color:#DD5145">需要</strong>```.value```，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>```.value```。
   -  reactive定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>```.value```。

### 2.2 ref

1.`ref`通常用于声明**基础类型响应式数据**。

```js
import {ref} from 'vue'

const age =ref(10) //声明响应式数据
```

2.`ref`返回的是被包装过的响应式对象，**在`setup`中访问和修改`ref`需要使用`.value`属性**

```js
age.value=21
```

3.在模板中使用时无需使用`.value`，直接使用即可

```html
<div>{{age}}</div>
```

4.当`ref`数据作为`props`传递给子组件的时候，**在子组件里需要使用`toRef`或者`toRefs`建立引用，否则数据不是响应式的**。且需要注意，如果在子组件中直接操作了这个引用之后，则和父组件不在具有联系。

### 2.3 reactive

1.`reactive`用于声明**复杂类型响应式数据**。

```js
import {reactive} from 'vue'

const man=ref({name:'jolin',age:21}) //声明响应式数据

```

2.`reactive`返回的是被包装过的响应式对象，**在`setup`中访问和修改直接使用属性即可**

```js
man.age=20
```

3.**声明时未定义，动态添加的属性也会是响应式的**

```js
man.weight = '50kg' //weight具有响应性
```

4.在模板中使用属性的形式

```html
<div>{{man.name}}</div>
```

5.将`reactive`声明的响应式数据传递给子组件时，在子组件可以直接使用。

1.当`ref`的值是数组时，我们可以通过索引来修改数组值是响应式的。

### 2.4 注意事项

1.注意当`ref`用于在模板中作为真值判断时，直接使用`ref`恒为`true`, 需要使用`.value`才能正确显示

```html
<div v-if="age"></div> //恒为true
<div v-if="age.value"></div> //正确
```

2.注意**不能解构`reactive`数据**，解构出的数据会失去响应式。

3.在任何地方访问响应式数据都能拿到最新的。

4.**同`vue2`的`data`，只有数据被应用到模板中时，数据的改变才会触发`updated`生命周期**，否则即使数据被修改了，也不会触发`updated`生命周期，导致视图不更新。

5.同`vue2`，当将`ref`和`reactive`作为`props`传递给组件时，原则上不应该在子组件上修改`props`的值。

## 3.setup的两个注意点

- setup执行的时机
  - 在beforeCreate之前执行一次，this是undefined。
- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
      如果子组件没有使用`props:[‘xxx’]`接收，attr这个对象就能看到父组件传来的数据
    - slots: 收到的插槽内容, 相当于 ```this.$slots```。
    - emit: 分发自定义事件的函数, 相当于 ```this.$emit```。
      一定要在配置里写`emits:['hello']`, 这里要写父组件的自定义函数名称，不然会有警告

`App.vue`

```vue
<template>
	<Demo @hello="showHelloMsg" msg="你好啊" school="尚硅谷">
		<template v-slot:qwe>
			<span>尚硅谷</span>
		</template>
		<template v-slot:asd>
			<span>尚硅谷</span>
		</template>
	</Demo>
</template>

<script>
	import Demo from './components/Demo'
	export default {
		name: 'App',
		components:{Demo},
		setup(){
			function showHelloMsg(value){
				alert(`你好啊，你触发了hello事件，我收到的参数是:${value}！`)
			}
			return {
				showHelloMsg
			}
		}
	}
</script>

```

`Demo.vue`

```vue
<template>
	<h1>一个人的信息</h1>
	<h2>姓名：{{person.name}}</h2>
	<h2>年龄：{{person.age}}</h2>
	<button @click="test">测试触发一下Demo组件的Hello事件</button>
</template>

<script>
	import {reactive} from 'vue'
	export default {
		name: 'Demo',
		props:['msg','school'],
		emits:['hello'], //这里要写父组件的自定义函数名称，不然会有警告
		setup(props,context){
			// console.log('---setup---',props)传过来的属性存在这个对象里面
			// console.log('---setup---',context)
			// console.log('---setup---',context.attrs) //相当与Vue2中的$attrs
			// console.log('---setup---',context.emit) //触发自定义事件的。
			console.log('---setup---',context.slots) //插槽
			//数据
			let person = reactive({
				name:'张三',
				age:18
			})

			//方法
			function test(){
				context.emit('hello',666)
			}

			//返回一个对象（常用）
			return {
				person,
				test
			}
		}
	}
</script>


```

