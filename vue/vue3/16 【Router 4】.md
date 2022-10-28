# 16 【Router 4】

使用Vue3 安装对应的router4版本

使用Vue2安装对应的router3版本

```shell
npm install vue-router@4
```

## 1.路由配置

**与之前版本区别：**

1. 由 `createRouter()` 替换 `new Router()`
2. 路由模式由 `createWebHistory()` 替换 `mode: 'history'`
3. main.js中由 `.use(router)` 替换 `new Vue({ router })`

**以前版本写法：**

```js
// router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes'

Vue.use(Router);

const router = new Router({  // 区别1
	mode: 'history',  // 区别2
	routes
});

export default router;


// main.js
import Vue from 'vue'
import router from './router'
// ...
new Vue({
	el: '#app',
	router,   // 区别3
	components: { App },
	template: '<App/>'
})

```

**`vue-router 4.x` 版本写法：**

```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes'

const router = createRouter({ // 区别1
	history: createWebHistory(process.env.BASE_URL),  // 区别2
	routes 
})

export default router 


// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);
app.use(router).mount('#app');  // 区别3

```

**路由模式区别：**

| vue-router 3.x | vue-router 4.x         |
| -------------- | ---------------------- |
| history        | createWebHistory()     |
| hash           | createWebHashHistory() |
| abstract       | createMemoryHistory()  |

在src目录下面新建router 文件 然后在router 文件夹下面新建 index.ts

```ts
//引入路由对象
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'
 
//vue2 mode history vue3 createWebHistory
//vue2 mode  hash  vue3  createWebHashHistory
//vue2 mode abstact vue3  createMemoryHistory
 
//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    component: () => import('../components/a.vue')
},{
    path: '/register',
    component: () => import('../components/b.vue')
}]
 
 
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
//导出router
export default router
```

最后在main.ts 挂载

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
createApp(App).use(router).mount('#app')
```

## 2.路由跳转及参数

**router：** 是VueRouter的一个**全局对象**，通过`Vue.use(VueRouter)`和`VueRouter`构造函数得到的一个实例对象，包含了所有路由包含了许多关键的对象和属性

**route：** 是一个跳转路由的**局部对象**，每个路由都会有一个route对象，可以获取对应的`name`、`path`、`params`、`query`等

以上在`vue2.x`与`vue3.x`中是一致的，要注意区分。

在`vue3.x setup中` ， `useRouter`、`useRoute`通常用来：

- useRouter：进行路由跳转
- useRoute：获取路由参数

```ts
<script setup>
	import { useRoute, useRouter } from 'vue-router'
	const router = useRouter();
	const route = useRoute();

	console.log(route); // 获取路由参数
	router.push('/logo'); // 进行路由跳转
</script>
```

**vue-router 3.x中** 获取路由参数：

1. 在组件中： `{{$route.query.color}}` 或 `{{$route.params.color}}`
2. 在 JS 中： `this.$route.query.color` 或 `this.$route.params.color`

## 3.路由（导航）守卫

路由守卫简单来讲就是监听页面**进入**，**修改**，和**离开**的功能。

**每个守卫接受三个参数：**

- to：即将**要进入的路由**对象
- from：当前导航正**要离开的路由**
- next：一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

**关于 next ：**

1. `next()`：进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** （确认的）。

2. `next(false)`：中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。

3. `next('/')` 或 `next({ path: '/' })`：跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

4. `next(error)`：(2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

**vue-router 3.x中：**

```ts
<script type="text/ecmascript-6">
	export default {
	
			beforeRouteEnter(to, from, next){
			    // 在渲染该组件的对应路由被confirm前调用
			    // 此时组件实例还没被创建，因此不能获取`this`
			}
			
			beforeRouteUpdate(to, from, next){
			    // 在当前路由改变，但该组件被复用时调用
			    // 举例：对于一个带有动态参数的路径`/item/:id`,在`/item/1`和`/item/2`之间跳转的时候，
			    // 由于会渲染相同的`Item`组件，因此组件实例会被复用，从而触发这个钩子
			    // 此时可以获取到`this`
			}
			
			beforeRouteLeave(to, from, next){
			    // 导航离开该组件的对应路由时调用
			    // 时可以获取到`this`
			}
			
	    }
	};
</script>

```

**vue-router 4.x中：**

| vue-router 3.x    | vue-router 4.x      |
| ----------------- | ------------------- |
| beforeRouteEnter  | 无                  |
| beforeRouteUpdate | onBeforeRouteUpdate |
| beforeRouteLeave  | onBeforeRouteLeave  |

在`setup`中，由于路由已经发生了，因此在`setup`内部设置`beforeRouteEnter`没有任何意义，因此并无`onBeforeRouteEnter`

```ts
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    // 与 beforeRouteLeave 相同，无法访问 `this`
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
      )
      // 取消导航并停留在同一页面上
      if (!answer) return false
    })

    const userData = ref()

    // 与 beforeRouteUpdate 相同，无法访问 `this`
    onBeforeRouteUpdate(async (to, from) => {
      //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
      if (to.params.id !== from.params.id) {
        userData.value = await fetchUser(to.params.id)
      }
    })
  },
}
```

## 4.动态路由

**动态路由参数 id：**

```ts
<!-- 导航页 -->
<template>
    <router-link :to="'/news/' + newsId">新闻详情</router-link>
</template>

<script setup>
import { ref } from 'vue';
const newsId = ref('001');
</script>
```

**获取路由参数：**

```ts
<!-- 新闻详情页 -->
<template>
  <div id="news">
      <p>id:{{$route.params.id}}</p>
      <p>{{newsId}}</p>
  </div>
</template>


<script setup>
import {useRoute} from 'vue-router';
import {computed} from 'vue';
const route=useRoute();

const newsId=computed(()=>{
   return route.params.id
})
</script>
```

## 5.keep-alive

可利用`keep-alive`的 `include` 或 `exclude` 属性（include 和 exclude 包含的name 是组件的name不是router name）来设置缓存：

- `include` 值为字符串或者正则表达式匹配的组件name**会被缓存**。
- `exclude` 值为字符串或正则表达式匹配的组件name**不会被缓存**。

**vue2.x写法：**

```html
<keep-alive exclude="Home">  // 缓存除了Home外的所有组件
   <router-view></router-view>
</keep-alive>
```

**vue3.x写法：**

> ### 将内容传递给路由组件的 `<slot>`[#](https://router.vuejs.org/zh/guide/migration/index.html#将内容传递给路由组件的-slot)
>
> 之前你可以直接传递一个模板，通过嵌套在 `<router-view>` 组件下，由路由组件的 `<slot>` 来渲染：
>
> ```html
> <router-view>
>   <p>In Vue Router 3, I render inside the route component</p>
> </router-view>
> ```
>
> 由于 `<router-view>` 引入了 `v-slot` API，你必须使用 `v-slot` API 将其传递给 `<component>`：
>
> ```html
> <router-view v-slot="{ Component }">
>   <component :is="Component">
>     <p>In Vue Router 3, I render inside the route component</p>
>   </component>
> </router-view>
> ```

```vue
<template>
	<router-view v-slot="{ Component }">
	    <keep-alive :include="includeList">
	        <component :is="Component" />
	    </keep-alive>
	</router-view>
</template>

<script setup>
import { ref } from 'vue';

// 需要缓存的组件name值
const includeList = ref(['About', 'User']); // 缓存About和User组件
</script>
```

也可以在`router.js`中添加`meta`属性动态判断：

```js
meta: { title: '缓存页面', keepAlive: true }
```

```ts
import { watch } from 'vue'
import {useRouter} from 'vue-router'

const router =useRouter()
const includeList = [];

watch(() => router.currentRoute.value,(val) => {
  // 只要设置了keepAlive属性的，全部加入缓存列表中
  if (val.meta.keepAlive && keepAliveList.indexOf(val.name) === -1) {
    includeList.push(val.name);
  }
},{immediate: true,deep: true})

```

## 6.vite中的路由懒加载
