

# 11 【Teleport CSS功能】

## 1.内置组件 Teleport

什么是Teleport？——`<Teleport>` 是一个内置组件，它是一种能够将我们的模板渲染至指定DOM节点，不受父级style、v-show等属性影响，但data、prop数据依旧能够共用的技术；类似于 React 的 Portal。

主要解决的问题 因为Teleport节点挂载在其他指定的DOM节点下，完全不受父级style样式影响

1. teleport 是内置组件，可以直接在模板中使用，无需注册。
2. 可以被打包工具 tree-shake。所以它们只会在被使用的时候被引入。
3. 需要直接主动访问(获取)它们的场景，也可以将它们显性导入。

### 1.1 基本用法

有时我们可能会遇到这样的场景：一个组件模板的一部分在逻辑上从属于该组件，但从整个应用视图的角度来看，它在 DOM 中应该被渲染在整个 Vue 应用外部的其他地方。

这类场景最常见的例子就是全屏的模态框。理想情况下，我们希望触发模态框的按钮和模态框本身是在同一个组件中，因为它们都与组件的开关状态有关。但这意味着该模态框将与按钮一起渲染在应用 DOM 结构里很深的地方。这会导致该模态框的 CSS 布局代码很难写。

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

<style>
.app {
  background-color: gray;
  padding: 10px;
  /* position: relative; */
}
</style>

```

子组件`Child.vue`

```vue
<template>
  <div class="child">
    <h3>我是Child组件</h3>
    <button @click="isShow = true">打开遮罩层</button>
    <div class="mask" v-if="isShow">
      <div class="tip">
        这是一个提示
        <button @click="isShow = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Child',
};
</script>

<script setup>
let isShow = $ref(false);
</script>

<style scoped>
.mask {
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.tip {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>

```

现在来看没有问题

![image-20220809195810727](https://i0.hdslb.com/bfs/album/6d89d75f5e960646fe304978a6e2e6505584fbc3.png)

可是如果父元素加一个定位:

```css
  position: relative;
```

![image-20220809195844153](https://i0.hdslb.com/bfs/album/082bb5d9af3f5adbfceeb7518839f56c16c55e7e.png)

遮罩层就会变成这样

以后嵌套组件变多了，遮罩组件的父级组件存在定位语句是很正常的。如果能把这个组件渲染到`body`标签的子标签就好了。这时就可以使用`Teleport`组件。

- to - string  ：必传
  挂载的目标，只能是父级标签。兄弟、子级都会报错。
  挂载目标必须是有效的查询选择器或 HTMLElement

- disabled - boolean  ：非必传

  - 是否禁用。true则挂载到目标节点下，false为当前位置。

  - 动态变化 disabled 值时，只是位置会变动，内容并不会销毁重新渲染！

`<Teleport>` 接收一个 `to` prop 来指定传送的目标。`to` 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。这段代码的作用就是告诉 Vue “把以下模板片段**传送到 `body`** 标签下”。

父组件`App.vue`中使用组件的位置改成这样。

```vue
    <Teleport to="body">
      <Child></Child>
    </Teleport>
```

![image-20220809200202370](https://i0.hdslb.com/bfs/album/53be7cbbb9c6d4260f43d687866f55975383a6e0.png)

可以发现这个组件确实被渲染到`body`标签下面了。

> **提示**
>
> `<Teleport>` 挂载时，传送的 `to` 目标必须已经存在于 DOM 中。理想情况下，这应该是整个 Vue 应用 DOM 树外部的一个元素。如果目标元素也是由 Vue 渲染的，你需要确保在挂载 `<Teleport>` 之前先挂载该元素。
>
> 以下teleport例子将会报错！
>
> ```vue
> <div class="guazai" v-if="showData">teleport目标元素</div>
> <div>
> <teleport to=".guazai">demo</teleport>
> </div>
> <script lang='ts'>
> import { defineComponent } from 'vue'
> export default defineComponent({
> data(){
>  return {
>    showData:false
>  }
> },
> mounted() {
>  setTimeout(() => {
>    this.showData = true
>  }, 1000*1);
> },
> })
> </script>
> ```

------

> 以下官方代码列举写法。但是前面说过 “ 挂载目标必须是有效的查询选择器或 HTMLElement ”
>
> 实际填h1 h2等原生标签、以及自定义的标签都是没问题的。以下应该是官方文档的一个纰漏。
>
> ```vue
> <!-- 正确 -->
> <teleport to="#some-id" />
> <teleport to=".some-class" />
> <teleport to="[data-teleport]" />
> 
> <!-- 错误 -->
> <teleport to="h1" />
> <teleport to="some-string" />
> ```
>
> **关于样式: teleport**
>
> teleport挂载的目标即使不在当前组件，scoped 内的样式在 teleport 中是生效的。
>
> 原因：scoped 生成的唯一属性会作用于 teleport 内的各元素

### 1.2 官方案例

试想下面这样的 HTML 结构：

```html
<div class="outer">
  <h3>Tooltips with Vue 3 Teleport</h3>
  <div>
    <MyModal />
  </div>
</div>
```

接下来我们来看看 `modal-button` 的实现。

```js
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">Open Modal</button>

  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

这个组件中有一个 `<button>` 按钮来触发打开模态框，和一个 class 名为 `.modal` 的 `<div>`，它包含了模态框的内容和一个用来关闭的按钮。

当在初始 HTML 结构中使用这个组件时，会有一些潜在的问题：

- `position: fixed` 能够相对于浏览器窗口放置有一个条件，那就是不能有任何祖先元素设置了 `transform`、`perspective` 或者 `filter` 样式属性。也就是说如果我们想要用 CSS `transform` 为祖先节点 `<div class="outer">` 设置动画，就会不小心破坏模态框的布局！
- 这个模态框的 `z-index` 受限于它的容器元素。如果有其他元素与 `<div class="outer">` 重叠并有更高的 `z-index`，则它会覆盖住我们的模态框。

`<Teleport>` 提供了一个更简单的方式来解决此类问题，让我们不需要再顾虑 DOM 结构的问题。让我们用 `<Teleport>` 改写一下 `<MyModal>`：

```vue
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

`<Teleport>` 接收一个 `to` prop 来指定传送的目标。`to` 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。这段代码的作用就是告诉 Vue “把以下模板片段**传送到 `body`** 标签下”。

我们也可以将 `<Teleport>` 和 [``](https://staging-cn.vuejs.org/guide/built-ins/transition.html) 结合使用来创建一个带动画的模态框。你可以看看[这个示例](https://staging-cn.vuejs.org/examples/#modal)。

### 1.3 禁用 Teleport

在某些场景下可能需要视情况禁用 `<Teleport>`。举例来说，我们想要在桌面端将一个组件当做浮层来渲染，但在移动端则当作行内组件。我们可以通过对 `<Teleport>` 动态地传入一个 `disabled` prop 来处理这两种不同情况。

```vue
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

这里的 `isMobile` 状态可以根据 CSS media query 的不同结果动态地更新。

### 1.4 多个 Teleport 共享目标

一个可重用的模态框组件可能同时存在多个实例。对于此类场景，多个 `<Teleport>` 组件可以将其内容挂载在同一个目标元素上，而顺序就是简单的顺次追加，后挂载的将排在目标元素下更后面的位置上。

比如下面这样的用例：

```vue
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
```

渲染的结果为：

```vue
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

------

**参考**

- [`` API 参考](https://staging-cn.vuejs.org/api/built-in-components.html#teleport)
- [在 SSR 中处理 Teleports](https://staging-cn.vuejs.org/guide/scaling-up/ssr.html#teleports)

## 2.CSS功能

### 2.1 CSS Modules[#](https://staging-cn.vuejs.org/api/sfc-css-features.html#css-modules)

一个 `<style module>` 标签会被编译为 [CSS Modules](https://github.com/css-modules/css-modules) 并且将生成的 CSS class 作为 `$style` 对象暴露给组件：

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

得出的 class 将被哈希化以避免冲突，实现了同样的将 CSS 仅作用于当前组件的效果。

参考 [CSS Modules spec](https://github.com/css-modules/css-modules) 以查看更多详情，例如 [global exceptions](https://github.com/css-modules/css-modules#exceptions) 和 [composition](https://github.com/css-modules/css-modules#composition)。

#### 2.1.1 自定义注入名称[#](https://staging-cn.vuejs.org/api/sfc-css-features.html#custom-inject-name)

你可以通过给 `module` attribute 一个值来自定义注入 class 对象的属性名：

自定义注入名称（多个可以用数组）

```vue
<template>
    <div :class="[zs.red,zs.border]">
        是个弟弟
    </div>
</template>
 
<style module="zs">
.red {
    color: red;
    font-size: 20px;
}
.border{
    border: 1px solid #ccc;
}
</style>
```

#### 与组合式 API 一同使用[#](https://staging-cn.vuejs.org/api/sfc-css-features.html#usage-with-composition-api)

可以通过 `useCssModule` API 在 `setup()` 和 `<script setup>` 中访问注入的 class。对于使用了自定义注入名称的 `<style module>` 块，`useCssModule` 接收一个匹配的 `module` attribute 值作为第一个参数：

```vue
<template>
    <div :class="[zs.red,zs.border]">
        是个弟弟
    </div>
</template>
 
 
<script setup lang="ts">
import { useCssModule } from 'vue'
 // 在 setup() 作用域中...
// 默认情况下, 返回 <style module> 的 class
useCssModule()
    
// 具名情况下, 返回 <style module="classes"> 的 class
const css = useCssModule('zs')
</script>
 
<style module="zs">
.red {
    color: red;
    font-size: 20px;
}
.border{
    border: 1px solid #ccc;
}
</style>
```

### 2.2 CSS 中的 `v-bind()`[#](https://staging-cn.vuejs.org/api/sfc-css-features.html#v-bind-in-css)

单文件组件的 `<style>` 标签支持使用 `v-bind` CSS 函数将 CSS 的值链接到动态的组件状态：

```vue
<script setup>
import {ref} from 'vue'
let colorData = ref('red')
</script>
 
<style>
.testClass2{
  color: v-bind(colorData);
}
</style>
<style scoped>
.testClass{
  color: v-bind(colorData);
}
</style>
```

这个语法同样也适用于 [``](https://staging-cn.vuejs.org/api/sfc-script-setup.html)，且支持 JavaScript 表达式 (需要用引号包裹起来)：

```vue
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

实际的值会被编译成哈希化的 CSS 自定义属性，因此 CSS 本身仍然是静态的。自定义属性会通过内联样式的方式应用到组件的根元素上，并且在源值变更的时候响应式地更新。

### 2.3 组件作用域 CSS

#### 2.3.1 `<style scoped>`

当 `<style>` 标签带有 `scoped` attribute 的时候，它的 CSS 只会影响当前组件的元素，和 Shadow DOM 中的样式封装类似。使用时有一些注意事项，不过好处是不需要任何的 polyfill。它的实现方式是通过 PostCSS 将以下内容：

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

转换为：

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

**子组件的根元素[#](https://staging-cn.vuejs.org/api/sfc-css-features.html#child-component-root-elements)**

使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过，子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

#### 2.3.1 深度选择器

 处于 scoped 样式中的选择器如果想要做更“深度”的选择，也即：影响到子组件，可以使用 :deep() 这个伪类

```css
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
 
// 编译后
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

- ***通过 v-html 创建的 DOM 内容不会被作用域样式影响，但你仍然可以使用深度选择器来设置其样式。***
- **并且我们有时会有需要修改引入的外部组件库的样式的需求，此时就需要使用深度选择器，或者直接`<style>`不加scoped，作用于全局范围。**

#### 2.3.3 插槽选择器

默认情况下，作用域样式不会影响到 `<slot/>` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。使用 `:slotted` 伪类以明确地将插槽内容作为选择器的目标：

`A.vue`

在A组件修改class a 的颜色

```vue
<template>
    <div>
        我是插槽
        <slot></slot>
    </div>
</template>
 
<script>
export default {}
</script>
 
<style scoped>
.a{
    color:red
}
</style>
```

`App.vue`

```vue
<template>
    <div>
        <A>
            <div class="a">私人定制div</div>
        </A>
    </div>
</template>
 
<script setup>
import A from "@/components/A.vue"
</script>
 
 
<style lang="less" scoped>
</style>
```

![image-20220810215440054](https://i0.hdslb.com/bfs/album/f710b2c6538b3248841900e8476cac4b5fb90859.png)

 默认情况下，作用域样式不会影响到 `<slot/>` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。

解决方案 slotted

```css
<style scoped>
 :slotted(.a) {
    color:red
}
</style>
```

 ![image-20220810215539547](https://i0.hdslb.com/bfs/album/9ca75bb1aee6ca723ef3f328c8c82cdfbc895bd2.png)

#### 2.3.4 全局选择器

在之前我们想加入全局 样式 通常都是新建一个style 标签 不加scoped 现在有更优雅的解决方案

```css
<style>
 div{
     color:red
 }
</style>
 
<style lang="less" scoped>
 
</style>
```

如果想让其中一个样式规则应用到全局，比起另外创建一个 `<style>`，可以使用 `:global` 伪类来实现 (看下面的代码)：

```css
<style lang="less" scoped>
:global(div){
    color:red
}
</style>
一定要写在scoped里面
```

效果等同于上面 

#### 2.3.5 混合使用局部与全局样式

你也可以在同一个组件中同时包含作用域样式和非作用域样式：

```css
<style>
/* 全局样式 */
</style>

<style scoped>
/* 局部样式 */
</style>
```

#### 2.3.6 注意

- **Scoped 样式不能代替 class**。由于浏览器渲染各种各样 CSS 选择器的方式，`p { color: red }` 结合作用域样式使用时 (即当与 attribute 选择器组合的时候) 会慢很多倍。如果你使用 class 或者 id 来替代，例如 `.example { color: red }`，那你几乎就可以避免性能的损失。

- **在递归组件中小心使用后代选择器!** 对于一个使用了 `.a .b` 选择器的样式规则来说，如果匹配到 `.a` 的元素包含了一个递归的子组件，那么所有的在那个子组件中的 `.b` 都会匹配到这条样式规则。

### 2.4 组件修改子组件样式

首先抛出一个最暴力的方案，但这存在影响其他同名样式的风险。当你意识不到哪出问题的时候，就会让人抓狂。（不推荐的方案！）

涉及到异步组件加载了对应全局样式，又访问了其他页面，选择器相同时则会出现样式不以你预想的情况出现！

```html
// 全局样式
<style>
.customClassName{
    color:red;
}
</style>
```

vue2方案：

在`<style scoped>`内使用` >>> `或` /deep/ `，vue2时期我一直统一用的是`/deep/ `，避免`>>>`无法解析的问题。

有些像 Sass 之类的预处理器无法正确解析 `>>>`。这种情况下你可以使用 `/deep/` 或` ::v-deep` 操作符取而代之——两者都是` >>> `的别名，同样可以正常工作。

```css
<style scoped>
.currComponent >>> .el-dialog .el-dialog__body{
  padding: 10px;
}
</style>
 
// 或者
<style scoped>
.currComponent /deep/ .el-dialog .el-dialog__body{
  padding: 10px;
}
</style>
```

vue3 推荐方案：

vue2的写法在vue3 仍然可以使用，但vue3 文档只写了` :deep()` 这一个API案例，为了统一风格和提高规范，建议按照v3文档 使用·`:deep() `。

```css
<style scoped>
.currConponentName :deep(.el-dialog .el-dialog__body){
  padding: 10px;
}
</style>
 
<style scoped>
.currConponentName /deep/ .el-dialog .el-dialog__body{
  padding: 10px;
}
</style>
```

无论` >>> /deep/ `还是` :deep()` 都是写在` .el-dialog .el-dialog__body`前。此处进行原因分析、解释：

1. 首先 scoped 特性会使组件自身的所有元素增加唯一标识属性(例如： `data-v-7d766012`)，并且编译后CSS选择器也会有这段唯一标识。注意！是组件自身的元素。不包括子组件、父组件！
2. 特例：子组件的根节点会同时被子组件和父组件的样式影响！这是为了方便父组件对子组件进行布局！但是仅限于根组件，如果子组件没有根节点，如VUE3的片段特性（多根节点），则无效。
3. **重点来了：在deep前的选择器，是会带上唯一标识的，deep后面的选择器是不会带上这唯一标识！如果带上了父组件的唯一标识，自然匹配不上子组件对应的元素属性，就会不生效。**

代码案例解释：

```css
<style scoped>
.a :deep(.b .c) {
  /* ... */
}
</style>
 
// 编译结果如下
.a[data-v-f3f3eg9] .b .c{
  /* ... */
}
 
.a是当前组件的类名，data-v-f3f3eg9 是当前组件的唯一标识， .b .c是你想影响的子组件的对应类名的样式！
这时候当前组件的.a自然匹配的上， .b .c 由于不存在父组件的唯一标识，自然也就匹配的上子组件对应的.b .c
 
 
！！如果是 .a[data-v-f3f3eg9] .b[data-v-f3f3eg9] .c
由于是唯一标识， .b自然不可能是 data-v-f3f3eg9
 
此时这就匹配不到子元素对应的class='b'，自然也无法将样式作用于 class='c' ！！
```
