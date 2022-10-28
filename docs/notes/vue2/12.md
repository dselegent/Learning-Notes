# 12 【nextTick 过渡与动画】

## 1.nextTick

**这是一个生命周期钩子**

1. 语法：```this.$nextTick(回调函数)```
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

> 比如编辑按钮使文本变成表单且自动获取焦点
>
> 点击表单时会用一个布尔值配合v-show使表单显示，可是改变布尔值的时候，后面的focus方法会跟着执行，然后再渲染模板

```html
<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" >
      <span v-show="!todo.isEdit">{{ todo.title }}</span>
      <input type="text" v-show="todo.isEdit" 				          
             :value="todo.title"ref="inputTitle"/>
    </label>
    <button v-show="!todo.isEdit" class="btn btn-edit" @click="handleEdit(todo)">
      编辑
    </button>
  </li>
</template>

<script>
export default {
  name: "MyItem",
  
  props: ["todo"],	// 声明接收todo
  methods: {
    handleEdit(todo) {	// 编辑
      if (todo.hasOwnProperty("isEdit")) {
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true);
      }
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
    },
  },
};
</script>
```

## 2.过渡与动画

### 2.1 基本介绍

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。
包括以下工具：
1、在 CSS 过渡和动画中自动应用 class；
2、配合使用第三方 CSS 动画库，如 Animate.css；
3、在过渡钩子函数中使用 JavaScript 直接操作 DOM；
4、配合使用第三方 JavaScript 动画库，如 Velocity.js。

![image-20220702200614775](https://i0.hdslb.com/bfs/album/211e5bf27c639a3f962a7a9d76cf3b9dab20ea1b.png)

1. 作用：Vue封装的在插入、更新或移除` DOM`元素时，在合适的时候给元素添加样式类名。

2. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用`<transition>`包裹要过度的元素，并配置`name`属性，此时需要将上面样式名的`v`换为`name`

      ```vue
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

   3. 要让页面一开始就显示动画，需要添加`appear`

   4. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。

      ```vue
      <transition-group name="hello" appear>
        <h1 v-show="!isShow" key="1">你好啊！</h1>
        <h1 v-show="isShow" key="2">尚硅谷！</h1>
      </transition-group>
      ```

   5. 第三方动画库`Animate.css`

      ```vue
      <template>
      	<div>
      		<button @click="isShow = !isShow">显示/隐藏</button>
      		<transition-group 
      			appear
      			name="animate__animated animate__bounce" 
      			enter-active-class="animate__swing"
      			leave-active-class="animate__backOutUp"
      		>
      			<h1 v-show="!isShow" key="1">你好啊！</h1>
      			<h1 v-show="isShow" key="2">尚硅谷！</h1>
      		</transition-group>
      	</div>
      </template>
      
      <script>
      	import 'animate.css'
      	export default {
      		name:'Test',
      		data() {
      			return {
      				isShow:true
      			}
      		},
      	}
      </script>
      ```

### 2.2 动画的使用

   ```vue
<transition name="hello" appear>
  <h1 v-show="isShow">你好啊！</h1>
</transition>

<style>
  .hello-enter-active{
    animation: hello 0.5s linear;
  }

  .hello-leave-active{
    animation: hello 0.5s linear reverse;
  }

  @keyframes hello {
    from{
      transform: translateX(-100%);
    }
    to{
      transform: translateX(0px);
    }
  }
</style>
   ```

### 2.3 过渡的使用

   ```vue
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition-group name="hello" appear>
      <h1 v-show="!isShow" key="1">你好啊！</h1>
      <h1 v-show="isShow" key="2">尚硅谷！</h1>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name:'Test',
    data() {return {isShow:true}},
  }
</script>

<style scoped>
  h1 {
    background-color: orange;
    /* transition: 0.5s linear; */
  }
  /* 进入的起点、离开的终点 */
  .hello-enter,.hello-leave-to {
    transform: translateX(-100%);
  }
  .hello-enter-active,.hello-leave-active{
    transition: 0.5s linear;
  }
  /* 进入的终点、离开的起点 */
  .hello-enter-to,.hello-leave {
    transform: translateX(0);
  }
</style>
   ```

