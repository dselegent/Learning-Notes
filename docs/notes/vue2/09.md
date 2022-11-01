# 09 【CLI 初始化脚手架 Vue零碎的一些知识】	

## 1.Vue CLI 初始化脚手架

### 1.1具体步骤

1如果下载缓慢请配置npm淘宝镜像npm config set registry http://registry.npm.taobao.org
2全局安装 @vue/cli npm install -g @vue/cli
3切换到创建项目的目录，使用命令创建项目vue create xxx
4选择使用vue的版本
5启动项目npm run serve
6打包项目npm run build
7暂停项目 Ctrl+C

> Vue脚手架隐藏了所有webpack相关的配置，若想查看具体的webpack配置，请执行vue inspect > output.js

### 1.2脚手架文件结构

```markdown
.文件目录
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   └── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md: 应用描述文件
└── package-lock.json: 包版本控制文件
```

**脚手架demo**

> components

就直接把单文件组件的 School.vue 和 Student.vue 两个文件直接拿来用，不需要修改。

> App.vue

引入这两个组件，注册一下这两个组件，再使用。

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Student></Student>
    <School></School>
  </div>
</template>

<script>
import School from './components/School.vue'
import Student from './components/Student.vue'

export default {
  name: 'App',
  components: {
    School,
    Student
  }
}
</script>
```

> main.js:

入口文件

```js
// 该文件是整个项目的入口文件

import Vue from 'vue'				// 引入Vue
import App from './App.vue'	// 引入App组件，它是所有组件的父组件

Vue.config.productionTip = false

new Vue({
	el:'#app',
  render: h => h(App),			// render函数完成了这个功能：将App组件放入容器中
})// .$mount('#app')
```

> index.html

```ejs
<!DOCTYPE html>
<html lang="">
    <head>
        <meta charset="UTF-8">
      
        <!-- 针对IE浏览器的特殊配置，含义是让IE浏览器以最高渲染级别渲染页面 -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
      
        <!-- 开启移动端的理想端口 -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
        <!-- 配置页签图标 <%= BASE_URL %>是public所在路径，使用绝对路径 -->
        <link rel="icon" href="<%= BASE_URL %>favicon.ico">
      
        <!-- 配置网页标题 -->
        <title><%= htmlWebpackPlugin.options.title %></title>
    </head>
    <body>
      
      	<!-- 当浏览器不支持js时，noscript中的元素就会被渲染 -->
      	<noscript>
      		<strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    		</noscript>
          
        <!-- 容器 -->
        <div id="app"></div>
    </body>
</html>
```

### 1.3render函数

> 插入一个小知识：

使用 import 导入第三方库的时候不需要 加 './'

导入我们自己写的：

```js
import App from './App.vue'
```

导入第三方的

```js
import Vue from 'vue'
```

不需要在 from 'vue' 加 `'./'` 的原因是第三方库 node_modules 人家帮我们配置好了。

我们通过 import 导入第三方库，在第三方库的 package.json 文件中确定了我们引入的是哪个文件

![image-20220630173839543](https://i0.hdslb.com/bfs/album/690180f50495967f962f3df016d98c38626a135f.png)

通过 module 确定了我们要引入的文件。

> 备注：这是`ESM`默认导入的文件，`CommonJS`默认导入`mian`中路径的文件

> 回到 render 函数

之前的写法是这样：

```js
import App from './App.vue'

new Vue({
	el:'#root',
	template:`<App></App>`,
	components:{App},
})
```

如果这样子写，运行的话会引发如下的报错

![image-20220630174043948](https://i0.hdslb.com/bfs/album/b1d897cd60c19487ac0571d0e2a68416fd721601.png)

报错的意思是，是在使用运行版本的 vue ，没有模板解析器。

从上面的小知识可以知道，我们引入的 vue 不是完整版的，是残缺的（为了减小vue的大小）。所以残缺的vue.js 只有通过 render 函数才能把项目给跑起来。

**来解析一下render**

```js
// render最原始写的方式
// render是个函数，还能接收到参数a
// 这个 createElement 很关键，是个回调函数
new Vue({
  render(createElement) {
      // 这个 createElement 回调函数能创建元素
      // 因为残缺的vue 不能解析 template，所以render就来帮忙解决这个问题
      // createElement 能创建具体的元素
      return createElement('h1', 'hello')
  }
}).$mount('#app')

```

### 1.4关于不同版本的函数

来个不同版本 vue 的区别

* vue.js与vue.runtime.xxx.js的区别：
  * vue.js是完整版的Vue，包含：核心功能+模板解析器。
  * vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。`esm` 就是` ES6 module`
* 因为`vue.runtime.xxx.js`没有模板解析器，所以不能使用template配置项，需要使用`render`函数接收到的`createElement`函数去指定具体内容。

### 1.5vue.config.js 配置文件

`vue inspect > output.js`可以查看到Vue脚手架的默认配置

> 不能修改

使用`vue.config.js`可以对脚手架进行个性化定制，和`package.json`同级目录，详见 [配置参考 | Vue CLI](https://cli.vuejs.org/zh/config/#vue-config-js)

```js
module.exports = {
  pages: {
    index: {
      entry: 'src/index/main.js' // 入口
    }
  },
  lineOnSave: false	// 关闭语法检查
}
```

## 2. vue 零碎的一些知识

### 2.1ref属性

* 被用来给元素或子组件注册引用信息（id的替代者）
* 应用在`html`标签上获取的是真实`DOM元素`，应用在组件标签上是组件实例对象`vc`
* 使用方式：
  * 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
  * 获取：```this.$refs.xxx```

```html
<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>
    <School ref="sch"/>
  </div>
</template>

<script>
  import School from './components/School'

  export default {
    name:'App',
    components:{ School },
    data() {
      return {
        msg:'欢迎学习Vue！'
      }
    },
    methods: {
      showDOM(){
        console.log(this.$refs.title)	// 真实DOM元素
        console.log(this.$refs.btn)		// 真实DOM元素
        console.log(this.$refs.sch)		// School组件的实例对象（vc）
      }
    },
  }
</script>
```

![image-20220630222636601](https://i0.hdslb.com/bfs/album/98ef4a412c648de1c877e6debdaa397068bd0129.png)

### 2.2 props 配置项

1. 功能：让组件接收外部传过来的数据

2. 传递数据：```<Demo name="xxx" :age="18"/>```这里age前加:，通过v-bind使得里面的18是数字

3. 接收数据：

   1. 第一种方式（只接收）：```props:['name'] ```

   2. 第二种方式（限制类型）：```props:{name:String, age:Number}```

   3. 第三种方式（限制类型、限制必要性、指定默认值）

```js
props:{
	name:{
        type:String, //类型
        required:true, //必要性
        default:'老王' //默认值
	}
}
```

> 备注：**props是只读的**，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

**vue props传Array/Object类型值，子组件报错解决办法**

![image-20220728124344030](https://i0.hdslb.com/bfs/album/fa8b77862c213f8af3ac97ffa9059ab3ae1eb2e4.png)其实看错误信息也就知道了，就是Props在传值类型为Object/Array时，**如果需要配置`default`值（如果没有配置`default`值，则不会有这个报错)**，那必须要使用函数来`return`这个`default`值，而不能像基本数据类型那样直接写`default：xxx`

```js
//错误写法
props: {
	rlist: {
		type:Array,
		default: [1, 2, 3, 4, 5]
	}
}

```

**解决方法**

```js
//正确写法
props: {
	rlist: {
		type:Array,
		default: function() {
			return [1, 2, 3, 4, 5]
		}
	}
}
//当然，我们可以使用箭头函数来写，还显得简单很多
props: {
	rlist: {
		type:Array,
		default: () => [1, 2, 3, 4, 5]
	}
}

```

> 示例代码：

父组件给子组件传数据

App.vue

```vue
<template>
  <div>
    <Student name="李四" sex="女" :age="18"/>
    <Student name="王五" sex="男" :age="18"/>
  </div>
</template>

<script>
  import Student from './components/Student'

  export default {
    name:'App',
    components:{ Student }
  }
</script>
```

School.vue

```vue
<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>学生年龄：{{ myAge + 1 }}</h2>
    <button @click="updateAge">尝试修改收到的年龄</button>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    console.log(this);
    return {
      msg: "我是一个bilibili大学的学生",
      myAge: this.age,
    };
  },
  methods: { updateAge() { this.myAge++; }, },
  // 简单声明接收
  // props:['name','age','sex']

  // 接收的同时对数据进行类型限制
  //   props: {
  //     name: String,
  //     age: Number,
  //     sex: String,
  //   }

  // 接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
  props: {
    name: {
      type: String, 	//name的类型是字符串
      required: true, //name是必要的
    },
    age: {
      type: Number,
      default: 99, //默认值
    },
    sex: {
      type: String,
      required: true,
    },
  },
};
</script>
```

![image-20220630223040994](https://i0.hdslb.com/bfs/album/0dd586c66c23a9eb46f1ef040cc037033a877916.png)

### 2.3mixin混入

`混入 (mixin) `提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

功能：可以把多个组件共用的配置提取成一个混入对象 

例子：

```js
const mixin = {
    data() {....},
    methods: {....}
    ....
}
```

**使用混入**

- 全局混入`Vue.mixin(xxx)`
- 局部混入`mixins:['xxx']`

**局部混入**

`src/mixin.js`

```js
export const hunhe = {
	methods: {
		showName(){
			alert(this.name)
		}
	},
	mounted() {
		console.log('你好啊！')
	},
}

export const hunhe2 = {
	data() {
		return {
			x:100,
			y:200
		}
	},
}
```

`src/components/School.vue`

```vue
<template>
  <div>
    <h2 @click="showName">学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
  //引入一个hunhe
  import {hunhe,hunhe2} from '../mixin'

  export default {
    name:'School',
    data() {
      return {
        name:'尚硅谷',
        address:'北京',
        x:666
      }
    },
    mixins:[hunhe,hunhe2]	// 局部混入
  }
</script>
```

`src/components/Student.vue`

```vue
<template>
  <div>
    <h2 @click="showName">学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
  </div>
</template>

<script>
  import {hunhe,hunhe2} from '../mixin'

  export default {
    name:'Student',
    data() {
      return {
        name:'张三',
        sex:'男'
      }
    },
    mixins:[hunhe,hunhe2]	// 局部混入
  }
</script>
```

**全局混入**

`src/main.js`

```js
import Vue from 'vue'
import App from './App.vue'
import {mixin} from './mixin'

Vue.config.productionTip = false
Vue.mixin(hunhe)		// 全局混合引入
Vue.mixin(hunhe2)	// 全局混合

new Vue({
    el:"#app",
    render: h => h(App)
})
```

> 这样所有组件就自动使用这些配置了，不推荐使用**全局混入**

**备注**

1. 组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”，在发生冲突时以组件优先

```js
var mixin = {
	data: function () {
		return {
    		message: 'hello',
            foo: 'abc'
    	}
  	}
}

new Vue({
  	mixins: [mixin],
  	data () {
    	return {
      		message: 'goodbye',
            	bar: 'def'
    	}
    },
  	created () {
    	console.log(this.$data)
    	// => { message: "goodbye", foo: "abc", bar: "def" }
  	}
})
```

2. 同名生命周期钩子将合并为一个数组，**因此都将被调用**。另外，混入对象的钩子将在组件自身钩子之前调用

```js
var mixin = {
  	created () {
    	console.log('混入对象的钩子被调用')
  	}
}

new Vue({
  	mixins: [mixin],
  	created () {
    	console.log('组件钩子被调用')
  	}
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```

### 2.4plugin 插件

1.功能：用于增强Vue
2.本质：包含install方法的一个对象，install的第一个参数是Vue构造函数，第二个以后的参数是插件使用者传递的数据
3.定义插件（见下` src/plugin.js`）
4.使用插件：`Vue.use()`

`Vue.use`执行之后，会自动调用`install`方法，所有组件就可以使用里面定义的东西。

`src/plugin.js`

```js
export default {
  install(Vue,x,y,z){
    console.log(x,y,z)
      
    //定义全局指令
    Vue.directive('fbind',{
      //指令与元素成功绑定时（一上来）
      bind(element,binding){element.value = binding.value},
      //指令所在元素被插入页面时
      inserted(element,binding){element.focus()},
      //指令所在的模板被重新解析时
      update(element,binding){element.value = binding.value}
    })

    //定义混入
    Vue.mixin({
      data() {return {x:100,y:200}},
    })

    //给Vue原型上添加一个方法（vm和vc就都能用了）
    Vue.prototype.hello = ()=>{alert('你好啊')}
  }
}
```

`src/main.js`

```js
import Vue from 'vue'
import App from './App.vue'
import plugins from './plugins'	// 引入插件

Vue.config.productionTip = false

Vue.use(plugins,1,2,3)	// 应用（使用）插件

new Vue({
	el:'#app',
	render: h => h(App)
})
```

`src/components/School.vue`

```vue
<template>
  <div>
    <h2>学校名称：{{ name | mySlice }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="test">点我测试一个hello方法</button>
  </div>
</template>

<script>
  export default {
    name:'School',
    data() {
      return {
        name:'尚硅谷atguigu',
        address:'北京',
      }
    },
    methods: {
      test(){
        this.hello()
      }
    },
  }
</script>
```

`src/components/Student.vue`

```vue
<template>
  <div>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <input type="text" v-fbind:value="name">
  </div>
</template>

<script>
  export default {
    name:'Student',
    data() {
      return {
        name:'张三',
        sex:'男'
      }
    },
  }
</script>
```

![image-20220630224604261](https://i0.hdslb.com/bfs/album/020d6bc9eff609b06cae202dd568fd913b06902c.png)

### 2.5scoped

**scoped样式**

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```

具体案例：

```vue
<style lang="less" scoped>
	.demo{
		background-color: pink;
		.atguigu{
			font-size: 40px;
		}
	}
</style>
```

