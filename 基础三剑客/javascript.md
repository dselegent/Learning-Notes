

# 4.数组



## 4.3数组的遍历





**js获取数组中最大值**

1.es6拓展运算符...

```javascript
Math.max(...arr)
```

2.es5 apply(与方法1原理相同)

```javascript
Math.max.apply(null,arr)
```





# 8.练习

## 8.1轮播图

```html

```

**封装的轮播图js**

```javascript

```

## 8.2排他思想-tab切换

1. 干掉所有人 使用for循环（直接找到有那个类名的dom结点然后删除那个类名）
2. 复活他自己 通过this或者下标找到自己或者对应的元素

```html
    <div class="wrapper">
      <ul class="tab">
        <li class="tab-item active">国际大牌<span></span></li>
        <li class="tab-item">国妆名牌<span></span></li>
        <li class="tab-item">清洁用品<span></span></li>
        <li class="tab-item">男士精品</li>
      </ul>
      <div class="products">
        <div class="main active">
          <a href="###"><img src="img/tab切换/guojidapai.jpg" alt="" /></a>
        </div>
        <div class="main">
          <a href="###"
            ><img src="img/tab切换/guozhuangmingpin.jpg" alt=""
          /></a>
        </div>
        <div class="main">
          <a href="###"><img src="img/tab切换/qingjieyongpin.jpg" alt="" /></a>
        </div>
        <div class="main">
          <a href="###"><img src="img/tab切换/nanshijingpin.jpg" alt="" /></a>
        </div>
      </div>
    </div>
    <script>
      // 0. 获取元素
      // 得到所有的小li
      let lis = document.querySelectorAll(".tab .tab-item");
      let divs = document.querySelectorAll(".products .main");
      // 1. 头部tab栏切换模块
      // 1.1 先给4个小li添加点击事件
      for (let i = 0; i < lis.length; i++) {
        lis[i].addEventListener("click", function () {
           //干掉所有人
          // for (let j = 0; j < lis.length; j++) {
          //     lis[j].classList.remove('pink')
          // }
          // 找到以前的active 类，移除掉
          document.querySelector(".tab .active").classList.remove("active");
          // 当前的元素添加
          this.classList.add("active");

          // 2. 底部显示隐藏模块  一定要写到点击事件的里面
          document
            .querySelector(".products .active")
            .classList.remove("active");

          // div对应序号的那个加上active
          divs[i].classList.add("active");
        });
      }
    </script>
```

# 9.插件

## 9.1swiper插件

1. [Swiper演示 - Swiper中文网](https://www.swiper.com.cn/demo/index.html)

这个网址的序号代表下载文件里demo文件夹的序号，也可以通过跳转到对应展示网页查看源代码复制粘贴。

2. [下载Swiper - Swiper中文网](https://www.swiper.com.cn/download/index.html)

该网站下载压缩包，只需要`swiper-bundle.min.css`和`swiper-bundle.min.js`两个文件。

3. 改变默认样式，在审查元素找到对应的标签，然后右侧样式里找到对应的选择器

```html
    <!-- <link rel="stylesheet" href="assets/swiper-bundle.min.css" /> -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/swiper@8/swiper-bundle.min.css"
    />
    <style>
      .box1 {
        width: 500px;
        height: 250px;
        /* background-color: skyblue; */
        margin: 100px auto;
      }
      html,
      body {
        position: relative;
        height: 100%;
      }

      body {
        background: #eee;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 14px;
        color: #000;
        margin: 0;
        padding: 0;
      }

      .swiper {
        width: 100%;
        height: 100%;
      }

      .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }

      .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .swiper {
        margin-left: auto;
        margin-right: auto;
      }

      .swiper-slide img {
        height: 250px;
      }
      .swiper-pagination-horizontal.swiper-pagination-bullets
        .swiper-pagination-bullet {
        width: 12px;
        height: 12px;
      }
    </style>
  </head>
  <body>
    <div class="box1">
      <!-- Swiper -->
      <div class="swiper mySwiper one">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a href="#">
              <img src="./images/b_01.jpg" alt="" />
            </a>
          </div>
          <div class="swiper-slide">
            <a href="#">
              <img src="./images/b_02.jpg" alt="" />
            </a>
          </div>
          <div class="swiper-slide">
            <a href="#">
              <img src="./images/b_03.jpg" alt="" />
            </a>
          </div>
          <div class="swiper-slide">
            <a href="#">
              <img src="./images/b_04.jpg" alt="" />
            </a>
          </div>
          <div class="swiper-slide">
            <a href="#">
              <img src="./images/b_05.jpg" alt="" />
            </a>
          </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="box1">
      <!-- Swiper -->
      <div class="swiper mySwiper two">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a href="#">
              <img src="./images/b_01.jpg" alt="" />
            </a>
          </div>
          <div class="swiper-slide">
            <a href="#">
              <img src="./images/b_02.jpg" alt="" />
            </a>
          </div>
          <div class="swiper-slide">
            <a href="#">
              <img src="./images/b_03.jpg" alt="" />
            </a>
          </div>
          <div class="swiper-slide">
            <a href="#">
              <img src="./images/b_04.jpg" alt="" />
            </a>
          </div>
          <div class="swiper-slide">
            <a href="#">
              <img src="./images/b_05.jpg" alt="" />
            </a>
          </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>
    <script>
      var swiper = new Swiper(".one", {
        //设置slider容器能够同时显示的slides数量
        slidesPerView: 3,
        //在每张图之间设置距离
        spaceBetween: 10,
        //循环
        loop: true,
        //指示器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 1000,
          //是否在最后一张停止
          stopOnLastSlide: false,
          //用户操作swiper之后，是否禁止autoplay
          disableOnInteraction: false,
          //开启此功能，鼠标置于swiper时暂停自动切换，鼠标离开时恢复自动切换。
          //如果你还开启了disableOnInteraction，那么自动切换不会恢复。
          pauseOnMouseEnter: true,
        },
      });
    </script>
    <script>
      var swiper = new Swiper(".two", {
        slidesPerView: 3,
        spaceBetween: 30,
        //在carousel mode下定义slides的数量多少为一组(一次滑动多少个)。
        slidesPerGroup: 3,
        loop: true,
        //在loop 模式下，将用空白slide 填充slide数量不足的组。需要与slidesPerGroup 一起使用。
        //如果设置成false，会用后面的顶替
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    </script>
```

## 9.2fullpage插件-全屏滚动

[jQuery全屏滚动插件fullPage.js_dowebok](https://www.dowebok.com/77.html)

```html
    <link rel="stylesheet" href="css/fullpage.min.css" />
    <style>
      #fp-nav ul li a.active span,
      #fp-nav ul li a span {
        background-color: red !important;
      }

      .section1 {
        background: url(http://idowebok.u.qiniudn.com/77/1.jpg) 50%;
      }

      .section2 {
        background: url(http://idowebok.u.qiniudn.com/77/2.jpg) 50%;
      }

      .section3 {
        background: url(http://idowebok.u.qiniudn.com/77/3.jpg) 50%;
      }

      .section4 {
        background: url(http://idowebok.u.qiniudn.com/77/4.jpg) 50%;
      }
    </style>
    <script src="js/jquery.min.js"></script>
    <script src="js/fullpage.min.js"></script>
    <script>
      $(function () {
        $('#dowebok').fullpage({
          sectionsColor: ['pink', '#4BBFC3', '#7BAABE', '#f90'],
          // navigation: true,
        });
      });
    </script>
  </head>

  <body>
    <div id="dowebok">
      <div class="section section1">
        <h3>第一屏里面的内容</h3>
      </div>
      <div class="section section2">
        <h3>第二屏</h3>
      </div>
      <div class="section section3">
        <h3>第三屏</h3>
      </div>
      <div class="section section4">
        <h3>第四屏</h3>
      </div>
    </div>
```

## 9.3nanoid插件

[UUID](https://so.csdn.net/so/search?q=UUID&spm=1001.2101.3001.7020)是软件开发中最常用的通用标识符之一。nanoid库和uuid库一样都可以生成uuid，但是nanoid相比uuid要更轻量级。

nanoid的安装：

```she
pnpm add nanoid
```

nanoid的使用：

直接调用nanoid()，即可生成一个uuid

```javascript
import { nanoid } from 'nanoid'
 
let id = nanoid()
 
//也可以指定生成字符串的长度
//let id = nanoid(5)
```

## 9.4Mock插件

官方网址：http://mockjs.com/

mockjs是用来模拟产生一些虚拟的数据，可以让前端在后端接口还没有开发出来时独立开发。我们可以使用真实的url，mockjs可以拦截ajax请求，返回设定好的数据。

**使用方式**

这里主要讨论在vue项目中，使用axios发送ajax请求，mock.js模拟数据的流程。

vue-cli搭建项目后，安装axios和mock.js

> npm install -S axios
> 		npm install -D mockjs

将不同的数据类型封装为不同的json文件，创建mockServer.js文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/8e20660af0b14a6396937a4fb10818f1.png)
banner、floor分别为轮播图和页面底部的假数据。

`Mock.mock()`

```js
Mock.mock( rurl, rtype, template|function( options ) )
rurl
可选。
表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 '/domian/list.json'。
rtype
可选。
表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等。
template
可选。
表示数据模板，可以是对象或字符串。
数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：
// 属性名 name
// 生成规则 rule
// 属性值 value
'name|rule': value
例如：'name|1-10':1 会产生一个1-10之间的整数，详细规则参见官方文档
function(options)
可选。
表示用于生成响应数据的函数。
options
指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性
```

`mockServer.js`文件

```js
import Mock  from 'mockjs'
//webpack默认对外暴露：json、图片
import banner from './banner.json'
import floor from './floor.json'

//mock数据：第一个参数请求地址、第二个参：请求数据
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})
//记得要在main.js中引入一下
//import ''@/mock/mockServer
```

在`main.js`引入该mock.js文件，表明我们使用这里面产生的数据。

```js
// main.js
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/mock/mockServer';
```

在`App.vue`里我们来发送get请求获取数据

```vue
// App.vue
<template>
 <div id="#app"></div>
</template>
<script>
import axios from 'axios' // 引入axios
export default {
 // 挂载的时候获取新闻列表
 mounted() {
 axios.get('/mock/banner').then(res => { // url即在mock.js中定义的
 console.log(res.data) // 打印一下响应数据
 })
 }
}
</script>
```

## 9.5nprogress插件

打开一个页面时，往往会伴随一些请求，并且会在页面上方出现进度条。它的原理时，在我们发起请求的时候开启进度条，在请求成功后关闭进度条，所以只需要在request.js中进行配置。
如下图所示，我们页面加载时发起了一个请求，此时页面上方出现蓝色进度条
![在这里插入图片描述](https://img-blog.csdnimg.cn/f0df5bccfaee4274b45755b52bf40b60.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5q-b5q-b6Jmr5ZGc5ZGc,size_20,color_FFFFFF,t_70,g_se,x_16)

安装

> pnpm add nprogress

对应的`request.js`设置

```js
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";
//1、对axios二次封装
const requests = axios.create({
    //基础路径，requests发出的请求在端口号后面会跟改baseURl
    baseURL:'/api',
    timeout: 5000,
})
//2、配置请求拦截器
requests.interceptors.request.use(config => {
    //config内主要是对请求头Header配置
    //开启进度条
    nprogress.start();
    return config;
})
//3、配置相应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数
    //响应成功，关闭进度条
    nprogress.done()
    return  res.data;
})
//4、对外暴露
export default requests;
```

## 9.6QRCode插件

QRCode.js 是一个用于生成二维码的 JavaScript 库。主要是通过获取 DOM 的标签,再通过 HTML5 Canvas 绘制而成,不依赖任何库。

**安装**

```shell
pnpm add qrcode
```

**使用**

```js
import QRCode from 'qrcode';

//生成一个二维码URL
let url = await QRCode.toDataURL(this.payInfo.codeUrl);
`<img src=${url}/>`
```



# 10.js高级

## 10.2函数进阶

### 10.2.2剩余参数…

1. ... 是语法符号，置于最末函数形参之前，用于获取多余的实参 
2. 借助 ... 获取的剩余实参，是个真数组

```html
		<script type="text/javascript">
			function add1(a,b,...arr){
				console.log(arr);
			}
			add1(1,2,3,4,5);//{"0":3,"1":4,"2":5,"length":3}
		</script>
```

### 10.2.3展开运算符

展开运算符(…),将一个数组进行展开 
典型运用场景： 求数组最大值(最小值)、合并数组等
不会修改原数组

```html
  <script>
    const arr1 = [1, 2, 3]
    // 展开运算符 可以展开数组
    // console.log(...arr) 

    // console.log(Math.max(1, 2, 3))
    // ...arr1  === 1,2,3
    
    // 1 求数组最大值
    console.log(Math.max(...arr1)) // 3
    console.log(Math.min(...arr1)) // 1  
      
    // 2. 合并数组
    const arr2 = [3, 4, 5]
    const arr = [...arr1, ...arr2]
    console.log(arr)
      
     // 3. 将伪数组转换为真正的数组
     const divs = documents.querySelectorAll('div') 
	 const divArr = [...divs] 
	 console.log(divArr)        // [div,div,div]
  </script>
```





### 10.3.6多级解构案例



## 10.4构造函数

### 10.4.4内置构造函数-Object

```html
		<script type="text/javascript">			
			let obj = {
						name:"孙悟空",
						age:18,
						gender:"男",
						address:"花果山"
					 };
			for(let n in obj){
				console.log("属性名:"+n);
				
				console.log("属性值:"+obj[n]);
			}

		//学习三个常用静态方法（静态方法就是只有构造函数Object可以调用的）
		//1.Object.keys 静态方法获取对象中所有属性(键)
          console.log(Object.keys(obj));
          //['name', 'age', 'gender', 'address']
            
         //2.Object.values 静态方法获取对象中所有属性值
          console.log(Object.values(obj));
          //['孙悟空', 18, '男', '花果山']
            
         // 3. Object. assign 静态方法常用于对象的合并
		   const obj2 = {}
		   Object.assign(obj2, obj)
		   console.log(obj2)
         // {name: '孙悟空', age: 18, gender: '男', address: '花果山'}			
           Object.assign(obj, {
				aa: '女'
			})
			console.log(obj);
            //{name: '孙悟空', age: 18, gender: '男', address: '花果山', aa: '女'}
            //有点像把后面的对象展开添加到前面的对象里
			
            //4.Object.entries()方法返回一个给定对象自身可遍历属性 [key,value] 的数组
            onst obj = { name: 'xiaoming', age: 'seven',sex: 'man', grade: 'four' }; 
			const res = Object.entries(obj) 
			console.log(res); 
           	</script>
```

**Object.entries运行结果**

![Object.entries](https://i0.hdslb.com/bfs/album/79ea303db1ba97dec9ce3e1b2b43f6855b549550.png)

### 10.4.5内置构造函数-Array

![image-20220607112452580](https://fastly.jsdelivr.net/gh/dselegent/picture_bed@master/img/202206071124557.png)

------

**filter**

![image-20220605172817538](https://fastly.jsdelivr.net/gh/dselegent/picture_bed@master/img/202206071127259.png)

> 个人理解:每次会遍历每一个数组元素，如果当前这次循坏return后面的表达式为真,则把这个数组元素添加到一个新数组里面

------

**map**

```html
<script type="text/javascript">
    //map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
			let arr = [{
				name: 'ds',
				age: 18
			}, {
				name: 'ds',
				age: 18
			}, {
				name: 'ds',
				age: 13
			}, ]
			const arr2 = arr.map(item => item.age * 3);
			console.log(arr2);//[54, 54, 39]
		</script>
```

------

**reduce**

```html
<script type="text/javascript">

	// arr.reduce(function(累计值, 当前元素){}, 起始值)
			arr = [1,2,3]
			let ret = arr.reduce(function(prev, item) {
				console.log(prev, item)
                //prev item
                // 0     1
				// 1     2
                // 3     3
				return prev + item
			}, 0)//6
    
   			 ret = arr.reduce(function(prev, item) {
				console.log(prev, item)
                //prev item
				// 1     2
                // 3     3
				return prev + item
			})//6
		</script>
```

**其它常见方法(剩余基础方法见4.3)**

```html
<script type="text/javascript">
// 1. find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
    const array1 = [5, 12, 8, 130, 44];
	const found = array1.find(element => element > 10);
	console.log(found);//output: 12
    
// 2. every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
console.log(array1.every(currentValue => currentValue < 40;));
// output: true

// 3. some() 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。
console.log(array.some(element => element % 2 === 0));
// output: true
    
 // 4. findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。
console.log(array1.findIndex(element => element > 5;));
// expected output: 1
    
// 5. arr.fill(value[, start[, end]])方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
//起始索引，默认值为 0。
//终止索引，默认值为 this.length。
const array1 = [1, 2, 3, 4];

console.log(array1.fill(0, 2, 4));
// output: [1, 2, 0, 0]

console.log(array1.fill(5, 1));
// output: [1, 5, 5, 5]

console.log(array1.fill(6));
// output: [6, 6, 6, 6]

// 数组常见方法 伪数组转换为真数组,静态方法
    const lis = document.querySelectorAll('ul li')
    // console.log(lis)
    // lis.pop() 报错
    //  Array.from(lis) 把伪数组转换为真数组
    const liss = Array.from(lis)
    liss.pop()
    console.log(liss)
    
// Array.isArray()检测是不是真数组
</script>
```

















箭头函数

**箭头函数**中的 `this` 与普通函数完全不同，也不受调用方式的影响，事实上箭头函数中并不存在 `this` ！箭头函数中访问的 `this` 不过是箭头函数所在作用域的 `this` 变量。

```tex
1. 箭头函数会默认帮我们绑定外层 this 的值，所以在箭头函数中 this 的值和外层的 this 是一样的
2.箭头函数中的this引用的就是最近作用域中的this
3.向外层作用域中，一层一层查找this，直到有this的定义
```

```html
<script>
    
  console.log(this) // 此处为 window
  // 箭头函数
  const sayHi = function() {
    console.log(this) // 该箭头函数中的 this 为函数声明环境中 this 一致
  }
  // 普通对象
  const user = {
    name: '小明',
    // 该箭头函数中的 this 为函数声明环境中 this 一致
    walk: () => {
      console.log(this)
    },
    
    sleep: function () {
      let str = 'hello'
      console.log(this)
      let fn = () => {
        console.log(str)
        console.log(this) // 该箭头函数中的 this 与 sleep 中的 this 一致
      }
      // 调用箭头函数
      fn();
    }
  }

  // 动态添加方法
  user.sayHi = sayHi
  
  // 函数调用
  user.sayHi()
  user.sleep()
  user.walk()
</script>
```

**总结**

```tex
1. 函数内不存在this，沿用上一级的
2. 不适用构造函数，原型函数，dom事件函数等等
3. 适用需要使用上层this的地方
```



## 10.9性能优化

### 10.9.1节流（throttle）

**所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数** 

```tex
开发使用场景 – 小米轮播图点击效果、鼠标移动、页面尺寸缩放resize、滚动条滚动 就可以加节流
假如一张轮播图完成切换需要300ms， 不加节流效果，快速点击，则嗖嗖嗖的切换，加上节流效果，不管快速点击多少次，300ms时间内，只能切换一张图片。
```

```html
		<style>
			div {
				width: 200px;
				height: 200px;
				background-color: #CCCCCC;
				line-height: 200px;
				text-align: center;
				font-size: 30px;
			}
		</style>
	</head>
	<body>
		<div>0</div>
		<script type="text/javascript">
			let div = document.querySelector("div");
			let i = 0;

			function fun() {
				this.innerHTML = ++i;
			}

			function throttle(fn, time) {
				let startTime = 0;
				return function() {
					let nowTime = +new Date();
					if (nowTime - startTime >= time) {
						fun.bind(div)();
						startTime = nowTime;
					}
				}
			}
			div.addEventListener("mousemove", throttle(fun, 1000))
		</script>
```

**节流小案例-页面打开，可以记录上一次的视频播放位置**

```html
		<script>
  			/*两个事件:
            ①：ontimeupdate 事件在视频/音频（audio/video）当前的播放位置发送改变时触发
            ②：onloadeddata 事件在当前帧的数据加载完成且还没有足够的数据播放视频/音频（audio/video）的下一帧时触发(简单理解就是视频资源加载出来的时候)
            */

			// 1. 获取元素  要对视频进行操作
			const video = document.querySelector('video')
			video.ontimeupdate = _.throttle(function() {
				localStorage.setItem("time", video.currentTime);
			}, 1000)
			// 打开页面触发事件，就从本地存储里面取出记录的时间， 赋值给
			video.onloadeddata = function() {
				video.currentTime = localStorage.getItem("time") || 0;
			}
		</script>
```



### 10.9.2防抖(debounce)

**所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间**

```tex
开发使用场景- 搜索框防抖
假设输入就可以发送请求，但是不能每次输入都去发送请求，输入比较快发送请求会比较多
我们设定一个时间，假如300ms， 当输入第一个字符时候，300ms后发送请求，但是在200ms的时候又输入了一个字符，则需要再等300ms 后发送请求
```

```html
		<style>
			div {
				width: 200px;
				height: 200px;
				background-color: #CCCCCC;
				line-height: 200px;
				text-align: center;
				font-size: 30px;
			}
		</style>
	</head>
	<body>
		<div>0</div>
		<script type="text/javascript">
			let div = document.querySelector("div");
			let i = 0;

			function fun() {
				this.innerHTML = ++i;
			}

			function debounce(fn, time) {
				let timer = null;
				return function() {
					if (timer) clearTimeout(timer);
					timer = setTimeout(fun.bind(div), time)
				}
			}
			div.addEventListener("mousemove", debounce(fun, 1000))
		</script>
```

```tex
节流和防抖的使用场景是？
节流: 鼠标移动，页面尺寸发生变化，滚动条滚动等开销比较大的情况下
防抖: 搜索框输入，设定每次输入完毕n秒后发送请求，如果期间还有输入，则从新计算时间
```

## 10.10新增的两种数据结构Set和Map

### 10.10.1Set

ES6提供了新的数据结构set(集合）。它是一个伪数组，但成员的值都是唯一的，集合实现了iterator接口，所以可以使用「扩展运算符』和「 for…of…』进行遍历

![image-20220611131143499](https://fastly.jsdelivr.net/gh/dselegent/picture_bed@master/img/202206111311066.png)

![image-20220611131055970](https://fastly.jsdelivr.net/gh/dselegent/picture_bed@master/img/202206111311782.png)

```js
let s = new Set();
let s2 = new Set(['A','B','C','D'])

//元素个数
console.log(s2.size) 

//添加新的元素E
s2.add('E') 

//删除元素A
s2.delete('A')

//检测是否有 C
console.log(s2.has('C')) 

//清空
s2.clear()

console.log(s2) 
```

**应用**

```js
let arr = [1,2,3,4,5,4,3,2,1]

//1.数组去重
let result = [...new Set(arr)]
console.log(result) 

//2.交集
let arr2=[4,5,6,5,6]
let result2 = [...new Set(arr)].filter(item => new Set(arr2).has(item))
console.log(result2) 

//3.并集
let result3=[new Set([...arr,...arr2])]
console.log(result3) 

//4.差集(比如下面这个就是arr中有，而arr2中没有的)
let result4= [...new Set(arr)].filter(item => !(new Set(arr2).has(item)))
console.log(result4) //1,2,3
```

### 10.10.2Map



## 10.11模块化

[ES6总结_黑嘿超人的博客-CSDN博客](https://blog.csdn.net/weixin_44943157/article/details/121608533)

> 模块化是指将一个`大的程序文件`,拆分成许多`小的文件`，然后将小文件组合起来。

**1. 模块化的好处：**

- 防止命名冲突
- 代码复用
- 高维护性
- 模块化规范产品

**2. ES6之前的模块化规范有：**

- CommonJS ====> NodeJS、Browserify
- AMD ====> requireJS
- CMD ====> seaJS

**3. 语法：**

- 模块功能主要有两个命令构成：`export`和`import`
- `export`命令用于规定模块的对外接口
- `import`命令用于输入其他模块提供的功能

```js
// ./src/js/m1.js文件
export let school = '哆啦A梦' 
export function teach(){console.log('教技能') }
```

```html
<!-- html代码 -->
<script type="module">  
    import * as m1 from "./src/js/m1.js" 
	console.log(m1) 
</script>
```

![img](https://fastly.jsdelivr.net/gh/dselegent/picture_bed@master/img/202206111945683.gif)

### 10.11.1暴露方式

#### 统一暴露

```js
// m1.js
let school = '清华大学';
function findjob(){
    console.log('找工作吧');
}
//统一暴露
export {school, findjob}
```

```html
<script type="module">  
    import * as m1 from "./js/m1.js" 
    console.log(m1) 
    console.log(m1.school)
    console.log(m1.findJob())
</script>
```

**结果：**


![在这里插入图片描述](https://fastly.jsdelivr.net/gh/dselegent/picture_bed@master/img/202206111951784.png)

#### 默认暴露

```js
//默认暴露 export default
export default {
    school:'清华大学',
    change:function(){
        console.log('可以改变人的一生！')
    }
}
```

```html
<script type="module">  
        import * as m1 from "./src/js/m1.js" 
        console.log(m1.default) 
        console.log(m1.default.school)
        console.log(m1.default.change())
</script>
```

![在这里插入图片描述](https://fastly.jsdelivr.net/gh/dselegent/picture_bed@master/img/202206111953296.png)

### 10.11.2引入语法

#### 通用导入方式

```js
import * as m1 from "./src/js/m1.js"
import * as m2 from "./src/js/m2.js"
import * as m3 from "./src/js/m3.js"
```

####  解构赋值方式

```js
import {school,teach} from "./src/js/m1.js"
import {school as s,findJob} from "./src/js/m2.js"
import {default as m3 } from "./src/js/m3.js"
```

#### 简便形式（只针对默认暴露）

```js
import m3 from "./src/js/m3.js"
//此时这个m3就是默认暴露的那个值
```

## 10.12Promise

### 10.12.1准备

#### 区别实例对象与函数对象

1. 实例对象: new 函数产生的对象, 称为实例对象, 简称为对象 
2. 函数对象: 将函数作为对象使用时, 简称为函数对

```js
function Fn() { // Fn函数 
}
const fn = new Fn()// Fn是构造函数  fn是实例对象(简称为对象)
console.log(Fn.prototype)
Fn.bind({})//Fn是函数对象，因为.的方式是对象的特征
$('#test') // jQuery函数
$.get('/test') // jQuery函数对象
```

#### 二种类型的回调函数

  1). 同步回调: 

   理解: 立即执行, 完全执行完了才结束, 不会放入回调队列中

   例子: 数组遍历相关的回调函数 / Promise的excutor(执行器)函数

  2). 异步回调: 

   理解: 不会立即执行, 会放入回调队列中将来执行

   例子: 定时器回调 / ajax回调 / Promise的成功|失败的回调

```js
onst arr = [1, 2, 3]
arr.forEach(item => console.log(item)) // 同步回调, 不会放入回调队列, 而是立即执行
console.log('forEatch()之后')


setTimeout(() => { // 异步回调, 会放入回调队列, 所有同步执行完后才可能执行
console.log('timout 回调')
}, 0)
console.log('setTimeout 之后')
```

####  JS 的 error 处理

**错误的类型** 

1. Error: 所有错误的父类型 
2. ReferenceError: 引用的变量不存在 
3. TypeError: 数据类型不正确的错误 
4. RangeError: 数据值不在其所允许的范围内 
5. SyntaxError: 语法错误

```js
 常见的异常错误
 1). ReferenceError: 引用的变量不存在
// console.log(a) // ReferenceError: a is not defined
// console.log('-----') // 没有捕获error, 下面的代码不会执行

 2). TypeError: 数据类型不正确的错误
// let b = null
// console.log(b.xxx) // TypeError: Cannot read property 'xxx' of null
// b = {}
// b.xxx() // TypeError: b.xxx is not a function
 
 3). RangeError: 数据值不在其所允许的范围内
// function fn() {
// fn()
// }
// fn() // RangeError: Maximum call stack size exceeded
 
 4).SyntaxError: 语法错误
// let c = """" // SyntaxError: Unexpected string
```

**错误处理**

1. 捕获错误: try ... catch 
2. 抛出错误: throw error

**error 对象的结构**

1. message 属性: 错误相关信息(纯错误文字，黑色字体)
2. stack 属性: 函数调用栈记录信息(直接写error，默认是这个属性，这个就是平时看到的报错，红色字体，还有错误的位置)

```js
错误处理
 1). 捕获错误: try ... catch
/*
try {
let b = null
b.xxx()
} catch (error) 
onsole.log('出错了: ', error.message)
console.log('出错了: ', error.stack)
}
console.log('捕获错误后还可以继续向下执行') */
 2). 抛出错误: throw error
/*
function handle() {
if (Date.now()%2===0) {
throw new Error('时间为偶数, 不能处理逻辑')
} else {
console.log('时间为奇数, 可以处理逻辑')
}
try {
handle()
} catch(error) { // 捕获错误, 做相应的提示
alert('执行出错: ' + error.message)
} */

```

### 10.12.2promise 的理解和使用

#### 理解

1. 抽象表达:
    Promise 是 JS 中进行异步编程的新的解决方案
2. 具体表达: 
   (1) 从语法上来说: Promise 是一个构造函数 
   (2) 从功能上来说: promise 对象用来封装一个异步操作并可以获取其结果

#### promise 的状态改变

1. pending 变为 resolved 
2. pending 变为 rejected 
   说明: 只有这 2 种, 且一个 promise 对象只能改变一次 无
   论变为成功还是失败, 都会有一个结果数据 成功的结果数据一般称为 vlaue, 失败的结果数据一般称为 reason

#### promise 的基本流程

![image-20220626142316618](https://i0.hdslb.com/bfs/album/c2b731245960a19b2f1b6eb787d1367f0a03f601.png)

#### promise 的基本使用

```js
    // 1. 创建一个新的promise对象
    const p = new Promise((resolve, reject) => {// 执行器函数  同步回调
      console.log('执行 excutor')
      // 2. 执行异步操作任务
      setTimeout(() => {
        const time = Date.now() // 如果当前时间是偶数就代表成功, 否则代表失败
        // 3.1. 如果成功了, 调用resolve(value)
        if (time %2 == 0) {
          resolve('成功的数据, time=' + time)
        } else {
        // 3.2. 如果失败了, 调用reject(reason)
          reject('失败的数据, time=' + time)
        }
      }, 1000);
      
    })
    console.log('new Promise()之后')

      p.then(
      value => { // 接收得到成功的value数据    onResolved
        console.log('成功的回调', value)  
      },
      reason => {// 接收得到失败的reason数据  onRejected
        console.log('失败的回调', reason)
      }
    )
```

**resloved状态**

![image-20220626142556008](https://i0.hdslb.com/bfs/album/38346657487d8753309cce07a2baa0ef7b4609b4.png)

**rejected状态**

![image-20220626142501725](https://i0.hdslb.com/bfs/album/cbeb6f6d225b53aee14289b071cb7b502ab0aeec.png)

> then方法是同步的，里面的回调函数是异步的
>
> 这两个回调函数其实就是reslove和reject调用的函数

#### 为什么要用 Promise?

1. **指定回调函数的方式更加灵活:** 

​    旧的: 必须在启动异步任务前指定

​    promise: 启动异步任务 => 返回promie对象 => 给promise对象绑定回调函数(甚至可以在异步任务结束后指定)

2. **支持链式调用, 可以解决回调地狱问题**

​    什么是回调地狱? 回调函数嵌套调用, 外部回调函数异步执行的结果是嵌套的回调函数执行的条件

​    回调地狱的缺点? 不便于阅读 / 不便于异常处理

​    解决方案? promise链式调用

​    终极解决方案? async/await

### 10.12.3如何使用 Promise

#### API

1. Promise 构造函数: Promise (excutor) {} 
   	excutor 函数: 同步执行 (resolve, reject) => {} 
   	resolve 函数: 内部定义成功时我们调用的函数 value => {} reject 函数: 内部定义失败时我们调用的函数 
   	reason => {} 
   	说明: excutor 会在 Promise 内部立即同步回调,异步操作在执行器中执行 
2. Promise.prototype.then 方法: (onResolved, onRejected) => {} 
    onResolved 函数: 成功的回调函数 (value) => {} 
    onRejected 函数: 失败的回调函数 (reason) => {} 
    说明: 指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调 返回一个新的 promise 对象 
3. Promise.prototype.catch 方法: (onRejected) => {} 
	onRejected 函数: 失败的回调函数 (reason) => {} 
	说明: then()的语法糖, 相当于: then(null, onRejected) 
4. Promise.resolve 方法: (value) => {} 
	value: 成功的数据或 promise 对象 
	说明: 返回一个成功/失败的 promise 对象 
5. Promise.reject 方法: (reason) => {} 
	reason: 失败的原因 
	说明: 返回一个失败的 promise 对象 
6. Promise.all 方法: (promises) => {} 
	promises: 包含 n 个 promise 的数组 
	说明: 返回一个新的 promise, 只有所有的 promise 都成功才成功, 只要有一 个失败了就直接失败 
7. Promise.race 方法: (promises) => {} 
	promises: 包含 n 个 promise 的数组 
	说明: 返回一个新的 promise, 第一个完成的 promise 的结果状态就是最终的结果状态

```js
      new Promise((resolve, reject) => {
        setTimeout(() => {
          // resolve('成功的数据')
          reject('失败的数据');
        }, 1000);
      })
        .then(value => {
          console.log('onResolved()1', value);
        })
        .catch(reason => {
          console.log('onRejected()1', reason);
        });

      // 产生一个成功值为1的promise对象
      const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1);
        }, 100);
      });
      const p2 = Promise.resolve(2);
      const p3 = Promise.reject(3);
      p1.then(value => {
        console.log(value);
      });
      p2.then(value => {
        console.log(value);
      });
      p3.catch(reason => {
        console.log(reason);
      });

      const pAll1 = Promise.all([p1, p2, p3]);
      const pAll2 = Promise.all([p1, p2]);
      pAll1.then(
        values => {
          console.log('all1 onResolved()', values);
        },
        reason => {
          console.log('all1 onRejected()', reason);
        }
      );
      pAll2.then(
        values => {
          console.log('all2 onResolved()', values);
        },
        reason => {
          console.log('all2 onRejected()', reason);
        }
      );

      const pRace = Promise.race([p1, p2, p3]);
      pRace.then(
        value => {
          console.log('race onResolved()', value);
        },
        reason => {
          console.log('race onRejected()', reason);
        }
      );
```

![image-20220626143906070](https://i0.hdslb.com/bfs/album/070c34a7189253450b29c2b215a5790d86d9f864.png)

#### 如何改变 promise 的状态

(1) resolve(value): 如果当前是 pendding 就会变为 resolved 
(2) reject(reason): 如果当前是 pendding 就会变为 rejected 
(3) 抛出异常: 如果当前是 pendding 就会变为 rejected

#### 一个 promise 指定多个成功/失败回调函数, 都会调用吗

当promise改变为对应状态时都会调用

```js
    const p = new Promise((resolve, reject) => {
      // resolve(1) // promise变为resolved成功状态
      // reject(2) // promise变为rejected失败状态
      throw new Error('出错了') // 抛出异常, promse变为rejected失败状态, reason为 抛出的error
      // throw 3 // 抛出异常, promse变为rejected失败状态, reason为 抛出的3
    })
    p.then(
      value => {},
      reason => {console.log('reason', reason)}
    )
    p.then(
      value => {},
      reason => {console.log('reason2', reason)}
    )
```

![image-20220626144400710](https://i0.hdslb.com/bfs/album/0d680ff3029fd5b8b0c9560dd67410e1bb54f466.png)

#### promise.then()返回的新promise的结果状态由什么决定

 (1)简单表达: 由then()指定的回调函数执行的结果决定

   (2)详细表达:

​     ①如果抛出异常, 新promise变为rejected, reason为抛出的异常

​     ②如果返回的是非promise的任意值, 新promise变为resolved, value为返回的值

​     ③如果返回的是另一个新promise, 此promise的结果就会成为新promise的结果 

```js
    new Promise((resolve, reject) => {
      resolve(1)
      // reject(1)
    }).then(
      value => {
        console.log('onResolved1()', value)
        // return 2
        // return Promise.resolve(3)
        // return Promise.reject(4)
        throw 5
      },
      reason => {
        console.log('onRejected1()', reason)
        // return 2
        // return Promise.resolve(3)
        // return Promise.reject(4)
        throw 5
      }
    ).then(
      value => {
        console.log('onResolved2()', value)
      },
      reason => {
        console.log('onRejected2()', reason)
      }
    )
```

![image-20220626144716874](https://i0.hdslb.com/bfs/album/61cef1681832a53005d19bab8f04cc4ef9bac1c7.png)

### 10.12.4async和await

#### mdn 文档

 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function 

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await

#### async 函数

   函数的返回值为promise对象

   promise对象的结果由async函数执行的返回值决定

####  await 表达式

   await右侧的表达式一般为promise对象, 但也可以是其它的值

   如果表达式是promise对象, await返回的是promise成功的值

   如果表达式是其它值, 直接将此值作为await的返回值

> 注意:
>
>  await必须写在async函数中, 但async函数中可以没有await
>
>  如果await的promise失败了, 就会抛出异常, 需要通过try...catch来捕获处理

 ```js
      // async函数的返回值是一个promise对象
       // async函数返回的promise的结果由函数执行的结果决定
       async function fn1() {
         return 1;
         // throw 2
         // return Promise.reject(3)
         // return Promise.resolve(3)
         /* return new Promise((resolve, reject) => {
       setTimeout(() => {
         resolve(4)
       }, 1000);
     }) */
       }
 
       const result = fn1();
       console.log(result);
       result.then(
         value => {
           console.log('onResolved()', value);
         },
         reason => {
           console.log('onRejected()', reason);
         }
       );
 
       function fn2() {
         return new Promise((resolve, reject) => {
           setTimeout(() => {
             // resolve(5)
             reject(6);
           }, 1000);
         });
       }
       function fn4() {
         return 6;
       }
 
       async function fn3() {
         try {
           const value1 = await fn1();
           console.log('value1', value1);
           const value2 = await fn2(); // await右侧表达为promise, 得到的结果就是promise成功的value
           console.log('value2', value1);
         } catch (error) {
           console.log('得到失败的结果', error);
         }
 
         const value = await fn4(); // await右侧表达不是promise, 得到的结果就是它本身
         console.log('value', value);
       }
       fn3()
 ```

![image-20220626145617964](https://i0.hdslb.com/bfs/album/d5e9cd768e131f29b03f110e68bbd30d1bb9b96f.png)











