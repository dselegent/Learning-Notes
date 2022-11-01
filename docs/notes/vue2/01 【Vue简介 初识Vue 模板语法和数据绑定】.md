# 01 【Vue简介 初识Vue 模板语法和数据绑定】

## 1.Vue简介

### 1.1官网

-  [英文官网](https://vuejs.org/)
-  [中文官网](https://cn.vuejs.org/)

### 1.2介绍与描述

- Vue 是一套用来动态构建用户界面的渐进式JavaScript框架
  ○构建用户界面：把数据通过某种办法变成用户界面
  ○渐进式：Vue可以自底向上逐层的应用，简单应用只需要一个轻量小巧的核心库，复杂应用可以引入各式各样的Vue插件
- 作者：尤雨溪

![image-20220627111824089](https://i0.hdslb.com/bfs/album/a480928cc5819344850462e511b11481f773c4e3.png)

### 1.3. Vue 的特点

1 遵循MVVM模式 
2 编码简洁，体积小，运行效率高，适合移动/PC端开发 
3 它本身只关注 UI，可以引入其它第三方库开发项目
4采用`组件化`模式，提高代码复用率、且让代码更好维护

![image-20220627112112058](https://i0.hdslb.com/bfs/album/911d5825fb775e5d72a180e14cf91cd4150b7d6f.png)

5 `声明式`编码，让编码人员无需直接操作DOM，提高开发效率

![image-20220627112141707](https://i0.hdslb.com/bfs/album/84f52ac120ac699f8e9e2d5b777359e90545dd3a.png)

使用`虚拟DOM` 和 `Diff算法`，尽量复用DOM节点

![image-20220627112235934](https://i0.hdslb.com/bfs/album/a28b2b5307e90c92fd36bbad151869b7dbc481ce.png)

### 1.4与其他 JS 框架的关联

- 借鉴 angular 的 **模板** 和 **数据绑定** 技术
- 借鉴 react 的 **组件化** 和 **虚拟DOM** 技术

### 1.5Vue 周边库

- vue-cli：vue 脚手架
- vue-router：路由
- vuex：状态管理（它是 vue 的插件但是没有用 vue-xxx 的命名规则）
- vue-lazyload：图片懒加载
- vue-scroller：页面滑动相关
- mint-ui：基于 vue 的 UI 组件库（移动端）
- element-ui：基于 vue 的 UI 组件库（PC 端）

## 2.初识Vue

**前置工作**

1. 给浏览器安装 [Vue Devtools](https://cn.vuejs.org/v2/guide/installation.html#Vue-Devtools) 插件
2. 标签引入Vue包
3. （可选）阻止vue在启动时生成生产提示`Vue.config.productionTip = false`
4. favicon 需要将页签图标放在项目根路径，重新打开就有了（shfit+F5 强制刷新）

**初识Vue**

1. 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象
2. root 容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法
3. root 容器里的代码被称为Vue模板
4. Vue 实例与容器是`一一对应`的
5. 真实开发中只有一个Vue实例，并且会配合着组件一起使用
6. `{{xxx}}`中的 xxx 要写` js 表达式`，且 xxx 可以自动读取到data中的所有属性
     **注意区分**：js 表达式 和 js代码（语句）
   1. 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
      a	a+b		demo(1)		x === y ? 'a' : 'b'
   2. js代码（语句）
      if(){}		for(){}
7. 一旦data中的数据发生变化，那么模板中用到该数据的地方也会自动更新(Vue实现的响应式)

> 初始示例代码

```html
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
<!-- 准备好一个容器 -->
<div id="demo">
	<h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
</div>

<script type="text/javascript" >
	Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

	//创建Vue实例
	new Vue({
		el:'#demo', //el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串。
		data:{ //data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象。
			name:'hello,world',
			address:'北京'
		}
	});

</script>
```

## 3.模板语法和数据绑定

### 3.1模板语法

`Vue`模板语法有2大类:

* **插值语法：**

  功能：用于解析标签体内容

  写法：`{{xxx}}`，xxx是**js表达式**，且可以直接读取到data中的所有属性

* **指令语法:**

  功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）

  举例：`v-bind:href="xxx"` 或  简写为 `:href="xxx"`，xxx同样要写`js表达式`，且可以直接读取到data中的所有属性

  备注：Vue中有很多的指令，且形式都是 **v-xxx**，此处只是拿v-bind举例

> 代码

```html
    <div id="root">
      <h2>插值语法</h2>
      <h4>你好，{{ name }}</h4>
      <hr />
      <h2>指令语法</h2>
      <a v-bind:href="tencent.url.toUpperCase()" x="hello">点我去看{{ tencent.name }}1</a>
      <a :href="tencent.url" x="hello">点我去看{{ tencent.name }}2</a>
    </div>

  <script type="text/javascript">
    new Vue({
      el: '#root',
      data: {
        name: 'jack',
        tencent: {
          name: '开端',
          url: 'https://v.qq.com/x/cover/mzc00200mp8vo9b/n0041aa087e.html',
        }
      }
    })
  </script>
```

![image-20220627113847858](https://i0.hdslb.com/bfs/album/39acee45f25c6e31959ae833c1f9d55cb08bc896.png)

### 3.2数据绑定

Vue中有2种数据绑定的方式：

* 单向绑定`(v-bind)`：数据只能从data流向页面

* 双向绑定`(v-model)`：数据不仅能从data流向页面，还可以从页面流向data

  > tips: 
  >
  > 1.双向绑定一般都应用在**表单类元素**上（如：`input`、`select`等）
  >
  > 2.**v-model:value** 可以简写为` v-model`，因为v-model默认收集的就是value值

> 代码

```html
<div id="root">
	<!-- 普通写法 单向数据绑定 -->
    单向数据绑定：<input type="text" v-bind:value="name"><br/>
    双向数据绑定：<input type="text" v-model:value="name"><br/>
    
    <!-- 简写 v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值-->
    单向数据绑定：<input type="text" :value="name"><br/>
    双向数据绑定：<input type="text" v-model="name"><br/>
    
    <!-- 如下代码是错误的，因为 v-model 只能应用在表单类元素（输入类元素）上 -->
	<!-- <h2 v-model:x="name">你好啊</h2> -->
</div>

<script>
    new Vue({
		el:'#root',
		data:{
			name:'jack',
        }
	})
</script>
```

